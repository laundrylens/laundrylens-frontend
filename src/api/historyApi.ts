export interface AnalysisHistoryItem {
  id: string
  imageUrl: string
  analyzedAt: string
  symbolCount: number
  summary: string
}

export interface AnalysisHistoryResponse {
  items: AnalysisHistoryItem[]
  totalCount: number
  page: number
  pageSize: number
  hasMore: boolean
}

// Mock data for development
const MOCK_HISTORY: AnalysisHistoryItem[] = [
  {
    id: 'analysis-001',
    imageUrl: 'https://via.placeholder.com/200x200?text=Shirt',
    analyzedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
    symbolCount: 5,
    summary: '물세탁 가능, 표백 금지, 건조기 사용 가능',
  },
  {
    id: 'analysis-002',
    imageUrl: 'https://via.placeholder.com/200x200?text=Jacket',
    analyzedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    symbolCount: 4,
    summary: '손세탁 권장, 건조기 사용 금지, 드라이클리닝 가능',
  },
  {
    id: 'analysis-003',
    imageUrl: 'https://via.placeholder.com/200x200?text=Sweater',
    analyzedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    symbolCount: 6,
    summary: '울 전용 세제 사용, 평평하게 건조, 다림질 금지',
  },
  {
    id: 'analysis-004',
    imageUrl: 'https://via.placeholder.com/200x200?text=Pants',
    analyzedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    symbolCount: 4,
    summary: '세탁기 사용 가능, 저온 건조, 중온 다림질',
  },
  {
    id: 'analysis-005',
    imageUrl: 'https://via.placeholder.com/200x200?text=Dress',
    analyzedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1 week ago
    symbolCount: 5,
    summary: '드라이클리닝 전용, 물세탁 금지, 저온 다림질',
  },
]

export const historyApi = {
  async getHistory(page: number = 1, pageSize: number = 10): Promise<AnalysisHistoryResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const items = MOCK_HISTORY.slice(startIndex, endIndex)

    return {
      items,
      totalCount: MOCK_HISTORY.length,
      page,
      pageSize,
      hasMore: endIndex < MOCK_HISTORY.length,
    }
  },

  async deleteHistory(id: string): Promise<{ success: boolean }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    console.log('[historyApi] deleteHistory', id)
    return { success: true }
  },
}
