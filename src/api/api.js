// src/api/api.js
import axios from 'axios'

const API = import.meta.env.VITE_API_BASE_URL

const axiosInstance = axios.create({
  baseURL: `${API}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Tambahkan token di setiap request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Tangani error global (contoh: token kadaluarsa)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
