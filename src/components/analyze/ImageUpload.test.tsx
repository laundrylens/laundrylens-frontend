import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ImageUpload from './ImageUpload'

describe('ImageUpload', () => {
  const mockOnFileSelect = vi.fn()
  const mockOnError = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  const createFile = (name: string, type: string, size: number): File => {
    const file = new File(['x'.repeat(size)], name, { type })
    Object.defineProperty(file, 'size', { value: size })
    return file
  }

  describe('rendering', () => {
    it('renders upload area', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} />)
      expect(screen.getByRole('button', { name: '이미지 업로드' })).toBeInTheDocument()
    })

    it('renders title text', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} />)
      expect(screen.getByText('이미지를 업로드하세요')).toBeInTheDocument()
    })

    it('renders description text', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} />)
      expect(screen.getByText(/세탁 라벨 사진을 드래그하거나/)).toBeInTheDocument()
    })

    it('renders file type info', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} />)
      expect(screen.getByText(/JPG, PNG, WebP/)).toBeInTheDocument()
    })
  })

  describe('file selection via click', () => {
    it('opens file dialog on click', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} />)
      const uploadArea = screen.getByRole('button', { name: '이미지 업로드' })
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      const clickSpy = vi.spyOn(fileInput, 'click')
      fireEvent.click(uploadArea)

      expect(clickSpy).toHaveBeenCalled()
    })

    it('calls onFileSelect with valid file', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} onError={mockOnError} />)
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      const validFile = createFile('test.jpg', 'image/jpeg', 1024)
      fireEvent.change(fileInput, { target: { files: [validFile] } })

      expect(mockOnFileSelect).toHaveBeenCalledWith(validFile)
      expect(mockOnError).not.toHaveBeenCalled()
    })
  })

  describe('drag and drop', () => {
    it('updates UI on drag over', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} />)
      const uploadArea = screen.getByRole('button', { name: '이미지 업로드' })

      fireEvent.dragOver(uploadArea, { dataTransfer: { files: [] } })

      expect(screen.getByText('여기에 놓으세요')).toBeInTheDocument()
    })

    it('resets UI on drag leave', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} />)
      const uploadArea = screen.getByRole('button', { name: '이미지 업로드' })

      fireEvent.dragOver(uploadArea, { dataTransfer: { files: [] } })
      fireEvent.dragLeave(uploadArea, { dataTransfer: { files: [] } })

      expect(screen.getByText('이미지를 업로드하세요')).toBeInTheDocument()
    })

    it('calls onFileSelect on drop with valid file', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} onError={mockOnError} />)
      const uploadArea = screen.getByRole('button', { name: '이미지 업로드' })

      const validFile = createFile('test.png', 'image/png', 1024)
      fireEvent.drop(uploadArea, { dataTransfer: { files: [validFile] } })

      expect(mockOnFileSelect).toHaveBeenCalledWith(validFile)
    })
  })

  describe('file validation', () => {
    it('rejects invalid file type', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} onError={mockOnError} />)
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      const invalidFile = createFile('test.gif', 'image/gif', 1024)
      fireEvent.change(fileInput, { target: { files: [invalidFile] } })

      expect(mockOnError).toHaveBeenCalledWith('지원하지 않는 파일 형식입니다. (jpg, png, webp만 가능)')
      expect(mockOnFileSelect).not.toHaveBeenCalled()
    })

    it('rejects file exceeding size limit', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} onError={mockOnError} />)
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      const largeFile = createFile('large.jpg', 'image/jpeg', 6 * 1024 * 1024) // 6MB
      fireEvent.change(fileInput, { target: { files: [largeFile] } })

      expect(mockOnError).toHaveBeenCalledWith('파일 크기가 5MB를 초과합니다.')
      expect(mockOnFileSelect).not.toHaveBeenCalled()
    })

    it('accepts webp format', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} onError={mockOnError} />)
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      const webpFile = createFile('test.webp', 'image/webp', 1024)
      fireEvent.change(fileInput, { target: { files: [webpFile] } })

      expect(mockOnFileSelect).toHaveBeenCalledWith(webpFile)
      expect(mockOnError).not.toHaveBeenCalled()
    })
  })

  describe('disabled state', () => {
    it('does not open file dialog when disabled', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} disabled />)
      const uploadArea = screen.getByRole('button', { name: '이미지 업로드' })
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      const clickSpy = vi.spyOn(fileInput, 'click')
      fireEvent.click(uploadArea)

      expect(clickSpy).not.toHaveBeenCalled()
    })

    it('ignores drop when disabled', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} disabled />)
      const uploadArea = screen.getByRole('button', { name: '이미지 업로드' })

      const validFile = createFile('test.jpg', 'image/jpeg', 1024)
      fireEvent.drop(uploadArea, { dataTransfer: { files: [validFile] } })

      expect(mockOnFileSelect).not.toHaveBeenCalled()
    })

    it('has aria-disabled attribute', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} disabled />)
      expect(screen.getByRole('button', { name: '이미지 업로드' })).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('keyboard accessibility', () => {
    it('opens file dialog on Enter key', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} />)
      const uploadArea = screen.getByRole('button', { name: '이미지 업로드' })
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      const clickSpy = vi.spyOn(fileInput, 'click')
      fireEvent.keyDown(uploadArea, { key: 'Enter' })

      expect(clickSpy).toHaveBeenCalled()
    })

    it('opens file dialog on Space key', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} />)
      const uploadArea = screen.getByRole('button', { name: '이미지 업로드' })
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      const clickSpy = vi.spyOn(fileInput, 'click')
      fireEvent.keyDown(uploadArea, { key: ' ' })

      expect(clickSpy).toHaveBeenCalled()
    })
  })
})
