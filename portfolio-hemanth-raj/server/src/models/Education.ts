import { Schema, model, Document } from "mongoose";

export interface IEducation extends Document {
  degree: string;
  institution: string;
  location?: string;
  startYear?: string;
  endYear?: string;
  description?: string;
  grade?: string;
  order: number;
}

const educationSchema = new Schema<IEducation>(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    location: { type: String },
    startYear: { type: String, default: "" },
    endYear: { type: String, default: "" },
    description: { type: String },
    grade: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Education = model<IEducation>("Education", educationSchema);

