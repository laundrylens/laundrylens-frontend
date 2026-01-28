import { useState, useEffect } from 'react'

const MESSAGES = [
  '이미지를 분석하는 중...',
  '세탁 기호를 인식하는 중...',
  '기호 정보를 가져오는 중...',
  '분석 결과를 정리하는 중...',
]

const MESSAGE_INTERVAL = 2000 // 2 seconds

interface AnalyzingLoaderProps {
  className?: string
}

export default function AnalyzingLoader({ className = '' }: AnalyzingLoaderProps) {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length)
    }, MESSAGE_INTERVAL)

    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className={`bg-navy-50 rounded-soft p-8 flex flex-col items-center justify-center min-h-[300px] ${className}`}
      role="status"
      aria-live="polite"
    >
      {/* Spinner */}
      <div className="relative mb-6">
        <div className="w-16 h-16 border-4 border-navy-200 rounded-full" />
        <div
          className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"
          aria-hidden="true"
        />
      </div>

      {/* Message */}
      <p className="text-lg font-medium text-navy-700 mb-2">{MESSAGES[messageIndex]}</p>

      {/* Hint */}
      <p className="text-sm text-navy-500">잠시만 기다려주세요.</p>

      {/* Progress dots */}
      <div className="flex gap-2 mt-6" aria-hidden="true">
        {MESSAGES.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index <= messageIndex ? 'bg-primary-500' : 'bg-navy-200'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
