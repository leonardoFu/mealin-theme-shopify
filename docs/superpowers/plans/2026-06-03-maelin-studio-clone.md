# Maelin Studio Design Clone — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Dawn Shopify theme homepage to pixel-perfect match the Maelin Studio luxury pet portrait website design.

**Architecture:** Custom Liquid sections built on Dawn's existing architecture. Each of the 12 target homepage sections becomes a Liquid file with schema settings for theme-editor configurability. A single global CSS file (`custom-maelin.css`) provides shared design tokens and utility classes. Dawn's existing `<sticky-header>` and `<menu-drawer>` web components are extended, not replaced.

**Tech Stack:** Shopify Liquid, CSS3 (custom properties, grid, keyframe animations), Dawn's existing JS web components

**Spec:** `docs/superpowers/specs/2026-06-03-maelin-studio-clone-design.md`

---

## File Map

### New Files (Create)

| File | Responsibility |
|------|---------------|
| `assets/custom-maelin.css` | Global design tokens, shared utility classes, section-specific styles |
| `sections/hero-split.liquid` | Hero section: split text/image layout |
| `sections/featured-strip.liquid` | Circular thumbnail row divider |
| `sections/gallery-grid.liquid` | 4-column image card grid with hover overlays |
| `sections/marquee-ticker.liquid` | Infinite scrolling text strip |
| `sections/bento-gallery.liquid` | Asymmetric masonry-style gallery grid |
| `sections/story-section.liquid` | Side-by-side image + text section |
| `sections/process-steps.liquid` | 4-step horizontal process with icons |
| `sections/testimonial-section.liquid` | Dark background quote carousel |
| `sections/cta-banner.liquid` | Centered CTA with heading and buttons |
| `snippets/icon-upload.liquid` | SVG icon: upload/camera |
| `snippets/icon-palette.liquid` | SVG icon: palette/style |
| `snippets/icon-brush.liquid` | SVG icon: brush/create |
| `snippets/icon-gift.liquid` | SVG icon: gift/receive |

### Modified Files

| File | Changes |
|------|---------|
| `config/settings_data.json` | Update color schemes 1-4, heading font to Bodoni Moda |
| `layout/theme.liquid` | Add `custom-maelin.css` stylesheet link |
| `sections/header-group.json` | Update announcement bar + header settings for dark scheme, centered nav |
| `sections/footer-group.json` | Update footer settings for dark scheme |
| `sections/announcement-bar.liquid` | Add gold accent span styling via CSS class |
| `sections/header.liquid` | CSS overrides for transparent→blur sticky nav, centered nav layout |
| `sections/footer.liquid` | CSS overrides for dark theme, 3-column layout, muted links |
| `templates/index.json` | Replace default sections with new custom sections |

---

## Task 1: Global Design Tokens & Theme Settings

**Files:**
- Create: `assets/custom-maelin.css`
- Modify: `config/settings_data.json`
- Modify: `layout/theme.liquid:258` (after `base.css` link)

- [ ] **Step 1: Create `assets/custom-maelin.css` with design tokens and global overrides**

```css
/* Maelin Studio — Global Design Tokens */
:root {
  --maelin-gold: #B8860B;
  --maelin-gold-light: #E2B84A;
  --maelin-cream-1: #FDFCFA;
  --maelin-cream-2: #F9F7F4;
  --maelin-cream-3: #F3EFE8;
  --maelin-dark: #1A1A1A;
  --maelin-section-padding: 130px;
  --maelin-section-padding-mobile: 70px;
}

.maelin-section-label {
  font-family: var(--font-body-family);
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.3rem;
  text-transform: uppercase;
  color: var(--maelin-gold);
  margin-bottom: 1.6rem;
}

.maelin-heading {
  font-family: var(--font-heading-family);
  font-weight: 400;
  letter-spacing: -0.03rem;
  line-height: 1.15;
}

.maelin-heading--large {
  font-size: 4.56rem;
}

.maelin-heading--xlarge {
  font-size: 5.4rem;
}

.maelin-accent-italic {
  font-style: italic;
}

.maelin-btn {
  display: inline-block;
  font-family: var(--font-body-family);
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 0;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.maelin-btn:hover {
  opacity: 0.8;
}

.maelin-btn--primary {
  background: var(--maelin-dark);
  color: var(--maelin-cream-1);
  border: none;
  padding: 1.8rem 4.8rem;
}

.maelin-btn--secondary {
  background: transparent;
  color: var(--maelin-dark);
  border: 1px solid var(--maelin-dark);
  padding: 1.8rem 4.8rem;
}

.maelin-btn--nav {
  padding: 1.2rem 2.8rem;
}

@media screen and (max-width: 749px) {
  :root {
    --maelin-section-padding: var(--maelin-section-padding-mobile);
  }

  .maelin-heading--large {
    font-size: 3.2rem;
  }

  .maelin-heading--xlarge {
    font-size: 3.8rem;
  }
}
```

- [ ] **Step 2: Update `config/settings_data.json` — color schemes and fonts**

Update the preset's color schemes and font settings. Change these values:

```json
{
  "color_schemes": {
    "scheme-1": {
      "settings": {
        "background": "#FDFCFA",
        "background_gradient": "",
        "text": "#1A1A1A",
        "button": "#1A1A1A",
        "button_label": "#FDFCFA",
        "secondary_button_label": "#1A1A1A",
        "shadow": "#1A1A1A"
      }
    },
    "scheme-2": {
      "settings": {
        "background": "#F9F7F4",
        "background_gradient": "",
        "text": "#1A1A1A",
        "button": "#1A1A1A",
        "button_label": "#F9F7F4",
        "secondary_button_label": "#1A1A1A",
        "shadow": "#1A1A1A"
      }
    },
    "scheme-3": {
      "settings": {
        "background": "#F3EFE8",
        "background_gradient": "",
        "text": "#1A1A1A",
        "button": "#1A1A1A",
        "button_label": "#F3EFE8",
        "secondary_button_label": "#1A1A1A",
        "shadow": "#1A1A1A"
      }
    },
    "scheme-4": {
      "settings": {
        "background": "#1A1A1A",
        "background_gradient": "",
        "text": "#FDFCFA",
        "button": "#FDFCFA",
        "button_label": "#1A1A1A",
        "secondary_button_label": "#FDFCFA",
        "shadow": "#1A1A1A"
      }
    },
    "scheme-5": {
      "settings": {
        "background": "#F3EFE8",
        "background_gradient": "",
        "text": "#1A1A1A",
        "button": "#B8860B",
        "button_label": "#FDFCFA",
        "secondary_button_label": "#B8860B",
        "shadow": "#1A1A1A"
      }
    }
  },
  "type_header_font": "bodoni_moda_n4",
  "heading_scale": 120,
  "type_body_font": "assistant_n4",
  "body_scale": 100,
  "buttons_radius": 0,
  "buttons_border_thickness": 1,
  "buttons_border_opacity": 100
}
```

