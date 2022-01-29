import React, { useState } from 'react'
import './Login.css'
import { auth } from '../../firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux'
import { Input, StyledAlert, WhiteBox } from '../StyledComponents'
import CloseIcon from '@mui/icons-material/Close'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  const formatError = (message) => {
    const newMessage = message
      .substring(message.indexOf('/') + 1, message.length - 2)
      .replaceAll('-', ' ')
    return newMessage.charAt(0).toUpperCase() + newMessage.slice(1) + '.'
  }

  const closeLogin = () => {
    dispatch({
      type: 'CLOSE_LOGIN',
    })
  }

  const signIn = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        closeLogin()
      })
      .catch((error) => setError(formatError(error.message)))
  }

  const register = (e) => {
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        closeLogin()
      })
      .catch((error) => setError(formatError(error.message)))
  }

  return (
    <div className='login-backdrop'>
      <div className='login-animate-container'>
        <WhiteBox>
          <div className='login'>
            <div className='login-prompt'>
              <h1>Please sign in or create an account</h1>
              <CloseIcon
                className='login-close-icon'
                onClick={() => closeLogin()}
              />
            </div>

            <form>
              <div className='login-field'>
                <p>Email</p>
                <Input
                  type='text'
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
              </div>
              <div className='login-field'>
                <p>Password</p>
                <Input
                  type='password'
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>

              {error && (
                <StyledAlert severity='error' style={{ marginTop: '20px' }}>
                  {error}
                </StyledAlert>
              )}

              <div className='login-buttons'>
                <button onClick={signIn}>Sign In</button>
                <button style={{ marginLeft: '20px' }} onClick={register}>
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </WhiteBox>
      </div>
    </div>
  )
}

export default Login
