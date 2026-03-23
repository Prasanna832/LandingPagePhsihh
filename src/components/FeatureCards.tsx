'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Zap,
  Brain,
  Link2,
  Globe,
  ShieldCheck,
  LayoutDashboard,
  type LucideIcon,
} from 'lucide-react'
import { FEATURES } from '@/lib/content'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  Brain,
  Link2,
  Globe,
  ShieldCheck,
  LayoutDashboard,
}

export function FeatureCards() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
            Capabilities
          </p>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-fg">
            Everything you need to{' '}
            <span className="text-gradient">stay protected</span>
          </h2>
          <p className="text-fg/50 mt-4 max-w-xl mx-auto">
            A comprehensive suite of detection tools working in concert — so nothing slips through.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] ?? ShieldCheck
            return (
              <FeatureCard
                key={feature.id}
                icon={Icon}
                title={feature.title}
                description={feature.description}
                index={i}
                isInView={isInView}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  index: number
  isInView: boolean
}

function FeatureCard({ icon: Icon, title, description, index, isInView }: FeatureCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 12
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 12
    setTilt({ x, y })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        boxShadow: '0 0 30px rgba(110, 231, 255, 0.12)',
      }}
      className={cn(
        'glass rounded-2xl p-6 cursor-default group transition-all duration-300',
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
        <Icon size={22} className="text-primary" strokeWidth={1.5} />
      </div>
      <h3 className="font-grotesk font-bold text-lg text-fg mb-2">{title}</h3>
      <p className="text-fg/50 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}
