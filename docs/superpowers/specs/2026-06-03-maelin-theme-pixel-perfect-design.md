# Maelin Theme — Pixel-Perfect Design Spec

**Date:** 2026-06-03
**Goal:** Update the existing Shopify Dawn theme sections to pixel-perfect match the reference design at `maelin-homepage-preview.html`.
**Approach:** Section-by-section CSS + markup updates. Preserve all existing Shopify schema infrastructure.

---

## 1. Global CSS (`assets/custom-maelin.css`)

### New design tokens

```css
--maelin-gold-soft: #D4B96A;
--maelin-gold-dark: #8B6914;
--maelin-gold-muted: rgba(184,134,11,0.15);
--maelin-ink-medium: #6A6A6A;
--maelin-ink-faded: #9A9A9A;
--maelin-bone: #E8E2D8;
--maelin-border: #E5DFD5;
```

### Button overhaul

Replace `opacity: 0.8` hover with animated gold slide-in:

- `.maelin-btn--primary`: Add `position: relative; overflow: hidden; border: 1px solid var(--maelin-dark); transition: all 0.4s cubic-bezier(0.4,0,0.2,1);`
- `.maelin-btn--primary::before`: Gold background pseudo-element, `left: -100%` by default, slides to `left: 0` on hover via `z-index: -1`
- `.maelin-btn--primary:hover`: `border-color: var(--maelin-gold);`
- `.maelin-btn--secondary` hover: `border-color: var(--maelin-dark); background: var(--maelin-dark); color: var(--maelin-cream-1);`
- Font size: `1rem` (10px), letter-spacing: `0.35rem` (3.5px), font-weight: `400`

### Section label update

Change to match reference's `section-label`:
- `font-size: 1.2rem` (12px)
- `letter-spacing: 0.5rem` (5px)
- `color: var(--maelin-gold-dark)` (not gold)

---

## 2. Index Template (`templates/index.json`)

### Remove

- `featured_strip` section (circle thumbnails — not in reference)

### New order

