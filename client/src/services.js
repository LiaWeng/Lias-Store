import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3001',
})

export const getCryptoKey = async () => {
  const response = await instance.get('/payment/key')
  return response.data
}

export const getStripeKey = async (total) => {
  const response = await instance.post('/payment/create', {
    total: total * 100,
  })
  return response.data.clientSecret
}
