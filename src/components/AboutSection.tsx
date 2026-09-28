import React, { useState } from 'react';
import { TIMELINE_MILESTONES } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';
import { Shield, Terminal, ArrowRight, CheckCircle2, ChevronRight, User } from 'lucide-react';

export const AboutSection: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(4); // default on Cybersecurity
  const avatarPath = '/src/assets/images/avatar_cyber_architect_1790596015796.jpg';

  const activeMilestone = TIMELINE_MILESTONES[activeMilestoneIndex];

  return (
    <section id="about" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-3 dynamic-front-accent">
          <Terminal className="w-3.5 h-3.5" />
          <span>Digital Identity & Philosophy</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_5px_20px_rgba(255,255,255,0.15)]">
          Who Am <span className="prominent-gradient-title">I?</span>
        </h2>
        <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          Hi, I'm <strong className="text-white font-semibold">Areeb</strong>. A developer exploring the deep intersections of systems programming, defensive network security, and future AI tooling.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Personal Narrative & Avatar Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="cyber-card rounded-2xl p-6 sm:p-7 relative overflow-hidden">
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-cyan-500/40 bg-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.2)] shrink-0">
                <img
                  src={avatarPath}
                  alt="Areeb profile silhouette"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to stylized SVG avatar
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center -z-10 bg-gradient-to-tr from-cyan-950 to-slate-900 text-cyan-400">
                  <User className="w-8 h-8" />
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-white">Areeb</h3>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mt-1">
                  <span>Cybersecurity</span>
                  <span className="text-slate-600">·</span>
                  <span>Systems Programmer</span>
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Actively building & learning</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                I believe the most effective way to understand software and security is by <span className="text-cyan-300 font-medium">building practical projects from scratch</span>.
              </p>
              <p>
                From low-level memory addressing in <strong className="text-white">C++</strong> to socket networking and log parsers in <strong className="text-white">Python</strong>, I deconstruct how computers communicate and where vulnerabilities emerge.
              </p>
              <p className="text-slate-400 text-xs">
                My mission: Master defensive cybersecurity fundamentals and engineer intelligent autonomous security tools that make software more resilient.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400">
                Primary Focus: <span className="text-emerald-400">Defensive Security</span>
              </div>
              <button
                onClick={() => {
                  sound.playTransition();
                  onNavigate('cybersecurity');
                }}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
              >
                <span>Enter Cyber Lab</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Quick Domain Matrix */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Cybersecurity', detail: 'Defensive & Labs', color: 'text-cyan-300 border-cyan-500/20' },
              { label: 'C++ Systems', detail: 'Memory & RAII', color: 'text-emerald-300 border-emerald-500/20' },
              { label: 'Python Automation', detail: 'Sockets & Scanners', color: 'text-sky-300 border-sky-500/20' },
              { label: 'Future AI Builder', detail: 'Agentic Tools', color: 'text-amber-300 border-amber-500/20' },
            ].map((skill, idx) => (
              <div key={idx} className={`p-3.5 rounded-xl bg-slate-950/60 border ${skill.color} text-left`}>
                <div className="font-display font-semibold text-xs text-white">{skill.label}</div>
                <div className="font-mono text-[11px] text-slate-400 mt-0.5">{skill.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Learning Progression Timeline */}
        <div className="lg:col-span-7">
          <div className="cyber-card rounded-2xl p-6 sm:p-7">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-lg font-bold text-white">Interactive Learning Journey</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Click any milestone to inspect technical focus</p>
              </div>
              <span className="font-mono text-xs text-cyan-400 px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
                Phase {activeMilestone.phase} / 07
              </span>
            </div>

            {/* Stepper buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
              {TIMELINE_MILESTONES.map((item, index) => {
                const isActive = activeMilestoneIndex === index;
                return (
                  <button
                    key={item.phase}
                    onClick={() => {
                      sound.playBlip(750 + index * 60);
                      setActiveMilestoneIndex(index);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                        : 'bg-slate-900/60 border border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{item.phase}.</span>
                    <span>{item.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Milestone Card */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-cyan-500/20 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
                    Phase {activeMilestone.phase} Milestone
                  </span>
                  <h4 className="font-display text-xl font-bold text-white mt-1">
                    {activeMilestone.title}
                  </h4>
                  <p className="text-xs font-mono text-emerald-400 mt-1">
                    Core Focus: {activeMilestone.focus}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                {activeMilestone.desc}
              </p>

              {/* Tags without pill badge aesthetic */}
              <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-slate-500">Skills Acquired:</span>
                {activeMilestone.tags.map((tag, i) => (
                  <React.Fragment key={tag}>
                    <span className="text-cyan-300 font-medium">{tag}</span>
                    {i < activeMilestone.tags.length - 1 && <span className="text-slate-600">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Step navigation buttons */}
            <div className="mt-6 flex items-center justify-between">
              <button
                disabled={activeMilestoneIndex === 0}
                onClick={() => {
                  sound.playBlip(700);
                  setActiveMilestoneIndex(Math.max(0, activeMilestoneIndex - 1));
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
              >
                ← Previous Phase
              </button>

              <button
                disabled={activeMilestoneIndex === TIMELINE_MILESTONES.length - 1}
                onClick={() => {
                  sound.playBlip(950);
                  setActiveMilestoneIndex(Math.min(TIMELINE_MILESTONES.length - 1, activeMilestoneIndex + 1));
                }}
                className="px-4 py-1.5 rounded-lg text-xs font-mono text-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 disabled:opacity-30 transition-colors flex items-center gap-1.5"
              >
                <span>Next Phase</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
