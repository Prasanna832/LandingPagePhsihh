export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Product', href: '/product' },
  { label: 'Demo', href: '/demo' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export interface Feature {
  id: string
  icon: string
  title: string
  description: string
}

export const FEATURES: Feature[] = [
  {
    id: 'real-time-scanning',
    icon: 'Zap',
    title: 'Real-Time Scanning',
    description: 'Analyzes emails and URLs in milliseconds with sub-50ms median response times, ensuring zero disruption to your workflow.',
  },
  {
    id: 'ai-threat-detection',
    icon: 'Brain',
    title: 'AI Threat Detection',
    description: 'ML models trained on millions of phishing samples continuously improve to detect the latest attack patterns and zero-day campaigns.',
  },
  {
    id: 'link-attachment-analysis',
    icon: 'Link2',
    title: 'Link & Attachment Analysis',
    description: 'Deep inspection of URLs and file payloads including executables, PDFs, and Office documents for embedded threats.',
  },
  {
    id: 'domain-spoofing-detection',
    icon: 'Globe',
    title: 'Domain Spoofing Detection',
    description: 'Catches lookalike and homograph attacks using Unicode normalization, visual similarity scoring, and WHOIS age analysis.',
  },
  {
    id: 'zero-day-protection',
    icon: 'ShieldCheck',
    title: 'Zero-Day Protection',
    description: 'Behavioral analysis catches novel threats that signature-based systems miss, providing protection against brand new attack vectors.',
  },
  {
    id: 'team-dashboard',
    icon: 'LayoutDashboard',
    title: 'Team Dashboard',
    description: 'Centralized visibility across your entire organization with role-based access, audit logs, and real-time threat feeds.',
  },
]

export interface Testimonial {
  id: string
  quote: string
  author: string
  title: string
  company: string
  avatar: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: 'Phish Guard AI caught a sophisticated spear-phishing campaign targeting our CFO that our previous vendor completely missed. The ROI was immediate.',
    author: 'Sarah Chen',
    title: 'CISO',
    company: 'TechScale Inc.',
    avatar: 'SC',
  },
  {
    id: 'testimonial-2',
    quote: 'We integrated the API in under an hour. The detection accuracy is remarkable — 99.3% on our internal test dataset with near-zero false positives.',
    author: 'Marcus Williams',
    title: 'Head of Security Engineering',
    company: 'FinCore Systems',
    avatar: 'MW',
  },
  {
    id: 'testimonial-3',
    quote: 'The team dashboard gave us visibility we never had before. We can now trace attack campaigns across the entire organization in real time.',
    author: 'Priya Patel',
    title: 'VP of IT Security',
    company: 'GlobalRetail Co.',
    avatar: 'PP',
  },
]

export interface PricingPlan {
  id: string
  name: string
  price: { monthly: string; annual: string }
  description: string
  features: string[]
  cta: string
  highlighted: boolean
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: { monthly: '$0', annual: '$0' },
    description: 'Perfect for individuals and small teams getting started.',
    features: [
      '100 scans per month',
      'Basic phishing detection',
      'URL analysis',
      'Email support',
      'API access (limited)',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { monthly: '$29', annual: '$290' },
    description: 'For growing teams that need enterprise-grade protection.',
    features: [
      'Unlimited scans',
      'AI-powered detection',
      'Priority support',
      'Full API access',
      'Team dashboard',
      'Webhook notifications',
      'Advanced reporting',
    ],
    cta: 'Start Pro Trial',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: { monthly: 'Custom', annual: 'Custom' },
    description: 'For large organizations with advanced compliance needs.',
    features: [
      'All Pro features',
      'SSO / SAML integration',
      'SIEM integration',
      'Dedicated CSM',
      'SLA guarantee (99.99%)',
      'Custom retention policies',
      'On-premise deployment option',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  image: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'top-7-phishing-red-flags',
    title: "Top 7 Phishing Red Flags You're Probably Ignoring",
    excerpt: 'Most security training covers the basics. Here are seven subtle signals that even experienced users miss.',
    date: 'January 15, 2024',
    readTime: '6 min read',
    tags: ['phishing', 'security tips', 'awareness'],
    image: 'from-accent to-primary',
  },
  {
    slug: 'how-ai-catches-lookalike-domains',
    title: 'How AI Catches Lookalike Domains Before You Click',
    excerpt: 'Lookalike domains are the backbone of modern spear phishing. Here\'s how machine learning spots them at scale.',
    date: 'January 22, 2024',
    readTime: '8 min read',
    tags: ['AI', 'domain spoofing', 'technology'],
    image: 'from-primary/30 to-accent/30',
  },
]

export const INTEGRATIONS: string[] = [
  'Microsoft 365',
  'Google Workspace',
  'Slack',
  'Okta',
  'Splunk',
  'CrowdStrike',
  'Palo Alto',
  'Salesforce',
]

export interface SecurityBadge {
  label: string
}

export const SECURITY_BADGES: SecurityBadge[] = [
  { label: 'SOC 2 Type II' },
  { label: 'GDPR Compliant' },
  { label: 'ISO 27001' },
  { label: '256-bit AES' },
]
