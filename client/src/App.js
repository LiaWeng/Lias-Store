import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { auth } from './firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { db } from './firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Checkout from './components/Checkout/Checkout'
import Orders from './components/Orders/Orders'
import Payment from './components/Payment/Payment'

const promise = loadStripe(
  'pk_test_51KIjoQCVSEHWYKdnzUdoSgXfTpA9NkKkrvAoUi6fIsvPcLw7e0XOXe8vWQv2IA5wJVc2Xqd5QkKtPXpEImcRhhwJ00BBXeA1HZ'
)

const App = () => {
  const [login, setLogin] = useState(false)
  const dispatch = useDispatch()

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, 'products'))
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }))

    dispatch({
      type: 'SET_PRODUCTS',
      data: products,
    })
  }, [])

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch({
        type: 'SET_USER',
        data: user,
      })
    } else {
      dispatch({
        type: 'SET_USER',
        data: null,
      })
    }
  })

  return (
    <BrowserRouter className='app'>
      <Header setLogin={setLogin} />
      {login && <Login setLogin={setLogin} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orders' element={<Orders />} />
        <Route
          path='/payment/:total'
          element={
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
