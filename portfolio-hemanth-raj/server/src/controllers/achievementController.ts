import { Request, Response } from "express";
import { z } from "zod";
import { Achievement } from "../models/Achievement";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

const achievementSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(["github", "coding", "certification", "cloud", "research", "other"]).optional(),
  date: z.string().optional(),
  link: z.string().url().optional().or(z.literal("")),
  order: z.number().optional(),
});

export const getAchievements = asyncHandler(async (_req: Request, res: Response) => {
  const items = await Achievement.find().sort({ order: 1, date: -1 });
  res.json({ success: true, count: items.length, data: items });
});

export const createAchievement = asyncHandler(async (req: Request, res: Response) => {
  const parsed = achievementSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, "Invalid payload", parsed.error.flatten());
  const item = await Achievement.create(parsed.data);
  res.status(201).json({ success: true, data: item });
});

export const updateAchievement = asyncHandler(async (req: Request, res: Response) => {
  const parsed = achievementSchema.partial().safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, "Invalid payload", parsed.error.flatten());
  const item = await Achievement.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  if (!item) throw new ApiError(404, "Achievement not found");
  res.json({ success: true, data: item });
});

export const deleteAchievement = asyncHandler(async (req: Request, res: Response) => {
  const item = await Achievement.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, "Achievement not found");
  res.json({ success: true, message: "Achievement deleted" });
});
