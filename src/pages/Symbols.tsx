interface SymbolsLayoutProps {
  filterSection?: React.ReactNode
  children?: React.ReactNode
}

function SymbolsLayout({ filterSection, children }: SymbolsLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900">기호 사전</h1>
        <p className="mt-2 text-navy-600">
          세탁 기호를 검색하고 의미를 알아보세요.
        </p>
      </header>

      {/* Filter Section */}
      <section aria-label="필터" className="mb-6">
        {filterSection || (
          <div className="bg-navy-50 rounded-soft p-4">
            <p className="text-navy-400 text-sm">필터 영역</p>
          </div>
        )}
      </section>

      {/* Grid Section */}
      <section aria-label="기호 목록">
        {children || (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <EmptyState />
          </div>
        )}
      </section>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-navy-700">기호를 검색해보세요</h3>
      <p className="mt-1 text-sm text-navy-500">
        필터를 선택하거나 검색어를 입력하세요.
      </p>
    </div>
  )
}

export default function Symbols() {
  return <SymbolsLayout />
}
