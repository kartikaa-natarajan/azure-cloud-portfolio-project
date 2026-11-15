import React, { useState } from "react";
import { personalInfo } from "../data/portfolioData";
import {
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  ExternalLink,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "./Icons";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [socialModal, setSocialModal] = useState(null);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSocialClick = (e, platform, url) => {
    e.preventDefault();
    setSocialModal({
      platform,
      url,
      message: `The ${platform} profile URL is currently configured as a placeholder (${url}). You can customize your exact ${platform} URL inside src/data/portfolioData.js.`,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Sakshi,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: GithubIcon,
      url: personalInfo.socialPlaceholders.github.url,
      tag: "Code Repository",
    },
    {
      name: "LinkedIn",
      icon: LinkedinIcon,
      url: personalInfo.socialPlaceholders.linkedin.url,
      tag: "Professional Network",
    },
    {
      name: "LeetCode",
      icon: LeetCodeIcon,
      url: personalInfo.socialPlaceholders.leetcode.url,
      tag: "DSA & Problem Solving",
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white/60 relative scroll-mt-16 border-y border-purple-200/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#eddffb] to-white border border-purple-200 text-xs font-mono text-purple-800 mb-4 font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
            <span>Direct Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Contact & Connect
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Feel free to reach out for technical opportunities, collaborations, or cloud projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Social Placeholders (70% Lavender & 30% White) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#ece0fe] via-[#f5edff] to-white border border-purple-200 shadow-sm hover:shadow-md hover:shadow-purple-500/10 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white text-purple-600 border border-purple-200 shadow-xs">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-purple-900/70 uppercase tracking-wider block font-bold">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm sm:text-base font-bold text-slate-900 hover:text-purple-700 transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(personalInfo.email, "email")}
                title="Copy Email"
                className="p-2.5 rounded-xl bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 transition-all shadow-xs"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#ece0fe] via-[#f5edff] to-white border border-purple-200 shadow-sm hover:shadow-md hover:shadow-purple-500/10 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white text-purple-600 border border-purple-200 shadow-xs">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-purple-900/70 uppercase tracking-wider block font-bold">
                    Phone Number
                  </span>
                  <a
                    href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
                    className="text-sm sm:text-base font-bold text-slate-900 hover:text-purple-700 transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(personalInfo.phone, "phone")}
                title="Copy Phone"
                className="p-2.5 rounded-xl bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 transition-all shadow-xs"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Social & Platform Placeholders */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#ece0fe] via-[#f5edff] to-white border border-purple-200 shadow-sm">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-850 font-extrabold mb-4 pb-2 border-b border-purple-200/80 flex items-center justify-between">
                <span>Profiles & Platforms</span>
                <span className="text-[10px] text-amber-800 bg-white border border-amber-300 px-2.5 py-0.5 rounded-md font-mono font-bold shadow-2xs">
                  Customizable Placeholders
                </span>
              </h4>

              <div className="space-y-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={(e) => handleSocialClick(e, item.name, item.url)}
                      className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white border border-purple-200 hover:border-purple-300 hover:shadow-xs transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-850 group-hover:text-purple-700 transition-colors block">
                            {item.name}
                          </span>
                          <span className="text-xs text-purple-900/60 font-mono font-semibold">
                            {item.tag}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono">
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                          Placeholder
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 transition-colors" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Send Message Form (70% Lavender & 30% White) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#ece0fe] via-[#f5edff] to-white border border-purple-200 shadow-xl shadow-purple-500/10">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Send a Direct Message
            </h3>
            <p className="text-sm text-slate-650 mb-6 leading-relaxed">
              Have a question or project inquiry? Fill out the form below to initiate an email to{" "}
              <span className="text-purple-800 font-mono font-bold">{personalInfo.email}</span>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-purple-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors text-sm shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-purple-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors text-sm shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                  Message
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-purple-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors text-sm resize-none shadow-2xs"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all shadow-md shadow-purple-500/25"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>

              {formSent && (
                <div className="p-3.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-xs font-mono flex items-center gap-2 animate-fadeIn font-bold shadow-xs">
                  <span>Launching your default email client with your prefilled message!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Modal for Social Profile Placeholder Notice */}
      {socialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-b from-[#f3eaff] to-white border border-purple-200 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-600 mb-4">
              <AlertCircle className="w-6 h-6" />
              <h4 className="text-lg font-bold text-slate-900">
                {socialModal.platform} Placeholder Notice
              </h4>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mb-6">
              {socialModal.message}
            </p>
            <div className="p-3 bg-white rounded-xl border border-purple-200 mb-6 font-mono text-xs text-purple-900 break-all font-bold">
              <span className="text-slate-500">Config: </span>src/data/portfolioData.js &rarr; {socialModal.url}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setSocialModal(null)}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors shadow-sm"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
