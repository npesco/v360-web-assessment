# AI Usage & Process

## Tools used

One tool: **Claude (Anthropic)**. I used it through the Claude Code CLI, which runs inside VS Code and lets me approve or deny each file write before it lands.

I did not use v0, Copilot, or any template generators. The project was scaffolded from scratch with `create-next-app` and I added shadcn/ui components by hand via the CLI. The code you're reading was produced through the prompt-review-edit loop described below.

---

## How I worked with it

My pattern was: write a specific brief → read every line of the output → redirect with corrections → repeat.

The first prompt described WellCare as a product, named the sections I wanted (sticky nav, split hero with a roster mockup, features, stats, testimonials, pricing with billing toggle, FAQ, footer), and specified the teal palette from the dashboard. Claude generated the full `page.tsx` in one pass. I read it section by section and immediately had notes: the hero tagline was generic ("Hospital Rostering Made Simple"), the feature descriptions sounded like they were written for any SaaS product, and the stats section had placeholder numbers with no context.

From there it was targeted corrections. "Rewrite the hero headline to be more direct, less noun-stacked." "The testimonial quotes sound like press releases — rewrite them to sound like real nurses talking to a colleague." "The FAQ answer for Q5 uses the company name too many times." I treated Claude like a capable junior who produces good first drafts but needs editorial direction.

---

## What it got right

- The Tailwind responsive grid and breakpoint logic — correct on the first pass, no fixups
- Translating the dashboard's OKLCH CSS variables into matching tokens for the landing page
- The roster grid mockup inside the hero — the table structure with colour-coded AM/PM/Night shifts was exactly what I had in mind and worked at the first attempt
- The GitHub Actions YAML structure — I'd never deployed a Next.js monorepo to GitHub Pages before and the workflow it produced was correct, though I had to add the `basePath` fix myself

---

## What I had to catch and fix

**The `basePath` bug.** The first deployment had all the HTML loading `/_next/static/...` assets as absolute paths, which resolved to the wrong subdirectory on GitHub Pages. Claude didn't account for this. I caught it by tracing how the browser resolves absolute URLs under a project repo subdomain, then directed the fix: add `basePath: process.env.BASE_PATH || ''` to both configs and inject the right value in CI.

**The `generator: 'v0.app'` fingerprint.** The initial `layout.tsx` included a `generator` metadata field that would appear in every page's `<head>` and flag the code as coming from a template generator. I spotted it doing a manual file review and stripped it along with the `@vercel/analytics` dependency, which was also left over from the scaffold and silently fails outside Vercel.

**The billing toggle.** Claude's first version used a custom `<button>` with `bg-border` for the off state — a colour so close to the background it was invisible — and an absolutely-positioned knob without an explicit `left` value. I replaced the whole thing with a segmented control, which is unambiguous in every state.

**All the copy.** Feature descriptions, testimonial quotes, FAQ answers, and the hero tagline were rewritten by me. The AI version was grammatically fine but sounded like a template. I rewrote it to be more specific to hospital operations.

---

## The one decision I made that AI didn't

On mobile (360 px), the hero roster mockup — a seven-column table — can't render without horizontal scroll. Claude suggested hiding it and leaving the hero text alone. I disagreed. An empty hero on mobile loses the credibility signals the mockup is meant to provide. My call was to replace it with a **2 × 2 grid of metric cards** (Coverage Rate, Time Saved, Professionals, Fewer Conflicts) — same trust data, format that actually works at narrow widths. That was a design judgment, not a code suggestion.

---

## What I'd do with another day

Replace the CSS-drawn roster mockup in the hero with a real screenshot of the dashboard — the current one is accurate but a photo of the actual product is more convincing. Run Lighthouse, target 90+ on performance and accessibility, and fix whatever it flags. Add scroll-triggered entrance animations with Intersection Observer. Write a Playwright smoke test covering mobile menu, anchor scroll, and FAQ accordion — the kind of thing that would catch the toggle bug before it shipped.
