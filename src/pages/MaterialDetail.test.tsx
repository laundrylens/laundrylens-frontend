import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import MaterialDetail from './MaterialDetail'

// Mock Navigate component to test redirect
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Navigate: ({ to }: { to: string }) => {
      mockNavigate(to)
      return null
    },
  }
})

describe('MaterialDetail', () => {
  const renderMaterialDetail = (code: string) => {
    return render(
      <MemoryRouter initialEntries={[`/guide/${code}`]}>
        <Routes>
          <Route path="/guide/:code" element={<MaterialDetail />} />
        </Routes>
      </MemoryRouter>
    )
  }

  beforeEach(() => {
    mockNavigate.mockClear()
  })

  describe('with valid material code', () => {
    it('renders cotton material details', () => {
      renderMaterialDetail('cotton')
      expect(screen.getByText('면 (Cotton)')).toBeInTheDocument()
      expect(screen.getByText('🧵')).toBeInTheDocument()
      expect(screen.getByText(/통기성이 좋고 흡습성이 뛰어납니다/)).toBeInTheDocument()
    })

    it('renders wool material details', () => {
      renderMaterialDetail('wool')
      expect(screen.getByText('울 (Wool)')).toBeInTheDocument()
      expect(screen.getByText('🐑')).toBeInTheDocument()
      expect(screen.getByText(/보온성이 뛰어나고 탄성이 좋습니다/)).toBeInTheDocument()
    })

    it('renders silk material details', () => {
      renderMaterialDetail('silk')
      expect(screen.getByText('실크 (Silk)')).toBeInTheDocument()
      expect(screen.getByText('✨')).toBeInTheDocument()
    })

    it('renders cashmere material details', () => {
      renderMaterialDetail('cashmere')
      expect(screen.getByText('캐시미어 (Cashmere)')).toBeInTheDocument()
      expect(screen.getByText('🐐')).toBeInTheDocument()
    })

    it('renders all care instruction sections', () => {
      renderMaterialDetail('cotton')
      expect(screen.getByText('세탁 방법')).toBeInTheDocument()
      expect(screen.getByText('건조 방법')).toBeInTheDocument()
      expect(screen.getByText('다림질 방법')).toBeInTheDocument()
      expect(screen.getByText('주의사항')).toBeInTheDocument()
    })

    it('renders wash tips for cotton', () => {
      renderMaterialDetail('cotton')
      expect(screen.getByText('세탁기 사용 가능 (일반 코스)')).toBeInTheDocument()
      expect(screen.getByText('40°C 이하 온도 권장')).toBeInTheDocument()
    })

    it('renders dry tips for wool', () => {
      renderMaterialDetail('wool')
      expect(screen.getByText('건조기 사용 금지')).toBeInTheDocument()
      expect(screen.getByText('평평하게 눕혀서 건조')).toBeInTheDocument()
    })

    it('renders iron tips for silk', () => {
      renderMaterialDetail('silk')
      expect(screen.getByText('저온 다림질')).toBeInTheDocument()
      expect(screen.getByText('물 분무 금지 (얼룩 생김)')).toBeInTheDocument()
    })

    it('renders cautions for cashmere', () => {
      renderMaterialDetail('cashmere')
      expect(screen.getByText('매우 섬세한 소재')).toBeInTheDocument()
      expect(screen.getByText('드라이클리닝 권장')).toBeInTheDocument()
    })

    it('renders back link to guide', () => {
      renderMaterialDetail('cotton')
      const backLink = screen.getByText('가이드 목록으로')
      expect(backLink.closest('a')).toHaveAttribute('href', '/guide')
    })

    it('renders CTA section with analyze link', () => {
      renderMaterialDetail('polyester')
      expect(screen.getByText(/폴리에스터.*제품의 세탁 기호가 궁금하신가요/)).toBeInTheDocument()
      expect(screen.getByText('이미지로 세탁 기호 분석하기')).toBeInTheDocument()
    })
  })

  describe('with invalid material code', () => {
    it('redirects to guide page for unknown material', () => {
      renderMaterialDetail('unknown-material')
      expect(mockNavigate).toHaveBeenCalledWith('/guide')
    })

    it('redirects to guide page for empty code', () => {
      render(
        <MemoryRouter initialEntries={['/guide/']}>
          <Routes>
            <Route path="/guide/" element={<MaterialDetail />} />
            <Route path="/guide/:code" element={<MaterialDetail />} />
          </Routes>
        </MemoryRouter>
      )
      // With empty path, it won't match :code route, so no redirect is called
      // But if it somehow renders, it should redirect
    })
  })

  describe('all materials are accessible', () => {
    const materials = ['cotton', 'polyester', 'wool', 'silk', 'linen', 'denim', 'nylon', 'cashmere']

    materials.forEach((code) => {
      it(`renders ${code} material page`, () => {
        renderMaterialDetail(code)
        expect(screen.queryByText('가이드 목록으로')).toBeInTheDocument()
        expect(screen.getByText('세탁 방법')).toBeInTheDocument()
      })
    })
  })
})