Note: If `bodoni_moda_n4` is not a valid Shopify font handle, try `cormorant_garamond_n4` as fallback. You can verify by checking the Shopify font library. The font handle format is `{family_name}_{style_letter}{weight}` where `n` = normal, `i` = italic.

- [ ] **Step 3: Add CSS link to `layout/theme.liquid`**

In `layout/theme.liquid`, after line 258 (`{{ 'base.css' | asset_url | stylesheet_tag }}`), add:

```liquid
{{ 'custom-maelin.css' | asset_url | stylesheet_tag }}
```

- [ ] **Step 4: Commit**

```bash
git add assets/custom-maelin.css config/settings_data.json layout/theme.liquid
git commit -m "feat: add Maelin Studio global design tokens and color scheme"
```

---

## Task 2: Announcement Bar Styling

**Files:**
- Modify: `assets/custom-maelin.css` (append styles)
- Modify: `sections/header-group.json` (update announcement bar settings)

- [ ] **Step 1: Append announcement bar styles to `assets/custom-maelin.css`**

```css
/* Announcement Bar — Dark with gold accent */
.maelin-announcement .utility-bar {
  border-bottom: none;
}

.maelin-announcement .announcement-bar__message {
  font-family: var(--font-body-family);
  font-size: 1.1rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  font-weight: 400;
}

.maelin-announcement .announcement-bar__message .gold-accent {
  color: var(--maelin-gold);
}
```

- [ ] **Step 2: Update `sections/header-group.json` announcement bar to use dark scheme**

Change the announcement-bar block's color_scheme from `"scheme-1"` to `"scheme-4"` and update text:

```json
"announcement-bar": {
  "type": "announcement-bar",
  "blocks": {
    "announcement-bar-0": {
      "type": "announcement",
      "settings": {
        "text": "COMMISSION YOUR PET'S PORTRAIT — HAND-PAINTED IN OIL ON CANVAS — FREE WORLDWIDE SHIPPING",
        "text_alignment": "center",
        "color_scheme": "scheme-4",
        "link": ""
      }
    }
  },
  "block_order": ["announcement-bar-0"]
}
```

- [ ] **Step 3: Edit `sections/announcement-bar.liquid` to support gold accent class**

The announcement bar text is rendered via `{{ section.blocks.first.settings.text | escape }}` which strips HTML. To add the gold accent, we need the announcement bar section to NOT escape the text. However, since Dawn escapes the text for XSS safety, the simpler approach is to use CSS to target the middle phrase via a pseudo-element or, more practically, to just apply the gold color to the entire announcement bar text since the full text is styled as uppercase gold-accented anyway. 

Alternatively, add a CSS rule that targets the announcement bar in scheme-4 to apply gold styling without modifying the Liquid file:

Append to `assets/custom-maelin.css`:

```css
.color-scheme-4 .announcement-bar__message,
.color-scheme--scheme-4 .announcement-bar__message,
[class*="color-scheme-4"] .announcement-bar__message {
  color: rgba(255, 255, 255, 0.9);
}
```

This keeps the announcement bar text white on the dark background. The gold accent from the target is subtle — the em-dash separated phrases read as a single styled line. No Liquid file modification needed.

- [ ] **Step 4: Commit**

```bash
git add assets/custom-maelin.css sections/header-group.json
git commit -m "feat: style announcement bar with dark background"
```

---

## Task 3: Header / Navigation Override

**Files:**
- Modify: `assets/custom-maelin.css` (append styles)
- Modify: `sections/header-group.json` (update header settings)

- [ ] **Step 1: Append header/nav styles to `assets/custom-maelin.css`**

```css
/* Header — Transparent to blur sticky nav */
.section-header {
  position: sticky;
  top: 0;
  z-index: 4;
}

.section-header .header-wrapper {
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease, padding 0.3s ease;
  border-bottom: none;
}

.section-header .header-wrapper:not(.scrolled-past-header) {
  background-color: transparent;
}

.scrolled-past-header .header-wrapper,
.section-header .header-wrapper.scrolled-past-header {
  background-color: rgba(253, 252, 250, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.section-header .header {
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
}

.section-header .header__heading-logo-wrapper {
  max-width: 4rem;
}

/* Nav links styling */
.section-header .header__inline-menu .list-menu__item--link {
  font-family: var(--font-body-family);
  font-size: 1.1rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  font-weight: 400;
  color: var(--maelin-dark);
}

/* Centered nav layout */
@media screen and (min-width: 990px) {
  .section-header .header--middle-left .header__inline-menu {
    margin: 0 auto;
  }
}

/* Nav CTA button */
.section-header .header__icon--cart,
.section-header .header__icons {
  display: flex;
  align-items: center;
}

/* Remove Dawn's default header shadow on scroll */
.shopify-section-header-sticky .header-wrapper--border-bottom {
  border-bottom: none;
  box-shadow: none;
}

.section-header .header-wrapper--border-bottom::after {
  display: none;
}
```

- [ ] **Step 2: Update header settings in `sections/header-group.json`**

Update the header section settings:

```json
"header": {
  "type": "header",
  "settings": {
    "color_scheme": "scheme-1",
    "logo_position": "middle-left",
    "menu": "main-menu",
    "menu_type_desktop": "dropdown",
    "sticky_header_type": "on-scroll-up",
    "show_line_separator": false,
    "enable_country_selector": false,
    "enable_language_selector": false,
    "mobile_logo_position": "center",
    "margin_bottom": 0,
    "padding_top": 16,
    "padding_bottom": 16
  }
}
```

Key changes: `show_line_separator: false`, disabled country/language selectors, reduced padding.

- [ ] **Step 3: Commit**

```bash
git add assets/custom-maelin.css sections/header-group.json
git commit -m "feat: style header with transparent-to-blur sticky nav"
```

---

## Task 4: Hero Split Section

**Files:**
- Create: `sections/hero-split.liquid`
- Modify: `assets/custom-maelin.css` (append styles)

- [ ] **Step 1: Create `sections/hero-split.liquid`**

