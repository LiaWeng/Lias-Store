import React, { useState, useEffect } from 'react'
import './Payment.css'
import { getStripeKey } from '../../services'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { db } from '../../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import CurrencyFormat from 'react-currency-format'
import { decryptTotal } from '../../crypto'
import { WhiteBox, Button, StyledAlert } from '../StyledComponents'

const Payment = () => {
  const [total, setTotal] = useState(0)
  const [stripeKey, setStripeKey] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)

  const user = useSelector(({ user }) => user)
  const basket = useSelector(({ basket }) => basket)
  const dispatch = useDispatch()
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const { encryptedTotal } = useParams()

  useEffect(() => {
    if (basket.length !== 0) {
      decryptTotal(encryptedTotal).then((total) => setTotal(total))
    } else {
      setDisabled(true)
    }
  }, [basket]) //eslint-disable-line

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
          <CardElement className='payment-card-info' onChange={handleChange} />

          {error && <StyledAlert severity='error'>{error}</StyledAlert>}

          <Button
            disabled={processing || disabled}
            className='payment-buy-button'
          >
            <span>{processing ? 'Processing' : 'Buy now!'}</span>
          </Button>
        </form>
      </WhiteBox>
    </div>
  )
}

export default Payment
