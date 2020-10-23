import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { ColorName, Colors } from '../../../../common/src/colors'
import { H1, H2 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { BodyText } from '../../style/text'
import { Link } from '../nav/Link'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomePage(props: HomePageProps) {
  return (
    <Page>
      <Hero>
      <H1>Travel Planner</H1>
      </Hero>
      <Content>
        <RContent>
          <Section>
            <H2>About Us</H2>
            <Spacer $h4 />
            <BodyText>
              Welcome to Travel Planner! This is a platform for you to manage
              all your travel plans. Travelling to a new country, but don't know where to
              start? Travelling on a budget? Want to hit all the popular spots,
              but you are short on time? Don't worry. We got you. Simply let us know what places you'd
              like to visit, and we'll generate an itinerary for you telling
              you exactly how to get from one place to the next, while also keeping your budget
              and time preferences in mind :)
            </BodyText>
            <Spacer $h4 />
          </Section>
        </RContent>
        <Section>
          <div id="searchWrapper">
            <input
              type="text"
              name="searchBar"
              id="searchBar"
              placeholder="search for a place"
            />
          </div>
        </Section>
        <LContent>
          <Section>
            <H2>Course Information</H2>
            <Spacer $h4 />
            <BodyText>
              <table>
                <tbody>
                  <tr>
                    <TD>👨‍🏫</TD>
                    <TD>John Rothfels</TD>
                  </tr>
                  <tr>
                    <TD>✉️</TD>
                    <TD>
                      <Link href="mailto://rothfels@cs.ucla.edu">rothfels@cs.ucla.edu</Link>
                    </TD>
                  </tr>
                  <tr>
                    <TD>⏯</TD>
                    <TD>
                      <Link href="https://ucla.zoom.us/j/92470409406?pwd=eFpyYWFQZGRtcVUzWC9HYlhSakRxZz09">Zoom</Link>
                    </TD>
                  </tr>
                  <tr>
                    <TD>🕒</TD>
                    <TD>
                      <div>
                        <b>Tue, Thu</b> · 8:00 - 9:50am
                      </div>
                    </TD>
                  </tr>
                  <tr>
                    <TD></TD>
                    <TD>
                      <div>
                        <b>Fri</b> · 12:00 - 1:50pm
                      </div>
                      <div>
                        <b>Fri</b> · 2:00 - 3:50pm
                      </div>
                    </TD>
                  </tr>
                </tbody>
              </table>
            </BodyText>
          </Section>
          <Section>
            <H2>Resources</H2>
            <Spacer $h4 />
            <BodyText>
              <ul className="ml4">
                <li>
                  <Link block href="https://www.typescriptlang.org/docs/handbook/intro.html">
                    TypeScript handbook
                  </Link>
                  <Link block href="https://basarat.gitbook.io/typescript/">
                    TypeScript deep-dive
                  </Link>
                </li>
                <li>
                  <Link block href="https://www.typescriptlang.org/play">
                    TypeScript playground
                  </Link>
                </li>
                <li>
                  <Link block href="https://reactjs.org/tutorial/tutorial.html">
                    React tutorial
                  </Link>
                </li>
                <li>
                  <Link block href="https://reactjs.org/docs/hello-world.html">
                    React docs
                  </Link>
                </li>
                <li>
                  <Link block href="https://www.apollographql.com/docs/react/data/queries/">
                    Apollo client docs
                  </Link>
                </li>
                <li>
                  <Link block href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">
                    <code>fetch</code> docs
                  </Link>
                </li>
                <li>
                  <Link block href="#">
                    Project troubleshooting
                  </Link>
                </li>
              </ul>
            </BodyText>
          </Section>
        </LContent>
      </Content>
    </Page>
  )
}

const Hero = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderLeftColor: Colors.mint + '!important',
  borderRightColor: Colors.coral + '!important',
  borderLeftWidth: '4px',
  borderRightWidth: '4px',
})

const Content = style('div', 'flex-l')

const LContent = style('div', 'flex-grow-0 w-70-l mr4-l')

const RContent = style('div', 'flex-grow-0  w-30-l')

const Section = style('div', 'mb4 mid-gray ba b--mid-gray br2 pa3', (p: { $color?: ColorName }) => ({
  borderLeftColor: Colors[p.$color || 'lemon'] + '!important',
  borderLeftWidth: '3px',
}))

const TD = style('td', 'pa1', p => ({
  color: p.$theme.textColor(),
}))