```liquid
<style>
  .hero-split {
    background-color: var(--maelin-cream-2);
    padding: var(--maelin-section-padding) 0;
  }

  .hero-split__grid {
    display: grid;
    grid-template-columns: 45% 55%;
    gap: 6rem;
    align-items: center;
    max-width: var(--page-width);
    margin: 0 auto;
    padding: 0 5rem;
  }

  .hero-split__heading {
    font-size: 5.4rem;
    font-family: var(--font-heading-family);
    font-weight: 400;
    letter-spacing: -0.05rem;
    line-height: 1.1;
    margin: 1.6rem 0 2.4rem;
    color: var(--maelin-dark);
  }

  .hero-split__body {
    font-family: var(--font-heading-family);
    font-style: italic;
    font-size: 1.5rem;
    line-height: 1.7;
    color: rgba(26, 26, 26, 0.7);
    margin-bottom: 3.2rem;
  }

  .hero-split__buttons {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    align-items: flex-start;
  }

  .hero-split__image-wrapper {
    position: relative;
  }

  .hero-split__frame {
    border: 4px solid var(--maelin-gold);
    overflow: hidden;
  }

  .hero-split__frame img {
    display: block;
    width: 100%;
    height: auto;
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
    .hero-split__grid {
      grid-template-columns: 1fr;
      gap: 4rem;
      padding: 0 3rem;
    }

    .hero-split__heading {
      font-size: 3.8rem;
    }
  }
</style>

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
            &larr; {{ section.settings.button_label_1 }}
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
      </div>
      {%- if section.settings.signature != blank -%}
        <p class="hero-split__signature">{{ section.settings.signature }}</p>
      {%- endif -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Hero Split",
  "tag": "section",
  "class": "section",
  "settings": [
    {
      "type": "text",
      "id": "section_label",
      "label": "Section label",
      "default": "CUSTOM PET OIL PORTRAITS"
    },
    {
      "type": "textarea",
      "id": "heading",
      "label": "Heading",
      "default": "Where Every Pet Becomes a Timeless Masterpiece"
    },
    {
      "type": "text",
      "id": "accent_word",
      "label": "Italic accent word",
      "info": "One word from the heading to display in italic",
      "default": "Timeless"
    },
    {
      "type": "textarea",
      "id": "body_text",
      "label": "Body text",
      "default": "Each portrait is hand-painted with museum-grade oils on premium canvas, capturing the soul and spirit of your beloved companion."
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    },
    {
      "type": "text",
      "id": "signature",
      "label": "Signature text",
      "default": "Maelin"
    },
    {
      "type": "text",
      "id": "button_label_1",
      "label": "Primary button label",
      "default": "Begin Your Portrait"
    },
    {
      "type": "url",
      "id": "button_link_1",
      "label": "Primary button link"
    },
    {
      "type": "text",
      "id": "button_label_2",
      "label": "Secondary button label",
      "default": "View Gallery"
    },
    {
      "type": "url",
      "id": "button_link_2",
      "label": "Secondary button link"
    }
  ],
  "presets": [
    {
      "name": "Hero Split"
    }
  ]
}
{% endschema %}
```

- [ ] **Step 2: Commit**

```bash
git add sections/hero-split.liquid
git commit -m "feat: add hero split section"
```

---

## Task 5: Featured Strip Section

**Files:**
- Create: `sections/featured-strip.liquid`

- [ ] **Step 1: Create `sections/featured-strip.liquid`**

```liquid
<style>
  .featured-strip {
    background-color: var(--maelin-cream-1);
    padding: 4rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
  }

  .featured-strip__circle {
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .featured-strip__circle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

<div class="featured-strip">
  {%- for block in section.blocks -%}
    <div class="featured-strip__circle" {{ block.shopify_attributes }}>
      {%- if block.settings.image != blank -%}
        {{ block.settings.image | image_url: width: 160 | image_tag:
          loading: 'lazy',
          widths: '80, 160',
          sizes: '70px'
        }}
      {%- else -%}
        {{ 'image' | placeholder_svg_tag: 'placeholder-svg' }}
      {%- endif -%}
    </div>
  {%- endfor -%}
</div>

{% schema %}
{
  "name": "Featured Strip",
  "tag": "section",
  "class": "section",
  "max_blocks": 6,
  "settings": [],
  "blocks": [
    {
      "type": "thumbnail",
      "name": "Thumbnail",
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Image"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Featured Strip",
      "blocks": [
        { "type": "thumbnail" },
        { "type": "thumbnail" },
        { "type": "thumbnail" }
      ]
    }
  ]
}
{% endschema %}
```

- [ ] **Step 2: Commit**

```bash
git add sections/featured-strip.liquid
git commit -m "feat: add featured strip section"
```

---

## Task 6: Gallery Grid Section

**Files:**
- Create: `sections/gallery-grid.liquid`

- [ ] **Step 1: Create `sections/gallery-grid.liquid`**

```liquid
<style>
  .gallery-grid {
    background-color: var(--maelin-cream-1);
    padding: var(--maelin-section-padding) 0;
  }

  .gallery-grid__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    max-width: var(--page-width);
    margin: 0 auto 4rem;
    padding: 0 5rem;
  }

  .gallery-grid__header-left {
    display: flex;
    flex-direction: column;
  }

  .gallery-grid__link {
    font-family: var(--font-body-family);
    font-size: 1.1rem;
    letter-spacing: 0.2rem;
    text-transform: uppercase;
    color: var(--maelin-gold);
    text-decoration: none;
    font-weight: 500;
  }

  .gallery-grid__link:hover {
    opacity: 0.7;
  }

  .gallery-grid__cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    max-width: var(--page-width);
    margin: 0 auto;
    padding: 0 5rem;
  }

  .gallery-grid__card {
    position: relative;
    aspect-ratio: 1;
    border-radius: 0.8rem;
    overflow: hidden;
    background-color: var(--maelin-cream-2);
    cursor: pointer;
  }

  .gallery-grid__card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .gallery-grid__card:hover img {
    transform: scale(1.03);
  }

  .gallery-grid__overlay {
    position: absolute;
    inset: 0;
    background: rgba(26, 26, 26, 0.6);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2rem;
    opacity: 0;
    transition: opacity 0.3s ease;
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
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
  }

  @media screen and (max-width: 989px) {
    .gallery-grid__cards {
      grid-template-columns: repeat(2, 1fr);
      padding: 0 3rem;
    }
    .gallery-grid__header {
      padding: 0 3rem;
    }
  }

  @media screen and (max-width: 749px) {
    .gallery-grid__cards {
      grid-template-columns: 1fr;
    }
  }
</style>

<section class="gallery-grid">
  <div class="gallery-grid__header">
    <div class="gallery-grid__header-left">
      {%- if section.settings.section_label != blank -%}
        <p class="maelin-section-label">{{ section.settings.section_label }}</p>
      {%- endif -%}
      {%- if section.settings.heading != blank -%}
        <h2 class="maelin-heading" style="font-size: 2.8rem;">{{ section.settings.heading }}</h2>
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
            sizes: '(min-width: 990px) 25vw, (min-width: 750px) 50vw, 100vw'
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
        </div>
      </div>
    {%- endfor -%}
  </div>
</section>

{% schema %}
{
  "name": "Gallery Grid",
  "tag": "section",
  "class": "section",
  "max_blocks": 8,
  "settings": [
    {
      "type": "text",
      "id": "section_label",
      "label": "Section label",
      "default": "RECENT COMMISSIONS"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Our Clients' Treasured Portraits"
    },
    {
      "type": "text",
      "id": "gallery_link_label",
      "label": "Gallery link label",
      "default": "View Full Gallery"
    },
    {
      "type": "url",
      "id": "gallery_link",
      "label": "Gallery link"
    }
  ],
  "blocks": [
    {
      "type": "card",
      "name": "Gallery Card",
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Image"
        },
        {
          "type": "text",
          "id": "title",
          "label": "Title",
          "default": "Portrait Title"
        },
        {
          "type": "text",
          "id": "subtitle",
          "label": "Subtitle",
          "default": "Oil on Canvas — 24 x 30 cm"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Gallery Grid",
      "blocks": [
        { "type": "card" },
        { "type": "card" },
        { "type": "card" },
        { "type": "card" }
      ]
    }
  ]
}
{% endschema %}
```

