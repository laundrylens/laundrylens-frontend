import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import AnalyzingLoader from './AnalyzingLoader'

describe('AnalyzingLoader', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('rendering', () => {
    it('renders status container', () => {
      render(<AnalyzingLoader />)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('renders spinner animation', () => {
      render(<AnalyzingLoader />)
      const spinner = document.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
    })

    it('renders initial message', () => {
      render(<AnalyzingLoader />)
      expect(screen.getByText('이미지를 분석하는 중...')).toBeInTheDocument()
    })

    it('renders hint text', () => {
      render(<AnalyzingLoader />)
      expect(screen.getByText('잠시만 기다려주세요.')).toBeInTheDocument()
    })

    it('renders progress dots', () => {
      render(<AnalyzingLoader />)
      const dots = document.querySelectorAll('.rounded-full.w-2')
      expect(dots.length).toBe(4)
    })
  })

  describe('message rotation', () => {
    it('changes message after interval', () => {
      render(<AnalyzingLoader />)

      expect(screen.getByText('이미지를 분석하는 중...')).toBeInTheDocument()

      act(() => {
        vi.advanceTimersByTime(2000)
      })

      expect(screen.getByText('세탁 기호를 인식하는 중...')).toBeInTheDocument()
    })

    it('cycles through all messages', () => {
      render(<AnalyzingLoader />)

      // First message
      expect(screen.getByText('이미지를 분석하는 중...')).toBeInTheDocument()

      // Second message
      act(() => {
        vi.advanceTimersByTime(2000)
      })
      expect(screen.getByText('세탁 기호를 인식하는 중...')).toBeInTheDocument()

      // Third message
      act(() => {
        vi.advanceTimersByTime(2000)
      })
      expect(screen.getByText('기호 정보를 가져오는 중...')).toBeInTheDocument()

      // Fourth message
      act(() => {
        vi.advanceTimersByTime(2000)
      })
      expect(screen.getByText('분석 결과를 정리하는 중...')).toBeInTheDocument()
    })

    it('loops back to first message', () => {
      render(<AnalyzingLoader />)

      // Go through all messages
      act(() => {
        vi.advanceTimersByTime(8000) // 4 messages x 2 seconds
      })

      // Should be back to first message
      expect(screen.getByText('이미지를 분석하는 중...')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('has aria-live polite', () => {
      render(<AnalyzingLoader />)
      expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
    })

    it('hides spinner from screen readers', () => {
      render(<AnalyzingLoader />)
      const spinner = document.querySelector('.animate-spin')
      expect(spinner).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
