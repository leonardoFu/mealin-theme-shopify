# Maelin Studio Design Clone for Dawn Theme

## Overview

Transform the Shopify Dawn theme to match the visual design of the Maelin Studio website (a luxury custom pet portraits brand). The goal is a pixel-perfect clone of the layout, typography, color palette, spacing, and interactions — using Dawn's architecture with custom Liquid sections where needed. Content will be placeholder (user fills in their own brand copy and images).

## Reference

- Target: `https://9b0dafa9967145cc9920da76503464e3.app.codebuddy.work`
- Brand: "Maelin Studio — Custom Pet Portraits in Oil"
- Aesthetic: Luxury art studio — warm cream backgrounds, gold accents, elegant serif headings, generous whitespace, square buttons

## Design Tokens

### Color Schemes (Dawn scheme system)

| Scheme | Purpose | Background | Text | Button | Button Label |
|--------|---------|-----------|------|--------|-------------|
| scheme-1 | Primary/cream | `#FDFCFA` | `#1A1A1A` | `#1A1A1A` | `#FDFCFA` |
| scheme-2 | Warm cream (hero, alternating) | `#F9F7F4` | `#1A1A1A` | `#1A1A1A` | `#F9F7F4` |
| scheme-3 | Darker cream (gallery, process) | `#F3EFE8` | `#1A1A1A` | `#1A1A1A` | `#F3EFE8` |
| scheme-4 | Dark (footer, testimonial, announcement) | `#1A1A1A` | `#FDFCFA` | `#FDFCFA` | `#1A1A1A` |

Accent color (gold): `#B8860B` — used for section labels, decorative elements, hover states, and the "Timeless" cursive text.

### Typography

