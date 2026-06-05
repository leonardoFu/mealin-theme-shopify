# Maelin Theme Pixel-Perfect Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the Shopify Dawn theme to pixel-perfect match the Maelin reference design (`/Users/leonardofu/Downloads/maelin-homepage-preview.html`).

**Architecture:** Section-by-section CSS and markup updates to existing Liquid files, plus global CSS token/button overhaul. No new sections created — only existing ones updated. One file deleted (`featured-strip.liquid`).

**Tech Stack:** Shopify Liquid, CSS (no preprocessor), Shopify JSON templates

**Font-size note:** Dawn's root is `calc(var(--font-body-scale) * 62.5%)` = 10px base, so `1rem = 10px`. All rem values in this plan follow that mapping.

**Reference design:** `/Users/leonardofu/Downloads/maelin-homepage-preview.html` — open this file in a browser to visually verify each task.

---

### Task 1: Global CSS — Design Tokens & Section Label

**Files:**
- Modify: `assets/custom-maelin.css:1-20` (tokens block)
- Modify: `assets/custom-maelin.css:13-20` (section label)

- [ ] **Step 1: Add new design tokens to `:root`**

In `assets/custom-maelin.css`, add these tokens inside the existing `:root` block after `--maelin-section-padding-mobile`:

```css
--maelin-gold-soft: #D4B96A;
--maelin-gold-dark: #8B6914;
--maelin-gold-muted: rgba(184,134,11,0.15);
--maelin-ink-medium: #6A6A6A;
--maelin-ink-faded: #9A9A9A;
--maelin-bone: #E8E2D8;
--maelin-border: #E5DFD5;
```

- [ ] **Step 2: Update `.maelin-section-label`**

Replace the existing `.maelin-section-label` block:

```css
.maelin-section-label {
  font-family: var(--font-heading-family);
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.5rem;
  text-transform: uppercase;
  color: var(--maelin-gold-dark);
  margin-bottom: 1.8rem;
  font-style: normal;
}
```

Key changes: heading font family (serif), `1.2rem` size, `0.5rem` letter-spacing, `--maelin-gold-dark` color.

- [ ] **Step 3: Verify visually**

Open the theme in a browser. All section labels across the page should now use the serif font, be slightly larger, with wider letter-spacing and a darker gold color.

- [ ] **Step 4: Commit**

```bash
git add assets/custom-maelin.css
git commit -m "style: add design tokens and update section label to match reference"
```

---

### Task 2: Global CSS — Button Overhaul

**Files:**
- Modify: `assets/custom-maelin.css:42-75` (button styles)

- [ ] **Step 1: Replace the entire button block**

Replace everything from `.maelin-btn {` through `.maelin-btn--nav {` (lines 42–75) with:

```css
.maelin-btn {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-body-family);
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.35rem;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.maelin-btn--primary {
  background: var(--maelin-dark);
  color: var(--maelin-cream-1);
  border: 1px solid var(--maelin-dark);
  padding: 1.8rem 4.8rem;
  position: relative;
  overflow: hidden;
}

.maelin-btn--primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--maelin-gold);
  transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.maelin-btn--primary:hover::before {
  left: 0;
}

.maelin-btn--primary:hover {
  border-color: var(--maelin-gold);
}

.maelin-btn--primary span,
.maelin-btn--primary svg {
  position: relative;
  z-index: 1;
}

.maelin-btn--secondary {
  background: transparent;
  color: var(--maelin-dark);
  border: 1px solid var(--maelin-bone);
  padding: 1.8rem 4.8rem;
}

.maelin-btn--secondary:hover {
  border-color: var(--maelin-dark);
  background: var(--maelin-dark);
  color: var(--maelin-cream-1);
}

.maelin-btn--nav {
  padding: 1.2rem 2.8rem;
}
```

- [ ] **Step 2: Remove old `.maelin-btn:hover` rule**

Delete the old hover rule (was `opacity: 0.8`). It's replaced by the specific hover rules above.

- [ ] **Step 3: Verify visually**

Open the theme in a browser. Hover over primary buttons — gold should slide in from the left. Hover over secondary buttons — they should fill dark.

- [ ] **Step 4: Commit**

```bash
git add assets/custom-maelin.css
git commit -m "style: overhaul button hover to animated gold slide-in"
```

---

### Task 3: Index Template — Remove Featured Strip & Reorder

**Files:**
- Modify: `templates/index.json`
- Delete: `sections/featured-strip.liquid`

- [ ] **Step 1: Rewrite `templates/index.json`**

Replace the entire file contents with:

