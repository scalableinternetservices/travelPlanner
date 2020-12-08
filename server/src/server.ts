require('honeycomb-beeline')({
  writeKey: process.env.HONEYCOMB_KEY || '856046ade51588caf88af56a75f80d50',
  dataset: process.env.APP_NAME || 'cs188',
  serviceName: process.env.APPSERVER_TAG || 'local',
  enabledInstrumentations: ['express', 'mysql2', 'react-dom/server'],
  sampleRate: 10,
})

import assert from 'assert'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { json, raw, RequestHandler, static as expressStatic } from 'express'
import { getOperationAST, parse as parseGraphql, specifiedRules, subscribe as gqlSubscribe, validate } from 'graphql'
import { GraphQLServer } from 'graphql-yoga'
import { forAwaitEach, isAsyncIterable } from 'iterall'
import path from 'path'
import 'reflect-metadata'
import { v4 as uuidv4 } from 'uuid'
import { checkEqual, Unpromise } from '../../common/src/util'
import { Config } from './config'
import { migrate } from './db/migrate'
import { initORM } from './db/sql'
import { Day } from './entities/Day'
import { Itinerary } from './entities/Itinerary'
import { Arrival, Departure, Stop, Trip } from './entities/Location'
import { Session } from './entities/Session'
import { User } from './entities/User'
import { getSchema, graphqlRoot, pubsub } from './graphql/api'
import { ConnectionManager } from './graphql/ConnectionManager'
import { LocationType, UserType } from './graphql/schema.types'
import { expressLambdaProxy } from './lambda/handler'
import { renderApp } from './render'

const server = new GraphQLServer({
  typeDefs: getSchema(),
  resolvers: graphqlRoot as any,
  context: ctx => ({ ...ctx, pubsub, user: (ctx.request as any)?.user || null }),
})

server.express.use(cookieParser())
server.express.use(json())
server.express.use(raw())
server.express.use('/app', cors(), expressStatic(path.join(__dirname, '../../public')))

const asyncRoute = (fn: RequestHandler) => (...args: Parameters<RequestHandler>) =>
  fn(args[0], args[1], args[2]).catch(args[2])

server.express.get('/', (req, res) => {
  console.log('GET /')
  res.redirect('/app')
})

server.express.get('/app/*', (req, res) => {
  console.log('GET /app')
  renderApp(req, res, server.executableSchema)
})

server.express.get(
  '/users',
  asyncRoute(async (req, res) => {
    const users = await User.find()
    res.status(200).type('json').send(users)
  })
)

// server.express.get(
//   '/currUser',
//   asyncRoute(async (req, res) => {
//     console.log('GET /currUser')
//     const authToken = req.cookies.authToken
//     if (authToken) {
//       const user = await getRepository(Session)
//                         .createQueryBuilder("session")
//                         .leftJoinAndSelect("session.user", "user")
//                         .where("session.authToken = :authToken", { authToken: authToken })
//                         .getOne()
//                         .then(session => session?.user)
//       console.log(user)
//       res.status(200).type('json').send(user)
//     } else {
//       res.status(403).send('Forbidden')
//     }
//   })
// )

const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000 // 30 days

server.express.post(
  '/auth/createUser',
  asyncRoute(async (req, res) => {
    console.log('POST /auth/createUser')
    await User.count({email: req.body.email})
      .then(async c => {
        if (c > 0) {
          res.status(403).send('Error: this email has already been taken.')
        } else {
          // create User model with data from HTTP request
          let user = new User()
          user.email = req.body.email
          user.name = req.body.email
          user.userType = UserType.User
          user.password = req.body.password

          // save the User model to the database, refresh `user` to get ID
          user = await user.save()
          console.log("User Id: " + user.id)

          const authToken = await createSession(user)
          res
            .status(200)
            .cookie('authToken', authToken, { maxAge: SESSION_DURATION, path: '/', httpOnly: true, secure: Config.isProd })
            .send('Success!')
        }
      })
  })
)

