import React from 'react'
import './CheckoutProduct.css'
import { useDispatch } from 'react-redux'
import { Button } from '../StyledComponents'

import StarIcon from '@mui/icons-material/Star'

const CheckoutProduct = ({ product }) => {
  const dispatch = useDispatch()
  const starArray = [...Array(product.rating).keys()]

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
        <div className='checkout-stars'>
          {starArray.map((x) => (
            <StarIcon className='product-star' key={x} />
          ))}
        </div>
        <Button onClick={removeFromBasket}>Remove From Basket</Button>
      </div>
    </div>
  )
}

export default CheckoutProduct
