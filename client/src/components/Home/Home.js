import React from 'react'
import './Home.css'
import Product from './Product'

const Home = () => {
  return (
    <div>
      <div className='products'>
        <div className='row'>
          <Product
            title='OPI Infinite Shine Base Coat and Top Coat'
            price='27.99'
            image='https://m.media-amazon.com/images/I/81PwUnunYhL._AC_UL480_FMwebp_QL65_.jpg'
            rating={5}
          />
          <Product
            title='Maybelline The Nudes Eyeshadow Palette'
            price='14.96'
            image='https://m.media-amazon.com/images/I/81MkouPvWiL._AC_UL480_FMwebp_QL65_.jpg'
            rating={5}
          />
          <Product
            title='Reusable Bubble Tea Cup with Lid and Straw'
            price='10.00'
            image='https://m.media-amazon.com/images/I/71LUav82pDS._AC_UL480_FMwebp_QL65_.jpg'
            rating={4}
          />
        </div>
        <div className='row'>
          <Product
            title='3-Piece Dinosaur Cookie Cutter'
            price='6.99'
            image='https://m.media-amazon.com/images/I/81gEEu8GUPL._AC_UL480_FMwebp_QL65_.jpg'
            rating={3}
          />
          <Product
            title='Full Body Electric Massage Chair with Airbag'
            price='319.99'
            image='https://m.media-amazon.com/images/I/51J0kvq-9OL._AC_UL480_FMwebp_QL65_.jpg'
            rating={5}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
