import { useState } from "react";
import { RefreshCw, Github } from "lucide-react";
import { api, ApiClientError } from "@/lib/api";

export default function GithubSyncPanel() {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSync() {
    setSyncing(true);
    setError(null);
    setResult(null);
    try {
      const data = await api.post<{ created: number; updated: number; total: number }>("/github/sync");
      setResult(
        `Synced ${data.total} repositories — ${data.created} created, ${data.updated} updated.`
      );
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Sync failed. Please try again.");
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
      <div className="flex items-center gap-2 mb-2">
        <Github className="w-4 h-4 text-slate-500" />
        <h3 className="font-semibold text-slate-800 dark:text-slate-100">GitHub Project Sync</h3>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Pull the latest public repositories from{" "}
        <span className="font-medium">github.com/StarlightSerena</span> and update the Projects
        collection. Manually edited descriptions, features, and problem/solution write-ups are
        preserved — only GitHub-sourced fields (stars, forks, language, URL) are refreshed.
      </p>

      <button
        onClick={handleSync}
        disabled={syncing}
        className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 disabled:opacity-60 transition-colors"
      >
        <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
        {syncing ? "Syncing..." : "Sync GitHub Projects"}
      </button>

      {result && (
        <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg px-3 py-2">
          {result}
        </p>
      )}
      {error && (
        <p className="mt-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">{error}</p>
      )}
    </div>
  );
}
