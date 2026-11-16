import type { ApiResponse } from "@/types";
import {
  FALLBACK_PROFILE,
  FALLBACK_PROJECTS,
  FALLBACK_SKILLS,
  FALLBACK_EDUCATION,
  FALLBACK_EXPERIENCE,
  FALLBACK_ACHIEVEMENTS,
  FALLBACK_GITHUB_REPOS,
  FALLBACK_GITHUB_STATS,
} from "@/data/fallbackData";

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

const FALLBACK_MAP: Record<string, unknown> = {
  "/profile": FALLBACK_PROFILE,
  "/projects": FALLBACK_PROJECTS,
  "/skills": FALLBACK_SKILLS,
  "/education": FALLBACK_EDUCATION,
  "/experience": FALLBACK_EXPERIENCE,
  "/achievements": FALLBACK_ACHIEVEMENTS,
  "/github/repos": FALLBACK_GITHUB_REPOS,
  "/github/repositories": FALLBACK_GITHUB_REPOS,
  "/github/stats": FALLBACK_GITHUB_STATS,
};


export class ApiClientError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    let json: ApiResponse<T> | undefined;
    try {
      json = await res.json();
    } catch {
      // ignore parse errors
    }

    if (res.ok && json?.success) {
      return json.data;
    }
  } catch {
    // Network or server unreachable
  }

  // If GET request failed and fallback data is available, return fallback gracefully
  if ((!options.method || options.method === "GET") && path in FALLBACK_MAP) {
    return FALLBACK_MAP[path] as T;
  }

  throw new ApiClientError(500, `Unable to load ${path.replace("/", "")}.`);
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

