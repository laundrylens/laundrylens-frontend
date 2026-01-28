import { useParams, Link, Navigate } from 'react-router-dom'
import { Card, Button } from '../components/common'

interface MaterialInfo {
  code: string
  name: string
  description: string
  icon: string
  washTips: string[]
  dryTips: string[]
  ironTips: string[]
  cautions: string[]
  commonSymbols: string[]
}

const MATERIAL_DETAILS: Record<string, MaterialInfo> = {
  cotton: {
    code: 'cotton',
    name: '면 (Cotton)',
    description:
      '면은 목화에서 얻어지는 천연 섬유로, 통기성이 좋고 흡습성이 뛰어납니다. 피부에 자극이 적어 속옷이나 여름 옷에 많이 사용됩니다.',
    icon: '🧵',
    washTips: [
      '세탁기 사용 가능 (일반 코스)',
      '40°C 이하 온도 권장',
      '첫 세탁 시 수축 가능성 있음',
      '어두운 색상은 뒤집어서 세탁',
    ],
    dryTips: [
      '건조기 사용 가능 (저온)',
      '자연 건조 시 햇빛에 바래질 수 있음',
      '탈수 후 펴서 건조',
    ],
    ironTips: ['고온 다림질 가능', '스팀 다림질 효과적', '약간 젖은 상태에서 다림질하면 좋음'],
    cautions: ['표백제 사용 시 변색 주의', '수축 방지를 위해 찬물 세탁 권장'],
    commonSymbols: ['wash-40', 'bleach-ok', 'dry-tumble', 'iron-medium'],
  },
  polyester: {
    code: 'polyester',
    name: '폴리에스터 (Polyester)',
    description:
      '폴리에스터는 석유에서 추출한 합성 섬유로, 내구성이 뛰어나고 구김이 적습니다. 스포츠 의류나 아웃도어 제품에 많이 사용됩니다.',
    icon: '🔷',
    washTips: [
      '세탁기 사용 가능',
      '30°C 이하 미온수 권장',
      '정전기 방지를 위해 섬유유연제 사용',
    ],
    dryTips: ['건조기 사용 가능 (저온)', '빠르게 건조됨', '고온 건조 시 손상 가능'],
    ironTips: ['저온 다림질', '고온 시 녹을 수 있으므로 주의', '스팀 사용 가능'],
    cautions: ['고온에 약함', '정전기 발생하기 쉬움'],
    commonSymbols: ['wash-30', 'bleach-no', 'dry-tumble', 'iron-low'],
  },
  wool: {
    code: 'wool',
    name: '울 (Wool)',
    description:
      '울은 양털에서 얻어지는 천연 섬유로, 보온성이 뛰어나고 탄성이 좋습니다. 코트, 스웨터 등 겨울 의류에 주로 사용됩니다.',
    icon: '🐑',
    washTips: [
      '손세탁 권장',
      '울 전용 세제 사용',
      '찬물 사용',
      '비비거나 짜지 말 것',
      '세탁기 사용 시 울 코스',
    ],
    dryTips: ['건조기 사용 금지', '평평하게 눕혀서 건조', '옷걸이에 걸면 늘어남'],
    ironTips: ['저온 다림질', '천을 덮고 다림질', '스팀 사용 권장'],
    cautions: ['축융 주의 (펠트화)', '충충나방 주의', '직사광선 피하기'],
    commonSymbols: ['wash-30', 'bleach-no', 'dry-flat', 'iron-low'],
  },
  silk: {
    code: 'silk',
    name: '실크 (Silk)',
    description:
      '실크는 누에고치에서 얻어지는 천연 단백질 섬유로, 부드럽고 광택이 아름답습니다. 고급 의류나 속옷에 사용됩니다.',
    icon: '✨',
    washTips: ['손세탁 권장', '중성 세제 사용', '찬물 사용', '살살 흔들어 세탁'],
    dryTips: ['건조기 사용 금지', '그늘에서 자연 건조', '직사광선 피하기'],
    ironTips: ['저온 다림질', '뒷면에서 다림질', '물 분무 금지 (얼룩 생김)'],
    cautions: ['표백제 절대 금지', '향수, 땀에 약함', '마찰에 약함'],
    commonSymbols: ['wash-30', 'bleach-no', 'dry-no', 'iron-low'],
  },
  linen: {
    code: 'linen',
    name: '린넨 (Linen)',
    description:
      '린넨은 아마에서 얻어지는 천연 식물성 섬유로, 시원하고 통기성이 좋습니다. 여름 옷이나 침구류에 많이 사용됩니다.',
    icon: '🌿',
    washTips: ['세탁기 사용 가능', '40°C 이하 권장', '첫 세탁 시 수축 가능', '색상별 분리 세탁'],
    dryTips: ['자연 건조 권장', '건조기 사용 시 저온', '구김이 잘 생김'],
    ironTips: ['고온 다림질 가능', '약간 젖은 상태에서 다림질', '스팀 효과적'],
    cautions: ['구김이 많이 생김', '강한 햇빛에 변색 가능'],
    commonSymbols: ['wash-40', 'bleach-ok', 'dry-tumble', 'iron-medium'],
  },
  denim: {
    code: 'denim',
    name: '데님 (Denim)',
    description:
      '데님은 능직으로 짠 튼튼한 면직물로, 청바지의 주요 소재입니다. 내구성이 좋고 세탁할수록 독특한 색감을 가집니다.',
    icon: '👖',
    washTips: [
      '뒤집어서 세탁',
      '찬물 권장 (색 보존)',
      '첫 세탁은 단독 세탁',
      '자주 세탁하지 않는 것이 좋음',
    ],
    dryTips: ['자연 건조 권장', '건조기 사용 시 수축 가능', '직사광선 피하기'],
    ironTips: ['중온 다림질', '스팀 사용 가능', '뒷면에서 다림질'],
    cautions: ['색이 빠질 수 있음', '다른 옷과 분리 세탁'],
    commonSymbols: ['wash-30', 'bleach-no', 'dry-no', 'iron-medium'],
  },
  nylon: {
    code: 'nylon',
    name: '나일론 (Nylon)',
    description:
      '나일론은 최초의 합성 섬유로, 가볍고 강하며 탄성이 뛰어납니다. 스타킹, 수영복, 아웃도어 의류에 많이 사용됩니다.',
    icon: '🪢',
    washTips: ['세탁기 사용 가능', '30°C 이하 미온수', '섬유유연제 사용 권장'],
    dryTips: ['건조기 사용 주의', '자연 건조 권장', '빠르게 건조됨'],
    ironTips: ['저온 다림질', '고온 시 녹을 수 있음', '천을 덮고 다림질'],
    cautions: ['열에 약함', '정전기 발생하기 쉬움'],
    commonSymbols: ['wash-30', 'bleach-no', 'dry-no', 'iron-low'],
  },
  cashmere: {
    code: 'cashmere',
    name: '캐시미어 (Cashmere)',
    description:
      '캐시미어는 캐시미어 산양의 속털에서 얻어지는 고급 섬유로, 부드럽고 가벼우며 보온성이 뛰어납니다.',
    icon: '🐐',
    washTips: ['손세탁 강력 권장', '울/캐시미어 전용 세제', '찬물 사용', '살살 누르듯 세탁'],
    dryTips: ['건조기 절대 금지', '평평하게 눕혀서 건조', '형태 잡아서 건조'],
    ironTips: ['저온 다림질', '천을 덮고 다림질', '스팀 사용 가능'],
    cautions: ['매우 섬세한 소재', '보풀이 생기기 쉬움', '드라이클리닝 권장'],
    commonSymbols: ['wash-no', 'bleach-no', 'dry-flat', 'iron-low'],
  },
}

