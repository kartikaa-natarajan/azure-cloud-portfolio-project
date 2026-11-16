import { Loader2, AlertTriangle, Inbox } from "lucide-react";

export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
      <Loader2 className="w-6 h-6 animate-spin mb-3" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertTriangle className="w-6 h-6 text-amber-500 mb-3" />
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm rounded-full bg-brand-600 text-white hover:bg-brand-700 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ label = "Nothing here yet." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
      <Inbox className="w-6 h-6 mb-3" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 animate-pulse">
      <div className="h-40 rounded-xl bg-slate-200 dark:bg-slate-800 mb-4" />
      <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800 mb-2" />
      <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800 mb-1" />
      <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}
