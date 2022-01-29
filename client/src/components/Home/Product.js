import React, { useState } from 'react'
import './Product.css'
import { useDispatch } from 'react-redux'
import { WhiteBoxFlip, StarRating } from '../StyledComponents'

const Product = ({ title, price, image, rating, detail, id }) => {
  const dispatch = useDispatch()
  const [rotate, setRotate] = useState(0)

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      data: id,
    })
  }

  return (
    <div className='product-container'>
      <WhiteBoxFlip
        style={{
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          cursor: 'pointer',
        }}
        rotate={rotate}
        onClick={() => setRotate(rotate === 0 ? '180deg' : 0)}
      >
        <div className='product-position-helper product-content-front'>
          <div className='product-description'>
            <strong>{title}</strong>
            <p className='product-price'>${price}</p>
            <StarRating rating={rating} />
          </div>

          <div className='product-image'>
            <img src={image} alt='product' />
          </div>
        </div>

        <div className='product-position-helper product-content-back'>
          <strong>{title}</strong>
          <p className='product-detail'>{detail}</p>

          <div className='product-button-container'>
            <button onClick={addToBasket}>Add to Basket</button>
          </div>
        </div>
      </WhiteBoxFlip>
    </div>
  )
}

export default Product
