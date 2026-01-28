export type CountryCode = 'KR' | 'US' | 'JP'

interface Country {
  code: CountryCode
  name: string
  flag: string
}

const COUNTRIES: Country[] = [
  { code: 'KR', name: '한국', flag: '🇰🇷' },
  { code: 'US', name: '미국', flag: '🇺🇸' },
  { code: 'JP', name: '일본', flag: '🇯🇵' },
]

interface CountryTabsProps {
  selected: CountryCode
  onSelect: (country: CountryCode) => void
  className?: string
}

export default function CountryTabs({
  selected,
  onSelect,
  className = '',
}: CountryTabsProps) {
  return (
    <div className={`flex gap-2 ${className}`} role="tablist" aria-label="국가 선택">
      {COUNTRIES.map((country) => {
        const isSelected = selected === country.code
        return (
          <button
            key={country.code}
            role="tab"
            aria-selected={isSelected}
            aria-controls={`panel-${country.code}`}
            onClick={() => onSelect(country.code)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-soft font-medium transition-colors
              ${
                isSelected
                  ? 'bg-primary-500 text-white'
                  : 'bg-navy-100 text-navy-600 hover:bg-navy-200'
              }
            `}
          >
            <span>{country.flag}</span>
            <span>{country.name}</span>
          </button>
        )
      })}
    </div>
  )
}