export default function MaterialDetail() {
  const { code } = useParams<{ code: string }>()
  const material = code ? MATERIAL_DETAILS[code] : null

  if (!material) {
    return <Navigate to="/guide" replace />
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Link */}
      <Link
        to="/guide"
        className="inline-flex items-center gap-2 text-navy-600 hover:text-primary-500 mb-8"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        가이드 목록으로
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="text-5xl mb-4">{material.icon}</div>
        <h1 className="text-3xl font-bold text-navy-900 mb-2">{material.name}</h1>
        <p className="text-lg text-navy-600">{material.description}</p>
      </header>

      {/* Care Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Wash Tips */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">🧺</span> 세탁 방법
          </h2>
          <ul className="space-y-2">
            {material.washTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-navy-600">
                <span className="text-primary-500">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </Card>

        {/* Dry Tips */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">☀️</span> 건조 방법
          </h2>
          <ul className="space-y-2">
            {material.dryTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-navy-600">
                <span className="text-primary-500">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </Card>

        {/* Iron Tips */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">🔥</span> 다림질 방법
          </h2>
          <ul className="space-y-2">
            {material.ironTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-navy-600">
                <span className="text-primary-500">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </Card>

        {/* Cautions */}
        <Card className="p-6 border-yellow-200 bg-yellow-50">
          <h2 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚠️</span> 주의사항
          </h2>
          <ul className="space-y-2">
            {material.cautions.map((caution, index) => (
              <li key={index} className="flex items-start gap-2 text-yellow-800">
                <span className="text-yellow-600">•</span>
                {caution}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* CTA */}
      <Card className="p-6 text-center">
        <p className="text-navy-600 mb-4">
          {material.name} 제품의 세탁 기호가 궁금하신가요?
        </p>
        <Link to="/analyze">
          <Button variant="primary">이미지로 세탁 기호 분석하기</Button>
        </Link>
      </Card>
    </div>
  )
}
