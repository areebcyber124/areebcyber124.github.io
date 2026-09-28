import React, { useState } from 'react';
import { CPP_LESSONS, CodeLesson } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';
import { Cpu, Copy, Check, Play, Terminal, ChevronRight, Info } from 'lucide-react';

export const CppSection: React.FC = () => {
  const [activeLesson, setActiveLesson] = useState<CodeLesson>(CPP_LESSONS[0]);
  const [copied, setCopied] = useState(false);
  const [simulatedRun, setSimulatedRun] = useState(false);

  const topicList = [
    'Variables', 'Data Types', 'Input / Output', 'Operators', 'Conditions',
    'Loops', 'Functions', 'Arrays', 'Strings', 'Pointers', 'Classes',
    'Objects', 'OOP', 'File Handling'
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeLesson.code);
    sound.playConfirm();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    sound.playConfirm();
    setSimulatedRun(true);
  };

  return (
    <section id="cpp" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Section Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-3 dynamic-front-accent">
          <Cpu className="w-3.5 h-3.5" />
          <span>Low-Level Systems & Memory</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_5px_20px_rgba(255,255,255,0.15)]">
          C++ <span className="prominent-gradient-title">Systems Realm</span>
        </h2>
        <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          High-performance systems programming, direct pointer manipulation, deterministic RAII resource lifecycles, and low-level protocol engineering.
        </p>
      </div>

      {/* Floating Interactive Topic Navigator */}
      <div className="mb-8">
        <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">
          C++ Language Mastery Topics
        </div>
        <div className="flex flex-wrap gap-2">
          {topicList.map((topic, index) => {
            // Find corresponding lesson or match closest
            const matchedLesson = CPP_LESSONS.find(
              (l) => l.title.toLowerCase().includes(topic.toLowerCase())
            ) || CPP_LESSONS[index % CPP_LESSONS.length];

            const isSelected = activeLesson.id === matchedLesson.id && activeLesson.title.toLowerCase().includes(topic.toLowerCase());

            return (
              <button
                key={topic}
                onClick={() => {
                  sound.playBlip(800 + index * 40);
                  setActiveLesson(matchedLesson);
                  setSimulatedRun(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                    : 'bg-slate-900/60 border border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Code Studio & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Lesson Selector & Architectural Notes */}
        <div className="lg:col-span-4 space-y-4">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            Available Code Modules ({CPP_LESSONS.length})
          </div>

          <div className="space-y-3">
            {CPP_LESSONS.map((lesson) => {
              const isCurrent = activeLesson.id === lesson.id;
              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    sound.playBlip(900);
                    setActiveLesson(lesson);
                    setSimulatedRun(false);
                  }}
                  className={`cyber-card p-4 rounded-xl cursor-pointer transition-all ${
                    isCurrent ? 'border-emerald-500/50 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-emerald-400 font-semibold">{lesson.difficulty}</span>
                    <span className="text-slate-500">C++20</span>
                  </div>
                  <h3 className="font-display font-bold text-sm text-white">{lesson.title}</h3>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2">{lesson.summary}</p>
                </div>
              );
            })}
          </div>

          {/* Deep Dive Note Box */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/20">
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold mb-1">
              <Info className="w-3.5 h-3.5" />
              <span>Low-Level Memory Insight</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeLesson.deepDive}
            </p>
          </div>
        </div>

        {/* Right Column: Code Editor & Execution Panel */}
        <div className="lg:col-span-8 cyber-card rounded-2xl border border-emerald-500/30 overflow-hidden shadow-2xl">
          {/* Editor Header Bar */}
          <div className="px-5 py-3.5 bg-slate-950 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-xs text-emerald-400 font-medium">
                {activeLesson.id}.cpp
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-slate-900 border border-white/10 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleRun}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run C++</span>
              </button>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="p-5 bg-[#03060c] overflow-x-auto">
            <pre className="font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
              <code>{activeLesson.code}</code>
            </pre>
          </div>

          {/* Simulated Execution Output */}
          <div className="p-4 bg-slate-950 border-t border-white/10">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Terminal Output (g++ -O3 -std=c++20)</span>
              </div>
              <span className="text-emerald-400 text-[11px]">Exit Code: 0</span>
            </div>
            <pre className="p-3 rounded-lg bg-black/60 border border-white/5 font-mono text-xs text-emerald-300 overflow-x-auto">
              {activeLesson.output}
            </pre>
          </div>

          {/* Explanation Section */}
          <div className="p-5 bg-slate-950/60 border-t border-white/10">
            <h4 className="font-mono text-xs uppercase text-slate-400 font-semibold mb-2">
              Key Mechanism Breakdown
            </h4>
            <div className="space-y-1.5">
              {activeLesson.explanation.map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-emerald-400 font-bold">›</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