- [ ] **Step 2: Commit**

```bash
git add sections/gallery-grid.liquid
git commit -m "feat: add gallery grid section with hover overlays"
```

---

## Task 7: Marquee Ticker Section

**Files:**
- Create: `sections/marquee-ticker.liquid`

- [ ] **Step 1: Create `sections/marquee-ticker.liquid`**

```liquid
<style>
  .marquee-ticker {
    background-color: var(--maelin-cream-1);
    padding: 2.4rem 0;
    overflow: hidden;
    border-top: 1px solid rgba(26, 26, 26, 0.08);
    border-bottom: 1px solid rgba(26, 26, 26, 0.08);
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
    font-family: var(--font-body-family);
    font-size: 1.2rem;
    letter-spacing: 0.3rem;
    text-transform: uppercase;
    color: var(--maelin-dark);
    white-space: nowrap;
    padding: 0 2rem;
  }

  .marquee-ticker__separator {
    color: var(--maelin-gold);
    font-size: 0.8rem;
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

<div class="marquee-ticker">
  <div class="marquee-ticker__track" aria-hidden="true">
    {%- for i in (1..2) -%}
      <div class="marquee-ticker__group">
        {%- for block in section.blocks -%}
          {%- unless forloop.first -%}
            <span class="marquee-ticker__separator">&#9670;</span>
          {%- endunless -%}
          <span class="marquee-ticker__item" {{ block.shopify_attributes }}>{{ block.settings.text }}</span>
        {%- endfor -%}
        <span class="marquee-ticker__separator">&#9670;</span>
      </div>
    {%- endfor -%}
  </div>
</div>

{% schema %}
{
  "name": "Marquee Ticker",
  "tag": "section",
  "class": "section",
  "max_blocks": 10,
  "settings": [
    {
      "type": "range",
      "id": "speed",
      "label": "Scroll speed (seconds)",
      "min": 10,
      "max": 60,
      "step": 5,
      "default": 30,
      "unit": "s"
    }
  ],
  "blocks": [
    {
      "type": "text_item",
      "name": "Text Item",
      "settings": [
        {
          "type": "text",
          "id": "text",
          "label": "Text",
          "default": "DOG PORTRAITS"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Marquee Ticker",
      "blocks": [
        { "type": "text_item", "settings": { "text": "DOG PORTRAITS" } },
        { "type": "text_item", "settings": { "text": "CAT PORTRAITS" } },
        { "type": "text_item", "settings": { "text": "OIL ON CANVAS" } },
        { "type": "text_item", "settings": { "text": "HAND-PAINTED" } },
        { "type": "text_item", "settings": { "text": "MUSEUM QUALITY" } }
      ]
    }
  ]
}
{% endschema %}
```

- [ ] **Step 2: Commit**

```bash
git add sections/marquee-ticker.liquid
git commit -m "feat: add marquee ticker section with infinite scroll"
```

---

## Task 8: Bento Gallery Section

**Files:**
- Create: `sections/bento-gallery.liquid`

- [ ] **Step 1: Create `sections/bento-gallery.liquid`**

