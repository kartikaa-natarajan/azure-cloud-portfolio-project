# Azure Portfolio - Static Web App

A personal portfolio website built using HTML, CSS, and JavaScript and deployed on Microsoft Azure Static Web Apps.

## About the Project

This project is a responsive personal portfolio designed to showcase my:

- Academic background
- Technical skills
- Projects
- Education
- Cloud and DevOps interests
- Contact information

The website is designed as a lightweight static web application and does not require a backend server.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Git
- GitHub
- GitHub Actions
- Microsoft Azure Static Web Apps
- FormSubmit

## Portfolio Sections

The website contains the following sections:

- Home
- About
- Skills
- Projects
- Education
- Contact

## Contact Form

The contact form uses **FormSubmit** to forward messages to:

**jjee2577@gmail.com**

No Flask backend, Azure Function, SMTP password, or email credentials are stored in this repository.

On the first submission, FormSubmit may send a confirmation email to the destination email address. The confirmation link must be clicked once to activate the form.

## GitHub Repository

Repository:

https://github.com/gkjeeva12/Azure-Portfolio1

## Azure Deployment

The portfolio is deployed using **Microsoft Azure Static Web Apps**.

### Azure Static Web Apps Configuration

- **App location:** `/`
- **API location:** Leave empty
- **Output location:** Leave empty

GitHub Actions is used to automatically deploy changes from the `main` branch to Azure Static Web Apps.

## Live Portfolio

https://wonderful-sand-0a4c23b00.7.azurestaticapps.net

## Project Structure

```text
Azure-Portfolio1/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── staticwebapp.config.json
└── README.md
