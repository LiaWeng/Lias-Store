import React from 'react'
import './Product.css'
import { useDispatch } from 'react-redux'
import { WhiteBox, StarRating } from '../StyledComponents'

const Product = ({ title, price, image, rating, id }) => {
  const dispatch = useDispatch()
  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      data: id,
    })
  }

  return (
    // <WhiteBox className='product-container'>
    //   <div className='product-position-helper product-content-front'>
    //     <div className='product-description'>
    //       <strong>{title}</strong>
    //       <p className='product-price'>${price}</p>
    //       <StarRating rating={rating} />
    //     </div>

    //     <div className='product-image'>
    //       <img src={image} alt='product' />
    //     </div>

    //     <div className='product-button-container'>
    //       <button onClick={addToBasket}>Add to Basket</button>
    //     </div>
    //   </div>
    // </WhiteBox>
    <WhiteBox className='product-container'>
      <div className='product-description'>
        <strong>{title}</strong>
        <p className='product-price'>${price}</p>
        <StarRating rating={rating} />
      </div>

      <div className='product-image'>
        <img src={image} alt='product' />
      </div>

      <div className='product-button-container'>
        <button onClick={addToBasket}>Add to Basket</button>
      </div>
    </WhiteBox>
  )
}

export default Product
