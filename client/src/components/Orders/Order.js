import React from 'react'
import './Order.css'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'
import OrderProduct from './OrderProduct'
import { Divider } from '../StyledComponents'

const OrderProducts = ({ order }) => {
  return (
    <div className='order'>
      <div className='order-title'>
        <h2 className='order-date'>
          {moment.unix(order.data.created).format('MMMM D, YYYY')}
        </h2>

        <CurrencyFormat
          renderText={(value) => (
            <h2>
              Total ({order.data.basket.length} items): {` ${value}`}
            </h2>
          )}
          decimalScale={2}
          value={order.data.amount / 100}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />

        <small>Order ID: {order.id}</small>
      </div>

      <div className='order-products'>
        {order.data.basket.map((product) => (
          <OrderProduct product={product} key={product.title} />
        ))}
      </div>

      <Divider />
    </div>
  )
}

export default OrderProducts
