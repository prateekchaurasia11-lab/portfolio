import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content:
          'Portfolio of Prateek Chaurasiya, a full stack developer and software engineer building AI-powered web products.',
      },
      { title: 'Prateek Chaurasiya - Full Stack Developer & AI Engineer' },
    ],
    links: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=1' },
    ],
  }),
  shellComponent: RootDocument,
})

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/projects' },
  { label: 'Resume', to: '/resume' },
  { label: 'Contact', to: '/contact' },
] as const

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <header className="site-header">
          <Link to="/" className="wordmark" aria-label="Prateek Chaurasiya home">
            PC<span>.</span>
          </Link>
          <nav className="site-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                activeProps={{ className: 'active' }}
                activeOptions={{ exact: item.to === '/' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a className="availability" href="mailto:prateekchaurasia11@gmail.com">
            Available for full-stack and AI projects
          </a>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div>
            <span className="eyebrow">Say hello</span>
            <a href="mailto:prateekchaurasia11@gmail.com" className="footer-email">
              prateekchaurasia11@gmail.com <ArrowUpRight size={20} />
            </a>
          </div>
          <div className="footer-meta">
            <span>Full Stack Developer / Software Engineer / AI-GenAI</span>
            <span>Copyright 2026 Prateek Chaurasiya</span>
          </div>
        </footer>
        <Scripts />
      </body>
    </html>
  )
}
