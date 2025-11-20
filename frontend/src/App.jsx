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

  if (loading) {
    return <Loader />
  }

  return (
    <div className="app">
      {user && <Navbar />}
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" /> : <Login />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/add-activity" 
          element={user ? <ActivityForm /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/analytics" 
          element={user ? <Analytics /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin" 
          element={user?.role === 'admin' ? <AdminPage /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={user ? "/dashboard" : "/login"} />} 
        />
      </Routes>
    </div>
  )
}

export default App