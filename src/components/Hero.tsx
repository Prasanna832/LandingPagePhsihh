'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Link2, AlertTriangle } from 'lucide-react'
import { CTAButton } from '@/components/ui/CTAButton'

const PARTICLE_COUNT = 20

interface Particle {
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 4,
    duration: Math.random() * 4 + 4,
  }))
}

const floatingArtifacts = [
  { Icon: Mail, x: '10%', y: '20%', delay: 0 },
  { Icon: Link2, x: '80%', y: '15%', delay: 0.8 },
  { Icon: AlertTriangle, x: '75%', y: '70%', delay: 1.6 },
  { Icon: Mail, x: '15%', y: '75%', delay: 2.4 },
  { Icon: Link2, x: '50%', y: '10%', delay: 1.2 },
]

export function Hero() {
  const particlesRef = useRef<Particle[]>(generateParticles())

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particlesRef.current.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/30"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Floating phishing artifacts */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingArtifacts.map(({ Icon, x, y, delay }, i) => (
          <motion.div
            key={i}
            className="absolute text-danger/30"
            style={{ left: x, top: y }}
            animate={{
              x: [0, 30, 60, 90],
              opacity: [0.4, 0.4, 0.2, 0],
              scale: [1, 0.9, 0.8, 0.6],
            }}
            transition={{
              duration: 4,
              delay: delay + 1,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeIn',
            }}
          >
            <Icon size={20} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16">
        {/* Left: Text */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              AI-Powered Phishing Defense
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-grotesk text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
          >
            Catch phishing{' '}
            <span className="text-gradient">before it</span>
            <br />
            catches you.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-fg/60 text-xl leading-relaxed max-w-lg"
          >
            Phish Guard AI scans emails, URLs, and attachments in real-time to stop
            threats before they spread across your organization.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <CTAButton href="/demo" variant="primary" className="text-base">
              Start Free Scan <ArrowRight size={16} />
            </CTAButton>
            <CTAButton href="#how-it-works" variant="ghost" className="text-base">
              See How It Works
            </CTAButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-6 pt-4"
          >
            {[
              { label: '99.7%', sub: 'Detection rate' },
              { label: '<50ms', sub: 'Scan latency' },
              { label: '10M+', sub: 'Threats blocked' },
            ].map(({ label, sub }) => (
              <div key={sub}>
                <div className="font-grotesk font-bold text-2xl text-primary">{label}</div>
                <div className="text-fg/40 text-xs">{sub}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Shield Visual */}
        <div className="relative flex items-center justify-center h-80 lg:h-[500px]">
          <motion.div
            animate={{ rotate: [0, 3, 0, -3, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            {/* Outer glow rings */}
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/20"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '280px', height: '280px', left: '-40px', top: '-40px' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/10"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.05, 0.3] }}
              transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '320px', height: '320px', left: '-60px', top: '-60px' }}
            />

            {/* Shield SVG */}
            <motion.svg
              width="200"
              height="240"
              viewBox="0 0 200 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <defs>
                <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.7" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Shield body */}
              <path
                d="M100 10 L180 45 L180 120 C180 170 140 210 100 230 C60 210 20 170 20 120 L20 45 Z"
                fill="url(#shieldGrad)"
                fillOpacity="0.15"
                stroke="url(#shieldGrad)"
                strokeWidth="2"
                filter="url(#glow)"
              />
              {/* Inner shield lines */}
              <path
                d="M100 30 L160 58 L160 118 C160 158 130 192 100 208 C70 192 40 158 40 118 L40 58 Z"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="1"
                strokeOpacity="0.4"
              />
              {/* Checkmark */}
              <path
                d="M72 118 L90 136 L128 100"
                stroke="var(--primary)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
              />
            </motion.svg>
          </motion.div>

          {/* Scan line animation */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[240px] h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
            animate={{ y: [-100, 100, -100] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{ top: '50%' }}
          />

          {/* Status chips floating around shield */}
          <motion.div
            className="absolute top-8 right-4 glass px-3 py-2 rounded-lg text-xs font-medium text-success"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            ✓ Threat blocked
          </motion.div>
          <motion.div
            className="absolute bottom-12 left-4 glass px-3 py-2 rounded-lg text-xs font-medium text-warning"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            ⚠ Scanning…
          </motion.div>
        </div>
      </div>
    </section>
  )
}
