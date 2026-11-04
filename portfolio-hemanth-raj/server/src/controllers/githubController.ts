import { Request, Response } from "express";
import {
  fetchGithubProfile,
  fetchGithubRepositories,
  fetchGithubStats,
  clearGithubCache,
} from "../services/githubService";
import { Project } from "../models/Project";
import { asyncHandler } from "../utils/asyncHandler";

export const getGithubProfile = asyncHandler(async (_req: Request, res: Response) => {
  const profile = await fetchGithubProfile();
  res.json({ success: true, data: profile });
});

export const getGithubRepositories = asyncHandler(async (_req: Request, res: Response) => {
  const repos = await fetchGithubRepositories();
  const visible = repos
    .filter((r) => !r.fork)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  res.json({ success: true, count: visible.length, data: visible });
});

export const getGithubStats = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await fetchGithubStats();
  res.json({ success: true, data: stats });
});

// Slugify a repo name into a URL-friendly project slug.
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Pulls the authenticated GitHub user's repositories and upserts them into the
 * Project collection. Manually curated fields (longDescription, problem, solution,
 * features, challenges, learnings) are preserved on repeat syncs — only the
 * GitHub-sourced fields (stars, forks, language, url, description fallback) are refreshed.
 */
export const syncGithubProjects = asyncHandler(async (_req: Request, res: Response) => {
  clearGithubCache();
  const repos = await fetchGithubRepositories();
  const candidates = repos.filter((r) => !r.fork);

  let created = 0;
  let updated = 0;

  for (const repo of candidates) {
    const slug = toSlug(repo.name);
    const existing = await Project.findOne({ slug });

    if (existing) {
      existing.githubUrl = repo.html_url;
      existing.liveUrl = repo.homepage || existing.liveUrl;
      existing.stars = repo.stargazers_count;
      existing.forks = repo.forks_count;
      existing.language = repo.language || existing.language;
      existing.githubRepoName = repo.name;
      existing.source = existing.source === "manual" ? "manual" : "github";
      if (!existing.description) {
        existing.description = repo.description || existing.title;
      }
      await existing.save();
      updated += 1;
    } else {
      await Project.create({
        title: repo.name,
        slug,
        description: repo.description || `${repo.name} — a project by Hemanth Raj.`,
        technologies: repo.language ? [repo.language] : [],
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || undefined,
        category: "Full Stack",
        featured: false,
        source: "github",
        githubRepoName: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || undefined,
      });
      created += 1;
    }
  }

  res.json({
    success: true,
    message: `GitHub sync complete: ${created} created, ${updated} updated.`,
    data: { created, updated, total: candidates.length },
  });
});