```json
{
  "layout": "theme",
  "sections": {
    "hero_split": {
      "type": "hero-split",
      "settings": {}
    },
    "gallery_grid": {
      "type": "gallery-grid",
      "blocks": {
        "card-1": { "type": "card", "settings": { "title": "Mysterious Gaze", "subtitle": "British Shorthair — 30 × 40 cm", "price": "$300" } },
        "card-2": { "type": "card", "settings": { "title": "Noble Spirit", "subtitle": "Arabian Horse — 50 × 60 cm", "price": "$480" } },
        "card-3": { "type": "card", "settings": { "title": "Cloud of Joy", "subtitle": "Poodle — 30 × 30 cm", "price": "$300" } },
        "card-4": { "type": "card", "settings": { "title": "Best Friends Forever", "subtitle": "Dog & Cat — 50 × 40 cm", "price": "$420" } }
      },
      "block_order": ["card-1", "card-2", "card-3", "card-4"],
      "settings": {}
    },
    "marquee_ticker": {
      "type": "marquee-ticker",
      "blocks": {
        "item-1": { "type": "text_item", "settings": { "text": "Dog Portraits" } },
        "item-2": { "type": "text_item", "settings": { "text": "Cat Portraits" } },
        "item-3": { "type": "text_item", "settings": { "text": "Oil on Canvas" } },
        "item-4": { "type": "text_item", "settings": { "text": "Hand-Painted" } },
        "item-5": { "type": "text_item", "settings": { "text": "Museum Quality" } },
        "item-6": { "type": "text_item", "settings": { "text": "Horse Portraits" } },
        "item-7": { "type": "text_item", "settings": { "text": "Heirloom Art" } }
      },
      "block_order": ["item-1", "item-2", "item-3", "item-4", "item-5", "item-6", "item-7"],
      "settings": { "speed": 35 }
    },
    "bento_gallery": {
      "type": "bento-gallery",
      "blocks": {
        "bento-1": { "type": "card", "settings": { "title": "Golden Elegance", "subtitle": "Oil on Canvas — 40 × 50 cm", "price": "$380" } },
        "bento-2": { "type": "card", "settings": { "title": "Mysterious Gaze", "subtitle": "Oil on Canvas — 30 × 40 cm", "price": "$300" } },
        "bento-3": { "type": "card", "settings": { "title": "Noble Spirit", "subtitle": "Oil on Canvas — 50 × 60 cm", "price": "$480" } },
        "bento-4": { "type": "card", "settings": { "title": "Cloud of Joy", "subtitle": "Oil on Canvas — 30 × 30 cm", "price": "$300" } },
        "bento-5": { "type": "card", "settings": { "title": "Best Friends Forever", "subtitle": "Oil on Canvas — 50 × 40 cm", "price": "$420" } }
      },
      "block_order": ["bento-1", "bento-2", "bento-3", "bento-4", "bento-5"],
      "settings": {}
    },
    "story_section": {
      "type": "story-section",
      "blocks": {
        "stat-1": { "type": "stat", "settings": { "value": "500+", "label": "Portraits Delivered" } },
        "stat-2": { "type": "stat", "settings": { "value": "12+", "label": "Master Artists" } },
        "stat-3": { "type": "stat", "settings": { "value": "98%", "label": "Client Satisfaction" } }
      },
      "block_order": ["stat-1", "stat-2", "stat-3"],
      "settings": {
        "image_position": "left"
      }
    },
    "process_steps": {
      "type": "process-steps",
      "blocks": {
        "step-1": { "type": "step", "settings": { "icon": "upload", "title": "Upload Your Photo", "description": "Share your favorite photograph. Our team will help select the perfect reference for your portrait." } },
        "step-2": { "type": "step", "settings": { "icon": "palette", "title": "Choose Your Style", "description": "Select from classic realism, impressionistic, or modern styles. Decide on size, framing, and special details." } },
        "step-3": { "type": "step", "settings": { "icon": "brush", "title": "Artist Creates", "description": "Your portrait is assigned to a specialist artist who paints your vision with oils on premium stretched canvas." } },
        "step-4": { "type": "step", "settings": { "icon": "gift", "title": "Receive & Cherish", "description": "Review progress updates, approve the final piece, and receive your portrait beautifully packaged." } }
      },
      "block_order": ["step-1", "step-2", "step-3", "step-4"],
      "settings": {}
    },
    "testimonial": {
      "type": "testimonial-section",
      "blocks": {
        "quote-1": { "type": "testimonial", "settings": { "quote": "When I unwrapped the portrait, I cried. They captured Max's spirit perfectly — the way he always tilted his head, that gentle wisdom in his eyes. It's not just a painting, it's a piece of my heart.", "author": "Sarah Mitchell", "author_title": "Golden Retriever Owner, London" } }
      },
      "block_order": ["quote-1"],
      "settings": {}
    },
    "cta_banner": {
      "type": "cta-banner",
      "settings": {}
    }
  },
  "order": [
    "hero_split",
    "gallery_grid",
    "marquee_ticker",
    "bento_gallery",
    "story_section",
    "process_steps",
    "testimonial",
    "cta_banner"
  ]
}
```

- [ ] **Step 2: Delete `sections/featured-strip.liquid`**

```bash
rm sections/featured-strip.liquid
```

- [ ] **Step 3: Commit**

```bash
git add templates/index.json
git rm sections/featured-strip.liquid
git commit -m "feat: remove featured-strip, reorder index sections to match reference"
```

---

### Task 4: Hero Split — Layout, Frame & Painting Label

**Files:**
- Modify: `sections/hero-split.liquid` (full rewrite of `<style>` block + markup additions + schema)

- [ ] **Step 1: Replace the `<style>` block**

Replace the entire `<style>...</style>` block (lines 1–78) with:

