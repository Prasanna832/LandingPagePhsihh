import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/content'
import { TagChip } from '@/components/ui/TagChip'
import { Clock, Calendar, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Security Insights & Research',
  description: 'Phishing research, security tips, and threat intelligence from the Phish Guard AI team.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Blog</p>
          <h1 className="font-grotesk text-5xl font-bold text-fg mb-4">Security Insights &amp; Research</h1>
          <p className="text-fg/50 text-xl max-w-xl mx-auto">Threat intelligence, security tips, and deep dives from our research team.</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {['All', 'phishing', 'AI', 'security tips', 'domain spoofing', 'awareness'].map((tag) => (
            <span key={tag} className="px-4 py-1.5 rounded-full glass border border-white/10 text-fg/50 text-sm cursor-pointer hover:text-primary hover:border-primary/30 transition-all">
              {tag}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="glass rounded-2xl overflow-hidden hover:border-primary/25 transition-all">
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${post.image} group-hover:scale-105 transition-transform duration-500`} />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => <TagChip key={tag} severity="info">{tag}</TagChip>)}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-fg/35 text-xs mb-3">
                    <span className="flex items-center gap-1.5"><Calendar size={12} />{post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} />{post.readTime}</span>
                  </div>
                  <h2 className="font-grotesk font-bold text-xl text-fg group-hover:text-primary transition-colors mb-2">{post.title}</h2>
                  <p className="text-fg/50 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <span className="text-primary text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Read more <ArrowRight size={14} /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="glass rounded-2xl p-10 text-center">
          <h2 className="font-grotesk text-2xl font-bold text-fg mb-2">Stay ahead of threats</h2>
          <p className="text-fg/50 mb-6">Get weekly security research delivered to your inbox.</p>
          <form className="flex gap-3 max-w-sm mx-auto">
            <input type="email" placeholder="you@company.com" className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-fg placeholder:text-fg/30 focus:outline-none focus:border-primary/60 text-sm" />
            <button type="submit" className="px-5 py-2 bg-primary text-bg font-semibold rounded-lg text-sm hover:shadow-[0_0_16px_rgba(110,231,255,0.4)] transition-all">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  )
}
