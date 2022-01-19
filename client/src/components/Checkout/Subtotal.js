import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../StyledComponents'
import { getTotal } from '../../reducers/basketReducer'

const Subtotal = () => {
  const basket = useSelector(({ basket }) => basket)
  const navigate = useNavigate()

  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <h2>
            Subtotal ({basket.length} items): {` ${value}`}
          </h2>
        )}
        decimalScale={2}
        value={getTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />

      <CurrencyFormat
        renderText={(value) => <p>Taxes: {` ${value}`}</p>}
        decimalScale={2}
        value={getTotal(basket) * 0.13}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />

      <p>Free delivery</p>

      <div className='gift'>
        <input type='checkbox' />
        This order contains a gift.
      </div>

      <Button onClick={() => navigate('/payment')}>Go to Checkout</Button>
    </div>
  )
}

export default Subtotal
