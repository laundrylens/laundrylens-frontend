import type { AnalysisResult } from '../types'
import { mockSymbols } from '../mocks/symbols'
import { env } from '../config'

interface AnalyzeResponse {
  success: boolean
  result: AnalysisResult
}

interface AnalyzeError {
  success: false
  error: string
}

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Generate random subset of symbols for mock response
function getRandomSymbols(count: number) {
  const shuffled = [...mockSymbols].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const analyzeApi = {
  /**
   * Analyze an image for laundry care symbols
   * @param file - The image file to analyze
   * @returns Analysis result with detected symbols
   */
  async analyzeImage(file: File): Promise<AnalyzeResponse> {
    // TODO: Replace with actual API call
    // const formData = new FormData()
    // formData.append('image', file)
    // const response = await fetch(`${env.apiBaseUrl}/analyze`, {
    //   method: 'POST',
    //   body: formData,
    // })
    // return response.json()

    if (env.isDev) {
      console.log('[analyzeApi] analyzeImage', {
        name: file.name,
        size: file.size,
        type: file.type,
      })
    }

    // Simulate network delay (2-4 seconds for analysis, skip in test)
    if (!env.isTest) {
      await delay(2000 + Math.random() * 2000)
    }

    // Create a temporary URL for the uploaded image
    const imageUrl = URL.createObjectURL(file)

    // Mock: return random 3-6 symbols
    const symbolCount = 3 + Math.floor(Math.random() * 4)
    const detectedSymbols = getRandomSymbols(symbolCount)

    const result: AnalysisResult = {
      id: `analysis-${Date.now()}`,
      imageUrl,
      symbols: detectedSymbols,
      analyzedAt: new Date().toISOString(),
    }

    return {
      success: true,
      result,
    }
  },

  /**
   * Simulate an analysis error for testing
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async analyzeImageWithError(_file: File): Promise<AnalyzeError> {
    if (env.isDev) {
      console.log('[analyzeApi] analyzeImageWithError - simulating error')
    }

    if (!env.isTest) {
      await delay(1000)
    }

    return {
      success: false,
      error: '이미지 분석에 실패했습니다. 다시 시도해주세요.',
    }
  },
}
