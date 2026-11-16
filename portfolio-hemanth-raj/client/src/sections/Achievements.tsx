import { Award, ExternalLink } from "lucide-react";
import Reveal from "@/components/Reveal";
import { LoadingState, ErrorState, EmptyState } from "@/components/StateViews";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import type { Achievement } from "@/types";

export default function Achievements() {
  const { data, loading, error, retry } = useFetch<Achievement[]>(
    () => api.get<Achievement[]>("/achievements"),
    []
  );

  return (
    <section id="achievements" className="py-24 bg-slate-50/60 dark:bg-slate-900/30">
      <div className="section-container">
        <Reveal>
          <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Achievements
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Milestones &amp; Recognition
          </h2>
        </Reveal>

        {loading && <LoadingState label="Loading achievements..." />}
        {error && <ErrorState message="Unable to load achievements. Try again." onRetry={retry} />}
        {!loading && !error && (data?.length ?? 0) === 0 && (
          <EmptyState label="Achievements will appear here as they're added." />
        )}

        {!loading && !error && (data?.length ?? 0) > 0 && (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data!.map((item, i) => (
              <Reveal key={item._id} delay={Math.min(i * 0.06, 0.3)}>
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900 h-full">
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 w-fit text-amber-600 dark:text-amber-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="mt-3 font-semibold text-sm text-slate-800 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400"
                    >
                      Learn more <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
