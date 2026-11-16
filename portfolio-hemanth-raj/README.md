# Hemanth Raj — Full Stack Developer Portfolio

A production-quality, full-stack personal portfolio for **Hemanth Raj** (Full Stack Developer &
AWS Cloud Developer). Built as a real client/server application — not a static site — with a
React + TypeScript frontend, a Node/Express + MongoDB backend, an admin dashboard, live GitHub
integration, and a functional contact form.

GitHub profile used as the source of truth for projects: **https://github.com/StarlightSerena**

---

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons, React Router
**Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, bcrypt, Nodemailer, Zod
**Tooling:** ESLint, environment-based config, REST API, rate limiting, Helmet, CORS

---

## Folder Structure

```
portfolio/
├── client/                 # React + Vite + TS frontend
│   ├── src/
│   │   ├── components/     # Navbar, Footer, ProjectCard, admin/ (EntityManager, etc.)
│   │   ├── sections/       # Hero, About, Skills, Projects, Experience, Education, ...
│   │   ├── pages/          # Home, NotFound, admin/AdminLogin, admin/AdminDashboard
│   │   ├── context/        # AuthContext
│   │   ├── hooks/          # useTheme, useScrollSpy, useFetch
│   │   ├── lib/             # api.ts (fetch wrapper)
│   │   └── types/           # shared TypeScript interfaces
│   └── public/               # favicon, robots.txt, sitemap.xml, resume.pdf (add your own)
│
├── server/                 # Node + Express + TS backend
│   └── src/
│       ├── config/          # env.ts, db.ts
│       ├── models/          # Mongoose schemas
│       ├── controllers/     # Route handlers
│       ├── routes/          # Express routers
│       ├── middleware/      # auth, error handling, rate limiting
│       ├── services/        # githubService.ts, emailService.ts
│       ├── seed.ts          # Seeds admin user + real project/skill/education data
│       └── server.ts        # App entry point
│
└── package.json             # Root workspace scripts
```

---

## 1. Prerequisites

- Node.js 18+
- A MongoDB database — either local (`mongod`) or [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier works)
- (Optional) A GitHub personal access token for higher API rate limits
- (Optional) SMTP credentials (e.g. a Gmail App Password) for contact-form email notifications

---

## 2. Installation

From the repo root:

```bash
npm install --workspace server
npm install --workspace client
```

---

## 3. Environment Variables

Copy the example env file and fill in your own values:

```bash
cp server/.env.example server/.env
```

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

MONGODB_URI=mongodb://localhost:27017/hemanth-portfolio
# or an Atlas URI: mongodb+srv://<user>:<password>@cluster.mongodb.net/hemanth-portfolio

JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
COOKIE_NAME=portfolio_token

ADMIN_NAME=Hemanth Raj
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=choose_a_strong_password

GITHUB_USERNAME=StarlightSerena
GITHUB_TOKEN=              # optional, raises GitHub API rate limits

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=
EMAIL_PASSWORD=
EMAIL_TO=your.email@example.com

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

**Never commit `.env` — it's already in `.gitignore`.**

The client reads the API base URL from `VITE_API_URL` (optional — defaults to same-origin
`/api`, which works with the Vite dev proxy). For a separate frontend/backend deployment, create
`client/.env`:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

---

## 4. MongoDB Setup

**Local:**
```bash
mongod --dbpath /path/to/data
```

**Atlas:** create a free cluster, add your IP to the network access list, create a database user,
and copy the connection string into `MONGODB_URI`.

---

## 5. Seed the Database

This creates the admin user and populates real projects (sourced from the GitHub profile),
skills, education, experience, and achievements:

```bash
npm run seed --workspace server
```

---

## 6. Run Locally

From the repo root (runs both servers concurrently):

```bash
npm install   # installs root devDependency `concurrently`
npm run dev
```

Or run them separately:

```bash
npm run dev --workspace server   # http://localhost:5000
npm run dev --workspace client   # http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:5000` (see `client/vite.config.ts`).

---

## 7. Admin Dashboard

