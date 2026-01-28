import { useMemo, useEffect } from 'react'
import { Button } from '../common'

interface ImagePreviewProps {
  file: File
  onReset: () => void
  onAnalyze: () => void
  isAnalyzing?: boolean
  className?: string
}

export default function ImagePreview({
  file,
  onReset,
  onAnalyze,
  isAnalyzing = false,
  className = '',
}: ImagePreviewProps) {
  const imageUrl = useMemo(() => URL.createObjectURL(file), [file])

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl)
    }
  }, [imageUrl])

  return (
    <div className={`bg-navy-50 rounded-soft overflow-hidden ${className}`}>
      {/* Image */}
      <div className="relative aspect-video">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="업로드된 이미지 미리보기"
            className="w-full h-full object-contain bg-navy-100"
          />
        )}
      </div>

      {/* File Info */}
      <div className="p-4 border-t border-navy-200">
        <p className="text-sm text-navy-600 truncate mb-1" title={file.name}>
          {file.name}
        </p>
        <p className="text-xs text-navy-400">
          {formatFileSize(file.size)}
        </p>
      </div>

      {/* Actions */}
      <div className="p-4 pt-0 flex gap-3">
        <Button
          variant="secondary"
          onClick={onReset}
          disabled={isAnalyzing}
          className="flex-1"
        >
          다시 선택
        </Button>
        <Button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="flex-1"
        >
          {isAnalyzing ? '분석 중...' : '분석 시작'}
        </Button>
      </div>
    </div>
  )
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
