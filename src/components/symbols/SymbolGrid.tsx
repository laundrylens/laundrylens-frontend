import type { Symbol } from '../../types'
import SymbolCard from './SymbolCard'

interface SymbolGridProps {
  symbols: Symbol[]
  onSymbolClick?: (symbol: Symbol) => void
  className?: string
  emptyMessage?: string
}

export default function SymbolGrid({
  symbols,
  onSymbolClick,
  className = '',
  emptyMessage = '표시할 기호가 없습니다.',
}: SymbolGridProps) {
  if (symbols.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mb-4">
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
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <p className="text-navy-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ${className}`}
      role="list"
      aria-label="세탁 기호 목록"
    >
      {symbols.map((symbol) => (
        <div key={symbol.id} role="listitem">
          <SymbolCard symbol={symbol} onClick={onSymbolClick} />
        </div>
      ))}
    </div>
  )
}
