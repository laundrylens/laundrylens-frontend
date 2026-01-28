import { useRef, useState, useCallback, useEffect } from 'react'
import { Button } from '../common'

type CameraState = 'idle' | 'requesting' | 'active' | 'error'

interface CameraCaptureProps {
  onCapture: (file: File) => void
  onError?: (message: string) => void
  onClose?: () => void
  className?: string
}

export default function CameraCapture({
  onCapture,
  onError,
  onClose,
  className = '',
}: CameraCaptureProps) {
  const [cameraState, setCameraState] = useState<CameraState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setCameraState('idle')
  }, [])

  const startCamera = useCallback(async () => {
    setCameraState('requesting')
    setErrorMessage('')

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // 후면 카메라 우선
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }

      setCameraState('active')
    } catch (error) {
      const message =
        error instanceof Error && error.name === 'NotAllowedError'
          ? '카메라 권한이 거부되었습니다. 브라우저 설정에서 권한을 허용해주세요.'
          : '카메라를 시작할 수 없습니다.'

      setErrorMessage(message)
      setCameraState('error')
      onError?.(message)
    }
  }, [onError])

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    // Set canvas size to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0)

    // Convert to blob and create File
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `capture-${Date.now()}.jpg`, {
            type: 'image/jpeg',
          })
          onCapture(file)
          stopCamera()
        }
      },
      'image/jpeg',
      0.9
    )
  }, [onCapture, stopCamera])

  const handleClose = useCallback(() => {
    stopCamera()
    onClose?.()
  }, [stopCamera, onClose])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div className={`bg-navy-900 rounded-soft overflow-hidden ${className}`}>
      {/* Hidden canvas for capturing */}
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      {cameraState === 'idle' && (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
          <div className="w-16 h-16 bg-navy-700 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-navy-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <Button onClick={startCamera} aria-label="카메라 시작">
            카메라 시작
          </Button>
        </div>
      )}

      {cameraState === 'requesting' && (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-navy-300">카메라 권한을 요청하는 중...</p>
        </div>
      )}

      {cameraState === 'error' && (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
          <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-red-400 text-center mb-4" role="alert">
            {errorMessage}
          </p>
          <div className="flex gap-2">
            <Button onClick={startCamera} variant="secondary">
              다시 시도
            </Button>
            {onClose && (
              <Button onClick={handleClose} variant="ghost">
                닫기
              </Button>
            )}
          </div>
        </div>
      )}

      {cameraState === 'active' && (
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full aspect-video object-cover"
            aria-label="카메라 미리보기"
          />

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <Button
              onClick={capturePhoto}
              className="w-16 h-16 rounded-full p-0"
              aria-label="사진 촬영"
            >
              <div className="w-12 h-12 bg-white rounded-full" />
            </Button>
          </div>

          {onClose && (
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              aria-label="카메라 닫기"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
