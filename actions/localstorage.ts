import { myToast } from '@/lib/helper'
import CryptoJS from 'crypto-js'

const SECRET_KEY = `${process.env.LOCAL_SECRET}`

export function setSecureData(key: string, value: any) {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    SECRET_KEY
  ).toString()

  const signature = CryptoJS.HmacSHA256(encryptedData, SECRET_KEY).toString()

  localStorage.setItem(key, JSON.stringify({ encryptedData, signature }))
}

export function getSecureData(key: string) {
  const data = localStorage.getItem(key)
  if (!data) return null

  try {
    const { encryptedData, signature } = JSON.parse(data)

    const validSignature = CryptoJS.HmacSHA256(
      encryptedData,
      SECRET_KEY
    ).toString()
    if (signature !== validSignature) {
      myToast('Manipüle edilmiş veri algılandı!', 'error', 1200)

      return null
    }

    const decryptedData = CryptoJS.AES.decrypt(
      encryptedData,
      SECRET_KEY
    ).toString(CryptoJS.enc.Utf8)
    return JSON.parse(decryptedData)
  } catch (error) {
    myToast(
      'Localdeki şifrelenmiş veriyi çözme sırasında hata oluştu!',
      'error',
      1200
    )

    return null
  }
}
