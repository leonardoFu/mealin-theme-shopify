# Maelin Font Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all font-family references across the Maelin Shopify theme to use 4 Google Fonts (Playfair Display, Cormorant Garamond, Inter, Great Vibes) matching the reference design.

**Architecture:** Load all 4 fonts via a single Google Fonts `<link>` tag in `theme.liquid`, define 4 CSS custom properties (`--serif`, `--serif-elegant`, `--sans`, `--script`) in `custom-maelin.css`, then update every `font-family` declaration across 8 section files and the global CSS to use the correct variable per the reference design.

**Tech Stack:** Shopify Liquid, CSS custom properties, Google Fonts CDN

**Spec:** `docs/superpowers/specs/2026-06-03-maelin-font-alignment-design.md`

---

### Task 1: Load Google Fonts and Define CSS Variables

**Files:**
- Modify: `layout/theme.liquid:14-16` (add Google Fonts preconnect + link)
- Modify: `assets/custom-maelin.css:1-18` (add font variables to `:root`)

- [ ] **Step 1: Add Google Fonts link to theme.liquid**

After line 16 (`{%- endunless -%}`), add:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@200;300;400;500&family=Great+Vibes&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Add font CSS variables to custom-maelin.css `:root`**

Add these 4 variables inside the existing `:root` block (after line 17, before the closing `}`):

```css
--serif: 'Playfair Display', 'Georgia', serif;
--serif-elegant: 'Cormorant Garamond', 'Georgia', serif;
--sans: 'Inter', 'Helvetica Neue', Arial, sans-serif;
--script: 'Great Vibes', cursive;
```

- [ ] **Step 3: Commit**

```bash
git add layout/theme.liquid assets/custom-maelin.css
git commit -m "feat: load Google Fonts and define --serif, --serif-elegant, --sans, --script CSS variables"
```

---

### Task 2: Update Global Classes in custom-maelin.css

**Files:**
- Modify: `assets/custom-maelin.css`

These are the 6 `font-family` declarations in the global CSS that need updating.

- [ ] **Step 1: Update `.maelin-section-label` (line 21)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif-elegant);
```

- [ ] **Step 2: Update `.maelin-heading` (line 32)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif);
```

- [ ] **Step 3: Update `.maelin-btn` (line 54)**

```
OLD: font-family: var(--font-body-family);
NEW: font-family: var(--sans);
```

- [ ] **Step 4: Update `.announcement-bar__message` (line 137)**

```
OLD: font-family: var(--font-body-family);
NEW: font-family: var(--sans);
```

- [ ] **Step 5: Update `.section-header .header__inline-menu .list-menu__item--link` (line 182)**

```
OLD: font-family: var(--font-body-family);
NEW: font-family: var(--sans);
```

- [ ] **Step 6: Update `.footer h2, .footer .footer-block__heading` (line 223)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif);
```

- [ ] **Step 7: Commit**

```bash
git add assets/custom-maelin.css
git commit -m "feat: update global maelin classes to use new font variables"
```

---

### Task 3: Update hero-split.liquid Fonts

**Files:**
- Modify: `sections/hero-split.liquid`

- [ ] **Step 1: Update `.hero-split__heading` (line 27)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif);
```

- [ ] **Step 2: Update `.hero-split__body` (line 36)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif-elegant);
```

- [ ] **Step 3: Update `.hero-split__painting-name` (line 108)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif);
```

- [ ] **Step 4: Update `.hero-split__painting-meta` (line 116)**

```
OLD: font-family: var(--font-body-family);
NEW: font-family: var(--sans);
```

- [ ] **Step 5: Update `.hero-split__signature` (line 126)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif);
```

- [ ] **Step 6: Commit**

```bash
git add sections/hero-split.liquid
git commit -m "feat: hero-split fonts — Playfair headings, Cormorant body, Inter meta"
```

---

### Task 4: Update gallery-grid.liquid Fonts

**Files:**
- Modify: `sections/gallery-grid.liquid`

- [ ] **Step 1: Update `.gallery-grid__heading` (line 30)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif);
```

- [ ] **Step 2: Update `.gallery-grid__link` (line 38)**

```
OLD: font-family: var(--font-body-family);
NEW: font-family: var(--sans);
```

- [ ] **Step 3: Update `.gallery-grid__overlay-title` (line 98)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif);
```

- [ ] **Step 4: Update `.gallery-grid__overlay-subtitle` (line 106)**

```
OLD: font-family: var(--font-body-family);
NEW: font-family: var(--sans);
```

- [ ] **Step 5: Update `.gallery-grid__overlay-price` (line 114)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif);
```

- [ ] **Step 6: Commit**

```bash
git add sections/gallery-grid.liquid
git commit -m "feat: gallery-grid fonts — Playfair titles/prices, Inter meta/links"
```

---

### Task 5: Update bento-gallery.liquid Fonts

**Files:**
- Modify: `sections/bento-gallery.liquid`

- [ ] **Step 1: Update `.bento-gallery__body p` (line 22)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif-elegant);
```

- [ ] **Step 2: Update `.bento-gallery__price` (line 31)**

```
OLD: font-family: var(--font-body-family);
NEW: font-family: var(--sans);
```

- [ ] **Step 3: Update `.bento-gallery__overlay-title` (line 109)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif);
```

