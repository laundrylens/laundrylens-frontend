import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Guide, { MATERIALS } from './Guide'

describe('Guide', () => {
  const renderGuide = () => {
    return render(
      <BrowserRouter>
        <Guide />
      </BrowserRouter>
    )
  }

  it('renders page title', () => {
    renderGuide()
    expect(screen.getByText('세탁 가이드')).toBeInTheDocument()
  })

  it('renders page description', () => {
    renderGuide()
    expect(screen.getByText(/소재별 올바른 세탁 방법을 알아보세요/)).toBeInTheDocument()
  })

  it('renders basic tips section', () => {
    renderGuide()
    expect(screen.getByText('세탁 기본 팁')).toBeInTheDocument()
    expect(screen.getByText(/항상 세탁 라벨을 먼저 확인하세요/)).toBeInTheDocument()
    expect(screen.getByText(/비슷한 색상끼리 분류하여 세탁하세요/)).toBeInTheDocument()
    expect(screen.getByText(/찬물 세탁은 색상 보호에 도움이 됩니다/)).toBeInTheDocument()
    expect(screen.getByText(/지퍼와 단추는 잠그고 세탁하세요/)).toBeInTheDocument()
  })

  it('renders materials section title', () => {
    renderGuide()
    expect(screen.getByText('소재별 가이드')).toBeInTheDocument()
  })

  it('renders all material cards', () => {
    renderGuide()
    MATERIALS.forEach((material) => {
      expect(screen.getByText(material.name)).toBeInTheDocument()
    })
  })

  it('renders material icons', () => {
    renderGuide()
    expect(screen.getByText('🧵')).toBeInTheDocument() // Cotton
    expect(screen.getByText('🔷')).toBeInTheDocument() // Polyester
    expect(screen.getByText('🐑')).toBeInTheDocument() // Wool
    expect(screen.getByText('✨')).toBeInTheDocument() // Silk
  })

  it('links to material detail pages', () => {
    renderGuide()
    const cottonLink = screen.getByText('면 (Cotton)').closest('a')
    expect(cottonLink).toHaveAttribute('href', '/guide/cotton')

    const woolLink = screen.getByText('울 (Wool)').closest('a')
    expect(woolLink).toHaveAttribute('href', '/guide/wool')
  })

  it('exports MATERIALS array with correct structure', () => {
    expect(MATERIALS).toBeDefined()
    expect(MATERIALS.length).toBe(8)
    MATERIALS.forEach((material) => {
      expect(material).toHaveProperty('code')
      expect(material).toHaveProperty('name')
      expect(material).toHaveProperty('description')
      expect(material).toHaveProperty('icon')
    })
  })
})
