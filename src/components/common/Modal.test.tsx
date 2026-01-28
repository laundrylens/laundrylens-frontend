import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Modal from './Modal'

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <div>Modal Content</div>,
  }

  it('renders modal content when open', () => {
    render(<Modal {...defaultProps} />)

    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<Modal {...defaultProps} isOpen={false} />)

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Modal {...defaultProps} title="Test Title" />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('calls onClose when ESC key is pressed', () => {
    const onClose = vi.fn()
    render(<Modal {...defaultProps} onClose={onClose} />)

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn()
    render(<Modal {...defaultProps} onClose={onClose} />)

    fireEvent.click(screen.getByTestId('modal-backdrop'))
    expect(onClose).toHaveBeenCalled()
  })

  it('does not call onClose when modal content is clicked', () => {
    const onClose = vi.fn()
    render(<Modal {...defaultProps} onClose={onClose} />)

    fireEvent.click(screen.getByText('Modal Content'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders close button when title is provided', () => {
    render(<Modal {...defaultProps} title="Test Title" />)

    expect(screen.getByRole('button', { name: '닫기' })).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<Modal {...defaultProps} onClose={onClose} title="Test Title" />)

    fireEvent.click(screen.getByRole('button', { name: '닫기' }))
    expect(onClose).toHaveBeenCalled()
  })

  it('has dialog role for accessibility', () => {
    render(<Modal {...defaultProps} />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Modal {...defaultProps} className="custom-class" />)

    const dialog = screen.getByRole('dialog')
    const modalContent = dialog.querySelector('.custom-class')
    expect(modalContent).toBeInTheDocument()
  })
})
