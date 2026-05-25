# v360 Web Assessment

This repo contains two projects built for the v360 web development assessment.

| Project | Live URL | Description |
|---------|----------|-------------|
| [`landing/`](./landing) | **[npesco.github.io/v360-web-assessment](https://npesco.github.io/v360-web-assessment/)** | WellCare — marketing landing page |
| [`dashboard/`](./dashboard) | **[npesco.github.io/v360-web-assessment/dashboard](https://npesco.github.io/v360-web-assessment/dashboard/)** | Hospital rostering dashboard |

> GitHub Pages deployment is automatic — every push to `main` triggers the Actions workflow that builds both apps and publishes them to the `gh-pages` branch.

---

## Challenge 1 — WellCare Landing Page

**Live:** https://npesco.github.io/v360-web-assessment/

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

## Challenge 2 — Rostering Dashboard

**Live:** https://npesco.github.io/v360-web-assessment/dashboard/

### Run locally

```bash
cd dashboard
npm install
npm run dev
# → http://localhost:3000
```

---

## Deployment

Both projects deploy automatically via [`.github/workflows/deploy-landing.yml`](.github/workflows/deploy-landing.yml):

1. Builds `landing/` with `BASE_PATH=/v360-web-assessment`
2. Builds `dashboard/` with `BASE_PATH=/v360-web-assessment/dashboard`
3. Merges both static exports into a single `combined/` folder
4. Pushes to the `gh-pages` branch — GitHub Pages serves it live

**To enable GitHub Pages** (one-time, in repo Settings):
- Source → `Deploy from a branch` → branch: `gh-pages` → folder: `/ (root)`

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
│       └── deploy-landing.yml   # builds + deploys both projects
├── landing/                     # Challenge 1 — WellCare landing page
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/              # shadcn/ui components
│   ├── public/
│   ├── next.config.mjs
│   └── package.json
├── dashboard/                   # Challenge 2 — Rostering dashboard
│   ├── app/
│   ├── components/
│   ├── next.config.mjs
│   └── package.json
├── README.md
└── PROCESS.md
```
