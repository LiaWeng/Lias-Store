import React, { useState, useEffect } from 'react'
import './Payment.css'
import axios from '../../services'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { db } from '../../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import CurrencyFormat from 'react-currency-format'
import { getTotal } from '../../reducers/basketReducer'
import { WhiteBox, Button } from '../StyledComponents'

const Payment = () => {
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState(null)
  // const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  const user = useSelector(({ user }) => user)
  const basket = useSelector(({ basket }) => basket)
  const dispatch = useDispatch()
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const { total } = useParams()

  useEffect(() => {
    if (basket.length !== 0) {
      const getClientSecret = async () => {
        const response = await axios.post('/payment/create', {
          total: total * 100,
        })
        setClientSecret(response.data.clientSecret)
      }

      getClientSecret()
    } else {
      setDisabled(true)
    }
  }, [basket]) //eslint-disable-line

  const handleSubmit = async (e) => {
    e.preventDefault()

    setProcessing(true)

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    )

    if (error) {
      setError(`Payment failed ${error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
    }

    await addDoc(collection(db, 'users', user.uid, 'orders'), {
      basket: basket,
      amount: paymentIntent.amount,
      created: paymentIntent.created,
    })

    dispatch({
      type: 'EMPTY_BASKET',
    })
    navigate('/orders')
  }

  const handleChange = (e) => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message : null)
  }

  return (
    <div className='payment'>
      <WhiteBox style={{ width: '100%', marginRight: '40px' }}>
        <h2 className='payment-title'>Delivery Address</h2>
        <p>{user?.email}</p>
        <p>50 Town Centre Court</p>
      </WhiteBox>
      <WhiteBox style={{ width: '100%' }}>
        <h2 className='payment-title'>Payment Method</h2>

        <div className='payment-price'>
          <CurrencyFormat
            renderText={(value) => (
              <div>
                <strong>Total: {` ${value}`} </strong>
                <span> (taxes included)</span>
              </div>
            )}
            decimalScale={2}
            value={total}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </div>

        <form className='payment-detail' onSubmit={handleSubmit}>
          <CardElement className='card-info' onChange={handleChange} />

          <Button disabled={processing || disabled}>
            <span>{processing ? 'Processing' : 'Buy now!'}</span>
          </Button>
        </form>

        {error && <div>{error}</div>}
      </WhiteBox>
    </div>
  )
}

export default Payment
