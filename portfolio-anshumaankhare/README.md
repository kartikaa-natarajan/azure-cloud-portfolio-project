# Anshumaan Khare - Portfolio Website

A modern, high-performance developer portfolio built with pure **HTML5, CSS3, Tailwind CSS, and vanilla JavaScript**, showcasing cloud architectures, distributed systems, and production suites.

---

## 🌟 Featured Project Highlight

### **ILoveMyOfficeWorks: Office Productivity Suite**
- **Repository**: [github.com/Anshumaankhare2403/ILoveMyOfficeWorks](https://github.com/Anshumaankhare2403/ILoveMyOfficeWorks)
- **Architecture**:
  - **35 Tools across 7 Suites**: PDF management, document conversion (PDF ↔ Word/Excel/PPT/TXT), live editing & digital signing, image processing, security & encryption, file organization, and smart batch processing.
  - **Client-Side Privacy Engine**: Zero-server upload workflow ensuring user files remain strictly within the browser sandbox/local device memory during supported operations.
  - **Cross-Platform**: Accessible via web application, desktop client, and mobile versions.
  - **Focus Areas**: Document Processing, Office Productivity, File Organization, Data Privacy, Client-Side Security.

---

## 🛠️ Tech Stack & Features

- **Pure Frontend Core**:
  - `index.html` — Clean semantic HTML5 structure with SEO metadata, OpenGraph tags, and accessibility features.
  - `style.css` — Custom animations, glassmorphism, glowing cards, and custom scrollbars.
  - `script.js` — Pure vanilla JavaScript for all interactions (zero frameworks, zero build step required).
  - `assets/` — Profile photography and downloadable PDF resume.
- **CDN Integrations**:
  - Tailwind CSS (via official script tag)
  - Font Awesome 6 (via cdnjs)
  - Google Fonts (Plus Jakarta Sans & JetBrains Mono)
- **Interactive Animations**:
  - Interactive constellation & particle canvas with cursor attraction
  - Typing effect for engineering specializations
  - 3D perspective tilt effect on profile card
  - Dynamic metric counters with IntersectionObserver
  - Interactive project filtering
  - Spotlight flashlight glow on project cards
  - ILoveMyOfficeWorks 35-tool deep-dive modal
  - In-browser PDF resume viewer & 1-click download
  - Toast notification feedback & clipboard copy with fallback
  - Smooth light / dark theme toggle with localStorage persistence

---

## 🚀 Running Locally

No installation or build step is needed!

### Option 1: Direct in Browser (Simplest)
Double-click `index.html` or open it directly in any web browser (`Chrome`, `Edge`, `Firefox`, `Safari`).

### Option 2: Using VS Code Live Server
Right-click `index.html` in VS Code and select **Open with Live Server**.

### Option 3: Using Python
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

### Option 4: Using Node / npx
```bash
npx serve .
```

---

## ☁️ Azure Cloud Deployment
Deployable via **Azure Static Web Apps** with automated GitHub Actions CI/CD workflows:
- **App location**: `portfolio-anshumaankhare`
- **Output location**: `portfolio-anshumaankhare`
- **Skip app build**: `true` (Pure static HTML/CSS/JS)
