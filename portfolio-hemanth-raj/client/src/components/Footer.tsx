import { Github, Linkedin, Instagram, Youtube, Twitter, Mail, FileText } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import type { Profile } from "@/types";

export default function Footer() {
  const { data: profile } = useFetch<Profile>(() => api.get<Profile>("/profile"), []);
  const year = new Date().getFullYear();

  const name = profile?.name || "Hemanth Raj P";
  const resumeUrl = profile?.resumeUrl || "/resume.pdf";

  const socialLinks = [
    { key: "github", href: profile?.githubUrl, icon: Github, label: "GitHub Profile" },
    { key: "linkedin", href: profile?.linkedinUrl, icon: Linkedin, label: "LinkedIn Profile" },
    { key: "twitter", href: profile?.twitterUrl, icon: Twitter, label: "Twitter Profile" },
    { key: "instagram", href: profile?.instagramUrl, icon: Instagram, label: "Instagram Profile" },
    { key: "youtube", href: profile?.youtubeUrl, icon: Youtube, label: "YouTube Channel" },
    { key: "email", href: profile?.email ? `mailto:${profile.email}` : "#contact", icon: Mail, label: "Email Contact" },
    { key: "resume", href: resumeUrl, icon: FileText, label: "Resume" },
  ].filter((s) => Boolean(s.href));

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-10">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-bold gradient-text text-lg">{name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Building scalable web applications and cloud-powered solutions.
          </p>
        </div>

        {socialLinks.length > 0 && (
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target={s.key === "email" ? undefined : "_blank"}
                rel={s.key === "email" ? undefined : "noreferrer"}
                className="p-2 rounded-full text-slate-500 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label={s.label}
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        )}
      </div>
      <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-8">
        © {year} {name}. All rights reserved.
      </p>
    </footer>
  );
}

