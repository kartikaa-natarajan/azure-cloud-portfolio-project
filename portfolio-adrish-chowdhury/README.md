# Portfolio: Adrish Chowdhury

A cinematic, streaming-style personal portfolio for **Adrish Chowdhury** (Cloud & AI Engineer), built with React, TypeScript, Vite, Tailwind CSS and Framer Motion.

Live site: https://portfolio-gray-xi-57.vercel.app

## Run locally

```bash
npm install
npm run dev      # development server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

Requires Node.js 18 or newer.

## Deploy

This is a static single-page app. Build with `npm run build` and serve the `dist/` folder.
Because the app uses client-side routes (for example `/project/eit`), the host must rewrite unknown paths to `index.html`. A `vercel.json` rewrite and a `public/_redirects` file are included for Vercel/Netlify-style hosts.

## Project structure

- `src/data/`: all editable content (profile, projects, skills, experience, journey)
- `src/components/`: reusable UI components
- `src/pages/`: home and project-detail pages
- `public/`: images and the resume PDF

## Contact form

The form validates its input but only sends when `formEndpoint` is set in `src/data/profile.ts` (for example a Formspree URL). Until then it shows that no backend is configured.
