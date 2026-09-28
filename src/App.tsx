/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { CyberCanvas } from './components/CyberCanvas';
import { Navigation } from './components/Navigation';
import { HeroCinematic } from './components/HeroCinematic';
import { AboutSection } from './components/AboutSection';
import { CybersecuritySection } from './components/CybersecuritySection';
import { CppSection } from './components/CppSection';
import { PythonSection } from './components/PythonSection';
import { AiLabSection } from './components/AiLabSection';
import { ProjectsSection } from './components/ProjectsSection';
import { KnowledgeHubSection } from './components/KnowledgeHubSection';
import { ContactSection } from './components/ContactSection';
import { CyberTerminalModal } from './components/CyberTerminalModal';
import { sound } from './utils/soundEffects';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [interactiveOrbit, setInteractiveOrbit] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [performanceTier, setPerformanceTier] = useState<'high' | 'balanced' | 'low'>('high');

  // Automatic mobile/low-memory performance adjustment
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      const cores = navigator.hardwareConcurrency || 4;
      if (isMobile || cores <= 4) {
        setPerformanceTier('balanced');
      }
    }
  }, []);

  // Scroll detection to update activeSection and dynamic purple theme transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      setScrollProgress(progress);

      // Smooth color morphing: Cyan (#22d3ee -> rgb 34, 211, 238) to Prominent Neon Purple (#c084fc -> rgb 192, 132, 252)
      // and deep electric purple (#a855f7 -> rgb 168, 85, 247)
      const r = Math.round(34 + (192 - 34) * Math.pow(progress, 0.9));
      const g = Math.round(211 + (132 - 211) * Math.pow(progress, 0.9));
      const b = Math.round(238 + (252 - 238) * Math.pow(progress, 0.9));

      const rGlow = Math.round(6 + (168 - 6) * progress);
      const gGlow = Math.round(182 + (85 - 182) * progress);
      const bGlow = Math.round(212 + (247 - 212) * progress);

      document.documentElement.style.setProperty('--scroll-progress', String(progress));
      document.documentElement.style.setProperty('--dynamic-front-text', `rgb(${r}, ${g}, ${b})`);
      document.documentElement.style.setProperty(
        '--dynamic-front-glow',
        `rgba(${rGlow}, ${gGlow}, ${bGlow}, ${0.35 + progress * 0.4})`
      );

      const sections = [
        'home',
        'about',
        'cybersecurity',
        'cpp',
        'python',
        'ailab',
        'projects',
        'knowledge',
        'contact',
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    // Initial trigger
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth navigation jump
  const handleNavigate = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  }, []);

  const handleToggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
  };

  const handleToggleOrbit = () => {
    setInteractiveOrbit((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#04060a] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 3D Cinematic Background WebGL Canvas */}
      <CyberCanvas
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        performanceTier={performanceTier}
        interactiveOrbit={interactiveOrbit}
      />

      {/* Top Floating Navigation Bar */}
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        interactiveOrbit={interactiveOrbit}
        onToggleOrbit={handleToggleOrbit}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Storytelling Digital Realms */}
      <main className="relative z-10">
        <HeroCinematic
          onEnter={() => handleNavigate('about')}
          onNavigate={handleNavigate}
        />

        <AboutSection onNavigate={handleNavigate} />

        <CybersecuritySection />

        <CppSection />

        <PythonSection />

        <AiLabSection />

        <ProjectsSection />

        <KnowledgeHubSection />

        <ContactSection />
      </main>

      {/* Interactive CyberShell Command Line Modal */}
      <CyberTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigate={(realm) => {
          setIsTerminalOpen(false);
          handleNavigate(realm);
        }}
      />

      {/* Dynamic Realm Color Spectrum HUD */}
      <div className="fixed bottom-4 left-4 z-30 hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-950/85 border border-white/10 backdrop-blur-md font-mono text-[11px] shadow-2xl transition-all duration-300">
        <span
          className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor] transition-colors duration-200"
          style={{
            backgroundColor: 'var(--dynamic-front-text, #22d3ee)',
            color: 'var(--dynamic-front-text, #22d3ee)',
          }}
        />
        <span className="text-slate-400">SPECTRUM:</span>
        <span
          className="font-bold tracking-wide transition-colors duration-200"
          style={{ color: 'var(--dynamic-front-text, #22d3ee)' }}
        >
          {scrollProgress < 0.2
            ? 'CYBER CYAN'
            : scrollProgress < 0.5
            ? 'INDIGO CORE'
            : scrollProgress < 0.75
            ? 'VIOLET EXPANSION'
            : 'ELECTRIC PURPLE'}
        </span>
        <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden ml-1 border border-white/5">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${Math.round(scrollProgress * 100)}%`,
              background: 'linear-gradient(to right, #06b6d4, #c084fc)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
