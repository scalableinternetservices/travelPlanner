import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { check } from '../../../../common/src/util'
import { Input } from '../../style/input'
import { style } from '../../style/styled'
import { AppRouteParams } from '../nav/route'
import { handleError } from '../toast/error'
import { Page } from './Page'

// const jsonData = require('./data.js')
let JsonString: string

let daylocation: string[] = []
let duration: string[] = []
let date3: string

let day1: string[] = []
let day2: string[] = []
let day3: string[] = []
let day4: string[] = []
let day5: string[] = []

let dura1: string[] = []
let dura2: string[] = []
let dura3: string[] = []
let dura4: string[] = []
let dura5: string[] = []

let daysDate: string[] = []

interface UserDataProps {
  addresses: string[]
}

function DisplayItin(prop: UserDataProps) {
  return <div>{prop.addresses.map(a => a.concat)}</div>
}

export function userdata(data: string) {
  if ((data = 'd1')) {
    return (
      <React.Fragment>
        <DisplayItin addresses={day1} />
      </React.Fragment>
    )
  } else if ((data = 'd2')) {
    return (
      <React.Fragment>
        <DisplayItin addresses={day2} />
      </React.Fragment>
    )
  } else if ((data = 'd3')) {
    return (
      <React.Fragment>
        <DisplayItin addresses={day3} />
      </React.Fragment>
    )
  } else if ((data = 'd4')) {
    return (
      <React.Fragment>
        <DisplayItin addresses={day4} />
      </React.Fragment>
    )
  } else if ((data = 'd5')) {
    return (
      <React.Fragment>
        <DisplayItin addresses={day5} />
      </React.Fragment>
    )
  } else if ((data = 't1')) {
    return (
      <React.Fragment>
        <DisplayItin addresses={dura1} />
      </React.Fragment>
    )
  } else if ((data = 't2')) {
    return (
      <React.Fragment>
        <DisplayItin addresses={dura2} />
      </React.Fragment>
    )
  } else if ((data = 't3')) {
    return (
      <React.Fragment>
        <DisplayItin addresses={dura3} />
      </React.Fragment>
    )
  } else if ((data = 't4')) {
    return (
      <React.Fragment>
        <DisplayItin addresses={dura4} />
      </React.Fragment>
    )
  } else if ((data = 't5')) {
    return (
      <React.Fragment>
        <DisplayItin addresses={dura5} />
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <DisplayItin addresses={daysDate} />
      </React.Fragment>
    )
  }
}

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomePage(props: HomePageProps) {
  return (
    <Page>
      <Welcome> Welcome to Travel Planner </Welcome>
      <br />
      <AboutUs></AboutUs>
      <br />
      <FlexibleDiv width={'1500px'} height={'420px'} bgcolor={'#ccffcc'} textcolor={'#735999'} boxshadow={'#0dc291'}>
        <h1 style={{ fontSize: '30px' }}>
          <u style={{ lineHeight: '2em' }}>How it works</u>
        </h1>
        <ul style={{ textAlign: 'justify', fontSize: '25px', margin: '30px', lineHeight: '2em' }}>
          <li>
            {' '}
            <p style={{ font: 'Alice' }}>
              <b style={{ fontSize: '25' }}>Step 1:&ensp;</b>
              <b>Type </b> in the place address you would like to visit. (Up to five locations)Select date for that
              place. <b>Select</b> the date that for the locations. <b>Type </b>in the estimcate duration you would like
              to stay there.
            </p>
          </li>
          <li>
            {' '}
            <p style={{ font: 'Alice' }}>
              <b style={{ fontSize: '25' }}>Step 2:&ensp;</b>
              <b>Click "+"</b> to add to the list. (Up to five locations) (OR) <b>Click "-"</b> to remove places from
              the list.
            </p>
          </li>
          <li>
            <p style={{ font: 'Alice' }}>
              <b style={{ fontSize: '25' }}>Step 3:&ensp;</b>
              After adding addresses for day 1, <b>Click "Next"</b> to add address for other day. (Or){' '}
              <b>Click "Edit Previous "</b> to edit the previous day plan.
            </p>
          </li>
          <li>
            <p style={{ font: 'Alice' }}>
              <b style={{ fontSize: '25' }}>Step 4:&ensp;</b>
              <b>Click "Done".</b> Our algorithm will generate most efficient and lowest price schedule for you.
            </p>
          </li>
        </ul>
      </FlexibleDiv>
      <Search></Search>
    </Page>
  )
}

