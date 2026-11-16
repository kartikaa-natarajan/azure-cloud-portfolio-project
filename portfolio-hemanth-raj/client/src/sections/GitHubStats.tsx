import { Github, Star, GitFork, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";
import { LoadingState, ErrorState, EmptyState } from "@/components/StateViews";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import type { GithubRepo } from "@/types";

export default function GitHubStats() {
  const { data, loading, error, retry } = useFetch<GithubRepo[]>(
    () => api.get<GithubRepo[]>("/github/repositories"),
    []
  );

  return (
    <section id="github" className="py-24">
      <div className="section-container">
        <Reveal>
          <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            GitHub Activity
          </span>
          <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Latest Repositories
            </h2>
            <a
              href="https://github.com/StarlightSerena"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-brand-300 transition-colors"
            >
              <Github className="w-4 h-4" /> View Profile
            </a>
          </div>
        </Reveal>

        {loading && <LoadingState label="Fetching GitHub repositories..." />}
        {error && (
          <ErrorState message="Unable to load GitHub repositories. Try again." onRetry={retry} />
        )}
        {!loading && !error && (data?.length ?? 0) === 0 && <EmptyState label="No public repositories found." />}

        {!loading && !error && (data?.length ?? 0) > 0 && (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data!.slice(0, 9).map((repo, i) => (
              <Reveal key={repo.id} delay={Math.min(i * 0.05, 0.25)}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100 truncate pr-2">
                      {repo.name}
                    </h3>
                    <Github className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 min-h-[2rem]">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-[11px] text-slate-400">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-brand-500" /> {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" /> {repo.forks_count}
                    </span>
                    <span className="flex items-center gap-1 ml-auto">
                      <Clock className="w-3 h-3" />{" "}
                      {new Date(repo.updated_at).toLocaleDateString(undefined, {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
