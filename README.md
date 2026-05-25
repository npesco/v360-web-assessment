# v360 Web Assessment

This repo contains two projects built for the v360 web development assessment:

| Project | Description |
|---------|-------------|
| [`landing/`](./landing) | **WellCare** — marketing landing page for a hospital rostering SaaS |
| [`dashboard/`](./dashboard) | Hospital rostering dashboard UI |

---

## Challenge 1 — WellCare Landing Page

Live: **[View on GitHub Pages →](https://npesco.github.io/v360-web-assessment/)**

### Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Fonts:** Geist (via `next/font`)

### Run locally

```bash
cd landing
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for production

```bash
cd landing
npm run build   # outputs to landing/out/
```

### Deploy

**Vercel (recommended — zero config):**
1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Set **Root Directory** to `landing`
4. Click Deploy — done

**GitHub Pages (automated via Actions):**  
Every push to `main` triggers `.github/workflows/deploy-landing.yml`, which builds the static export and deploys it to the `gh-pages` branch. No manual steps needed.

---

## AI process

### How I used AI

I used **Claude (Anthropic)** as an interactive coding assistant throughout this assessment. Here is an honest account of the workflow:

**What I prompted:**
- Initial scaffold: I described the product (hospital rostering SaaS, brand name WellCare) and asked for a full landing page with sticky nav, hero, features, pricing, FAQ, and footer sections.
- Colour palette: I asked Claude to align the landing page's CSS variables with those already established in the dashboard project so both products feel like one brand.
- Smooth scroll: One-line request — Claude added `scroll-behavior: smooth` to the `html` selector in globals.css.
- Reference quality bar: I shared the CareSync reference URL and asked Claude to review it, then improve the design to match the same density and polish without copying the layout or copy.
- Mobile audit: I described the 360 px requirement and Claude identified the roster table in the hero as an overflow risk, hid it below the `lg` breakpoint, and added a 2×2 metric card grid as a mobile-friendly substitute.
- Deployment: I asked for a static export config and a GitHub Actions workflow that deploys automatically on push.

**What I reviewed and changed:**
- Brand copy, product name, and all feature descriptions are my own.
- I reviewed every generated section and adjusted wording, trimmed padding values, and reordered sections to match my intended narrative flow.
- I chose the teal colour palette direction; Claude translated that into OKLCH CSS variables.

**My takeaway:**  
AI dramatically accelerates the scaffolding phase — structure, boilerplate, and responsive utility classes appear instantly. The judgment calls (what sections to include, what the brand voice sounds like, whether a layout reads clearly at 360 px) still require a human eye. I treated Claude as a fast pair-programmer: it wrote the first draft, I reviewed and directed the next iteration.

---

## Repo structure

```
v360-web-assessment/
├── landing/          # Challenge 1 — WellCare landing page
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/   # shadcn/ui components
│   ├── public/
│   ├── next.config.mjs
│   └── package.json
├── dashboard/        # Challenge 2 — Rostering dashboard
└── README.md
```
