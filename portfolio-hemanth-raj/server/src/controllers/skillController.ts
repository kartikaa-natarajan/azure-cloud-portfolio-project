import { Request, Response } from "express";
import { z } from "zod";
import { Skill } from "../models/Skill";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

const skillSchema = z.object({
  name: z.string().min(1),
  category: z.enum(["Frontend", "Backend", "Database", "Cloud", "DevOps", "AI/ML", "Tools"]),
  icon: z.string().optional(),
  proficiency: z.string().optional(),
  order: z.number().optional(),
});


export const getSkills = asyncHandler(async (_req: Request, res: Response) => {
  const skills = await Skill.find().sort({ category: 1, order: 1 });
  res.json({ success: true, count: skills.length, data: skills });
});

export const createSkill = asyncHandler(async (req: Request, res: Response) => {
  const parsed = skillSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, "Invalid skill payload", parsed.error.flatten());
  const skill = await Skill.create(parsed.data);
  res.status(201).json({ success: true, data: skill });
});

export const updateSkill = asyncHandler(async (req: Request, res: Response) => {
  const parsed = skillSchema.partial().safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, "Invalid skill payload", parsed.error.flatten());
  const skill = await Skill.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  if (!skill) throw new ApiError(404, "Skill not found");
  res.json({ success: true, data: skill });
});

export const deleteSkill = asyncHandler(async (req: Request, res: Response) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) throw new ApiError(404, "Skill not found");
  res.json({ success: true, message: "Skill deleted" });
});
