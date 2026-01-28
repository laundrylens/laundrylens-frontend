export type CategoryCode = 'wash' | 'bleach' | 'dry' | 'iron' | 'dryclean'

interface Category {
  code: CategoryCode
  name: string
  icon: string
}

const CATEGORIES: Category[] = [
  { code: 'wash', name: '세탁', icon: '🫧' },
  { code: 'bleach', name: '표백', icon: '⚗️' },
  { code: 'dry', name: '건조', icon: '☀️' },
  { code: 'iron', name: '다림질', icon: '🔥' },
  { code: 'dryclean', name: '드라이클리닝', icon: '🧪' },
]

interface CategoryFilterProps {
  selected: CategoryCode[]
  onToggle: (category: CategoryCode) => void
  className?: string
}

export default function CategoryFilter({
  selected,
  onToggle,
  className = '',
}: CategoryFilterProps) {
  return (
    <div
      className={`flex flex-wrap gap-2 ${className}`}
      role="group"
      aria-label="카테고리 필터"
    >
      {CATEGORIES.map((category) => {
        const isSelected = selected.includes(category.code)
        return (
          <button
            key={category.code}
            onClick={() => onToggle(category.code)}
            aria-pressed={isSelected}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors
              ${
                isSelected
                  ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                  : 'bg-navy-50 text-navy-600 border-2 border-transparent hover:bg-navy-100'
              }
            `}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        )
      })}
    </div>
  )
}
