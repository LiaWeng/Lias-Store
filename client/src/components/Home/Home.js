import React, { useEffect, useState } from 'react'
import './Home.css'
import { useSelector } from 'react-redux'
import Product from './Product'

const Home = () => {
  // const [smallScreen, setSmallScreen] = useState(false)
  const products = useSelector(({ products }) => products)

  // const media = window.matchMedia('(max-width: 960px)')

  // console.log(window.matchMedia('(max-width: 960px)'))
  // useEffect(() => {
  //   setSmallScreen(media.matches)
  //   console.log(smallScreen)
  // }, [media])

  let productsByRow = []
  for (let i = 0; i < products.length; i += 3) {
    const row = [products[i], products[i + 1], products[i + 2]]
    productsByRow.push(row.filter((product) => product))
  }

  // console.log(window.matchMedia('(max-width: 960px)').matches)

  return (
    <div>
      <div className='products'>
        {productsByRow.map((row) => (
          <div className='product-row' key={productsByRow.indexOf(row)}>
            {row.map((product) => (
              <Product
                title={product.data.title}
                price={product.data.price}
                image={product.data.image}
                rating={product.data.rating}
                detail={product.data.detail}
                id={product.id}
                key={product.id}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
