import React from 'react'
import './Home.css'
import { useSelector } from 'react-redux'
import Product from './Product'

const Home = () => {
  const products = useSelector(({ products }) => products)
  const keyword = useSelector(({ keyword }) => keyword)

  const productsToShow = products.filter((product) =>
    product.data.title.toLowerCase().includes(keyword)
  )

  let productsByRow = []
  if (productsToShow.length < 3) {
    productsByRow[0] = productsToShow
  } else {
    for (let i = 0; i < productsToShow.length; i += 3) {
      const row = [
        productsToShow[i],
        productsToShow[i + 1],
        productsToShow[i + 2],
      ]
      productsByRow.push(row.filter((product) => product))
    }
  }

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
