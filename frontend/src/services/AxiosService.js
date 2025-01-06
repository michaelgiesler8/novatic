import axios from 'axios'

const api = axios.create({
  baseURL: 'your-api-url',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'SameSite': 'None',
    'Secure': true
  }
})


// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)

export default api
