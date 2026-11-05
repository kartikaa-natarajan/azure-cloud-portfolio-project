import { useState, useEffect } from "react";
import { User, CheckCircle2, AlertCircle, Save } from "lucide-react";
import { api, ApiClientError } from "@/lib/api";
import type { Profile } from "@/types";


export default function ProfileEditor() {
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setLoading(true);
      const data = await api.get<Profile>("/profile");
      setProfile(data || {});
    } catch (err) {
      setErrorMsg("Failed to load profile details");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const updated = await api.put<Profile>("/profile", profile);
      setProfile(updated);
      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      setErrorMsg(err instanceof ApiClientError ? err.message : "Failed to save profile changes");
    } finally {
      setSaving(false);
    }
  }

  function updateField<K extends keyof Profile>(key: K, value: Profile[K]) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 animate-pulse">
        Loading profile configuration...
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-5 h-5 text-brand-600" /> Personal Profile &amp; Links Manager
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Update your public profile, social links, hero texts, and resume settings.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Information */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Basic Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name" value={profile.name || ""} onChange={(v) => updateField("name", v)} required />
            <Field label="Professional Title" value={profile.role || ""} onChange={(v) => updateField("role", v)} required placeholder="e.g. Full Stack Developer | AWS Cloud Developer" />
            <Field label="Email Address" type="email" value={profile.email || ""} onChange={(v) => updateField("email", v)} />
            <Field label="Phone Number" value={profile.phone || ""} onChange={(v) => updateField("phone", v)} placeholder="+91 98765 43210" />
            <Field label="Location" value={profile.location || ""} onChange={(v) => updateField("location", v)} placeholder="Bengaluru, India" />
            <Field label="Availability / Status Badge" value={profile.availabilityStatus || ""} onChange={(v) => updateField("availabilityStatus", v)} placeholder="Open to opportunities" />
          </div>
        </div>

        {/* Section 2: Hero & About Content */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Hero &amp; About Content</h3>
          <div className="space-y-4">
            <Field label="Hero Headline" value={profile.headline || ""} onChange={(v) => updateField("headline", v)} placeholder="Building scalable web applications..." />
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Hero Subtitle</label>
              <textarea rows={2} className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none" value={profile.heroSubtitle || ""} onChange={(e) => updateField("heroSubtitle", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Short Bio</label>
              <textarea rows={2} className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none" value={profile.bio || ""} onChange={(e) => updateField("bio", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">About Section Description</label>
              <textarea rows={4} className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none" value={profile.aboutDescription || ""} onChange={(e) => updateField("aboutDescription", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Section 3: Social & Resource Links */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Social &amp; Resource Links</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="GitHub URL" value={profile.githubUrl || ""} onChange={(v) => updateField("githubUrl", v)} placeholder="https://github.com/StarlightSerena" />
            <Field label="LinkedIn URL" value={profile.linkedinUrl || ""} onChange={(v) => updateField("linkedinUrl", v)} placeholder="https://linkedin.com/in/..." />
            <Field label="Instagram URL" value={profile.instagramUrl || ""} onChange={(v) => updateField("instagramUrl", v)} placeholder="https://instagram.com/..." />
            <Field label="YouTube URL" value={profile.youtubeUrl || ""} onChange={(v) => updateField("youtubeUrl", v)} placeholder="https://youtube.com/@..." />
            <Field label="Twitter / X URL" value={profile.twitterUrl || ""} onChange={(v) => updateField("twitterUrl", v)} placeholder="https://x.com/..." />
            <Field label="Portfolio URL" value={profile.portfolioUrl || ""} onChange={(v) => updateField("portfolioUrl", v)} placeholder="https://hemanthraj.dev" />
            <Field label="Resume Path / URL" value={profile.resumeUrl || ""} onChange={(v) => updateField("resumeUrl", v)} placeholder="/resume.pdf" />
            <Field label="Profile Image / Avatar URL" value={profile.avatarUrl || ""} onChange={(v) => updateField("avatarUrl", v)} placeholder="https://..." />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm disabled:opacity-60 transition-colors shadow-lg shadow-brand-600/20"
          >
            <Save className="w-4 h-4" /> {saving ? "Saving Changes..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-shadow"
      />
    </div>
  );
}
