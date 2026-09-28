import React, { useState } from 'react';
import { CYBER_NOTES, CyberNote } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';
import { BookOpen, Search, ArrowUpRight, X, Calendar, Clock, Tag } from 'lucide-react';

export const KnowledgeHubSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDocument, setActiveDocument] = useState<CyberNote | null>(null);

  // Extend with more knowledge records across all 5 areas (Cyber, Networking, C++, Python, AI)
  const allKnowledge: CyberNote[] = [
    ...CYBER_NOTES,
    {
      id: 'doc-net-subnetting',
      title: 'CIDR Subnetting & Supernetting Fast Mental Calculation Guide',
      category: 'Networking',
      date: '2026-03-01',
      readTime: '5 min',
      summary: 'A fast mental model for calculating network boundaries, broadcast addresses, and usable host counts for /24 through /30 subnets.',
      tags: ['Networking', 'CIDR', 'Subnetting', 'IPv4'],
      content: [
        'Subnetting is often taught with complicated binary math, but understanding the powers of two (128, 64, 32, 16, 8, 4, 2, 1) allows instant mental resolution.',
        'A /27 subnet borrows 3 host bits from the fourth octet. 256 - 224 = 32 block size. Subnets jump in steps of 32: 0, 32, 64, 96...',
        'Usable host formula: 2^(32 - prefix) - 2. Always subtract 2 for the Network ID and the Broadcast Address.'
      ]
    },
    {
      id: 'doc-cpp-smartpointers',
      title: 'Modern C++ Memory Safety: std::unique_ptr vs std::shared_ptr',
      category: 'C++',
      date: '2026-02-15',
      readTime: '7 min',
      summary: 'Why std::unique_ptr has zero runtime overhead compared to raw pointers, and how std::shared_ptr reference counting atomic instructions impact multithreaded cache lines.',
      tags: ['C++', 'Memory', 'RAII', 'SmartPointers'],
      content: [
        'Raw new and delete have no place in modern C++ code. std::unique_ptr enforces single ownership at compile time with zero overhead.',
        'When passing std::unique_ptr, use std::move to transfer ownership explicitly. For read-only access, dereference and pass as a const reference (const T&).',
        'std::shared_ptr introduces atomic reference counting control blocks, which causes cache bouncing across CPU cores if accessed concurrently.'
      ]
    },
    {
      id: 'doc-py-asyncio',
      title: 'High-Throughput Concurrency in Python with Asyncio & UVLoop',
      category: 'Python',
      date: '2026-01-28',
      readTime: '6 min',
      summary: 'Demystifying the Python event loop, cooperative multitasking, non-blocking I/O multiplexing, and bypassing GIL limits with process pools.',
      tags: ['Python', 'Asyncio', 'Concurrency', 'Sockets'],
      content: [
        'The Global Interpreter Lock (GIL) limits CPU-bound parallelism in CPython, but network I/O operations spend 99% of time waiting for socket packets.',
        'Asyncio uses epoll/kqueue under the hood to manage thousands of concurrent open socket connections on a single OS thread.',
        'Always wrap blocking synchronous calls (like file reads or slow DNS resolutions) in loop.run_in_executor() to avoid freezing the event loop.'
      ]
    },
    {
      id: 'doc-ai-security',
      title: 'Adversarial Machine Learning: Prompt Injections & Evasion Tactics',
      category: 'AI',
      date: '2025-12-22',
      readTime: '8 min',
      summary: 'Analyzing indirect prompt injection vectors, jailbreak payloads, and defensive guardrail architectures for LLM-powered applications.',
      tags: ['AI', 'Security', 'LLMs', 'Adversarial'],
      content: [
        'Indirect prompt injection occurs when an AI agent consumes untrusted third-party content (like website text or email bodies) containing hidden instructions.',
        'Traditional regex filters fail against obfuscated Unicode, Base64, and roleplay bypasses.',
        'Effective mitigation requires strict separation of system control instructions from untrusted data channels, input sanitization, and scoped API token privileges.'
      ]
    }
  ];

  const categories = ['ALL', 'Cybersecurity', 'Networking', 'C++', 'Python', 'AI'];

  const filteredDocs = allKnowledge.filter((doc) => {
    const matchesCat = selectedCategory === 'ALL' || doc.category.toLowerCase() === selectedCategory.toLowerCase() || (selectedCategory === 'Cybersecurity' && doc.tags.includes('Security'));
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || doc.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="knowledge" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-3 text-purple-400 dynamic-front-accent">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Digital Repository</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_5px_25px_rgba(168,85,247,0.35)]">
            Knowledge <span className="prominent-gradient-title">Hub & Vault</span>
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Technical writeups, networking cheat-sheets, low-level memory forensics, and research notes published from my digital laboratory.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400/70" />
          <input
            type="text"
            placeholder="Search knowledge docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/70 border border-purple-500/20 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                sound.playBlip(820);
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-purple-500/25 text-purple-300 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'bg-slate-900/60 border border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            onClick={() => {
              sound.playTransition();
              setActiveDocument(doc);
            }}
            className="cyber-card rounded-2xl p-6 sm:p-7 cursor-pointer flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              {/* Unboxed clean metadata with typographic separators */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3">
                <span className="text-cyan-400 font-medium">{doc.category}</span>
                <span aria-hidden="true">·</span>
                <span>{doc.date}</span>
                <span aria-hidden="true">·</span>
                <span>{doc.readTime}</span>
              </div>

              <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                {doc.title}
              </h3>

              <p className="mt-2.5 text-xs text-slate-300 leading-relaxed line-clamp-3">
                {doc.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <Tag className="w-3 h-3 text-slate-500" />
                <span>#{doc.tags[0]}</span>
              </div>

              <span className="text-xs font-mono text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1">
                <span>Read Doc</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Full Document Reader Modal */}
      {activeDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="cyber-card w-full max-w-3xl rounded-2xl p-6 sm:p-8 max-h-[88vh] overflow-y-auto border border-cyan-500/40 relative shadow-[0_0_50px_rgba(6,182,212,0.25)]">
            <button
              onClick={() => setActiveDocument(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
              <span className="text-cyan-400 font-semibold">{activeDocument.category}</span>
              <span>·</span>
              <span>{activeDocument.date}</span>
              <span>·</span>
              <span>{activeDocument.readTime} read time</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {activeDocument.title}
            </h3>

            <div className="mt-6 space-y-4 text-sm text-slate-200 leading-relaxed">
              {activeDocument.content.map((paragraph, index) => (
                <div key={index} className="p-4 rounded-xl bg-slate-950/70 border border-white/5">
                  {paragraph}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                {activeDocument.tags.map((t) => (
                  <span key={t} className="text-cyan-300">
                    #{t}
                  </span>
                ))}
              </div>
              <span className="text-emerald-400">Published by Areeb</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
