import { createFileRoute, Link } from '@tanstack/react-router'
import { allJobs, allProjects } from 'content-collections'
import { ArrowDownRight, ArrowUpRight, Asterisk, Sparkles } from 'lucide-react'
import { formatDateRange } from '@/lib/utils'

export const Route = createFileRoute('/')({
  component: PortfolioHome,
})

const capabilities = [
  'Full-stack development',
  'Generative AI',
  'React and Next.js',
  'AWS and Supabase',
]

function PortfolioHome() {
  return (
    <div className="page-shell">
      <section className="hero">
        <div className="hero-copy reveal">
          <p className="kicker"><Asterisk size={16} /> Full Stack Developer + AI/GenAI</p>
          <h1>
            I build production web products with <em>AI.</em>
          </h1>
          <p className="hero-intro">
            I am Prateek Chaurasiya, a B.Tech Information Technology student at
            HBTU Kanpur and a full stack developer. I build with React, Next.js,
            REST APIs, Supabase, AWS, and practical AI workflows.
          </p>
          <div className="hero-actions">
            <Link to="/projects" className="button button-primary">
              Explore selected work <ArrowDownRight size={18} />
            </Link>
            <Link to="/contact" className="text-link">
              Start a conversation <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        <div className="hero-art reveal reveal-delay" aria-hidden="true">
          <div className="art-grid" />
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-card art-card-top">
            <span>Currently</span>
            Building full-stack and<br />AI products
          </div>
          <div className="art-monogram">P</div>
          <div className="art-card art-card-bottom">
            <Sparkles size={17} />
            <span>React, Next.js, and<br />GenAI product work</span>
          </div>
        </div>
      </section>

      <section className="marquee" aria-label="Areas of expertise">
        <div className="marquee-track">
          {[...capabilities, ...capabilities].map((item, index) => (
            <span key={`${item}-${index}`}><Asterisk size={15} /> {item}</span>
          ))}
        </div>
      </section>

      <section className="section selected-work">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / Selected work</span>
            <h2>Built for real users,<br />deployed with care.</h2>
          </div>
          <p>
            Recent work across Next.js, React, REST APIs, cloud deployment, and
            LLM-powered product development.
          </p>
        </div>

        <div className="project-grid">
          {allProjects.map((project, index) => (
            <article className={`project-tile project-${index + 1}`} key={project.title}>
              <div className="project-visual" aria-hidden="true">
                <div className="mock-window">
                  <span /><span /><span />
                  <div className="mock-content" />
                </div>
              </div>
              <div className="project-details">
                <div>
                  <span className="project-number">0{index + 1}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="project-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
        <Link to="/projects" className="button button-outline">
          View project details <ArrowUpRight size={18} />
        </Link>
      </section>

      <section className="section about-section">
        <span className="eyebrow">02 / A little about me</span>
        <div className="about-grid">
          <h2>Learning fast at the intersection of <em>software</em> and <em>AI.</em></h2>
          <div className="about-copy">
            <p>
              I build clear, responsive product experiences and connect them to
              practical APIs, databases, AI services, and cloud deployment. My
              current work includes LLM applications, LangChain, RAG, agentic
              workflows, prompt engineering, and multimodal AI.
            </p>
            <p>
              Beyond product work, I contribute to campus communities as a TEDx
              HBTU co-organizer, NSS treasurer and event coordinator, and
              AeroClub publicity and marketing head.
            </p>
            <Link to="/resume" className="text-link">
              Read my full resume <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="stats-row">
          <div><strong>7th</strong><span>Current semester</span></div>
          <div><strong>800+</strong><span>Event registrations coordinated</span></div>
          <div><strong>2nd</strong><span>College hackathon position</span></div>
          <div><strong>2024</strong><span>Noon Referral Program top performer</span></div>
        </div>
      </section>

      <section className="section experience-preview">
        <div className="section-heading compact">
          <div>
            <span className="eyebrow">03 / Experience</span>
            <h2>Leadership chapters.</h2>
          </div>
          <Link to="/resume" className="text-link">Full resume <ArrowUpRight size={17} /></Link>
        </div>
        <div className="experience-list">
          {allJobs.map((job) => (
            <div className="experience-row" key={job.jobTitle}>
              <span>{formatDateRange(job.startDate, job.endDate)}</span>
              <strong>{job.jobTitle}</strong>
              <span>{job.location ? `${job.company} / ${job.location}` : job.company}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-banner">
        <span className="eyebrow">Have a project in mind?</span>
        <h2>Let us build something<br /><em>useful and reliable.</em></h2>
        <Link to="/contact" className="button button-light">
          Tell me about it <ArrowUpRight size={18} />
        </Link>
      </section>
    </div>
  )
}
