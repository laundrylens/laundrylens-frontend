import { Link } from 'react-router-dom'
import { Button, Card } from '../components/common'

const FEATURES = [
  {
    icon: '📷',
    title: 'AI 이미지 분석',
    description: '사진 한 장으로 세탁 기호를 자동으로 인식하고 해석해드립니다.',
  },
  {
    icon: '👕',
    title: '소재별 가이드',
    description: '면, 울, 실크 등 다양한 소재에 맞는 세탁 방법을 알려드립니다.',
  },
  {
    icon: '🏷️',
    title: '기호 사전',
    description: '40가지 이상의 세탁 기호를 쉽게 검색하고 이해할 수 있습니다.',
  },
  {
    icon: '📝',
    title: '분석 기록',
    description: '이전에 분석한 기록을 저장하고 언제든 다시 확인할 수 있습니다.',
  },
]

const PLANS_PREVIEW = [
  {
    name: '무료',
    price: '0원',
    feature: '월 5회 분석',
    highlight: false,
  },
  {
    name: '베이직',
    price: '4,900원/월',
    feature: '월 30회 분석',
    highlight: true,
  },
  {
    name: '프리미엄',
    price: '9,900원/월',
    feature: '무제한 분석',
    highlight: false,
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero Section - F-050 */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6">
            세탁 기호, <br className="md:hidden" />
            <span className="text-primary-500">AI가 읽어드립니다</span>
          </h1>
          <p className="text-lg md:text-xl text-navy-600 max-w-2xl mx-auto mb-8">
            사진 한 장으로 세탁 기호를 분석하고, 옷을 올바르게 관리하세요.
            LaundryLens가 의류 관리를 더 쉽게 만들어 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/analyze">
              <Button variant="primary" size="lg">
                지금 분석 시작하기
              </Button>
            </Link>
            <Link to="/symbols">
              <Button variant="outline" size="lg">
                세탁 기호 알아보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - F-051 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              LaundryLens의 기능
            </h2>
            <p className="text-lg text-navy-600 max-w-2xl mx-auto">
              복잡한 세탁 기호를 쉽게 이해하고, 의류를 오래 입을 수 있도록 도와드립니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-navy-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              3단계로 간단하게
            </h2>
            <p className="text-lg text-navy-600">
              복잡한 세탁 기호 분석, 이제 쉽게 할 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">사진 촬영</h3>
              <p className="text-navy-600">
                옷에 있는 세탁 라벨을 카메라로 촬영하거나 갤러리에서 선택하세요.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">AI 분석</h3>
              <p className="text-navy-600">
                LaundryLens AI가 이미지에서 세탁 기호를 자동으로 인식합니다.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">결과 확인</h3>
              <p className="text-navy-600">
                분석된 기호의 의미와 세탁 방법을 쉽게 확인하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section - F-052 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              합리적인 요금제
            </h2>
            <p className="text-lg text-navy-600">
              필요한 만큼만 선택하세요. 무료로 시작할 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PLANS_PREVIEW.map((plan, index) => (
              <Card
                key={index}
                className={`p-6 text-center ${
                  plan.highlight
                    ? 'border-2 border-primary-500 shadow-lg scale-105'
                    : 'border border-gray-200'
                }`}
              >
                {plan.highlight && (
                  <span className="inline-block bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    인기
                  </span>
                )}
                <h3 className="text-xl font-semibold text-navy-900 mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold text-primary-500 mb-2">{plan.price}</p>
                <p className="text-navy-600 mb-4">{plan.feature}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/pricing">
              <Button variant="outline">요금제 자세히 보기</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            세탁 기호 때문에 고민하지 마세요. LaundryLens가 도와드립니다.
          </p>
          <Link to="/analyze">
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-primary-500 hover:bg-gray-50 border-white"
            >
              무료로 분석 시작하기
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
