import { useState, useEffect } from 'react'
import { getAllUsers } from '../services/userService'
import { getAllActivities } from '../services/activityService'
import ActivityItem from '../components/ActivityItem'
import Loader from '../components/Loader'
import '../styles/AdminPage.css'

const AdminPage = () => {
  const [users, setUsers] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [usersData, activitiesData] = await Promise.all([
        getAllUsers(),
        getAllActivities()
      ])
      
      // ✅ Services now return arrays directly
      setUsers(usersData)
      setActivities(activitiesData)
      
    } catch (err) {
      console.error('Fetch admin data error:', err)
      const errorMessage = err.response?.data?.message || 
                          err.message ||
                          'Failed to fetch admin data'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const getStats = () => {
    const totalUsers = users.length
    const totalActivities = activities.length
    const completedActivities = activities.filter(a => a.status === 'completed').length
    const totalHours = activities.reduce((sum, a) => sum + (a.duration || 0), 0)
    
    return {
      totalUsers,
      totalActivities,
      completedActivities,
      totalHours,
      completionRate: totalActivities > 0 
        ? Math.round((completedActivities / totalActivities) * 100) 
        : 0
    }
  }

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || activity.status === filterStatus
    const matchesPriority = filterPriority === 'all' || activity.priority === filterPriority
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  if (loading) {
    return <Loader />
  }

  const stats = getStats()

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <div className="header-content">
            <h1 className="admin-title">🔐 Admin Dashboard</h1>
            <p className="admin-subtitle">
              Manage users and monitor all team activities
            </p>
          </div>
          <button 
            onClick={fetchData} 
            className="btn btn-primary"
            disabled={loading}
          >
            🔄 Refresh Data
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.totalUsers}</h3>
              <p className="stat-label">Total Users</p>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.totalActivities}</h3>
              <p className="stat-label">Total Activities</p>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.completedActivities}</h3>
              <p className="stat-label">Completed</p>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.totalHours}h</h3>
              <p className="stat-label">Total Hours</p>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.completionRate}%</h3>
              <p className="stat-label">Completion Rate</p>
            </div>
          </div>
        </div>

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
          <button
            className={`tab-btn ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            📋 All Activities
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <div className="overview-grid">
                <div className="overview-card">
                  <h3 className="card-title">Recent Users</h3>
                  <div className="users-list-preview">
                    {users.length > 0 ? (
                      users.slice(0, 5).map(user => (
                        <div key={user._id} className="user-preview-item">
                          <div className="user-avatar-small">
                            {user.name?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <div className="user-info-small">
                            <span className="user-name-small">{user.name}</span>
                            <span className="user-email-small">{user.email}</span>
                          </div>
                          <span className={`badge badge-${user.role === 'admin' ? 'primary' : 'secondary'}`}>
                            {user.role}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="no-results">
                        <span className="no-results-icon">👥</span>
                        <p>No users found</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="overview-card">
                  <h3 className="card-title">Recent Activities</h3>
                  <div className="activities-list-preview">
                    {activities.length > 0 ? (
                      activities.slice(0, 5).map(activity => (
                        <div key={activity._id} className="activity-preview-item">
                          <div className="activity-preview-header">
                            <span className="activity-preview-title">{activity.title}</span>
                            <span className={`badge badge-${
                              activity.status === 'completed' ? 'success' :
                              activity.status === 'in-progress' ? 'primary' : 'warning'
                            }`}>
                              {activity.status}
                            </span>
                          </div>
                          <div className="activity-preview-meta">
                            <span>{activity.user?.name || 'Unknown'}</span>
                            <span>•</span>
                            <span>{activity.duration}h</span>
                            <span>•</span>
                            <span>{activity.category}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-results">
                        <span className="no-results-icon">📋</span>
                        <p>No activities found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-section">
              <div className="section-header">
                <h2 className="section-title">All Users ({users.length})</h2>
              </div>
              {users.length > 0 ? (
                <div className="users-table-container">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Activities</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => {
                        const userActivities = activities.filter(a => a.user?._id === user._id)
                        return (
                          <tr key={user._id}>
                            <td>
                              <div className="user-cell">
                                <div className="user-avatar-table">
                                  {user.name?.charAt(0).toUpperCase() || '?'}
                                </div>
                                <span className="user-name-table">{user.name}</span>
                              </div>
                            </td>
                            <td className="email-cell">{user.email}</td>
                            <td>
                              <span className={`badge badge-${user.role === 'admin' ? 'primary' : 'secondary'}`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="count-cell">{userActivities.length}</td>
                            <td>
                              <span className="badge badge-success">Active</span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="no-results">
                  <span className="no-results-icon">👥</span>
                  <p>No users found in the system</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="activities-section">
              <div className="section-header">
                <h2 className="section-title">
                  All Activities ({filteredActivities.length})
                </h2>
                <div className="filters">
                  <input
                    type="text"
                    placeholder="🔍 Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="activities-grid">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map(activity => (
                    <ActivityItem key={activity._id} activity={activity} />
                  ))
                ) : (
                  <div className="no-results">
                    <span className="no-results-icon">🔍</span>
                    <p>No activities found matching your filters</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPage