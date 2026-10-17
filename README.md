# Erudition Institute — Results Portal & Official Website

> **Erudition Institute of Global Education**  
> Bus Stand, Main, Khanna - Samrala Rd, Bardhalan, Punjab 141412  
> Phone: +91 9555770391 | Email: info@eruditioninstitute.com

---

## 🚀 How to Deploy to Vercel

This repository is pre-configured and 100% ready for **Zero-Config deployment on Vercel**.

### Option 1: Automatic Deployment via GitHub (Recommended)

1. Commit and push your changes to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete results portal and vercel deployment setup"
   git push origin main
   ```
2. Go to [**vercel.com/new**](https://vercel.com/new).
3. Connect your GitHub account and import the repository: **`jasshaannn/erudition`**.
4. Leave the default settings (Framework Preset: **Other** / Static).
5. Click **Deploy**. Vercel will build and assign you a live production URL (e.g., `https://erudition.vercel.app`).
6. Every time you push to `main`, Vercel will automatically redeploy!

---

### Option 2: Deploy using Vercel CLI

Run this command in the project directory:
```bash
npx vercel
```
- When prompted to link to an existing project, select **N** (or link to your existing project).
- Keep default settings and press **Enter**.
- To deploy to production:
  ```bash
  npx vercel --prod
  ```

---

## 💻 Local Development

To run and preview the website locally:
```bash
npx serve .
```
or simply double-click [**`index.html`**](index.html) to open directly in any browser.

---

## 📂 Project Structure

```text
├── index.html               # Main website entrypoint for Vercel
├── Erudition Institute.html  # Synchronized root HTML
├── erudition-portal.js      # Interactive Results system & Band Calculator logic
├── erudition-portal.css     # Styles for results cards, modals, certificates & print media
├── favicon.svg              # Brand SVG favicon
├── vercel.json              # Vercel deployment routing & security headers
├── package.json             # NPM package scripts & project metadata
└── .gitignore               # Ignored files (backups, system files)
```
