import { describe, it, expect, vi, beforeEach } from 'vitest'
import { analyzeApi } from './analyzeApi'

// Mock URL.createObjectURL
const mockObjectUrl = 'blob:http://localhost:3000/mock-image-url'
vi.stubGlobal('URL', {
  ...URL,
  createObjectURL: vi.fn(() => mockObjectUrl),
})

describe('analyzeApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('analyzeImage', () => {
    it('returns successful analysis result', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

      const response = await analyzeApi.analyzeImage(mockFile)

      expect(response.success).toBe(true)
      expect(response.result).toBeDefined()
      expect(response.result.id).toMatch(/^analysis-/)
      expect(response.result.imageUrl).toBe(mockObjectUrl)
      expect(response.result.symbols).toBeDefined()
      expect(response.result.symbols.length).toBeGreaterThanOrEqual(3)
      expect(response.result.symbols.length).toBeLessThanOrEqual(6)
      expect(response.result.analyzedAt).toBeDefined()
    })

    it('creates object URL for uploaded image', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

      await analyzeApi.analyzeImage(mockFile)

      expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile)
    })

    it('returns symbols with required properties', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

      const response = await analyzeApi.analyzeImage(mockFile)

      response.result.symbols.forEach((symbol) => {
        expect(symbol).toHaveProperty('id')
        expect(symbol).toHaveProperty('code')
        expect(symbol).toHaveProperty('name')
        expect(symbol).toHaveProperty('description')
        expect(symbol).toHaveProperty('category')
        expect(symbol).toHaveProperty('imageUrl')
        expect(symbol).toHaveProperty('country')
      })
    })

    it('returns analysis ID starting with analysis prefix', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

      const response = await analyzeApi.analyzeImage(mockFile)

      expect(response.result.id).toMatch(/^analysis-\d+$/)
    })

    it('returns valid ISO timestamp for analyzedAt', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

      const response = await analyzeApi.analyzeImage(mockFile)

      const parsedDate = new Date(response.result.analyzedAt)
      expect(parsedDate.toISOString()).toBe(response.result.analyzedAt)
    })
  })

  describe('analyzeImageWithError', () => {
    it('returns error response', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

      const response = await analyzeApi.analyzeImageWithError(mockFile)

      expect(response.success).toBe(false)
      expect(response.error).toBe('이미지 분석에 실패했습니다. 다시 시도해주세요.')
    })
  })
})
