import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { LogoMarquee } from '@/components/LogoMarquee'
import { HowItWorks } from '@/components/HowItWorks'
import { FeatureCards } from '@/components/FeatureCards'
import { RiskDemo } from '@/components/RiskDemo'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { SecurityBadges } from '@/components/SecurityBadges'
import { PricingTeaser } from '@/components/PricingTeaser'
import { BlogTeaser } from '@/components/BlogTeaser'
import { Section } from '@/components/ui/Section'
import { CTAButton } from '@/components/ui/CTAButton'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Phish Guard AI - Stop Phishing Before It Starts',
  description:
    'Phish Guard AI scans emails, URLs, and attachments in real-time to stop threats before they spread.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <HowItWorks />
      <FeatureCards />

      {/* Risk Demo Section */}
      <section className="py-24 bg-gradient-to-b from-transparent via-accent/5 to-transparent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
              Live Demo
            </p>
            <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-fg">
              Try it <span className="text-gradient">live</span>
            </h2>
            <p className="text-fg/50 mt-4">
              Paste any URL or email snippet below and see our heuristic engine analyze it instantly.
            </p>
          </div>
          <div className="glass rounded-2xl p-8">
            <RiskDemo />
          </div>
        </div>
      </section>

      <TestimonialCarousel />
      <SecurityBadges />
      <PricingTeaser />
      <BlogTeaser />

      {/* Final CTA */}
      <Section className="border-t border-white/5">
        <div className="text-center space-y-6">
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-fg">
            Ready to stop phishing{' '}
            <span className="text-gradient">for good?</span>
          </h2>
          <p className="text-fg/50 text-xl max-w-lg mx-auto">
            Join thousands of security teams using Phish Guard AI to protect their organizations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton href="/demo" variant="primary" className="text-base">
              Start Free — No Credit Card <ArrowRight size={16} />
            </CTAButton>
            <CTAButton href="/contact" variant="ghost" className="text-base">
              Talk to Sales
            </CTAButton>
          </div>
          <p className="text-fg/25 text-sm">
            Free plan includes 100 scans/month. No credit card required.
          </p>
        </div>
      </Section>
    </>
  )
}
