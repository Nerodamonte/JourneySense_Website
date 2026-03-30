import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

export default function HomeRedirect() {
  const { isAuthenticated, role } = useAppSelector((s) => s.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />
  }
  if (role === 'staff') {
    return <Navigate to="/staff" replace />
  }

  return <Navigate to="/login" replace />
}
