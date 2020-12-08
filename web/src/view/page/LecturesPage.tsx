import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { AppRouteParams } from '../nav/route'


interface LecturesPageProps extends RouteComponentProps, AppRouteParams {}


/*function drawItinerary(){
  return (
  <Page>

      <H2>My Itineraries</H2>
      <Spacer $h4 />

      <Spacer $h4 />
      <Table>
        <tbody>
          <Itinerary
            title="Trip 1 Sample Itinerary"
            days={[
              {name:"Day 1",
              schedule:[
                  {
                    name:"UCLA",
                    coordinates: "34.0689° N, 118.4452° W",
                    departure: "9:00 AM",
                  },
                  {
                    name:"Bus",
                    duration:"80 minutes",
                    cost:"$3.25",
                  }
              ]
              },
              {name:"Day 2",
              schedule:[
                  {
                    name:"UCB",
                    coordinates: "34.0689° N, 118.4452° W",
                    departure: "9:00 AM",
                  },
                  {
                    name:"Bus",
                    duration:"80 minutes",
                    cost:"$3.25",
                  }
              ]
              }
            ]
            }

          />
        </tbody>
      </Table>

  </Page>
)
}*/
/*function drawItinerary(props: {
  date: string
  schedule: string
  description?: string
  href?: string
  requiredReading?: RequiredReading[]
}){

}*/
/*interface pit_stop {
  name: string
  type: string
  address: string
  coordinates?: string
  transportation? : number
  arrival?: string
  departure?: string
  duration?: number
  cost?: number
}*/