```css
<style>
  .hero-split {
    background-color: var(--maelin-cream-2);
    position: relative;
    min-height: 92vh;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .hero-split__grid {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .hero-split__content {
    flex: 0 0 48%;
    padding: 0 6rem 0 8rem;
    max-width: 62rem;
    position: relative;
    z-index: 2;
  }

  .hero-split__heading {
    font-size: clamp(3.6rem, 4.5vw, 5.8rem);
    font-family: var(--font-heading-family);
    font-weight: 400;
    letter-spacing: -0.05rem;
    line-height: 1.15;
    margin: 0 0 2.8rem;
    color: var(--maelin-dark);
  }

  .hero-split__body {
    font-family: var(--font-heading-family);
    font-style: italic;
    font-size: clamp(1.6rem, 1.8vw, 2rem);
    font-weight: 300;
    line-height: 1.9;
    color: var(--maelin-ink-medium);
    margin-bottom: 4.8rem;
    max-width: 48rem;
  }

  .hero-split__buttons {
    display: flex;
    gap: 1.6rem;
    flex-wrap: wrap;
  }

  .hero-split__image-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 6rem;
    min-height: 92vh;
  }

  .hero-split__image-wrapper::before {
    content: '';
    position: absolute;
    top: 15%;
    right: 10%;
    width: 65%;
    height: 70%;
    background: radial-gradient(ellipse, rgba(184,134,11,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-split__frame {
    position: relative;
    z-index: 1;
    border: 3px solid var(--maelin-gold);
    box-shadow:
      inset 0 0 0 8px var(--maelin-cream-2),
      inset 0 0 0 9px rgba(184,134,11,0.3),
      0 0 0 3px var(--maelin-gold-soft),
      0 0 0 6px var(--maelin-gold-muted),
      0 20px 60px rgba(0,0,0,0.08),
      0 8px 24px rgba(0,0,0,0.04);
    background: var(--maelin-cream-2);
    max-width: 42rem;
    width: 100%;
    aspect-ratio: 4 / 5;
    overflow: hidden;
  }

  .hero-split__frame img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-split__painting-label {
    position: absolute;
    bottom: -4.8rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    white-space: nowrap;
  }

  .hero-split__painting-name {
    font-family: var(--font-heading-family);
    font-size: 1.5rem;
    color: var(--maelin-dark);
    font-style: italic;
    font-weight: 400;
  }

  .hero-split__painting-meta {
    font-family: var(--font-body-family);
    font-size: 0.9rem;
    letter-spacing: 0.3rem;
    text-transform: uppercase;
    color: var(--maelin-ink-faded);
    margin-top: 0.4rem;
    font-weight: 300;
  }

  .hero-split__signature {
    font-family: var(--font-heading-family);
    font-style: italic;
    font-size: 1.2rem;
    color: var(--maelin-gold);
    text-align: right;
    margin-top: 0.8rem;
  }

  @media screen and (max-width: 989px) {
    .hero-split {
      min-height: auto;
      padding: 8rem 4rem;
      flex-direction: column;
    }

    .hero-split__content {
      flex: none;
      padding: 0;
      max-width: 100%;
      text-align: center;
      margin-bottom: 6rem;
    }

    .hero-split__body {
      margin-left: auto;
      margin-right: auto;
    }

    .hero-split__buttons {
      justify-content: center;
    }

    .hero-split__image-wrapper {
      flex: none;
      min-height: auto;
      padding: 0;
    }

    .hero-split__frame {
      max-width: 36rem;
      margin: 0 auto;
    }
  }

  @media screen and (max-width: 749px) {
    .hero-split {
      padding: 6rem 2.4rem;
    }

    .hero-split__frame {
      max-width: 30rem;
    }

    .hero-split__buttons {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
```

- [ ] **Step 2: Update the markup**

Replace the entire section markup (from `<section class="hero-split">` to `</section>`, lines 80–135) with:

```liquid
<section class="hero-split">
  <div class="hero-split__grid">
    <div class="hero-split__content">
      {%- if section.settings.section_label != blank -%}
        <p class="maelin-section-label">{{ section.settings.section_label }}</p>
      {%- endif -%}

      <h1 class="hero-split__heading">
        {%- assign words = section.settings.heading | split: ' ' -%}
        {%- for word in words -%}
          {%- if word == section.settings.accent_word -%}
            <em class="maelin-accent-italic">{{ word }}</em>
          {%- else -%}
            {{ word }}
          {%- endif -%}
          {%- unless forloop.last %} {% endunless -%}
        {%- endfor -%}
      </h1>

      {%- if section.settings.body_text != blank -%}
        <p class="hero-split__body">{{ section.settings.body_text }}</p>
      {%- endif -%}

      <div class="hero-split__buttons">
        {%- if section.settings.button_label_1 != blank -%}
          <a href="{{ section.settings.button_link_1 }}" class="maelin-btn maelin-btn--primary">
            <span>&larr; {{ section.settings.button_label_1 }}</span>
          </a>
        {%- endif -%}
        {%- if section.settings.button_label_2 != blank -%}
          <a href="{{ section.settings.button_link_2 }}" class="maelin-btn maelin-btn--secondary">
            {{ section.settings.button_label_2 }}
          </a>
        {%- endif -%}
      </div>
    </div>

    <div class="hero-split__image-wrapper">
      <div class="hero-split__frame">
        {%- if section.settings.image != blank -%}
          {{ section.settings.image | image_url: width: 900 | image_tag:
            loading: 'eager',
            fetchpriority: 'high',
            widths: '375, 550, 750, 900',
            sizes: '(min-width: 990px) 50vw, 100vw'
          }}
        {%- else -%}
          {{ 'image' | placeholder_svg_tag: 'placeholder-svg' }}
        {%- endif -%}

        {%- if section.settings.painting_name != blank -%}
          <div class="hero-split__painting-label">
            <div class="hero-split__painting-name">{{ section.settings.painting_name }}</div>
            {%- if section.settings.painting_meta != blank -%}
              <div class="hero-split__painting-meta">{{ section.settings.painting_meta }}</div>
            {%- endif -%}
          </div>
        {%- endif -%}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Update the schema**

Replace the `{% schema %}` block settings array to add the painting label fields (add after the existing `"signature"` setting):

```json
{
  "type": "text",
  "id": "painting_name",
  "label": "Painting name",
  "default": "Golden Elegance"
},
{
  "type": "text",
  "id": "painting_meta",
  "label": "Painting details",
  "default": "Oil on Canvas — 40 × 50 cm"
}
```

Also remove the `signature` setting from the schema (no longer used in markup).

- [ ] **Step 4: Verify visually**

Open the theme. Hero should show a split layout with ornate gold frame, painting label below, horizontal buttons, and ambient glow behind the image. Should fill ~92vh on desktop and stack on mobile.

- [ ] **Step 5: Commit**

```bash
git add sections/hero-split.liquid
git commit -m "feat: hero split — flex layout, ornate gold frame, painting label"
```

---

### Task 5: Gallery Grid — 4:5 Cards, Gradient Overlay, Price

**Files:**
- Modify: `sections/gallery-grid.liquid` (style block, markup, schema)

- [ ] **Step 1: Replace the `<style>` block**

Replace the entire `<style>...</style>` (lines 1–108) with:

```css
<style>
  .gallery-grid {
    background-color: var(--maelin-cream-1);
    padding: 9rem 6rem;
    border-top: 1px solid var(--maelin-border);
  }

  .gallery-grid__inner {
    max-width: var(--page-width);
    margin: 0 auto;
  }

  .gallery-grid__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 4rem;
  }

  .gallery-grid__header-left {
    display: flex;
    flex-direction: column;
  }

  .gallery-grid__header-left .maelin-section-label {
    margin-bottom: 1rem;
  }

  .gallery-grid__heading {
    font-family: var(--font-heading-family);
    font-size: 2.8rem;
    font-weight: 400;
    color: var(--maelin-dark);
    letter-spacing: -0.02rem;
  }

  .gallery-grid__link {
    font-family: var(--font-body-family);
    font-size: 1.1rem;
    letter-spacing: 0.25rem;
    text-transform: uppercase;
    color: var(--maelin-gold);
    text-decoration: none;
    font-weight: 400;
    transition: color 0.3s;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid var(--maelin-gold);
  }

  .gallery-grid__link:hover {
    color: var(--maelin-gold-dark);
  }

  .gallery-grid__cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.6rem;
  }

  .gallery-grid__card {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background-color: var(--maelin-cream-2);
    border: 1px solid var(--maelin-border);
    cursor: pointer;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s;
  }

  .gallery-grid__card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
  }

  .gallery-grid__card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .gallery-grid__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2.4rem 2rem;
    background: linear-gradient(transparent, rgba(26, 26, 26, 0.7));
    opacity: 0;
    transition: opacity 0.5s;
  }

  .gallery-grid__card:hover .gallery-grid__overlay {
    opacity: 1;
  }

  .gallery-grid__overlay-title {
    font-family: var(--font-heading-family);
    font-size: 1.5rem;
    font-weight: 400;
    color: #fff;
    margin-bottom: 0.4rem;
  }

  .gallery-grid__overlay-subtitle {
    font-family: var(--font-body-family);
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 0.2rem;
    text-transform: uppercase;
  }

  .gallery-grid__overlay-price {
    font-family: var(--font-heading-family);
    font-size: 1.4rem;
    color: var(--maelin-gold-light);
    margin-top: 0.6rem;
    font-weight: 400;
  }

  @media screen and (max-width: 1100px) {
    .gallery-grid__cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 749px) {
    .gallery-grid {
      padding: 6rem 2.4rem;
    }

    .gallery-grid__cards {
      grid-template-columns: 1fr 1fr;
      gap: 1.2rem;
    }
  }
