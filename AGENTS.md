# Project Guide

## Overview

This is a personal portfolio built with TanStack Start, React, TypeScript, Tailwind CSS, Content Collections, and FormSubmit. The content is tailored for Prateek Chaurasiya.

## Architecture

- `src/routes/__root.tsx` defines metadata, persistent navigation, and the site footer.
- `src/routes/index.tsx` is the primary portfolio landing page.
- `src/routes/projects.tsx`, `resume.tsx`, and `contact.tsx` provide focused supporting pages.
- `src/styles.css` contains the full visual system, responsive layouts, and motion rules.
- `content/projects`, `content/jobs`, and `content/education` hold typed Markdown content.
- `content-collections.ts` defines frontmatter schemas for all content types.

## Conventions

- Prefer content changes in Markdown over hardcoding project, leadership, or education entries in route components.
- Use existing CSS custom properties and shared classes before adding one-off utility combinations.
- Keep interactions accessible with visible focus states, semantic HTML, and reduced-motion support.
- Use `lucide-react` for interface icons.
- Keep route components focused on composition and move reusable logic into `src/lib` when needed.

## Contact Workflow

The contact form submits to FormSubmit's AJAX endpoint. Any form-field changes must be reflected in the JSON payload and FormSubmit fields.

## Validation

The deployment pipeline installs dependencies and runs the production build. Avoid committing generated build output such as `dist` or `.tanstack` artifacts.
