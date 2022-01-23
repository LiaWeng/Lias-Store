import React, { useState, useEffect } from 'react'
import './Orders.css'
import { useSelector } from 'react-redux'
import { db } from '../../firebaseConfig'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import Order from './Order'
import { WhiteBox, Divider } from '../StyledComponents'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const user = useSelector(({ user }) => user)

  useEffect(async () => {
    if (user) {
      const q = query(
        collection(db, 'users', user.uid, 'orders'),
        orderBy('created', 'desc')
      )

      const querySnapshot = await getDocs(q)

      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))

      setOrders(orders)
    } else {
      setOrders([])
    }
  }, [user])

  return (
    <div className='orders'>
      <WhiteBox padding='50px'>
        <h1>Your Orders</h1>

        <Divider style={{ marginTop: '20px' }} />

        {orders?.map((order) => (
          <Order order={order} key={order.id} />
        ))}
      </WhiteBox>
    </div>
  )
}

export default Orders
