import type { AnalysisResult } from '../../types'
import { Button, Card } from '../common'

const CATEGORY_LABELS: Record<string, string> = {
  wash: '세탁',
  bleach: '표백',
  dry: '건조',
  iron: '다림질',
  dryclean: '드라이클리닝',
}

interface AnalysisResultProps {
  result: AnalysisResult
  onReset: () => void
  onSymbolClick?: (symbolId: string) => void
  className?: string
}

export default function AnalysisResultView({
  result,
  onReset,
  onSymbolClick,
  className = '',
}: AnalysisResultProps) {
  const { symbols } = result

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy-900">분석 결과</h2>
          <p className="text-sm text-navy-600 mt-1">
            {symbols.length}개의 기호를 인식했습니다.
          </p>
        </div>
        <Button variant="secondary" onClick={onReset}>
          다시 분석
        </Button>
      </div>

      {/* No symbols found */}
      {symbols.length === 0 && (
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-navy-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-navy-700 mb-2">
            인식된 기호가 없습니다
          </h3>
          <p className="text-sm text-navy-500">
            이미지가 선명하지 않거나 세탁 기호가 포함되지 않았습니다.
            <br />
            다른 이미지로 다시 시도해주세요.
          </p>
        </Card>
      )}

      {/* Symbol list */}
      {symbols.length > 0 && (
        <div className="space-y-3">
          {symbols.map((symbol) => (
            <Card
              key={symbol.id}
              className="p-4 cursor-pointer hover:bg-navy-50 transition-colors"
              onClick={() => onSymbolClick?.(symbol.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSymbolClick?.(symbol.id)
                }
              }}
            >
              <div className="flex items-center gap-4">
                {/* Symbol image */}
                <div className="w-16 h-16 bg-navy-100 rounded-soft flex items-center justify-center flex-shrink-0">
                  <img
                    src={symbol.imageUrl}
                    alt={symbol.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                {/* Symbol info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-navy-900 truncate">
                      {symbol.name}
                    </h3>
                    <span className="text-xs bg-navy-100 text-navy-600 px-2 py-0.5 rounded flex-shrink-0">
                      {CATEGORY_LABELS[symbol.category] || symbol.category}
                    </span>
                  </div>
                  <p className="text-sm text-navy-600 mt-1 line-clamp-2">
                    {symbol.description}
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  className="w-5 h-5 text-navy-400 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
