import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Sparkles,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  LogOut,
  Menu,
  X,
  Star,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import EntityManager from "@/components/admin/EntityManager";
import MessagesManager from "@/components/admin/MessagesManager";
import GithubSyncPanel from "@/components/admin/GithubSyncPanel";
import ProfileEditor from "@/components/admin/ProfileEditor";
import type { FieldConfig } from "@/components/admin/fieldConfig";
import type { Project, Skill, ExperienceItem, EducationItem, Achievement, AdminDashboardStats } from "@/types";

type Tab = "overview" | "profile" | "projects" | "skills" | "experience" | "education" | "achievements" | "messages";

const TABS: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "profile", label: "Profile & Links", icon: User },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "messages", label: "Messages", icon: Mail },
];

const projectFields: FieldConfig[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "slug", label: "Slug", type: "text", required: true, placeholder: "my-project-name" },
  { key: "description", label: "Short Description", type: "textarea", required: true },
  { key: "longDescription", label: "Long Description", type: "textarea" },
  { key: "problem", label: "Problem Statement", type: "textarea" },
  { key: "solution", label: "Solution", type: "textarea" },
  { key: "features", label: "Features", type: "tags", placeholder: "Feature 1, Feature 2" },
  { key: "challenges", label: "Challenges", type: "textarea" },
  { key: "learnings", label: "What Was Learned", type: "textarea" },
  { key: "technologies", label: "Technologies", type: "tags", placeholder: "React, Node.js" },
  { key: "githubUrl", label: "GitHub URL", type: "text" },
  { key: "liveUrl", label: "Live URL", type: "text" },
  { key: "category", label: "Category", type: "text", placeholder: "Full Stack" },
  { key: "featured", label: "Featured", type: "checkbox" },
];

const skillFields: FieldConfig[] = [
  { key: "name", label: "Name", type: "text", required: true },
  {
    key: "category",
    label: "Category",
    type: "select",
    options: ["Frontend", "Backend", "Database", "Cloud", "DevOps", "AI/ML", "Tools"],
    required: true,
  },
  { key: "proficiency", label: "Proficiency Level", type: "text", placeholder: "e.g. Advanced / 90%" },
  { key: "order", label: "Order", type: "number" },
];

const experienceFields: FieldConfig[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "organization", label: "Organization", type: "text", required: true },
  {
    key: "type",
    label: "Type",
    type: "select",
    options: ["education", "project", "certification", "learning", "professional"],
  },
  { key: "startDate", label: "Start Date", type: "text", placeholder: "2025" },
  { key: "endDate", label: "End Date", type: "text", placeholder: "Present" },
  { key: "description", label: "Description", type: "textarea", required: true },
  { key: "tags", label: "Tags", type: "tags", placeholder: "React, AWS" },
];

const educationFields: FieldConfig[] = [
  { key: "degree", label: "Degree", type: "text", required: true },
  { key: "institution", label: "Institution", type: "text", required: true },
  { key: "location", label: "Location", type: "text" },
  { key: "startYear", label: "Start Year", type: "text" },
  { key: "endYear", label: "End Year", type: "text" },
  { key: "grade", label: "Grade / Percentage", type: "text", placeholder: "e.g. 8.5 CGPA" },
  { key: "description", label: "Description", type: "textarea" },
];

