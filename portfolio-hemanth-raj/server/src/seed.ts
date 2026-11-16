/**
 * Seeds the database with:
 *  - An admin user (from ADMIN_EMAIL / ADMIN_PASSWORD in .env)
 *  - A default Profile document
 *  - Real projects sourced from https://github.com/StarlightSerena
 *  - Skills, education, experience/development-journey, and achievements
 *
 * Run with: npm run seed --workspace server
 */
import { connectDB } from "./config/db";
import { User } from "./models/User";
import { Profile } from "./models/Profile";
import { Project } from "./models/Project";
import { Skill } from "./models/Skill";
import { Education } from "./models/Education";
import { Experience } from "./models/Experience";
import { Achievement } from "./models/Achievement";
import { env } from "./config/env";
import mongoose from "mongoose";

async function seedAdmin() {
  if (!env.admin.password) {
    console.warn("[seed] ADMIN_PASSWORD not set in .env — skipping admin user creation.");
    return;
  }
  const existing = await User.findOne({ email: env.admin.email });
  if (existing) {
    console.log(`[seed] Admin user already exists: ${env.admin.email}`);
    return;
  }
  await User.create({
    name: env.admin.name,
    email: env.admin.email,
    password: env.admin.password,
    role: "admin",
  });
  console.log(`[seed] Created admin user: ${env.admin.email}`);
}

async function seedProfile() {
  await Profile.findOneAndUpdate(
    {},
    {
      name: "Hemanth Raj",
      role: "Full Stack Developer | AWS Cloud Developer",
      headline: "Building scalable web applications and cloud-powered solutions.",
      heroSubtitle: "Passionate Full Stack Developer focused on building efficient, user-friendly and real-world applications using modern web technologies and AWS.",
      bio: "Passionate Full Stack Developer focused on building efficient, user-friendly and real-world applications using modern web technologies and AWS.",
      aboutDescription: "Hemanth Raj is a passionate Full Stack Developer who enjoys turning ideas into working products — from responsive frontends to secure, scalable backends. His work spans full stack development, REST APIs, AWS cloud infrastructure, and database design, with a steady focus on writing clean, maintainable code.",
      email: env.admin.email,
      githubUrl: "https://github.com/StarlightSerena",
      linkedinUrl: "",
      instagramUrl: "",
      youtubeUrl: "",
      twitterUrl: "",
      portfolioUrl: "",
      location: "Bengaluru, India",
      resumeUrl: "https://github.com/StarlightSerena/Resume-hemanthraj-p/blob/main/Hemanth_Raj_P_Resume.pdf",
      availabilityStatus: "Open to opportunities",
    },
    { upsert: true, new: true }
  );
  console.log("[seed] Profile record updated.");
}


// Real repositories from https://github.com/StarlightSerena, curated for the portfolio.
const seedProjects = [
  {
    title: "Fridge Chef AI",
    slug: "fridge-chef-ai",
    description: "Turn Your Fridge Into Smart AI Chef",
    longDescription:
      "An AI-powered application that helps users generate recipe ideas from the ingredients they already have at home, reducing food waste and making everyday cooking easier.",
    problem: "Deciding what to cook with whatever ingredients happen to be in the fridge is a daily struggle that often leads to food waste or repetitive meals.",
    solution:
      "Users list the ingredients available to them and the app uses AI to suggest recipe ideas tailored to what's on hand, along with preparation guidance.",
    features: ["Ingredient-based recipe generation", "AI-powered suggestions", "Clean, responsive UI"],
    technologies: ["TypeScript", "React", "AI Integration"],
    githubUrl: "https://github.com/StarlightSerena/fridge-chef-ai-98",
    liveUrl: "https://fridge-chef-ai-98.lovable.app",
    category: "AI",
    featured: true,
    source: "github",
    githubRepoName: "fridge-chef-ai-98",
    language: "TypeScript",
  },
  {
    title: "Eco-Wise Water",
    slug: "eco-wise-water",
    description: "Smart Irrigation using AI-based Soil Moisture Prediction",
    longDescription:
      "A smart irrigation concept application that uses AI-based prediction of soil moisture levels to help plan water usage more efficiently for agriculture and gardening.",
    problem: "Manual irrigation scheduling often wastes water because it doesn't account for real soil moisture conditions.",
    solution:
      "The application models soil moisture prediction to recommend smarter irrigation timing, aiming to conserve water while keeping crops healthy.",
    features: ["Soil moisture prediction", "Irrigation planning dashboard", "Sustainability-focused design"],
    technologies: ["TypeScript", "React", "AI/ML Concepts"],
    githubUrl: "https://github.com/StarlightSerena/eco-wise-water",
    liveUrl: "https://eco-wise-water.lovable.app",
    category: "AI",
    featured: true,
    source: "github",
    githubRepoName: "eco-wise-water",
    language: "TypeScript",
  },
  {
    title: "Burger Yummy",
    slug: "burger-yummy",
    description: "Tasty Delicious Burger",
    longDescription:
      "A modern food/e-commerce style web application showcasing a burger menu with a clean, appetite-driving UI — built as a front-end product demo.",
    problem: "Food businesses need visually appealing, fast web menus that convert visitors into orders.",
    solution: "A modern single-page menu experience with product cards and a polished visual style suited for a food ordering flow.",
    features: ["Product menu layout", "Responsive design", "Modern UI components"],
    technologies: ["TypeScript", "React"],
    githubUrl: "https://github.com/StarlightSerena/BURGER-YUMMY",
    category: "Web Development",
    featured: false,
    source: "github",
    githubRepoName: "BURGER-YUMMY",
    language: "TypeScript",
  },
  {
    title: "Expense Tracker (Full Stack, Java)",
    slug: "expense-tracker-java",
    description: "Full-stack expense management project",
    longDescription:
      "A full-stack expense management application for tracking income and expenses, built with a Java-based backend as part of academic full-stack coursework.",
    problem: "Manually tracking personal expenses across notebooks or spreadsheets is error-prone and hard to analyze.",
    solution: "A structured application for logging, categorizing, and reviewing expenses through a full-stack architecture.",
    features: ["Expense CRUD operations", "Categorized tracking", "Full-stack architecture"],
    technologies: ["Java", "Full Stack"],
    githubUrl: "https://github.com/StarlightSerena/EXPENSE-TARCKER-FULL-STACK-WITH-JAVA",
    category: "Full Stack",
    featured: false,
    source: "github",
    githubRepoName: "EXPENSE-TARCKER-FULL-STACK-WITH-JAVA",
  },
  {
    title: "Expense Manager Pro",
    slug: "expense-manager-pro",
    description: "Full-stack expense manager deployed to production",
    longDescription:
      "A production-deployed expense manager built with React/Vite on the frontend and Node/Express with MongoDB on the backend, deployed using Vercel (frontend) and Render (backend) with MongoDB Atlas.",
    problem: "Needed a real, deployed full-stack app to demonstrate the complete lifecycle from local development to cloud deployment.",
    solution:
      "Built a React + Vite frontend and a Node/Express + MongoDB backend, then deployed the frontend to Vercel and backend to Render with MongoDB Atlas as the database.",
    features: ["Expense CRUD", "Cloud deployment (Vercel + Render)", "MongoDB Atlas integration"],
    technologies: ["React", "Vite", "Node.js", "Express.js", "MongoDB"],
    githubUrl: "https://github.com/StarlightSerena/expense-manager-pro",
    category: "Full Stack",
    featured: true,
    source: "github",
    githubRepoName: "expense-manager-pro",
    language: "JavaScript",
  },
  {
    title: "AWS File Storage",
    slug: "aws-file-storage",
    description: "Cloud-based file storage application using AWS S3",
    longDescription:
      "A full-stack file storage app with a Node/Express backend and vanilla JS frontend, using a dedicated IAM user and AWS S3 (Mumbai region) for secure, scalable file storage.",
    problem: "Applications need a reliable, secure way to store and retrieve user files without managing physical storage infrastructure.",
    solution:
      "Implemented an Express backend that authenticates via a scoped IAM user and streams file uploads/downloads to and from an AWS S3 bucket.",
    features: ["Secure file upload/download", "IAM-scoped AWS access", "S3 storage integration"],
    technologies: ["Node.js", "Express.js", "AWS S3", "IAM"],
    githubUrl: "https://github.com/StarlightSerena/aws-file-storage",
    category: "Cloud",
    featured: true,
    source: "github",
    githubRepoName: "aws-file-storage",
  },
];

const seedSkills = [
  // Frontend
  { name: "React", category: "Frontend", order: 1 },
  { name: "TypeScript", category: "Frontend", order: 2 },
  { name: "JavaScript", category: "Frontend", order: 3 },
  { name: "HTML5", category: "Frontend", order: 4 },
  { name: "CSS3", category: "Frontend", order: 5 },
  { name: "Tailwind CSS", category: "Frontend", order: 6 },
  // Backend
  { name: "Node.js", category: "Backend", order: 1 },
  { name: "Express.js", category: "Backend", order: 2 },
  { name: "REST APIs", category: "Backend", order: 3 },
  { name: "Java", category: "Backend", order: 4 },
  { name: "Python", category: "Backend", order: 5 },
  // Database
  { name: "MongoDB", category: "Database", order: 1 },
  { name: "MySQL", category: "Database", order: 2 },
  { name: "SQL", category: "Database", order: 3 },
  // Cloud
  { name: "EC2", category: "Cloud", order: 1 },
  { name: "S3", category: "Cloud", order: 2 },
  { name: "IAM", category: "Cloud", order: 3 },
  { name: "VPC", category: "Cloud", order: 4 },
  { name: "RDS", category: "Cloud", order: 5 },
  { name: "CloudWatch", category: "Cloud", order: 6 },
  { name: "CloudTrail", category: "Cloud", order: 7 },
  { name: "Elastic Beanstalk", category: "Cloud", order: 8 },
  { name: "ECR", category: "Cloud", order: 9 },
  { name: "ECS", category: "Cloud", order: 10 },
  { name: "Lambda", category: "Cloud", order: 11 },
  { name: "API Gateway", category: "Cloud", order: 12 },
  // Tools
  { name: "Git", category: "Tools", order: 1 },
  { name: "GitHub", category: "Tools", order: 2 },
  { name: "VS Code", category: "Tools", order: 3 },
  { name: "Postman", category: "Tools", order: 4 },
  { name: "Docker", category: "Tools", order: 5 },
];

const seedEducation = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Jain (Deemed-to-be) University",
    location: "Bengaluru, India",
    startYear: "2024",
    endYear: "2026",
    description: "Coursework spanning cloud computing, data analytics, full-stack development, and machine learning.",
    order: 1,
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Surana College",
    location: "Bengaluru, India",
    startYear: "",
    endYear: "",
    order: 2,
  },
];

const seedExperience = [
  {
    title: "Full Stack Development",
    organization: "Personal & Academic Projects",
    type: "project",
    startDate: "2025",
    endDate: "Present",
    description:
      "Building and deploying full-stack applications with React, Node.js, Express, and MongoDB, including production deployments on Vercel and Render.",
    tags: ["React", "Node.js", "MongoDB", "Deployment"],
    order: 1,
  },
  {
    title: "AWS Cloud Learning",
    organization: "Self-Directed / Coursework",
    type: "learning",
    startDate: "2025",
    endDate: "Present",
    description:
      "Hands-on work with EC2, S3, IAM, VPC, Elastic Beanstalk, and Terraform for infrastructure such as Auto Scaling Groups with Application Load Balancers.",
    tags: ["AWS", "Terraform", "EC2", "S3"],
    order: 2,
  },
  {
    title: "AI Projects",
    organization: "Independent Development",
    type: "project",
    startDate: "2025",
    description:
      "Developed AI-assisted applications including a fridge-ingredient recipe generator and a soil-moisture-based smart irrigation concept.",
    tags: ["AI", "TypeScript", "React"],
    order: 3,
  },
  {
    title: "Open-Source / GitHub Projects",
    organization: "github.com/StarlightSerena",
    type: "project",
    startDate: "2025",
    endDate: "Present",
    description: "Maintaining a public portfolio of full-stack, cloud, and AI project repositories.",
    tags: ["GitHub", "Portfolio"],
    order: 4,
  },
  {
    title: "DSA & Problem Solving",
    organization: "Self-Directed Practice",
    type: "learning",
    startDate: "2025",
    endDate: "Present",
    description: "Ongoing practice in data structures, algorithms, and aptitude problem solving.",
    tags: ["DSA", "Problem Solving"],
    order: 5,
  },
];

const seedAchievements = [
  {
    title: "Active GitHub Portfolio",
    description: "Maintains a public GitHub profile (StarlightSerena) with multiple full-stack, AI, and cloud projects.",
    category: "github",
    link: "https://github.com/StarlightSerena",
    order: 1,
  },
  {
    title: "AWS Cloud Project Work",
    description: "Hands-on AWS project work including S3-based file storage, EC2 automation, and Elastic Beanstalk deployment.",
    category: "cloud",
    order: 2,
  },
];

async function run() {
  await connectDB();

  await seedAdmin();
  await seedProfile();

  for (const p of seedProjects) {
    await Project.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
  }
  console.log(`[seed] Upserted ${seedProjects.length} projects.`);

  await Skill.deleteMany({});
  await Skill.insertMany(seedSkills);
  console.log(`[seed] Inserted ${seedSkills.length} skills.`);

  await Education.deleteMany({});
  await Education.insertMany(seedEducation);
  console.log(`[seed] Inserted ${seedEducation.length} education entries.`);

  await Experience.deleteMany({});
  await Experience.insertMany(seedExperience);
  console.log(`[seed] Inserted ${seedExperience.length} experience entries.`);

  await Achievement.deleteMany({});
  await Achievement.insertMany(seedAchievements);
  console.log(`[seed] Inserted ${seedAchievements.length} achievements.`);

  console.log("[seed] Done.");
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("[seed] Failed:", err);
  process.exit(1);
});
