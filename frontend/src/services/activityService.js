import api from '../utils/api'

export const createActivity = async (activityData) => {
  const response = await api.post('/api/activity', activityData)
  return response.data
}

export const getUserActivities = async (userId) => {
  const response = await api.get(`/api/activity/${userId}`)
  return response.data
}

export const getAllActivities = async () => {
  const response = await api.get('/api/admin/all-activities')
  return response.data
}

export const getUserAnalytics = async (userId) => {
  const response = await api.get(`/api/analytics/${userId}`)
  return response.data
}