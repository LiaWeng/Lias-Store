import React from 'react'
import './Checkout.css'
import { useSelector } from 'react-redux'
import CheckoutProduct from './CheckoutProduct'
import Subtotal from './Subtotal'
import { WhiteBox, Divider } from '../StyledComponents'

const Checkout = () => {
  const basket = useSelector(({ basket }) => basket)
  const products = useSelector(({ products }) => products)
  const basketItems = Object.keys(basket)

  return (
    <div className='checkout'>
      <Subtotal />

      <WhiteBox className='checkout-basket'>
        <h1>Your Shopping Basket</h1>

        <Divider style={{ marginTop: '20px' }} />

        {basketItems.map((id) => {
          const product = products.find((product) => product.id === id)
          const number = basket[id]

          return (
            <CheckoutProduct
              product={product}
              number={number}
              key={product.id}
            />
          )
        })}
      </WhiteBox>
    </div>
  )
}

export default Checkout
