import React, { useState, useEffect } from 'react'
import './Orders.css'
import { useSelector } from 'react-redux'
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import Order from './Order'
import { WhiteBox, Divider, StyledAlert } from '../StyledComponents'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const user = useSelector(({ user }) => user)
  const db = getFirestore()

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
    <WhiteBox className='orders'>
      <h1>Your Orders</h1>

      <Divider style={{ marginTop: '20px' }} />

      {!user && (
        <StyledAlert severity='error' style={{ margin: '-10px 0 10px 0' }}>
          Please sign in to view your orders history.
        </StyledAlert>
      )}

      {orders?.map((order) => (
        <Order order={order} key={order.id} />
      ))}
    </WhiteBox>
  )
}

export default Orders
