import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CameraCapture from './CameraCapture'

// Mock MediaStream
const mockStop = vi.fn()
const mockTrack = { stop: mockStop }
const mockStream = {
  getTracks: () => [mockTrack],
}

// Mock video element methods
const mockPlay = vi.fn().mockResolvedValue(undefined)

describe('CameraCapture', () => {
  const mockOnCapture = vi.fn()
  const mockOnError = vi.fn()
  const mockOnClose = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Mock getUserMedia
    Object.defineProperty(navigator, 'mediaDevices', {
      writable: true,
      value: {
        getUserMedia: vi.fn().mockResolvedValue(mockStream),
      },
    })

    // Mock HTMLVideoElement.play
    HTMLVideoElement.prototype.play = mockPlay

    // Mock canvas context
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      drawImage: vi.fn(),
    })

    HTMLCanvasElement.prototype.toBlob = vi.fn().mockImplementation((callback) => {
      callback(new Blob(['test'], { type: 'image/jpeg' }))
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('idle state', () => {
    it('renders camera start button', () => {
      render(<CameraCapture onCapture={mockOnCapture} />)
      expect(screen.getByRole('button', { name: '카메라 시작' })).toBeInTheDocument()
    })

    it('does not show video preview', () => {
      render(<CameraCapture onCapture={mockOnCapture} />)
      expect(screen.queryByLabelText('카메라 미리보기')).not.toBeInTheDocument()
    })
  })

  describe('starting camera', () => {
    it('shows requesting state when starting', async () => {
      // Make getUserMedia hang
      vi.mocked(navigator.mediaDevices.getUserMedia).mockImplementation(
        () => new Promise(() => {})
      )

      render(<CameraCapture onCapture={mockOnCapture} />)
      fireEvent.click(screen.getByRole('button', { name: '카메라 시작' }))

      expect(screen.getByText('카메라 권한을 요청하는 중...')).toBeInTheDocument()
    })

    it('requests camera with correct constraints', async () => {
      render(<CameraCapture onCapture={mockOnCapture} />)
      fireEvent.click(screen.getByRole('button', { name: '카메라 시작' }))

      await waitFor(() => {
        expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })
      })
    })
  })

  describe('active state', () => {
    it('shows video preview when camera is active', async () => {
      render(<CameraCapture onCapture={mockOnCapture} />)
      fireEvent.click(screen.getByRole('button', { name: '카메라 시작' }))

      await waitFor(() => {
        expect(screen.getByLabelText('카메라 미리보기')).toBeInTheDocument()
      })
    })

    it('shows capture button when active', async () => {
      render(<CameraCapture onCapture={mockOnCapture} />)
      fireEvent.click(screen.getByRole('button', { name: '카메라 시작' }))

      await waitFor(() => {
        expect(screen.getByRole('button', { name: '사진 촬영' })).toBeInTheDocument()
      })
    })

    it('shows close button when onClose is provided', async () => {
      render(<CameraCapture onCapture={mockOnCapture} onClose={mockOnClose} />)
      fireEvent.click(screen.getByRole('button', { name: '카메라 시작' }))

      await waitFor(() => {
        expect(screen.getByRole('button', { name: '카메라 닫기' })).toBeInTheDocument()
      })
    })
  })

  describe('capturing photo', () => {
    it('calls onCapture with File when photo is captured', async () => {
      render(<CameraCapture onCapture={mockOnCapture} />)
      fireEvent.click(screen.getByRole('button', { name: '카메라 시작' }))

      await waitFor(() => {
        expect(screen.getByRole('button', { name: '사진 촬영' })).toBeInTheDocument()
      })

      fireEvent.click(screen.getByRole('button', { name: '사진 촬영' }))

      await waitFor(() => {
        expect(mockOnCapture).toHaveBeenCalledWith(expect.any(File))
      })
    })

    it('stops camera after capture', async () => {
      render(<CameraCapture onCapture={mockOnCapture} />)
      fireEvent.click(screen.getByRole('button', { name: '카메라 시작' }))

      await waitFor(() => {
        expect(screen.getByRole('button', { name: '사진 촬영' })).toBeInTheDocument()
      })

      fireEvent.click(screen.getByRole('button', { name: '사진 촬영' }))

      await waitFor(() => {
        expect(mockStop).toHaveBeenCalled()
      })
    })
  })

  describe('error handling', () => {
    it('shows error when permission is denied', async () => {
      const permissionError = new Error('Permission denied')
      permissionError.name = 'NotAllowedError'
      vi.mocked(navigator.mediaDevices.getUserMedia).mockRejectedValue(permissionError)

      render(<CameraCapture onCapture={mockOnCapture} onError={mockOnError} />)
      fireEvent.click(screen.getByRole('button', { name: '카메라 시작' }))

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent('카메라 권한이 거부되었습니다')
      })
    })

    it('calls onError when permission is denied', async () => {
      const permissionError = new Error('Permission denied')
      permissionError.name = 'NotAllowedError'
      vi.mocked(navigator.mediaDevices.getUserMedia).mockRejectedValue(permissionError)

      render(<CameraCapture onCapture={mockOnCapture} onError={mockOnError} />)
      fireEvent.click(screen.getByRole('button', { name: '카메라 시작' }))

      await waitFor(() => {
        expect(mockOnError).toHaveBeenCalledWith(
          expect.stringContaining('카메라 권한이 거부되었습니다')
        )
      })
    })

    it('shows retry button on error', async () => {
      vi.mocked(navigator.mediaDevices.getUserMedia).mockRejectedValue(new Error('Camera error'))

      render(<CameraCapture onCapture={mockOnCapture} />)
      fireEvent.click(screen.getByRole('button', { name: '카메라 시작' }))

      await waitFor(() => {
        expect(screen.getByRole('button', { name: '다시 시도' })).toBeInTheDocument()
      })
    })
  })

  describe('closing camera', () => {
    it('calls onClose when close button is clicked', async () => {
      render(<CameraCapture onCapture={mockOnCapture} onClose={mockOnClose} />)
      fireEvent.click(screen.getByRole('button', { name: '카메라 시작' }))

      await waitFor(() => {
        expect(screen.getByRole('button', { name: '카메라 닫기' })).toBeInTheDocument()
      })

      fireEvent.click(screen.getByRole('button', { name: '카메라 닫기' }))

      expect(mockOnClose).toHaveBeenCalled()
    })

    it('stops camera when close button is clicked', async () => {
      render(<CameraCapture onCapture={mockOnCapture} onClose={mockOnClose} />)
      fireEvent.click(screen.getByRole('button', { name: '카메라 시작' }))

      await waitFor(() => {
        expect(screen.getByRole('button', { name: '카메라 닫기' })).toBeInTheDocument()
      })

      fireEvent.click(screen.getByRole('button', { name: '카메라 닫기' }))

      expect(mockStop).toHaveBeenCalled()
    })
  })
})
