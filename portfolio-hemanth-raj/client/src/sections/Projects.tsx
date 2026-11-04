import { useState, useMemo } from "react";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { ErrorState, EmptyState, SkeletonCard } from "@/components/StateViews";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import type { Project } from "@/types";

export default function Projects() {
  const { data, loading, error, retry } = useFetch<Project[]>(
    () => api.get<Project[]>("/projects"),
    []
  );
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);

  const categories = useMemo(() => {
    if (!data) return ["All"];
    const set = new Set<string>();
    data.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [data]);

  const filteredProjects = useMemo(() => {
    if (!data) return [];
    return data.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchFeat = !featuredOnly || p.featured;
      return matchCat && matchFeat;
    });
  }, [data, activeCategory, featuredOnly]);

  return (
    <section id="projects" className="py-24">
      <div className="section-container">
        <Reveal>
          <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Projects
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Things I've built
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-2xl">
            A selection of full-stack, AI, and cloud projects — sourced from my GitHub profile and
            managed through the admin dashboard.
          </p>
        </Reveal>

        {!loading && !error && (data?.length ?? 0) > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setFeaturedOnly((prev) => !prev)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                featuredOnly
                  ? "bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 border-brand-300 dark:border-brand-700"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              ★ Featured Only
            </button>
          </div>
        )}

        {loading && (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}
        {error && <ErrorState message="Unable to load projects. Try again." onRetry={retry} />}
        {!loading && !error && (data?.length ?? 0) === 0 && (
          <EmptyState label="No projects published yet — check back soon." />
        )}
        {!loading && !error && (data?.length ?? 0) > 0 && filteredProjects.length === 0 && (
          <EmptyState label="No projects found matching the selected filters." />
        )}

        {!loading && !error && filteredProjects.length > 0 && (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <Reveal key={project._id} delay={Math.min(i * 0.05, 0.3)}>
                <ProjectCard project={project} onViewDetails={setSelected} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

