import axios, { isAxiosError, type AxiosInstance } from 'axios'

const AxiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

// REQUEST
AxiosClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error),
)

// RESPONSE
AxiosClient.interceptors.response.use(
  (response) => {
    if (typeof response.data.success != 'undefined' && response.data.success == false)
      throw new Error('Hubo un error causa')
    return response
  },
  (error) => {
    if (isAxiosError(error)) {
      if (typeof error.response?.data != 'undefined') {
        console.log(error.response.data.message)
        return Promise.reject(new Error(error.response.data.message))
      } else return Promise.reject('Hubo un error con el servidor, intentelo más tarde.')
    } else return Promise.reject(error)
  },
)

export default AxiosClient
