import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Youtube, Twitter, Mail, ArrowRight, Download, Eye, Code2, Terminal, Cloud } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import type { Profile } from "@/types";

export default function Hero() {
  const { data: profile } = useFetch<Profile>(() => api.get<Profile>("/profile"), []);

  const name = profile?.name || "Hemanth Raj P";
  const role = profile?.role || "Full Stack Developer | Cloud & DevOps Engineer";
  const headline = profile?.headline || "Building scalable web applications and cloud-powered solutions.";
  const subtitle = profile?.heroSubtitle || profile?.bio || "MCA student at Jain University (3rd Sem, 2027 batch) passionate about full-stack engineering, AWS & Azure cloud architecture, Docker, Kubernetes, and AI integration.";
  const availability = profile?.availabilityStatus || "Open to opportunities";
  const resumeUrl = profile?.resumeUrl || "/resume.pdf";


  // Build configured social links list dynamically
  const socialLinks = [
    { key: "github", href: profile?.githubUrl, icon: Github, label: "GitHub Profile" },
    { key: "linkedin", href: profile?.linkedinUrl, icon: Linkedin, label: "LinkedIn Profile" },
    { key: "twitter", href: profile?.twitterUrl, icon: Twitter, label: "Twitter Profile" },
    { key: "instagram", href: profile?.instagramUrl, icon: Instagram, label: "Instagram Profile" },
    { key: "youtube", href: profile?.youtubeUrl, icon: Youtube, label: "YouTube Channel" },
    { key: "email", href: profile?.email ? `mailto:${profile.email}` : "#contact", icon: Mail, label: "Email Contact" },
  ].filter((s) => Boolean(s.href));

  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-200/40 dark:bg-brand-900/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-40 -right-24 w-96 h-96 bg-indigo-200/40 dark:bg-indigo-900/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="section-container grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 mb-6 border border-brand-200/50 dark:border-brand-800/50">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> {availability}
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {name}
          </h1>
          <p className="mt-3 text-lg sm:text-xl font-semibold gradient-text">
            {role}
          </p>
          <p className="mt-2 text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
            {headline}
          </p>
          <p className="mt-5 text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20"
            >
              View Projects <ArrowRight className="w-4 h-4" />
            </a>
            {resumeUrl && (
              <div className="flex items-center gap-2">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-full glass text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-brand-300 transition-colors"
                >
                  <Eye className="w-4 h-4" /> View Resume
                </a>
                <a
                  href={resumeUrl}
                  download
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-full glass text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-brand-300 transition-colors"
                >
                  <Download className="w-4 h-4" /> Download
                </a>
              </div>
            )}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-600 transition-colors"
            >
              Contact Me
            </a>
          </div>

          {socialLinks.length > 0 && (
            <div className="mt-8 flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full glass text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="relative rounded-3xl glass p-6 shadow-2xl shadow-brand-900/10">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs text-slate-400 font-mono">portfolio.tsx</span>
            </div>
            <pre className="text-xs sm:text-sm font-mono leading-relaxed text-slate-600 dark:text-slate-300 overflow-x-auto">
{`const developer = {
  name: "${name}",
  role: "${role.split("|")[0].trim()}",
  stack: ["React", "TypeScript", "Node.js", "AWS", "Azure", "Kubernetes"],
  status: "${availability}"
};

deploy(developer.stack);`}
            </pre>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-brand-50 dark:bg-brand-900/20 p-3 flex flex-col items-center gap-1.5">
                <Code2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">Frontend</span>
              </div>
              <div className="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 p-3 flex flex-col items-center gap-1.5">
                <Terminal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">Backend</span>
              </div>
              <div className="rounded-xl bg-sky-50 dark:bg-sky-900/20 p-3 flex flex-col items-center gap-1.5">
                <Cloud className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">Cloud & DevOps</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

