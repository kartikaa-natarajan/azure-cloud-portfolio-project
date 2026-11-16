import fetch from "node-fetch";
import { env } from "../config/env";

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  topics?: string[];
}

export interface GithubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

// Simple in-memory TTL cache so we don't hammer the GitHub API on every request.
type CacheEntry<T> = { data: T; expiresAt: number };
const cache = new Map<string, CacheEntry<unknown>>();
const TTL_MS = 10 * 60 * 1000; // 10 minutes

function getCached<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCached<T>(key: string, data: T): void {
  cache.set(key, { data, expiresAt: Date.now() + TTL_MS });
}

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "hemanth-portfolio-app",
  };
  if (env.githubToken) {
    headers.Authorization = `Bearer ${env.githubToken}`;
  }
  return headers;
}

export async function fetchGithubProfile(username = env.githubUsername): Promise<GithubProfile> {
  const cacheKey = `profile:${username}`;
  const cached = getCached<GithubProfile>(cacheKey);
  if (cached) return cached;

  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: authHeaders(),
  });
  if (!res.ok) {
    throw new Error(`GitHub profile fetch failed: ${res.status}`);
  }
  const data = (await res.json()) as GithubProfile;
  setCached(cacheKey, data);
  return data;
}

export async function fetchGithubRepositories(username = env.githubUsername): Promise<GithubRepo[]> {
  const cacheKey = `repos:${username}`;
  const cached = getCached<GithubRepo[]>(cacheKey);
  if (cached) return cached;

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    { headers: authHeaders() }
  );
  if (!res.ok) {
    throw new Error(`GitHub repos fetch failed: ${res.status}`);
  }
  const data = (await res.json()) as GithubRepo[];
  setCached(cacheKey, data);
  return data;
}

export interface GithubStatsResult {
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  topLanguages: { language: string; count: number }[];
  followers: number;
}

export async function fetchGithubStats(username = env.githubUsername): Promise<GithubStatsResult> {
  const cacheKey = `stats:${username}`;
  const cached = getCached<GithubStatsResult>(cacheKey);
  if (cached) return cached;

  const [profile, repos] = await Promise.all([
    fetchGithubProfile(username),
    fetchGithubRepositories(username),
  ]);

  const nonForkRepos = repos.filter((r) => !r.fork);
  const languageCounts: Record<string, number> = {};
  nonForkRepos.forEach((r) => {
    if (r.language) {
      languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;
    }
  });

  const stats: GithubStatsResult = {
    publicRepos: profile.public_repos,
    totalStars: nonForkRepos.reduce((sum, r) => sum + r.stargazers_count, 0),
    totalForks: nonForkRepos.reduce((sum, r) => sum + r.forks_count, 0),
    topLanguages: Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([language, count]) => ({ language, count })),
    followers: profile.followers,
  };

  setCached(cacheKey, stats);
  return stats;
}


export function clearGithubCache(): void {
  cache.clear();
}
