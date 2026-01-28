import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, Button } from '../components/common'
import { useAuthStore } from '../stores/authStore'
import { historyApi, type AnalysisHistoryItem } from '../api/historyApi'

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) {
    return `${diffMins}분 전`
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`
  } else if (diffDays < 7) {
    return `${diffDays}일 전`
  } else {
    return date.toLocaleDateString('ko-KR')
  }
}

function HistoryCard({
  item,
  onDelete,
}: {
  item: AnalysisHistoryItem
  onDelete: (id: string) => void
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="w-full sm:w-32 h-32 bg-gray-100 flex-shrink-0">
          <img
            src={item.imageUrl}
            alt="분석 이미지"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-sm text-navy-500">{formatRelativeTime(item.analyzedAt)}</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-primary-500 font-medium">
                {item.symbolCount}개 기호 감지
              </span>
            </div>
            <button
              onClick={() => onDelete(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="삭제"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>

          <p className="text-navy-700 mb-4 line-clamp-2">{item.summary}</p>

          <Link to={`/history/${item.id}`}>
            <Button variant="outline" size="sm">
              상세 보기
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default function AnalysisHistory() {
  const { isAuthenticated } = useAuthStore()
  const queryClient = useQueryClient()
  const [page] = useState(1)

  const { data, isLoading, error } = useQuery({
    queryKey: ['analysisHistory', page],
    queryFn: () => historyApi.getHistory(page, 10),
    enabled: isAuthenticated,
  })

  const deleteMutation = useMutation({
    mutationFn: historyApi.deleteHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analysisHistory'] })
    },
  })

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const handleDelete = (id: string) => {
    if (window.confirm('이 분석 기록을 삭제하시겠습니까?')) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900 mb-2">분석 이력</h1>
        <p className="text-navy-600">이전에 분석한 세탁 기호 결과를 확인하세요.</p>
      </header>

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
          <p className="text-navy-700 mb-4">분석 이력을 불러오는 중 오류가 발생했습니다.</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            다시 시도
          </Button>
        </Card>
      )}

      {/* Empty State */}
      {data && data.items.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-4xl mb-4">📋</div>
          <h2 className="text-xl font-semibold text-navy-900 mb-2">분석 이력이 없습니다</h2>
          <p className="text-navy-600 mb-6">
            세탁 기호를 분석하면 여기에 기록이 남습니다.
          </p>
          <Link to="/analyze">
            <Button variant="primary">세탁 기호 분석하기</Button>
          </Link>
        </Card>
      )}

      {/* History List */}
      {data && data.items.length > 0 && (
        <>
          <div className="space-y-4">
            {data.items.map((item) => (
              <HistoryCard key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 text-center text-navy-500">
            총 {data.totalCount}개의 분석 기록
          </div>
        </>
      )}

      {/* CTA */}
      <Card className="mt-8 p-6 text-center bg-primary-50 border-primary-200">
        <p className="text-navy-700 mb-4">새로운 의류의 세탁 기호를 분석해보세요!</p>
        <Link to="/analyze">
          <Button variant="primary">새 분석 시작</Button>
        </Link>
      </Card>
    </div>
  )
}
