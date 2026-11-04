import { AnimatePresence, motion } from "framer-motion";
import { X, Github, ExternalLink, CheckCircle2 } from "lucide-react";
import type { Project } from "@/types";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-slate-900/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{project.title}</h3>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-slate-600 dark:text-slate-400">
                {project.longDescription || project.description}
              </p>

              {project.problem && (
                <Block title="Problem Statement" text={project.problem} />
              )}
              {project.solution && <Block title="Solution" text={project.solution} />}

              {project.features?.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    Key Features
                  </p>
                  <ul className="space-y-1.5">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {project.challenges && <Block title="Challenges" text={project.challenges} />}
              {project.learnings && <Block title="What Was Learned" text={project.learnings} />}

              <div className="flex items-center gap-3 pt-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  >
                    <Github className="w-4 h-4" /> Repository
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1.5">{title}</p>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{text}</p>
    </div>
  );
}
