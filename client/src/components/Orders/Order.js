import React from 'react'
import './Order.css'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'
import { useSelector } from 'react-redux'
import OrderProduct from './OrderProduct'
import { Divider } from '../StyledComponents'

const Order = ({ order }) => {
  const products = useSelector(({ products }) => products)
  const basketItems = Object.keys(order.data.basket)

  return (
    <div className='order'>
      <div className='order-title'>
        <div>
          <h2 className='order-date'>
            {moment
              .unix(order.data.created)
              .format('MMMM D, YYYY\xa0\xa0\xa0\xa0\xa0\xa0h:mma')}
          </h2>

          <CurrencyFormat
            renderText={(value) => <strong>Total: {` ${value}`}</strong>}
            decimalScale={2}
            value={order.data.amount / 100}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </div>

        <small className='order-id'>Order ID: {order.id}</small>
      </div>

      <div className='order-products'>
        {basketItems.map((id) => {
          const product = products.find((product) => product.id === id)
          const number = order.data.basket[id]

          return (
            <OrderProduct product={product} number={number} key={product.id} />
          )
        })}
      </div>

      <Divider />
    </div>
  )
}

export default Order
