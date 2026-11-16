import { Link } from "react-router-dom";
import { Home, FolderGit2, Radar } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-brand-200/40 dark:bg-brand-900/20 rounded-full blur-3xl animate-float" />
      <div className="text-center max-w-md">
        <Radar className="w-10 h-10 text-brand-500 mx-auto mb-4" />
        <p className="text-7xl font-extrabold gradient-text">404</p>
        <h1 className="mt-4 text-xl font-semibold text-slate-800 dark:text-slate-100">
          Looks like this page went off the grid.
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
          >
            <Home className="w-4 h-4" /> Back Home
          </Link>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            <FolderGit2 className="w-4 h-4" /> View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
