import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response=>response.data)
}

const createBlog = async (newBlog) => {
  const config = {headers: { authorization: token }}
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

export default { getAll, setToken , createBlog }