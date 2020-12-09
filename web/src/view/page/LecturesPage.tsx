import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { H2 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { BodyText } from '../../style/text'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface LecturesPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars


export function LecturesPage(props: LecturesPageProps) {
  const [users, setUsers] = React.useState([] as any[])

  if (users.length == 0){
    fetch('/home/getItineraries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

    })
    .then(resp => resp.json())
    //resp.then(res => res.json())
    .then(result => {
      //console.log(result)
    let itineraryListLen = result.length
    //itineraryListLen =
    //console.log('ELEMENTS BELOW')
    let list_its = new Array
    for(let i = 0; i < itineraryListLen; i++){
      //console.log(result[i])
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
          //console.log('Departure: ' + JSON.stringify(cur_sched[j]))
          cur_pit_stop = {
            name: cur_sched[j].name,
            type: cur_sched[j].type,
            departure: cur_sched[j].departure,
          }
        }
        else if(j == schedule_len -1){
          //arrival
          //console.log('Arrival: ' + JSON.stringify(cur_sched[j]))
          cur_pit_stop = {
            name: cur_sched[j].name,
            type: cur_sched[j].type,
            arrival: cur_sched[j].arrival,
          }
        }
        else if(j % 2 == 0){
          //stop
          //console.log('Stop: ' + JSON.stringify(cur_sched[j]))
          cur_pit_stop = {
            name: cur_sched[j].name,
            type: cur_sched[j].type,
            departure: cur_sched[j].departure,
            arrival: cur_sched[j].arrival,
            duration: cur_sched[j].duration,
          }
        }
        else{
          //trip
          //console.log('Trip: ' + JSON.stringify(cur_sched[j]))
          cur_pit_stop = {
            transportation :cur_sched[j].transportation,
            duration: cur_sched[j].duration,
            cost: cur_sched[j].cost,
          }
        }
        //console.log(cur_pit_stop)
        schedArr.push(cur_pit_stop)
      }
      var my_itinerary = {
        date: cur_date,
        schedule: schedArr
      }
      //console.log(my_itinerary)
      list_its.push(my_itinerary)

    }
    //console.log(list_its)
    setUsers(list_its)
    })
  //console.log(users)
  }

  return (
    <Page>
      <H2>My Itineraries </H2>
      {users.map((it, i) => (
        <div key={i}>
          <Itinerary
            date={it.date}
            schedule={it.schedule}
          />
        </div>
      ))}
    </Page>
    )

}
interface pit_stop {
  name: string
  type: string
  address: string
  coordinates?: string
  transportation? : number
  arrival?: string
  departure?: string
  duration?: number
  cost?: number
}

function Itinerary(props: {
  date: string
  schedule: pit_stop[]}
  ){
  return (
  <div>
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

  </div>
)

}

/*const Section = style('div', 'mb4 mid-gray ba b--mid-gray br2 pa3', (p: { $color?: ColorName }) => ({
  borderLeftColor: Colors[p.$color || 'lemon'] + '!important',
  borderLeftWidth: '3px',
}))*/
const Table = style('table', 'w-100 ba b--black')
const TR = style('tr', 'ba b--black')
const TD = style('td', 'mid-gray pa3 v-mid', { minWidth: '7em' })
const TD_1 = style('td', 'dark-blue pa3 v-mid', { minWidth: '7em' })
