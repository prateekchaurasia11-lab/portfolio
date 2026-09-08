import { createFileRoute, Link } from '@tanstack/react-router'
import { allBlogs } from 'content-collections'
import { marked } from 'marked'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/blog/$slug')({ component: BlogPost })

function BlogPost() {
  const { slug } = Route.useParams()
  const post = allBlogs.find((entry) => entry._meta.path === slug)

  if (!post) {
    return (
      <div className="inner-page">
        <header className="page-intro">
          <span className="eyebrow">404 / Journal</span>
          <h1 className="page-title">That note isn’t here.</h1>
          <Link to="/" className="text-link"><ArrowLeft size={16} /> Return home</Link>
        </header>
      </div>
    )
  }

  return (
    <article className="inner-page">
      <Link to="/" className="text-link"><ArrowLeft size={16} /> Return home</Link>
      <header className="page-intro" style={{ marginTop: '55px' }}>
        <span className="eyebrow">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
          })} / {post.author}
        </span>
        <h1 className="page-title">{post.title}</h1>
        <p>{post.summary}</p>
        <div className="tag-row">
          {post.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
      </header>
      <div className="rich-text" style={{ maxWidth: '760px' }} dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
    </article>
  )
}