```liquid
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
    margin: 0 auto 5rem;
    padding: 0 5rem;
  }

  .bento-gallery__body p {
    font-family: var(--font-heading-family);
    font-style: italic;
    font-size: 1.5rem;
    color: rgba(26, 26, 26, 0.7);
    line-height: 1.7;
  }

  .bento-gallery__price {
    font-family: var(--font-body-family);
    font-size: 1.1rem;
    letter-spacing: 0.2rem;
    text-transform: uppercase;
    color: var(--maelin-dark);
    margin-top: 1.6rem;
  }

  .bento-gallery__price .gold {
    color: var(--maelin-gold);
    text-decoration: underline;
  }

  .bento-gallery__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 2rem;
    max-width: var(--page-width);
    margin: 0 auto;
    padding: 0 5rem;
  }

  .bento-gallery__card {
    position: relative;
    border-radius: 0.8rem;
    overflow: hidden;
    background-color: var(--maelin-cream-2);
    cursor: pointer;
  }

  .bento-gallery__card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .bento-gallery__card:hover img {
    transform: scale(1.03);
  }

  .bento-gallery__card--large {
    grid-row: 1 / 3;
  }

  .bento-gallery__overlay {
    position: absolute;
    inset: 0;
    background: rgba(26, 26, 26, 0.6);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .bento-gallery__card:hover .bento-gallery__overlay {
    opacity: 1;
  }

  .bento-gallery__overlay-title {
    font-family: var(--font-heading-family);
    font-style: italic;
    font-size: 1.7rem;
    font-weight: 400;
    color: #fff;
    margin-bottom: 0.4rem;
  }

  .bento-gallery__overlay-subtitle {
    font-family: var(--font-body-family);
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.6);
  }

  @media screen and (max-width: 989px) {
    .bento-gallery__grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
      padding: 0 3rem;
    }

    .bento-gallery__card--large {
      grid-row: auto;
      grid-column: 1 / -1;
    }
  }

  @media screen and (max-width: 749px) {
    .bento-gallery__grid {
      grid-template-columns: 1fr;
    }

    .bento-gallery__header,
    .bento-gallery__body {
      padding: 0 3rem;
    }
  }
</style>

<section class="bento-gallery">
  <div class="bento-gallery__header">
    {%- if section.settings.section_label != blank -%}
      <p class="maelin-section-label">{{ section.settings.section_label }}</p>
    {%- endif -%}
    {%- if section.settings.heading != blank -%}
      <h2 class="maelin-heading maelin-heading--large">{{ section.settings.heading }}</h2>
    {%- endif -%}
  </div>

  {%- if section.settings.body_text != blank or section.settings.price_text != blank -%}
    <div class="bento-gallery__body">
      {%- if section.settings.body_text != blank -%}
        <p>{{ section.settings.body_text }}</p>
      {%- endif -%}
      {%- if section.settings.price_text != blank -%}
        <p class="bento-gallery__price">{{ section.settings.price_text }}</p>
      {%- endif -%}
    </div>
  {%- endif -%}

  <div class="bento-gallery__grid">
    {%- for block in section.blocks -%}
      <div class="bento-gallery__card{% if forloop.first %} bento-gallery__card--large{% endif %}" {{ block.shopify_attributes }}>
        {%- if block.settings.image != blank -%}
          {{ block.settings.image | image_url: width: 800 | image_tag:
            loading: 'lazy',
            widths: '400, 600, 800',
            sizes: '(min-width: 990px) 33vw, (min-width: 750px) 50vw, 100vw'
          }}
        {%- else -%}
          {{ 'image' | placeholder_svg_tag: 'placeholder-svg' }}
        {%- endif -%}
        <div class="bento-gallery__overlay">
          {%- if block.settings.title != blank -%}
            <h3 class="bento-gallery__overlay-title">{{ block.settings.title }}</h3>
          {%- endif -%}
          {%- if block.settings.subtitle != blank -%}
            <p class="bento-gallery__overlay-subtitle">{{ block.settings.subtitle }}</p>
          {%- endif -%}
        </div>
      </div>
    {%- endfor -%}
  </div>
</section>

{% schema %}
{
  "name": "Bento Gallery",
  "tag": "section",
  "class": "section",
  "max_blocks": 5,
  "settings": [
    {
      "type": "text",
      "id": "section_label",
      "label": "Section label",
      "default": "FULL COLLECTION"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Portraits That Tell a Story"
    },
    {
      "type": "textarea",
      "id": "body_text",
      "label": "Body text",
      "default": "Each piece is a unique collaboration between your vision and our artists' mastery — an heirloom to cherish for generations."
    },
    {
      "type": "text",
      "id": "price_text",
      "label": "Price text",
      "default": "STARTING FROM $300 PER PORTRAIT"
    }
  ],
  "blocks": [
    {
      "type": "card",
      "name": "Gallery Card",
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Image"
        },
        {
          "type": "text",
          "id": "title",
          "label": "Title",
          "default": "Portrait Title"
        },
        {
          "type": "text",
          "id": "subtitle",
          "label": "Subtitle",
          "default": "Oil on Canvas — 24 x 30 cm"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Bento Gallery",
      "blocks": [
        { "type": "card" },
        { "type": "card" },
        { "type": "card" },
        { "type": "card" },
        { "type": "card" }
      ]
    }
  ]
}
{% endschema %}
```

- [ ] **Step 2: Commit**

```bash
git add sections/bento-gallery.liquid
git commit -m "feat: add bento gallery section with asymmetric grid"
```

---

## Task 9: Story Section

**Files:**
- Create: `sections/story-section.liquid`

- [ ] **Step 1: Create `sections/story-section.liquid`**

```liquid
<style>
  .story-section {
    background-color: var(--maelin-cream-1);
    padding: var(--maelin-section-padding) 0;
  }

  .story-section__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
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
    border-radius: 0.4rem;
    overflow: hidden;
  }

  .story-section__image img {
    display: block;
    width: 100%;
    height: auto;
  }

  .story-section__content {
    max-width: 50rem;
  }

  .story-section__heading {
    margin: 1.6rem 0 2.4rem;
  }

  .story-section__body {
    font-size: 1.5rem;
    line-height: 1.7;
    color: rgba(26, 26, 26, 0.7);
    margin-bottom: 3.2rem;
  }

  @media screen and (max-width: 989px) {
    .story-section__grid {
      grid-template-columns: 1fr;
      gap: 4rem;
      padding: 0 3rem;
    }

    .story-section__grid--reversed {
      direction: ltr;
    }
  }
</style>

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
          {{ section.settings.button_label }}
        </a>
      {%- endif -%}
    </div>
  </div>
</section>

{% schema %}
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
      "default": "<p>Every brushstroke captures the unique personality and spirit of your beloved companion. Our artists bring years of classical training to create museum-quality portraits.</p>"
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
      "id": "button_label",
      "label": "Button label"
    },
    {
      "type": "url",
      "id": "button_link",
      "label": "Button link"
    }
  ],
  "presets": [
    {
      "name": "Story Section"
    }
  ]
}
{% endschema %}
```

- [ ] **Step 2: Commit**

```bash
git add sections/story-section.liquid
git commit -m "feat: add story section with configurable image position"
```

---

## Task 10: Process Steps Section + Icon Snippets

**Files:**
- Create: `snippets/icon-upload.liquid`
- Create: `snippets/icon-palette.liquid`
- Create: `snippets/icon-brush.liquid`
- Create: `snippets/icon-gift.liquid`
- Create: `sections/process-steps.liquid`

- [ ] **Step 1: Create the 4 SVG icon snippets**

`snippets/icon-upload.liquid`:
```liquid
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
  <circle cx="8.5" cy="8.5" r="1.5"/>
  <polyline points="21 15 16 10 5 21"/>
</svg>
```

`snippets/icon-palette.liquid`:
```liquid
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/>
  <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/>
  <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/>
  <circle cx="6.5" cy="12" r="0.5" fill="currentColor"/>
  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
</svg>
```

`snippets/icon-brush.liquid`:
```liquid
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M18.37 2.63L14 7l-1.59-1.59a2 2 0 00-2.82 0L8 7l9 9 1.59-1.59a2 2 0 000-2.82L17 10l4.37-4.37a2.12 2.12 0 10-3-3z"/>
  <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/>
  <path d="M14.5 17.5L4.5 15"/>
</svg>
```

`snippets/icon-gift.liquid`:
```liquid
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="20 12 20 22 4 22 4 12"/>
  <rect x="2" y="7" width="20" height="5"/>
  <line x1="12" y1="22" x2="12" y2="7"/>
  <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
  <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
</svg>
```

- [ ] **Step 2: Create `sections/process-steps.liquid`**

