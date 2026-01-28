import { useEffect, useState } from 'react'
import { useSearchParams, useParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores'
import { env } from '../config'

type AuthStatus = 'loading' | 'success' | 'error'

interface AuthError {
  message: string
}

function validateParams(
  code: string | null,
  error: string | null,
  provider: string | undefined
): AuthError | null {
  if (error) {
    return { message: '로그인이 취소되었습니다.' }
  }

  if (!code) {
    return { message: '인가 코드가 없습니다.' }
  }

  if (!provider || !['kakao', 'google'].includes(provider)) {
    return { message: '지원하지 않는 로그인 방식입니다.' }
  }

  return null
}

export default function AuthCallback() {
  const [searchParams] = useSearchParams()
  const { provider } = useParams<{ provider: string }>()
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const [status, setStatus] = useState<AuthStatus>('loading')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    const handleCallback = async () => {
      // Validate params
      const validationError = validateParams(code, error, provider)
      if (validationError) {
        setStatus('error')
        setErrorMessage(validationError.message)
        return
      }

      try {
        // TODO: 실제 백엔드 API 연동
        // const response = await fetch(`${env.apiBaseUrl}/auth/${provider}/callback`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ code }),
        // })
        // const data = await response.json()

        // Mock response for now
        if (env.isDev) {
          console.log(`[AuthCallback] Provider: ${provider}, Code: ${code}`)
        }

        // 실제 연동 시 아래 주석 해제
        // login(data.user, data.accessToken, data.refreshToken)

        setStatus('success')

        // 홈으로 리다이렉트
        setTimeout(() => {
          navigate('/', { replace: true })
        }, 1500)
      } catch {
        setStatus('error')
        setErrorMessage('로그인 처리 중 오류가 발생했습니다.')
      }
    }

    handleCallback()
  }, [searchParams, provider, navigate, login])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-navy-600">로그인 처리 중...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="mt-4 text-navy-600">로그인 성공!</p>
            <p className="mt-2 text-sm text-navy-400">잠시 후 이동합니다...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="mt-4 text-navy-600">로그인 실패</p>
            <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-soft hover:bg-primary-600 transition-colors"
            >
              다시 시도하기
            </button>
          </>
        )}
      </div>
    </div>
  )
}
