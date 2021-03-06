/*

  Used the cookie created for user: test1@gmail.com pw: test1
  Tests saveItinerary Request

  for local testing only: (create a user and use breakpoints to figure out the cookie for that user and paste it
    into the header field)

*/
import http from 'k6/http'
import { check, sleep } from 'k6'
import { Counter, Rate } from 'k6/metrics'
let url = `http://localhost:3000/home/saveItinerary`
export const options = {
  scenarios: {
    example_scenario: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 1000 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '0s',
    },
  },
}
 /*export const options = {
   scenarios: {
     example_scenario: {
       executor: 'constant-vus',
       vus: 1,
       duration: '1s',
     },
   },
 }*/

 function postSchedule(){
   let req = {
    itinerary:{
      date: '2020-12-08',
      schedule: [
        {type: 'departure', name: 'ucla', address: 'ucla', coordinates: ' 34.0689° N, 118.4452° W', departure: '09:00'},
        {type: 'trip', transportation: 'bus', duration: 70, cost: 32.23},
        {type: 'stop', name: 'ucb', address: 'ucb', coordinates: ' 34.0689° N, 118.4452° W ', arrival: '10:10', departure: '10:20', duration: 10},
        {type: 'trip', transportation: 'bus', duration: 80, cost: 1233},
        {type: 'stop', name: 'usc', address: 'usc', coordinates: ' 34.0689° N, 118.4452° W ', arrival: '11:40', departure: '11:50', duration: 10},
        {type: 'trip', transportation: 'bus', duration: 50, cost: 23},
        {type: 'stop', name: 'ucsd', address: 'ucsd', coordinates: ' 34.0689° N, 118.4452° W ', arrival: '12:40', departure: '12:50', duration: 10},
        {type: 'trip', transportation: 'bus', duration: 80, cost: 2134},
        {type: 'arrival', name: 'uci', address: 'uci', coordinates: '  34.0689° N, 118.4452° W', arrival: '14:10'}
      ]
    }
  }

   var payload = JSON.stringify(req)
   var params = {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': 'authToken=f244e449-e80d-46a4-b333-974b161bc1f6',
     },
   }

   let resp = http.post(url, payload, params)
   console.log(resp.body)
   check(resp, { 'status 200': r => r.status == 200 })
 }

export default function () {
  // recordRates(
  // const resp = http.post(
  //   'http://localhost:3000/graphql',
  //   '{"operationName":"AnswerSurveyQuestion","variables":{"input":{"answer":"🤗","questionId":1}},"query":"mutation AnswerSurveyQuestion($input: SurveyInput!) {\\n  answerSurvey(input: $input)\\n}\\n"}',
  //   {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // )

  postSchedule()
  sleep(Math.random() * 3)
}

const count200 = new Counter('status_code_2xx')
const count300 = new Counter('status_code_3xx')
const count400 = new Counter('status_code_4xx')
const count500 = new Counter('status_code_5xx')

const rate200 = new Rate('rate_status_code_2xx')
const rate300 = new Rate('rate_status_code_3xx')
const rate400 = new Rate('rate_status_code_4xx')
const rate500 = new Rate('rate_status_code_5xx')

function recordRates(res) {
  if (res.status >= 200 && res.status < 300) {
    count200.add(1)
    rate200.add(1)
  } else if (res.status >= 300 && res.status < 400) {
    console.log(res.body)
    count300.add(1)
    rate300.add(1)
  } else if (res.status >= 400 && res.status < 500) {
    count400.add(1)
    rate400.add(1)
  } else if (res.status >= 500 && res.status < 600) {
    count500.add(1)
    rate500.add(1)
  }
}