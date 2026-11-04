import { Request, Response } from "express";
import { z } from "zod";
import { Project } from "../models/Project";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug must be lowercase, alphanumeric and hyphens only"),
  description: z.string().min(5),
  longDescription: z.string().optional(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  features: z.array(z.string()).optional(),
  challenges: z.string().optional(),
  learnings: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().optional(),
  category: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
});

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const { featured, category } = req.query;
  const filter: Record<string, unknown> = {};
  if (featured === "true") filter.featured = true;
  if (category) filter.category = category;

  const projects = await Project.find(filter).sort({ featured: -1, order: 1, createdAt: -1 });
  res.json({ success: true, count: projects.length, data: projects });
});

export const getProjectBySlug = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) throw new ApiError(404, "Project not found");
  res.json({ success: true, data: project });
});

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const parsed = projectSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, "Invalid project payload", parsed.error.flatten());

  const existing = await Project.findOne({ slug: parsed.data.slug });
  if (existing) throw new ApiError(409, "A project with this slug already exists");

  const project = await Project.create({ ...parsed.data, source: "manual" });
  res.status(201).json({ success: true, data: project });
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const parsed = projectSchema.partial().safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, "Invalid project payload", parsed.error.flatten());

  const project = await Project.findByIdAndUpdate(req.params.id, parsed.data, {
    new: true,
    runValidators: true,
  });
  if (!project) throw new ApiError(404, "Project not found");
  res.json({ success: true, data: project });
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");
  res.json({ success: true, message: "Project deleted" });
});
