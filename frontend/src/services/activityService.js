// src/services/activityService.js

import api from '../utils/api'

export const createActivity = async (activityData) => {
  const response = await api.post('/api/activity', activityData)
  // ✅ Returns the full response for success message
  return response.data
}

export const getUserActivities = async (userId) => {
  const response = await api.get(`/api/activity/${userId}`)
  // ✅ FIX: Extract the activities array from response.data.data
  return response.data.data || []
}

export const getAllActivities = async () => {
  const response = await api.get('/api/admin/all-activities')
  // ✅ FIX: Extract the activities array from response.data.data
  return response.data.data || []
}

export const getUserAnalytics = async (userId) => {
  const response = await api.get(`/api/analytics/${userId}`)
  // ✅ Analytics returns data at root level, not nested
  return response.data
}