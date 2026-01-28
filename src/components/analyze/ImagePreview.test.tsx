import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ImagePreview from './ImagePreview'

describe('ImagePreview', () => {
  const mockOnReset = vi.fn()
  const mockOnAnalyze = vi.fn()
  const mockFile = new File(['test content'], 'test-image.jpg', {
    type: 'image/jpeg',
  })
  const mockUrl = 'blob:http://localhost/test-image'

  beforeEach(() => {
    vi.clearAllMocks()

    // Mock URL.createObjectURL and URL.revokeObjectURL
    global.URL.createObjectURL = vi.fn().mockReturnValue(mockUrl)
    global.URL.revokeObjectURL = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('rendering', () => {
    it('renders image preview', () => {
      render(
        <ImagePreview file={mockFile} onReset={mockOnReset} onAnalyze={mockOnAnalyze} />
      )
      const image = screen.getByAltText('업로드된 이미지 미리보기')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', mockUrl)
    })

    it('renders file name', () => {
      render(
        <ImagePreview file={mockFile} onReset={mockOnReset} onAnalyze={mockOnAnalyze} />
      )
      expect(screen.getByText('test-image.jpg')).toBeInTheDocument()
    })

    it('renders file size', () => {
      render(
        <ImagePreview file={mockFile} onReset={mockOnReset} onAnalyze={mockOnAnalyze} />
      )
      // 'test content' is 12 bytes
      expect(screen.getByText('12 B')).toBeInTheDocument()
    })

    it('renders reset button', () => {
      render(
        <ImagePreview file={mockFile} onReset={mockOnReset} onAnalyze={mockOnAnalyze} />
      )
      expect(screen.getByRole('button', { name: '다시 선택' })).toBeInTheDocument()
    })

    it('renders analyze button', () => {
      render(
        <ImagePreview file={mockFile} onReset={mockOnReset} onAnalyze={mockOnAnalyze} />
      )
      expect(screen.getByRole('button', { name: '분석 시작' })).toBeInTheDocument()
    })
  })

  describe('file size formatting', () => {
    it('formats bytes correctly', () => {
      const smallFile = new File(['x'], 'small.jpg', { type: 'image/jpeg' })
      Object.defineProperty(smallFile, 'size', { value: 500 })

      render(
        <ImagePreview file={smallFile} onReset={mockOnReset} onAnalyze={mockOnAnalyze} />
      )
      expect(screen.getByText('500 B')).toBeInTheDocument()
    })

    it('formats KB correctly', () => {
      const kbFile = new File(['x'], 'medium.jpg', { type: 'image/jpeg' })
      Object.defineProperty(kbFile, 'size', { value: 2048 })

      render(
        <ImagePreview file={kbFile} onReset={mockOnReset} onAnalyze={mockOnAnalyze} />
      )
      expect(screen.getByText('2.0 KB')).toBeInTheDocument()
    })

    it('formats MB correctly', () => {
      const mbFile = new File(['x'], 'large.jpg', { type: 'image/jpeg' })
      Object.defineProperty(mbFile, 'size', { value: 2 * 1024 * 1024 })

      render(
        <ImagePreview file={mbFile} onReset={mockOnReset} onAnalyze={mockOnAnalyze} />
      )
      expect(screen.getByText('2.0 MB')).toBeInTheDocument()
    })
  })

  describe('button interactions', () => {
    it('calls onReset when reset button is clicked', () => {
      render(
        <ImagePreview file={mockFile} onReset={mockOnReset} onAnalyze={mockOnAnalyze} />
      )
      fireEvent.click(screen.getByRole('button', { name: '다시 선택' }))
      expect(mockOnReset).toHaveBeenCalledTimes(1)
    })

    it('calls onAnalyze when analyze button is clicked', () => {
      render(
        <ImagePreview file={mockFile} onReset={mockOnReset} onAnalyze={mockOnAnalyze} />
      )
      fireEvent.click(screen.getByRole('button', { name: '분석 시작' }))
      expect(mockOnAnalyze).toHaveBeenCalledTimes(1)
    })
  })

  describe('analyzing state', () => {
    it('disables buttons when analyzing', () => {
      render(
        <ImagePreview
          file={mockFile}
          onReset={mockOnReset}
          onAnalyze={mockOnAnalyze}
          isAnalyzing
        />
      )
      expect(screen.getByRole('button', { name: '다시 선택' })).toBeDisabled()
      expect(screen.getByRole('button', { name: '분석 중...' })).toBeDisabled()
    })

    it('shows analyzing text when analyzing', () => {
      render(
        <ImagePreview
          file={mockFile}
          onReset={mockOnReset}
          onAnalyze={mockOnAnalyze}
          isAnalyzing
        />
      )
      expect(screen.getByRole('button', { name: '분석 중...' })).toBeInTheDocument()
    })
  })

  describe('URL management', () => {
    it('creates object URL on mount', () => {
      render(
        <ImagePreview file={mockFile} onReset={mockOnReset} onAnalyze={mockOnAnalyze} />
      )
      expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile)
    })

    it('revokes object URL on unmount', () => {
      const { unmount } = render(
        <ImagePreview file={mockFile} onReset={mockOnReset} onAnalyze={mockOnAnalyze} />
      )
      unmount()
      expect(URL.revokeObjectURL).toHaveBeenCalledWith(mockUrl)
    })
  })
})
