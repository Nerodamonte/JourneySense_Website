import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

type PortalRole = 'admin' | 'staff' | 'traveler'

interface Props {
  children: React.ReactNode
  /** If empty, any authenticated user is allowed (still blocks guests). */
  allowedRoles?: PortalRole[]
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const auth = useAppSelector((s) => s.auth)
  const location = useLocation()

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  const role = auth.role as PortalRole | undefined
  if (allowedRoles?.length && role && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
