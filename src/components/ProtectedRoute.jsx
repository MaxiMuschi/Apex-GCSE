import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Guards student/parent routes. Sends unauthenticated users to login,
// remembering where they were headed.
export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="wrap section" style={{ minHeight: '50vh' }}>
        <div className="skeleton" style={{ height: 28, width: 240, marginBottom: 16 }} />
        <div className="skeleton" style={{ height: 140, borderRadius: 22 }} />
      </div>
    )
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />
  }
  return children
}
