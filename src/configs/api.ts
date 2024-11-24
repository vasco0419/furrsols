import axios from 'axios'

const BACKEND_URL = "http://52.20.78.109:8001/api"
// const BACKEND_URL = "http://localhost:8001/api"
// const BACKEND_URL = "/api"

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

export default api
