'use client'

import { useState } from 'react'
import { Check, Minus, HelpCircle } from 'lucide-react'
import { PRICING_PLANS } from '@/lib/content'
import { CTAButton } from '@/components/ui/CTAButton'
import { cn } from '@/lib/utils'

const TABLE_FEATURES = [
  { name: 'Email scanning', free: true, pro: true, enterprise: true },
  { name: 'URL analysis', free: true, pro: true, enterprise: true },
  { name: 'API access', free: 'Limited', pro: true, enterprise: true },
  { name: 'Team members', free: '1', pro: '25', enterprise: 'Unlimited' },
  { name: 'Integrations', free: false, pro: true, enterprise: true },
  { name: 'Support', free: 'Email', pro: 'Priority', enterprise: 'Dedicated CSM' },
  { name: 'SLA', free: false, pro: '99.9%', enterprise: '99.99%' },
  { name: 'SSO / SAML', free: false, pro: false, enterprise: true },
  { name: 'SIEM integration', free: false, pro: false, enterprise: true },
]

const FAQS = [
  {
    q: 'How does the free plan work?',
    a: 'The free plan gives you 100 scans per month with basic phishing detection and URL analysis. No credit card required. You can upgrade at any time.',
  },
  {
    q: 'Can I change plans?',
    a: 'Yes. You can upgrade or downgrade at any time from your dashboard. When upgrading, you get immediate access to new features. Downgrades take effect at the next billing cycle.',
  },
  {
    q: 'Is there a trial period?',
    a: 'Pro plans come with a 14-day free trial. Enterprise plans include a proof-of-concept period with full platform access and support.',
  },
  {
    q: 'How does annual billing work?',
    a: 'Annual plans are billed once per year and save you approximately 17% (equivalent to 2 months free). You receive a single invoice that can be used for budget approval.',
  },
  {
    q: 'Do you offer discounts for nonprofits?',
    a: 'Yes. We offer 40% discounts for verified 501(c)(3) nonprofits and educational institutions. Contact our sales team with your organization details.',
  },
  {
    q: 'What integrations are supported?',
    a: 'We support Microsoft 365, Google Workspace, Slack, Okta, Splunk, CrowdStrike, Palo Alto Networks, and Salesforce out of the box. Custom integrations are available for Enterprise customers.',
  },
]

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check size={16} className="text-success mx-auto" />
  if (value === false) return <Minus size={16} className="text-fg/20 mx-auto" />
  return <span className="text-fg/60 text-sm">{value}</span>
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Pricing</p>
          <h1 className="font-grotesk text-5xl md:text-6xl font-bold text-fg mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-fg/55 text-xl max-w-xl mx-auto mb-8">
            Start free. Scale as you grow. No surprise fees.
          </p>
          {/* Toggle */}
          <div className="inline-flex items-center gap-3 glass rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn('px-4 py-2 rounded-full text-sm font-medium transition-all', !annual ? 'bg-primary text-bg' : 'text-fg/50 hover:text-fg')}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn('px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2', annual ? 'bg-primary text-bg' : 'text-fg/50 hover:text-fg')}
            >
              Annual
              <span className={cn('text-xs px-2 py-0.5 rounded-full font-semibold', annual ? 'bg-bg/20 text-bg' : 'bg-success/20 text-success')}>
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'relative rounded-2xl p-8 flex flex-col',
                plan.highlighted
                  ? 'bg-gradient-to-b from-primary/10 to-accent/5 border-2 border-primary/40'
                  : 'glass',
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-bg text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="font-grotesk font-bold text-xl text-fg mb-1">{plan.name}</h3>
              <p className="text-fg/45 text-sm mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="font-grotesk font-bold text-4xl text-fg">
                  {annual ? plan.price.annual : plan.price.monthly}
                </span>
                {plan.price.monthly !== 'Custom' && (
                  <span className="text-fg/40 text-sm ml-2">{annual ? '/year' : '/month'}</span>
                )}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-fg/70">
                    <Check size={15} className="text-success mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <CTAButton
                href={plan.id === 'enterprise' ? '/contact' : '/demo'}
                variant={plan.highlighted ? 'primary' : 'ghost'}
                className="w-full justify-center"
              >
                {plan.cta}
              </CTAButton>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mb-24">
          <h2 className="font-grotesk text-3xl font-bold text-fg text-center mb-12">
            Full feature comparison
          </h2>
          <div className="glass rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-4 text-fg/50 font-medium w-1/2">Feature</th>
                  {PRICING_PLANS.map((p) => (
                    <th key={p.id} className="px-4 py-4 text-center font-grotesk font-semibold text-fg">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_FEATURES.map((row, i) => (
                  <tr key={row.name} className={i < TABLE_FEATURES.length - 1 ? 'border-b border-white/5' : ''}>
                    <td className="px-6 py-4 text-fg/60">{row.name}</td>
                    <td className="px-4 py-4 text-center">
                      <CellValue value={row.free} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <CellValue value={row.pro} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <CellValue value={row.enterprise} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="font-grotesk text-3xl font-bold text-fg text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-medium text-fg text-sm">{faq.q}</span>
                  <HelpCircle
                    size={16}
                    className={cn('shrink-0 transition-colors', openFaq === i ? 'text-primary' : 'text-fg/30')}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-fg/55 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center glass rounded-2xl p-12 space-y-6">
          <h2 className="font-grotesk text-3xl font-bold text-fg">
            Questions? Talk to our team.
          </h2>
          <p className="text-fg/50">
            We&apos;ll help you find the right plan for your organization.
          </p>
          <CTAButton href="/contact" variant="primary" className="text-base">
            Contact Sales
          </CTAButton>
        </div>
      </div>
    </div>
  )
}
