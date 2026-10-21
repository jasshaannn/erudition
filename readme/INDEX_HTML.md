# 📄 Guide: `index.html` (Website Structure & Content)

`index.html` is the primary entrypoint for the website. It contains the semantic HTML5 structure, visual sections, modals, interactive forms, and content components.

---

## 📌 File Summary

* **Location**: Root directory (`/index.html`) and compiled to (`/public/index.html`)
* **Role**: Defines the visual layout, typography, navigation, sections, and accessibility attributes.
* **Theme Mode**: Locked to permanent Dark Mode via `<html lang="en" data-theme="dark">`.

---

## 🏗️ Detailed Breakdown of Sections

### 1. Document Head (`<head>`)
* **SEO Meta Tags**: Sets viewport, character encoding, and description for Google/search engines.
* **Social Sharing (Open Graph)**: `og:title`, `og:description`, and `og:type` control how the site looks when shared on WhatsApp, Facebook, or LinkedIn.
* **Favicon**: Links to `favicon.svg` with an academic book and sprouting leaf icon.
* **Google Fonts**: Loads **Bricolage Grotesque** (display headings) and **Public Sans** (body text).
* **Stylesheets**: Links to `erudition-portal.css` and embeds base fallback styling.

---

### 2. Header & Navigation (`<header>`)
* **Logo**: An embedded SVG/PNG image showing the Erudition Institute branding. The background is 100% transparent (`.plate { background: transparent !important; }`), ensuring it blends into the dark navbar.
* **Desktop Navigation**: Links to `#top`, `#director`, `#results`, `#calculator`, `#journey`, `#services`, and `#contact`.
* **Action Buttons**:
  * **"Get Started" Button**: Smoothly jumps down to `#enquire`.
  * **Mobile Menu Toggle (`#mobileMenuBtn`)**: Accessible hamburger button that opens the mobile drawer on mobile devices (< 820px).

---

### 3. Mobile Navigation Drawer (`#mobileNavDrawer`)
* A sliding overlay menu designed specifically for smartphones and tablets.
* Includes quick links to all sections, direct contact numbers, and an easy close button (`#mobileNavClose`).

---

### 4. Hero Section (`.hero`)
* **Headline**: *"Unlock Your Future with Global Education"*.
* **Trust Badge**: Highlights *"2,500+ Students guided"*.
* **Direct Call Button**: Direct phone number display (`+91 9555770391`).
* **Vector Illustration**: An SVG art piece showing a student with an open book and sprouting plant.

---

### 5. Quick Consultation Enquiry Band (`#enquire`)
* Form ID: `#f`
* Fields:
  * Name (`#n`)
  * Email (`#e`)
  * Phone (`#p`) — validated for 10 digits
  * Desired Course (`#c`) — IELTS/PTE, University Admissions, Visa Application, Career Counseling
* Output Status (`#ok`): Displays an instant confirmation message with reference ID (`#ENQ-XXXX`) when submitted.

---

### 6. Director & Founder Spotlight (`#director`)
* **Subject**: **Sumanpreet Kaur**, Founder & Managing Director.
* **Photo**: Displays `sumanpreet-kaur.jpg` with an overlaid *"100% Transparent Counseling"* badge.
* **Bio & Quote**: Highlights the vision of Erudition Institute in Bardhalan, Punjab.
* **Instagram Button**: Direct link to Sumanpreet Kaur's Instagram profile (`@isumanswaich`).
* **Metrics**: Displays key credentials: *2,500+ Students Mentored*, *98.4% Visa Success*, *1-on-1 Guidance*.

---

### 7. Results & Hall of Fame (`#results`)
* **Search Input (`#resultSearchInput`)**: Real-time filtering by candidate name, roll number, or country.
* **Filter Tabs**: Buttons to switch between *All Results*, *IELTS Academic*, *PTE Academic*, and *Visa Grants*.
* **Post Result Button (`#btnOpenPostResult`)**: Opens the modal to publish new student scorecards.
* **Results Grid (`#resultsGrid`)**: Container dynamically populated by `erudition-portal.js`.

---

### 8. Interactive Band Calculator (`#calculator`)
* **Sliders**: 4 range inputs for Listening (`#calcL`), Reading (`#calcR`), Writing (`#calcW`), and Speaking (`#calcS`).
* **Band Gauge**: Big typography displaying the calculated overall band (`#calcBigBand`) using Cambridge rounding rules.
* **Country Eligibility**: Real-time evaluation cards for Canada, UK, Australia, and USA.

---

### 9. Journey & Services (`#journey` & `#services`)
* **4-Step Path**: Career Counseling → Test Preparation → University Admissions → Visa Application.
* **Services Grid**: 4 cards detailing IELTS/PTE training, Admissions, Visa filing, and Counseling.

---

### 10. Contact & Location (`#contact`)
* **Contact Card**: Interactive "Copy" buttons for Phone, Email, and Address.
* **Working Hours**: Mon–Sat timings.
* **Map Pin**: Location information for Bardhalan, Punjab with a link to Google Maps.

---

### 11. Modals & Dialogs
* **`#postResultModal`**: Form allowing staff/administrators to add new student scorecards with dynamic IELTS, PTE, or Visa input fields.
* **`#scorecardModal`**: Official, high-resolution certificate template (`#certSheet`) with Print/PDF and WhatsApp sharing.

---

### 12. Floating Action Buttons
* **WhatsApp Button (`.float-whatsapp`)**: Direct chat with counselors on `+91 9555770391`.
* **Back to Top (`#btnBackToTop`)**: Smoothly scrolls the window to the top after scrolling past 350px.
