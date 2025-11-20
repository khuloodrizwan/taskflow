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

  useEffect(() => {
    fetchActivities()
  }, [user])

  const fetchActivities = async () => {
    try {
      setLoading(true)
      const data = await getUserActivities(user._id)
      setActivities(data)
      calculateStats(data)
      setError('')
    } catch (err) {
      setError('Failed to fetch activities')
      console.error(err)
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