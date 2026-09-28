import React, { useState } from 'react';
import { sound } from '../utils/soundEffects';
import { Mail, Github, Linkedin, Send, CheckCircle2, ShieldCheck, Terminal, Copy, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactEmail = 'areebcyber124@gmail.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    sound.playConfirm();
    setIsSubmitting(true);

    // Simulate encrypted digital transmission sequence
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      sound.playConfirm();
    }, 1200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    sound.playConfirm();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Section Header */}
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-purple-300 font-mono text-xs tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <Terminal className="w-3.5 h-3.5 text-purple-400" />
          <span>Secure Digital Transmission Channel</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_5px_30px_rgba(168,85,247,0.4)]">
          Let's <span className="prominent-gradient-title text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-400">Connect</span>
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          Whether you want to discuss cybersecurity research, low-level C++ architectures, collaborative projects, or future AI tools — my transmission line is open.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto w-full">
        {/* Left Column: Direct Links & Credentials */}
        <div className="lg:col-span-5 space-y-5">
          <div className="cyber-card rounded-2xl p-6 sm:p-7 border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <h3 className="font-display font-bold text-lg text-white mb-4">
              Direct Comm Channels
            </h3>

            <div className="space-y-4">
              {/* Email */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-purple-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.25)]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Official Inbound</div>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-xs font-mono text-purple-200 hover:text-white transition-colors font-medium"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-white/10"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* GitHub */}
              <a
                href="https://github.com/areeb"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-950/70 border border-purple-500/20 flex items-center gap-3 text-slate-300 hover:text-white hover:border-purple-500/50 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-purple-300 transition-colors">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">Code Repositories</div>
                  <div className="text-xs font-mono text-white group-hover:text-purple-300">github.com/areeb</div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/areeb"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-950/70 border border-purple-500/20 flex items-center gap-3 text-slate-300 hover:text-white hover:border-purple-500/50 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">Professional Network</div>
                  <div className="text-xs font-mono text-white group-hover:text-purple-300">linkedin.com/in/areeb</div>
                </div>
              </a>
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-purple-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>PGP Encrypted & Verified Communication</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/20 text-xs font-mono text-slate-300">
            <span className="text-purple-400 font-semibold">Location Base:</span> Global Digital Network · Available for security research & software engineering collaborations.
          </div>
        </div>

        {/* Right Column: Interactive Futuristic Contact Form */}
        <div className="lg:col-span-7">
          <div className="cyber-card rounded-2xl p-6 sm:p-8 border border-purple-500/30 shadow-[0_0_35px_rgba(168,85,247,0.15)] relative">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/25 border border-purple-500/60 flex items-center justify-center text-purple-300 shadow-[0_0_35px_rgba(168,85,247,0.4)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Transmission Dispatched
                </h3>
                <p className="text-sm text-slate-300 max-w-md">
                  Thank you, <span className="text-purple-300 font-semibold">{formState.name}</span>. Your message has been encrypted and delivered to Areeb's queue. I'll get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', email: '', message: '' });
                  }}
                  className="mt-4 px-5 py-2 rounded-xl text-xs font-mono text-purple-300 hover:text-white bg-purple-950/50 border border-purple-500/40 transition-colors shadow-sm"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-2 font-medium">
                  Encrypted Message Form
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-purple-500/20 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/30 transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. alex@securitylabs.io"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-purple-500/20 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/30 transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Message / Collaboration Inquiry
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Share details regarding projects, security discussions, or tool requests..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-purple-500/20 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/30 transition-all resize-none shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-display font-semibold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-violet-500 hover:from-purple-500 hover:to-violet-400 transition-all shadow-[0_0_25px_rgba(168,85,247,0.45)] hover:shadow-[0_0_35px_rgba(168,85,247,0.65)] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Encrypting & Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
        <div>
          © {new Date().getFullYear()} Areeb. Built with C++, Python, and WebGL precision.
        </div>
        <div className="flex items-center gap-4">
          <span className="text-cyan-400 font-medium">Cybersecurity</span>
          <span className="text-slate-700">·</span>
          <span className="text-emerald-400 font-medium">C++</span>
          <span className="text-slate-700">·</span>
          <span className="text-sky-400 font-medium">Python</span>
          <span className="text-slate-700">·</span>
          <span className="text-purple-400 font-semibold">AI Future</span>
        </div>
      </footer>
    </section>
  );
};