1. `hero_split`
2. `gallery_grid` (reference's "Featured Portfolio Strip")
3. `marquee_ticker`
4. `bento_gallery` (reference's "Full Collection Gallery")
5. `story_section`
6. `process_steps`
7. `testimonial`
8. `cta_banner`

---

## 3. Hero Split (`sections/hero-split.liquid`)

### Layout

- Change from CSS Grid to Flexbox: `display: flex; align-items: center; min-height: 92vh;`
- Left: `flex: 0 0 48%; padding: 0 6rem 0 8rem; max-width: 62rem;`
- Right: `flex: 1; display: flex; align-items: center; justify-content: center; padding: 6rem;`

### Ornate gold frame

Replace simple `border: 4px solid gold` with multi-layer box-shadow:

```css
border: 3px solid var(--maelin-gold);
box-shadow:
  inset 0 0 0 8px var(--maelin-cream-2),
  inset 0 0 0 9px rgba(184,134,11,0.3),
  0 0 0 3px var(--maelin-gold-soft),
  0 0 0 6px var(--maelin-gold-muted),
  0 20px 60px rgba(0,0,0,0.08),
  0 8px 24px rgba(0,0,0,0.04);
```

### Painting label

Add below the frame (absolute positioned, centered):

```html
<div class="hero-split__painting-label">
  <div class="hero-split__painting-name">{{ section.settings.painting_name }}</div>
  <div class="hero-split__painting-meta">{{ section.settings.painting_meta }}</div>
</div>
```

- `.painting-name`: serif, 15px, italic, ink color
- `.painting-meta`: sans, 9px, letter-spacing 3px, uppercase, faded color

### Ambient glow

Add `::before` pseudo on right container:
```css
background: radial-gradient(ellipse, rgba(184,134,11,0.06) 0%, transparent 70%);
```

### Schema additions

- `painting_name` (text, default: "Golden Elegance")
- `painting_meta` (text, default: "Oil on Canvas — 40 x 50 cm")

### Buttons

- Horizontal flex with `gap: 1.6rem` (currently column with 1.2rem gap)
- Aspect ratio on frame: `aspect-ratio: 4/5; max-width: 42rem;`

### Responsive

- At `989px`: Stack vertically, center text, reduce frame max-width to `36rem`
- At `749px`: Frame `30rem`, tighter padding

---

## 4. Gallery Grid (`sections/gallery-grid.liquid`)

### Card styling

- Aspect ratio: `4/5` (currently `1:1`)
- Remove `border-radius: 0.8rem`
- Add `border: 1px solid var(--maelin-border)`
- Gap: `1.6rem` (currently `2rem`)

### Hover effects

- `transform: translateY(-4px)` + `box-shadow: 0 12px 40px rgba(0,0,0,0.06)`
- Transition: `0.5s cubic-bezier(0.4,0,0.2,1)`

### Overlay

- Change from full solid overlay to bottom gradient:
  `background: linear-gradient(transparent, rgba(26,26,26,0.7));`
- Only covers bottom portion, not full `inset: 0`
- Transition: `opacity 0.5s`

### Price field

- Add `price` text setting to block schema
- Display: serif, 14px, `var(--maelin-gold-light)`, `margin-top: 0.6rem`

### Gallery link

- Add `border-bottom: 1px solid var(--maelin-gold)` underline
- Hover: `color: var(--maelin-gold-dark)`

---

## 5. Marquee Ticker (`sections/marquee-ticker.liquid`)

### Separator

- Replace diamond (`&#9670;`) with gold dot:
  `width: 4px; height: 4px; border-radius: 50%; background: var(--maelin-gold);`

### Text styling

- Font: italic, using heading family (serif) instead of body
- `font-size: 1.5rem` (15px), `letter-spacing: 0.4rem` (4px)
- `color: var(--maelin-ink-faded)` (currently ink dark)
- `font-weight: 300; font-style: italic;`

### Spacing

- Item padding: `0 4.8rem` (currently `0 2rem`)
- Dot gap: `4.8rem` between items

---

## 6. Bento Gallery (`sections/bento-gallery.liquid`)

### Card styling

- Remove `border-radius: 0.8rem`
- Add `border: 1px solid var(--maelin-border)`

### Overlay

- Change from full solid to bottom gradient:
  `background: linear-gradient(transparent, rgba(26,26,26,0.65));`
- Position: absolute bottom, not `inset: 0`

### Price field

- Add `price` text setting to block schema
- Display: serif, 16px, `var(--maelin-gold-light)`, `margin-top: 0.8rem`

### Hover

- Inner content: `transform: scale(1.02)` with `0.7s` transition

### Price note

- Gold color on price value: use `<span>` with gold color

---

## 7. Story Section (`sections/story-section.liquid`)

### Stats row

Add stats as blocks:

```json
{
  "type": "stat",
  "name": "Stat",
  "settings": [
    { "type": "text", "id": "value", "label": "Value", "default": "500+" },
    { "type": "text", "id": "label", "label": "Label", "default": "Portraits Delivered" }
  ]
}
```

Stats row styling:
- `display: flex; gap: 5.6rem;`
- Separated by `border-top: 1px solid var(--maelin-border); padding-top: 4.4rem; margin-top: 4.4rem;`
- `.stat-value`: serif, `3.8rem`, gold color, `font-weight: 400`
- `.stat-label`: sans, `1rem`, letter-spacing `0.25rem`, uppercase, faded color

### Badge

- Positioned absolute `bottom: -1px; right: -1px` on image container
- Dark background, ivory text: `background: var(--maelin-dark); color: var(--maelin-cream-1);`
- `padding: 2.2rem 3.2rem;` `font-size: 1rem; letter-spacing: 0.5rem; text-transform: uppercase;`
- "Est." in ivory, year in gold
- Schema: `badge_text` (text, default: "Est."), `badge_highlight` (text, default: "2026")

### Layout

- Grid gap: `10rem` (currently `8rem`)
- Body text: italic serif styling (`font-family: var(--font-heading-family); font-style: italic;`)
- Image container: `position: relative; overflow: hidden; border: 1px solid var(--maelin-border);`

---

## 8. Process Steps (`sections/process-steps.liquid`)

### Connecting line

- Gold gradient instead of solid grey:
  `background: linear-gradient(90deg, transparent, var(--maelin-gold-muted), var(--maelin-gold-muted), transparent);`
- Position: `top: 3rem; left: 15%; right: 15%;`

### Circle hover

- On `.process-steps__step:hover .process-steps__icon-wrapper`:
  `background: var(--maelin-gold);`
- Icon SVG on hover: `fill: #fff` / `color: #fff`
- Transition: `all 0.4s`

### Body text

- Font: `font-family: var(--font-heading-family); font-style: italic;`
- `font-size: 1.5rem; font-weight: 300; line-height: 1.8;`
- `color: var(--maelin-ink-medium);`

### Header body text

- Add `body_text` textarea setting to schema (reference has subtitle text below heading)
- Italic serif, centered, `max-width: 56rem; margin: 0 auto;`

---

## 9. Testimonial (`sections/testimonial-section.liquid`)

### Quote mark

- `font-size: 8rem` (currently `4rem`)
- `opacity: 0.3`
- `line-height: 0.8; margin-bottom: 3.2rem;`

### Quote text

- `font-size: 2.2rem` (currently `2rem`)
- `line-height: 1.9`

### Author name

- Font: serif (heading family)
- `font-size: 1.5rem; letter-spacing: 0.3rem;`

### Author title

- `font-size: 1.1rem; letter-spacing: 0.15rem;`

---

## 10. CTA Banner (`sections/cta-banner.liquid`)

### Body text

- `font-family: var(--font-heading-family); font-style: italic;`
- `font-size: 1.8rem; line-height: 1.9; font-weight: 300;`

### Inner container

- `max-width: 78rem` (currently `70rem`)

---

## Files changed

| File | Action |
|------|--------|
| `assets/custom-maelin.css` | Update tokens, buttons, section-label |
| `templates/index.json` | Remove featured_strip, reorder |
| `sections/hero-split.liquid` | Flex layout, ornate frame, painting label, schema additions |
| `sections/gallery-grid.liquid` | 4:5 ratio, gradient overlay, price field, hover lift |
| `sections/marquee-ticker.liquid` | Gold dots, italic serif, spacing |
| `sections/bento-gallery.liquid` | Sharp corners, gradient overlay, price field |
| `sections/story-section.liquid` | Stats blocks, badge, gap increase, italic body |
| `sections/process-steps.liquid` | Gold gradient line, hover fill, body text setting |
| `sections/testimonial-section.liquid` | Larger quote mark, sizing adjustments |
| `sections/cta-banner.liquid` | Italic serif body, wider container |
| `sections/featured-strip.liquid` | Delete file |

## Out of scope

- Google Fonts loading (Playfair Display, Cormorant Garamond, Inter, Great Vibes) — these are configured through Shopify theme settings, not hardcoded
- SVG artwork (the reference uses inline SVGs as placeholder art — real images come from Shopify)
- Navigation/header structure — uses Dawn's built-in header section
- Footer structure — uses Dawn's built-in footer section with CSS overrides already in custom-maelin.css
- JavaScript interactions (nav scroll detection) — minimal, already handled by Dawn
