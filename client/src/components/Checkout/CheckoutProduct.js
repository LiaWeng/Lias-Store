import React from 'react'
import './CheckoutProduct.css'
import { useDispatch } from 'react-redux'
import {
  StarRating,
  StyledRemoveCircleIcon,
  StyledAddCircleIcon,
} from '../StyledComponents'

const CheckoutProduct = ({ product, number }) => {
  const dispatch = useDispatch()

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      data: product.id,
    })
  }

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      data: product.id,
    })
  }

  return (
    <div className='checkout-product'>
      <div className='checkout-product-info'>
        <strong>{product.data.title}</strong>
        <div className='product-price'>${product.data.price}</div>
        <StarRating rating={product.data.rating} />
      </div>

      <div className='checkout-product-image'>
        <img src={product.data.image} alt='product' />
      </div>

      <div className='checkout-product-number'>
        <StyledRemoveCircleIcon onClick={removeFromBasket} />
        <strong>{number}</strong>
        <StyledAddCircleIcon onClick={addToBasket} />
      </div>
    </div>
  )
}

export default CheckoutProduct
