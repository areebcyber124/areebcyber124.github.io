import React, { useState } from 'react';
import { Volume2, VolumeX, Compass, Menu, X, Terminal, Shield, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  interactiveOrbit: boolean;
  onToggleOrbit: () => void;
  onOpenTerminal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  soundEnabled,
  onToggleSound,
  interactiveOrbit,
  onToggleOrbit,
  onOpenTerminal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'cybersecurity', label: 'Cybersecurity' },
    { id: 'cpp', label: 'C++' },
    { id: 'python', label: 'Python' },
    { id: 'ailab', label: 'AI Lab' },
    { id: 'projects', label: 'Projects' },
    { id: 'knowledge', label: 'Knowledge' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    sound.playTransition();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 backdrop-blur-md bg-[#04060a]/75 border-b border-white/[0.06] transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-2.5 text-left focus-visible:outline-none"
          >
            <div
              className="w-2.5 h-2.5 rounded-full transition-all duration-300 group-hover:scale-125"
              style={{
                backgroundColor: 'var(--dynamic-front-text, #22d3ee)',
                boxShadow: '0 0 12px var(--dynamic-front-text, #22d3ee)',
              }}
            />
            <span
              className="font-display text-xl font-bold tracking-wider transition-colors"
              style={{
                color: 'var(--dynamic-front-text, #22d3ee)',
                textShadow: '0 0 15px var(--dynamic-front-glow, rgba(34, 211, 238, 0.4))',
              }}
            >
              AREEB
            </span>
            <span className="hidden xl:inline-block text-[10px] font-mono uppercase tracking-widest text-slate-500 pl-1 border-l border-white/10">
              Cyber Journey
            </span>
          </button>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-mono font-medium text-slate-400">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    color: isActive ? 'var(--dynamic-front-text, #c084fc)' : undefined,
                  }}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    isActive ? 'font-semibold' : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300"
                      style={{
                        backgroundColor: 'var(--dynamic-front-text, #c084fc)',
                        boxShadow: '0 0 10px var(--dynamic-front-text, #c084fc)',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary actions */}
          <div className="flex items-center gap-2.5">
            {/* Quick Interactive Cyber Terminal Button */}
            <button
              onClick={() => {
                sound.playBlip(1100);
                onOpenTerminal();
              }}
              title="Open CyberShell Console"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 rounded-lg transition-colors whitespace-nowrap"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>CyberShell</span>
            </button>

            {/* 3D Orbit Toggle */}
            <button
              onClick={() => {
                sound.playConfirm();
                onToggleOrbit();
              }}
              title={interactiveOrbit ? "3D Free-Orbit Enabled (Drag to rotate)" : "Enable 3D Orbit Mode"}
              className={`p-2 rounded-lg border transition-colors ${
                interactiveOrbit
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border-white/10'
              }`}
            >
              <Compass className="w-4 h-4" />
            </button>

            {/* Audio Toggle */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? "Mute Cyber Audio" : "Enable Cyber Audio"}
              className={`p-2 rounded-lg border transition-colors ${
                soundEnabled
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border-white/10'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Contact CTA */}
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-lg shadow-sm font-display transition-all whitespace-nowrap"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg border border-white/10 bg-slate-900/50"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#04060a]/95 backdrop-blur-xl pt-20 px-6 pb-8 flex flex-col justify-between lg:hidden border-b border-cyan-500/20">
          <div className="space-y-3">
            <div className="text-xs uppercase font-mono text-cyan-400 tracking-wider mb-2">
              Select Digital Realm
            </div>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                    isActive
                      ? 'bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900/60'
                  }`}
                >
                  <span className="font-display text-base tracking-wide">{item.label}</span>
                  {isActive && <Shield className="w-4 h-4 text-cyan-400" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenTerminal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-3 py-2 rounded-lg"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch CyberShell</span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="text-xs font-display font-semibold text-slate-950 bg-cyan-400 px-4 py-2 rounded-lg"
            >
              Contact Areeb
            </button>
          </div>
        </div>
      )}
    </>
  );
};
