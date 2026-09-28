import React, { useState } from 'react';
import { NETWORKING_TOPICS, SECURITY_TOPICS, CYBER_NOTES, NetworkingTopic, SecurityTopic, CyberNote } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';
import { Shield, Network, Lock, BookOpen, Terminal, X, ChevronRight, CheckCircle2, AlertTriangle, ArrowUpRight, Search } from 'lucide-react';

export const CybersecuritySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'networking' | 'security' | 'notes'>('networking');
  const [selectedNetworkTopic, setSelectedNetworkTopic] = useState<NetworkingTopic | null>(null);
  const [selectedSecurityTopic, setSelectedSecurityTopic] = useState<SecurityTopic | null>(null);
  const [selectedNote, setSelectedNote] = useState<CyberNote | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter topics based on search
  const filteredNetworking = NETWORKING_TOPICS.filter(
    (t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.shortDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSecurity = SECURITY_TOPICS.filter(
    (t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.shortDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNotes = CYBER_NOTES.filter(
    (n) => n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="cybersecurity" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-3 dynamic-front-accent">
            <Shield className="w-3.5 h-3.5" />
            <span>Primary Digital Domain</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_5px_20px_rgba(255,255,255,0.15)]">
            Cyber<span className="prominent-gradient-title">security</span>
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Deconstructing packet flow, defending network infrastructure, and applying ethical security fundamentals through hands-on laboratory experimentation.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search cyber topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>

      {/* Sub-Realm Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-950/80 border border-white/10 rounded-xl mb-10 overflow-x-auto scrollbar-none w-fit">
        <button
          onClick={() => {
            sound.playBlip(780);
            setActiveTab('networking');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
            activeTab === 'networking'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Network className="w-3.5 h-3.5 text-cyan-400" />
          <span>Networking Architecture ({NETWORKING_TOPICS.length})</span>
        </button>

        <button
          onClick={() => {
            sound.playBlip(880);
            setActiveTab('security');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
            activeTab === 'security'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-medium'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Security Fundamentals ({SECURITY_TOPICS.length})</span>
        </button>

        <button
          onClick={() => {
            sound.playBlip(980);
            setActiveTab('notes');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
            activeTab === 'notes'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-medium'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-sky-400" />
          <span>Lab Notes & Writeups ({CYBER_NOTES.length})</span>
        </button>
      </div>

      {/* TAB 1: NETWORKING TOPICS */}
      {activeTab === 'networking' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredNetworking.map((topic) => (
            <div
              key={topic.id}
              onClick={() => {
                sound.playBlip(950);
                setSelectedNetworkTopic(topic);
              }}
              className="cyber-card rounded-xl p-5 cursor-pointer group flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400/80 mb-2">
                  <span className="uppercase tracking-wider">{topic.category}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:text-cyan-300 transition-all" />
                </div>
                <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                  {topic.name}
                </h3>
                <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {topic.shortDesc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{topic.keyConcepts.length} Core Concepts</span>
                <span className="text-cyan-400 group-hover:underline">Inspect →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: SECURITY FUNDAMENTALS */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSecurity.map((topic) => (
            <div
              key={topic.id}
              onClick={() => {
                sound.playBlip(950);
                setSelectedSecurityTopic(topic);
              }}
              className="cyber-card rounded-xl p-5 sm:p-6 cursor-pointer group flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                  <span className="uppercase tracking-wider">{topic.category}</span>
                  <Lock className="w-3.5 h-3.5 text-emerald-400/70" />
                </div>
                <h3 className="font-display font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">
                  {topic.name}
                </h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {topic.shortDesc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Scenario Available</span>
                <span className="text-emerald-400 group-hover:underline">Deep Dive →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: CYBER LAB NOTES & WRITEUPS */}
      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => {
                sound.playTransition();
                setSelectedNote(note);
              }}
              className="cyber-card rounded-2xl p-6 sm:p-7 cursor-pointer group flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-3">
                  <span className="text-sky-400 font-medium">{note.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{note.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{note.readTime}</span>
                </div>

                <h3 className="font-display font-bold text-xl text-white group-hover:text-sky-300 transition-colors">
                  {note.title}
                </h3>

                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {note.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  {note.tags.slice(0, 3).map((t, i) => (
                    <span key={t} className="text-slate-400">
                      #{t}{i < 2 ? ' ' : ''}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-mono text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Full Writeup <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL 1: NETWORKING DETAIL MODAL */}
      {selectedNetworkTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="cyber-card w-full max-w-2xl rounded-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto border border-cyan-500/40 relative shadow-[0_0_40px_rgba(6,182,212,0.2)]">
            <button
              onClick={() => setSelectedNetworkTopic(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              Networking Protocol Specification
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {selectedNetworkTopic.name}
            </h3>

            <div className="mt-4 text-sm text-slate-200 leading-relaxed">
              {selectedNetworkTopic.fullContent}
            </div>

            <div className="mt-6 pt-5 border-t border-white/10">
              <h4 className="font-mono text-xs uppercase text-cyan-300 tracking-wider mb-2">
                Key Technical Concepts
              </h4>
              <ul className="space-y-2">
                {selectedNetworkTopic.keyConcepts.map((concept) => (
                  <li key={concept} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{concept}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-semibold mb-1">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Security Implications & Hardening</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedNetworkTopic.securityImplications}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SECURITY TOPIC DETAIL MODAL */}
      {selectedSecurityTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="cyber-card w-full max-w-2xl rounded-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto border border-emerald-500/40 relative shadow-[0_0_40px_rgba(16,185,129,0.2)]">
            <button
              onClick={() => setSelectedSecurityTopic(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">
              Security Fundamental Core
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {selectedSecurityTopic.name}
            </h3>

            <div className="mt-4 text-sm text-slate-200 leading-relaxed">
              {selectedSecurityTopic.fullContent}
            </div>

            <div className="mt-6 pt-5 border-t border-white/10">
              <h4 className="font-mono text-xs uppercase text-emerald-300 tracking-wider mb-2">
                Industry Best Practices
              </h4>
              <ul className="space-y-2">
                {selectedSecurityTopic.bestPractices.map((practice) => (
                  <li key={practice} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Real-World Threat Scenario & Defense</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedSecurityTopic.realWorldScenario}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: NOTE DETAIL MODAL */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="cyber-card w-full max-w-3xl rounded-2xl p-6 sm:p-8 max-h-[88vh] overflow-y-auto border border-sky-500/40 relative shadow-[0_0_40px_rgba(56,189,248,0.2)]">
            <button
              onClick={() => setSelectedNote(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
              <span className="text-sky-400 font-medium">{selectedNote.category}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedNote.date}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedNote.readTime} read</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {selectedNote.title}
            </h3>

            <div className="mt-6 space-y-4 text-sm text-slate-300 leading-relaxed">
              {selectedNote.content.map((paragraph, index) => (
                <p key={index} className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                {selectedNote.tags.map((t) => (
                  <span key={t}>#{t}</span>
                ))}
              </div>
              <span className="text-xs font-mono text-emerald-400">
                Verified Ethical Experiment · Areeb Lab
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