/*function Itinerary(props: {
  date: string
  schedule: pit_stop[]
}) {
  return (
      <BodyText>
        <TR>
        <TD_1>{props.date}</TD_1>

          {props.schedule && (
            <>
              <Spacer $h2 />
                <TD>
                {props.schedule.map((r2, i) => (
                  <ul key={i}>
                    {r2.name && <b>⏰ {r2.name}</b>}
                    {r2.transportation && <b>⏰ {r2.transportation}</b>}
                    {r2.arrival && <p><Spacer $w2/>🌎  Arrival: {r2.arrival}</p> }
                    {r2.departure && <p><Spacer $w2/>🌎  Departure: {r2.departure}</p>}
                    {r2.duration && <p><Spacer $w2/>🌎  Duration: {r2.duration}</p> }
                    {r2.cost && <p><Spacer $w2/>🌎  Cost: {r2.cost}</p>}
                    <Spacer $w8/> <b> ⬇️</b>
                    </ul>))}
                    </TD>
            </>
            )}
        </TR>
      </BodyText>
  )
}*/
/*function drawItinerary(props: {
  date: string
  schedule: pit_stop[]}
  ){
  return (
  <Page>

      <H2>My Itineraries</H2>
      <Spacer $h4 />

      <Spacer $h4 />
      <Table>
        <tbody>
        <BodyText>
        <TR>
        <TD_1>{props.date}</TD_1>

          {props.schedule && (
            <>
              <Spacer $h2 />
                <TD>
                {props.schedule.map((r2, i) => (
                  <ul key={i}>
                    {r2.name && <b>⏰ {r2.name}</b>}
                    {r2.transportation && <b>⏰ {r2.transportation}</b>}
                    {r2.arrival && <p><Spacer $w2/>🌎  Arrival: {r2.arrival}</p> }
                    {r2.departure && <p><Spacer $w2/>🌎  Departure: {r2.departure}</p>}
                    {r2.duration && <p><Spacer $w2/>🌎  Duration: {r2.duration}</p> }
                    {r2.cost && <p><Spacer $w2/>🌎  Cost: {r2.cost}</p>}
                    <Spacer $w8/> <b> ⬇️</b>
                    </ul>))}
                    </TD>
            </>
            )}
        </TR>
      </BodyText>
        </tbody>
      </Table>

  </Page>
)

}*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LecturesPage(props: LecturesPageProps) {

  let list_its = new Array
  const resp =  getUserItineraries()
  resp.then(result => {
    console.log(result)
  let itineraryListLen = result.length
  //itineraryListLen =
  for(let i = 0; i < itineraryListLen; i++){
    console.log(JSON.stringify(result[i]))
    let cur_itin = result[i]
    let cur_date = cur_itin.date
    let cur_sched = cur_itin.schedule
    let schedule_len = cur_itin.schedule.length
    //console.log(cur_itin.schedule.length)
    //remember j = 0 and j = len -1 are always departure and arrival

    let schedArr = new Array
    for(let j = 0; j < schedule_len; j++){
      var cur_pit_stop
      if(j == 0){
        //departure
        console.log('Departure: ' + JSON.stringify(cur_sched[j]))
        cur_pit_stop = {
          name: cur_sched[j].name,
          type: cur_sched[j].type,
          //transportation :cur_sched[j].number,
          departure: cur_sched[j].departure,
          //duration: cur_sched[j].number,
          //cost?: number
        }
      }
      else if(j == schedule_len -1){
        //arrival
        console.log('Arrival: ' + JSON.stringify(cur_sched[j]))
        cur_pit_stop = {
          name: cur_sched[j].name,
          type: cur_sched[j].type,
          arrival :cur_sched[j].arrival,
          //departure: cur_sched[j].departure,
          //duration: cur_sched[j].number,
          //cost: cur_sched[j].number,
        }
      }
      else if(j % 2 == 0){
        //stop
        console.log('Stop: ' + JSON.stringify(cur_sched[j]))
        cur_pit_stop = {
          name: cur_sched[j].name,
          type: cur_sched[j].type,
          //transportation :cur_sched[j].number,
          departure: cur_sched[j].departure,
          arrival: cur_sched[j].arrival,
          duration: cur_sched[j].number,
          //cost: cur_sched[j].number,
        }
      }
      else{
        //trip
        console.log('Trip: ' + JSON.stringify(cur_sched[j]))
        cur_pit_stop = {
          //name: cur_sched[j].name,
          type: cur_sched[j].type,
          transportation :cur_sched[j].number,
          //departure: cur_sched[j].departure,
          //arrival: cur_sched[j].arrival,
          duration: cur_sched[j].number,
          cost: cur_sched[j].number,
        }
      }
      console.log(cur_pit_stop)
      schedArr.push(cur_pit_stop)
      break
    }
    var my_itinerary = {
      date: cur_date,
      schedule: schedArr
    }
    //console.log(my_itinerary)
    list_its.push(my_itinerary)

  }

  })
  console.log(list_its)
  return <div> STILL TESTING </div>
}

async function getUserItineraries(){
  return await fetch('/home/getItineraries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },

  })
  .then(res => res.json().then(result => {return result}))
  .catch(err => console.log(err))

}


/*
interface StopOrTravel {
  name: string
  coordinates?: string
  arrival?: string
  departure?: string
  duration?: string
  cost?: string
}

interface Day{
  name: string
  schedule: StopOrTravel[]
}

function Itinerary(props: {
  title: string
  days: Day[]
}) {
  return (
      <BodyText>
        <TR>
        <TD_1>{props.title}</TD_1>

          {props.days && (
            <>
              <Spacer $h2 />
                <TD>
                {props.days.map((rr, i) => (
                  <ul>
                    <b>⏰ {rr.name}</b>
                    {rr.schedule.map((r2, j) => (
                    < ul key={j}>
                    <ul>
                    <Spacer $w2/><b>🚩 {r2.name}</b>
                    {r2.arrival && <p><Spacer $w2/>🌎  Arrival: {r2.arrival}</p> }
                    {r2.departure && <p><Spacer $w2/>🌎  Departure: {r2.departure}</p>}
                    {r2.duration && <p><Spacer $w2/>🌎  Duration: {r2.duration}</p> }
                    {r2.cost && <p><Spacer $w2/>🌎  Cost: {r2.cost}</p>}
                    <Spacer $w8/> <b> ⬇️</b>
                    </ul>
                    </ul>))}

                  </ul>
                ))}
                </TD>
            </>
          )}
        </TR>
      </BodyText>
  )
}*/
/*interface RequiredReading {
  title: string
  href: string
}

function Lecture(props: {
  day: string
  title: string
  description?: string
  href?: string
  requiredReading?: RequiredReading[]
}) {
  return (
    <Table>
      <BodyText>
        <TD>{props.day}</TD>
        <TD>
          <b>{props.href ? <Link href={props.href}>{props.title}</Link> : props.title}</b>

          {props.description && (
            <>
              <Spacer $h2 />
              <i>{props.description}</i>
            </>
          )}
          {props.requiredReading && (
            <>
              <Spacer $h4 />
              <b>Reading</b>
              <Spacer $h2 />
              <ul className="ml4">
                {props.requiredReading.map((rr, i) => (
                  <li key={i}>
                    <Link href={rr.href}>{rr.title}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </TD>
      </BodyText>
    </Table>
  )
}*/

//const Table = style('table', 'w-100 ba b--black')

/*const Section = style('div', 'mb4 mid-gray ba b--mid-gray br2 pa3', (p: { $color?: ColorName }) => ({
  borderLeftColor: Colors[p.$color || 'lemon'] + '!important',
  borderLeftWidth: '3px',
}))*/

//const TR = style('tr', 'ba b--black')

//const TD = style('td', 'mid-gray pa3 v-mid', { minWidth: '7em' })
//const TD_1 = style('td', 'dark-blue pa3 v-mid', { minWidth: '7em' })

/*return (
  <Page>

      <H2>My Itineraries</H2>
      <Spacer $h4 />

      <Spacer $h4 />
      <Table>
        <tbody>
          <Itinerary
            title="Trip 1 Sample Itinerary"
            days={[
              {name:"Day 1",
              schedule:[
                  {
                    name:"UCLA",
                    coordinates: "34.0689° N, 118.4452° W",
                    departure: "9:00 AM",
                  },
                  {
                    name:"Bus",
                    duration:"80 minutes",
                    cost:"$3.25",
                  }
              ]
              },
              {name:"Day 2",
              schedule:[
                  {
                    name:"UCB",
                    coordinates: "34.0689° N, 118.4452° W",
                    departure: "9:00 AM",
                  },
                  {
                    name:"Bus",
                    duration:"80 minutes",
                    cost:"$3.25",
                  }
              ]
              }
            ]
            }

          />
        </tbody>
      </Table>

  </Page>
)*/