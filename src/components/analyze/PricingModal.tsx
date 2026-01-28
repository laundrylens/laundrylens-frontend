import { Modal, Button, Card } from '../common'

interface Plan {
  id: string
  name: string
  price: number
  priceLabel: string
  analysisCount: number
  features: string[]
  recommended?: boolean
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: '무료',
    price: 0,
    priceLabel: '무료',
    analysisCount: 5,
    features: ['월 5회 분석', '기본 기호 인식', '결과 즉시 확인'],
  },
  {
    id: 'basic',
    name: '베이직',
    price: 3900,
    priceLabel: '₩3,900/월',
    analysisCount: 30,
    features: ['월 30회 분석', '고급 기호 인식', '분석 히스토리 저장', '우선 지원'],
    recommended: true,
  },
  {
    id: 'premium',
    name: '프리미엄',
    price: 9900,
    priceLabel: '₩9,900/월',
    analysisCount: 100,
    features: [
      '월 100회 분석',
      '고급 기호 인식',
      '분석 히스토리 저장',
      '우선 지원',
      '세탁 가이드 제공',
    ],
  },
]

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectPlan: (planId: string) => void
  currentPlanId?: string
}

export default function PricingModal({
  isOpen,
  onClose,
  onSelectPlan,
  currentPlanId = 'free',
}: PricingModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="요금제 선택" className="max-w-3xl">
      <div className="p-6">
        <p className="text-center text-navy-600 mb-8">
          더 많은 분석이 필요하신가요? 요금제를 업그레이드해보세요.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`p-6 relative ${
                plan.recommended ? 'border-2 border-primary-500' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs px-3 py-1 rounded-full">
                  추천
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-lg font-bold text-navy-900 text-center mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="text-center mb-4">
                <span className="text-2xl font-bold text-primary-500">
                  {plan.priceLabel}
                </span>
              </div>

              {/* Analysis count */}
              <p className="text-center text-navy-600 mb-4">
                월 <strong>{plan.analysisCount}</strong>회 분석
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-navy-600">
                    <svg
                      className="w-4 h-4 text-green-500 flex-shrink-0"
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
                className="w-full"
                onClick={() => onSelectPlan(plan.id)}
                disabled={currentPlanId === plan.id}
              >
                {currentPlanId === plan.id ? '현재 플랜' : '선택하기'}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export { PLANS }
export type { Plan }
