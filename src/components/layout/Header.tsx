import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores'
import { Button } from '../common'
import { LogoutButton } from '../auth'

interface NavItem {
  label: string
  href: string
}

interface HeaderProps {
  navItems?: NavItem[]
}

const defaultNavItems: NavItem[] = [
  { label: '기호 사전', href: '/symbols' },
  { label: '이미지 분석', href: '/analyze' },
  { label: '세탁 가이드', href: '/guide' },
]

export default function Header({ navItems = defaultNavItems }: HeaderProps) {
  const { isAuthenticated, user } = useAuthStore()
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-navy-100 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="LaundryLens 홈">
            <span className="text-2xl">🧺</span>
            <span className="text-xl font-bold text-navy-900">LaundryLens</span>
          </Link>

          {/* Navigation */}
          <nav aria-label="메인 네비게이션">
            <ul className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-navy-600 hover:text-primary-500 font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth Button */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-navy-600 hidden sm:block">
                  {user?.nickname}님
                </span>
                <LogoutButton />
              </>
            ) : (
              <Button size="sm" onClick={handleLoginClick}>
                로그인
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
