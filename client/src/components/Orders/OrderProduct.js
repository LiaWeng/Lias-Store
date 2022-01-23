import React from 'react'
import './OrderProduct.css'
import { StarRating } from '../StyledComponents'

const OrderProduct = ({ product, number }) => {
  return (
    <div className='order-product'>
      <div className='order-product-image'>
        <img src={product.data.image} alt='product' />
      </div>

      <div className='order-product-info'>
        <div>
          {product.data.title} &#215; {number}
        </div>
        <div className='order-product-price'>${product.data.price}</div>
        <StarRating rating={product.data.rating} />
      </div>
    </div>
  )
}

export default OrderProduct
