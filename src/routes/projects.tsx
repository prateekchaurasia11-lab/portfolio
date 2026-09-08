import { createFileRoute } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { ExternalLink, Github } from 'lucide-react'
import { marked } from 'marked'

export const Route = createFileRoute('/projects')({ component: Projects })

function Projects() {
  return (
    <div className="inner-page">
      <header className="page-intro reveal">
        <span className="eyebrow">Selected work / 2023-2026</span>
        <h1 className="page-title">Ideas shipped as<br /><em>working web products.</em></h1>
        <p>
          A closer look at AI-powered product development, startup web deployment,
          and a responsive personal portfolio.
        </p>
      </header>

      <div className="detail-list">
        {allProjects.map((project, index) => (
          <article className="detail-card" key={project.title}>
            <div className="detail-meta">Case study / 0{index + 1}</div>
            <div>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: marked(project.content) }}
              />
              <div className="hero-actions">
                {project.github && (
                  <a className="text-link" href={project.github} target="_blank" rel="noreferrer">
                    <Github size={16} /> Source code
                  </a>
                )}
                {project.liveUrl && (
                  <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live project <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
