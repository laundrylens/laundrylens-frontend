import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { compressImage } from './compressImage'

describe('compressImage', () => {
  let mockImageWidth = 800
  let mockImageHeight = 600

  const mockContext = {
    drawImage: vi.fn(),
  }

  let mockCanvas: {
    width: number
    height: number
    getContext: ReturnType<typeof vi.fn>
    toBlob: ReturnType<typeof vi.fn>
  }

  const originalCreateElement = document.createElement.bind(document)

  beforeEach(() => {
    vi.clearAllMocks()

    // Reset mock values
    mockImageWidth = 800
    mockImageHeight = 600

    // Reset mock canvas
    mockCanvas = {
      width: 0,
      height: 0,
      getContext: vi.fn().mockReturnValue(mockContext),
      toBlob: vi.fn().mockImplementation((callback: BlobCallback) => {
        callback(new Blob(['test'], { type: 'image/jpeg' }))
      }),
    }

    // Mock Image
    vi.spyOn(window, 'Image').mockImplementation(() => {
      const img = {
        width: mockImageWidth,
        height: mockImageHeight,
        onload: null as (() => void) | null,
        onerror: null as (() => void) | null,
        src: '',
      }
      setTimeout(() => {
        if (img.onload) img.onload()
      }, 0)
      return img as unknown as HTMLImageElement
    })

    // Mock canvas
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'canvas') {
        return mockCanvas as unknown as HTMLCanvasElement
      }
      return originalCreateElement(tag)
    })

    // Mock URL methods
    global.URL.createObjectURL = vi.fn().mockReturnValue('blob:test')
    global.URL.revokeObjectURL = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('validation', () => {
    it('throws error for non-image files', async () => {
      const textFile = new File(['test'], 'test.txt', { type: 'text/plain' })
      await expect(compressImage(textFile)).rejects.toThrow('Invalid file type')
    })
  })

  describe('small images', () => {
    it('returns original JPEG file if under max dimensions', async () => {
      mockImageWidth = 800
      mockImageHeight = 600

      const jpegFile = new File(['test'], 'small.jpg', { type: 'image/jpeg' })

      const result = await compressImage(jpegFile)

      expect(result).toBe(jpegFile)
    })

    it('compresses PNG files even if under max dimensions', async () => {
      mockImageWidth = 800
      mockImageHeight = 600

      const pngFile = new File(['test'], 'small.png', { type: 'image/png' })

      const result = await compressImage(pngFile)

      expect(result).not.toBe(pngFile)
      expect(result.type).toBe('image/jpeg')
      expect(result.name).toBe('small.jpg')
    })
  })

  describe('large images', () => {
    it('resizes images wider than maxWidth', async () => {
      mockImageWidth = 3000
      mockImageHeight = 2000

      const file = new File(['test'], 'large.jpg', { type: 'image/jpeg' })
      await compressImage(file, { maxWidth: 1920 })

      expect(mockCanvas.width).toBe(1920)
      expect(mockCanvas.height).toBe(1280) // 2000 * (1920/3000) = 1280
    })

    it('resizes images taller than maxHeight', async () => {
      mockImageWidth = 1000
      mockImageHeight = 3000

      const file = new File(['test'], 'tall.jpg', { type: 'image/jpeg' })
      await compressImage(file, { maxHeight: 1920 })

      expect(mockCanvas.height).toBe(1920)
      expect(mockCanvas.width).toBe(640) // 1000 * (1920/3000) = 640
    })

    it('respects both maxWidth and maxHeight', async () => {
      mockImageWidth = 4000
      mockImageHeight = 3000

      const file = new File(['test'], 'large.jpg', { type: 'image/jpeg' })
      await compressImage(file, { maxWidth: 1920, maxHeight: 1080 })

      // First scales to width 1920 -> height 1440
      // Then scales to height 1080 -> width 1440
      expect(mockCanvas.width).toBe(1440)
      expect(mockCanvas.height).toBe(1080)
    })
  })

  describe('quality option', () => {
    it('uses custom quality option', async () => {
      mockImageWidth = 2000
      mockImageHeight = 1000

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
      await compressImage(file, { quality: 0.5 })

      expect(mockCanvas.toBlob).toHaveBeenCalledWith(
        expect.any(Function),
        'image/jpeg',
        0.5
      )
    })

    it('uses default quality of 0.8', async () => {
      mockImageWidth = 2000
      mockImageHeight = 1000

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
      await compressImage(file)

      expect(mockCanvas.toBlob).toHaveBeenCalledWith(
        expect.any(Function),
        'image/jpeg',
        0.8
      )
    })
  })

  describe('output', () => {
    it('returns a File object', async () => {
      mockImageWidth = 2000
      mockImageHeight = 1000

      const file = new File(['test'], 'test.png', { type: 'image/png' })
      const result = await compressImage(file)

      expect(result).toBeInstanceOf(File)
    })

    it('converts filename to .jpg extension', async () => {
      mockImageWidth = 2000
      mockImageHeight = 1000

      const file = new File(['test'], 'image.png', { type: 'image/png' })
      const result = await compressImage(file)

      expect(result.name).toBe('image.jpg')
    })
  })
})
