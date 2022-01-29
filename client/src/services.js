import axios from 'axios'

// const instance = axios.create({
//   baseURL: 'https://online-store-lia-weng.herokuapp.com',
// })

// export const getCryptoKey = async () => {
//   const response = await instance.post('/payment/key')
//   return response.data
// }

export const getStripeKey = async (total) => {
  const response = await axios.post('/payment/create', {
    total: total,
  })
  return response.data.clientSecret
}
