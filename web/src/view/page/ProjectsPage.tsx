import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Spacer } from '../../style/spacer'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface ProjectsPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ProjectsPage(props: ProjectsPageProps) {
  const [itineraries, setItineraries] = React.useState([] as any[])
  console.log("Explore Page")

  React.useEffect(() => {
    fetch('/explore/getItineraries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => setItineraries(json))
    .catch(err => console.log(err))
  }, [])

  console.log(itineraries)

  console.log(itineraries[0])

  var itineraryJSX = []
  for (const index in itineraries) {
    const locationsJSX = []
    for (const location of itineraries[index].schedule) {
      if (location.name) {
        locationsJSX.push(<p>📍</p>)
        locationsJSX.push(<p>{location.name}</p>)
        locationsJSX.push(<Spacer $w5 />)
      } else {
        switch (location.transportation) {
          case "bus":
            locationsJSX.push(<p>🚍</p>)
            locationsJSX.push(<Spacer $w5 />)
            break
          default:
            locationsJSX.push(<p>➡️</p>)
            locationsJSX.push(<Spacer $w5 />)
        }
      }
    }
    itineraryJSX.push(<div key={index} className="mw8">
      <div className="pa3 br2 mb2 bg-black-10 flex items-center">
        <h2>{itineraries[index].user_email}</h2>
        <Spacer $w8 />
        {locationsJSX}
      </div>
    </div>)
  }

  return (
    <Page>
      <div key={'meta'}>{itineraryJSX}</div>
    </Page>
  )
}