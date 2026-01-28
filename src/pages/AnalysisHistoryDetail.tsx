import { Link, useParams, Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Card, Button } from '../components/common'
import { useAuthStore } from '../stores/authStore'
import { AnalysisResultView } from '../components/analyze'

interface SymbolDetail {
  code: string
  name: string
  description: string
  category: 'wash' | 'bleach' | 'dry' | 'iron' | 'professional'
}

interface AnalysisDetailResponse {
  id: string
  imageUrl: string
  analyzedAt: string
  symbols: SymbolDetail[]
  tips: string[]
}

// Mock API function
async function fetchAnalysisDetail(id: string): Promise<AnalysisDetailResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock response
  return {
    id,
    imageUrl: 'https://via.placeholder.com/400x400?text=Laundry+Label',
    analyzedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    symbols: [
      {
        code: 'wash-40',
        name: '40°C 세탁',
        description: '40°C 이하의 물에서 세탁기로 세탁할 수 있습니다.',
        category: 'wash',
      },
      {
        code: 'bleach-no',
        name: '표백 금지',
        description: '염소계 및 산소계 표백제를 사용하지 마세요.',
        category: 'bleach',
      },
      {
        code: 'dry-tumble',
        name: '텀블 건조 가능',
        description: '건조기 사용이 가능합니다. 저온에서 건조하세요.',
        category: 'dry',
      },
      {
        code: 'iron-medium',
        name: '중온 다림질',
        description: '150°C 이하에서 다림질할 수 있습니다.',
        category: 'iron',
      },
      {
        code: 'professional-no',
        name: '드라이클리닝 금지',
        description: '드라이클리닝을 하지 마세요.',
        category: 'professional',
      },
    ],
    tips: [
      '비슷한 색상의 옷끼리 함께 세탁하세요.',
      '세탁 전 주머니를 확인하세요.',
      '첫 세탁 시에는 단독 세탁을 권장합니다.',
    ],
  }
}

export default function AnalysisHistoryDetail() {
  const { id } = useParams<{ id: string }>()
  const { isAuthenticated } = useAuthStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['analysisDetail', id],
    queryFn: () => fetchAnalysisDetail(id!),
    enabled: isAuthenticated && !!id,
  })

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!id) {
    return <Navigate to="/history" replace />
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Link */}
      <Link
        to="/history"
        className="inline-flex items-center gap-2 text-navy-600 hover:text-primary-500 mb-8"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        분석 이력으로
      </Link>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="p-8 text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-navy-700 mb-4">분석 상세 정보를 불러오는 중 오류가 발생했습니다.</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            다시 시도
          </Button>
        </Card>
      )}

      {/* Content */}
      {data && (
        <>
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-navy-900 mb-2">분석 결과 상세</h1>
            <p className="text-navy-600">
              {new Date(data.analyzedAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
              에 분석됨
            </p>
          </header>

          {/* Use existing AnalysisResultView component */}
          <AnalysisResultView
            result={{
              id: data.id,
              imageUrl: data.imageUrl,
              symbols: data.symbols,
              analyzedAt: data.analyzedAt,
            }}
            onReset={() => {}}
          />

          {/* Tips Section */}
          <Card className="mt-8 p-6">
            <h2 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span> 세탁 팁
            </h2>
            <ul className="space-y-2">
              {data.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-navy-600">
                  <span className="text-primary-500">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </Card>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/analyze">
              <Button variant="primary">새로운 분석 시작</Button>
            </Link>
            <Link to="/guide">
              <Button variant="outline">소재별 가이드 보기</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
