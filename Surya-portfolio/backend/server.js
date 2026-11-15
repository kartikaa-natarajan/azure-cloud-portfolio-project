const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Azure provides the PORT through an environment variable.
// Locally, it will use port 3000.
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ===============================
// PROJECTS API
// ===============================

app.get("/api/projects", (req, res) => {
    const projects = [
        {
            id: 1,
            name: "AWS Static Website Hosting",
            technologies: ["AWS", "S3", "HTML", "CSS"]
        },
        {
            id: 2,
            name: "Serverless API with AWS Lambda",
            technologies: ["AWS Lambda", "API", "Serverless"]
        },
        {
            id: 3,
            name: "AWS Infrastructure as Code",
            technologies: ["AWS CDK", "TypeScript", "CloudFormation"]
        },
        {
            id: 4,
            name: "Azure Portfolio Launchpad",
            technologies: ["Azure", "Node.js", "App Service"]
        }
    ];

    res.json(projects);
});

// ===============================
// CONTACT API
// ===============================

app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;

    console.log("New contact message:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    res.json({
        success: true,
        message: `Thank you ${name}! Your message has been received.`
    });
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});