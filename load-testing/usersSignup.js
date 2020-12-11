import http from 'k6/http'
import { parseHTML } from 'k6/html'
import { check, sleep } from 'k6'
import { Counter, Rate } from 'k6/metrics'
let url = `http://localhost:3000/home/saveItinerary`
let url4 = `http://localhost:3000/home/getItineraries`
let url1 = `http://localhost:3000/auth/createUser`
let url2 = `http://localhost:3000/auth/login`
/*export const options = {
  scenarios: {
    example_scenario: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 100 },
        { duration: '10s', target: 500 },
        {duration: '10s', target: 100},
        {duration: '10s', target: 0},
      ],
      gracefulRampDown: '0s',
    },
  },
}*/
  export const options = {
   scenarios: {
     example_scenario: {
       executor: 'constant-vus',
       vus: 500,
       duration: '10s',
     },
   },
 }

 function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

 function Signup(){


  let myemail = `${__VU}@gmail.com`
  //console.log('user email: ' + myemail)
  let req1 = {email: myemail, password: '123' }

  let req = req1
   var payload = JSON.stringify(req)
   var params = {
    headers: {
      'Content-Type': 'application/json',
     },
   }

  //recordRates(http.post(url1, payload, params))
   //console.log(resp.body)
   let resp = http.post(url1, payload, params)
   check(resp, { 'Signup OK': r => r.status == 200 })

   sleep(Math.random() * 3)

 }



export default function () {
  Signup()
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