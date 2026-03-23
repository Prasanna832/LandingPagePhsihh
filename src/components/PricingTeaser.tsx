'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { PRICING_PLANS } from '@/lib/content'
import { cn } from '@/lib/utils'

export function PricingTeaser() {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-fg mb-6">
            Simple, transparent pricing
          </h2>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 glass rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                !annual ? 'bg-primary text-bg' : 'text-fg/50 hover:text-fg',
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2',
                annual ? 'bg-primary text-bg' : 'text-fg/50 hover:text-fg',
              )}
            >
              Annual
              <span
                className={cn(
                  'text-xs px-2 py-0.5 rounded-full font-semibold',
                  annual ? 'bg-bg/20 text-bg' : 'bg-success/20 text-success',
                )}
              >
                Save 17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
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

              <div className="mb-6">
                <h3 className="font-grotesk font-bold text-xl text-fg mb-1">{plan.name}</h3>
                <p className="text-fg/45 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="font-grotesk font-bold text-4xl text-fg">
                  {annual ? plan.price.annual : plan.price.monthly}
                </span>
                {plan.price.monthly !== 'Custom' && (
                  <span className="text-fg/40 text-sm ml-2">
                    {annual ? '/year' : '/month'}
                  </span>
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

              <Link
                href="/pricing"
                className={cn(
                  'block text-center py-3 rounded-xl font-semibold text-sm transition-all',
                  plan.highlighted
                    ? 'bg-primary text-bg hover:shadow-[0_0_20px_rgba(110,231,255,0.4)]'
                    : 'border border-white/15 text-fg hover:border-primary/40 hover:text-primary',
                )}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
