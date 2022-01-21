import React, { useState, useEffect } from 'react'
import './Payment.css'
import { useSelector } from 'react-redux'
import axios from '../../services'
import { WhiteBox, Button } from '../StyledComponents'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getTotal } from '../../reducers/basketReducer'
import { useNavigate } from 'react-router'

const Payment = () => {
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState(null)
  // const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  const user = useSelector(({ user }) => user)
  const basket = useSelector(({ basket }) => basket)
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  useEffect(() => {
    if (basket.length !== 0) {
      const getClientSecret = async () => {
        const response = await axios.post('/payment/create', {
          basket,
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

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
    }

    navigate('/orders')
  }

  const handleChange = (e) => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message : null)
  }

  return (
    <div className='payment'>
      <WhiteBox>
        <h2 className='payment-title'>Delivery Address</h2>
        <p>{user?.email}</p>
        <p>50 Town Centre Court</p>
      </WhiteBox>
      <WhiteBox>
        <h2 className='payment-title'>Payment Method</h2>

        <div className='payment-price'>
          <CurrencyFormat
            renderText={(value) => (
              <div>
                <strong>Total: {` ${value}`} </strong>
                <span> ({basket.length} items + taxes)</span>
              </div>
            )}
            decimalScale={2}
            value={getTotal(basket) * 1.13}
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
