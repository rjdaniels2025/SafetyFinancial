# WeWin Consulting Group — Brand & Website Guide

This guide defines the WeWin visual identity so the website, marketing materials, client documents and future
digital platforms stay consistent.

## Positioning

A sophisticated financial consulting firm built around three core service categories:

1. **Debt Solutions & Credit Counselling**
2. **Business Funding Solutions**
3. **Corporate & Personal Financial Strategies**

Brand attributes: **clarity, credibility, discretion, strategic thinking.**

## Logo

| File | Use |
| --- | --- |
| `public/brand/wewin-logo.png` | Primary horizontal logo on light backgrounds (transparent PNG) |
| `public/brand/wewin-logo-reversed.png` | Horizontal logo on navy or dark backgrounds (transparent PNG) |
| `public/brand/wewin-mark.svg` | Symbol only, navy tile — favicons, social avatars, document headers |
| `public/brand/wewin-mark-reversed.svg` | Symbol only, light tile — for dark backgrounds |
| `public/brand/wewin-mark-512.png` | Square symbol for profile images and app icons |

**The mark:** a "W" drawn as a single continuous stroke whose final line rises above its starting point —
a quiet signal of forward progress. It always appears in brass on a navy (or paper) rounded tile.

**Wordmark:** "WeWin" in Source Serif 4 Semibold, with "CONSULTING GROUP" in Inter Semibold, uppercase,
letter-spaced 0.24em, beneath it.

**Do:** keep clear space around the logo of at least half the height of the "W" tile; use the reversed
version on dark backgrounds.
**Don't:** recolour the mark, stretch it, add effects (shadows, gradients, glows), or set the name as "We Win".

## Colour palette

| Name | Hex | Role |
| --- | --- | --- |
| Ink (navy) | `#0B1B2E` | Primary brand colour, headings, dark sections, primary buttons |
| Ink 800 | `#12263F` | Hover states on dark surfaces |
| Ink 700 | `#1B3354` | Secondary navy, illustration fills |
| Brass | `#A8834A` | Accent — the mark, numerals, rules. Use sparingly |
| Brass dark | `#7F6131` | Accent text on light backgrounds (eyebrows, links) |
| Brass light | `#D8C29B` | Accent text on navy backgrounds |
| Paper | `#F7F5F0` | Default page background |
| Paper dark | `#EEEAE1` | Subtle panels |
| Line | `#DDD7CB` | Borders and dividers |
| Muted | `#535D6B` | Body copy secondary text |

All text colour pairings used on the site meet WCAG 2.1 AA contrast. Brass `#A8834A` on white is only used for
large numerals (3:1 large-text threshold).

## Typography

- **Headings:** Source Serif 4 (Semibold 600). Tight tracking at display sizes.
- **Body & interface:** Inter (Regular 400, Medium 500, Semibold 600).
- **Eyebrow labels:** Inter Semibold, 12px, uppercase, letter-spacing 0.18em, Brass dark.

Both fonts are free (Google Fonts, SIL Open Font License) and can be installed for documents and presentations.

## Voice

- Clear and concise; explain complex topics in plain language.
- Measured and professional — no hype, fake urgency or exaggerated claims.
- Never promise outcomes (funding approval, settlements, credit score changes, insurance approval, tax savings).
- Position WeWin as consulting, education and referral; regulated work is done by licensed professionals.
- Don't invent testimonials, partnerships, licences, years of experience or statistics.

## Imagery

Restrained and professional. The site currently uses on-brand illustrations. To add photography, place optimized
images (WebP or JPG, ≤ 300 KB) in `public/images/` and set the paths in `src/config/site.ts` → `images`.
Prefer authentic photos of the team and workspace over generic stock.

---

## Updating website content

Most content can be changed by editing a single file; pushing to `main` on GitHub redeploys the site automatically
(about one minute).

| What | Where |
| --- | --- |
| Phone, email, address, hours, booking link, province, photography | `src/config/site.ts` |
| Core service names, summaries and homepage cards | `src/data/services.ts` |
| Debt package pricing, inclusions, exclusions and payment terms | `src/data/packages.ts` |
| Team members (About page section appears once filled in) | `src/data/team.ts` |
| Page copy | `src/pages/*.tsx` |
| Privacy Policy, Terms, Disclosures | `src/pages/LegalPages.tsx` |
| Retired URL redirects and security headers | `vercel.json` |

Anything left empty in `site.ts`, `packages.ts` (price) or `team.ts` is simply hidden — the site never displays
placeholder or unverified information.

### Environment variables (Vercel → Settings → Environment Variables)

| Variable | Purpose |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | Delivers form submissions to the firm's Telegram chat |
| `TELEGRAM_CHAT_ID` | The chat that receives submissions |
| `VITE_SITE_URL` | Public URL (e.g. `https://wewinconsulting.ca`) used for canonical links, sitemap and social previews |