const Welcome = style('div', 'welcomeboard', {
  backgroundColor: '#FAAC58',
  margin: '5px',
  textAlign: 'center',
  color: 'white',

  width: '1000px',
  height: '200px',
  // border: "1px solid red",
  marginLeft: 'auto',
  marginRight: 'auto',
  fontSize: '70px',
  lineHeight: '3em',
})

const LeftSerchDive = style('div', 'Search', {
  width: '730px',
  height: '800px',
  borderRadius: '35px',
  backgroundColor: '#F5A9A9',
  fontSize: '35px',
  color: 'white',
  textAlign: 'center',
  lineHeight: '1em',
  float: 'left',
  visibility: 'visible',
  // border: '2px solid red',
  padding: '20px',
})

const RightSerchDive = style('div', 'Search', {
  width: '730px',
  height: '800px',
  borderRadius: '35px',
  backgroundColor: '#A4A4A4',
  fontSize: '35px',
  color: 'white',
  textAlign: 'center',
  lineHeight: '1em',
  float: 'right',
  visibility: 'visible',
  // border: '2px solid red',
  padding: '20px',
})

const FlexibleDiv = style(
  'div',
  'Search',
  (props: {
    width: string
    height: string
    bgcolor: string
    textcolor: string
    lineheight?: string
    boxshadow?: string
  }) => ({
    width: props.width,
    height: props.height,
    borderRadius: '35px',
    backgroundColor: props.bgcolor,
    fontSize: '35px',
    color: props.textcolor,
    textAlign: 'center',
    lineHeight: props.lineheight,
    float: 'left',
    visibility: 'visible',
    //position: 'fixed',
    wordWrap: 'break-word',
    marginTop: '5px',
    //border: '2px solid red',
    boxShadow: '3px 3px ' + props.boxshadow,
    margin: '10px 10px',
  })
)

const Search = () => {
  const [places, setPlaces] = useState([''])
  const [durations, setDura] = useState([''])
  const [date, setDate] = useState('')

  function Manage(x: any, y: boolean, z: any) {
    if (!y) {
      if ((places as Array<string>).length < 6 && x != 'null' && z > 5 && x != '') {
        setPlaces(places.concat(x))
        setDura(durations.concat(z))
      }

      if (z <= 5) alert('Duration is too short.')
      if (x == '') alert('Enter something in Address.')
      // else
      //   setPlaces(places) //bug 3: want do nothing to the array but instead doing hard refresh
    } else {
      if ((places as Array<string>).length > 1) {
        let start = 0
        let end = (places as Array<string>).length - 1
        setPlaces((places as Array<string>).slice(start, end))
        setDura((durations as Array<string>).slice(start, end))
      } else {
        setPlaces([''])
        setDura([''])
      }
      // setPlaces(places)    //bug 1: want to pop but instead doing hard refresh
    }
  }

  console.log('after slice ' + places)

  function resetplaces(y: boolean) {
    if (y) {
      setDura([''])
      setPlaces([''])
    }
  }

  console.log(places)
  console.log(durations)
  console.log(date)
  return (
    <React.Fragment>
      <FlexibleDiv
        width={'1500px'}
        height={'800px'}
        bgcolor={'#A4A4A4'}
        textcolor={'white'}
        lineheight={'1em'}
        boxshadow={'#9c6687'}
      >
        <LeftSerchDive>
          <DaysAndPlaces
            places={places}
            dur={durations}
            date={date}
            reset={shouldremove => resetplaces(shouldremove)}
          />
          {/* <DaysAndPlaces places={places} /> */}
        </LeftSerchDive>

        <RightSerchDive>
          <SearchForm
            addDate={datex => setDate(datex)}
            onPlaceAdded={(place, remove, durationx) => Manage(place, remove, durationx)}
          />
        </RightSerchDive>
      </FlexibleDiv>
    </React.Fragment>
  )
}

