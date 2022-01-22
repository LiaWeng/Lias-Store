import React from 'react'
import './Product.css'
import { useDispatch } from 'react-redux'
import { WhiteBox, Button, StarRating } from '../StyledComponents'

const Product = ({ title, price, image, rating, id }) => {
  const dispatch = useDispatch()

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      data: {
        title: title,
        image: image,
        price: price,
        rating: rating,
        id: id,
      },
    })
  }

  return (
    <WhiteBox style={{ width: '350px', height: '370px', margin: '0 15px' }}>
      <div className='product'>
        <div className='product-description'>
          <strong>{title}</strong>
          <div className='product-price'>${price}</div>
          <StarRating rating={rating} />
        </div>

        <div className='product-image'>
          <img src={image} alt='product' />
        </div>

        <Button onClick={addToBasket}>Add to Basket</Button>
      </div>
    </WhiteBox>
  )
}

export default Product
