# AI Usage & Process Write-Up

## Which AI tools I used and for what

I used **Claude (Anthropic)** as my primary coding assistant throughout this assessment. I used it for:

- Generating the initial page structure (nav, hero, features, pricing, FAQ, footer) from a written brief
- Translating the dashboard's OKLCH CSS colour variables into matching tokens for the landing page
- Identifying and fixing mobile overflow issues at 360 px
- Writing the GitHub Actions deployment workflow YAML
- Wiring up the `output: 'export'` and `basePath` config so both projects build correctly for GitHub Pages

## How I integrated AI into my workflow

My cycle was: **brief → generate → review → redirect**.

1. I described the product concept (WellCare, hospital rostering, teal palette) and asked for a full scaffold.
2. I read through every section, identified what was generic or wrong, and gave targeted correction prompts ("the roster table will overflow at 360 px — fix it without removing the feature entirely").
3. I shared the CareSync reference URL and asked Claude to analyse the quality gap, then used that analysis to add the testimonials section and the billing toggle.
4. For deployment, I described the GitHub Pages subdirectory constraint, and Claude produced the workflow. I then caught the missing `basePath` issue — the first pass deployed assets at `/v360-web-assessment/_next/...` but the HTML referenced `/_next/...`, which broke the page. I directed Claude to fix it.

## What AI got right and what I had to fix

**Got right:** Tailwind responsive classes, TypeScript component structure, shadcn/ui Button usage, the GitHub Actions YAML skeleton, and the CSS variable alignment. The roster grid mockup inside the hero was generated correctly on the first attempt.

**Had to fix or rewrite:** The `basePath` was omitted from the first deployment config — I caught this by thinking through how GitHub Pages resolves absolute asset paths. The initial hero tagline ("Hospital Rostering Made Simple") was generic; I replaced it with "Smarter hospital rostering, less admin." All testimonial quotes and feature descriptions were rewritten to sound specific to hospital operations rather than generic SaaS.

## The single biggest decision I made myself

Hiding the full roster mockup below the `lg` breakpoint and replacing it with a **2 × 2 metric card grid** on mobile. AI flagged the overflow risk, but the design decision — showing four specific trust metrics (Coverage Rate, Time Saved, Professionals, Fewer Conflicts) instead of an empty hero on mobile — was mine. It preserves the credibility signals of the desktop mockup in a format that actually renders cleanly at 360 px.

## What I would do with another day

- Replace the CSS-built roster mockup with a real screenshot of the dashboard, exported as an optimised WebP with a drop shadow, so the "see it in action" promise is literal.
- Add Intersection Observer scroll animations so features, stats, and testimonials fade in as they enter the viewport.
- Run Lighthouse on both deployed URLs, target 90+ on performance and accessibility, and fix contrast ratios and image sizes accordingly.
- Write a Playwright smoke test that verifies the mobile menu opens, all four anchor links scroll to the correct section, and the FAQ accordion expands.
- Polish the dashboard's empty-state handling and add a loading skeleton so it reads well on slow connections.
