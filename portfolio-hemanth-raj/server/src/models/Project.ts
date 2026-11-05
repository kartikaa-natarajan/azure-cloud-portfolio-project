import { Schema, model, Document } from "mongoose";

export interface IProject extends Document {
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
  githubRepoName?: string;
  stars?: number;
  forks?: number;
  language?: string;
  order: number;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    problem: { type: String },
    solution: { type: String },
    features: { type: [String], default: [] },
    challenges: { type: String },
    learnings: { type: String },
    technologies: { type: [String], default: [] },
    githubUrl: { type: String },
    liveUrl: { type: String },
    imageUrl: { type: String },
    category: { type: String, default: "Full Stack" },
    featured: { type: Boolean, default: false },
    source: { type: String, enum: ["manual", "github"], default: "manual" },
    githubRepoName: { type: String },
    stars: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    language: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Note: `slug` already has a unique index from `unique: true` above — no need to redeclare it here.
projectSchema.index({ featured: -1, order: 1 });

export const Project = model<IProject>("Project", projectSchema);
