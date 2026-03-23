'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  fullWidth?: boolean
}

export function Section({ children, className, id, fullWidth = false }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id={id} ref={ref} className={cn('py-16 md:py-24', className)}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={
          fullWidth
            ? 'w-full'
            : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
        }
      >
        {children}
      </motion.div>
    </section>
  )
}
