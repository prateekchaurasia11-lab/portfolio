import { createFileRoute } from '@tanstack/react-router'
import { allEducations, allJobs } from 'content-collections'
import { marked } from 'marked'
import { formatDateRange } from '@/lib/utils'

export const Route = createFileRoute('/resume')({ component: Resume })

const technicalSkills = [
  {
    label: 'Frontend',
    values: ['React.js', 'Next.js', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design', 'Modular UI Components'],
  },
  {
    label: 'Backend',
    values: ['Python', 'REST APIs', 'API Integrations', 'Next.js API Routes', 'SQL'],
  },
  {
    label: 'AI / LLM',
    values: ['Generative AI', 'LLM Applications', 'LangChain', 'RAG', 'Agentic Workflows', 'Prompt Engineering', 'Multimodal AI', 'Quantization'],
  },
  {
    label: 'AI Tools',
    values: ['OpenRouter', 'GPT-4o-mini', 'Groq Whisper', 'Vercel'],
  },
  {
    label: 'Database / Cloud',
    values: ['Supabase', 'AWS EC2', 'Vercel', 'DNS', 'SSL', 'Environment Configuration'],
  },
  {
    label: 'Tools',
    values: ['Git', 'GitHub'],
  },
]

const achievements = [
  {
    title: '2nd Place',
    detail: 'College-Level Hackathon, 2023. Recognized for innovative problem-solving and technical execution.',
  },
  {
    title: 'Top Performer',
    detail: 'Noon Referral Program, 2024. Recognized for digital outreach and referral performance.',
  },
]

function Resume() {
  return (
    <div className="inner-page">
      <header className="page-intro reveal">
        <span className="eyebrow">Resume / Prateek Chaurasiya</span>
        <h1 className="page-title">Full-stack developer by practice.<br /><em>AI product builder by focus.</em></h1>
        <p>
          Full stack developer and B.Tech Information Technology student with
          hands-on experience in React, Next.js, REST APIs, LLM applications,
          Supabase, AWS deployment, and campus leadership.
        </p>
      </header>

      <section className="detail-list">
        {allJobs.map((job) => (
          <article className="detail-card" key={job.jobTitle}>
            <div className="detail-meta">{formatDateRange(job.startDate, job.endDate)}</div>
            <div>
              <h2>{job.jobTitle}</h2>
              <p><strong>{job.company}</strong>{job.location ? ` - ${job.location}` : ''}</p>
              <p>{job.summary}</p>
              <div className="tag-row">
                {job.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              <div className="rich-text" dangerouslySetInnerHTML={{ __html: marked(job.content) }} />
            </div>
          </article>
        ))}
      </section>

      <section className="section" style={{ paddingInline: 0 }}>
        <span className="eyebrow">Technical skills</span>
        <div className="detail-list" style={{ marginTop: '30px' }}>
          {technicalSkills.map((skillGroup) => (
            <article className="detail-card" key={skillGroup.label}>
              <div className="detail-meta">{skillGroup.label}</div>
              <div className="tag-row" style={{ marginTop: 0 }}>
                {skillGroup.values.map((skill) => <span className="tag" key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingInline: 0 }}>
        <span className="eyebrow">Achievements</span>
        <div className="detail-list" style={{ marginTop: '30px' }}>
          {achievements.map((achievement) => (
            <article className="detail-card" key={achievement.title}>
              <div className="detail-meta">Recognition</div>
              <div>
                <h2>{achievement.title}</h2>
                <p>{achievement.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingInline: 0 }}>
        <span className="eyebrow">Education</span>
        <div className="detail-list" style={{ marginTop: '30px' }}>
          {allEducations.map((education) => (
            <article className="detail-card" key={education.school}>
              <div className="detail-meta">{education.startDate} - {education.endDate}</div>
              <div>
                <h2>{education.school}</h2>
                <p>{education.summary}</p>
                <div className="rich-text" dangerouslySetInnerHTML={{ __html: marked(education.content) }} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
