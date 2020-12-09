import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
//import { itinerary } from '../../graphql/query.gen'
//import { H2 } from '../../style/header'
//import { Spacer } from '../../style/spacer'
//import { style } from '../../style/styled'
//import { BodyText } from '../../style/text'
import { AppRouteParams } from '../nav/route'

interface LecturesPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export function LecturesPage(props: LecturesPageProps) {
  const [users, setUsers] = React.useState([] as any[])

    fetch('/home/getItineraries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

    })
    .then(resp => resp.json())
    //resp.then(res => res.json())
    .then(result => {
      console.log(result)
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
  console.log(users)

  return (
    <div>
      hi
      {users.map(it => (
        <p key={it.date}>{JSON.stringify(it)}</p>
      ))}
    </div>
    )
}



