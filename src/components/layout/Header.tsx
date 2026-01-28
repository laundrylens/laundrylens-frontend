import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores'
import { Button, ThemeToggle } from '../common'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLoginClick = () => {
    navigate('/login')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-navy-800 border-b border-navy-100 dark:border-navy-700 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="LaundryLens 홈">
            <span className="text-2xl">🧺</span>
            <span className="text-xl font-bold text-navy-900 dark:text-white">LaundryLens</span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="메인 네비게이션" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-navy-600 hover:text-primary-500 dark:text-navy-300 dark:hover:text-primary-400 font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Auth Button */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <Link to="/mypage" className="text-sm text-navy-600 hover:text-primary-500 dark:text-navy-300 dark:hover:text-primary-400">
                  {user?.nickname}님
                </Link>
                <LogoutButton />
              </>
            ) : (
              <Button size="sm" onClick={handleLoginClick}>
                로그인
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="p-2 text-navy-600 hover:text-primary-500 dark:text-navy-300 dark:hover:text-primary-400"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={isMobileMenuOpen}
            >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-navy-100 dark:border-navy-700">
            <nav className="py-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="block px-4 py-2 text-navy-600 hover:text-primary-500 hover:bg-primary-50 dark:text-navy-300 dark:hover:text-primary-400 dark:hover:bg-navy-700 rounded-lg font-medium transition-colors"
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="border-t border-navy-100 dark:border-navy-700 pt-2 mt-2">
                  {isAuthenticated ? (
                    <div className="px-4 py-2">
                      <Link
                        to="/mypage"
                        className="block text-navy-600 hover:text-primary-500 dark:text-navy-300 dark:hover:text-primary-400 mb-2"
                        onClick={closeMobileMenu}
                      >
                        {user?.nickname}님의 마이페이지
                      </Link>
                      <LogoutButton />
                    </div>
                  ) : (
                    <div className="px-4 py-2">
                      <Button size="sm" onClick={() => { handleLoginClick(); closeMobileMenu(); }} className="w-full">
                        로그인
                      </Button>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
