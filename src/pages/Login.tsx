import { Link } from 'react-router-dom'
import { Card } from '../components/common'
import { KakaoLoginButton, GoogleLoginButton } from '../components/auth'

export default function Login() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card variant="elevated" className="w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">🧺</span>
            <span className="text-2xl font-bold text-navy-900">LaundryLens</span>
          </div>
          <h1 className="text-xl font-semibold text-navy-900">로그인</h1>
          <p className="mt-2 text-sm text-navy-500">
            소셜 계정으로 간편하게 시작하세요
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3" data-testid="social-login-buttons">
          <KakaoLoginButton />
          <GoogleLoginButton />
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-navy-200" />
          <span className="px-4 text-sm text-navy-400">또는</span>
          <div className="flex-1 border-t border-navy-200" />
        </div>

        {/* Guest Continue */}
        <div className="text-center">
          <Link
            to="/"
            className="text-sm text-navy-500 hover:text-primary-500 transition-colors"
          >
            비회원으로 계속하기
          </Link>
          <p className="mt-2 text-xs text-navy-400">
            비회원도 하루 5회까지 이미지 분석이 가능합니다
          </p>
        </div>
      </Card>
    </div>
  )
}