server.express.post(
  '/auth/login',
  asyncRoute(async (req, res) => {
    console.log('POST /auth/login')
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({ where: { email } })
    if (!user || password !== user.password) {
      res.status(403).send('Error: invalid email address or password.')
      return
    }

    await Session.delete({ user })
    const authToken = await createSession(user)
    res
      .status(200)
      .cookie('authToken', authToken, { maxAge: SESSION_DURATION, path: '/', httpOnly: true, secure: Config.isProd })
      .send('Success!')
  })
)

async function createSession(user: User): Promise<string> {
  const authToken = uuidv4()

  const session = new Session()
  session.authToken = authToken
  session.user = user
  await Session.save(session).then(s => console.log('saved session ' + s.id))

  return authToken
}

server.express.post(
  '/home/saveItinerary',
  asyncRoute(async (req, res) => {
    console.log('POST /home/saveItinerary')
    const authToken = req.cookies.authToken
    let user_id
    if (authToken) {
      const session = await Session.findOne({ where: { authToken }, relations: ['user'] })
      if (session == undefined) {
        res.status(403).send('Error: login or signup to save your itinerary.')
        return
      }
      user_id = session.user.id
      console.log("user_email = " + session?.user.email)
    } else {
      res.status(403).send('Error: login or signup to save your itinerary.')
      return
    }

    const day = req.body.itinerary
    console.log(day)
    const newItinerary = new Itinerary()
    const newDay  = new Day

    let locations = day.schedule  // locations or trips
    let newLocations = []
    let newTrips = []
    for (let i = 0; i < locations.length; i++) {
      let location = locations[i]
      if (i % 2 == 0) {
        var newLocation
        switch(location.type) {
          case LocationType.Departure: {
            newLocation = new Departure()
            newLocation.departure = location.departure
            break
          }
          case LocationType.Stop: {
            newLocation = new Stop()
            newLocation.arrival = location.arrival
            newLocation.departure = location.departure
            newLocation.duration = location.duration
            break
          }
          case LocationType.Arrival: {
            newLocation = new Arrival()
            newLocation.arrival = location.arrival
            break
          }
          default: {
            res.status(403).send('Error: invalid location type')
            return
          }
        }
        newLocation.type = location.type
        newLocation.name = location.name
        newLocation.address = location.address
        newLocation.coordinates = location.coordinates

        switch(location.type) {
          case LocationType.Departure: {
            await Departure.save(newLocation).then(t => console.log('saved departure ' + t.id))
            break
          }
          case LocationType.Stop: {
            await Stop.save(newLocation).then(t => console.log('saved stop ' + t.id))
            break
          }
          case LocationType.Arrival: {
            await Arrival.save(newLocation).then(t => console.log('saved arrival ' + t.id))
            break
          }
          default: {
            res.status(403).send('Error: invalid location type')
            return
          }
        }
        newLocations.push(newLocation)
      } else {
        var newTrip = new Trip()
        switch (location.type) {
          case "trip": {
            newTrip.transportation = location.transportation
            newTrip.duration = location.duration
            newTrip.cost = location.cost
            break
          }
          default: {
            res.status(403).send('Error: invalid trip type')
            return
          }
        }
        await Trip.save(newTrip).then(t => console.log('saved trip ' + t.id))
        newTrips.push(newTrip)
      }
    }
    newDay.date = day.date
    newDay.locations = newLocations
    newDay.trips = newTrips
    await Day.save(newDay).then(t => console.log('saved day ' + t.id))

    if (user_id != undefined) {
      newItinerary.user_id = user_id
    } else {
      res.status(403).send('Error: invalid user')
      return
    }
    newItinerary.day = newDay
    await Itinerary.save(newItinerary).then(t => console.log('saved itinerary ' + t.id))
    res.status(200).send('Success')
  })
)

