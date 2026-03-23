'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'link'

interface CTAButtonProps {
  variant?: Variant
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-primary text-bg font-semibold px-6 py-3 rounded-lg hover:shadow-[0_0_24px_rgba(110,231,255,0.6)] transition-all duration-300',
  ghost:
    'border border-primary/50 text-primary font-semibold px-6 py-3 rounded-lg hover:bg-primary/10 transition-all duration-300',
  link: 'text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-200',
}

export function CTAButton({
  variant = 'primary',
  href,
  onClick,
  children,
  className,
  disabled,
  type = 'button',
}: CTAButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
    variant !== 'link' && 'cursor-pointer select-none',
    disabled && 'opacity-50 cursor-not-allowed',
    variantStyles[variant],
    className,
  )

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.03 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  )
}
