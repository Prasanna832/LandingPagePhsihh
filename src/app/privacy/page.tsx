import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Phish Guard AI privacy policy — how we collect, use, and protect your data.',
}

const sections = [
  { title: 'Data We Collect', content: 'We collect email addresses for account creation and newsletters, usage data (scan counts, API call metadata), and payment information processed by our PCI-compliant payment provider. We do not store the content of scanned emails or URLs beyond the time required to complete analysis (typically under 60 seconds).' },
  { title: 'How We Use Your Data', content: 'Collected data is used to provide and improve our services, send transactional emails (account notices, invoices), send marketing communications you have opted into, and comply with legal obligations. We do not sell personal data to third parties.' },
  { title: 'Data Retention', content: 'Account data is retained for the duration of your account plus 30 days after closure. Scan metadata (not content) is retained for 90 days for Pro plans and 365 days for Enterprise plans. Billing records are retained for 7 years as required by law.' },
  { title: 'Your Rights (GDPR)', content: 'If you are in the European Economic Area, you have the right to access, rectify, erase, and port your personal data, as well as the right to restrict or object to processing. To exercise these rights, contact privacy@phishguard.ai. We will respond within 30 days.' },
  { title: 'Data Security', content: 'All data in transit is encrypted with TLS 1.3. Data at rest is encrypted with AES-256. We maintain SOC 2 Type II certification and undergo annual penetration testing. Access to production systems is restricted by hardware MFA and zero-trust network policies.' },
  { title: 'Contact', content: 'For privacy inquiries, contact our Data Protection Officer at privacy@phishguard.ai or write to: Phish Guard AI, Inc., 548 Market St, San Francisco, CA 94104.' },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Legal</p>
          <h1 className="font-grotesk text-4xl md:text-5xl font-bold text-fg mb-4">Privacy Policy</h1>
          <p className="text-fg/40 text-sm">Last updated: January 1, 2024</p>
        </div>
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title} className="glass rounded-2xl p-6">
              <h2 className="font-grotesk font-bold text-lg text-fg mb-3">{s.title}</h2>
              <p className="text-fg/55 text-sm leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
