'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, AlertCircle } from 'lucide-react'
import { analyzeInput, type HeuristicResult, type RiskLevel } from '@/lib/phishing-heuristics'
import { TagChip } from '@/components/ui/TagChip'
import { cn } from '@/lib/utils'

const RISK_COLORS: Record<RiskLevel, string> = {
  low: '#10B981',
  medium: '#F59E0B',
  high: '#F97316',
  critical: '#EF4444',
}

const RISK_LABELS: Record<RiskLevel, string> = {
  low: 'Low Risk',
  medium: 'Medium Risk',
  high: 'High Risk',
  critical: 'Critical',
}

function RiskGauge({ score, riskLevel }: { score: number; riskLevel: RiskLevel }) {
  const radius = 80
  const strokeWidth = 10
  const center = 110
  const viewBoxSize = center * 2

  // Arc spans 220 degrees (from 200deg to -20deg, going clockwise)
  const startAngleDeg = 200
  const totalAngleDeg = 220

  const toRad = (deg: number) => (deg * Math.PI) / 180

  const arcStart = {
    x: center + radius * Math.cos(toRad(startAngleDeg)),
    y: center + radius * Math.sin(toRad(startAngleDeg)),
  }
  const arcEnd = {
    x: center + radius * Math.cos(toRad(startAngleDeg - totalAngleDeg)),
    y: center + radius * Math.sin(toRad(startAngleDeg - totalAngleDeg)),
  }

  // Full arc path (background)
  const bgPath = `M ${arcStart.x} ${arcStart.y} A ${radius} ${radius} 0 1 1 ${arcEnd.x} ${arcEnd.y}`

  // Calculate the circumference of our arc segment
  const arcLength = (totalAngleDeg / 360) * 2 * Math.PI * radius
  const fillLength = (score / 100) * arcLength
  const color = RISK_COLORS[riskLevel]

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={220}
        height={220}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background arc */}
        <path
          d={bgPath}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
        {/* Filled arc */}
        <motion.path
          d={bgPath}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${arcLength} ${arcLength}`}
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset: arcLength - fillLength }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={score}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-grotesk font-bold text-4xl"
          style={{ color }}
        >
          {score}
        </motion.span>
        <span className="text-fg/50 text-xs mt-1 font-medium uppercase tracking-wider">
          {RISK_LABELS[riskLevel]}
        </span>
      </div>
    </div>
  )
}

export function RiskDemo() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<HeuristicResult | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAnalyze = () => {
    if (!input.trim()) return
    setResult(analyzeInput(input))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAnalyze()
  }

  const prefillSample = (sample: string) => {
    setInput(sample)
    setResult(null)
    inputRef.current?.focus()
  }

  const samples = [
    { label: 'High-risk URL', value: 'http://paypa1-secure.xyz/verify?account=suspended&click=now' },
    { label: 'Safe URL', value: 'https://google.com' },
    { label: 'Shortened URL', value: 'bit.ly/3xK9mP2' },
  ]

  return (
    <div className="space-y-8">
      {/* Input row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste a URL or email snippet..."
            className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-fg placeholder:text-fg/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all text-sm"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-fg/30" size={18} />
        </div>
        <button
          onClick={handleAnalyze}
          disabled={!input.trim()}
          className="px-6 py-3 bg-primary text-bg font-semibold rounded-xl text-sm hover:shadow-[0_0_20px_rgba(110,231,255,0.4)] transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
        >
          Analyze
        </button>
      </div>

      {/* Sample chips */}
      <div className="flex flex-wrap gap-2">
        <span className="text-fg/40 text-xs self-center">Try:</span>
        {samples.map((s) => (
          <button
            key={s.label}
            onClick={() => prefillSample(s.value)}
            className="px-3 py-1.5 rounded-full glass border border-white/10 text-xs text-fg/60 hover:text-primary hover:border-primary/30 transition-all"
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/5 border border-warning/20">
        <AlertCircle size={14} className="text-warning mt-0.5 shrink-0" />
        <p className="text-warning/80 text-xs">
          For demo only — no data is sent to a server. Analysis runs entirely in your browser.
        </p>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Gauge */}
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <RiskGauge score={result.score} riskLevel={result.riskLevel} />

              <div className="flex-1 space-y-3">
                <h3 className="font-grotesk font-bold text-xl text-fg">
                  Risk Analysis Complete
                </h3>
                <p className="text-fg/50 text-sm leading-relaxed">
                  {result.flags.length === 0
                    ? 'No suspicious indicators detected. This input appears to be low risk.'
                    : `Found ${result.flags.length} indicator${result.flags.length > 1 ? 's' : ''} of potential phishing. Review the flags below.`}
                </p>
                <div
                  className={cn(
                    'inline-flex px-4 py-2 rounded-full text-sm font-semibold',
                    result.riskLevel === 'low' && 'bg-success/10 text-success border border-success/30',
                    result.riskLevel === 'medium' && 'bg-warning/10 text-warning border border-warning/30',
                    result.riskLevel === 'high' && 'bg-orange-500/10 text-orange-400 border border-orange-500/30',
                    result.riskLevel === 'critical' && 'bg-danger/10 text-danger border border-danger/30',
                  )}
                >
                  {result.riskLevel === 'low' && '✓ '}
                  {result.riskLevel !== 'low' && '⚠ '}
                  {RISK_LABELS[result.riskLevel]}
                </div>
              </div>
            </div>

            {/* Flags */}
            {result.flags.length > 0 && (
              <div className="space-y-2">
                <p className="text-fg/40 text-xs uppercase tracking-wider">Detected Indicators</p>
                <div className="flex flex-wrap gap-2">
                  {result.flags.map((flag, i) => (
                    <motion.div
                      key={flag.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <TagChip severity={flag.severity}>{flag.label}</TagChip>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
