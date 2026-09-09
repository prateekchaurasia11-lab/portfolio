import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowUpRight, Linkedin, Phone } from 'lucide-react'

export const Route = createFileRoute('/contact')({ component: Contact })

type FormState = 'idle' | 'submitting' | 'success' | 'error'

function Contact() {
  const [status, setStatus] = useState<FormState>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') || '')
    const email = String(formData.get('email') || '')
    const message = String(formData.get('message') || '')

    setStatus('submitting')

    try {
      const response = await fetch('https://formsubmit.co/ajax/prateekchaurasia11@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio inquiry from ${name}`,
          _replyto: email,
          _template: 'table',
        }),
      })

      if (!response.ok) throw new Error('FormSubmit request failed')

      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="inner-page">
      <div className="contact-layout">
        <aside className="contact-aside reveal">
          <span className="eyebrow">Contact / Projects</span>
          <h1 className="page-title">Let us build a<br /><em>useful product.</em></h1>
          <p>
            Share a little about your website, AI idea, student initiative, or
            product problem. I will get back to you as soon as I can.
          </p>
          <div className="contact-note">
            <span className="eyebrow">Prefer email?</span>
            <a className="footer-email" href="mailto:prateekchaurasia11@gmail.com">
              prateekchaurasia11@gmail.com <ArrowUpRight size={18} />
            </a>
            <div className="contact-links">
              <a className="text-link" href="tel:+916307526421">
                <Phone size={16} /> +91 63075 26421
              </a>
              <a
                className="text-link"
                href="https://www.linkedin.com/in/prateek-chaurasiya-5b113b20b"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={16} /> LinkedIn profile <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </aside>

        <div>
          {status === 'success' ? (
            <div className="success-panel" role="status">
              <span className="eyebrow">Message received</span>
              <h2>Thank you for reaching out.</h2>
              <p>I will read your note carefully and get back to you soon.</p>
              <button className="button button-outline" onClick={() => setStatus('idle')}>
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="contact-form"
            >
              {status === 'error' ? (
                <p className="form-error" role="alert">
                  Something went wrong sending your message. Please try again, or email me directly at{' '}
                  <a href="mailto:prateekchaurasia11@gmail.com">prateekchaurasia11@gmail.com</a>.
                </p>
              ) : null}
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input id="name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className="field">
                <label htmlFor="email">Email address</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className="field">
                <label htmlFor="message">What are you working on?</label>
                <textarea id="message" name="message" placeholder="A few details about your project, timeline, and where you need help." required />
              </div>
              <button className="button button-primary" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send project details'} <ArrowUpRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
