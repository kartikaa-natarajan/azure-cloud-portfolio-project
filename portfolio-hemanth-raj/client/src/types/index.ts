export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  problem?: string;
  solution?: string;
  features: string[];
  challenges?: string;
  learnings?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  category: string;
  featured: boolean;
  source: "manual" | "github";
  stars?: number;
  forks?: number;
  language?: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export type SkillCategory = "Frontend" | "Backend" | "Database" | "Cloud" | "DevOps" | "AI/ML" | "Tools";

export interface Skill {
  _id: string;
  name: string;
  category: SkillCategory;
  icon?: string;
  proficiency?: string;
  order: number;
}

export interface ExperienceItem {
  _id: string;
  title: string;
  organization: string;
  type: "education" | "project" | "certification" | "learning" | "professional";
  startDate: string;
  endDate?: string;
  description: string;
  tags: string[];
  order: number;
}

export interface EducationItem {
  _id: string;
  degree: string;
  institution: string;
  location?: string;
  startYear?: string;
  endYear?: string;
  description?: string;
  grade?: string;
  order: number;
}

export interface Achievement {
  _id: string;
  title: string;
  description: string;
  category: "github" | "coding" | "certification" | "cloud" | "research" | "other";
  date?: string;
  link?: string;
  order: number;
}

export interface ContactMessageReply {
  _id: string;
  parentId?: string;
  sender: "visitor" | "admin";
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface ContactMessage {
  _id: string;
  conversationId?: string;
  sender?: "visitor" | "admin";
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt?: string;
  replies?: ContactMessageReply[];
}


export interface Profile {
  _id: string;
  name: string;
  role: string;
  headline: string;
  heroSubtitle?: string;
  bio: string;
  aboutDescription?: string;
  email: string;
  phone?: string;
  location?: string;
  githubUrl: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
  portfolioUrl?: string;
  resumeUrl: string;
  avatarUrl?: string;
  availabilityStatus?: string;
}

export interface AdminDashboardStats {
  totalProjects: number;
  featuredProjects: number;
  totalSkills: number;
  experienceCount: number;
  educationCount: number;
  achievementsCount: number;
  unreadMessages: number;
  githubRepos: number;
  githubStars: number;
}

export interface GithubStats {
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  topLanguages: { language: string; count: number }[];
  followers: number;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