</style>
```

- [ ] **Step 2: Replace the section markup**

Replace everything from `<section class="gallery-grid">` to `</section>`:

```liquid
<section class="gallery-grid">
  <div class="gallery-grid__inner">
    <div class="gallery-grid__header">
      <div class="gallery-grid__header-left">
        {%- if section.settings.section_label != blank -%}
          <p class="maelin-section-label">{{ section.settings.section_label }}</p>
        {%- endif -%}
        {%- if section.settings.heading != blank -%}
          <h2 class="gallery-grid__heading">{{ section.settings.heading }}</h2>
        {%- endif -%}
      </div>
      {%- if section.settings.gallery_link_label != blank -%}
        <a href="{{ section.settings.gallery_link }}" class="gallery-grid__link">
          {{ section.settings.gallery_link_label }} &rarr;
        </a>
      {%- endif -%}
    </div>

    <div class="gallery-grid__cards">
      {%- for block in section.blocks -%}
        <div class="gallery-grid__card" {{ block.shopify_attributes }}>
          {%- if block.settings.image != blank -%}
            {{ block.settings.image | image_url: width: 600 | image_tag:
              loading: 'lazy',
              widths: '300, 450, 600',
              sizes: '(min-width: 1100px) 25vw, (min-width: 750px) 50vw, 50vw'
            }}
          {%- else -%}
            {{ 'image' | placeholder_svg_tag: 'placeholder-svg' }}
          {%- endif -%}
          <div class="gallery-grid__overlay">
            {%- if block.settings.title != blank -%}
              <h3 class="gallery-grid__overlay-title">{{ block.settings.title }}</h3>
            {%- endif -%}
            {%- if block.settings.subtitle != blank -%}
              <p class="gallery-grid__overlay-subtitle">{{ block.settings.subtitle }}</p>
            {%- endif -%}
            {%- if block.settings.price != blank -%}
              <p class="gallery-grid__overlay-price">{{ block.settings.price }}</p>
            {%- endif -%}
          </div>
        </div>
      {%- endfor -%}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add price to block schema**

In the `{% schema %}` blocks settings array, add after the `subtitle` setting:

```json
{
  "type": "text",
  "id": "price",
  "label": "Price",
  "default": "$300"
}
```

- [ ] **Step 4: Verify visually**

Cards should be 4:5 portrait ratio with sharp corners and subtle border. Hovering lifts the card and reveals a gradient overlay from bottom with title, subtitle, and gold price.

- [ ] **Step 5: Commit**

```bash
git add sections/gallery-grid.liquid
git commit -m "feat: gallery grid — 4:5 ratio, gradient overlay, price, hover lift"
```

---

### Task 6: Marquee Ticker — Gold Dots & Italic Serif

**Files:**
- Modify: `sections/marquee-ticker.liquid` (style + markup)

- [ ] **Step 1: Replace the `<style>` block**

Replace the entire `<style>...</style>` (lines 1–48) with:

```css
<style>
  .marquee-ticker {
    background-color: var(--maelin-cream-1);
    padding: 2.4rem 0;
    overflow: hidden;
    border-top: 1px solid var(--maelin-border);
    border-bottom: 1px solid var(--maelin-border);
  }

  .marquee-ticker__track {
    display: flex;
    width: max-content;
    animation: marquee-scroll {{ section.settings.speed }}s linear infinite;
  }

  .marquee-ticker__track:hover {
    animation-play-state: paused;
  }

  .marquee-ticker__group {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .marquee-ticker__item {
    font-family: var(--font-heading-family);
    font-size: 1.5rem;
    font-weight: 300;
    font-style: italic;
    letter-spacing: 0.4rem;
    text-transform: uppercase;
    color: var(--maelin-ink-faded);
    white-space: nowrap;
    padding: 0 4.8rem;
  }

  .marquee-ticker__dot {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background: var(--maelin-gold);
    flex-shrink: 0;
  }

  @keyframes marquee-scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
</style>
```

- [ ] **Step 2: Replace the markup**

Replace the `<div class="marquee-ticker">...</div>` block:

```liquid
<div class="marquee-ticker">
  <div class="marquee-ticker__track" aria-hidden="true">
    {%- for i in (1..2) -%}
      <div class="marquee-ticker__group">
        {%- for block in section.blocks -%}
          <span class="marquee-ticker__item" {{ block.shopify_attributes }}>{{ block.settings.text }}</span>
          <span class="marquee-ticker__dot"></span>
        {%- endfor -%}
      </div>
    {%- endfor -%}
  </div>
</div>
```

- [ ] **Step 3: Verify visually**

Gold dots between items, italic serif text in faded grey, smooth continuous scroll.

- [ ] **Step 4: Commit**

```bash
git add sections/marquee-ticker.liquid
git commit -m "feat: marquee ticker — gold dot separators, italic serif text"
```

---

### Task 7: Bento Gallery — Sharp Corners, Gradient Overlay, Price

**Files:**
- Modify: `sections/bento-gallery.liquid` (style, markup, schema)

- [ ] **Step 1: Replace the `<style>` block**

Replace the entire `<style>...</style>` (lines 1–129) with:

```css
<style>
  .bento-gallery {
    background-color: var(--maelin-cream-3);
    padding: var(--maelin-section-padding) 0;
  }

  .bento-gallery__header {
    text-align: center;
    max-width: var(--page-width);
    margin: 0 auto 2rem;
    padding: 0 5rem;
  }

  .bento-gallery__body {
    text-align: center;
    max-width: 60rem;
    margin: 0 auto 7.2rem;
    padding: 0 5rem;
  }

  .bento-gallery__body p {
    font-family: var(--font-heading-family);
    font-style: italic;
    font-size: 1.8rem;
    color: var(--maelin-ink-medium);
    line-height: 1.9;
    font-weight: 300;
  }

  .bento-gallery__price {
    font-family: var(--font-body-family);
    font-size: 1.1rem;
    letter-spacing: 0.3rem;
    text-transform: uppercase;
    color: var(--maelin-ink-faded);
    margin-top: 2.8rem;
    font-weight: 300;
  }

  .bento-gallery__price .gold {
    color: var(--maelin-gold);
    font-weight: 400;
  }

  .bento-gallery__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1.6rem;
    max-width: var(--page-width);
    margin: 0 auto;
    padding: 0 6rem;
  }

  .bento-gallery__card {
    position: relative;
    overflow: hidden;
    background-color: var(--maelin-cream-2);
    border: 1px solid var(--maelin-border);
    cursor: pointer;
    aspect-ratio: 4 / 5;
  }

  .bento-gallery__card-inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .bento-gallery__card:hover .bento-gallery__card-inner {
    transform: scale(1.02);
  }

  .bento-gallery__card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .bento-gallery__card--large {
    grid-row: 1 / 3;
    aspect-ratio: auto;
  }

  .bento-gallery__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2.8rem 2.4rem;
    background: linear-gradient(transparent, rgba(26, 26, 26, 0.65));
    opacity: 0;
    transition: opacity 0.5s;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .bento-gallery__card:hover .bento-gallery__overlay {
    opacity: 1;
  }

  .bento-gallery__overlay-title {
    font-family: var(--font-heading-family);
    font-size: 1.7rem;
    font-weight: 400;
    color: #fff;
    margin-bottom: 0.4rem;
  }

  .bento-gallery__overlay-subtitle {
    font-family: var(--font-body-family);
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 0.2rem;
    text-transform: uppercase;
  }

  .bento-gallery__overlay-price {
    font-family: var(--font-heading-family);
    font-size: 1.6rem;
    color: var(--maelin-gold-light);
    margin-top: 0.8rem;
    font-weight: 400;
  }

  @media screen and (max-width: 1100px) {
    .bento-gallery__grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
      padding: 0 3rem;
    }

    .bento-gallery__card--large {
      grid-row: auto;
      grid-column: 1 / -1;
      aspect-ratio: 4 / 5;
    }
  }

  @media screen and (max-width: 749px) {
    .bento-gallery__grid {
      grid-template-columns: 1fr;
      gap: 1.2rem;
      padding: 0 2.4rem;
    }

    .bento-gallery__header,
    .bento-gallery__body {
      padding: 0 3rem;
    }
  }
</style>
```

- [ ] **Step 2: Update the card markup to include inner wrapper and price**

Replace the card loop in the markup:

```liquid
<div class="bento-gallery__grid">
  {%- for block in section.blocks -%}
    <div class="bento-gallery__card{% if forloop.first %} bento-gallery__card--large{% endif %}" {{ block.shopify_attributes }}>
      <div class="bento-gallery__card-inner">
        {%- if block.settings.image != blank -%}
          {{ block.settings.image | image_url: width: 800 | image_tag:
            loading: 'lazy',
            widths: '400, 600, 800',
            sizes: '(min-width: 990px) 33vw, (min-width: 750px) 50vw, 100vw'
          }}
        {%- else -%}
          {{ 'image' | placeholder_svg_tag: 'placeholder-svg' }}
        {%- endif -%}
      </div>
      <div class="bento-gallery__overlay">
        {%- if block.settings.title != blank -%}
          <h3 class="bento-gallery__overlay-title">{{ block.settings.title }}</h3>
        {%- endif -%}
        {%- if block.settings.subtitle != blank -%}
          <p class="bento-gallery__overlay-subtitle">{{ block.settings.subtitle }}</p>
        {%- endif -%}
        {%- if block.settings.price != blank -%}
          <p class="bento-gallery__overlay-price">{{ block.settings.price }}</p>
        {%- endif -%}
      </div>
    </div>
  {%- endfor -%}
</div>
```

- [ ] **Step 3: Add price to block schema**

Add after the `subtitle` setting in the blocks settings array:

```json
{
  "type": "text",
  "id": "price",
  "label": "Price",
  "default": "$300"
}
```

- [ ] **Step 4: Verify visually**

Sharp-cornered cards with subtle border. First card spans 2 rows. Hover scales inner content and reveals gradient overlay with price in gold.

- [ ] **Step 5: Commit**

```bash
git add sections/bento-gallery.liquid
git commit -m "feat: bento gallery — sharp corners, gradient overlay, price, scale hover"
```

---

### Task 8: Story Section — Stats, Badge, Typography

**Files:**
- Modify: `sections/story-section.liquid` (style, markup, schema)

- [ ] **Step 1: Replace the `<style>` block**

Replace the entire `<style>...</style>` (lines 1–61) with:

```css
<style>
  .story-section {
    background-color: var(--maelin-cream-1);
    padding: var(--maelin-section-padding) 0;
  }

  .story-section__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10rem;
    align-items: center;
    max-width: var(--page-width);
    margin: 0 auto;
    padding: 0 6rem;
  }

  .story-section__grid--reversed {
    direction: rtl;
  }

  .story-section__grid--reversed > * {
    direction: ltr;
  }

  .story-section__image {
    position: relative;
    aspect-ratio: 3 / 4;
    background: var(--maelin-cream-3);
    border: 1px solid var(--maelin-border);
    overflow: hidden;
  }

  .story-section__image img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .story-section__badge {
    position: absolute;
    bottom: -1px;
    right: -1px;
    background: var(--maelin-dark);
    color: var(--maelin-cream-1);
    padding: 2.2rem 3.2rem;
    font-family: var(--font-body-family);
    font-size: 1rem;
    letter-spacing: 0.5rem;
    text-transform: uppercase;
    font-weight: 300;
    z-index: 1;
  }

  .story-section__badge span {
    color: var(--maelin-gold-light);
  }

  .story-section__content {
    max-width: 50rem;
  }

  .story-section__heading {
    margin: 1.6rem 0 2.4rem;
  }

  .story-section__body {
    font-family: var(--font-heading-family);
    font-style: italic;
    font-size: 1.8rem;
    line-height: 1.9;
    color: var(--maelin-ink-medium);
    margin-bottom: 3.2rem;
    font-weight: 300;
    max-width: 100%;
  }

  .story-section__stats {
    display: flex;
    gap: 5.6rem;
    margin-top: 4.4rem;
    padding-top: 4.4rem;
    border-top: 1px solid var(--maelin-border);
  }

  .story-section__stat-value {
    font-family: var(--font-heading-family);
    font-size: 3.8rem;
    color: var(--maelin-gold);
    font-weight: 400;
    line-height: 1;
  }

  .story-section__stat-label {
    font-family: var(--font-body-family);
    font-size: 1rem;
    letter-spacing: 0.25rem;
    text-transform: uppercase;
    color: var(--maelin-ink-faded);
    margin-top: 0.8rem;
    font-weight: 300;
  }

  @media screen and (max-width: 989px) {
    .story-section__grid {
      grid-template-columns: 1fr;
      gap: 4.8rem;
      padding: 0 3rem;
    }

    .story-section__grid--reversed {
      direction: ltr;
    }

    .story-section__image {
      max-width: 48rem;
    }
  }

  @media screen and (max-width: 749px) {
    .story-section__stats {
      flex-direction: column;
      gap: 2.8rem;
    }
  }
</style>
```

- [ ] **Step 2: Replace the section markup**

Replace everything from `<section class="story-section">` to `</section>`:

```liquid
<section class="story-section">
  <div class="story-section__grid{% if section.settings.image_position == 'right' %} story-section__grid--reversed{% endif %}">
    <div class="story-section__image">
      {%- if section.settings.image != blank -%}
        {{ section.settings.image | image_url: width: 800 | image_tag:
          loading: 'lazy',
          widths: '400, 600, 800',
          sizes: '(min-width: 990px) 50vw, 100vw'
        }}
      {%- else -%}
        {{ 'image' | placeholder_svg_tag: 'placeholder-svg' }}
      {%- endif -%}
      {%- if section.settings.badge_text != blank -%}
        <div class="story-section__badge">
          {{ section.settings.badge_text }} <span>{{ section.settings.badge_highlight }}</span>
        </div>
      {%- endif -%}
    </div>

    <div class="story-section__content">
      {%- if section.settings.section_label != blank -%}
        <p class="maelin-section-label">{{ section.settings.section_label }}</p>
      {%- endif -%}
      {%- if section.settings.heading != blank -%}
        <h2 class="maelin-heading maelin-heading--large story-section__heading">{{ section.settings.heading }}</h2>
      {%- endif -%}
      {%- if section.settings.body_text != blank -%}
        <div class="story-section__body">{{ section.settings.body_text }}</div>
      {%- endif -%}
      {%- if section.settings.button_label != blank -%}
        <a href="{{ section.settings.button_link }}" class="maelin-btn maelin-btn--primary">
          <span>{{ section.settings.button_label }}</span>
        </a>
      {%- endif -%}

      {%- assign stat_blocks = section.blocks | where: 'type', 'stat' -%}
      {%- if stat_blocks.size > 0 -%}
        <div class="story-section__stats">
          {%- for block in stat_blocks -%}
            <div {{ block.shopify_attributes }}>
              <div class="story-section__stat-value">{{ block.settings.value }}</div>
              <div class="story-section__stat-label">{{ block.settings.label }}</div>
            </div>
          {%- endfor -%}
        </div>
      {%- endif -%}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Update the schema**

Replace the entire `{% schema %}` block with:

```json
{
  "name": "Story Section",
  "tag": "section",
  "class": "section",
  "settings": [
    {
      "type": "text",
      "id": "section_label",
      "label": "Section label",
      "default": "OUR STORY"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "The Art of Preserving Love"
    },
    {
      "type": "richtext",
      "id": "body_text",
      "label": "Body text",
      "default": "<p>Maelin Studio was born from a simple truth: the bond between a pet and their human is a masterpiece worthy of being painted. Each portrait is hand-crafted with museum-grade oils on premium canvas by artists who understand that every whisker, every gleam in the eye, tells a story.</p><p>We don't just paint pets — we capture the invisible bond, the quiet moments, the personality that makes your companion irreplaceable.</p>"
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    },
    {
      "type": "select",
      "id": "image_position",
      "label": "Image position",
      "options": [
        { "value": "left", "label": "Left" },
        { "value": "right", "label": "Right" }
      ],
      "default": "left"
    },
    {
      "type": "text",
      "id": "badge_text",
      "label": "Badge text",
      "default": "Est."
    },
    {
      "type": "text",
      "id": "badge_highlight",
      "label": "Badge highlight (gold)",
      "default": "2026"
    },
    {
      "type": "text",
      "id": "button_label",
      "label": "Button label"
    },
    {
      "type": "url",
      "id": "button_link",
      "label": "Button link"
    }
  ],
  "blocks": [
    {
      "type": "stat",
      "name": "Stat",
      "settings": [
        {
          "type": "text",
          "id": "value",
          "label": "Value",
          "default": "500+"
        },
        {
          "type": "text",
          "id": "label",
          "label": "Label",
          "default": "Portraits Delivered"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Story Section"
    }
  ]
}
```

- [ ] **Step 4: Verify visually**

Story section should show image on left with "Est. 2026" badge in bottom-right corner, text on right with italic serif body, and three stats below a divider line (gold values, uppercase labels).

- [ ] **Step 5: Commit**

```bash
git add sections/story-section.liquid
git commit -m "feat: story section — stats blocks, badge, italic serif, increased gap"
```

---

### Task 9: Process Steps — Gold Line, Hover Fill, Body Text

**Files:**
- Modify: `sections/process-steps.liquid` (style, markup, schema)

- [ ] **Step 1: Replace the `<style>` block**

Replace the entire `<style>...</style>` (lines 1–105) with:

```css
<style>
  .process-steps {
    background-color: var(--maelin-cream-3);
    padding: var(--maelin-section-padding) 0;
  }

  .process-steps__inner {
    max-width: var(--page-width);
    margin: 0 auto;
  }

  .process-steps__header {
    text-align: center;
    margin-bottom: 8.8rem;
  }

  .process-steps__heading {
    margin-top: 1.6rem;
  }

  .process-steps__header-body {
    font-family: var(--font-heading-family);
    font-style: italic;
    font-size: 1.8rem;
    color: var(--maelin-ink-medium);
    line-height: 1.9;
    max-width: 56rem;
    margin: 2.2rem auto 0;
    font-weight: 300;
  }

  .process-steps__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3.6rem;
    padding: 0 5rem;
    position: relative;
  }

  .process-steps__grid::before {
    content: '';
    position: absolute;
    top: 2.7rem;
    left: 15%;
    right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--maelin-gold-muted), var(--maelin-gold-muted), transparent);
  }

  .process-steps__step {
    text-align: center;
    position: relative;
  }

  .process-steps__icon-wrapper {
    width: 5.4rem;
    height: 5.4rem;
    border: 1px solid var(--maelin-gold);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--maelin-gold);
    margin: 0 auto 2.8rem;
    position: relative;
    z-index: 1;
    background-color: var(--maelin-cream-3);
    transition: all 0.4s;
  }

  .process-steps__icon-wrapper svg {
    width: 1.8rem;
    height: 1.8rem;
    fill: var(--maelin-gold);
    transition: fill 0.4s;
  }

  .process-steps__step:hover .process-steps__icon-wrapper {
    background: var(--maelin-gold);
  }

  .process-steps__step:hover .process-steps__icon-wrapper svg {
    fill: #fff;
  }

  .process-steps__title {
    font-family: var(--font-heading-family);
    font-size: 1.7rem;
    font-weight: 500;
    letter-spacing: 0.03rem;
    color: var(--maelin-dark);
    margin-bottom: 1.4rem;
  }

  .process-steps__description {
    font-family: var(--font-heading-family);
    font-style: italic;
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.8;
    color: var(--maelin-ink-medium);
  }

  @media screen and (max-width: 1100px) {
    .process-steps__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 5.6rem;
      padding: 0 3rem;
    }

    .process-steps__grid::before {
      display: none;
    }
  }

  @media screen and (max-width: 749px) {
    .process-steps__grid {
      grid-template-columns: 1fr;
    }

    .process-steps__header {
      padding: 0 3rem;
    }
  }
