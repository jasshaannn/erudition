# 🖼️ Guide: Media Assets & Visuals

This document details all graphics, photography, favicons, and branding assets used across the Erudition Institute website, along with guidelines for replacing or updating them.

---

## 📁 Media Inventory

| Asset Name | Format | Dimensions | Usage | Location |
| :--- | :--- | :--- | :--- | :--- |
| [**`sumanpreet-kaur.jpg`**](../sumanpreet-kaur.jpg) | JPEG | $1024 \times 779\text{ px}$ | Director & Founder Spotlight Section | Root & `/public` |
| [**`logo-dark-mode.png`**](../logo-dark-mode.png) | PNG (RGBA) | $2200 \times 600\text{ px}$ | Institute Brand Logo with White Text & Alpha | Root & `/public` |
| [**`favicon.svg`**](../favicon.svg) | SVG | Vector ($64 \times 64\text{ viewBox}$) | Browser Tab Icon & Mobile Bookmark | Root & `/public` |

---

## 🔍 Detailed Asset Specifications

### 1. `sumanpreet-kaur.jpg` (Founder Photograph)
* **Description**: High-resolution photograph of **Sumanpreet Kaur** celebrating visa grant achievements with students.
* **Where it appears**: In the `#director` section on the homepage and mobile drawer.
* **Styling**: Rendered inside a rounded container (`border-radius: 18px`) with `object-fit: cover` and a dark glassmorphism verification badge.
* **How to update**:
  1. Prepare a new photo with roughly a $4:3$ or $16:9$ horizontal aspect ratio.
  2. Save it with the filename `sumanpreet-kaur.jpg` in the project root directory.
  3. Run `npm run build` to update the copy inside `public/`.

---

### 2. `logo-dark-mode.png` (Transparent Institute Logo)
* **Description**: The official Erudition Institute logo formatted specifically for dark-mode interfaces:
  * **Typography**: Clean white letters (`#FFFFFF`).
  * **Graphic Elements**: Green sprouting plant (`#A9C58F`) and orange graduation cap (`#EA580C`).
  * **Background**: **100% Transparent Alpha** (`[0, 0, 0, 0]`), eliminating the previous white rectangular box.
* **Where it appears**: Header navbar (`.bar .plate img`) and footer (`footer .plate img`).

---

### 3. `favicon.svg` (Browser Tab Icon)
* **Description**: Scalable Vector Graphic (SVG) with a navy rounded square (`#173B52`), white open book, sprouting green leaf, and orange graduation cap.
* **Why SVG?**: SVG favicons stay razor-sharp across all screen densities (Retina, 4K, Mobile displays) while keeping file size under $1\text{ KB}$ ($511\text{ bytes}$).
* **Linked in HTML**: `<link rel="icon" type="image/svg+xml" href="favicon.svg">`.

---

## 💡 Best Practices for Adding New Images

1. Always place new images in the root folder.
2. Update the `build` script in `package.json` to ensure the new image is copied into `public/`.
3. Use modern compressed formats (WebP, optimized JPEG, or SVG).
4. Run `npm run dev` to verify that images load cleanly without 404 errors.
