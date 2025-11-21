// src/services/userService.js

import api from '../utils/api'

export const getAllUsers = async () => {
  const response = await api.get('/api/users')
  // ✅ FIX: Extract the data array from response.data.data
  return response.data.data || []
}

export const getUserById = async (userId) => {
  const response = await api.get(`/api/users/${userId}`)
  // ✅ FIX: Extract the user object from response.data.data
  return response.data.data
}

export const createUser = async (userData) => {
  const response = await api.post('/api/users', userData)
  // ✅ FIX: Extract the user object from response.data.data
  return response.data.data
}