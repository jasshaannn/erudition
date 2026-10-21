# ⚙️ Guide: `erudition-portal.js` (JavaScript Engine & Logic)

`erudition-portal.js` is the core JavaScript controller engine powering all interactive features on the website. It handles state management, Cambridge IELTS score calculations, real-time search, modal dialogs, certificate rendering, and browser storage.

---

## 📌 File Summary

* **Location**: Root directory (`/erudition-portal.js`) and compiled to (`/public/erudition-portal.js`)
* **Execution**: Wrapped inside an Immediately Invoked Function Expression (IIFE) with strict mode (`'use strict';`).
* **Double-Execution Guard**: Uses `window.__eruditionPortalInitialized` to ensure scripts never attach duplicate event listeners.

---

## 🧠 Core Functional Modules

### 1. Initialization & Boot Routine (`init()`)
Called automatically when the DOM is ready (`DOMContentLoaded`):
```javascript
function init() {
  loadResultsData();      // Reads from localStorage or loads seed data
  initTheme();            // Enforces permanent dark theme
  initMobileNav();        // Sets up hamburger drawer open/close
  initResultsSection();   // Binds search and category filter tabs
  initPostResultModal();  // Configures the Add Result modal form
  initScorecardModal();   // Configures certificate display and printing
  initBandCalculator();   // Configures IELTS sliders and eligibility rules
  initFloatingActions();  // Handles WhatsApp & back-to-top buttons
  initEnhancedEnquiry();  // Validates consultation form
  initClipboardCopy();    // Configures one-click copy buttons
}
```

---

### 2. State & Storage Architecture
* **`erudition_institute_results_v2`**: LocalStorage key storing the array of student scorecards and visa grants.
* **`erudition_institute_enquiries`**: LocalStorage key saving submitted consultation requests.
* **`SEED_RESULTS`**: Default array of verified student success stories preloaded when a user visits the site for the first time:
  * *Harpreet Kaur* (IELTS Academic 8.0 Bands)
  * *Gurkirat Singh* (PTE Academic 79/90)
  * *Jaspreet Singh* (Canada Study Visa Granted)
  * *Simranjit Kaur* (IELTS 7.5 Bands)
  * *Navjot Singh* (UK Visa Approved)
  * *Amanpreet Dhillon* (PTE Academic 84/90)

---

### 3. Cambridge IELTS Rounding Algorithm (`computeIeltsOverall`)
Implements the exact official British Council / IDP IELTS scoring standard:

$$\text{Average} = \frac{\text{Listening} + \text{Reading} + \text{Writing} + \text{Speaking}}{4}$$

```javascript
function computeIeltsOverall(l, r, w, s) {
  var avg = (l + r + w + s) / 4.0;
  var intPart = Math.floor(avg);
  var dec = avg - intPart;

  if (dec < 0.25) {
    return intPart;         // e.g., 6.125 -> 6.0
  } else if (dec < 0.75) {
    return intPart + 0.5;   // e.g., 6.25 -> 6.5, 6.375 -> 6.5
  } else {
    return intPart + 1.0;   // e.g., 6.75 -> 7.0, 7.875 -> 8.0
  }
}
```

---

### 4. Results Search & Filtering Engine (`renderResultsGrid`)
* **Category Filter**: Matches `item.category` against the selected tab (`all`, `ielts`, `pte`, `visa`).
* **Real-Time Search Query**: Performs case-insensitive matching across:
  * Student Name
  * Roll Number / Student ID
  * Course / Exam Sub-Type
  * Target Country / Institution
  * Mentor Remarks
* **Empty State Handling**: If no match is found, displays a friendly *"No Results Found"* card with a *"Reset Filters"* button.

---

### 5. Post Student Result Controller (`initPostResultModal`)
* Allows institute staff to post a new student scorecard.
* **Automatic Roll Number Generator**: Generates a suggested roll number (e.g., `ERU-2026-XXX`).
* **Dynamic Form Fields**:
  * Choosing **IELTS** displays 4 dropdowns (5.0 to 9.0) and automatically shows the live calculated band.
  * Choosing **PTE** displays 4 number inputs (10 to 90) and calculates the average score.
  * Choosing **Visa** displays Country, College, Course, and Grant ID fields.
* **Live Prepending**: Prepends the new record to `resultsList` (`unshift`), saves to `localStorage`, and updates the cards grid without a page refresh.

---

### 6. Official Scorecard Modal & Certificate Generator (`openScorecardModal`)
* Populates `#certSheet` with an authentic **Statement of Results & Achievement**:
  * Institute Header (Bardhalan, Punjab)
  * Candidate Full Name & Roll ID
  * Module-by-module score matrix with performance descriptors:
    * $\ge 8.5 \rightarrow$ *Expert User (C2)*
    * $\ge 7.5 \rightarrow$ *Very Good Operational (C1)*
    * $\ge 6.5 \rightarrow$ *Good User (B2)*
  * Digital Verification Stamp with unique Base64 security hash.
  * Official Academic Director signature block.
* **Print Action**: Calls `window.print()` which leverages `@media print` rules to print just the clean certificate on A4 paper.
* **WhatsApp Share**: Encodes a pre-formatted congratulatory message linking to the student's verification ID.

---

### 7. Band Calculator & Overseas Eligibility Evaluator (`initBandCalculator`)
* Binds `input` events to the 4 module sliders (`#calcL`, `#calcR`, `#calcW`, `#calcS`).
* **Instant Country Eligibility Evaluation**:
  * **Band 7.0+ (no band $< 6.5$)**: Direct admission to Canada SDS, top universities (UBC, Toronto), UK Russell Group, Australian Go8.
  * **Band 6.5+ (no band $< 6.0$)**: Direct entry to Canadian SDS colleges (Seneca, Humber, St. Clair) and 90%+ UK/Australian degree programs.
  * **Band 6.0**: Direct diploma and pathway entry.
  * **Below 6.0**: Displays recommendation to enroll in Erudition's 4-Week Fastrack Band Booster course.

---

### 8. Enhanced Consultation Enquiry System (`initEnhancedEnquiry`)
* Validates name length ($\ge 2$ characters) and telephone number ($\ge 10$ digits).
* Generates a unique tracking reference (e.g., `#ENQ-4821`).
* Saves the lead object to `localStorage` under `erudition_institute_enquiries`.
* Renders a confirmation banner with an SLA stating: *"Our senior counselor will call you within 2 hours"*.

---

### 9. Toast Notification Engine (`showToast`)
* Lightweight notification system rendered at the bottom-left corner of the screen.
* Automatically animates in (`.show`), waits 3.5 seconds, and fades out cleanly.
