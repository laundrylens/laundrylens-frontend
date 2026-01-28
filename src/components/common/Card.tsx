import type { HTMLAttributes, ReactNode } from 'react'

type CardVariant = 'default' | 'elevated' | 'outlined'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  children: ReactNode
  hoverable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white shadow-card',
  elevated: 'bg-white shadow-elevated',
  outlined: 'bg-white border border-navy-200',
}

const paddingStyles: Record<string, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({
  variant = 'default',
  children,
  hoverable = false,
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  const baseStyles = 'rounded-card min-h-fit'
  const hoverStyles = hoverable
    ? 'hover:shadow-elevated transition-shadow duration-200 cursor-pointer'
    : ''

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
