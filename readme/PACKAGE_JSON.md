# 📦 Guide: `package.json` (NPM Manifest & Automation Scripts)

`package.json` is the standard Node.js project manifest file. It defines project metadata, npm command shortcuts, and build automation routines used both locally and during Vercel cloud deployments.

---

## 📌 File Summary

* **Location**: Root directory (`/package.json`)
* **Format**: Standard JSON
* **Primary Role**: Controls the execution of `npm run dev`, `npm run build`, and `npm start`.

---

## 📋 File Breakdown

```json
{
  "name": "erudition-institute",
  "version": "1.0.0",
  "description": "Erudition Institute of Global Education - Results Portal & Study Abroad Website",
  "main": "public/index.html",
  "scripts": {
    "build": "mkdir -p public && cp index.html favicon.svg erudition-portal.css erudition-portal.js \"Erudition Institute.html\" sumanpreet-kaur.jpg logo-dark-mode.png public/ 2>/dev/null || true",
    "dev": "npm run build && npx serve public",
    "start": "npx serve public"
  },
  "keywords": [
    "erudition",
    "ielts",
    "pte",
    "study-abroad",
    "results-portal"
  ],
  "author": "Erudition Institute",
  "license": "MIT"
}
```

---

## ⚙️ NPM Scripts Explained

### 1. `npm run build`
```bash
mkdir -p public && cp index.html favicon.svg erudition-portal.css erudition-portal.js "Erudition Institute.html" sumanpreet-kaur.jpg logo-dark-mode.png public/ 2>/dev/null || true
```
* **What it does**:
  1. Creates the `public/` directory if it does not already exist (`mkdir -p public`).
  2. Copies all root assets (`index.html`, `erudition-portal.css`, `erudition-portal.js`, `favicon.svg`, `sumanpreet-kaur.jpg`, `logo-dark-mode.png`, and `Erudition Institute.html`) directly into `public/`.
* **When it runs**:
  * Automatically triggered by **Vercel** during cloud builds.
  * Triggered automatically whenever you start local development (`npm run dev`).
* **Why this is critical**: Guarantees that the `public/` folder is always 100% in sync with your latest root file edits.

---

### 2. `npm run dev`
```bash
npm run build && npx serve public
```
* **What it does**:
  1. Runs `npm run build` first to ensure all recent edits are synchronized to `public/`.
  2. Runs `npx serve public` to start a local development web server at `http://localhost:3000`.
* **How to use**: Simply type `npm run dev` in your terminal and open `http://localhost:3000` in your web browser.

---

### 3. `npm start`
```bash
npx serve public
```
* Serves the compiled `public/` folder using the lightweight `serve` static server without re-running the build step.

---

## 🛠️ Troubleshooting: Why Deleting `package.json` Breaks `npm run dev`
If `package.json` is moved or deleted from the root project folder:
* Running `npm run dev` will fail with:
  ```text
  npm error code ENOENT
  npm error enoent Could not read package.json
  ```
* **Fix**: Ensure `package.json` always remains directly in `/Users/jashan/Downloads/Project/erudition/` (the root project folder).
