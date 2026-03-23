export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface HeuristicFlag {
  id: string
  label: string
  severity: 'info' | 'warning' | 'danger'
}

export interface HeuristicResult {
  score: number
  riskLevel: RiskLevel
  flags: HeuristicFlag[]
}

export function analyzeInput(input: string): HeuristicResult {
  const text = input.trim()
  let score = 0
  const flags: HeuristicFlag[] = []

  // 1. IP address in URL
  if (/https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/i.test(text)) {
    score += 25
    flags.push({ id: 'ip-url', label: 'IP address used instead of domain name', severity: 'danger' })
  }

  // 2. Shortened URL
  if (/\b(bit\.ly|tinyurl\.com|t\.co|goo\.gl|ow\.ly)\b/i.test(text)) {
    score += 20
    flags.push({ id: 'shortened-url', label: 'Shortened URL detected (hides real destination)', severity: 'warning' })
  }

  // 3. Suspicious TLD
  if (/\.(xyz|tk|ml|ga|cf|gq)(\/|$|\s)/i.test(text)) {
    score += 15
    flags.push({ id: 'suspicious-tld', label: 'Suspicious top-level domain (.xyz, .tk, .ml, etc.)', severity: 'warning' })
  }

  // 4. Brand misspelling
  if (/paypa[l1]|g[o0]{2}gle|micros[o0]ft|amaz[o0]n|faceb[o0]{2}k|netfl[i1]x/i.test(text)) {
    score += 20
    flags.push({ id: 'brand-misspelling', label: 'Brand name misspelling detected (typosquatting)', severity: 'danger' })
  }

  // 5. URL too long
  if (text.length > 75) {
    score += 10
    flags.push({ id: 'long-url', label: 'Unusually long URL (may be obfuscating destination)', severity: 'info' })
  }

  // 6. HTTP not HTTPS (only if looks like a URL)
  if (/^http:\/\//i.test(text)) {
    score += 15
    flags.push({ id: 'no-https', label: 'Insecure HTTP connection (no HTTPS encryption)', severity: 'warning' })
  }

  // 7. Too many hyphens
  const hyphenMatches = text.match(/-/g)
  if (hyphenMatches && hyphenMatches.length > 3) {
    score += 10
    flags.push({ id: 'many-hyphens', label: 'Excessive hyphens in domain (common phishing pattern)', severity: 'info' })
  }

  // 8. Base64-like patterns
  if (/[A-Za-z0-9+/]{30,}={0,2}/.test(text)) {
    score += 15
    flags.push({ id: 'base64', label: 'Possible Base64-encoded payload detected', severity: 'warning' })
  }

  // 9. Urgent keywords
  if (/(verify your account|account suspended|click immediately|act now|limited time|confirm your identity)/i.test(text)) {
    score += 20
    flags.push({ id: 'urgent-keywords', label: 'Urgency / fear language detected (social engineering)', severity: 'danger' })
  }

  // 10. Multiple @ symbols
  const atMatches = text.match(/@/g)
  if (atMatches && atMatches.length > 1) {
    score += 20
    flags.push({ id: 'multiple-at', label: 'Multiple @ symbols (URL credential spoofing technique)', severity: 'danger' })
  }

  // Clamp score to 100
  score = Math.min(100, score)

  // Determine risk level
  let riskLevel: RiskLevel
  if (score <= 25) riskLevel = 'low'
  else if (score <= 50) riskLevel = 'medium'
  else if (score <= 75) riskLevel = 'high'
  else riskLevel = 'critical'

  return { score, riskLevel, flags }
}
