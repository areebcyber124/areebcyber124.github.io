import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';
import { FolderGit2, Github, ExternalLink, X, Terminal, CheckCircle2, Shield, Cpu, Network, Sparkles } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'CYBERSECURITY' | 'C++' | 'PYTHON' | 'AI'>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [interactiveSimulatorOpen, setInteractiveSimulatorOpen] = useState(false);

  const filteredProjects = filter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  const getCategoryColor = (category: Project['category']) => {
    switch (category) {
      case 'CYBERSECURITY':
        return 'text-cyan-300 border-cyan-500/30 bg-cyan-950/20';
      case 'C++':
        return 'text-emerald-300 border-emerald-500/30 bg-emerald-950/20';
      case 'PYTHON':
        return 'text-sky-300 border-sky-500/30 bg-sky-950/20';
      case 'AI':
        return 'text-amber-300 border-amber-500/30 bg-amber-950/20';
      default:
        return 'text-slate-300 border-white/10 bg-slate-900/40';
    }
  };

  return (
    <section id="projects" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-3 text-purple-400 dynamic-front-accent">
            <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Built From Scratch</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_5px_25px_rgba(168,85,247,0.3)]">
            Projects <span className="prominent-gradient-title">Showcase</span>
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Practical security tools, low-level cryptographic utilities, and network exploration engines engineered to test and apply core computer science concepts.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-950/80 border border-white/10 rounded-xl overflow-x-auto scrollbar-none">
          {(['ALL', 'CYBERSECURITY', 'C++', 'PYTHON', 'AI'] as const).map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sound.playBlip(800);
                  setFilter(cat);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-purple-500/25 text-purple-300 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              sound.playConfirm();
              setSelectedProject(project);
            }}
            className="cyber-card rounded-2xl p-6 sm:p-7 cursor-pointer flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded border ${getCategoryColor(project.category)}`}>
                  {project.category}
                </span>
                {project.demoAvailable && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Live Interactive Demo</span>
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-cyan-400/90">
                {project.tagline}
              </p>

              <p className="mt-3 text-xs text-slate-300 leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 space-y-4">
              {/* Tech Stack Text Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <React.Fragment key={tech}>
                    <span className="text-slate-300">{tech}</span>
                    {i < Math.min(project.technologies.length, 3) - 1 && <span className="text-slate-600">·</span>}
                  </React.Fragment>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-cyan-300">
                <span>Inspect Architecture</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Deep Dive Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="cyber-card w-full max-w-2xl rounded-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto border border-cyan-500/40 relative shadow-[0_0_50px_rgba(6,182,212,0.25)]">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              <span>{selectedProject.category}</span>
              <span className="text-slate-600">·</span>
              <span>Open Source Architecture</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {selectedProject.title}
            </h3>
            <p className="mt-1 font-mono text-xs text-cyan-300">
              {selectedProject.tagline}
            </p>

            <div className="mt-4 text-sm text-slate-200 leading-relaxed">
              {selectedProject.description}
            </div>

            {/* Features */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <h4 className="font-mono text-xs uppercase text-cyan-300 tracking-wider mb-2">
                Core Capabilities & Architecture
              </h4>
              <ul className="space-y-2">
                {selectedProject.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <h4 className="font-mono text-xs uppercase text-slate-400 tracking-wider mb-2">
                Technologies & Standards
              </h4>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                {selectedProject.technologies.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-cyan-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-white bg-slate-900 hover:bg-slate-800 border border-white/10 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>

              {selectedProject.demoAvailable && (
                <button
                  onClick={() => {
                    sound.playConfirm();
                    setInteractiveSimulatorOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Launch Live Simulation</span>
                </button>
              )}
            </div>

            {/* Embedded Live Simulation Sub-View */}
            {interactiveSimulatorOpen && selectedProject.demoAvailable && (
              <div className="mt-6 p-4 rounded-xl bg-black/90 border border-emerald-500/40 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-emerald-400">
                  <span>[INTERACTIVE RUNTIME: {selectedProject.title}]</span>
                  <button
                    onClick={() => setInteractiveSimulatorOpen(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>
                <div className="space-y-1 text-slate-300">
                  <div className="text-cyan-300">$ {selectedProject.title.toLowerCase().replace(/\s+/g, '-')} --interface eth0 --verbose</div>
                  <div className="text-slate-400">[0.001s] Initializing socket binding on port raw...</div>
                  <div className="text-emerald-400">[0.015s] Captured IPv4 Packet: SRC=192.168.1.102:52130 {'->'} DST=10.0.0.1:443 [TLS ClientHello]</div>
                  <div className="text-emerald-400">[0.022s] Packet payload analyzed: 124 bytes · Entropy = 7.82 bits/byte (High randomness / Encrypted)</div>
                  <div className="text-cyan-400">[0.040s] Zero security anomalies detected. Session tagged as legitimate TLS 1.3 traffic.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
