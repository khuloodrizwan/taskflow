import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getUserActivities } from '../services/activityService'
import ActivityList from '../components/ActivityList'
import '../styles/Dashboard.css'

const Dashboard = () => {
  const { user } = useAuth()
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
    totalHours: 0
  })

  // ✅ FIX 9: Add user as dependency but add safety check
  useEffect(() => {
    if (user?._id) {
      fetchActivities()
    }
  }, [user?._id]) // Only re-fetch when user ID actually changes

  const fetchActivities = async () => {
    // ✅ FIX 10: Safety check before fetching
    if (!user?._id) {
      return
    }

    try {
      setLoading(true)
      const data = await getUserActivities(user._id)
      setActivities(data)
      calculateStats(data)
      setError('')
    } catch (err) {
      setError('Failed to fetch activities')
      console.error('Fetch activities error:', err)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (activitiesData) => {
    const stats = {
      total: activitiesData.length,
      completed: activitiesData.filter(a => a.status === 'completed').length,
      inProgress: activitiesData.filter(a => a.status === 'in-progress').length,
      pending: activitiesData.filter(a => a.status === 'pending').length,
      totalHours: activitiesData.reduce((sum, a) => sum + (a.duration || 0), 0)
    }
    setStats(stats)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">
              {getGreeting()}, {user?.name}! 👋
            </h1>
            <p className="dashboard-subtitle">
              Here's what's happening with your activities today
            </p>
          </div>
          <Link to="/add-activity" className="btn btn-primary">
            <span className="btn-icon">➕</span>
            Add New Activity
          </Link>
        </div>
        {/* ✅ FIX 11: This closing div was missing, causing render issues */}

        <div className="stats-grid">
          <div className="stat-card stat-primary">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.total}</h3>
              <p className="stat-label">Total Activities</p>
            </div>
          </div>

          <div className="stat-card stat-success">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.completed}</h3>
              <p className="stat-label">Completed</p>
            </div>
          </div>

          <div className="stat-card stat-warning">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.inProgress}</h3>
              <p className="stat-label">In Progress</p>
            </div>
          </div>

          <div className="stat-card stat-info">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.totalHours}h</h3>
              <p className="stat-label">Total Hours</p>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="content-header">
            <h2 className="content-title">Recent Activities</h2>
            <div className="content-actions">
              <Link to="/analytics" className="btn btn-secondary">
                📈 View Analytics
              </Link>
            </div>
          </div>

          <ActivityList 
            activities={activities} 
            loading={loading} 
            error={error}
          />
        </div>

        {!loading && activities.length > 0 && (
          <div className="dashboard-insights">
            <h2 className="insights-title">Quick Insights</h2>
            <div className="insights-grid">
              <div className="insight-card">
                <span className="insight-icon">🎯</span>
                <div className="insight-content">
                  <h4>Completion Rate</h4>
                  <p className="insight-value">
                    {stats.total > 0 
                      ? Math.round((stats.completed / stats.total) * 100) 
                      : 0}%
                  </p>
                  <p className="insight-desc">
                    {stats.completed} of {stats.total} activities completed
                  </p>
                </div>
              </div>

              <div className="insight-card">
                <span className="insight-icon">📈</span>
                <div className="insight-content">
                  <h4>Average Duration</h4>
                  <p className="insight-value">
                    {stats.total > 0 
                      ? (stats.totalHours / stats.total).toFixed(1) 
                      : 0}h
                  </p>
                  <p className="insight-desc">Per activity</p>
                </div>
              </div>

              <div className="insight-card">
                <span className="insight-icon">⚡</span>
                <div className="insight-content">
                  <h4>Active Tasks</h4>
                  <p className="insight-value">{stats.inProgress + stats.pending}</p>
                  <p className="insight-desc">Need your attention</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard