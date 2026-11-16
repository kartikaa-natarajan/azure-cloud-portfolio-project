# Smrithi S — Portfolio

A minimal, professional cloud and security portfolio with a sunflower-inspired visual design. Built with Flask, HTML, CSS, and JavaScript, showcasing my academic background, technical skills, internship experience, and cloud computing projects.

The portfolio highlights hands-on experience with AWS services, cloud infrastructure, identity and access management, and serverless application development.

## 1. Run it locally

You'll need Python 3.10+ and pip installed.

Install the project dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask development server:

```bash
python app.py
```

Open the local URL printed in your terminal, usually:

`http://127.0.0.1:5000`

## 2. Portfolio sections

The portfolio includes the following sections:

- **About:** Introduction and academic background.
- **Skills:** Technical skills and cloud technologies.
- **Experience:** Internship and practical experience.
- **Projects:** Selected cloud computing and security projects.
- **Education:** Academic qualifications.
- **Contact:** Professional contact details and social links.

## 3. Featured projects

### Yumbot — AI Food Ordering Chatbot

An AI-powered food ordering chatbot built using Amazon Lex and AWS Lambda to process customer orders through conversational interactions.

### Amazon RDS Database Deployment

A relational database deployment using Amazon RDS, demonstrating cloud database configuration and management.

### AWS IAM Security Audit

A cloud security project focused on AWS Identity and Access Management, MFA, IAM Identity Center, and least-privilege access.

### Serverless Employee Management API

A serverless REST API developed using AWS Lambda, API Gateway, and Python to manage employee information.

## 4. Deployment

The portfolio is built using Flask and can be deployed on cloud platforms that support Python applications.

### Azure App Service

The application can be deployed using Azure App Service with the following configuration:

- Runtime: Python
- Application framework: Flask
- Startup command:

```bash
gunicorn --bind=0.0.0.0:8000 app:app
```

## 5. Project structure

```text
Smrithi_Portfolio/
├── app.py                  # Flask application
├── requirements.txt        # Python dependencies
├── templates/
│   └── index.html          # Portfolio webpage
├── static/
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript files
│   └── images/             # Images and assets
└── README.md
```

## 6. Tech stack

- Python
- Flask
- HTML5
- CSS3
- JavaScript
- Gunicorn
- Microsoft Azure App Service

## Notes

- The portfolio showcases academic projects, internship experience, and technical skills.
- The design follows a minimal, professional style with a sunflower-inspired aesthetic.
- The project is structured to make future updates to content and styling straightforward.

## Author

**Smrithi S**

MCA — Storage and Cloud Technology  
JAIN (Deemed-to-be University), Bengaluru

- GitHub: [Smrithi0](https://github.com/Smrithi0)
- LinkedIn: [Smrithi S](https://www.linkedin.com/in/smrithi-s-6791a227b/)
