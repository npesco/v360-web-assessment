# v360 Web Assessment

This repo contains two projects built for the v360 web development assessment.

| Project | Live URL | Description |
|---------|----------|-------------|
| [`landing/`](./landing) | **[npesco-wellcare-landing.vercel.app](https://npesco-wellcare-landing.vercel.app/)** | WellCare — marketing landing page |
| [`dashboard/`](./dashboard) | **[npesco-wellcare-dashboard.vercel.app](https://npesco-wellcare-dashboard.vercel.app/)** | WellCare — rostering dashboard |

---

## Challenge 1 — WellCare Landing Page

**Live:** https://npesco-wellcare-landing.vercel.app/

### Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, `output: 'export'`) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Radix UI primitives) |
| Icons | Lucide React |
| Fonts | Geist via `next/font` |

### Run locally

```bash
cd landing
npm install
npm run dev
# → http://localhost:3000
```

### Build (static export)

```bash
cd landing
npm run build   # output → landing/out/
```

---

## Challenge 2 — WellCare Rostering Dashboard

**Live:** https://npesco-wellcare-dashboard.vercel.app/

### Run locally

```bash
cd dashboard
npm install
npm run dev
# → http://localhost:3000
```

---

## Deployment

Both projects are deployed on Vercel, each as a separate project with its respective subdirectory set as the Root Directory.

---

## AI usage & process

See **[PROCESS.md](./PROCESS.md)** for the full write-up covering:
- Which AI tools were used and for what
- The prompt → code → edit workflow
- What AI got right and what needed rewriting
- The single biggest design decision made independently
- What would be done with another day

---

## Repo structure

```
v360-web-assessment/
├── .github/
│   └── workflows/
├── landing/                     # Challenge 1 — WellCare landing page
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/              # shadcn/ui components
│   ├── public/
│   ├── next.config.mjs
│   └── package.json
├── dashboard/                   # Challenge 2 — WellCare rostering dashboard
│   ├── app/
│   ├── components/
│   ├── next.config.mjs
│   └── package.json
├── README.md
└── PROCESS.md
```
