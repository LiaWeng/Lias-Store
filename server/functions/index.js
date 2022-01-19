require('dotenv').config()
const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')(process.env.SECRET_KEY)

const app = express()

app.use(cors({ origin: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('hello world')
})

app.post('/payment/create', async (req, res) => {
  const basket = req.body

  const prices = basket.map((item) => Number(item.price))
  let total = 0
  for (const price of prices) {
    total += price
  }

  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: total,
  //   currency: 'usd',
  // })

  res.status(200).json(total)
})

exports.api = functions.https.onRequest(app)