```liquid
<style>
  .process-steps {
    background-color: var(--maelin-cream-3);
    padding: var(--maelin-section-padding) 0;
  }

  .process-steps__header {
    text-align: center;
    max-width: var(--page-width);
    margin: 0 auto 6rem;
    padding: 0 5rem;
  }

  .process-steps__heading {
    margin-top: 1.6rem;
  }

  .process-steps__grid {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 0;
    max-width: var(--page-width);
    margin: 0 auto;
    padding: 0 5rem;
    position: relative;
  }

  .process-steps__step {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    max-width: 26rem;
    padding: 0 2rem;
  }

  .process-steps__icon-wrapper {
    width: 6rem;
    height: 6rem;
    border: 1.5px solid var(--maelin-gold);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--maelin-gold);
    margin-bottom: 2rem;
    position: relative;
    z-index: 1;
    background-color: var(--maelin-cream-3);
  }

  .process-steps__line {
    position: absolute;
    top: 3rem;
    left: 25%;
    right: 25%;
    height: 1px;
    background-color: rgba(26, 26, 26, 0.15);
    z-index: 0;
  }

  .process-steps__title {
    font-family: var(--font-heading-family);
    font-size: 1.7rem;
    font-weight: 500;
    letter-spacing: 0.03rem;
    color: var(--maelin-dark);
    margin-bottom: 1rem;
  }

  .process-steps__description {
    font-family: var(--font-body-family);
    font-size: 1.3rem;
    line-height: 1.6;
    color: rgba(26, 26, 26, 0.6);
  }

  @media screen and (max-width: 989px) {
    .process-steps__grid {
      flex-wrap: wrap;
      gap: 4rem;
      padding: 0 3rem;
    }

    .process-steps__step {
      flex: 0 0 45%;
    }

    .process-steps__line {
      display: none;
    }
  }

  @media screen and (max-width: 749px) {
    .process-steps__step {
      flex: 0 0 100%;
    }

    .process-steps__header {
      padding: 0 3rem;
    }
  }
</style>

<section class="process-steps">
  <div class="process-steps__header">
    {%- if section.settings.section_label != blank -%}
      <p class="maelin-section-label">{{ section.settings.section_label }}</p>
    {%- endif -%}
    {%- if section.settings.heading != blank -%}
      <h2 class="maelin-heading maelin-heading--large process-steps__heading">{{ section.settings.heading }}</h2>
    {%- endif -%}
  </div>

  <div class="process-steps__grid">
    <div class="process-steps__line"></div>
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
</section>

{% schema %}
{
  "name": "Process Steps",
  "tag": "section",
  "class": "section",
  "max_blocks": 4,
  "settings": [
    {
      "type": "text",
      "id": "section_label",
      "label": "Section label",
      "default": "HOW IT WORKS"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "From Photo to Masterpiece"
    }
  ],
  "blocks": [
    {
      "type": "step",
      "name": "Step",
      "settings": [
        {
          "type": "select",
          "id": "icon",
          "label": "Icon",
          "options": [
            { "value": "upload", "label": "Upload / Photo" },
            { "value": "palette", "label": "Palette / Style" },
            { "value": "brush", "label": "Brush / Create" },
            { "value": "gift", "label": "Gift / Receive" }
          ],
          "default": "upload"
        },
        {
          "type": "text",
          "id": "title",
          "label": "Title",
          "default": "Upload Your Photo"
        },
        {
          "type": "textarea",
          "id": "description",
          "label": "Description",
          "default": "Share your favorite photograph. Our team will help select the perfect reference for your portrait."
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Process Steps",
      "blocks": [
        { "type": "step", "settings": { "icon": "upload", "title": "Upload Your Photo", "description": "Share your favorite photograph. Our team will help select the perfect reference for your portrait." } },
        { "type": "step", "settings": { "icon": "palette", "title": "Choose Your Style", "description": "Select from classic realism, impressionistic, or modern styles. Decide on size, framing, and special details." } },
        { "type": "step", "settings": { "icon": "brush", "title": "Artist Creates", "description": "Your portrait is assigned to a specialist artist who paints your vision with oils on premium stretched canvas." } },
        { "type": "step", "settings": { "icon": "gift", "title": "Receive & Cherish", "description": "Review progress updates, approve the final piece, and receive your portrait beautifully packaged." } }
      ]
    }
  ]
}
{% endschema %}
```

- [ ] **Step 3: Commit**

```bash
git add snippets/icon-upload.liquid snippets/icon-palette.liquid snippets/icon-brush.liquid snippets/icon-gift.liquid sections/process-steps.liquid
git commit -m "feat: add process steps section with SVG icon snippets"
```

---

## Task 11: Testimonial Section

**Files:**
- Create: `sections/testimonial-section.liquid`

- [ ] **Step 1: Create `sections/testimonial-section.liquid`**

