import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Spacer } from '../../style/spacer'
import { Login } from '../auth/Login'
import { AppRouteParams, PlaygroundApp } from '../nav/route'
import { Surveys } from '../playground/Surveys'
import { Page } from './Page'

interface PlaygroundPageProps extends RouteComponentProps, AppRouteParams {}

export function PlaygroundPage(props: PlaygroundPageProps) {
  return <Page>{getPlaygroundApp(props.app)}</Page>
}

function getPlaygroundApp(app?: PlaygroundApp) {
  if (!app) {
    return <div>choose an app</div>
  }
  switch (app) {
    case PlaygroundApp.SURVEYS:
      return <Surveys />
    case PlaygroundApp.LOGIN:
      return <Login />
    case PlaygroundApp.REVIEWS:
      return <Reviews />
    default:
      throw new Error('no app found')
  }
}

function Reviews() {
  const itineraries = getItineraries()
  const ret = []
  for (const itinerary of itineraries) {
    ret.push(itinerary.transform())
  }
  return <div>{ret}</div>
}

function getItineraries() {
  // once database is ready, change to pulling from database
  const placeholder = new Itinerary('joebruin', [
    ['Santa Monica, Venice'],
    ['LACMA'],
    ['Hollywood, Griffith Park'],
    ['Staples Center, Little Tokyo'],
  ])
  const ret: Itinerary[] = []
  for (let i = 0; i < 20; i++) {
    ret.push(placeholder)
  }
  return ret
}

class Itinerary {
  user: string
  schedule: string[][]
  constructor(user: string, schedule: string[][]) {
    this.user = user
    this.schedule = schedule
  }
  transform() {
    const days = []
    for (const dayIndex in this.schedule) {
      let day = ''
      const dayInput = this.schedule[dayIndex]
      for (const location in dayInput) {
        if (Number(location) < dayInput.length - 1) {
          day += dayInput[location] + ', '
        } else {
          day += dayInput[location]
        }
      }
      days.push(
        <div>
          <div>
            <h4>Day {Number(dayIndex) + 1}</h4>
            <p>{day}</p>
          </div>
          <Spacer $w5 />
        </div>
      )
    }
    return (
      <div className="mw6">
        <div className="pa3 br2 mb2 bg-black-10 flex items-center">
          <h2>{this.user}</h2>
          <Spacer $w5 />
          {days}
        </div>
      </div>
    )
  }
}
