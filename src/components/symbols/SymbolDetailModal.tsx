import type { Symbol } from '../../types'
import { Modal } from '../common'

interface SymbolDetailModalProps {
  symbol: Symbol | null
  isOpen: boolean
  onClose: () => void
}

const CATEGORY_LABELS: Record<Symbol['category'], string> = {
  wash: '세탁',
  bleach: '표백',
  dry: '건조',
  iron: '다림질',
  dryclean: '드라이클리닝',
}

export default function SymbolDetailModal({
  symbol,
  isOpen,
  onClose,
}: SymbolDetailModalProps) {
  if (!symbol) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={symbol.name}>
      <div className="space-y-6">
        {/* Symbol Image */}
        <div className="flex justify-center">
          <div className="w-32 h-32 flex items-center justify-center bg-navy-50 rounded-soft">
            <img
              src={symbol.imageUrl}
              alt={symbol.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        {/* Symbol Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-navy-500 mb-1">카테고리</h3>
            <p className="text-navy-800">{CATEGORY_LABELS[symbol.category]}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-navy-500 mb-1">설명</h3>
            <p className="text-navy-800">{symbol.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-navy-500 mb-1">기호 코드</h3>
            <p className="text-navy-600 font-mono text-sm">{symbol.code}</p>
          </div>
        </div>

        {/* Country Comparison Section (Placeholder) */}
        <div className="border-t border-navy-100 pt-4">
          <h3 className="text-sm font-medium text-navy-500 mb-3">
            다른 국가의 같은 기호
          </h3>
          <div className="bg-navy-50 rounded-soft p-4 text-center text-navy-400 text-sm">
            API 연동 후 표시됩니다.
          </div>
        </div>
      </div>
    </Modal>
  )
}
