import { useNavigate } from 'react-router-dom'
import { Button, Card } from '../components/common'
import { PLANS } from '../components/analyze'
import { useAuthStore } from '../stores/authStore'

export default function Pricing() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuthStore()

  // TODO: Get actual subscription info from API
  const currentPlanId = user?.subscription?.planId || 'free'

  const handleSelectPlan = (planId: string) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/pricing?plan=${planId}` } })
      return
    }

    if (planId === 'free') {
      return
    }

    // Navigate to payment flow
    navigate(`/payment?plan=${planId}`)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-navy-900 mb-4">요금제</h1>
        <p className="text-lg text-navy-600 max-w-2xl mx-auto">
          더 많은 분석이 필요하신가요? 나에게 맞는 요금제를 선택해보세요.
        </p>
      </header>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={`p-8 relative flex flex-col ${
              plan.recommended
                ? 'border-2 border-primary-500 shadow-lg scale-105'
                : ''
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                추천
              </div>
            )}

            {/* Plan name */}
            <h2 className="text-2xl font-bold text-navy-900 text-center mb-2">
              {plan.name}
            </h2>

            {/* Price */}
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-primary-500">
                {plan.priceLabel}
              </span>
            </div>

            {/* Analysis count highlight */}
            <div className="bg-navy-50 rounded-lg p-4 mb-6 text-center">
              <p className="text-navy-600">
                월 <span className="text-3xl font-bold text-navy-900">{plan.analysisCount}</span>회 분석
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-grow">
              {plan.features.map((feature, index) => (
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

            {/* Select button */}
            <Button
              variant={currentPlanId === plan.id ? 'secondary' : 'primary'}
              size="lg"
              className="w-full"
              onClick={() => handleSelectPlan(plan.id)}
              disabled={currentPlanId === plan.id}
            >
              {currentPlanId === plan.id ? '현재 플랜' : plan.price === 0 ? '무료로 시작' : '구독하기'}
            </Button>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <section className="bg-navy-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-navy-900 mb-6 text-center">
          자주 묻는 질문
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="font-semibold text-navy-900 mb-2">
              무료 플랜으로도 분석이 가능한가요?
            </h3>
            <p className="text-navy-600">
              네, 무료 플랜에서도 월 5회까지 세탁기호 분석이 가능합니다.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-navy-900 mb-2">
              구독을 취소하면 어떻게 되나요?
            </h3>
            <p className="text-navy-600">
              구독 기간이 끝날 때까지 서비스를 이용할 수 있으며, 이후 무료 플랜으로 전환됩니다.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-navy-900 mb-2">
              결제 수단은 무엇이 있나요?
            </h3>
            <p className="text-navy-600">
              신용카드, 체크카드, 카카오페이, 토스페이 등 다양한 결제 수단을 지원합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
