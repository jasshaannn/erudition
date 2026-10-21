# 📚 Erudition Institute — Comprehensive Codebase & File Guides

Welcome to the internal documentation for the **Erudition Institute** web platform. This folder contains detailed, step-by-step technical guides for every single file in the project, explaining **what each file does**, **how it works**, **how data flows**, and **how to edit or customize it**.

---

## 🗂️ File Documentation Directory

| Guide File | Target Code File | Summary of Contents |
| :--- | :--- | :--- |
| [**`INDEX_HTML.md`**](./INDEX_HTML.md) | `index.html` / `public/index.html` | Page structure, semantic tags, all 10 visual sections, modals, and edit guide |
| [**`ERUDITION_PORTAL_JS.md`**](./ERUDITION_PORTAL_JS.md) | `erudition-portal.js` | Complete JavaScript engine, Cambridge band algorithm, modals, and local storage |
| [**`ERUDITION_PORTAL_CSS.md`**](./ERUDITION_PORTAL_CSS.md) | `erudition-portal.css` | Design system, dark palette variables, responsive grids, and print stylesheet |
| [**`VERCEL_JSON.md`**](./VERCEL_JSON.md) | `vercel.json` | Vercel production hosting config, security headers, clean URLs, and routing |
| [**`PACKAGE_JSON.md`**](./PACKAGE_JSON.md) | `package.json` | Build scripts, local server execution (`npm run dev`), and automated asset sync |
| [**`ASSETS_AND_MEDIA.md`**](./ASSETS_AND_MEDIA.md) | Images & Icons | `favicon.svg`, `sumanpreet-kaur.jpg`, and `logo-dark-mode.png` specifications |

---

## 🏗️ Project Architecture Overview

```text
erudition/
├── index.html               # Master HTML source file (Root entrypoint)
├── erudition-portal.js      # Core frontend JavaScript logic engine
├── erudition-portal.css     # Styling for results, cards, modals, calculator
├── vercel.json              # Vercel deployment & security configuration
├── package.json             # NPM package scripts & build automation
├── favicon.svg              # Brand SVG favicon
├── sumanpreet-kaur.jpg      # Official photograph of Founder Sumanpreet Kaur
├── logo-dark-mode.png       # High-contrast transparent dark-mode logo
├── .gitignore               # Excludes system and temporary files
├── README.md                # Root project overview
│
├── public/                  # Production directory compiled by npm run build (used by Vercel)
│   ├── index.html
│   ├── erudition-portal.js
│   ├── erudition-portal.css
│   ├── favicon.svg
│   ├── sumanpreet-kaur.jpg
│   ├── logo-dark-mode.png
│   └── Erudition Institute.html
│
└── readme/                  # Detailed documentation for each file (You are here!)
    ├── README.md            # Master index for all guides
    ├── INDEX_HTML.md        # Deep dive into HTML structure & sections
    ├── ERUDITION_PORTAL_JS.md # Deep dive into JavaScript logic & algorithms
    ├── ERUDITION_PORTAL_CSS.md# Deep dive into CSS styling & dark mode design
    ├── VERCEL_JSON.md       # Deep dive into Vercel cloud configuration
    ├── PACKAGE_JSON.md      # Deep dive into NPM scripts & development server
    └── ASSETS_AND_MEDIA.md  # Deep dive into images, logos, and media assets
```

---

## ⚡ Quick Workflow Reference

* **Run Locally**: `npm run dev` (starts server at `http://localhost:3000`)
* **Build / Synchronize Assets**: `npm run build` (copies root files into `public/`)
* **Deploy to Vercel**: `git push origin main` (Vercel automatically builds and deploys `public/`)
