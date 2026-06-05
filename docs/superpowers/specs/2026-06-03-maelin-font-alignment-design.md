# Maelin Font Alignment — Match Reference Design

## Goal

Align all fonts in the Shopify Dawn theme to exactly match the reference design (`maelin-homepage-preview.html`), which uses 4 distinct font families with specific roles.

## Current State

The theme uses Shopify's 2 native font variables:
- `--font-heading-family` → Bodoni Moda (via `bodoni_moda_n4`)
- `--font-body-family` → Assistant (via `assistant_n4`)

All section styles reference one of these two variables, losing the distinction between Playfair Display and Cormorant Garamond that the reference design uses.

## Target State

Four custom CSS variables loaded via Google Fonts:

| Variable | Font | Role |
|---|---|---|
| `--serif` | Playfair Display | Headings, card titles, prices, stat values, testimonial name |
| `--serif-elegant` | Cormorant Garamond | Section labels, subtitles, body text, marquee, testimonial quote, step body |
| `--sans` | Inter | Nav, buttons, meta text, stat labels, announcement bar, base body |
| `--script` | Great Vibes | Footer logo script |

## Approach

**Google Fonts + custom CSS variables.** Load all 4 via a `<link>` tag in `theme.liquid`, define 4 CSS custom properties, and update all `font-family` references across sections.

## Changes

### 1. `layout/theme.liquid`

Add Google Fonts `<link>` in `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@200;300;400;500&family=Great+Vibes&display=swap" rel="stylesheet">
```

### 2. `assets/custom-maelin.css`

Add to `:root` block:

```css
--serif: 'Playfair Display', 'Georgia', serif;
--serif-elegant: 'Cormorant Garamond', 'Georgia', serif;
--sans: 'Inter', 'Helvetica Neue', Arial, sans-serif;
--script: 'Great Vibes', cursive;
```

Update global classes:
- `.maelin-section-label` → `var(--serif-elegant)`
- `.maelin-heading` → `var(--serif)`
- `.maelin-btn` → `var(--sans)`
- `.announcement-bar__message` → `var(--sans)`
- `.section-header .header__inline-menu .list-menu__item--link` → `var(--sans)`
- `.footer h2, .footer .footer-block__heading` → `var(--serif)`
- Footer logo script element → `var(--script)` (new class/rule for Great Vibes)
- `body` base → `var(--sans)`

### 3. Section-by-Section Font Mapping

**hero-split.liquid:**
- Hero tagline → `var(--serif-elegant)`
- Hero title → `var(--serif)`
- Hero subtitle → `var(--serif-elegant)`
- Painting name → `var(--serif)`
- Painting meta → `var(--sans)`

**gallery-grid.liquid / bento-gallery.liquid:**
- Section label → `var(--serif-elegant)`
- Section heading → `var(--serif)`
- Section body → `var(--serif-elegant)`
- Price note → `var(--sans)`
- Overlay title → `var(--serif)`
- Overlay meta → `var(--sans)`
- Overlay price → `var(--serif)`

**story-section.liquid:**
- Badge → `var(--sans)`
- Section label → `var(--serif-elegant)`
- Section heading → `var(--serif)`
- Section body → `var(--serif-elegant)`
- Stat value → `var(--serif)`
- Stat label → `var(--sans)`

**process-steps.liquid:**
- Section label → `var(--serif-elegant)`
- Section heading → `var(--serif)`
- Section body → `var(--serif-elegant)`
- Step title → `var(--serif)`
- Step body → `var(--serif-elegant)`

**testimonial-section.liquid:**
- Quote mark → `var(--serif)`
- Quote text → `var(--serif-elegant)`
- Name → `var(--serif)`
- Role → `var(--sans)`

**cta-banner.liquid:**
- Heading → `var(--serif)`

**marquee-ticker.liquid:**
- Marquee text → `var(--serif-elegant)`

## Out of Scope

- Font size, weight, letter-spacing, and line-height adjustments (only font-family changes)
- Color or layout changes
- Responsive behavior changes
- Shopify `settings_data.json` font picker changes (we're bypassing it with Google Fonts)
