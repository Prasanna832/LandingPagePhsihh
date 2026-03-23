import type { Metadata } from 'next'
import { FEATURES, INTEGRATIONS } from '@/lib/content'
import { CTAButton } from '@/components/ui/CTAButton'
import { Section } from '@/components/ui/Section'
import { ShieldCheck, Zap, Brain, Link2, Globe, LayoutDashboard, Check, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Product - The Most Comprehensive Phishing Defense Platform',
  description:
    'Explore Phish Guard AI features: real-time scanning, AI threat detection, link analysis, domain spoofing detection, and team dashboards.',
}

const ICON_MAP: Record<string, LucideIcon> = {
  Zap, Brain, Link2, Globe, ShieldCheck, LayoutDashboard,
}

const FEATURE_DETAILS: Record<string, string> = {
  'real-time-scanning':
    'Our distributed scanning infrastructure processes up to 10,000 requests per second with a median latency of 42ms. Every email, URL, and attachment is inspected against a live threat feed updated every 60 seconds.',
  'ai-threat-detection':
    'We train on 12M+ labeled phishing samples updated weekly. Our ensemble models combine gradient boosting, transformer-based NLP for body analysis, and graph neural networks for link topology — achieving 99.7% precision on held-out evaluation sets.',
  'link-attachment-analysis':
    'URLs are resolved through our sandboxed headless browser cluster. PDFs, Office files, and executables are detonated in isolated VMs with behavioral monitoring. Payloads never touch your infrastructure.',
  'domain-spoofing-detection':
    'We apply Unicode normalization (NFC/NFD), IDN homograph detection, visual skeleton comparison, and domain age signals from WHOIS. Our similarity engine can catch misspellings within an edit distance of 3 from 5,000 protected brand domains.',
  'zero-day-protection':
    'When signature lookups fail, behavioral heuristics take over. We analyze redirect chains, JavaScript execution patterns, form submissions, and credential harvesting behaviors to catch attacks with no prior signature.',
  'team-dashboard':
    'Role-based access control lets you segment visibility by team, department, or geography. Audit logs capture every action. Threat feeds are exportable as STIX/TAXII for SIEM ingestion. Live stats update every 30 seconds.',
}

const TECH_SPECS = [
  { label: 'API Rate Limit (Free)', value: '60 req/min' },
  { label: 'API Rate Limit (Pro)', value: '600 req/min' },
  { label: 'API Rate Limit (Enterprise)', value: 'Custom SLA' },
  { label: 'Median Response Time', value: '< 50ms' },
  { label: 'P99 Response Time', value: '< 200ms' },
  { label: 'Uptime SLA (Enterprise)', value: '99.99%' },
  { label: 'Max Payload Size', value: '25 MB' },
  { label: 'Supported Formats', value: 'EML, MIME, JSON, URL' },
]

export default function ProductPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 gradient-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-4">Platform</p>
          <h1 className="font-grotesk text-5xl md:text-6xl font-bold text-fg mb-6 leading-tight">
            The most comprehensive{' '}
            <span className="text-gradient">phishing defense</span>
            <br />
            platform
          </h1>
          <p className="text-fg/55 text-xl max-w-2xl mx-auto mb-10">
            From email gateway to browser extension to API — Phish Guard AI protects every attack
            surface your team touches.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton href="/demo" variant="primary" className="text-base">
              Try the Demo <ArrowRight size={16} />
            </CTAButton>
            <CTAButton href="/pricing" variant="ghost" className="text-base">
              View Pricing
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Feature Deep Dives */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="font-grotesk text-4xl font-bold text-fg">
            Capabilities in depth
          </h2>
        </div>
        <div className="space-y-16">
          {FEATURES.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] ?? ShieldCheck
            const detail = FEATURE_DETAILS[feature.id] ?? feature.description
            const isEven = i % 2 === 0
            return (
              <div
                key={feature.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={!isEven ? 'lg:order-2' : ''}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
                    <Icon size={14} />
                    {feature.title}
                  </div>
                  <h3 className="font-grotesk text-2xl md:text-3xl font-bold text-fg mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-fg/55 text-lg leading-relaxed mb-6">{detail}</p>
                  <ul className="space-y-2">
                    {[feature.description.split('.')[0], 'Enterprise-ready with full audit trail', 'Works with your existing stack'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-fg/60">
                        <Check size={14} className="text-success mt-1 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`glass rounded-2xl p-10 flex items-center justify-center h-56 ${!isEven ? 'lg:order-1' : ''}`}>
                  <Icon size={80} className="text-primary/20" strokeWidth={1} />
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Integrations */}
      <Section id="integrations" className="bg-gradient-to-b from-transparent via-accent/5 to-transparent">
        <div className="text-center mb-12">
          <h2 className="font-grotesk text-4xl font-bold text-fg">
            Integrates with your stack
          </h2>
          <p className="text-fg/50 mt-4">
            Native connectors for the tools your team already uses.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {INTEGRATIONS.map((name) => (
            <div key={name} className="glass rounded-xl p-5 text-center hover:border-primary/25 transition-all">
              <div className="font-medium text-fg/60 hover:text-primary transition-colors text-sm">
                {name}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Technical Specs */}
      <Section id="api">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-grotesk text-4xl font-bold text-fg">Technical specs</h2>
          </div>
          <div className="glass rounded-2xl overflow-hidden">
            {TECH_SPECS.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex items-center justify-between px-6 py-4 ${i < TECH_SPECS.length - 1 ? 'border-b border-white/5' : ''}`}
              >
                <span className="text-fg/55 text-sm">{spec.label}</span>
                <span className="font-grotesk font-semibold text-primary text-sm">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t border-white/5">
        <div className="text-center space-y-6">
          <h2 className="font-grotesk text-4xl font-bold text-fg">
            Ready to see it in action?
          </h2>
          <CTAButton href="/demo" variant="primary" className="text-base">
            Try the Live Demo <ArrowRight size={16} />
          </CTAButton>
        </div>
      </Section>
    </>
  )
}