```liquid
<style>
  .testimonial-section {
    background-color: var(--maelin-dark);
    padding: var(--maelin-section-padding) 0;
    text-align: center;
  }

  .testimonial-section__inner {
    max-width: 70rem;
    margin: 0 auto;
    padding: 0 5rem;
    position: relative;
  }

  .testimonial-section__quote-icon {
    color: var(--maelin-gold);
    font-size: 4rem;
    line-height: 1;
    margin-bottom: 3rem;
  }

  .testimonial-section__slides {
    position: relative;
  }

  .testimonial-section__slide {
    display: none;
  }

  .testimonial-section__radio {
    display: none;
  }

  {%- for block in section.blocks -%}
    .testimonial-section__radio:nth-of-type({{ forloop.index }}):checked ~ .testimonial-section__slides .testimonial-section__slide:nth-child({{ forloop.index }}) {
      display: block;
    }
  {%- endfor -%}

  .testimonial-section__radio:first-of-type:checked ~ .testimonial-section__slides .testimonial-section__slide:first-child {
    display: block;
  }

  .testimonial-section__quote {
    font-family: var(--font-heading-family);
    font-style: italic;
    font-size: 2rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.88);
    margin-bottom: 3rem;
  }

  .testimonial-section__author {
    font-family: var(--font-body-family);
    font-size: 1.2rem;
    letter-spacing: 0.2rem;
    text-transform: uppercase;
    color: var(--maelin-gold);
    font-weight: 500;
    margin-bottom: 0.4rem;
  }

  .testimonial-section__author-title {
    font-family: var(--font-body-family);
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.4);
  }

  .testimonial-section__dots {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 3rem;
  }

  .testimonial-section__dot {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .testimonial-section__dot:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  {%- for block in section.blocks -%}
    .testimonial-section__radio:nth-of-type({{ forloop.index }}):checked ~ .testimonial-section__dots .testimonial-section__dot:nth-child({{ forloop.index }}) {
      background-color: var(--maelin-gold);
    }
  {%- endfor -%}

  @media screen and (max-width: 749px) {
    .testimonial-section__inner {
      padding: 0 3rem;
    }

    .testimonial-section__quote {
      font-size: 1.7rem;
    }
  }
</style>

<section class="testimonial-section">
  <div class="testimonial-section__inner">
    <div class="testimonial-section__quote-icon">&ldquo;</div>

    {%- for block in section.blocks -%}
      <input
        type="radio"
        class="testimonial-section__radio"
        name="testimonial-{{ section.id }}"
        id="testimonial-{{ section.id }}-{{ forloop.index }}"
        {% if forloop.first %}checked{% endif %}
      >
    {%- endfor -%}

    <div class="testimonial-section__slides">
      {%- for block in section.blocks -%}
        <div class="testimonial-section__slide" {{ block.shopify_attributes }}>
          {%- if block.settings.quote != blank -%}
            <blockquote class="testimonial-section__quote">{{ block.settings.quote }}</blockquote>
          {%- endif -%}
          {%- if block.settings.author != blank -%}
            <p class="testimonial-section__author">{{ block.settings.author }}</p>
          {%- endif -%}
          {%- if block.settings.author_title != blank -%}
            <p class="testimonial-section__author-title">{{ block.settings.author_title }}</p>
          {%- endif -%}
        </div>
      {%- endfor -%}
    </div>

    {%- if section.blocks.size > 1 -%}
      <div class="testimonial-section__dots">
        {%- for block in section.blocks -%}
          <label class="testimonial-section__dot" for="testimonial-{{ section.id }}-{{ forloop.index }}"></label>
        {%- endfor -%}
      </div>
    {%- endif -%}
  </div>
</section>

{% schema %}
{
  "name": "Testimonial",
  "tag": "section",
  "class": "section",
  "max_blocks": 5,
  "settings": [],
  "blocks": [
    {
      "type": "testimonial",
      "name": "Testimonial",
      "settings": [
        {
          "type": "textarea",
          "id": "quote",
          "label": "Quote",
          "default": "When I unwrapped the portrait, I cried. They captured Max's spirit perfectly — the way he always tilted his head, that gentle wisdom in his eyes. It's not just a painting, it's a piece of my heart."
        },
        {
          "type": "text",
          "id": "author",
          "label": "Author name",
          "default": "Sarah Mitchell"
        },
        {
          "type": "text",
          "id": "author_title",
          "label": "Author title",
          "default": "Golden Retriever Owner, London"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Testimonial",
      "blocks": [
        { "type": "testimonial" }
      ]
    }
  ]
}
{% endschema %}
```

Note: The CSS-only carousel uses radio buttons and the `:checked` sibling selector. The `<style>` block in the Liquid file dynamically generates the correct `:nth-of-type` / `:nth-child` selectors based on `section.blocks` count. This works because Shopify renders the `<style>` block server-side.

- [ ] **Step 2: Commit**

```bash
git add sections/testimonial-section.liquid
git commit -m "feat: add testimonial section with CSS-only carousel"
```

---

## Task 12: CTA Banner Section

**Files:**
- Create: `sections/cta-banner.liquid`

- [ ] **Step 1: Create `sections/cta-banner.liquid`**

```liquid
<style>
  .cta-banner {
    background-color: var(--maelin-cream-1);
    padding: var(--maelin-section-padding) 0;
    text-align: center;
  }

  .cta-banner__inner {
    max-width: 70rem;
    margin: 0 auto;
    padding: 0 5rem;
  }

  .cta-banner__heading {
    margin: 1.6rem 0 2.4rem;
  }

  .cta-banner__body {
    font-size: 1.5rem;
    line-height: 1.7;
    color: rgba(26, 26, 26, 0.7);
    margin-bottom: 3.2rem;
  }

  .cta-banner__buttons {
    display: flex;
    justify-content: center;
    gap: 1.6rem;
    flex-wrap: wrap;
  }

  @media screen and (max-width: 749px) {
    .cta-banner__inner {
      padding: 0 3rem;
    }

    .cta-banner__buttons {
      flex-direction: column;
      align-items: center;
    }
  }
</style>

<section class="cta-banner">
  <div class="cta-banner__inner">
    {%- if section.settings.section_label != blank -%}
      <p class="maelin-section-label">{{ section.settings.section_label }}</p>
    {%- endif -%}
    {%- if section.settings.heading != blank -%}
      <h2 class="maelin-heading maelin-heading--large cta-banner__heading">{{ section.settings.heading }}</h2>
    {%- endif -%}
    {%- if section.settings.body_text != blank -%}
      <div class="cta-banner__body">{{ section.settings.body_text }}</div>
    {%- endif -%}
    <div class="cta-banner__buttons">
      {%- if section.settings.button_label_1 != blank -%}
        <a href="{{ section.settings.button_link_1 }}" class="maelin-btn maelin-btn--primary">
          {{ section.settings.button_label_1 }}
        </a>
      {%- endif -%}
      {%- if section.settings.button_label_2 != blank -%}
        <a href="{{ section.settings.button_link_2 }}" class="maelin-btn maelin-btn--secondary">
          {{ section.settings.button_label_2 }}
        </a>
      {%- endif -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "CTA Banner",
  "tag": "section",
  "class": "section",
  "settings": [
    {
      "type": "text",
      "id": "section_label",
      "label": "Section label",
      "default": "BEGIN YOUR JOURNEY"
    },
    {
      "type": "textarea",
      "id": "heading",
      "label": "Heading",
      "default": "Ready to Transform Your Pet's Photo into Art?"
    },
    {
      "type": "richtext",
      "id": "body_text",
      "label": "Body text"
    },
    {
      "type": "text",
      "id": "button_label_1",
      "label": "Primary button label",
      "default": "Commission a Portrait"
    },
    {
      "type": "url",
      "id": "button_link_1",
      "label": "Primary button link"
    },
    {
      "type": "text",
      "id": "button_label_2",
      "label": "Secondary button label",
      "default": "View Gallery"
    },
    {
      "type": "url",
      "id": "button_link_2",
      "label": "Secondary button link"
    }
  ],
  "presets": [
    {
      "name": "CTA Banner"
    }
  ]
}
{% endschema %}
```

- [ ] **Step 2: Commit**

```bash
git add sections/cta-banner.liquid
git commit -m "feat: add CTA banner section"
```

---

## Task 13: Footer Styling Override

**Files:**
- Modify: `assets/custom-maelin.css` (append footer styles)
- Modify: `sections/footer-group.json` (update settings to dark scheme)