server.express.post(
  '/home/getItineraries',
  asyncRoute(async (req, res) => {
    console.log('POST /home/getItineraries')
    const authToken = req.cookies.authToken
    let user_id
    if (authToken) {
      const session = await Session.findOne({ where: { authToken }, relations: ['user'] })
      if (session == undefined) {
        res.status(403).send('Error: login to view your saved itineraries.')
        return
      }
      user_id = session.user.id
    } else {
      res.status(403).send('Error: login to view your saved itineraries.')
      return
    }

    const itineraries = await Itinerary.find({ where: { user_id : user_id }, relations:["day", "day.locations", "day.trips"] })
    var itineraries_out = []
    for (let itinerary of itineraries) {
      let day = itinerary.day
      let schedule_out = []
      let locations = day.locations
      let trips = day.trips

      for (let i = 0; i < locations.length; i++) {
        let location = locations[i]
        let location_out = JSON.parse(JSON.stringify(location))
        delete location_out["id"]
        schedule_out.push(location_out)
        if (i < locations.length - 1) {
          var trip = trips[i]
          var trip_out = JSON.parse(JSON.stringify(trip))
          delete trip_out["id"]
          schedule_out.push(trip_out)
        }
      }
      let itinerary_out = {"date": day.date, "schedule": schedule_out}
      itineraries_out.push(itinerary_out)
    }

    res.status(200).type('json').send(itineraries_out)
  })
)

server.express.post(
  '/explore/getItineraries',
  asyncRoute(async (req, res) => {
    console.log('POST /explore/getItineraries')

    const itineraries = await Itinerary.find({ relations:["day", "day.locations", "day.trips"] })
    var itineraries_reversed
    if (itineraries.length > 20) {
      let itineraries_last20 = itineraries.slice(itineraries.length - 20)
      itineraries_reversed = itineraries_last20.reverse()
    } else {
      itineraries_reversed = itineraries.reverse()
    }
    var itineraries_out = []

    for (let itinerary of itineraries_reversed) {
      let day = itinerary.day
      let schedule_out = []
      let locations = day.locations
      let trips = day.trips

      for (let i = 0; i < locations.length; i++) {
        let location = locations[i]
        let location_out = JSON.parse(JSON.stringify(location))
        delete location_out["id"]
        schedule_out.push(location_out)
        if (i < locations.length - 1) {
          var trip = trips[i]
          var trip_out = JSON.parse(JSON.stringify(trip))
          delete trip_out["id"]
          schedule_out.push(trip_out)
        }
      }
      let user = await User.findOne({ where: { id : itinerary.user_id }})
      if (user == undefined) {
        res.status(500).send('Error: internal error.')
        return
      }
      console.log("user email: " + user.email)
      let itinerary_out = {"user_email": user.email, "date": day.date, "schedule": schedule_out}
      itineraries_out.push(itinerary_out)
    }
    console.log(itineraries_out)
    res.status(200).type('json').send(itineraries_out)
  })
)

server.express.post(
  '/auth/logout',
  asyncRoute(async (req, res) => {
    console.log('POST /auth/logout')
    const authToken = req.cookies.authToken
    if (authToken) {
      await Session.delete({ authToken })
    }
    res.status(200).cookie('authToken', '', { maxAge: 0 }).send('Success!')
  })
)

server.express.get(
  '/api/:function',
  asyncRoute(async (req, res) => {
    console.log(`GET ${req.path}`)
    const { statusCode, headers, body } = await expressLambdaProxy(req)
    res
      .status(statusCode)
      .contentType(String(headers?.['Content-Type'] || 'text/plain'))
      .send(body)
  })
)

server.express.post(
  '/api/:function',
  asyncRoute(async (req, res) => {
    console.log(`POST ${req.path}`)
    const { statusCode, headers, body } = await expressLambdaProxy(req)
    res
      .status(statusCode)
      .contentType(String(headers?.['Content-Type'] || 'text/plain'))
      .send(body)
  })
)

server.express.post('/graphqlsubscription/connect', (req, res) => {
  console.log('POST /graphqlsubscription/connect')
  ConnectionManager.connect(req)
  res.status(200).header('Sec-WebSocket-Protocol', 'graphql-ws').send('')
})

server.express.post('/graphqlsubscription/connection_init', (req, res) => {
  console.log('POST /graphqlsubscription/connection_init')
  res.status(200).send(JSON.stringify({ type: 'connection_ack' }))
})

