import { Schema, model, Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Cloud" | "DevOps" | "AI/ML" | "Tools";
  icon?: string;
  proficiency?: string;
  order: number;
}

const skillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "Database", "Cloud", "DevOps", "AI/ML", "Tools"],
      required: true,
    },
    icon: { type: String },
    proficiency: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Skill = model<ISkill>("Skill", skillSchema);

