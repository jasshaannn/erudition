# 🎨 Guide: `erudition-portal.css` (Stylesheets & Design System)

`erudition-portal.css` defines the visual design system, dark palette variables, responsive grid systems, modal glassmorphism effects, custom slider controls, and clean `@media print` rules for the platform.

---

## 📌 File Summary

* **Location**: Root directory (`/erudition-portal.css`) and compiled to (`/public/erudition-portal.css`)
* **Architecture**: Pure CSS3 utilizing semantic CSS custom properties (variables), Flexbox, CSS Grid, and responsive breakpoints.

---

## 🌙 Design System & Color Tokens

The site runs on a permanent executive Dark Mode palette configured in `:root`:

```css
:root {
  color-scheme: dark;
  --bg: #07131A;         /* Primary canvas background (Deep Navy Black) */
  --surface: #0E202B;    /* Card and panel surfaces */
  --ink: #EAF2EE;        /* Primary heading and body text */
  --muted: #8EA4AD;      /* Secondary text and subtitles */
  --navy: #050E14;       /* High-contrast dark container backgrounds */
  --teal: #5FB4D6;       /* Primary accent color (links, scores, highlights) */
  --green: #8EBA86;      /* Verification checkmarks and success states */
  --leaf: #A9C58F;       /* Soft green badges and ribbon elements */
  --line: #183344;       /* Subtle dividers and card borders */
  --cta: #EA580C;        /* High-energy call-to-action button color (Orange) */
  --cta-navy: #FB923C;   /* Secondary vibrant accent */
  --soft: #122836;       /* Form input and secondary surface backgrounds */
  --plate: transparent;  /* Transparent logo backing (Zero white box) */
  --display: "Bricolage Grotesque", Arial, sans-serif; /* Display headings */
  --body: "Public Sans", "Segoe UI", Arial, sans-serif; /* Readable body */
}
```

---

## 🧩 Key Component Styles

### 1. Transparent Brand Logo (`.plate`)
Ensures the institute logo renders seamlessly without any white rectangular border:
```css
.plate {
  background: transparent !important;
  padding: 0 !important;
  border: none !important;
  box-shadow: none !important;
  display: inline-flex !important;
  align-items: center !important;
}
.plate img {
  height: 44px;
  width: auto;
  display: block;
}
```

---

### 2. Director & Founder Spotlight (`.director-card`)
* Uses CSS Grid (`1fr 1.25fr`) on desktop and collapses into a single column (`1fr`) on screens $< 860px$.
* **Instagram Pill Button (`.insta-pill`)**: Styled with the authentic Instagram gradient (`#f09433`, `#e6683c`, `#dc2743`, `#cc2366`, `#bc1888`) with subtle lift on hover (`transform: translateY(-2px)`).
* **Photo Container (`.director-img-wrap`)**: Features rounded corners (`18px`), deep drop shadow, and a glassmorphism floating overlay badge (`.director-badge-overlay`).

---

### 3. Student Result Cards (`.result-card`)
* Elevation hover effect: `transform: translateY(-3px)` with smooth cubic-bezier easing.
* **Badges**:
  * `.type-badge.ielts`: Soft teal background with high-contrast teal text.
  * `.type-badge.pte`: Soft green background with vibrant emerald text.
  * `.type-badge.visa`: Soft orange background with CTA orange text.
* **Module Grid (`.breakdown-grid`)**: 4-column sub-grid cleanly separating Listening, Reading, Writing, and Speaking scores.

---

### 4. Modal Dialogs & Glassmorphism (`.modal-overlay`)
* **Backdrop**: Fixed overlay with dark tint and blur filter (`backdrop-filter: blur(5px)`).
* **Modal Window (`.modal-window`)**: Smooth entry animation (`transform: translateY(20px) scale(0.97)` animating to `translateY(0) scale(1)`).
* **Scroll Budget**: Capped at `max-height: 90vh` with `overflow-y: auto` to prevent cutoffs on smaller laptop screens.

---

### 5. Interactive Band Sliders (`.range-slider`)
* Custom webkit slider track with rounded edges (`height: 8px`).
* **Slider Thumb (`::-webkit-slider-thumb`)**: Vibrant orange pill (`22px`) with white border and subtle drop shadow that scales smoothly on hover (`transform: scale(1.15)`).

---

### 6. Official Printable Certificate (`.cert-sheet`)
* Formatted like an authenticated university transcript:
  * Double border (`border: 8px double #173B52`).
  * Structured table (`.cert-table`) for module evaluation.
  * Security seal (`.cert-seal`) with circular double border.
  * Director signature block (`.cert-signature-line`) utilizing cursive typography.

---

### 7. Print Media Rules (`@media print`)
When a user clicks **"Print Scorecard / Save PDF"**, the browser uses dedicated print rules:
* Sets `visibility: hidden` on headers, navigation, buttons, and footers.
* Isolates `.cert-sheet` centered on an A4 sheet.
* Removes dark backgrounds to save printer ink and ensure high-contrast paper clarity.