- [ ] **Step 4: Update `.bento-gallery__overlay-subtitle` (line 117)**

```
OLD: font-family: var(--font-body-family);
NEW: font-family: var(--sans);
```

- [ ] **Step 5: Update `.bento-gallery__overlay-price` (line 125)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif);
```

- [ ] **Step 6: Commit**

```bash
git add sections/bento-gallery.liquid
git commit -m "feat: bento-gallery fonts — Cormorant body, Playfair titles/prices, Inter meta"
```

---

### Task 6: Update story-section.liquid Fonts

**Files:**
- Modify: `sections/story-section.liquid`

- [ ] **Step 1: Update `.story-section__badge` (line 47)**

```
OLD: font-family: var(--font-body-family);
NEW: font-family: var(--sans);
```

- [ ] **Step 2: Update `.story-section__body` (line 68)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif-elegant);
```

- [ ] **Step 3: Update `.story-section__stat-value` (line 87)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif);
```

- [ ] **Step 4: Update `.story-section__stat-label` (line 95)**

```
OLD: font-family: var(--font-body-family);
NEW: font-family: var(--sans);
```

- [ ] **Step 5: Commit**

```bash
git add sections/story-section.liquid
git commit -m "feat: story-section fonts — Inter badge/labels, Cormorant body, Playfair stats"
```

---

### Task 7: Update process-steps.liquid Fonts

**Files:**
- Modify: `sections/process-steps.liquid`

- [ ] **Step 1: Update `.process-steps__header-body` (line 22)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif-elegant);
```

- [ ] **Step 2: Update `.process-steps__title` (line 87)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif);
```

- [ ] **Step 3: Update `.process-steps__description` (line 96)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif-elegant);
```

- [ ] **Step 4: Commit**

```bash
git add sections/process-steps.liquid
git commit -m "feat: process-steps fonts — Playfair titles, Cormorant body/descriptions"
```

---

### Task 8: Update testimonial-section.liquid Fonts

**Files:**
- Modify: `sections/testimonial-section.liquid`

- [ ] **Step 1: Update `.testimonial-section__quote` (line 46)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif-elegant);
```

- [ ] **Step 2: Update `.testimonial-section__author` (line 55)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif);
```

- [ ] **Step 3: Update `.testimonial-section__author-title` (line 65)**

```
OLD: font-family: var(--font-body-family);
NEW: font-family: var(--sans);
```

- [ ] **Step 4: Commit**

```bash
git add sections/testimonial-section.liquid
git commit -m "feat: testimonial fonts — Cormorant quotes, Playfair names, Inter roles"
```

---

### Task 9: Update cta-banner.liquid and marquee-ticker.liquid Fonts

**Files:**
- Modify: `sections/cta-banner.liquid`
- Modify: `sections/marquee-ticker.liquid`

- [ ] **Step 1: Update `.cta-banner__body` (cta-banner.liquid line 19)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif-elegant);
```

- [ ] **Step 2: Update `.marquee-ticker__item` (marquee-ticker.liquid line 27)**

```
OLD: font-family: var(--font-heading-family);
NEW: font-family: var(--serif-elegant);
```

- [ ] **Step 3: Commit**

```bash
git add sections/cta-banner.liquid sections/marquee-ticker.liquid
git commit -m "feat: CTA and marquee fonts — Cormorant Garamond for body/marquee text"
```

---

### Task 10: Add Footer Logo Script Font

**Files:**
- Modify: `assets/custom-maelin.css` (add new rule after the existing footer styles)

- [ ] **Step 1: Add `.footer-logo-script` rule**

After the `.footer .copyright` rule (around line 252), add:

```css
.footer-logo-script {
  font-family: var(--script);
}
```

This targets the footer logo text element that should render in Great Vibes per the reference design.

- [ ] **Step 2: Commit**

```bash
git add assets/custom-maelin.css
git commit -m "feat: footer logo script font — Great Vibes via --script variable"
```

---

### Task 11: Verify No Old Font Variables Remain

- [ ] **Step 1: Search for any remaining old font-family references**

```bash
grep -rn "font-heading-family\|font-body-family" assets/custom-maelin.css sections/hero-split.liquid sections/gallery-grid.liquid sections/bento-gallery.liquid sections/story-section.liquid sections/process-steps.liquid sections/testimonial-section.liquid sections/cta-banner.liquid sections/marquee-ticker.liquid
```

Expected: no output (all replaced).

- [ ] **Step 2: Verify the new variables are used correctly**

```bash
grep -rn "var(--serif)\|var(--serif-elegant)\|var(--sans)\|var(--script)" assets/custom-maelin.css sections/*.liquid
```

Expected: all font-family declarations across these files now use the new variables.

- [ ] **Step 3: Open the site in a browser and visually verify fonts match the reference**

Check each section:
- Hero: Playfair Display heading, Cormorant Garamond subtitle
- Gallery/Bento: Playfair titles, Inter meta
- Story: Cormorant body, Playfair stats, Inter labels
- Process: Playfair titles, Cormorant descriptions
- Testimonial: Cormorant quotes, Playfair names, Inter roles
- Marquee: Cormorant italic text
- Nav/Footer: Inter links, Playfair footer headings
