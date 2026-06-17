import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

const AuthContext = createContext()

const defaultUsers = [
  {
    id: 'trainer-1',
    name: 'Trainer One',
    email: 'trainer@example.com',
    role: 'trainer',
    password: 'trainer123',
  },
  {
    id: 'manager-1',
    name: 'Training Manager',
    email: 'manager@example.com',
    role: 'manager',
    password: 'manager123',
  },
]

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('tsa-user')

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('tsa-user')
      }
    }
  }, [])

  const login = ({ email, password, remember }) => {
    const userEmail = email.trim().toLowerCase()
    const userPassword = password.trim()

    const matched = defaultUsers.find(
      (item) =>
        item.email.toLowerCase() === userEmail &&
        item.password === userPassword
    )

    if (!matched) {
      toast.error('Invalid email or password')
      return false
    }

    setUser(matched)

    // Save session
    localStorage.setItem(
      'tsa-user',
      JSON.stringify(matched)
    )

    toast.success(`Welcome ${matched.name}`)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('tsa-user')
    toast.info('Logged out successfully')
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    )
  }

  return context
}