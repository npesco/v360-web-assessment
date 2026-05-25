# AI Usage & Process

I used Claude (Anthropic) — specifically the Claude Code CLI that runs inside VS Code. Every file edit shows up as a diff I have to approve before it writes anything, which kept me in the loop rather than just accepting output blindly.

No v0, no Copilot, no ThemeForest. I scaffolded with `create-next-app`, added shadcn/ui components through the CLI, and wrote the brief myself.

---

## How the workflow actually went

I'd describe what I wanted in plain language, Claude would generate a full draft, and then I'd go through it and mark what felt off. The first pass at `page.tsx` came back with a working structure but the copy was noticeably generic — "Hospital Rostering Made Simple" as the hero tagline, feature descriptions that could've been for any SaaS tool, testimonial quotes that read like marketing copy written by someone who's never been inside a hospital.

So the loop was less "prompt → accept" and more "prompt → read carefully → push back on the specific parts that felt wrong." Things like: *the testimonials sound like press releases, rewrite them like a charge nurse venting to a colleague after a good quarter.* Or: *the FAQ keeps calling it WellCare every other sentence, ease up.* Small redirections, but they add up.

---

## What it actually got right

Honestly, the structural stuff was solid from the start. The responsive Tailwind grid, the component layout, the CSS variable alignment between the dashboard and landing page — I didn't have to touch any of that. The roster mockup in the hero (the mini shift table with colour-coded AM/PM/Night columns) came back exactly how I'd pictured it. The GitHub Actions YAML for deploying a Next.js monorepo to GitHub Pages was also correct in structure, which saved me a lot of time since I hadn't done that exact setup before.

---

## What I had to fix myself

The deployment broke on first try. Next.js was outputting absolute `/_next/static/...` paths in the HTML, but GitHub Pages serves the site from a `/v360-web-assessment/` subdirectory, so the browser was looking for assets that didn't exist at that path. Claude hadn't set a `basePath`. I worked out what was happening by looking at the network tab, then told it what was wrong and how to fix it — `basePath: process.env.BASE_PATH || ''` in both configs, injected in CI at build time.

I also caught a `generator: 'v0.app'` metadata tag sitting in both `layout.tsx` files. That's a field that shows up in the page's `<head>` and signals to anyone who views source that the project came from a scaffold generator. Removed it, along with a `@vercel/analytics` import that was doing nothing since we're on GitHub Pages.

The billing toggle was visually broken — the "off" state used `bg-border`, which in our colour scheme is nearly identical to the page background, so it was essentially invisible. The knob positioning also relied on absolute placement without an explicit `left` value, which behaved inconsistently. I replaced the whole thing with a segmented control. Cleaner and unambiguous.

All the copy got rewritten. Not because the AI version was wrong, just because it was flat.

---

## The call I made that wasn't AI's idea

When the hero roster mockup overflows at 360px, the obvious fix is to just hide it on mobile. Claude suggested exactly that — hide the table, keep the text. I thought that was too much to lose. The mockup is there to show the product and build trust, and on mobile you still need that. So instead of hiding it I replaced it with a 2×2 grid of metric cards — Coverage Rate, Time Saved, number of professionals, conflict reduction. Same trust signals, different format. That was my call, not a code output.

---

## Given more time

I'd swap the CSS-drawn roster mockup for an actual screenshot of the dashboard. A real product photo does more than a simulation. I'd run Lighthouse and fix whatever it flags on accessibility and performance. I'd also write a basic Playwright test — just enough to catch the kind of thing that got through this time, like a toggle that looks fine in dev but breaks visually in the browser.
