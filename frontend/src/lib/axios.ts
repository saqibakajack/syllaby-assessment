import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8080'
})

instance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    throw error.response == null ? error : new Error(error.response.data)
  }
)

export default instance