- **Headings:** Bodoni Moda (Shopify font, closest to Playfair Display). Weight 400, negative letter-spacing (-0.3px to -0.5px on large headings).
- **Body:** Assistant or system sans-serif (closest to Inter). Weight 400, line-height ~1.6.
- **Decorative accent:** Italic Bodoni Moda for the cursive "Timeless" word (fallback from Great Vibes since we're using Shopify fonts only).
- **Section labels:** Uppercase, letter-spacing 3-4px, font-size 11-12px, gold color.
- **Button text:** Sans-serif, uppercase, letter-spacing 1.5-2px, font-size 11-12px.

### Spacing

- Section vertical padding: 120-130px
- Page max-width: 1200px (matches Dawn default)
- Grid gaps: 20-24px between gallery cards
- Button padding: 18px 48px (primary), 12px 28px (nav CTA)

### Buttons

- Border-radius: 0px (square)
- Primary: dark fill (`#1A1A1A`), light text, no border
- Secondary: transparent bg, dark border 1px, dark text
- Hover: subtle opacity or background shift

## Page Sections (top to bottom)

### 1. Announcement Bar (override existing)

- Dark background (`#1A1A1A`)
- Centered text with gold accent on key phrase (e.g., "HAND-PAINTED IN OIL ON CANVAS" in gold)
- Uppercase, letter-spacing 2px, font-size 11px
- Em-dash separators between phrases

### 2. Header / Navigation (override existing)

- Background: transparent initially, becomes `rgba(253, 252, 250, 0.92)` with backdrop-blur on scroll
- Logo: small brush-stroke icon, positioned left
- Nav links: centered horizontally — Home, Gallery, Process, About, Contact
- Link style: uppercase, letter-spacing 2px, font-size 11px, sans-serif
- CTA button: "Commission a Portrait" — dark bg, square, positioned right
- Sticky behavior: shrinks padding on scroll, adds semi-transparent background
- Mobile: hamburger menu drawer

### 3. Hero Split (new section: `hero-split.liquid`)

- Two-column layout: 45% text left, 55% image right
- Left column:
  - Gold section label: "CUSTOM PET OIL PORTRAITS" (uppercase, spaced)
  - Large heading (54px): multi-line with one word in decorative italic
  - Body paragraph in serif italic
  - Two buttons stacked: primary "Begin Your Portrait" + secondary "View Gallery"
- Right column:
  - Large portrait image in a gold-bordered frame (4px gold border)
  - Artist signature text below image (italic, small)
- Background: warm cream (`#F9F7F4`)
- Section padding: generous top/bottom (min 100px)

**Schema settings:** heading text, body text, image, button 1 text/link, button 2 text/link, section label text, accent word (for italic styling)

### 4. Featured Strip (new section: `featured-strip.liquid`)

- Horizontal row of 3 circular thumbnail images
- Small, centered, decorative — acts as a visual divider
- Circles ~60-80px diameter with subtle shadows
- Background: matches surrounding cream

**Schema settings:** 3 image pickers

### 5. Gallery Grid (new section: `gallery-grid.liquid`)

- Section label + heading (e.g., "RECENT COMMISSIONS" / "Our Clients' Treasured Portraits")
- "View Full Gallery" link aligned right with arrow
- 4-column grid of product/image cards
- Each card:
  - Square aspect ratio with rounded-corner inner image area
  - Cream/beige background
  - On hover: dark overlay fades in with product name (serif), details (size, medium), in white text
- Background: cream (`#FDFCFA`)

**Schema settings:** section label, heading, gallery link, 4-8 blocks (each with image, title, subtitle)

### 6. Marquee Ticker (new section: `marquee-ticker.liquid`)

- Infinite horizontal scrolling text strip
- Items separated by gold diamond/dot decorators
- Text: uppercase, letter-spacing 3px, sans-serif, ~12px
- Content examples: "DOG PORTRAITS", "CAT PORTRAITS", "OIL ON CANVAS", "HAND-PAINTED", "MUSEUM QUALITY"
- Smooth CSS animation, duplicated content for seamless loop
- Background: cream, thin top/bottom borders

**Schema settings:** repeater blocks for text items, speed setting, separator style

### 7. Bento Gallery (new section: `bento-gallery.liquid`)

- Section label + large heading centered: "Portraits That Tell a Story"
- Body text centered with pricing info ("Starting from $300 per portrait")
- Asymmetric grid layout:
  - Row 1: 1 large card (spans 2 rows on left), 2 medium cards (right column)
  - Row 2: large card continues, 2 medium cards below
- Cards have same hover overlay as gallery grid
- Background: darker cream (`#F3EFE8`)

**Schema settings:** section label, heading, body text, price text, 5 blocks (each with image, title, details)

### 8. Story Section (new section: `story-section.liquid`)

- Two-column: image left (or right, configurable), text right
- Text column:
  - Gold section label (e.g., "OUR STORY")
  - Large serif heading
  - Body paragraphs in regular weight
  - Optional CTA button
- Image: full-height of section, subtle rounded corners
- Background: primary cream (`#FDFCFA`)
- Large section padding (130px)

**Schema settings:** section label, heading, body richtext, image, image position (left/right), optional button

### 9. Process Steps (new section: `process-steps.liquid`)

- Section label + heading centered
- Connected horizontal line with 4 step markers
- Each step:
  - Circular icon with gold border (outlined circle, ~60px)
  - Simple line icon inside (upload, palette, brush, gift)
  - Step title (serif, 17px, weight 500)
  - Step description (sans-serif, 13-14px, muted color)
- Steps connected by a thin horizontal line
- Background: darker cream (`#F3EFE8`)

**Schema settings:** section label, heading, 4 blocks (each with icon, title, description)

### 10. Testimonial Section (new section: `testimonial-section.liquid`)

- Dark background (`#1A1A1A`)
- Large gold quotation marks (decorative, centered)
- Quote text: serif italic, ~20px, white with slight transparency
- Author name: uppercase, letter-spacing 2px, gold color, below quote
- Author title: small, muted white
- Optional: multiple testimonials with pagination dots
- Generous padding (130px+)

**Schema settings:** repeater blocks for testimonials (quote, author name, author title)

### 11. CTA Banner (new section: `cta-banner.liquid`)

- Centered layout on cream background
- Gold section label (e.g., "BEGIN YOUR JOURNEY")
- Large serif heading (multi-line)
- Two buttons: primary + secondary, centered
- Generous vertical padding

**Schema settings:** section label, heading, button 1 text/link, button 2 text/link

### 12. Footer (override existing: `footer.liquid`)

- Dark background (`#1A1A1A`)
- Top section: 3-column links layout
  - Column headers: uppercase, letter-spacing 1.5px, slightly muted white
  - Links: muted white (`rgba(255,255,255,0.6)`), hover to brighter
  - Columns: Shop, Company, Support
- Bottom section: logo, copyright, social icons
- Divider line between top and bottom (`rgba(255,255,255,0.1)`)

## Custom Assets

### CSS: `assets/custom-maelin.css`

Global overrides and custom section styles:
- CSS custom properties for gold accent, cream backgrounds
- Button reset (border-radius: 0)
- Section label styling (uppercase, tracked, gold)
- Gallery card hover overlay transitions
- Sticky nav transitions
- Marquee animation keyframes
- Typography overrides for heading scale and spacing

### JavaScript

- **Marquee animation:** CSS `@keyframes` with duplicated content for seamless loop. JS only needed for pause-on-hover if desired.
- **Sticky nav:** `IntersectionObserver` or scroll listener to toggle `.scrolled` class on nav. Adds background blur + reduces padding.
- **Gallery hover:** Pure CSS with `opacity` transition on overlay element. No JS needed.

## Template Configuration

### `templates/index.json`

Ordered section list:
1. `announcement-bar`
2. `header` (via header-group)
3. `hero-split`
4. `featured-strip`
5. `gallery-grid`
6. `marquee-ticker`
7. `bento-gallery`
8. `story-section`
9. `process-steps`
10. `testimonial-section`
11. `cta-banner`
12. `footer` (via footer-group)

### `config/settings_data.json` changes

- Color schemes: update scheme-1 through scheme-4 as defined above
- Heading font: `bodoni_moda_n4` (Bodoni Moda Regular)
- Body font: `assistant_n4` (keep current) or system sans-serif
- Heading scale: adjusted for larger display sizes
- Section spacing: 0 (custom sections handle their own padding)
- Button border-radius: 0 (if configurable, otherwise CSS override)

## Out of Scope

- Product pages, collection pages, cart — keep Dawn defaults
- Mobile-specific layouts beyond responsive behavior
- E-commerce functionality changes
- Third-party app integrations
- Image/content population (placeholder only)

## Success Criteria

- Homepage visually matches the target site layout, color palette, typography, and spacing
- All 12 sections render correctly with placeholder content
- Marquee scrolls smoothly and infinitely
- Nav becomes sticky with blur background on scroll
- Gallery cards show overlay on hover
- All sections are configurable via Shopify theme editor (schema settings)
- No Dawn core files broken — existing Dawn sections still work if re-added
