import { useState } from "react";
import { Mail, MapPin, Github, Phone, Send, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import { api } from "@/lib/api";
import { useFetch } from "@/hooks/useFetch";
import type { Profile } from "@/types";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  botcheck: string;
}

const WEB3FORMS_ACCESS_KEY = "9610a597-0291-420c-83cb-5537205c8591";
const EMPTY: FormState = { name: "", email: "", subject: "", message: "", botcheck: "" };

export default function Contact() {
  const { data: profile } = useFetch<Profile>(() => api.get<Profile>("/profile"), []);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const emailVal = profile?.email || "";
  const phoneVal = profile?.phone || "";
  const locationVal = profile?.location || "Bengaluru, India";
  const githubVal = profile?.githubUrl || "https://github.com/StarlightSerena";

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim() || form.name.trim().length < 2) next.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.subject.trim()) next.subject = "Subject is required.";
    if (!form.message.trim() || form.message.trim().length < 10) next.message = "Message must be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setStatus("submitting");

    // Also persist message to local MongoDB backend asynchronously so Admin Dashboard logs the message
    api.post("/contact", {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    }).catch(() => {
      // Local backend logging failure should not interrupt Web3Forms delivery
    });

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          from_name: "Hemanth Raj Portfolio",
          message: form.message.trim(),
          botcheck: form.botcheck,
        }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus("success");
        setForm(EMPTY);
      } else {
        setStatus("error");
        setServerError(json.message || "Unable to send your message. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setServerError("Unable to send your message. Please try again.");
    }
  }

  return (
    <section id="contact" className="py-24 bg-slate-50/60 dark:bg-slate-900/30">
      <div className="section-container">
        <Reveal>
          <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Contact
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Let's build something together
          </h2>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-5 gap-10">
          <Reveal className="lg:col-span-2" delay={0.05}>
            <div className="space-y-4">
              {emailVal && <ContactRow icon={Mail} label="Email" value={emailVal} href={`mailto:${emailVal}`} />}
              {phoneVal && <ContactRow icon={Phone} label="Phone" value={phoneVal} href={`tel:${phoneVal}`} />}
              {githubVal && <ContactRow icon={Github} label="GitHub" value={githubVal.replace("https://", "")} href={githubVal} />}
              {locationVal && <ContactRow icon={MapPin} label="Location" value={locationVal} />}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={0.1}>
            {status === "success" ? (
              <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-900/20 p-8 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                  Thanks for reaching out! Your message has been sent successfully.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm font-medium text-emerald-700 dark:text-emerald-300 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Web3Forms Hidden Inputs & Spam Protection Honeypot */}
                <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                <input type="hidden" name="from_name" value="Hemanth Raj Portfolio" />
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  checked={Boolean(form.botcheck)}
                  onChange={(e) => setForm((f) => ({ ...f, botcheck: e.target.checked ? "spam" : "" }))}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="Name"
                    name="name"
                    value={form.name}
                    error={errors.name}
                    required
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    error={errors.email}
                    required
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  />
                </div>
                <Field
                  label="Subject"
                  name="subject"
                  value={form.subject}
                  error={errors.subject}
                  required
                  onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
                />
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow ${
                      errors.message ? "border-red-400" : "border-slate-200 dark:border-slate-700"
                    }`}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                {serverError && (
                  <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 disabled:opacity-60 transition-colors shadow-lg shadow-brand-600/20"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"} <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  name?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow ${
          error ? "border-red-400" : "border-slate-200 dark:border-slate-700"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <span className="p-2 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
        <Icon className="w-4 h-4" />
      </span>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block hover:border-brand-300 transition-colors">
      {content}
    </a>
  ) : (
    content
  );
}

