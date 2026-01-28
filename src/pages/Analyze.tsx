interface AnalyzeLayoutProps {
  uploadSection?: React.ReactNode
  resultSection?: React.ReactNode
}

function AnalyzeLayout({ uploadSection, resultSection }: AnalyzeLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900">이미지 분석</h1>
        <p className="mt-2 text-navy-600">
          세탁 라벨 이미지를 업로드하여 기호를 분석하세요.
        </p>
      </header>

      {/* Main Content - 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <section aria-label="이미지 업로드">
          {uploadSection || <UploadPlaceholder />}
        </section>

        {/* Result Section */}
        <section aria-label="분석 결과">
          {resultSection || <ResultPlaceholder />}
        </section>
      </div>
    </div>
  )
}

function UploadPlaceholder() {
  return (
    <div className="bg-navy-50 border-2 border-dashed border-navy-200 rounded-soft p-8 flex flex-col items-center justify-center min-h-[300px]">
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
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-navy-700 mb-2">
        이미지를 업로드하세요
      </h3>
      <p className="text-sm text-navy-500 text-center">
        세탁 라벨 사진을 드래그하거나 클릭하여 업로드하세요.
        <br />
        카메라로 직접 촬영할 수도 있습니다.
      </p>
    </div>
  )
}

function ResultPlaceholder() {
  return (
    <div className="bg-navy-50 rounded-soft p-8 flex flex-col items-center justify-center min-h-[300px]">
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-navy-700 mb-2">
        분석 결과가 여기에 표시됩니다
      </h3>
      <p className="text-sm text-navy-500 text-center">
        이미지를 업로드하면 AI가 세탁 기호를 인식하고
        <br />
        각 기호의 의미를 알려드립니다.
      </p>
    </div>
  )
}

export default function Analyze() {
  return <AnalyzeLayout />
}

// Export for testing
export { AnalyzeLayout, UploadPlaceholder, ResultPlaceholder }
