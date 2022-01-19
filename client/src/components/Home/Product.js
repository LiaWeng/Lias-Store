import React from 'react'
import './Product.css'
import { useDispatch } from 'react-redux'
import { Button } from '../StyledComponents'

import StarIcon from '@mui/icons-material/Star'

const Product = ({ title, price, image, rating }) => {
  const dispatch = useDispatch()
  const starArray = [...Array(rating).keys()]

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      data: {
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    })
  }

  return (
    <div className='product'>
      <div className='product-description'>
        <strong>{title}</strong>
        <div className='product-price'>${price}</div>
        <div>
          {starArray.map((x) => (
            <StarIcon className='product-star' key={x} />
          ))}
        </div>
      </div>

      <div className='product-image'>
        <img src={image} alt='product' />
      </div>

      <Button onClick={addToBasket}>Add to Basket</Button>
    </div>
  )
}

export default Product