server.express.post(
  '/graphqlsubscription/start',
  asyncRoute(async (req, res) => {
    console.log('POST /graphqlsubscription/start')
    const connId = ConnectionManager.getConnId(req)

    const { id, payload } = req.body
    // If we already have a subscription with this id, unsubscribe from it first.
    ConnectionManager.endSubscription(connId, id)

    const { query, variables, operationName } = payload
    const document = parseGraphql(query)
    const operationAST = getOperationAST(document, operationName)
    checkEqual(
      'subscription',
      operationAST?.operation,
      'expected a subscription graphql operation, got: ' + operationAST?.operation
    )

    let subscription: Unpromise<ReturnType<typeof gqlSubscribe>>
    try {
      const validationErrors = validate(server.executableSchema, document, [...specifiedRules])
      if (validationErrors.length > 0) {
        throw {
          errors: validationErrors,
        }
      }

      subscription = await gqlSubscribe({
        contextValue: { pubsub },
        document,
        operationName,
        rootValue: graphqlRoot,
        schema: server.executableSchema,
        variableValues: variables,
      })
    } catch (e) {
      if (e.errors) {
        await ConnectionManager.send(connId, JSON.stringify({ id, type: 'data', payload: { errors: e.errors } }))
      } else {
        await ConnectionManager.send(connId, JSON.stringify({ id, type: 'error', payload: { message: e.message } }))
      }

      // Remove the operation on the server side as it will be removed also in the client.
      ConnectionManager.endSubscription(connId, id)
      throw e
    }

    assert.ok(isAsyncIterable(subscription))
    ConnectionManager.registerSubscription(connId, id, subscription)

    forAwaitEach(subscription, payload => ConnectionManager.send(connId, JSON.stringify({ id, type: 'data', payload })))
      .then(() => ConnectionManager.send(connId, JSON.stringify({ id, type: 'complete' })))
      .catch((e: Error) => {
        let error = e
        if (Object.keys(error).length === 0) {
          // plain Error object cannot be JSON stringified.
          error = { name: error.name, message: error.message }
        }
        return ConnectionManager.send(connId, JSON.stringify({ id, type: 'error', payload: error }))
      })

    res.status(200).send('')
  })
)

server.express.post('/graphqlsubscription/stop', (req, res) => {
  console.log('POST /graphqlsubscription/stop')
  const connId = ConnectionManager.getConnId(req)
  const { id } = req.body
  ConnectionManager.endSubscription(connId, id)
  res.status(200).send('')
})

server.express.post('/graphqlsubscription/disconnect', (req, res) => {
  console.log('POST /graphqlsubscription/disconnect')
  ConnectionManager.disconnect(req)
  res.status(200).send('')
})

server.express.post(
  '/graphql',
  asyncRoute(async (req, res, next) => {
    const authToken = req.cookies.authToken || req.header('x-authtoken')
    if (authToken) {
      const session = await Session.findOne({ where: { authToken }, relations: ['user'] })
      if (session) {
        const reqAny = req as any
        reqAny.user = session.user
      }
    }
    next()
  })
)

initORM()
  .then(() => migrate())
  .then(() =>
    server.start(
      {
        port: Config.appserverPort,
        endpoint: '/graphql',
        subscriptions: '/graphqlsubscription',
        playground: '/graphql',
      },
      () => {
        console.log(`server started on http://localhost:${Config.appserverPort}/`)
      }
    )
  )
  .catch(err => console.error(err))

// server.express.get(
//   '/users',
//   asyncRoute(async (req, res) => {
//     const users = await User.find()
//     res.status(200).type('json').send(users)
//   })
// )

// server.express.post(
//   '/throwCandy',
//   asyncRoute(async (req, res) => {
//     const email = req.params['email']
//     const candy = await getRepository(UserCandy)
//       .createQueryBuilder('candy')
//       .leftJoinAndSelect('candy.user', 'user')
//       .where('user.email = :email', { email })
//       .getOne()
//     if (!candy) {
//       return res.status(200).send(false)
//     }
//     // give a random amount of candy
//     candy.candyCount += Math.floor(Math.random() * 4) + 1
//     await candy.save()
//     return res.status(200).send(false)
//   })
// )