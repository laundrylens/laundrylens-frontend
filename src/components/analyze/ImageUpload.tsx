import { useRef, useState, useCallback } from 'react'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

interface ImageUploadProps {
  onFileSelect: (file: File) => void
  onError?: (message: string) => void
  disabled?: boolean
  className?: string
}

export default function ImageUpload({
  onFileSelect,
  onError,
  disabled = false,
  className = '',
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const validateFile = useCallback(
    (file: File): boolean => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        onError?.('지원하지 않는 파일 형식입니다. (jpg, png, webp만 가능)')
        return false
      }

      if (file.size > MAX_FILE_SIZE) {
        onError?.('파일 크기가 5MB를 초과합니다.')
        return false
      }

      return true
    },
    [onError]
  )

  const handleFile = useCallback(
    (file: File) => {
      if (validateFile(file)) {
        onFileSelect(file)
      }
    },
    [validateFile, onFileSelect]
  )

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
    // Reset input value to allow selecting the same file again
    e.target.value = ''
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    if (disabled) return

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label="이미지 업로드"
      aria-disabled={disabled}
      className={`
        bg-navy-50 border-2 border-dashed rounded-soft p-8
        flex flex-col items-center justify-center min-h-[300px]
        transition-colors cursor-pointer
        ${isDragOver ? 'border-primary-500 bg-primary-50' : 'border-navy-200'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-400 hover:bg-navy-100'}
        ${className}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
        aria-hidden="true"
      />

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
        {isDragOver ? '여기에 놓으세요' : '이미지를 업로드하세요'}
      </h3>

      <p className="text-sm text-navy-500 text-center">
        세탁 라벨 사진을 드래그하거나 클릭하여 업로드하세요.
        <br />
        <span className="text-navy-400">JPG, PNG, WebP (최대 5MB)</span>
      </p>
    </div>
  )
}
