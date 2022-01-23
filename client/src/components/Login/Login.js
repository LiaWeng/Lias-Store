import React, { useState } from 'react'
import './Login.css'
import { auth } from '../../firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Button, Input, StyledAlert } from '../StyledComponents'
import CloseIcon from '@mui/icons-material/Close'

const Login = ({ setLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const formatError = (message) => {
    const newMessage = message
      .substring(message.indexOf('/') + 1, message.length - 2)
      .replaceAll('-', ' ')
    return newMessage.charAt(0).toUpperCase() + newMessage.slice(1) + '.'
  }

  const signIn = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLogin(false)
      })
      .catch((error) => setError(formatError(error.message)))
  }

  const register = (e) => {
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/')
        setLogin(false)
      })
      .catch((error) => setError(formatError(error.message)))
  }

  return (
    <div className='login-page'>
      <CloseIcon className='login-close-icon' onClick={() => setLogin(false)} />

      <div className='login'>
        <h1>Please sign in or create an account</h1>

        <form>
          <div className='login-field'>
            <div>Email</div>
            <Input
              type='text'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className='login-field'>
            <div>Password</div>
            <Input
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          {error && <StyledAlert severity='error'>{error}</StyledAlert>}

          <div className='login-buttons'>
            <Button onClick={signIn}>Sign In</Button>
            <Button style={{ marginLeft: '20px' }} onClick={register}>
              Create Account
            </Button>
          </div>
        </form>
      </div>

      <div className='login-google'>
        <h2>Or you can...</h2>
        <Button style={{ marginLeft: '20px' }}>Sign In with Google</Button>
      </div>
    </div>
  )
}

export default Login
