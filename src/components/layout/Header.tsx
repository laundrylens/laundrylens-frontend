import { Button } from '../common'

interface NavItem {
  label: string
  href: string
}

interface HeaderProps {
  navItems?: NavItem[]
  onLoginClick?: () => void
  isLoggedIn?: boolean
}

const defaultNavItems: NavItem[] = [
  { label: '기호 사전', href: '/symbols' },
  { label: '이미지 분석', href: '/analyze' },
  { label: '세탁 가이드', href: '/guide' },
]

export default function Header({
  navItems = defaultNavItems,
  onLoginClick,
  isLoggedIn = false,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-navy-100 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2" aria-label="LaundryLens 홈">
            <span className="text-2xl">🧺</span>
            <span className="text-xl font-bold text-navy-900">LaundryLens</span>
          </a>

          {/* Navigation */}
          <nav aria-label="메인 네비게이션">
            <ul className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-navy-600 hover:text-primary-500 font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth Button */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Button variant="ghost" size="sm">
                마이페이지
              </Button>
            ) : (
              <Button size="sm" onClick={onLoginClick}>
                로그인
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
