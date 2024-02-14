import React, {useEffect, useState} from 'react'

import './_loginPage.scss'
import {useDispatch} from 'src/store'
import {LoginAction} from './login.slice'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import {setCookie} from 'src/helpers'
export const LoginPage = () => {
  const dispatch = useDispatch()

  const [loginData, setLoginData] = useState({email: '', password: ''})
  const navigate = useNavigate()
  const handleLogin = () => {
    // console.log(loginData, 'logindatat')

    if (loginData.email.length > 0 && loginData.password.length > 0) {
      dispatch(
        LoginAction({
          loginBody: {email: loginData.email, password: loginData.password},
          onSuccess: (data: any) => {
            console.log(data?.user?._id, 'success login')
            toast.success('Logged In successfully')
            setCookie('userId', data?.user?._id)
            navigate('/products')
          }
        })
      )
    }
  }

  return (
    <>
      <div className="container">
        <h2 className="login-title">Log in</h2>

        <div className="login-form">
          <div>
            <label for="email">Email </label>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              name="email"
              required
              onChange={(e: any) =>
                setLoginData((prev: any) => ({...prev, email: e.target.value}))
              }
            />
          </div>

          <div>
            <label for="password">Password </label>
            <input
              id="password"
              type="password"
              placeholder="password"
              name="password"
              required
              onChange={(e: any) =>
                setLoginData((prev: any) => ({
                  ...prev,
                  password: e.target.value
                }))
              }
            />
          </div>

          <button
            className="btn btn--form"
            type="submit"
            value="Log in"
            onClick={handleLogin}
          >
            Log in
          </button>
        </div>
      </div>
    </>
  )
}
