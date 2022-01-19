import React from 'react'
import './Checkout.css'
import { useSelector } from 'react-redux'
import CheckoutProduct from './CheckoutProduct'
import Subtotal from './Subtotal'
import { WhiteBox } from '../StyledComponents'

const Checkout = () => {
  const basket = useSelector(({ basket }) => basket)

  return (
    <div className='checkout'>
      <WhiteBox style={{ width: '360px', height: '100%' }}>
        <Subtotal />
      </WhiteBox>
      <WhiteBox>
        <h1>Your Shopping Basket</h1>
        {basket.map((product) => (
          <CheckoutProduct product={product} key={product.title} />
        ))}
      </WhiteBox>
    </div>
  )
}

export default Checkout
