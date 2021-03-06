require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_KEY)

app.use(cors())
app.use(express.json())
app.use(express.static('./client/build'))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
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

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`)
})
