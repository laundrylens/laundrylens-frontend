import { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Card } from '../components/common'
import { PLANS } from '../components/analyze'
import { useAuthStore } from '../stores/authStore'
import { paymentApi } from '../api/paymentApi'

type PaymentStep = 'loading' | 'ready' | 'processing' | 'error'

export default function Payment() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isAuthenticated, user } = useAuthStore()

  const [step, setStep] = useState<PaymentStep>('loading')
  const [error, setError] = useState<string | null>(null)
  const initializedRef = useRef(false)

  const planId = searchParams.get('plan') || 'basic'
  const selectedPlan = PLANS.find((p) => p.id === planId)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/payment?plan=${planId}` } })
      return
    }

    if (!selectedPlan || selectedPlan.price === 0) {
      navigate('/pricing')
      return
    }

    // Prevent double initialization
    if (initializedRef.current) return
    initializedRef.current = true

    // Initialize payment
    const initializePayment = async () => {
      try {
        const orderId = `order-${Date.now()}`
        await paymentApi.preparePayment({
          planId,
          orderId,
          amount: selectedPlan.price,
        })
        setStep('ready')
      } catch {
        setError('결제 준비 중 오류가 발생했습니다.')
        setStep('error')
      }
    }

    initializePayment()
  }, [isAuthenticated, selectedPlan, navigate, planId])

  const handlePayment = async () => {
    setStep('processing')

    try {
      // In real implementation, this would open the TossPayments widget
      // For mock, we simulate a successful payment after a delay
      const orderId = `order-${Date.now()}`
      const paymentKey = `payment-${Date.now()}`

      const result = await paymentApi.confirmPayment({
        paymentKey,
        orderId,
        amount: selectedPlan!.price,
      })

      if (result.success) {
        navigate(`/payment/success?orderId=${orderId}`)
      } else {
        navigate(`/payment/fail?code=PAYMENT_FAILED&message=결제가 실패했습니다.`)
      }
    } catch {
      navigate(`/payment/fail?code=UNKNOWN_ERROR&message=알 수 없는 오류가 발생했습니다.`)
    }
  }

  const handleCancel = () => {
    navigate('/pricing')
  }

  if (!selectedPlan) {
    return null
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-navy-900 mb-2">결제하기</h1>
        <p className="text-navy-600">구독 정보를 확인하고 결제를 진행해주세요.</p>
      </header>

      {/* Order Summary */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-navy-900 mb-4">주문 정보</h2>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-navy-600">상품명</span>
            <span className="font-medium text-navy-900">{selectedPlan.name} 플랜</span>
          </div>
          <div className="flex justify-between">
            <span className="text-navy-600">월 분석 횟수</span>
            <span className="font-medium text-navy-900">{selectedPlan.analysisCount}회</span>
          </div>
          <div className="flex justify-between">
            <span className="text-navy-600">결제 주기</span>
            <span className="font-medium text-navy-900">매월 자동 결제</span>
          </div>
        </div>

        <div className="border-t border-navy-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-navy-900">결제 금액</span>
            <span className="text-2xl font-bold text-primary-500">
              {selectedPlan.priceLabel}
            </span>
          </div>
        </div>
      </Card>

      {/* Customer Info */}
      {user && (
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-4">결제자 정보</h2>
          <div className="space-y-2">
            <p className="text-navy-600">
              <span className="text-navy-500">이메일:</span> {user.email}
            </p>
            <p className="text-navy-600">
              <span className="text-navy-500">닉네임:</span> {user.nickname}
            </p>
          </div>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Payment Widget Area (Mock) */}
      {step === 'ready' && (
        <Card className="p-6 mb-6 bg-navy-50">
          <p className="text-center text-navy-600 mb-4">
            토스페이먼츠 결제 위젯 영역
          </p>
          <p className="text-center text-sm text-navy-500">
            (실제 구현 시 여기에 결제 위젯이 표시됩니다)
          </p>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="secondary" className="flex-1" onClick={handleCancel}>
          취소
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          onClick={handlePayment}
          disabled={step === 'loading' || step === 'processing'}
        >
          {step === 'processing' ? '결제 처리 중...' : `${selectedPlan.priceLabel} 결제하기`}
        </Button>
      </div>

      {/* Payment Notice */}
      <div className="mt-6 text-sm text-navy-500">
        <p className="mb-2">* 결제 시 위 약관에 동의한 것으로 간주됩니다.</p>
        <p>* 구독은 언제든지 마이페이지에서 취소할 수 있습니다.</p>
      </div>
    </div>
  )
}
