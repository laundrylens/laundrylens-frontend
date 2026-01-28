import { useSearchParams, Link } from 'react-router-dom'
import { Button, Card } from '../components/common'

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="p-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-navy-900 mb-2">결제가 완료되었습니다!</h1>

        {/* Description */}
        <p className="text-navy-600 mb-6">
          구독이 성공적으로 활성화되었습니다.<br />
          지금 바로 세탁기호 분석을 시작해보세요.
        </p>

        {/* Order Info */}
        {orderId && (
          <div className="bg-navy-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-navy-500">주문 번호</p>
            <p className="font-mono text-navy-700">{orderId}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link to="/analyze" className="block">
            <Button variant="primary" className="w-full">
              분석 시작하기
            </Button>
          </Link>
          <Link to="/mypage" className="block">
            <Button variant="secondary" className="w-full">
              마이페이지로 이동
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
