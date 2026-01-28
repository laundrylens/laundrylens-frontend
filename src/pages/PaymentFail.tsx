import { useSearchParams, Link } from 'react-router-dom'
import { Button, Card } from '../components/common'

export default function PaymentFail() {
  const [searchParams] = useSearchParams()
  const errorCode = searchParams.get('code') || 'UNKNOWN_ERROR'
  const errorMessage = searchParams.get('message') || '결제 처리 중 오류가 발생했습니다.'

  const getErrorDescription = (code: string): string => {
    switch (code) {
      case 'PAY_PROCESS_CANCELED':
        return '결제가 취소되었습니다.'
      case 'PAY_PROCESS_ABORTED':
        return '결제가 중단되었습니다.'
      case 'REJECT_CARD_COMPANY':
        return '카드사에서 결제가 거절되었습니다.'
      case 'INVALID_CARD_EXPIRATION':
        return '카드 유효기간이 만료되었습니다.'
      case 'EXCEED_MAX_DAILY_PAYMENT_COUNT':
        return '일일 결제 한도를 초과했습니다.'
      case 'INSUFFICIENT_BALANCE':
        return '잔액이 부족합니다.'
      default:
        return errorMessage
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="p-8 text-center">
        {/* Error Icon */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-navy-900 mb-2">결제에 실패했습니다</h1>

        {/* Error Description */}
        <p className="text-navy-600 mb-6">{getErrorDescription(errorCode)}</p>

        {/* Error Code */}
        <div className="bg-navy-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-navy-500">오류 코드</p>
          <p className="font-mono text-navy-700">{errorCode}</p>
        </div>

        {/* Help Text */}
        <p className="text-sm text-navy-500 mb-6">
          문제가 계속되면 고객센터로 문의해주세요.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link to="/pricing" className="block">
            <Button variant="primary" className="w-full">
              다시 시도하기
            </Button>
          </Link>
          <Link to="/" className="block">
            <Button variant="secondary" className="w-full">
              홈으로 이동
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
