import { Schema, model, Document } from "mongoose";

export interface IAchievement extends Document {
  title: string;
  description: string;
  category: "github" | "coding" | "certification" | "cloud" | "research" | "other";
  date?: string;
  link?: string;
  order: number;
}

const achievementSchema = new Schema<IAchievement>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["github", "coding", "certification", "cloud", "research", "other"],
      default: "other",
    },
    date: { type: String },
    link: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Achievement = model<IAchievement>("Achievement", achievementSchema);
