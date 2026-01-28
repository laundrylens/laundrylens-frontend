import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Analyze, { AnalyzeLayout, UploadPlaceholder, ResultPlaceholder } from './Analyze'

describe('Analyze Page', () => {
  describe('default rendering', () => {
    it('renders page title', () => {
      render(<Analyze />)
      expect(screen.getByRole('heading', { name: '이미지 분석' })).toBeInTheDocument()
    })

    it('renders page description', () => {
      render(<Analyze />)
      expect(screen.getByText(/세탁 라벨 이미지를 업로드하여/)).toBeInTheDocument()
    })

    it('renders upload section', () => {
      render(<Analyze />)
      expect(screen.getByRole('region', { name: '이미지 업로드' })).toBeInTheDocument()
    })

    it('renders result section', () => {
      render(<Analyze />)
      expect(screen.getByRole('region', { name: '분석 결과' })).toBeInTheDocument()
    })
  })

  describe('UploadPlaceholder', () => {
    it('renders upload placeholder title', () => {
      render(<UploadPlaceholder />)
      expect(screen.getByText('이미지를 업로드하세요')).toBeInTheDocument()
    })

    it('renders upload placeholder description', () => {
      render(<UploadPlaceholder />)
      expect(screen.getByText(/세탁 라벨 사진을 드래그하거나/)).toBeInTheDocument()
    })
  })

  describe('ResultPlaceholder', () => {
    it('renders result placeholder title', () => {
      render(<ResultPlaceholder />)
      expect(screen.getByText('분석 결과가 여기에 표시됩니다')).toBeInTheDocument()
    })

    it('renders result placeholder description', () => {
      render(<ResultPlaceholder />)
      expect(screen.getByText(/이미지를 업로드하면 AI가/)).toBeInTheDocument()
    })
  })

  describe('AnalyzeLayout with custom sections', () => {
    it('renders custom uploadSection', () => {
      render(
        <AnalyzeLayout uploadSection={<div data-testid="custom-upload">Custom Upload</div>} />
      )
      expect(screen.getByTestId('custom-upload')).toBeInTheDocument()
      expect(screen.queryByText('이미지를 업로드하세요')).not.toBeInTheDocument()
    })

    it('renders custom resultSection', () => {
      render(
        <AnalyzeLayout resultSection={<div data-testid="custom-result">Custom Result</div>} />
      )
      expect(screen.getByTestId('custom-result')).toBeInTheDocument()
      expect(screen.queryByText('분석 결과가 여기에 표시됩니다')).not.toBeInTheDocument()
    })

    it('renders both custom sections', () => {
      render(
        <AnalyzeLayout
          uploadSection={<div data-testid="custom-upload">Custom Upload</div>}
          resultSection={<div data-testid="custom-result">Custom Result</div>}
        />
      )
      expect(screen.getByTestId('custom-upload')).toBeInTheDocument()
      expect(screen.getByTestId('custom-result')).toBeInTheDocument()
    })
  })
})
