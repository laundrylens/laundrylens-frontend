import type { Symbol } from '../../types'
import { Card } from '../common'

interface SymbolCardProps {
  symbol: Symbol
  onClick?: (symbol: Symbol) => void
  className?: string
}

export default function SymbolCard({
  symbol,
  onClick,
  className = '',
}: SymbolCardProps) {
  const handleClick = () => {
    onClick?.(symbol)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.(symbol)
    }
  }

  return (
    <Card
      className={`p-4 cursor-pointer hover:shadow-medium transition-shadow ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${symbol.name} 기호 상세보기`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 flex items-center justify-center mb-3">
          <img
            src={symbol.imageUrl}
            alt={symbol.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <h3 className="text-sm font-medium text-navy-800 line-clamp-2">
          {symbol.name}
        </h3>
      </div>
    </Card>
  )
}
