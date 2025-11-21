import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let result
      if (isLogin) {
        result = await login(formData.email, formData.password)
      } else {
        result = await register(formData.name, formData.email, formData.password, formData.role)
      }

      if (result.success) {
        // ✅ FIX 7: Use replace: true to avoid back button issues and prevent re-rendering
        navigate('/dashboard', { replace: true })
      } else {
        setError(result.error)
      }
    } catch (err) {
      console.error('Submit error:', err)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">📊</div>
            <h1>TeamTracker</h1>
            <p>Track your team's activities and performance</p>
          </div>

          <div className="login-tabs">
            <button
              className={`tab ${isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(true)
                setError('')
              }}
            >
              Login
            </button>
            <button
              className={`tab ${!isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(false)
                setError('')
              }}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}

            {!isLogin && (
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            {!isLogin && (
              <div className="input-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-login"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="btn-spinner"></span>
                  {isLogin ? 'Logging in...' : 'Registering...'}
                </>
              ) : (
                isLogin ? 'Login' : 'Register'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                className="link-button"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError('')
                  // ✅ FIX 8: Clear form when switching tabs
                  setFormData({
                    name: '',
                    email: '',
                    password: '',
                    role: 'user'
                  })
                }}
              >
                {isLogin ? 'Register here' : 'Login here'}
              </button>
            </p>
          </div>
        </div>

        <div className="login-features">
          <h2>Why TeamTracker?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <h3>Real-time Tracking</h3>
              <p>Monitor team activities as they happen</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📈</span>
              <h3>Analytics Dashboard</h3>
              <p>Visualize performance with detailed charts</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">👥</span>
              <h3>Team Management</h3>
              <p>Manage users and activities efficiently</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <h3>Goal Oriented</h3>
              <p>Set priorities and track progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login