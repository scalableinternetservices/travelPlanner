import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { Input } from '../../style/input'
import { style } from '../../style/styled'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'



interface HomePageProps extends RouteComponentProps, AppRouteParams { }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomePage(props: HomePageProps) {
  return (
    <Page>
      <Welcome> Welcome to Travel Planner  </Welcome>
      <br />
      <CircularDiv bgColor='#81BEF7' para='About Us'> </CircularDiv>
      <CircularDiv bgColor='#F78181' para='Login'> </CircularDiv>
      <CircularDiv bgColor='#A4A4A4' para='Search'></CircularDiv>
      <AboutUs  ></AboutUs>
      <UserLogin></UserLogin>
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
  float: "left",
  visibility: 'visible',
  border: '2px solid red',
  padding: '20px'
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
  float: "right",
  visibility: 'visible',
  border: '2px solid red',
  padding: '20px'
})


const SearchDiv = style('div', 'Search', {
  width: '1500px',
  height: '800px',
  borderRadius: '35px',
  backgroundColor: '#A4A4A4',
  fontSize: '35px',
  color: 'white',
  textAlign: 'center',
  lineHeight: '1em',
  float: "left",
  visibility: 'visible',
  position: 'absolute',
  wordWrap: 'break-word',
  marginTop: '5px',
  border: '2px solid red'

})

const Search = () => {

  const [places, setPlaces] = useState([''])

  return (
    <React.Fragment>
      <SearchDiv>

        <LeftSerchDive>
          <DaysAndPlaces places={places} />
        </LeftSerchDive>





        <RightSerchDive>
          <SearchForm onPlaceAdded={(place) => setPlaces(places.concat(place))} />
        </RightSerchDive>

      </SearchDiv>
    </React.Fragment>

  )
}




const SearchForm = (props: { onPlaceAdded: (place: string) => void }) => {


  const [place1, setPlace] = useState('')


  const SearchDone = style('button', 'search', {
    width: '150px',
    height: ' 65px',
    margin: '10px 0',
    backgroundColor: '#1C1C1C',
    borderRadius: '5px',
    color: 'white',
  }

  )


  const InputSubmit = style('button', 'Search', {
    width: '100px',
    height: ' 65px',
    margin: '10px 0',
    backgroundColor: '#424242',
    borderRadius: '5px',
    color: 'white',

  })


  return (
    <React.Fragment>
      <form>
        <Input $onChange={setPlace} name="email" type="text" />

        <InputSubmit onClick={() => props.onPlaceAdded(place1)} >+</InputSubmit>
        <br></br>
        <SearchDone >Done</SearchDone>
        <div>
          {place1}
        </div> <br />


      </form>


    </React.Fragment>
  )
}



const DaysAndPlaces = (props: any) => {

  const DayBlock = style('div', 'Search', {
    width: '500px',
    height: ' 65px',
    margin: '10px 0',
    backgroundColor: '#5882FA',
    boxShadow: '3px 3px #A9A9F5',
    borderRadius: '5px',
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    lineHeight: '2em',

  })


  const ListPlaces = style('li', 'Search', {
    textAlign: 'left',
    margin: '30px 60px',
    visiblilty: 'visible',

  })



  return (
    <React.Fragment>
      <DayBlock>Day 1 Schdule</DayBlock>
      <ul>
        <ListPlaces > {props.places[2]}</ListPlaces>
        <ListPlaces > {props.places[3]}</ListPlaces>
        <ListPlaces > {props.places[4]}</ListPlaces>
        <ListPlaces > {props.places[5]}</ListPlaces>
        <ListPlaces > {props.places[6]}</ListPlaces>


      </ul>


    </React.Fragment>
  )

}





const AboutUs = () => {

  const AboutUsStyle = style('div', 'About us', {
    width: '500px',
    height: '800px',
    borderRadius: '7%',
    backgroundColor: '#81BEF7',
    fontSize: '35px',
    color: 'white',
    textAlign: 'center',
    lineHeight: '1em',
    float: "left",
    visibility: 'hidden',
    position: 'relative',
    wordWrap: 'break-word',
    padding: '30px',
    marginTop: '5px',

  })
  return (
    <React.Fragment>

      <AboutUsStyle>
        Welcome to Travel Planner! This is a platform for you to manage
        all your travel plans. Travelling to a new country, but don't know where to
        start? Travelling on a budget? Want to hit all the popular spots,
        but you are short on time? Don't worry. We got you. Simply let us know what places you'd
        like to visit, and we'll generate an itinerary for you telling
        you exactly how to get from one place to the next, while also keeping your budget
        and time preferences in mind :)
        </AboutUsStyle>


    </React.Fragment>

  )
}
const UserLogin = () => {


  return (
    <div>
      link to Login Page
    </div>

  )

}

const CircularDiv = (props: any) => {

  const CircularStyle = style('div', 'CirularDiv', {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: props.bgColor,
    fontSize: '30px',
    color: 'white',
    textAlign: 'center',
    lineHeight: '6em',
    float: "left",
    marginLeft: '100px',
    wordWrap: 'break-word',

  })

  function clickHandler() {


    let x = Array.from(document.getElementsByClassName("About Us") as HTMLCollectionOf<HTMLElement>)
    // let y = Array.from(document.getElementsByClassName("Login") as HTMLCollectionOf<HTMLElement>)
    let z = Array.from(document.getElementsByClassName("Search") as HTMLCollectionOf<HTMLElement>)


    if (props.para == "About Us") {

      for (let i = 0; i < x.length; i++) {

        if (x[i].style.visibility == 'hidden') {
          x[i].style.visibility = 'visible'

          for (let j = 0; j < z.length; j++) {
            z[i].style.visibility = 'hidden'
          }

        }
        else {
          x[i].style.visibility = 'hidden'
        }
      }

    }
    if (props.para == 'Login') {


    }
    if (props.para = 'Search') {

      for (let i = 0; i < z.length; i++) {

        if (z[i].style.visibility == 'hidden') {
          z[i].style.visibility = 'visible'

          for (let j = 0; j < z.length; j++) {
            x[i].style.visibility = 'hidden'
          }

        }
        else {
          z[i].style.visibility = 'hidden'
        }
      }

    }
  }

  return (
    <React.Fragment>
      <button onClick={clickHandler}>
        <CircularStyle>
          {props.para}
        </CircularStyle>
      </button>

    </React.Fragment>

  )

}



