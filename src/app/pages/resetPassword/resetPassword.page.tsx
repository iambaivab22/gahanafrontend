import React, {useEffect, useState} from 'react'

import './_resetPassword.scss'
import {useDispatch} from 'src/store'

import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import {setCookie} from 'src/helpers'
import {useAuth} from 'src/app/routing'
export const ResetPasswordPage = () => {
  const dispatch = useDispatch()

  const [loginData, setLoginData] = useState({
    password: '',
    confirmpassword: ''
  })
  const navigate = useNavigate()
  const {handleLogin} = useAuth()
  const handleResetPassword = () => {
    // console.log(loginData, 'logindatat')

    if (loginData.password.length > 0 && loginData.confirmpassword.length > 0) {
      //   if (
      //     loginData?.email === 'meromail123@gmail.com' &&
      //     loginData?.password === '12345673'
      //   ) {
      //     setCookie('userRoles', 'ADMIN')
      //   }
      //   dispatch(
      //     LoginAction({
      //       loginBody: {email: loginData.email, password: loginData.password},
      //       onSuccess: (data: any) => {
      //         console.log(data?.user?._id, 'success login')
      //         toast.success('Logged In successfully')
      //         console.log('loginnnnnnnn')
      //         setCookie('userId', data?.user?._id)
      //         // setCookie('userRoles', data?.userRoles)
      //         console.log(
      //           loginData?.email,
      //           loginData?.password,
      //           'email and password'
      //         )
      //         if (
      //           loginData?.email === 'adminemail12@gmail.com' &&
      //           loginData?.password === '12345678'
      //         ) {
      //           setCookie('userRoles', 'ADMIN')
      //           handleLogin(data.token, 'ADMIN')
      //         } else {
      //           setCookie('userRoles', 'USER')
      //           handleLogin(data.token, 'USER')
      //         }
      //         navigate('/home')
      //       }
      //     })
      //   )
    }
  }

  return (
    <>
      <h2 className="login-title">Reset your password</h2>
      <div className="container">
        <div className="login-form">
          {/* <div>
            <label htmlFor="email">Email </label>
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
          </div> */}

          <div>
            <label htmlFor="password">New Password </label>
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

          <div>
            <label htmlFor="password">Confirm Password </label>
            <input
              id="password"
              type="password"
              placeholder="password"
              name="password"
              required
              onChange={(e: any) =>
                setLoginData((prev: any) => ({
                  ...prev,
                  confirmpassword: e.target.value
                }))
              }
            />
          </div>

          <button
            className="btn btn--form"
            style={{background: 'rgb(197 49 213)'}}
            type="submit"
            value="Log in"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>

          {/* <p onClick={handleResetPassword}>Reset Password?</p> */}
        </div>
      </div>
    </>
  )
}
