import React from 'react'
import './Checkout.css'
import { useSelector } from 'react-redux'
import CheckoutProduct from './CheckoutProduct'
import Subtotal from './Subtotal'
import { WhiteBox, Divider } from '../StyledComponents'

const Checkout = () => {
  const basket = useSelector(({ basket }) => basket)

  return (
    <div className='checkout'>
      <WhiteBox style={{ width: '380px', height: '100%', marginRight: '40px' }}>
        <Subtotal />
      </WhiteBox>

      <WhiteBox padding='50px' style={{ width: '100%' }}>
        <h1>Your Shopping Basket</h1>

        <Divider style={{ marginTop: '20px' }} />

        {basket.map((product) => (
          <CheckoutProduct product={product} key={product.id} />
        ))}
      </WhiteBox>
    </div>
  )
}

export default Checkout
