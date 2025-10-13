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
    // Cek jika ada error response dengan status 401 (Unauthorized)
    if (error.response?.status === 401) {
      // Pastikan error bukan dari halaman login itu sendiri untuk menghindari loop
      if (!error.config.url.includes('/login')) {
        localStorage.clear() // Hapus semua data dari local storage
        window.location.href = '/login' // Arahkan pengguna ke halaman login
      }
    }
    // Kembalikan error agar bisa ditangani di tempat lain jika perlu
    return Promise.reject(error)
  }
)
export default axiosInstance
