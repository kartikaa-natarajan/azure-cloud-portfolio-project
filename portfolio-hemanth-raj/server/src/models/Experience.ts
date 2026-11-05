import { Schema, model, Document } from "mongoose";

export interface IExperience extends Document {
  title: string;
  organization: string;
  type: "education" | "project" | "certification" | "learning" | "professional";
  startDate: string;
  endDate?: string;
  description: string;
  tags: string[];
  order: number;
}

const experienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    type: {
      type: String,
      enum: ["education", "project", "certification", "learning", "professional"],
      default: "project",
    },
    startDate: { type: String, required: true },
    endDate: { type: String },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Experience = model<IExperience>("Experience", experienceSchema);
