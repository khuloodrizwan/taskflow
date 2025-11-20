import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getUserAnalytics } from '../services/activityService'
import AnalyticsCharts from '../components/AnalyticsCharts'
import Loader from '../components/Loader'
import '../styles/Analytics.css'

const Analytics = () => {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAnalytics()
  }, [user])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const data = await getUserAnalytics(user._id)
      setAnalytics(data)
      setError('')
    } catch (err) {
      setError('Failed to fetch analytics data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader />
  }

  const getSummaryStats = () => {
    if (!analytics) return null
    
    return {
      totalActivities: analytics.totalActivities || 0,
      totalHours: analytics.totalHours || 0,
      avgDuration: analytics.averageDuration || 0,
      mostProductiveDay: analytics.mostProductiveDay || 'N/A'
    }
  }

  const stats = getSummaryStats()

  return (
    <div className="analytics-page">
      <div className="analytics-container">
        <div className="analytics-header">
          <div className="header-content">
            <h1 className="analytics-title">📊 Analytics Dashboard</h1>
            <p className="analytics-subtitle">
              Weekly performance overview and insights
            </p>
          </div>
          <button 
            onClick={fetchAnalytics} 
            className="btn btn-secondary"
            disabled={loading}
          >
            🔄 Refresh Data
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {stats && (
          <div className="summary-stats">
            <div className="summary-card">
              <div className="summary-icon">📋</div>
              <div className="summary-content">
                <h3 className="summary-value">{stats.totalActivities}</h3>
                <p className="summary-label">Total Activities</p>
                <span className="summary-period">This Week</span>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">⏱️</div>
              <div className="summary-content">
                <h3 className="summary-value">{stats.totalHours}h</h3>
                <p className="summary-label">Total Hours</p>
                <span className="summary-period">Time Invested</span>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">📊</div>
              <div className="summary-content">
                <h3 className="summary-value">{stats.avgDuration.toFixed(1)}h</h3>
                <p className="summary-label">Avg Duration</p>
                <span className="summary-period">Per Activity</span>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">🌟</div>
              <div className="summary-content">
                <h3 className="summary-value">{stats.mostProductiveDay}</h3>
                <p className="summary-label">Most Productive</p>
                <span className="summary-period">This Week</span>
              </div>
            </div>
          </div>
        )}

        <div className="charts-section">
          <AnalyticsCharts analytics={analytics} />
        </div>

        {analytics && analytics.insights && (
          <div className="insights-section">
            <h2 className="section-title">💡 Key Insights</h2>
            <div className="insights-list">
              {analytics.insights.map((insight, index) => (
                <div key={index} className="insight-item">
                  <span className="insight-bullet">•</span>
                  <p>{insight}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Analytics