- [ ] **Step 1: Append footer styles to `assets/custom-maelin.css`**

```css
/* Footer — Dark theme override */
.footer.color-scheme-4 {
  margin-top: 0;
}

.footer .footer__content-top {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 6rem;
}

.footer h2,
.footer .footer-block__heading {
  font-family: var(--font-heading-family);
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: 0.15rem;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
}

.footer .footer-block__details-content a,
.footer .list-menu__item--link {
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.3s ease;
  font-size: 1.3rem;
}

.footer .footer-block__details-content a:hover,
.footer .list-menu__item--link:hover {
  color: rgba(255, 255, 255, 0.9);
}

.footer .footer__content-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 3rem;
  margin-top: 4rem;
}

.footer .copyright {
  color: rgba(255, 255, 255, 0.35);
  font-size: 1.2rem;
}
```

- [ ] **Step 2: Update `sections/footer-group.json` to use dark scheme**

Change `color_scheme` to `"scheme-4"` and adjust settings:

```json
{
  "name": "t:sections.footer.name",
  "type": "footer",
  "sections": {
    "footer": {
      "type": "footer",
      "blocks": {
        "footer-0": {
          "type": "link_list",
          "settings": {
            "heading": "Shop",
            "menu": "footer"
          }
        },
        "footer-1": {
          "type": "link_list",
          "settings": {
            "heading": "Company",
            "menu": "footer"
          }
        },
        "footer-2": {
          "type": "link_list",
          "settings": {
            "heading": "Support",
            "menu": "footer"
          }
        }
      },
      "block_order": ["footer-0", "footer-1", "footer-2"],
      "settings": {
        "color_scheme": "scheme-4",
        "newsletter_enable": false,
        "newsletter_heading": "",
        "show_social": true,
        "enable_country_selector": false,
        "enable_language_selector": false,
        "payment_enable": false,
        "show_policy": false,
        "margin_top": 0,
        "padding_top": 60,
        "padding_bottom": 40
      }
    }
  },
  "order": ["footer"]
}
```

- [ ] **Step 3: Commit**

```bash
git add assets/custom-maelin.css sections/footer-group.json
git commit -m "feat: style footer with dark theme and 3-column links"
```

---

## Task 14: Index Template — Wire Up All Sections

**Files:**
- Modify: `templates/index.json`

- [ ] **Step 1: Replace `templates/index.json` with the new section order**

```json
{
  "layout": "theme",
  "sections": {
    "hero_split": {
      "type": "hero-split",
      "settings": {}
    },
    "featured_strip": {
      "type": "featured-strip",
      "blocks": {
        "thumb-1": { "type": "thumbnail" },
        "thumb-2": { "type": "thumbnail" },
        "thumb-3": { "type": "thumbnail" }
      },
      "block_order": ["thumb-1", "thumb-2", "thumb-3"],
      "settings": {}
    },
    "gallery_grid": {
      "type": "gallery-grid",
      "blocks": {
        "card-1": { "type": "card", "settings": { "title": "Mysterious Gaze", "subtitle": "Oil on Canvas — 24 x 30 cm" } },
        "card-2": { "type": "card", "settings": { "title": "Noble Spirit", "subtitle": "Oil on Canvas — 30 x 40 cm" } },
        "card-3": { "type": "card", "settings": { "title": "Cloud of Joy", "subtitle": "Oil on Canvas — 20 x 25 cm" } },
        "card-4": { "type": "card", "settings": { "title": "Best Friends Forever", "subtitle": "Oil on Canvas — 40 x 50 cm" } }
      },
      "block_order": ["card-1", "card-2", "card-3", "card-4"],
      "settings": {}
    },
    "marquee_ticker": {
      "type": "marquee-ticker",
      "blocks": {
        "item-1": { "type": "text_item", "settings": { "text": "DOG PORTRAITS" } },
        "item-2": { "type": "text_item", "settings": { "text": "CAT PORTRAITS" } },
        "item-3": { "type": "text_item", "settings": { "text": "OIL ON CANVAS" } },
        "item-4": { "type": "text_item", "settings": { "text": "HAND-PAINTED" } },
        "item-5": { "type": "text_item", "settings": { "text": "MUSEUM QUALITY" } }
      },
      "block_order": ["item-1", "item-2", "item-3", "item-4", "item-5"],
      "settings": { "speed": 30 }
    },
    "bento_gallery": {
      "type": "bento-gallery",
      "blocks": {
        "bento-1": { "type": "card", "settings": { "title": "Golden Elegance", "subtitle": "Oil on Canvas — 40 x 50 cm" } },
        "bento-2": { "type": "card", "settings": { "title": "Mysterious Gaze", "subtitle": "Oil on Canvas — 24 x 30 cm" } },
        "bento-3": { "type": "card", "settings": { "title": "Noble Spirit", "subtitle": "Oil on Canvas — 30 x 40 cm" } },
        "bento-4": { "type": "card", "settings": { "title": "Cloud of Joy", "subtitle": "Oil on Canvas — 20 x 25 cm" } },
        "bento-5": { "type": "card", "settings": { "title": "Best Friends Forever", "subtitle": "Oil on Canvas — 40 x 50 cm" } }
      },
      "block_order": ["bento-1", "bento-2", "bento-3", "bento-4", "bento-5"],
      "settings": {}
    },
    "story_section": {
      "type": "story-section",
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
    "featured_strip",
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

- [ ] **Step 2: Commit**

```bash
git add templates/index.json
git commit -m "feat: wire up all custom sections in index template"
```

---

## Task 15: Visual QA & Polish

This task requires running `shopify theme dev` and using dev-browser to screenshot and compare.

- [ ] **Step 1: Start the Shopify dev server**

```bash
shopify theme dev --store your-store.myshopify.com
```

(Replace with actual store URL. If no store is configured, use `--theme-editor-sync` mode or preview the theme JSON structure for correctness.)

- [ ] **Step 2: Screenshot the result and compare with target**

Use `dev-browser` to navigate to the dev server URL, take full-page screenshots, and compare side-by-side with the target screenshots already captured in `~/.dev-browser/tmp/target-*.png`.

- [ ] **Step 3: Fix any visual discrepancies**

Common fixes to check:
- Section padding matches target (130px desktop, 70px mobile)
- Font rendering matches (Bodoni Moda vs target's Playfair Display)
- Gold accent color appears consistently across section labels
- Marquee scrolls smoothly with no gap
- Gallery hover overlays fade in correctly
- Sticky nav transition is smooth
- Footer dark theme renders correctly
- All responsive breakpoints work (resize to 990px, 750px)

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "fix: visual QA polish and adjustments"
```
