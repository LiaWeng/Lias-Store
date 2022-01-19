import React, { useState, useEffect } from 'react'
import './Payment.css'
import { useSelector } from 'react-redux'
import axios from '../../services'
import { WhiteBox, Button } from '../StyledComponents'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getTotal } from '../../reducers/basketReducer'

const Payment = () => {
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  const user = useSelector(({ user }) => user)
  const basket = useSelector(({ basket }) => basket)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        url: '/payment/create',
        body: basket,
      })
      setClientSecret(response.data.clientSecret)
    }

    getClientSecret()
  }, [basket]) //eslint-disable-line

  const handleSubmit = (e) => {
    e.preventDefault()

    setProcessing(true)
    const payload = stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
        redirect_to_url: '/orders',
      })
      .then(() => {
        setSucceeded(true)
        setError(null)
        setProcessing(false)
      })
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

          <Button disabled={processing || disabled || succeeded}>
            <span>{processing ? <p>Processing</p> : 'Buy now!'}</span>
          </Button>
        </form>

        {error && <div>{error}</div>}
      </WhiteBox>
    </div>
  )
}

export default Payment
