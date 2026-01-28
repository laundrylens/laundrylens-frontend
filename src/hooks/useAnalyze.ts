import { useMutation, useQueryClient } from '@tanstack/react-query'
import { analyzeApi } from '../api'
import type { AnalysisResult } from '../types'

interface UseAnalyzeOptions {
  onSuccess?: (result: AnalysisResult) => void
  onError?: (error: Error) => void
}

export function useAnalyze(options: UseAnalyzeOptions = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (file: File) => {
      const response = await analyzeApi.analyzeImage(file)
      if (!response.success) {
        throw new Error('분석에 실패했습니다.')
      }
      return response.result
    },
    onSuccess: (result) => {
      // Invalidate any related queries if needed
      queryClient.invalidateQueries({ queryKey: ['analysisHistory'] })
      options.onSuccess?.(result)
    },
    onError: (error: Error) => {
      options.onError?.(error)
    },
  })
}
