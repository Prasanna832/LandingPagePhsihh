import Link from 'next/link'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/content'
import { TagChip } from '@/components/ui/TagChip'

export function BlogTeaser() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Blog</p>
            <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-fg">
              Security insights
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all"
          >
            View all posts <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="glass rounded-2xl overflow-hidden hover:border-primary/25 transition-all duration-300">
                {/* Image placeholder */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${post.image} group-hover:scale-105 transition-transform duration-500`}
                  />
                  <div className="absolute inset-0 bg-bg/20" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <TagChip key={tag} severity="info">
                        {tag}
                      </TagChip>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-fg/35 text-xs mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-grotesk font-bold text-lg text-fg group-hover:text-primary transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>
                  <p className="text-fg/50 text-sm leading-relaxed">{post.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary text-sm font-medium">
            View all posts <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
