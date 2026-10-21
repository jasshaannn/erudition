# 🎓 Erudition Institute — Results Portal & Official Website

> **Erudition Institute of Global Education**  
> Bus Stand, Main, Khanna - Samrala Rd, Bardhalan, Punjab 141412  
> Phone: +91 9555770391 | Email: info@eruditioninstitute.com

---

## 📚 Complete File Documentation (Readme Folder)

For an in-depth explanation of every file in the codebase, check the guides in the [**`readme/`**](./readme/) folder:

* 📄 [**`readme/INDEX_HTML.md`**](./readme/INDEX_HTML.md): Deep dive into `index.html` structure, semantic sections, and content editing.
* ⚙️ [**`readme/ERUDITION_PORTAL_JS.md`**](./readme/ERUDITION_PORTAL_JS.md): Explains JavaScript logic, Cambridge IELTS algorithms, modals, and local storage.
* 🎨 [**`readme/ERUDITION_PORTAL_CSS.md`**](./readme/ERUDITION_PORTAL_CSS.md): Explains permanent dark theme design tokens, glassmorphism, and print rules.
* 🚀 [**`readme/VERCEL_JSON.md`**](./readme/VERCEL_JSON.md): Explains Vercel cloud hosting, routing, clean URLs, and security headers.
* 📦 [**`readme/PACKAGE_JSON.md`**](./readme/PACKAGE_JSON.md): Explains NPM commands, automated build synchronization, and local server.
* 🖼️ [**`readme/ASSETS_AND_MEDIA.md`**](./readme/ASSETS_AND_MEDIA.md): Explains photos, logos, favicons, dimensions, and replacement guides.

---

## 💻 Local Development

To run and preview the website locally on your Mac:

```bash
# Automatically builds and starts the local server at http://localhost:3000
npm run dev
```

*Tip: You can also open the website directly by running `open index.html`.*

---

## 🚀 How to Deploy to Vercel

This repository is configured for **Zero-Config deployment on Vercel**.

### Option 1: Automatic Deployment via GitHub (Recommended)

Whenever you push to `main`, Vercel automatically redeploys your site:

```bash
# 1. Sync assets into the public directory
npm run build

# 2. Stage and commit changes
git add .
git commit -m "your update message"

# 3. Push to GitHub
git push origin main
```

---

### Option 2: Deploy using Vercel CLI

```bash
npx vercel --prod
```

---

## 📂 Project Structure

```text
erudition/
├── index.html               # Main website entrypoint (Permanent Dark Theme)
├── erudition-portal.js      # Results management engine & Band Calculator logic
├── erudition-portal.css     # Dark mode design tokens & responsive components
├── sumanpreet-kaur.jpg      # Official photograph of Founder Sumanpreet Kaur
├── logo-dark-mode.png       # Transparent dark-mode brand logo (White text)
├── favicon.svg              # Scalable Vector brand tab icon
├── vercel.json              # Vercel deployment routing & security headers
├── package.json             # NPM package scripts & automated build sync
├── .gitignore               # Excludes system and temporary files
├── README.md                # Root project documentation (You are here!)
│
├── public/                  # Compiled production directory used by Vercel
│   ├── index.html
│   ├── erudition-portal.js
│   ├── erudition-portal.css
│   ├── favicon.svg
│   ├── sumanpreet-kaur.jpg
│   ├── logo-dark-mode.png
│   └── Erudition Institute.html
│
└── readme/                  # Detailed technical guides for each file
    ├── README.md            # Master index for all guides
    ├── INDEX_HTML.md        # HTML guide
    ├── ERUDITION_PORTAL_JS.md # JavaScript guide
    ├── ERUDITION_PORTAL_CSS.md# CSS guide
    ├── VERCEL_JSON.md       # Vercel guide
    ├── PACKAGE_JSON.md      # Package.json guide
    └── ASSETS_AND_MEDIA.md  # Images and media guide
```