- URL: `http://localhost:5173/admin/login`
- Log in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set before running the seed script.
- From the dashboard you can manage Projects, Skills, Experience, Education, Achievements, and
  Contact Messages, and trigger a **GitHub Project Sync** that pulls your latest public repos into
  the Projects collection without overwriting manually-edited fields.

---

## 8. Resume

Place your resume PDF at:

```
client/public/resume.pdf
```

The "Download Resume" and "View Resume" buttons link directly to `/resume.pdf`.

---

## 9. GitHub API Setup (Optional but Recommended)

Unauthenticated GitHub API requests are limited to 60/hour. To raise this limit:

1. Create a [fine-grained personal access token](https://github.com/settings/tokens) with no
   special scopes (read-only public data is enough).
2. Set `GITHUB_TOKEN=your_token` in `server/.env`.

The backend caches GitHub responses for 10 minutes regardless, to minimize API calls.

---

## 10. API Reference

All routes are prefixed with `/api`.

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/auth/login` | — | Admin login (rate-limited) |
| POST | `/auth/logout` | — | Clear session cookie |
| GET | `/auth/me` | ✅ | Current admin user |
| GET | `/projects` | — | List projects (`?featured=true`, `?category=`) |
| GET | `/projects/:slug` | — | Single project |
| POST | `/projects` | ✅ | Create project |
| PUT | `/projects/:id` | ✅ | Update project |
| DELETE | `/projects/:id` | ✅ | Delete project |
| GET / POST / PUT / DELETE | `/skills[/:id]` | writes ✅ | Skill CRUD |
| GET / POST / PUT / DELETE | `/experience[/:id]` | writes ✅ | Experience CRUD |
| GET / POST / PUT / DELETE | `/education[/:id]` | writes ✅ | Education CRUD |
| GET / POST / PUT / DELETE | `/achievements[/:id]` | writes ✅ | Achievement CRUD |
| POST | `/contact` | — | Submit contact form (rate-limited) |
| GET | `/contact` | ✅ | List messages |
| PATCH | `/contact/:id/read` | ✅ | Toggle read state |
| DELETE | `/contact/:id` | ✅ | Delete message |
| GET | `/github/profile` | — | Live GitHub profile |
| GET | `/github/repositories` | — | Live GitHub repos |
| GET | `/github/stats` | — | Aggregated stats (stars, forks, top languages) |
| POST | `/github/sync` | ✅ | Sync repos into Projects collection |
| GET | `/profile` | — | Public profile document |
| GET | `/health` | — | Health check |

Authenticated routes accept either the httpOnly cookie (set on login) or an
`Authorization: Bearer <token>` header.

---

## 11. Security Notes

- Passwords are hashed with bcrypt (12 rounds)
- JWT stored in an httpOnly, `sameSite=lax` cookie (add `secure: true` automatically in production)
- Helmet sets standard security headers; CORS is scoped to `CLIENT_URL`
- Separate rate limits for general traffic, login attempts, and contact submissions
- All write endpoints validate input with Zod; contact form input is sanitized before storage
- No secrets are ever sent to or stored in the frontend — `.env` values stay server-side

---

## 12. Deployment

**Frontend → Vercel**
```bash
cd client
vercel deploy
```
Set `VITE_API_URL` to your deployed backend's `/api` URL in Vercel's environment variables.

**Backend → Render / Railway / AWS**
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Set all variables from `server/.env.example` in the platform's environment settings
- Set `CLIENT_URL` to your deployed frontend's origin (for CORS)

**Database → MongoDB Atlas**
- Use the Atlas connection string as `MONGODB_URI`
- Whitelist your backend host's IP (or `0.0.0.0/0` for platforms with dynamic IPs, scoped by a
  strong database user password)

After deploying, run the seed script once against the production database (locally, pointed at
the Atlas URI) to create the admin user and initial content.

---

## 13. What Was Intentionally Left Editable

Per the project brief, nothing was fabricated. Where verified data (e.g. professional employment
history, certifications, awards) wasn't available, those sections either use verified real data
(GitHub repos, MCA/BCA education) or are left as empty, editable collections — add real
achievements and experience entries any time through the admin dashboard.

---

© 2026 Hemanth Raj. All rights reserved.
