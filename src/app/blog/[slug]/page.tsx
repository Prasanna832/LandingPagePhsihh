import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { TagChip } from '@/components/ui/TagChip'
import { BLOG_POSTS } from '@/lib/content'

const contentDir = path.join(process.cwd(), 'src/content/blog')

function markdownToHtml(md: string): string {
  return md
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .split(/\n\n+/)
    .map((p) => {
      const t = p.trim()
      if (!t) return ''
      if (/^<[h1-6ul]/.test(t)) return t
      return `<p>${t}</p>`
    })
    .join('\n\n')
}

export async function generateStaticParams() {
  try {
    const files = fs.readdirSync(contentDir)
    return files.filter((f) => f.endsWith('.mdx')).map((f) => ({ slug: f.replace(/\.mdx$/, '') }))
  } catch {
    return BLOG_POSTS.map((p) => ({ slug: p.slug }))
  }
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const filePath = path.join(contentDir, `${slug}.mdx`)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)
    return { title: data.title as string, description: data.excerpt as string }
  } catch {
    return { title: 'Blog Post' }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  let frontmatter: Record<string, unknown> = {}
  let htmlContent = ''

  try {
    const filePath = path.join(contentDir, `${slug}.mdx`)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    frontmatter = data
    htmlContent = markdownToHtml(content)
  } catch {
    notFound()
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-fg/40 hover:text-primary text-sm mb-10 transition-colors">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {(frontmatter.tags as string[] | undefined)?.map((tag) => (
              <TagChip key={tag} severity="info">{tag}</TagChip>
            ))}
          </div>
          <h1 className="font-grotesk text-4xl md:text-5xl font-bold text-fg leading-tight mb-6">
            {frontmatter.title as string}
          </h1>
          <div className="flex items-center gap-6 text-fg/35 text-sm">
            <span className="flex items-center gap-1.5"><Calendar size={14} />{frontmatter.date as string}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />{frontmatter.readTime as string}</span>
          </div>
        </header>

        <article
          className="prose-dark"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/5">
            <h2 className="font-grotesk text-2xl font-bold text-fg mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="glass rounded-xl p-5 hover:border-primary/25 transition-all group">
                  <h3 className="font-grotesk font-semibold text-fg group-hover:text-primary transition-colors text-sm leading-snug mb-2">
                    {post.title}
                  </h3>
                  <span className="text-fg/35 text-xs">{post.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