</style>
```

- [ ] **Step 2: Update the markup to add inner wrapper, header body, and grid layout**

Replace everything from `<section class="process-steps">` to `</section>`:

```liquid
<section class="process-steps">
  <div class="process-steps__inner" style="padding: 0 6rem;">
    <div class="process-steps__header">
      {%- if section.settings.section_label != blank -%}
        <p class="maelin-section-label">{{ section.settings.section_label }}</p>
      {%- endif -%}
      {%- if section.settings.heading != blank -%}
        <h2 class="maelin-heading maelin-heading--large process-steps__heading">{{ section.settings.heading }}</h2>
      {%- endif -%}
      {%- if section.settings.body_text != blank -%}
        <p class="process-steps__header-body">{{ section.settings.body_text }}</p>
      {%- endif -%}
    </div>

    <div class="process-steps__grid">
      {%- for block in section.blocks -%}
        <div class="process-steps__step" {{ block.shopify_attributes }}>
          <div class="process-steps__icon-wrapper">
            {%- case block.settings.icon -%}
              {%- when 'upload' -%}{% render 'icon-upload' %}
              {%- when 'palette' -%}{% render 'icon-palette' %}
              {%- when 'brush' -%}{% render 'icon-brush' %}
              {%- when 'gift' -%}{% render 'icon-gift' %}
            {%- endcase -%}
          </div>
          {%- if block.settings.title != blank -%}
            <h3 class="process-steps__title">{{ block.settings.title }}</h3>
          {%- endif -%}
          {%- if block.settings.description != blank -%}
            <p class="process-steps__description">{{ block.settings.description }}</p>
          {%- endif -%}
        </div>
      {%- endfor -%}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add `body_text` to schema settings**

Add after the `heading` setting:

```json
{
  "type": "textarea",
  "id": "body_text",
  "label": "Body text",
  "default": "A seamless journey from your cherished photograph to a hand-painted work of art, delivered to your door."
}
```

- [ ] **Step 4: Verify visually**

Gold gradient connecting line between step circles. Circles fill gold on hover with white icons. Italic serif body text under heading and on step descriptions.

- [ ] **Step 5: Commit**

```bash
git add sections/process-steps.liquid
git commit -m "feat: process steps — gold gradient line, hover fill circles, body text"
```

---

### Task 10: Testimonial — Larger Quote Mark & Typography

**Files:**
- Modify: `sections/testimonial-section.liquid` (style block only — lines 1–103)

- [ ] **Step 1: Update CSS values**

In the `<style>` block, make these changes:

Replace `.testimonial-section__quote-icon`:
```css
.testimonial-section__quote-icon {
  font-family: var(--font-heading-family);
  color: var(--maelin-gold);
  font-size: 8rem;
  line-height: 0.8;
  opacity: 0.3;
  margin-bottom: 3.2rem;
}
```

Replace `.testimonial-section__quote`:
```css
.testimonial-section__quote {
  font-family: var(--font-heading-family);
  font-style: italic;
  font-size: 2.2rem;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 3.6rem;
  font-weight: 300;
}
```

Replace `.testimonial-section__author`:
```css
.testimonial-section__author {
  font-family: var(--font-heading-family);
  font-size: 1.5rem;
  letter-spacing: 0.3rem;
  text-transform: uppercase;
  color: var(--maelin-gold-light);
  font-weight: 400;
  margin-bottom: 0.4rem;
}
```

Replace `.testimonial-section__author-title`:
```css
.testimonial-section__author-title {
  font-family: var(--font-body-family);
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.15rem;
  font-weight: 300;
  margin-top: 0.8rem;
}
```

Update mobile quote size:
```css
@media screen and (max-width: 749px) {
  .testimonial-section__quote {
    font-size: 1.8rem;
  }
}
```

- [ ] **Step 2: Verify visually**

Large faded gold quote mark, larger italic quote text, serif author name with wider letter-spacing.

- [ ] **Step 3: Commit**

```bash
git add sections/testimonial-section.liquid
git commit -m "style: testimonial — larger quote mark, refined typography"
```

---

### Task 11: CTA Banner — Italic Serif Body & Wider Container

**Files:**
- Modify: `sections/cta-banner.liquid` (style block only)

- [ ] **Step 1: Update CSS**

Replace `.cta-banner__inner`:
```css
.cta-banner__inner {
  max-width: 78rem;
  margin: 0 auto;
  padding: 0 5rem;
}
```

Replace `.cta-banner__body`:
```css
.cta-banner__body {
  font-family: var(--font-heading-family);
  font-style: italic;
  font-size: 1.8rem;
  line-height: 1.9;
  color: var(--maelin-ink-medium);
  margin-bottom: 4.8rem;
  font-weight: 300;
}
```

- [ ] **Step 2: Verify visually**

CTA body text should be italic serif in medium grey. Container slightly wider.

- [ ] **Step 3: Commit**

```bash
git add sections/cta-banner.liquid
git commit -m "style: CTA banner — italic serif body, wider container"
```

---

### Task 12: Final Visual QA Pass

**Files:** None (read-only verification)

- [ ] **Step 1: Open reference and theme side-by-side**

Open `/Users/leonardofu/Downloads/maelin-homepage-preview.html` in one browser tab and the theme preview in another. Compare section by section:

1. Hero: split layout, ornate gold frame, painting label, button row
2. Gallery Grid: 4:5 cards, gradient overlay, price, hover lift
3. Marquee: gold dots, italic serif, faded grey
4. Bento Gallery: sharp corners, gradient overlay, price, scale hover
5. Story: badge, italic body, stats row with gold values
6. Process: gold gradient line, hover-fill circles, italic body
7. Testimonial: large faded quote mark, sizing
8. CTA: italic serif body

- [ ] **Step 2: Check responsive breakpoints**

Resize to 1100px, 989px, 768px, and 375px. Verify stacking, padding, and grid column changes at each breakpoint.

- [ ] **Step 3: Fix any discrepancies found**

Apply targeted CSS fixes for any remaining mismatches.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "style: final QA polish for pixel-perfect reference match"
```
