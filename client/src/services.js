import axios from 'axios'

export const getStripeKey = async (total) => {
  const response = await axios.post('/payment/create', {
    total: total,
  })
  return response.data.clientSecret
}
