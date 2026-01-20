# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Documentation First

**ALWAYS refer to the `/docs/` directory before generating any code.** The docs contain project-specific guidelines, patterns, and requirements that must be followed. Review relevant documentation to ensure generated code aligns with established conventions and standards.

## Development Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint (uses flat config with next/core-web-vitals and next/typescript)
```

## Tech Stack

- **Next.js 16** with App Router
- **React 19**
- **TypeScript** (strict mode enabled)
- **Tailwind CSS v4** (uses `@import "tailwindcss"` syntax in CSS)
- **ESLint 9** with flat config (`eslint.config.mjs`)

## Project Structure

This project uses Next.js App Router. All routes and layouts go in the `app/` directory:
- `app/layout.tsx` - Root layout with Geist font configuration
- `app/page.tsx` - Home page component
- `app/globals.css` - Global styles with Tailwind and CSS custom properties for theming

## Path Aliases

Use `@/*` to import from the project root (configured in `tsconfig.json`).
