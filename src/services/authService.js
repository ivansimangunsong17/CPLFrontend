import axios from '../api/api'

const login = (email, password) => axios.post('/login', { email, password })

const authService = { login }
export default authService
