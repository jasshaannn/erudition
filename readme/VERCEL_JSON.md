# 🚀 Guide: `vercel.json` (Vercel Cloud Deployment & Security)

`vercel.json` is the configuration file used by **Vercel** to control how the project is built, routed, cached, and secured on the global Vercel Edge Network.

---

## 📌 File Summary

* **Location**: Root directory (`/vercel.json`)
* **Format**: Standard JSON schema conforming to `https://openapi.vercel.sh/vercel.json`
* **Role**: Configures the build output folder, clean URLs, security headers, asset caching, and URL rewrites.

---

## 🔍 Detailed Property Breakdown

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "outputDirectory": "public",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [ ... ],
  "rewrites": [ ... ]
}
```

### 1. `outputDirectory: "public"`
* **Why this is critical**: Tells Vercel's build runner exactly which folder contains the static web files to serve to the public.
* **How it works**: When Vercel executes `npm run build`, all assets are placed into `public/`. Vercel directly serves this folder on its Edge CDN.
* Resolves the previous `No Output Directory named "public" found` build error.

---

### 2. `cleanUrls: true`
* Strips file extensions from URLs in the browser address bar.
* Example: Visiting `/index.html` cleanly displays as `/` without showing `.html`.

---

### 3. `trailingSlash: false`
* Normalizes URL paths by removing trailing slashes (e.g., redirects `/results/` to `/results`), preventing duplicate page rankings in search engines.

---

### 4. Production Security Headers (`headers`)
Configures HTTP response headers applied automatically to every request on Vercel:

```json
{
  "key": "X-Content-Type-Options",
  "value": "nosniff"
}
```
* **Protection**: Prevents MIME-type sniffing attacks where browsers try to execute non-executable files.

```json
{
  "key": "X-Frame-Options",
  "value": "DENY"
}
```
* **Protection**: Prevents clickjacking attacks by disallowing malicious external sites from embedding the Erudition Institute website inside an `<iframe>`.

```json
{
  "key": "X-XSS-Protection",
  "value": "1; mode=block"
}
```
* **Protection**: Enables cross-site scripting (XSS) filters built into legacy and modern web browsers.

---

### 5. High-Performance Static Caching
```json
{
  "source": "/(.*).(css|js|svg|png|jpg|ico)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000, immutable"
    }
  ]
}
```
* **Performance Benefit**: Instructs browser and CDN caches to store static assets (CSS, JS, logos, photographs) for up to 1 year (`max-age=31536000`), resulting in near-instant sub-50ms repeat page loads worldwide.

---

### 6. Clean URL Rewrites (`rewrites`)
```json
"rewrites": [
  { "source": "/results", "destination": "/index.html" },
  { "source": "/calculator", "destination": "/index.html" }
]
```
* Allows users to access deep links such as `https://your-domain.vercel.app/results` or `/calculator` directly without encountering 404 errors.
