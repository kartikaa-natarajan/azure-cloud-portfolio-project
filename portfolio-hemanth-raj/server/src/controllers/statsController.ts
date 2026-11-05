import { Request, Response } from "express";
import { Project } from "../models/Project";
import { Skill } from "../models/Skill";
import { Experience } from "../models/Experience";
import { Education } from "../models/Education";
import { Achievement } from "../models/Achievement";
import { ContactMessage } from "../models/ContactMessage";
import { fetchGithubStats } from "../services/githubService";
import { asyncHandler } from "../utils/asyncHandler";

export const getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const [
    totalProjects,
    featuredProjects,
    totalSkills,
    experienceCount,
    educationCount,
    achievementsCount,
    unreadMessages,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ featured: true }),
    Skill.countDocuments(),
    Experience.countDocuments(),
    Education.countDocuments(),
    Achievement.countDocuments(),
    ContactMessage.countDocuments({ read: false }),
  ]);

  let githubRepos = 0;
  let githubStars = 0;
  try {
    const ghStats = await fetchGithubStats();
    githubRepos = ghStats.publicRepos;
    githubStars = ghStats.totalStars;
  } catch (err) {
    // Graceful fallback if GitHub API rate-limited or unconfigured
    const dbGithubProjects = await Project.find({ source: "github" });
    githubRepos = dbGithubProjects.length;
    githubStars = dbGithubProjects.reduce((acc, p) => acc + (p.stars || 0), 0);
  }

  res.json({
    success: true,
    data: {
      totalProjects,
      featuredProjects,
      totalSkills,
      experienceCount,
      educationCount,
      achievementsCount,
      unreadMessages,
      githubRepos,
      githubStars,
    },
  });
});
