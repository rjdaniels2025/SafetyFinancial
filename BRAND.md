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
| `public/brand/wewin-logo-reversed.png` | Horizontal logo on forest green or dark backgrounds (transparent PNG) |
| `public/brand/wewin-mark.svg` | Symbol only, forest green tile — favicons, social avatars, document headers |
| `public/brand/wewin-mark-reversed.svg` | Symbol only, light tile — for dark backgrounds |
| `public/brand/wewin-mark-512.png` | Square symbol for profile images and app icons |

**The mark:** a "W" drawn as a single continuous stroke whose final line rises above its starting point —
a quiet signal of forward progress. It appears in metallic silver on a forest green tile, or in forest green on a
silver-white tile when used on dark backgrounds.

**Wordmark:** "WeWin" in Source Serif 4 Semibold, with "CONSULTING GROUP" in Inter Semibold, uppercase,
letter-spaced 0.24em, beneath it.

**Do:** keep clear space around the logo of at least half the height of the "W" tile; use the reversed
version on dark backgrounds.
**Don't:** recolour the mark, stretch it, add effects (shadows, gradients, glows), or set the name as "We Win".

## Colour palette

Forest green, white and silver. Green carries the brand; silver is used for lines, highlights and text on green;
white keeps pages clean and open.

| Name (code token) | Hex | Role |
| --- | --- | --- |
| Forest green (`ink`) | `#123A26` | Primary brand colour, headings, dark sections, primary buttons |
| Forest 800 (`ink-800`) | `#184A31` | Hover states on dark surfaces |
| Forest 700 (`ink-700`) | `#1F5A3C` | Secondary green, illustration fills, the mark on light tiles |
| Green accent (`accent-dark`) | `#2A6E4B` | Accent text on white (eyebrows, links, gradients) |
| Silver (`accent`) | `#7D8A84` | Rules, numerals and focus rings. Use sparingly |
| Light silver (`accent-light`) | `#D3D9D6` | Accent text and icons on green backgrounds |
| Metallic silver | `#C9D0CD` | The "W" mark on green tiles |
| Silver tint (`accent-50`) | `#EEF3F0` | Notices and subtle highlighted panels |
| White | `#FFFFFF` | Primary page sections and cards |
| Silver white (`paper`) | `#F5F7F6` | Alternating page background |
| Silver white dark (`paper-dark`) | `#E9EDEB` | Subtle panels |
| Line (`line`) | `#D8DEDB` | Borders and dividers |
| Muted (`muted`) | `#56625C` | Secondary body text |

All text colour pairings used on the site meet WCAG 2.1 AA contrast. Silver `#7D8A84` is only used for large numerals
and decorative lines (3:1 large-text threshold); never set small text in silver on white — use the green accent instead.

## Typography

- **Headings:** Source Serif 4 (Semibold 600). Tight tracking at display sizes.
- **Body & interface:** Inter (Regular 400, Medium 500, Semibold 600).
- **Eyebrow labels:** Inter Semibold, 12px, uppercase, letter-spacing 0.18em, green accent.

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
| FSRA agent names and licence numbers, MGA, insurers, debt settlement registration | `src/config/site.ts` → `licensing` |
| Privacy Policy and Terms | `src/pages/LegalPages.tsx` |
| Disclosures (licensing, compensation, conflicts, complaints) | `src/pages/DisclosuresPage.tsx` |
| Retired URL redirects and security headers | `vercel.json` |

Anything left empty in `site.ts`, `packages.ts` (price) or `team.ts` is simply hidden — the site never displays
placeholder or unverified information.

### Environment variables (Vercel → Settings → Environment Variables)

| Variable | Purpose |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | Delivers form submissions to the firm's Telegram chat |
| `TELEGRAM_CHAT_ID` | The chat that receives submissions |
| `VITE_SITE_URL` | Public URL (e.g. `https://wewinconsulting.ca`) used for canonical links, sitemap and social previews |
