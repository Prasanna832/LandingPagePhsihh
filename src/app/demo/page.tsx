import type { Metadata } from 'next'
import { RiskDemo } from '@/components/RiskDemo'
import { AlertCircle, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Try Phish Guard AI Demo',
  description:
    'Try our live phishing risk analyzer. Paste any URL or email snippet and get an instant risk score with detailed threat indicators.',
}

export default function DemoPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
            Live Analyzer
          </p>
          <h1 className="font-grotesk text-4xl md:text-5xl font-bold text-fg mb-4">
            Try our live{' '}
            <span className="text-gradient">risk analyzer</span>
          </h1>
          <p className="text-fg/55 text-lg">
            Paste any URL or email snippet below. Our heuristic engine runs entirely in your browser
            — nothing is sent to a server.
          </p>
        </div>

        {/* Demo widget */}
        <div className="glass rounded-2xl p-8 mb-8">
          <RiskDemo />
        </div>

        {/* How to use */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={16} className="text-primary" />
            <h2 className="font-grotesk font-semibold text-fg">How to use</h2>
          </div>
          <ol className="space-y-3">
            {[
              'Paste a full URL, shortened link, or copy-paste a suspicious email snippet into the input field.',
              'Click "Analyze" or press Enter to run the heuristic engine.',
              'Review the risk score (0–100) and the detected indicator flags.',
              'Use the sample chips above the input to quickly test known-good and known-bad examples.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-fg/60">
                <span className="w-5 h-5 rounded-full bg-primary/15 border border-primary/30 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/5 border border-warning/20">
          <AlertCircle size={16} className="text-warning mt-0.5 shrink-0" />
          <div>
            <p className="text-warning text-sm font-medium mb-1">Demo Disclaimer</p>
            <p className="text-fg/50 text-sm leading-relaxed">
              This demo uses client-side heuristic analysis only and is meant for educational
              purposes. It does not represent the full capabilities of the Phish Guard AI platform,
              which uses multi-model ML inference, real-time threat feeds, and sandbox detonation.
              No input data is transmitted or stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
