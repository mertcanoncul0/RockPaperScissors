import CryptoJS from 'crypto-js'
import { toast } from 'sonner'

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
      toast.error('Manipüle edilmiş veri algılandı!')
      return null
    }

    const decryptedData = CryptoJS.AES.decrypt(
      encryptedData,
      SECRET_KEY
    ).toString(CryptoJS.enc.Utf8)
    return JSON.parse(decryptedData)
  } catch (error) {
    toast.error('Localdeki şifrelenmiş veriyi çözme sırasında hata oluştu!')
    return null
  }
}
