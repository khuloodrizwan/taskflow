// src/services/authService.js

import api from '../utils/api'

export const login = async (email, password) => {
  // ✅ FIX 16: Handle response data properly
  const response = await api.post('/api/auth/login', { email, password })
  return response.data
}

export const register = async (name, email, password, role = 'user') => {
  const response = await api.post('/api/auth/register', { name, email, password, role })
  return response.data
}