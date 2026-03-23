'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Upload, Brain, Bell } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Ingest',
    description:
      'Forward emails or connect via API. We accept raw MIME, EML, and JSON payloads from any mail server or security stack.',
    color: 'text-primary',
    bg: 'bg-primary/10 border-primary/20',
  },
  {
    number: '02',
    icon: Brain,
    title: 'Analyze',
    description:
      'Our AI engine runs 200+ heuristics and ML models against every indicator of compromise — headers, links, attachments, and sender reputation.',
    color: 'text-accent',
    bg: 'bg-accent/10 border-accent/20',
    hasScan: true,
  },
  {
    number: '03',
    icon: Bell,
    title: 'Act',
    description:
      'Receive instant verdicts via webhook, dashboard, or email. Quarantine, alert, or log with a single configuration.',
    color: 'text-success',
    bg: 'bg-success/10 border-success/20',
  },
]

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-fg">
            Three steps to total{' '}
            <span className="text-gradient">phishing protection</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-primary/30 via-accent/30 to-success/30" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface StepCardProps {
  step: (typeof steps)[0]
  index: number
  isInView: boolean
}

function StepCard({ step, index, isInView }: StepCardProps) {
  const { number, icon: Icon, title, description, color, bg, hasScan } = step

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="glass rounded-2xl p-8 relative group cursor-default"
    >
      {/* Number badge */}
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${bg} border text-sm font-bold font-grotesk ${color} mb-6`}>
        {number}
      </div>

      {/* Icon with optional scan ring */}
      <div className="relative w-16 h-16 mb-6">
        {hasScan && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent/40"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <div className={`w-16 h-16 rounded-full ${bg} border flex items-center justify-center`}>
          <Icon size={28} className={color} strokeWidth={1.5} />
        </div>
      </div>

      <h3 className="font-grotesk text-xl font-bold text-fg mb-3">{title}</h3>
      <p className="text-fg/55 leading-relaxed text-sm">{description}</p>

      {/* Bottom accent line on hover */}
      <div className={`absolute bottom-0 left-8 right-8 h-px ${color.replace('text-', 'bg-')} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    </motion.div>
  )
}
