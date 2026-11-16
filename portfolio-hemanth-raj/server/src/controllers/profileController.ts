import { Request, Response } from "express";
import { z } from "zod";
import { Profile } from "../models/Profile";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  headline: z.string().min(1, "Headline is required"),
  heroSubtitle: z.string().optional(),
  bio: z.string().min(1, "Bio is required"),
  aboutDescription: z.string().optional(),
  email: z.string().email("Valid email is required").or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  githubUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  youtubeUrl: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  resumeUrl: z.string().optional(),
  avatarUrl: z.string().optional(),
  availabilityStatus: z.string().optional(),
});

export const getProfile = asyncHandler(async (_req: Request, res: Response) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create({
      name: "Hemanth Raj",
      role: "Full Stack Developer | AWS Cloud Developer",
      headline: "Building scalable web applications and cloud-powered solutions.",
      bio: "Passionate Full Stack Developer focused on building efficient, user-friendly and real-world applications using modern web technologies and AWS.",
      githubUrl: "https://github.com/StarlightSerena",
      resumeUrl: "/resume.pdf",
    });
  }
  res.json({ success: true, data: profile });
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const parsed = profileSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, "Invalid profile data payload", parsed.error.flatten());
  }

  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create(parsed.data);
  } else {
    Object.assign(profile, parsed.data);
    await profile.save();
  }

  res.json({ success: true, message: "Profile updated successfully", data: profile });
});
