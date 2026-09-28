import React, { useState } from 'react';
import { AI_TOOLS, AiTool } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';
import { Sparkles, Bot, Code, Shield, Brain, FileSearch, Layers, ArrowUpRight, X, Cpu, CheckCircle } from 'lucide-react';

export const AiLabSection: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<AiTool | null>(null);
  const neuralCoreImage = '/src/assets/images/neural_core_visual_1790596027007.jpg';

  const getToolIcon = (id: string) => {
    switch (id) {
      case 'ai-code-assistant':
        return Code;
      case 'ai-cyber-assistant':
        return Shield;
      case 'ai-python-helper':
        return Bot;
      case 'ai-cpp-helper':
        return Cpu;
      case 'ai-study-assistant':
        return Brain;
      case 'ai-text-analyzer':
        return FileSearch;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="ailab" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-3 text-purple-400 dynamic-front-accent">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Future AI Tools & Intelligence Hub</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_5px_25px_rgba(168,85,247,0.3)]">
            AI <span className="prominent-gradient-title">Laboratory</span>
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Tools I'm Building: Architecting intelligent agents, proactive security anomaly classifiers, and developer assistants for low-level systems.
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="px-4 py-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-300 font-mono text-xs flex items-center gap-2 shadow-[0_0_25px_rgba(168,85,247,0.25)] shrink-0">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="font-semibold tracking-wide">AI TOOLS — COMING SOON · PROTOTYPE PHASE</span>
        </div>
      </div>

      {/* Hero Laboratory Backdrop Card */}
      <div className="cyber-card rounded-2xl p-6 sm:p-8 mb-10 relative overflow-hidden border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono text-purple-400 uppercase tracking-widest font-semibold">
              Neural Infrastructure Vision
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Autonomous Systems & Defensive Reasoning
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Modern cybersecurity requires more than static rule engines. As attackers deploy automated reconnaissance, defenders must build adaptive agents capable of cross-referencing multi-terabyte network telemetry with known CVE signatures in real time.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
              <span className="text-slate-500">Core Stack:</span>
              <span className="text-purple-300 font-medium">Tree-Sitter AST</span>
              <span className="text-slate-600">·</span>
              <span className="text-cyan-300 font-medium">Vector Embeddings</span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-300 font-medium">FastAPI</span>
              <span className="text-slate-600">·</span>
              <span className="text-purple-200 font-medium">Gemini Flash</span>
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-purple-500/40 bg-slate-900 shadow-xl aspect-video lg:aspect-auto h-48 lg:h-56">
            <img
              src={neuralCoreImage}
              alt="Neural AI Lab Core Hologram"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04060a]/90 via-transparent to-transparent flex items-end p-4">
              <span className="font-mono text-[11px] text-purple-300 font-medium">
                Areeb AI Core // Architecture Schema v1.0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Interactive Tool Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AI_TOOLS.map((tool) => {
          const Icon = getToolIcon(tool.id);
          return (
            <div
              key={tool.id}
              className="cyber-card rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/50 hover:shadow-[0_15px_35px_-8px_rgba(168,85,247,0.25)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-purple-300 px-2 py-0.5 rounded bg-purple-950/40 border border-purple-500/30">
                    {tool.status}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-400 mb-1">{tool.category}</div>
                <h3 className="font-display font-bold text-xl text-white group-hover:text-purple-300 transition-colors">
                  {tool.title}
                </h3>
                <p className="mt-1 text-xs font-mono text-purple-300/90 font-medium">
                  {tool.tagline}
                </p>

                <p className="mt-3 text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {tool.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="text-[11px] font-mono text-slate-400">
                  {tool.plannedFeatures.length} Key Capabilities
                </div>

                <button
                  onClick={() => {
                    sound.playBlip(920);
                    setSelectedTool(tool);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-purple-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 transition-all group-hover:border-purple-500/60 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                >
                  <span>Inspect Spec</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tool Architecture Modal */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="cyber-card w-full max-w-2xl rounded-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto border border-amber-500/40 relative shadow-[0_0_50px_rgba(245,158,11,0.2)]">
            <button
              onClick={() => setSelectedTool(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">
              <span>{selectedTool.category}</span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400">{selectedTool.status}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {selectedTool.title}
            </h3>
            <p className="mt-1 text-xs font-mono text-amber-300">
              {selectedTool.tagline}
            </p>

            <div className="mt-4 text-sm text-slate-200 leading-relaxed">
              {selectedTool.description}
            </div>

            {/* Planned Features */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <h4 className="font-mono text-xs uppercase text-amber-300 tracking-wider mb-2">
                Planned Features & Roadmap
              </h4>
              <ul className="space-y-2">
                {selectedTool.plannedFeatures.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* System Prompt & Architecture Goal */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-amber-500/20">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold mb-1">
                <Brain className="w-3.5 h-3.5" />
                <span>Agent Architecture & System Objective</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                "{selectedTool.systemPromptGoal}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Status: Prepared for future API integration</span>
              <button
                disabled
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 cursor-not-allowed text-xs font-mono"
              >
                Model Launching Soon
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
