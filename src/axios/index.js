import axios from 'axios'

let baseURL

process.env.NODE_ENV === 'development'
  ? baseURL = 'http://localhost:3000'
  : baseURL = 'https://book-trading--server.herokuapp.com'

export default axios.create({ baseURL })
