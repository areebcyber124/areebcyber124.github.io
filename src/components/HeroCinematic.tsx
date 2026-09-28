import React, { useState, useEffect } from 'react';
import { Shield, ChevronDown, Terminal, Cpu, Network, Sparkles, ArrowRight } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface HeroCinematicProps {
  onEnter: () => void;
  onNavigate: (sectionId: string) => void;
}

export const HeroCinematic: React.FC<HeroCinematicProps> = ({ onEnter, onNavigate }) => {
  const [bootStep, setBootStep] = useState(0);
  const [terminalText, setTerminalText] = useState('');
  const fullText = '$ areeb --realm init --modules [cyber,cpp,python,ai] --status ACTIVE';

  useEffect(() => {
    const timer1 = setTimeout(() => setBootStep(1), 300);
    const timer2 = setTimeout(() => setBootStep(2), 900);
    const timer3 = setTimeout(() => setBootStep(3), 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (bootStep >= 2) {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= fullText.length) {
          setTerminalText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 25);
      return () => clearInterval(interval);
    }
  }, [bootStep]);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-20 pb-16 overflow-hidden">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center z-10">
        {/* Boot status sequence */}
        <div className={`transition-all duration-700 ${bootStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wide">NEURAL PROTOCOL INITIALIZED</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">NODE 127.0.0.1</span>
          </div>
        </div>

        {/* Cinematic Name: AREEB */}
        <div className={`transition-all duration-1000 delay-200 ${bootStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyan-300 drop-shadow-[0_10px_45px_rgba(6,182,212,0.35)] select-none">
            AREEB
          </h1>
        </div>

        {/* Core Identity & Pillars */}
        <div className={`transition-all duration-1000 delay-500 ${bootStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="mt-4 font-mono text-sm sm:text-base md:text-lg dynamic-front-accent font-semibold tracking-wide dynamic-front-glow">
            Cybersecurity Enthusiast <span className="text-slate-600">·</span> Programmer <span className="text-slate-600">·</span> Future AI Builder
          </p>

          <div className="mt-3 flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-slate-300">
            <span className="text-cyan-300 font-semibold">CYBERSECURITY</span>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-300 font-semibold">C++</span>
            <span className="text-slate-600">/</span>
            <span className="text-sky-300 font-semibold">PYTHON</span>
            <span className="text-slate-600">/</span>
            <span className="text-purple-400 font-semibold">AI LAB</span>
          </div>

          <p className="mt-6 max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed text-balance">
            Traveling through low-level memory architectures, network protocol dissections, defensive cybersecurity perimeters, and intelligent future tools.
          </p>

          {/* Interactive simulated terminal snippet */}
          <div className="mt-8 max-w-xl mx-auto w-full text-left bg-slate-950/85 backdrop-blur-md rounded-xl border border-white/10 p-3.5 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[11px] text-slate-400">areeb@security-nexus:~</span>
              </div>
              <span className="text-[10px] text-cyan-400/80">bash 5.2</span>
            </div>
            <div className="text-slate-300 min-h-[1.5rem] flex items-center">
              <span>{terminalText}</span>
              <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />
            </div>
          </div>

          {/* Primary CTA: ENTER MY DIGITAL WORLD */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                sound.playConfirm();
                onEnter();
              }}
              className="group relative px-8 py-3.5 rounded-xl font-display font-bold text-sm tracking-wider uppercase text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 flex items-center gap-2.5"
            >
              <span>ENTER MY DIGITAL WORLD</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                sound.playTransition();
                onNavigate('cybersecurity');
              }}
              className="px-6 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider text-slate-300 hover:text-cyan-300 bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-cyan-500/30 transition-all duration-200 flex items-center gap-2"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Explore Cyber Realm</span>
            </button>
          </div>

          {/* Quick realm anchors */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto w-full">
            {[
              { id: 'cybersecurity', title: 'Cybersecurity', icon: Shield, desc: 'Packets & Defense' },
              { id: 'cpp', title: 'C++ Systems', icon: Cpu, desc: 'Pointers & Memory' },
              { id: 'python', title: 'Python Lab', icon: Network, desc: 'Sockets & Automation' },
              { id: 'ailab', title: 'AI Laboratory', icon: Sparkles, desc: 'Next-Gen Models' },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  onClick={() => {
                    sound.playBlip(900);
                    onNavigate(pillar.id);
                  }}
                  className="p-3 text-left rounded-lg bg-slate-900/40 hover:bg-slate-800/60 border border-white/5 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="flex items-center gap-2 text-slate-200 group-hover:text-cyan-400 transition-colors">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span className="font-display font-semibold text-xs">{pillar.title}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500 group-hover:text-slate-400 transition-colors">
                    {pillar.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scroll indicator prompt */}
        <div className="mt-16 flex flex-col items-center gap-1.5 text-slate-500 animate-bounce">
          <span className="font-mono text-[10px] tracking-widest uppercase text-slate-400">Scroll to Navigate 3D Realm</span>
          <ChevronDown className="w-4 h-4 text-cyan-400" />
        </div>
      </div>
    </section>
  );
};
