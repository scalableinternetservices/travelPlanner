import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { check } from '../../../../common/src/util'
import { Button } from '../../style/button'
import { Input } from '../../style/input'
import { Spacer } from '../../style/spacer'
import { handleError } from '../toast/error'
import { toastErr } from '../toast/toast'
import { UserContext } from './user'

export function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setError] = useState({ email: false, password: false })
  const { user } = useContext(UserContext)

  // reset error when email/password change
  useEffect(() => setError({ ...err, email: !validateEmail(email) }), [email])
  useEffect(() => setError({ ...err, password: false }), [password])

  function login() {
    if (!validate(email, password, setError)) {
      toastErr('invalid email/password')
      return
    }

    fetch('/auth/createUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(async res => {
        if (res.status == 200) {
          check(res.ok, 'response status ' + res.status)
          return true
        } else {
          toastErr(await res.text())
          return false
        }
      })
      //.then(() => window.location.replace('/'))
      .then(bool => {if (bool) { window.location.reload()} })
      .catch(err => {
        toastErr(err.toString())
        setError({ email: true, password: true })
      })
  }

  if (user) {
    return <Logout />
  }

  return (
    <>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="email">
          Email address
        </label>
        <Input $hasError={err.email} $onChange={setEmail} $onSubmit={login} name="email" type="email" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="password">
          Password
        </label>
        <Input $hasError={err.password} $onChange={setPassword} $onSubmit={login} name="password" />
      </div>
      <div className="mt3">
        <Button onClick={login}>Sign Up</Button>
      </div>
    </>
  )
}

function Logout() {
  const { user } = useContext(UserContext)

  function logout() {
    fetch('/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        check(res.ok, 'response status ' + res.status)
        window.location.reload()
      })
      .catch(handleError)
  }

  return (
    <>
      <Spacer $h5 />
      <div className='mt3'> { user?.name }</div>
      <div className="mt3">
        <Button onClick={logout}>Logout</Button>
      </div>
    </>
  )
}

function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

function validatePassword(password: string) {
  // const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  // return re.test(String(password).toLowerCase())
  return true
}

function validate(
  email: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<{ email: boolean; password: boolean }>>
) {
  const validEmail = validateEmail(email)
  const validPassword = validatePassword(password)
  console.log('valid', validEmail, validPassword)
  setError({ email: !validEmail, password: !validPassword })
  return validEmail && validPassword
}
