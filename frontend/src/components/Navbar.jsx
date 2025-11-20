import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          <div className="brand-icon">📊</div>
          <span>TeamTracker</span>
        </Link>
        
        <div className="navbar-menu">
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/add-activity" 
            className={`nav-link ${isActive('/add-activity') ? 'active' : ''}`}
          >
            Add Activity
          </Link>
          <Link 
            to="/analytics" 
            className={`nav-link ${isActive('/analytics') ? 'active' : ''}`}
          >
            Analytics
          </Link>
          {user?.role === 'admin' && (
            <Link 
              to="/admin" 
              className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
            >
              Admin
            </Link>
          )}
        </div>

        <div className="navbar-user">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar