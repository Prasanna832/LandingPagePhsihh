import { INTEGRATIONS } from '@/lib/content'

export function LogoMarquee() {
  const doubled = [...INTEGRATIONS, ...INTEGRATIONS]

  return (
    <section className="py-16 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-fg/30 text-sm uppercase tracking-widest">
          Trusted by teams at
        </p>
      </div>
      <div className="relative">
        <div
          className="flex gap-12 animate-marquee hover:[animation-play-state:paused] whitespace-nowrap"
          style={{ width: 'max-content' }}
        >
          {doubled.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center justify-center px-6 py-3 glass rounded-xl grayscale hover:grayscale-0 hover:text-primary transition-all duration-300 cursor-default"
            >
              <span className="text-fg/40 hover:text-primary font-medium text-sm whitespace-nowrap transition-colors duration-300">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
