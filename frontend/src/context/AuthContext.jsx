import { createContext, useState, useContext, useEffect } from 'react'
import { login as loginService, register as registerService } from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // ✅ FIX 1: Wrap in try-catch and only run once on mount
  useEffect(() => {
    checkAuth()
  }, []) // Empty dependency array - runs only once

  const checkAuth = () => {
    try {
      const storedUser = localStorage.getItem('user')
      const storedToken = localStorage.getItem('token')
      
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error('Auth check error:', error)
      // Clear corrupted data
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    } finally {
      // ✅ FIX 2: Always set loading to false in finally block
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const data = await loginService(email, password)
      
      // ✅ FIX 3: Backend returns data.data, not data.user
      const userData = data.data || data.user || data
      const token = data.data?.token || data.token
      
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', token)
      
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Login failed' 
      }
    }
  }

  const register = async (name, email, password, role) => {
    try {
      const data = await registerService(name, email, password, role)
      
      // ✅ FIX 4: Backend returns data.data, not data.user
      const userData = data.data || data.user || data
      const token = data.data?.token || data.token
      
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', token)
      
      return { success: true }
    } catch (error) {
      console.error('Register error:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Registration failed' 
      }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}