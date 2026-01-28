import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores'
import { Button } from '../common'

interface LogoutButtonProps {
  className?: string
  redirectTo?: string
}

export default function LogoutButton({
  className,
  redirectTo = '/',
}: LogoutButtonProps) {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(redirectTo, { replace: true })
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className={className}
    >
      로그아웃
    </Button>
  )
}
