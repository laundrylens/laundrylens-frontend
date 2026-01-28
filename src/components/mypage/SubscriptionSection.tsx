import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Modal } from '../common'
import { PLANS } from '../analyze'
import type { User } from '../../stores/authStore'

interface SubscriptionSectionProps {
  user: User
}

export default function SubscriptionSection({ user }: SubscriptionSectionProps) {
  const [showCancelModal, setShowCancelModal] = useState(false)

  const subscription = user.subscription
  const currentPlan = PLANS.find((p) => p.id === (subscription?.planId || 'free'))
  const isFree = !subscription || subscription.planId === 'free'

  const handleCancelSubscription = () => {
    // TODO: Implement actual cancellation API call
    setShowCancelModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-navy-900 mb-6">현재 구독</h2>

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-2xl font-bold text-navy-900">{currentPlan?.name} 플랜</p>
            <p className="text-navy-600">{currentPlan?.priceLabel}</p>
          </div>
          {!isFree && (
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
              활성
            </span>
          )}
        </div>

        {/* Usage */}
        <div className="bg-navy-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-navy-600">이번 달 사용량</span>
            <span className="font-medium text-navy-900">
              {subscription?.analysisUsed || 0} / {subscription?.analysisCount || 5}회
            </span>
          </div>
          <div className="h-2 bg-navy-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 transition-all"
              style={{
                width: `${Math.min(
                  ((subscription?.analysisUsed || 0) / (subscription?.analysisCount || 5)) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Expiration Date */}
        {!isFree && subscription?.expiresAt && (
          <p className="text-sm text-navy-500 mb-6">
            다음 결제일: {new Date(subscription.expiresAt).toLocaleDateString('ko-KR')}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          {isFree ? (
            <Link to="/pricing" className="flex-1">
              <Button variant="primary" className="w-full">
                업그레이드
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/pricing" className="flex-1">
                <Button variant="secondary" className="w-full">
                  플랜 변경
                </Button>
              </Link>
              <Button
                variant="secondary"
                className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                onClick={() => setShowCancelModal(true)}
              >
                구독 취소
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Plan Features */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-navy-900 mb-4">플랜 혜택</h2>
        <ul className="space-y-3">
          {currentPlan?.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-navy-600">
              <svg
                className="w-5 h-5 text-green-500 flex-shrink-0"
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
              {feature}
            </li>
          ))}
        </ul>
      </Card>

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="구독 취소"
      >
        <div className="p-6">
          <p className="text-navy-600 mb-6">
            정말로 구독을 취소하시겠습니까?
          </p>
          <ul className="text-sm text-navy-500 mb-6 space-y-2">
            <li>• 현재 결제 기간이 끝날 때까지 서비스를 이용할 수 있습니다.</li>
            <li>• 구독 종료 후 무료 플랜으로 전환됩니다.</li>
            <li>• 언제든지 다시 구독할 수 있습니다.</li>
          </ul>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setShowCancelModal(false)}
            >
              취소
            </Button>
            <Button
              variant="primary"
              className="flex-1 bg-red-500 hover:bg-red-600"
              onClick={handleCancelSubscription}
            >
              구독 취소하기
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
