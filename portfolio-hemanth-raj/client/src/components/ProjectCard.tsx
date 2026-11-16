import { Github, ExternalLink, Star, GitFork, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

export default function ProjectCard({
  project,
  onViewDetails,
}: {
  project: Project;
  onViewDetails: (p: Project) => void;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="h-36 bg-gradient-to-br from-brand-500/10 via-indigo-500/10 to-sky-500/10 dark:from-brand-900/30 dark:via-indigo-900/30 dark:to-sky-900/30 flex items-center justify-center relative">
        <span className="text-3xl font-bold gradient-text opacity-70">
          {project.title.slice(0, 2).toUpperCase()}
        </span>
        {project.featured && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-600 text-white">
            Featured
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">{project.title}</h3>
          {(project.stars || project.forks) && (
            <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
              {!!project.stars && (
                <span className="flex items-center gap-0.5">
                  <Star className="w-3 h-3" /> {project.stars}
                </span>
              )}
              {!!project.forks && (
                <span className="flex items-center gap-0.5">
                  <GitFork className="w-3 h-3" /> {project.forks}
                </span>
              )}
            </div>
          )}
        </div>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-full text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button
            onClick={() => onViewDetails(project)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity"
          >
            View Details <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-brand-600 transition-colors"
              aria-label="GitHub repository"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-brand-600 transition-colors"
              aria-label="Live demo"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