//user's input data

let current_date = new Date()
let current_date_string = current_date.toString()
let current_day = current_date.getDate().toString()
let current_month = (current_date.getMonth() + 1).toString()
let current_year = current_date.getFullYear().toString()
let defaultDate = current_year + '-' + current_month + '-' + current_day

// let AllfiveDate: string[] = []

const SearchForm = (props: {
  onPlaceAdded: (place: string, remove: boolean, durationx: string) => void
  addDate: (datex: string) => void
}) => {
  const [place1, setPlace] = useState('')
  const [placeCount, setPlaceCount] = useState(0)
  const [duration, setDuration] = useState('80')
  const [date, setDate] = useState(defaultDate)
  const [dateError, setDateError] = useState(false)

  function checkDate(dtex: string) {
    if (dtex == '') return true

    let splitted = dtex.split('-', 3)
    let dtex_year = splitted[0]
    let dtex_month = splitted[1]
    let dtex_day = splitted[2]

    console.log('dtex_day : ' + dtex_day)
    console.log('dtex_month : ' + dtex_month)
    console.log('dtex_year : ' + dtex_year)
    console.log('current date : ', current_date_string)
    console.log('current day : ' + current_day)
    console.log('current month : ' + current_month)
    console.log('current year : ' + current_year)

    if (parseInt(dtex_year) < parseInt(current_year)) return true
    if (parseInt(dtex_month) < parseInt(current_month) && parseInt(dtex_year) == parseInt(current_year)) return true
    if (
      parseInt(dtex_year) == parseInt(current_year) &&
      parseInt(dtex_month) == parseInt(current_month) &&
      parseInt(dtex_day) < parseInt(current_day)
    )
      return true

    return false
  }

  function AddDate(datex: string) {
    let isDateError = checkDate(datex)
    setDateError(isDateError)

    console.log('isDateError is : ' + isDateError)

    console.log('Date error : ' + dateError)
    if (dateError) {
      alert('Date is Invalid. Please Try select again.')
      setDate(defaultDate)
      return 'DateError'
    }
    if (date != '' && !dateError) {
      setDate(datex)
      props.addDate(datex)
    }

    return 'NoError'
  }

  function canListIncre() {
    let isthereError = AddDate(date) //bug 4: Delay for one round.

    if (isthereError == 'DateError') return
    if (placeCount < 5) {
      if (place1 != '') setPlaceCount(placeCount + 1)

      props.onPlaceAdded(place1, false, duration)
    } else {
      setPlaceCount(0)
      props.onPlaceAdded('null', false, duration)
    }
  }

  console.log('This is place count : ' + placeCount)

  const InputSubmit = style('button', 'Search', {
    width: '100px',
    height: ' 65px',
    margin: '10px 0',
    backgroundColor: '#424242',
    borderRadius: '5px',
    color: 'white',
  })

  console.log('This is date in RightFrom' + date)

  return (
    <React.Fragment>
      <form>
        <div>
          {' '}
          Address: &ensp; <Input $boxwidth={'500px'} $onChange={setPlace} type="text" />
        </div>
        <br />
        <div>
          {' '}
          Date: &ensp; <Input $boxwidth={'300px'} $onChange={setDate} type="date" />
        </div>
        <br />
        <div>
          {' '}
          Duration: &ensp; <Input $boxwidth={'200px'} $onChange={setDuration} type="number" />
        </div>
        <br />
        <InputSubmit onClick={canListIncre}>+</InputSubmit>
        <br />
        <InputSubmit onClick={() => props.onPlaceAdded(place1, true, duration)}>-</InputSubmit>
        {/* <InputSubmit onClick={() => props.onPlaceAdded(place1, false)} >+</InputSubmit> */}
        <br></br>
        <div>{place1}</div> <br />
      </form>
    </React.Fragment>
  )
}

