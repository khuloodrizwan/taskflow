import api from '../utils/api'

export const getAllUsers = async () => {
  const response = await api.get('/api/users')
  return response.data
}

export const getUserById = async (userId) => {
  const response = await api.get(`/api/users/${userId}`)
  return response.data
}

export const createUser = async (userData) => {
  const response = await api.post('/api/users', userData)
  return response.data
}