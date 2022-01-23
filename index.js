require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_KEY)

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/payment/create', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.total,
    currency: 'usd',
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
})

app.get('/payment/key', (req, res) => {
  res.send(process.env.CRYPTO_KEY)
})

app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`)
})
