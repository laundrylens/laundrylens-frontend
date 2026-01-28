import { Link } from 'react-router-dom'
import { Card } from '../components/common'

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
          {/* 카카오 로그인 버튼 placeholder */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 h-12 rounded-soft bg-[#FEE500] text-[#191919] font-medium hover:brightness-95 transition-all"
            aria-label="카카오로 로그인"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 0.5C4.029 0.5 0 3.613 0 7.446c0 2.485 1.676 4.669 4.198 5.898-.138.482-.887 3.106-.918 3.313 0 0-.018.152.08.21.098.058.214.013.214.013.282-.038 3.268-2.13 3.783-2.488.537.076 1.091.116 1.643.116 4.971 0 9-3.113 9-6.962S13.971.5 9 .5"
                fill="#191919"
              />
            </svg>
            카카오로 시작하기
          </button>

          {/* 구글 로그인 버튼 placeholder */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 h-12 rounded-soft bg-white border border-navy-200 text-navy-700 font-medium hover:bg-navy-50 transition-all"
            aria-label="구글로 로그인"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
                fill="#4285F4"
              />
              <path
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
                fill="#34A853"
              />
              <path
                d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
                fill="#EA4335"
              />
            </svg>
            Google로 시작하기
          </button>
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
