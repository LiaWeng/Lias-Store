import React, { useState } from 'react'
import './Login.css'
import { Button, Input } from '../StyledComponents'
import { auth } from '../../firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import CloseIcon from '@mui/icons-material/Close'

const Login = ({ setLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signIn = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLogin(false)
      })
      .catch((error) => alert(error.message))
  }

  const register = (e) => {
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/')
        setLogin(false)
      })
      .catch((error) => alert(error.message))
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
          <Button onClick={signIn}>Sign In</Button>
          <Button style={{ marginLeft: '20px' }} onClick={register}>
            Create Account
          </Button>
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
