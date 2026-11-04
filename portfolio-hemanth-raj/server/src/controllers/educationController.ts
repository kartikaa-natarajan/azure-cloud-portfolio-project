import { Request, Response } from "express";
import { z } from "zod";
import { Education } from "../models/Education";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

const educationSchema = z.object({
  degree: z.string().min(1),
  institution: z.string().min(1),
  location: z.string().optional(),
  startYear: z.string().optional(),
  endYear: z.string().optional(),
  description: z.string().optional(),
  grade: z.string().optional(),
  order: z.number().optional(),
});


export const getEducation = asyncHandler(async (_req: Request, res: Response) => {
  const items = await Education.find().sort({ order: 1, startYear: -1 });
  res.json({ success: true, count: items.length, data: items });
});

export const createEducation = asyncHandler(async (req: Request, res: Response) => {
  const parsed = educationSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, "Invalid payload", parsed.error.flatten());
  const item = await Education.create(parsed.data);
  res.status(201).json({ success: true, data: item });
});

export const updateEducation = asyncHandler(async (req: Request, res: Response) => {
  const parsed = educationSchema.partial().safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, "Invalid payload", parsed.error.flatten());
  const item = await Education.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  if (!item) throw new ApiError(404, "Education not found");
  res.json({ success: true, data: item });
});

export const deleteEducation = asyncHandler(async (req: Request, res: Response) => {
  const item = await Education.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, "Education not found");
  res.json({ success: true, message: "Education deleted" });
});
