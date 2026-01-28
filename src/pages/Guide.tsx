import { Link } from 'react-router-dom'
import { Card } from '../components/common'

interface Material {
  code: string
  name: string
  description: string
  icon: string
}

const MATERIALS: Material[] = [
  {
    code: 'cotton',
    name: '면 (Cotton)',
    description: '통기성이 좋고 흡습성이 뛰어나며 내구성이 강한 천연 소재입니다.',
    icon: '🧵',
  },
  {
    code: 'polyester',
    name: '폴리에스터 (Polyester)',
    description: '구김이 적고 빠르게 건조되며 형태 유지가 뛰어난 합성 소재입니다.',
    icon: '🔷',
  },
  {
    code: 'wool',
    name: '울 (Wool)',
    description: '보온성이 뛰어나고 탄성이 좋은 천연 동물성 섬유입니다.',
    icon: '🐑',
  },
  {
    code: 'silk',
    name: '실크 (Silk)',
    description: '광택이 아름답고 부드러운 촉감의 고급 천연 소재입니다.',
    icon: '✨',
  },
  {
    code: 'linen',
    name: '린넨 (Linen)',
    description: '시원하고 통기성이 좋으며 내구성이 뛰어난 천연 식물성 섬유입니다.',
    icon: '🌿',
  },
  {
    code: 'denim',
    name: '데님 (Denim)',
    description: '튼튼하고 내구성이 좋은 능직 면직물입니다.',
    icon: '👖',
  },
  {
    code: 'nylon',
    name: '나일론 (Nylon)',
    description: '가볍고 강하며 탄성이 뛰어난 합성 섬유입니다.',
    icon: '🪢',
  },
  {
    code: 'cashmere',
    name: '캐시미어 (Cashmere)',
    description: '부드럽고 가벼우며 보온성이 뛰어난 고급 동물성 섬유입니다.',
    icon: '🐐',
  },
]

export default function Guide() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-navy-900 mb-4">세탁 가이드</h1>
        <p className="text-lg text-navy-600 max-w-2xl mx-auto">
          소재별 올바른 세탁 방법을 알아보세요. 각 소재의 특성을 이해하면 옷을 더 오래 입을 수
          있습니다.
        </p>
      </header>

      {/* Tips Section */}
      <section className="bg-primary-50 rounded-2xl p-8 mb-12">
        <h2 className="text-xl font-bold text-navy-900 mb-4">세탁 기본 팁</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex items-start gap-3">
            <span className="text-primary-500 font-bold">1.</span>
            <span className="text-navy-600">항상 세탁 라벨을 먼저 확인하세요.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-500 font-bold">2.</span>
            <span className="text-navy-600">비슷한 색상끼리 분류하여 세탁하세요.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-500 font-bold">3.</span>
            <span className="text-navy-600">찬물 세탁은 색상 보호에 도움이 됩니다.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-500 font-bold">4.</span>
            <span className="text-navy-600">지퍼와 단추는 잠그고 세탁하세요.</span>
          </li>
        </ul>
      </section>

      {/* Materials Grid */}
      <section>
        <h2 className="text-2xl font-bold text-navy-900 mb-6">소재별 가이드</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MATERIALS.map((material) => (
            <Link key={material.code} to={`/guide/${material.code}`}>
              <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-4">{material.icon}</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">{material.name}</h3>
                <p className="text-sm text-navy-600 line-clamp-2">{material.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export { MATERIALS }
