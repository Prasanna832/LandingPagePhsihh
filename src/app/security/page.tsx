import type { Metadata } from 'next'
import { SecurityBadges } from '@/components/SecurityBadges'
import { ShieldCheck, Lock, Eye, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Security',
  description: 'Learn about Phish Guard AI security practices, infrastructure, and vulnerability disclosure.',
}

export default function SecurityPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Trust & Safety</p>
          <h1 className="font-grotesk text-5xl font-bold text-fg mb-4">Security at Phish Guard AI</h1>
          <p className="text-fg/50 text-xl max-w-xl mx-auto">We hold ourselves to the highest security standards — because our customers depend on us to protect them.</p>
        </div>

        <SecurityBadges />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: ShieldCheck, title: 'Infrastructure Security', body: 'All services run on SOC 2 Type II certified cloud infrastructure. Network segmentation, WAF protection, and DDoS mitigation are applied at every layer. Encryption in transit (TLS 1.3) and at rest (AES-256) is enforced without exception.' },
            { icon: Lock, title: 'Access Controls', body: 'Production access requires hardware MFA, just-in-time provisioning, and is logged in an immutable audit trail. We follow the principle of least privilege across all internal systems.' },
            { icon: Eye, title: 'Monitoring & Response', body: '24/7 automated threat detection with human-in-the-loop incident response. Our SIRT (Security Incident Response Team) has a 1-hour initial response SLA for critical vulnerabilities.' },
            { icon: Mail, title: 'Vulnerability Disclosure', body: 'We operate a responsible disclosure program. If you discover a vulnerability, please email security@phishguard.ai with details. We commit to acknowledging reports within 24 hours and resolving critical issues within 72 hours.' },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="glass rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <Icon size={20} className="text-primary" strokeWidth={1.5} />
              </div>
              <h2 className="font-grotesk font-bold text-lg text-fg mb-2">{title}</h2>
              <p className="text-fg/55 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 glass rounded-2xl p-8 text-center">
          <h2 className="font-grotesk font-bold text-xl text-fg mb-2">Report a Security Issue</h2>
          <p className="text-fg/50 text-sm mb-4">Found a vulnerability? We want to hear from you.</p>
          <a href="mailto:security@phishguard.ai" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-bg font-semibold rounded-xl text-sm hover:shadow-[0_0_20px_rgba(110,231,255,0.4)] transition-all">
            <Mail size={16} /> security@phishguard.ai
          </a>
        </div>
      </div>
    </div>
  )
}
