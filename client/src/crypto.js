import CryptoJS from 'crypto-js'
import { getCryptoKey } from './services'

export const encryptTotal = async (total) => {
  const key = await getCryptoKey()

  return CryptoJS.AES.encrypt(total.toString(), key)
    .toString()
    .replaceAll('/', '-')
}

export const decryptTotal = async (encryptedTotal) => {
  const key = await getCryptoKey()

  const bytes = CryptoJS.AES.decrypt(encryptedTotal.replaceAll('-', '/'), key)
  return Number(bytes.toString(CryptoJS.enc.Utf8))
}
