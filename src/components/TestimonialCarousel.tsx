'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/content'

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-fg">
            Trusted by security teams
          </h2>
        </div>

        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) {
                  setDirection(1)
                  setCurrent((c) => (c + 1) % TESTIMONIALS.length)
                } else if (info.offset.x > 60) {
                  setDirection(-1)
                  setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
                }
              }}
              className="glass rounded-2xl p-8 md:p-12 cursor-grab active:cursor-grabbing w-full"
            >
              <Quote className="text-primary/40 mb-6" size={40} strokeWidth={1} />
              <blockquote className="text-fg/85 text-lg md:text-xl leading-relaxed mb-8 font-medium">
                &ldquo;{TESTIMONIALS[current].quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-bg font-bold font-grotesk text-sm shrink-0">
                  {TESTIMONIALS[current].avatar}
                </div>
                <div>
                  <div className="font-grotesk font-semibold text-fg">
                    {TESTIMONIALS[current].author}
                  </div>
                  <div className="text-fg/40 text-sm">
                    {TESTIMONIALS[current].title} · {TESTIMONIALS[current].company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-2 bg-primary'
                  : 'w-2 h-2 bg-fg/20 hover:bg-fg/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
