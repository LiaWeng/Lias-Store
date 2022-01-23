import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../StyledComponents'

const Subtotal = () => {
  const basket = useSelector(({ basket }) => basket)
  const products = useSelector(({ products }) => products)
  const navigate = useNavigate()

  let subtotal = 0
  let itemNumber = 0
  for (let id in basket) {
    const product = products.find((product) => product.id === id)
    subtotal += product.data.price * basket[id]
    itemNumber += basket[id]
  }

  const total = Math.round(subtotal * 1.13 * 100) / 100

  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <h2>
            Subtotal ({itemNumber} items): {` ${value}`}
          </h2>
        )}
        decimalScale={2}
        value={subtotal}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />

      <CurrencyFormat
        renderText={(value) => <p>Taxes: {` ${value}`}</p>}
        decimalScale={2}
        value={subtotal * 0.13}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />

      <p>Free delivery</p>

      <div className='gift'>
        <input type='checkbox' />
        This order contains a gift.
      </div>

      <Button
        onClick={() => navigate(`/payment/${total}`)}
        disabled={Object.keys(basket).length === 0}
      >
        Go to Checkout
      </Button>
    </div>
  )
}

export default Subtotal
