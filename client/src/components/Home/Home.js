import React from 'react'
import './Home.css'
import { useSelector } from 'react-redux'
import Product from './Product'

const Home = () => {
  const products = useSelector(({ products }) => products)

  let productsByRow = []
  for (let i = 0; i < products.length; i += 3) {
    const row = [products[i], products[i + 1], products[i + 2]]
    productsByRow.push(row.filter((product) => product))
  }

  return (
    <div>
      <div className='products'>
        {productsByRow.map((row) => (
          <div className='row' key={productsByRow.indexOf(row)}>
            {row.map((product) => (
              <Product
                title={product.data.title}
                price={product.data.price}
                image={product.data.image}
                rating={product.data.rating}
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
