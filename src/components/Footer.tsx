'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Twitter, Linkedin, Github, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email'),
})
type NewsletterForm = z.infer<typeof newsletterSchema>

const productLinks = [
  { label: 'Features', href: '/product' },
  { label: 'Demo', href: '/demo' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Integrations', href: '/product#integrations' },
  { label: 'API Docs', href: '/product#api' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Security', href: '/security' },
  { label: 'Careers', href: '/careers' },
]

const resourceLinks = [
  { label: 'Documentation', href: '/docs' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Status', href: '/status' },
]

export function Footer() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterForm>({ resolver: zodResolver(newsletterSchema) })

  const onSubmit = () => {
    setSubmitted(true)
  }

  return (
    <footer className="border-t border-white/5 bg-[#080C16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Logo + tagline + social */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Shield className="text-primary" size={24} strokeWidth={1.5} />
              <span className="font-grotesk font-bold text-lg text-fg">
                Phish Guard <span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-fg/50 text-sm leading-relaxed">
              Enterprise-grade phishing protection powered by AI. Stop threats before they reach your team.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Twitter, label: 'Twitter', href: '#' },
                { Icon: Linkedin, label: 'LinkedIn', href: '#' },
                { Icon: Github, label: 'GitHub', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-lg text-fg/40 hover:text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Product */}
          <div>
            <h3 className="font-grotesk font-semibold text-fg mb-4">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-fg/50 text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h3 className="font-grotesk font-semibold text-fg mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-fg/50 text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h3 className="font-grotesk font-semibold text-fg mb-4">Resources</h3>
            <ul className="space-y-3 mb-6">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-fg/50 text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-fg/50 text-xs mb-3">Security updates & research</p>
            {submitted ? (
              <div className="flex items-center gap-2 text-success text-sm">
                <span className="text-lg">✓</span> You&apos;re subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                <input
                  {...register('email')}
                  type="email"
                  placeholder="you@company.com"
                  className={cn(
                    'flex-1 min-w-0 px-3 py-2 text-sm rounded-lg bg-white/5 border text-fg placeholder:text-fg/30 focus:outline-none focus:border-primary/60 transition-colors',
                    errors.email ? 'border-danger/60' : 'border-white/10',
                  )}
                />
                <button
                  type="submit"
                  className="p-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors"
                  aria-label="Subscribe"
                >
                  <Send size={16} />
                </button>
              </form>
            )}
            {errors.email && (
              <p className="text-danger text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-fg/30 text-sm">
            © {new Date().getFullYear()} Phish Guard AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-fg/30 text-sm hover:text-fg/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-fg/30 text-sm hover:text-fg/60 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
