import React, { useState, useEffect } from 'react'
import './Payment.css'
import { getStripeKey } from '../../services'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { getFirestore } from 'firebase/firestore'
import { collection, addDoc } from 'firebase/firestore'
import CurrencyFormat from 'react-currency-format'
import { WhiteBox, StyledAlert } from '../StyledComponents'
import Address from './Address'

const Payment = () => {
  const [stripeKey, setStripeKey] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)

  const db = getFirestore()
  const user = useSelector(({ user }) => user)
  const basket = useSelector(({ basket }) => basket)
  const total = useSelector(({ total }) => total)
  const dispatch = useDispatch()
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  useEffect(() => {
    if (total !== 0) {
      getStripeKey(total).then((key) => setStripeKey(key))
    }
  }, [total])

  const handleChange = (e) => {
    setDisabled(e.empty || e.error)
    setError(e.error ? e.error.message : null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setProcessing(true)

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      stripeKey,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    )

    if (error) {
      setError(`Payment failed: ${error.message}`)
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

  return (
    <div className='payment'>
      <Address />

      <WhiteBox className='payment-container'>
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
            value={total / 100}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </div>

        <form className='payment-detail' onSubmit={handleSubmit}>
          <CardElement className='payment-card-info' onChange={handleChange} />

          {error && (
            <StyledAlert severity='error' style={{ marginBottom: '20px' }}>
              {error}
            </StyledAlert>
          )}

          <button
            disabled={processing || disabled}
            className='payment-buy-button'
          >
            <span>{processing ? 'Processing' : 'Buy now!'}</span>
          </button>
        </form>
      </WhiteBox>
    </div>
  )
}

export default Payment
