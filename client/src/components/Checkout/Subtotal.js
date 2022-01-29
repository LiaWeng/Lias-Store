import React, { useState, useEffect } from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { encryptTotal } from '../../crypto'
import { StyledAlert } from '../StyledComponents'

const calculateTotal = async (basket, products) => {
  let subtotal = 0
  let itemNumber = 0
  for (let id in basket) {
    const product = products.find((product) => product.id === id)
    subtotal += product.data.price * basket[id]
    itemNumber += basket[id]
  }

  const total = Math.round(subtotal * 1.13 * 100) / 100
  const encryptedTotal = await encryptTotal(total)

  return { encryptedTotal, subtotal, itemNumber }
}

const Subtotal = () => {
  const [totalData, setTotalData] = useState(null)
  const basket = useSelector(({ basket }) => basket)
  const user = useSelector(({ user }) => user)
  const products = useSelector(({ products }) => products)
  const navigate = useNavigate()

  useEffect(() => {
    calculateTotal(basket, products).then((totalData) => {
      setTotalData(totalData)
    })
  }, [basket, products])

  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <h2>
            Subtotal ({totalData?.itemNumber} items): {` ${value}`}
          </h2>
        )}
        decimalScale={2}
        value={totalData?.subtotal}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />

      <CurrencyFormat
        renderText={(value) => <p>Taxes: {` ${value}`}</p>}
        decimalScale={2}
        value={totalData?.subtotal * 0.13}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />

      <p className='subtotal-delivery'>Free delivery</p>

      {!user && (
        <StyledAlert severity='error' style={{ marginBottom: '20px' }}>
          Please sign in to proceed to checkout.
        </StyledAlert>
      )}

      <button
        onClick={() => {
          navigate(`/payment/${totalData?.encryptedTotal}`)
        }}
        disabled={Object.keys(basket).length === 0 || !user}
      >
        Go to Checkout
      </button>
    </div>
  )
}

export default Subtotal
