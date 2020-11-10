import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { ColorName, Colors } from '../../../../common/src/colors'
import { H2 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { BodyText } from '../../style/text'
import { Link } from '../nav/Link'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface LecturesPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LecturesPage(props: LecturesPageProps) {
  return (
    <Page>

        <H2>My Itineraries</H2>
        <Spacer $h4 />

        <Spacer $h4 />
        <Table>
          <tbody>
            <Itinerary
              title="Trip1 Sample Itinerary"
              days={[
                {name:"Day1",
                schedule:[
                    {
                      name:"UCLA",
                      coordinates: "34.0689° N, 118.4452° W",
                      departure: "09:00",
                    },
                    {
                      name:"Bus",
                      duration:"80 minutes",
                      cost:"$3.25",
                    }
                ]
                },
                {name:"Day2",
                schedule:[
                    {
                      name:"UCB",
                      coordinates: "34.0689° N, 118.4452° W",
                      departure: "09:00 AM",
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
            <Lecture day="Thu Dec 10" title="Project Presentations" />
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
    <Section>
      <BodyText>
        <h1>{props.title}</h1>
        <TR>
          {props.days && (
            <>
              <Spacer $h4 />
              <ul className="ml4">
                <TD>
                {props.days.map((rr, i) => (
                  <li key={i}>
                    <b>{rr.name}</b>
                    <ul>
                    {rr.schedule.map((r2, j) => (
                    <li key={j}>
                    <Spacer $h2/>
                    <b>{r2.name}</b>
                    {r2.coordinates && <li><b> coordinates: {r2.coordinates}</b></li> }
                    {r2.arrival && <li><b>arrive: {r2.arrival}</b></li> }
                    {r2.departure && <li><b> depart: {r2.departure}</b></li>}
                    {r2.duration && <li><b> duration: {r2.duration}</b></li> }
                    {r2.cost && <li><b> cost: {r2.cost}</b></li> }
                    </li>))}
                    </ul>
                    <Spacer $h4 />
                  </li>
                ))}
                </TD>
                <Spacer $h2/>
              </ul>
            </>
          )}
        </TR>
      </BodyText>
    </Section>
  )
}
interface RequiredReading {
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
    <TR>
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
    </TR>
  )
}

const Table = style('table', 'w-100 ba b--black')

const Section = style('div', 'mb4 mid-gray ba b--mid-gray br2 pa3', (p: { $color?: ColorName }) => ({
  borderLeftColor: Colors[p.$color || 'lemon'] + '!important',
  borderLeftWidth: '3px',
}))

const TR = style('tr', 'ba b--black')

const TD = style('td', 'mid-gray pa3 v-mid', { minWidth: '7em' })
