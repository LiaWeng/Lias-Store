import React from 'react'
import './CheckoutProduct.css'
import { useDispatch } from 'react-redux'
import { Button, StarRating } from '../StyledComponents'

const CheckoutProduct = ({ product }) => {
  const dispatch = useDispatch()

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      data: product.title,
    })
  }

  return (
    <div className='checkout-product'>
      <div className='checkout-product-image'>
        <img src={product.image} alt='product' />
      </div>

      <div>
        <strong>{product.title}</strong>
        <div className='product-price'>${product.price}</div>
        <StarRating rating={product.rating} />
        <Button onClick={removeFromBasket}>Remove From Basket</Button>
      </div>
    </div>
  )
}

export default CheckoutProduct
