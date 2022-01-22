import React from 'react'
import './OrderProduct.css'
import { Divider, StarRating } from '../StyledComponents'

const OrderProduct = ({ product }) => {
  return (
    <div className='order-product'>
      <div className='order-product-image'>
        <img src={product.image} alt='product' />
      </div>

      <div className='order-product-info'>
        <div>{product.title}</div>
        <div className='order-product-price'>${product.price}</div>
        <StarRating rating={product.rating} />
      </div>
    </div>
  )
}

export default OrderProduct
