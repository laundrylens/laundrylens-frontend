import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../stores'

interface PrivateRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export default function PrivateRoute({
  children,
  redirectTo = '/login',
}: PrivateRouteProps) {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return <>{children}</>
}
