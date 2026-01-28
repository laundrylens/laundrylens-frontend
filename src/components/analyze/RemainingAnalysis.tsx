import { Button } from '../common'

interface RemainingAnalysisProps {
  used: number
  total: number
  planName?: string
  onUpgrade?: () => void
  className?: string
}

export default function RemainingAnalysis({
  used,
  total,
  planName = '무료',
  onUpgrade,
  className = '',
}: RemainingAnalysisProps) {
  const remaining = Math.max(total - used, 0)
  const percentage = total > 0 ? Math.min((used / total) * 100, 100) : 0
  const isLow = remaining <= 3 && remaining > 0
  const isExhausted = remaining <= 0

  return (
    <div className={`bg-white border border-navy-200 rounded-soft p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-primary-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="text-sm font-medium text-navy-700">분석 횟수</span>
          <span className="text-xs bg-navy-100 text-navy-600 px-2 py-0.5 rounded">
            {planName}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              isExhausted
                ? 'bg-red-500'
                : isLow
                  ? 'bg-yellow-500'
                  : 'bg-primary-500'
            }`}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={used}
            aria-valuemin={0}
            aria-valuemax={total}
          />
        </div>
      </div>

      {/* Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <span
            className={`text-2xl font-bold ${
              isExhausted ? 'text-red-500' : isLow ? 'text-yellow-600' : 'text-navy-900'
            }`}
          >
            {remaining}
          </span>
          <span className="text-sm text-navy-500">/ {total}회 남음</span>
        </div>

        {onUpgrade && (
          <Button variant="secondary" size="sm" onClick={onUpgrade}>
            업그레이드
          </Button>
        )}
      </div>

      {/* Warning message */}
      {isLow && !isExhausted && (
        <p className="mt-3 text-sm text-yellow-600 flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          분석 횟수가 얼마 남지 않았습니다.
        </p>
      )}

      {isExhausted && (
        <p className="mt-3 text-sm text-red-500 flex items-center gap-1" role="alert">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          분석 횟수를 모두 사용했습니다. 업그레이드가 필요합니다.
        </p>
      )}
    </div>
  )
}
