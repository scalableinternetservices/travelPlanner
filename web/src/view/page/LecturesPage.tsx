import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { check } from '../../../../common/src/util'
import { H2 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { BodyText } from '../../style/text'
import { AppRouteParams } from '../nav/route'
import { handleError } from '../toast/error'
import { Page } from './Page'


interface LecturesPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LecturesPage(props: LecturesPageProps) {

  var itinerary
  fetch('/home/getItineraries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },

  })
  .then(res => {
    itinerary = res
    check(res.ok, 'response status ' + res.status)
    window.location.reload()
  })
  .catch(handleError)

  console.log(itinerary)


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
}

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
}
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

const Table = style('table', 'w-100 ba b--black')

/*const Section = style('div', 'mb4 mid-gray ba b--mid-gray br2 pa3', (p: { $color?: ColorName }) => ({
  borderLeftColor: Colors[p.$color || 'lemon'] + '!important',
  borderLeftWidth: '3px',
}))*/

const TR = style('tr', 'ba b--black')

const TD = style('td', 'mid-gray pa3 v-mid', { minWidth: '7em' })
const TD_1 = style('td', 'dark-blue pa3 v-mid', { minWidth: '7em' })