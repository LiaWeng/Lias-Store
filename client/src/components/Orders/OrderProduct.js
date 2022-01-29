import React from 'react'
import './OrderProduct.css'

const OrderProduct = ({ product, number }) => {
  return (
    <div className='order-product'>
      <div className='order-product-image'>
        <img src={product.data.image} alt='product' />
      </div>

      <div className='order-product-info'>
        <p>
          {product.data.title} &#215; {number}
        </p>
        <p className='order-product-price'>${product.data.price}</p>
      </div>
    </div>
  )
}

export default OrderProduct
