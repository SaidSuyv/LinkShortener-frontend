import axios, { type AxiosInstance } from 'axios'

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
  (response) => response,
  (error) => {
    return Promise.reject(error)
  },
)

export default AxiosClient