const DaysAndPlaces = (props: {
  places: Array<string>
  dur: Array<string>
  date: string
  reset: (shouldremove: boolean) => void
}) => {
  //const [DateforEachDay, setDayforEachDay] = useState('')
  //const [Day, setDay] = useState(1)

  function DoneClickHandler() {
    let size_of_daylocation = daylocation.length

    let nameArray: string[] = ['', 'UCLA', 'Asgard', 'Khonoha', 'Selfie Museum', 'Some Where on Earth']

    let coordinateArray_for_realLocation: string[] = [
      '',
      ' 34.0689° N, 118.4452° W',
      ' 34.0689° N, 118.4452° W ',
      ' 34.0689° N, 118.4452° W ',
      ' 34.0689° N, 118.4452° W ',
      '  34.0689° N, 118.4452° W',
    ]

    let departureForLoc: string[] = ['', '09:00', '08:20', '11:30', '12:30', '5:30']

    let costforstop: number[] = [0, 32.23, 1233, 23.0, 2134.0]

    let duration_for_stop: string[] = ['', '09:00', '08:20', '11:30', '12:30', '5:30']

    let x: any[] = []
    let firstime: boolean = true
    for (let i = 1; i < size_of_daylocation; i++) {
      if (i % 2 == 0) {
        x.push({
          type: 'trip',
          transportation: 'bus',
          duration: duration_for_stop[i],
          cost: costforstop[i],
        })
      }

      if (firstime) {
        x.push({
          type: 'departure',
          name: nameArray[i],
          address: daylocation[i],
          coordinate: coordinateArray_for_realLocation[i],
          departure: departureForLoc[i],
        })
        firstime = false
      } else if (i == size_of_daylocation - 1) {
        x.push({
          type: 'arrival',
          name: nameArray[i],
          address: daylocation[i],
          coordinate: coordinateArray_for_realLocation[i],
          arrival: departureForLoc[i],
        })
      } else {
        x.push({
          type: 'stop',
          name: nameArray[i],
          address: daylocation[i],
          coordinate: coordinateArray_for_realLocation[i],
          arrival: departureForLoc[i],
        })
      }
    }

    const json = {
      itinerary: {
        date: date3,
        schedule: x,
      },
    }

    JsonString = JSON.stringify(json)
    console.log(JsonString)

    fetch('/home/saveItinerary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(json),
    })
      .then(res => {
        check(res.ok, 'response status ' + res.status)
        window.location.reload()
      })
      .catch(handleError)
  }

  // function checkisDateDup(dateArr: string[]) {

  //   console.log("props.date is " + props.date + " and dateArr is " + dateArr)
  //   if (dateArr.includes(props.date))
  //     return true;
  //   else
  //     return false;
  // }

  const DayBlock = style(
    'div',
    'Search',
    (props: { width: string; height: string; bgcolor: string; margin: string }) => ({
      width: props.width,
      height: props.height,
      margin: props.margin,
      backgroundColor: props.bgcolor,
      boxShadow: '3px 3px #A9A9F5',
      borderRadius: '5px',
      color: 'white',
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center',
      lineHeight: '2em',
    })
  )

  const ListPlaces = style('li', 'Search', {
    textAlign: 'left',
    margin: '30px 60px',
    visiblilty: 'visible',
    //border: '1px red solid',
  })

  const NextButton = style('button', 'Search', (p: { bgcolor: string }) => ({
    width: '300px',
    height: ' 65px',
    margin: '10px 0',
    backgroundColor: p.bgcolor,
    boxShadow: '3px 3px #A9A9F5',
    borderRadius: '5px',
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    lineHeight: '2em',
  }))

  function onClickNext(Next: boolean) {
    daylocation = props.places
    duration = props.dur
    date3 = props.date
    if (Next && props.places.length == 1) {
      alert('Day schedule is empty.')
    }
    props.reset(true)
    DoneClickHandler()
    console.log('this is Jsonstring : ' + JsonString)
  }
  // function onClickNext(Next: boolean) {

  //   let isDateDup = checkisDateDup(DateforEachDay)
  //   if (Day == 1) {
  //     day1 = props.places;
  //     dura1 = props.dur;
  //   }
  //   if (Day == 2) {
  //     day2 = props.places;
  //     dura2 = props.dur;

  //   }
  //   if (Day == 3) {
  //     day3 = props.places;
  //     dura3 = props.dur;

  //   }
  //   if (Day == 4) {
  //     day4 = props.places;
  //     dura4 = props.dur;

  //   }
  //   if (Day == 5) {
  //     day5 = props.places;
  //     dura5 = props.dur;

  //   }

  //   if (Next && props.places.length == 1) {
  //     alert("Day " + Day + " schedule is empty.")
  //   }

  //   if (Next && isDateDup) {
  //     alert("Date is duplicate.")
  //     props.reset(true)
  //     return

  //   }

  //   if (Next && props.places.length != 1 && !isDateDup) {
  //     if (Day < 5)
  //       setDay(Day + 1)

  //     setDayforEachDay(DateforEachDay.concat(props.date))
  //     props.reset(true)
  //   }
  //   else {
  //     if (Day > 1)
  //       setDay(Day - 1)
  //     let start = 0
  //     let end = (DateforEachDay as Array<string>).length - 1;
  //     setDayforEachDay((DateforEachDay as Array<string>).slice(start, end));

  //   }

  // }

  console.log('Fix day ' + daylocation + ' duration is ' + duration + ' and date ' + date3)

  //console.log(Day)
  console.log('This is day1 array : ' + day1 + ' and Duration 1 : ' + dura1)
  console.log('This is day2 array : ' + day2 + ' and Duration 2 : ' + dura2)
  console.log('This is day3 array : ' + day3 + ' and Duration 3 : ' + dura3)
  console.log('This is day4 array : ' + day4 + ' and Duration 4 : ' + dura4)
  console.log('This is day5 array : ' + day5 + ' and Duration 5 : ' + dura5)
  // console.log("This is AllFiveDate : " + AllfiveDate)
  // console.log('This is DateForEachDay : ' + DateforEachDay)

  return (
    <React.Fragment>
      <DayBlock width={'500px'} height={'65px'} bgcolor={'#5882FA'} margin={'4px 0px'}>
        Day Schdule{' '}
      </DayBlock>
      <br />
      <DayBlock margin={'0px'} width={'500px'} height={'65px'} bgcolor={'#95128a'}>
        Date {props.date}
      </DayBlock>
      <ul>
        <ListPlaces> {props.places[1]}</ListPlaces>
        <ListPlaces> {props.places[2]}</ListPlaces>
        <ListPlaces> {props.places[3]}</ListPlaces>
        <ListPlaces> {props.places[4]}</ListPlaces>
        <ListPlaces> {props.places[5]}</ListPlaces>
      </ul>

      <NextButton bgcolor={'#77b300'} onClick={() => onClickNext(true)}>
        Done
      </NextButton>
      <br />
      {/* <NextButton bgcolor={'#77b300'} onClick={() => onClickNext(false)}>
        {' '}
        Edit Previous
      </NextButton> */}
      <br />
      {/* <NextButton bgcolor={'#0073e6'} onClick={DoneClickHandler}>
        Done
      </NextButton> */}
    </React.Fragment>
  )
}

const AboutUs = () => {
  const AboutUsStyle = style('div', 'About us', {
    width: '1500px',
    height: '400px',
    borderRadius: '35px',
    backgroundColor: '#81BEF7',
    fontSize: '35px',
    color: 'white',
    textAlign: 'justify',
    lineHeight: '1.2em',
    float: 'left',
    visibility: 'visible',
    wordWrap: 'break-word',
    padding: '30px',
    marginTop: '5px',
    boxShadow: '3px 3px #4d79ff',
  })
  return (
    <React.Fragment>
      <AboutUsStyle>
        <h1 style={{ textDecoration: 'underline', textAlign: 'center' }}> About Us </h1>
        <br />
        &ensp; &ensp; Welcome to Travel Planner! This is a platform for you to manage all your travel plans. Travelling
        to a new country, but don't know where to start? Travelling on a budget? Want to hit all the popular spots, but
        you are short on time? Don't worry. We got you. Simply let us know what places you'd like to visit, and we'll
        generate an itinerary for you telling you exactly how to get from one place to the next, while also keeping your
        budget and time preferences in mind :)
      </AboutUsStyle>
    </React.Fragment>
  )
}
