import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { createActivity } from '../services/activityService'
import '../styles/ActivityForm.css'

const ActivityForm = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Development',
    priority: 'medium',
    status: 'pending',
    duration: '',
    date: new Date().toISOString().split('T')[0]
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const categories = ['Development', 'Design', 'Testing', 'Meeting', 'Documentation', 'Research', 'Other']
  const priorities = ['low', 'medium', 'high']
  const statuses = ['pending', 'in-progress', 'completed']

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // ✅ FIX 6: Validate user exists
      if (!user || !user._id) {
        setError('User session expired. Please login again.')
        setLoading(false)
        setTimeout(() => navigate('/login'), 2000)
        return
      }

      // ✅ FIX 7: Ensure all fields are present
      const activityData = {
        user: user._id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
        status: formData.status,
        duration: Number(formData.duration),
        date: formData.date
      }

      // ✅ FIX 8: Debug logging (remove in production)
      console.log('Submitting activity:', activityData)
      
      const response = await createActivity(activityData)
      console.log('Activity created:', response)
      
      setSuccess(true)
      
      setTimeout(() => {
        navigate('/dashboard', { replace: true })
      }, 1500)
    } catch (err) {
      console.error('Activity creation error:', err)
      console.error('Error response:', err.response?.data)
      setError(err.response?.data?.message || 'Failed to create activity')
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Development',
      priority: 'medium',
      status: 'pending',
      duration: '',
      date: new Date().toISOString().split('T')[0]
    })
    setError('')
    setSuccess(false)
  }

  return (
    <div className="activity-form-page">
      <div className="activity-form-container">
        <div className="form-header">
          <div className="form-icon">📝</div>
          <h1 className="form-title">Add New Activity</h1>
          <p className="form-subtitle">Track your work and stay productive</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">
            ✅ Activity created successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="activity-form">
          <div className="form-grid">
            <div className="input-group full-width">
              <label htmlFor="title">Activity Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter activity title"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="input-group full-width">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe the activity in detail"
                value={formData.description}
                onChange={handleChange}
                required
                disabled={loading}
                rows="4"
              />
            </div>

            <div className="input-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={loading}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="priority">Priority *</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
                disabled={loading}
              >
                {priorities.map(pri => (
                  <option key={pri} value={pri}>
                    {pri.charAt(0).toUpperCase() + pri.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                disabled={loading}
              >
                {statuses.map(stat => (
                  <option key={stat} value={stat}>
                    {stat.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="duration">Duration (hours) *</label>
              <input
                type="number"
                id="duration"
                name="duration"
                placeholder="Enter duration"
                value={formData.duration}
                onChange={handleChange}
                required
                min="0.5"
                step="0.5"
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || success}
            >
              {loading ? (
                <>
                  <span className="btn-spinner"></span>
                  Creating...
                </>
              ) : success ? (
                <>
                  <span>✓</span>
                  Created!
                </>
              ) : (
                <>
                  <span>➕</span>
                  Create Activity
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary"
              disabled={loading || success}
            >
              Reset Form
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="form-tips">
          <h3 className="tips-title">💡 Quick Tips</h3>
          <ul className="tips-list">
            <li>Be specific with your activity title for better tracking</li>
            <li>Set realistic duration estimates to improve planning</li>
            <li>Use appropriate priority levels to manage workload</li>
            <li>Update status regularly to track progress effectively</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ActivityForm