import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ActivityForm from './pages/ActivityForm'
import Analytics from './pages/Analytics'
import AdminPage from './pages/AdminPage'
import Navbar from './components/Navbar'
import Loader from './components/Loader'

function App() {
  const { user, loading } = useAuth()

  // ✅ FIX 5: Show loader while checking authentication
  if (loading) {
    return <Loader />
  }

  return (
    <div className="app">
      {user && <Navbar />}
      <Routes>
        {/* ✅ FIX 6: Added 'replace' prop to all Navigate components to prevent blinking */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/add-activity" 
          element={user ? <ActivityForm /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/analytics" 
          element={user ? <Analytics /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/admin" 
          element={user?.role === 'admin' ? <AdminPage /> : <Navigate to="/dashboard" replace />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />} 
        />
      </Routes>
    </div>
  )
}

export default App