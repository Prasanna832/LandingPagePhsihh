'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  reason: z.enum(['sales', 'support', 'security', 'other']),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})
type FormData = z.infer<typeof schema>

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { reason: 'sales' },
  })

  const onSubmit = () => setSubmitted(true)

  const inputClass = (hasError: boolean) => cn(
    'w-full px-4 py-3 rounded-xl bg-white/5 border text-fg placeholder:text-fg/30 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all text-sm',
    hasError ? 'border-danger/60 focus:border-danger' : 'border-white/10 focus:border-primary/60',
  )

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Contact</p>
          <h1 className="font-grotesk text-5xl font-bold text-fg mb-4">Get in touch</h1>
          <p className="text-fg/50 text-xl">Whether you have questions, need a demo, or want to report something &#8212; we&apos;re here.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="glass rounded-2xl p-12 text-center space-y-4">
                <CheckCircle size={48} className="text-success mx-auto" />
                <h2 className="font-grotesk font-bold text-2xl text-fg">Message sent!</h2>
                <p className="text-fg/50">We&apos;ll get back to you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-fg/60 text-xs mb-1.5 block">Full Name *</label>
                    <input {...register('name')} placeholder="Jane Smith" className={inputClass(!!errors.name)} />
                    {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-fg/60 text-xs mb-1.5 block">Work Email *</label>
                    <input {...register('email')} type="email" placeholder="jane@company.com" className={inputClass(!!errors.email)} />
                    {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-fg/60 text-xs mb-1.5 block">Company</label>
                  <input {...register('company')} placeholder="Acme Corp" className={inputClass(false)} />
                </div>
                <div>
                  <label className="text-fg/60 text-xs mb-1.5 block">Reason *</label>
                  <select {...register('reason')} className={inputClass(!!errors.reason)}>
                    <option value="sales">Sales inquiry</option>
                    <option value="support">Technical support</option>
                    <option value="security">Security report</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-fg/60 text-xs mb-1.5 block">Message *</label>
                  <textarea {...register('message')} rows={5} placeholder="Tell us how we can help..." className={cn(inputClass(!!errors.message), 'resize-none')} />
                  {errors.message && <p className="text-danger text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" className="w-full py-3 bg-primary text-bg font-semibold rounded-xl text-sm hover:shadow-[0_0_20px_rgba(110,231,255,0.4)] transition-all">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: Mail, label: 'Email', value: 'hello@phishguard.ai' },
              { icon: Phone, label: 'Phone', value: '+1 (415) 555-0192' },
              { icon: MapPin, label: 'Address', value: '548 Market St, San Francisco, CA 94104' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-fg/40 text-xs mb-1">{label}</p>
                  <p className="text-fg text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}
            <div className="glass rounded-xl p-5">
              <p className="text-fg/60 text-xs font-medium uppercase tracking-wider mb-3">Response times</p>
              <div className="space-y-2">
                {[['Sales', '< 4 hours'], ['Support', '< 8 hours'], ['Security', '< 1 hour']].map(([type, time]) => (
                  <div key={type} className="flex justify-between text-sm">
                    <span className="text-fg/50">{type}</span>
                    <span className="text-primary font-medium">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