const achievementFields: FieldConfig[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "description", label: "Description", type: "textarea", required: true },
  {
    key: "category",
    label: "Category",
    type: "select",
    options: ["github", "coding", "certification", "cloud", "research", "other"],
  },
  { key: "date", label: "Date", type: "text" },
  { key: "link", label: "Link", type: "text" },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: stats } = useFetch<AdminDashboardStats>(() => api.get<AdminDashboardStats>("/stats"), [tab]);

  async function handleLogout() {
    await logout();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="font-bold gradient-text">Hemanth Raj</p>
            <p className="text-xs text-slate-400">Admin Dashboard</p>
          </div>
          <button className="lg:hidden" onClick={() => setMobileOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                tab === t.id
                  ? "bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
              {t.id === "messages" && (stats?.unreadMessages ?? 0) > 0 && (
                <span className="ml-auto px-2 py-0.5 text-[10px] font-bold rounded-full bg-brand-600 text-white">
                  {stats?.unreadMessages}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 inset-x-0 p-3 border-t border-slate-200 dark:border-slate-800">
          <p className="px-3 text-xs text-slate-400 truncate mb-2">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="lg:hidden sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
          <p className="font-semibold gradient-text">Hemanth Raj</p>
          <button onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <main className="p-6 sm:p-8 max-w-5xl mx-auto">
          {tab === "overview" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Welcome back{user?.name ? `, ${user.name}` : ""}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Here is a high-level overview of your portfolio content and performance metrics.
                </p>
              </div>

              {/* Statistics Overview Cards Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard title="Total Projects" value={stats?.totalProjects} sub={`${stats?.featuredProjects || 0} featured`} icon={FolderGit2} color="brand" />
                <StatCard title="Total Skills" value={stats?.totalSkills} sub="Across categories" icon={Sparkles} color="indigo" />
                <StatCard title="Unread Messages" value={stats?.unreadMessages} sub="Awaiting response" icon={Mail} color="amber" highlight={Boolean(stats?.unreadMessages)} />
                <StatCard title="Experience Entries" value={stats?.experienceCount} sub="Journey items" icon={Briefcase} color="sky" />
                <StatCard title="Education Entries" value={stats?.educationCount} sub="Academic qualifications" icon={GraduationCap} color="emerald" />
                <StatCard title="GitHub Stars" value={stats?.githubStars} sub={`${stats?.githubRepos || 0} repos synced`} icon={Star} color="purple" />
              </div>

              <GithubSyncPanel />
            </div>
          )}

          {tab === "profile" && <ProfileEditor />}

          {tab === "projects" && (
            <EntityManager<Project>
              title="Projects"
              endpoint="/projects"
              fields={projectFields}
              renderTitle={(p) => p.title}
              renderSubtitle={(p) => `${p.category} · ${p.description}`}
            />
          )}

          {tab === "skills" && (
            <EntityManager<Skill>
              title="Skills"
              endpoint="/skills"
              fields={skillFields}
              renderTitle={(s) => s.name}
              renderSubtitle={(s) => `${s.category}${s.proficiency ? ` · ${s.proficiency}` : ""}`}
            />
          )}

          {tab === "experience" && (
            <EntityManager<ExperienceItem>
              title="Experience"
              endpoint="/experience"
              fields={experienceFields}
              renderTitle={(e) => e.title}
              renderSubtitle={(e) => `${e.organization} · ${e.startDate}${e.endDate ? ` - ${e.endDate}` : ""}`}
            />
          )}

          {tab === "education" && (
            <EntityManager<EducationItem>
              title="Education"
              endpoint="/education"
              fields={educationFields}
              renderTitle={(e) => e.degree}
              renderSubtitle={(e) => `${e.institution}${e.grade ? ` · Grade: ${e.grade}` : ""}`}
            />
          )}

          {tab === "achievements" && (
            <EntityManager<Achievement>
              title="Achievements"
              endpoint="/achievements"
              fields={achievementFields}
              renderTitle={(a) => a.title}
              renderSubtitle={(a) => a.category}
            />
          )}

          {tab === "messages" && <MessagesManager />}
        </main>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  color = "brand",
  highlight = false,
}: {
  title: string;
  value?: number;
  sub: string;
  icon: typeof FolderGit2;
  color?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`p-5 rounded-2xl border bg-white dark:bg-slate-900 shadow-sm transition-all ${
      highlight ? "border-amber-400 dark:border-amber-700 ring-2 ring-amber-400/20" : "border-slate-200 dark:border-slate-800"
    }`} data-color={color}>

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{title}</span>
        <span className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          <Icon className="w-4 h-4" />
        </span>
      </div>
      <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
        {value !== undefined ? value : "—"}
      </p>
      <p className="text-xs text-slate-400 mt-1">{sub}</p>
    </div>
  );
}

