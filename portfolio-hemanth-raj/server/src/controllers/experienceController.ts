import { Request, Response } from "express";
import { z } from "zod";
import { Experience } from "../models/Experience";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

const experienceSchema = z.object({
  title: z.string().min(1),
  organization: z.string().min(1),
  type: z.enum(["education", "project", "certification", "learning", "professional"]).optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  description: z.string().min(1),
  tags: z.array(z.string()).optional(),
  order: z.number().optional(),
});

export const getExperience = asyncHandler(async (_req: Request, res: Response) => {
  const items = await Experience.find().sort({ order: 1, startDate: -1 });
  res.json({ success: true, count: items.length, data: items });
});

export const createExperience = asyncHandler(async (req: Request, res: Response) => {
  const parsed = experienceSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, "Invalid payload", parsed.error.flatten());
  const item = await Experience.create(parsed.data);
  res.status(201).json({ success: true, data: item });
});

export const updateExperience = asyncHandler(async (req: Request, res: Response) => {
  const parsed = experienceSchema.partial().safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, "Invalid payload", parsed.error.flatten());
  const item = await Experience.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  if (!item) throw new ApiError(404, "Experience not found");
  res.json({ success: true, data: item });
});

export const deleteExperience = asyncHandler(async (req: Request, res: Response) => {
  const item = await Experience.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, "Experience not found");
  res.json({ success: true, message: "Experience deleted" });
});
