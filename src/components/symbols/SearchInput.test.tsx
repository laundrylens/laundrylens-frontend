import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SearchInput from './SearchInput'

describe('SearchInput', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
  }

  it('renders search input', () => {
    render(<SearchInput {...defaultProps} />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('renders with placeholder', () => {
    render(<SearchInput {...defaultProps} />)
    expect(screen.getByPlaceholderText('기호 검색...')).toBeInTheDocument()
  })

  it('renders with custom placeholder', () => {
    render(<SearchInput {...defaultProps} placeholder="커스텀 검색" />)
    expect(screen.getByPlaceholderText('커스텀 검색')).toBeInTheDocument()
  })

  it('calls onChange when typing', () => {
    const onChange = vi.fn()
    render(<SearchInput {...defaultProps} onChange={onChange} />)

    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: '세탁' } })

    expect(onChange).toHaveBeenCalledWith('세탁')
  })

  it('shows clear button when value exists', () => {
    render(<SearchInput {...defaultProps} value="세탁" />)
    expect(screen.getByRole('button', { name: '검색어 지우기' })).toBeInTheDocument()
  })

  it('hides clear button when value is empty', () => {
    render(<SearchInput {...defaultProps} value="" />)
    expect(screen.queryByRole('button', { name: '검색어 지우기' })).not.toBeInTheDocument()
  })

  it('calls onChange with empty string when clear button clicked', () => {
    const onChange = vi.fn()
    render(<SearchInput {...defaultProps} value="세탁" onChange={onChange} />)

    fireEvent.click(screen.getByRole('button', { name: '검색어 지우기' }))
    expect(onChange).toHaveBeenCalledWith('')
  })

  it('has accessible label', () => {
    render(<SearchInput {...defaultProps} />)
    expect(screen.getByLabelText('기호 검색')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <SearchInput {...defaultProps} className="custom-class" />
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
