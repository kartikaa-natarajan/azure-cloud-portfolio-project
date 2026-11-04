import { Schema, model, Document } from "mongoose";

export interface IProfile extends Document {
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

const profileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true, default: "Hemanth Raj" },
    role: { type: String, default: "Full Stack Developer | AWS Cloud Developer" },
    headline: {
      type: String,
      default: "Building scalable web applications and cloud-powered solutions.",
    },
    heroSubtitle: {
      type: String,
      default: "Passionate Full Stack Developer focused on building efficient, user-friendly and real-world applications using modern web technologies and AWS.",
    },
    bio: {
      type: String,
      default:
        "Passionate Full Stack Developer focused on building efficient, user-friendly and real-world applications using modern web technologies and AWS.",
    },
    aboutDescription: {
      type: String,
      default:
        "Hemanth Raj is a passionate Full Stack Developer who enjoys turning ideas into working products — from responsive frontends to secure, scalable backends. His work spans full stack development, REST APIs, AWS cloud infrastructure, and database design, with a steady focus on writing clean, maintainable code.",
    },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "Bengaluru, India" },
    githubUrl: { type: String, default: "https://github.com/StarlightSerena" },
    linkedinUrl: { type: String, default: "" },
    instagramUrl: { type: String, default: "" },
    youtubeUrl: { type: String, default: "" },
    twitterUrl: { type: String, default: "" },
    portfolioUrl: { type: String, default: "" },
    resumeUrl: { type: String, default: "/resume.pdf" },
    avatarUrl: { type: String, default: "" },
    availabilityStatus: { type: String, default: "Open to opportunities" },
  },
  { timestamps: true }
);

export const Profile = model<IProfile>("Profile", profileSchema);

