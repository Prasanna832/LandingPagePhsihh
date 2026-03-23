'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { SECURITY_BADGES } from '@/lib/content'

export function SecurityBadges() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-16" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-fg/40 text-sm mb-8 uppercase tracking-widest"
        >
          Enterprise-grade security you can trust
        </motion.p>
        <div className="flex flex-wrap justify-center gap-4">
          {SECURITY_BADGES.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-2 px-5 py-3 glass rounded-xl border border-primary/15 hover:border-primary/30 transition-colors"
            >
              <ShieldCheck size={16} className="text-primary shrink-0" strokeWidth={1.5} />
              <span className="text-fg/70 text-sm font-medium whitespace-nowrap">{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
