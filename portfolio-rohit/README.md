# ☁️ Rohit Devdas — Cloud Computing & DevOps Portfolio

[![AWS Certified](https://img.shields.io/badge/AWS-Certified_Solutions_Architect_Associate-FF9900?logo=amazon-aws&logoColor=white)](https://aws.amazon.com/certification/certified-solutions-architect-associate/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.19+-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Azure Deployment](https://img.shields.io/badge/Azure-App_Service_Ready-0078D4?logo=microsoft-azure&logoColor=white)](https://azure.microsoft.com/)

A modern, high-performance, and animated personal portfolio website built with a **Node.js/Express backend**, responsive **HTML5/CSS3/JavaScript frontend**, dynamic **particle canvas animations**, and an interactive simulated **Cloud Shell / CLI Terminal**.

Deployed as part of the collaborative **Azure Cloud Portfolio Deployment Project**.

---

## 📌 Project Overview

This repository contains the complete portfolio application of **Rohit Devdas**, highlighting expertise across:
* **Cloud Architecture:** Multi-cloud solutions (AWS, Azure, GCP), resilient infrastructure design, cost optimization, and high availability.
* **DevOps & Automation:** Containerization with Docker, orchestration with Kubernetes, Infrastructure as Code (IaC) with Terraform, and CI/CD automation with GitHub Actions.
* **Linux Systems:** Linux administration (Ubuntu, RHEL), Bash scripting, system performance tuning, and DevSecOps best practices.
* **Full-Stack Development:** Modern responsive frontend with Node.js and Express backend server.

---

## 🏗️ Architecture & Deployment

```text
┌────────────────────────────────────────────────────────┐
│                   Client Browser                       │
│  (Modern Dark UI • Particle Canvas • Live CLI Shell)   │
└──────────────────────────┬─────────────────────────────┘
                           │ HTTP / HTTPS
                           ▼
┌────────────────────────────────────────────────────────┐
│          Node.js / Express Backend Server              │
│  • Gzip Compression (compression middleware)           │
│  • High-performance static asset caching               │
│  • SPA fallback routing                                │
│  • Configurable port binding (process.env.PORT)        │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│             Microsoft Azure Cloud Hosting              │
│       (Azure App Service / Azure Static Web Apps)      │
│  • Continuous Deployment via GitHub Actions CI/CD      │
│  • Zero-downtime releases                              │
│  • Automatic TLS/SSL encryption                        │
└────────────────────────────────────────────────────────┘
```

---

## ✨ Features

* **Interactive Cloud Shell / CLI Terminal:** An in-browser simulated terminal supporting commands like `help`, `whoami`, `skills`, `projects`, `certs`, `aws-status`, and `clear`.
* **Animated Particle Canvas:** Custom interactive background rendered in real-time via HTML5 Canvas API.
* **Comprehensive Sections:**
  * **Hero Section:** Dynamic typing animation, status indicators, and call-to-actions.
  * **Key Stats Banner:** Overview of certifications, projects, and degree specialization.
  * **About Section:** Cloud Infrastructure, DevOps & IaC, Linux Administration & Security.
  * **Technical Skills Matrix:** Categorized into Cloud, DevOps, OS/Scripting, Web Tech, and Database systems.
  * **Professional Certifications:** Showcasing AWS Certified Solutions Architect – Associate (SAA-C03) and 7+ credentials.
  * **Projects Showcase:** Featured cloud and DevOps automation projects with architecture highlights.
  * **Interactive Contact Form:** Direct client-side validation and quick contact links.
* **Production-Grade Server:** Node.js Express server configured with HTTP compression and optimal caching headers for cloud environments.

---

## 🛠️ Tech Stack

### Frontend
* **HTML5 & CSS3:** Semantic markup, CSS Grid & Flexbox, custom CSS variables, glassmorphism design.
* **JavaScript (Vanilla ES6+):** Responsive mobile menu, terminal emulator logic, particle physics engine.
* **Icons & Fonts:** Font Awesome 6, Google Fonts (`Inter`, `JetBrains Mono`).

### Backend
* **Node.js (v18+):** JavaScript runtime.
* **Express.js (v4.19+):** Web server framework.
* **Compression:** Gzip compression middleware for bandwidth reduction and fast loading.

### Cloud & DevOps
* **Microsoft Azure:** Target cloud deployment platform (Azure App Service / Web Apps).
* **AWS:** Certified Solutions Architect Associate (SAA-C03) architectural standards.
* **CI/CD:** Automated builds and deployments via GitHub Actions.
* **IaC & Containers:** Docker, Kubernetes, Terraform foundations.

---

## 📂 Folder Structure

```text
portfolio-rohit/
├── images/                  # Image assets
│   ├── profile.png          # Profile picture
│   └── project1.png         # Project screenshot preview
├── index.html               # Main single-page application interface
├── style.css                # Custom styling and animations
├── script.js                # Frontend scripts, particle canvas & terminal CLI logic
├── server.js                # Express.js production server with compression
├── package.json             # Node.js project dependencies and scripts
├── package-lock.json        # Pinned dependency lockfile
├── .gitignore               # Ignored files (node_modules, logs, etc.)
└── README.md                # Project documentation
```

---

## 🚀 Local Setup & Installation

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18.0.0 or higher)
* [npm](https://www.npmjs.com/) (bundled with Node.js)
* [Git](https://git-scm.com/)

### Steps

1. **Navigate to the portfolio directory:**
   ```bash
   cd portfolio-rohit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local server:**
   ```bash
   npm start
   ```
   *Or for development:*
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open your browser and navigate to:
   ```text
   http://localhost:8080
   ```

---

## 👨‍💻 Author

**Rohit Devdas**
* **Role:** Cloud Computing & DevOps Engineer
* **Certification:** AWS Certified Solutions Architect – Associate (SAA-C03)
* **Education:** MCA in Storage & Cloud Technology, Jain University
* **Location:** Bangalore, Karnataka, India
* **LinkedIn:** [linkedin.com/in/rohit-devdas-5a73b0395](https://linkedin.com/in/rohit-devdas-5a73b0395)
* **Email:** [rohitmr2324@gmail.com](mailto:rohitmr2324@gmail.com)
* **GitHub:** [Rohit24-devOp](https://github.com/Rohit24-devOp)

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
