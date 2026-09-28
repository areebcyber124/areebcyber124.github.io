import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/soundEffects';
import { Terminal, X, Minimize2, Maximize2, Play, CornerDownLeft } from 'lucide-react';

interface CyberTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

interface CommandHistory {
  command: string;
  output: string | React.ReactNode;
}

export const CyberTerminalModal: React.FC<CyberTerminalModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'init',
      output: (
        <div className="space-y-1 text-slate-300">
          <div className="text-cyan-400 font-bold">
            [+] AREEB CYBERSHELL v2.4 — SECURITY & LOW-LEVEL ENGINE
          </div>
          <div>Type <span className="text-emerald-400 font-semibold">help</span> to view commands, or click quick actions below.</div>
        </div>
      ),
    },
  ]);
  const [isScanning, setIsScanning] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;
    sound.playConfirm();

    const lower = trimmed.toLowerCase();
    let result: React.ReactNode;

    if (lower === 'help') {
      result = (
        <div className="space-y-1 text-xs text-slate-300">
          <div className="text-cyan-300 font-semibold">AVAILABLE COMMANDS:</div>
          <div><span className="text-emerald-400 font-mono w-28 inline-block">whoami</span> Display Areeb's profile & mission</div>
          <div><span className="text-emerald-400 font-mono w-28 inline-block">scan</span> Run simulated multi-port socket scan</div>
          <div><span className="text-emerald-400 font-mono w-28 inline-block">skills</span> List technical proficiencies</div>
          <div><span className="text-emerald-400 font-mono w-28 inline-block">cipher [msg]</span> Encrypt text with simulated AES-GCM</div>
          <div><span className="text-emerald-400 font-mono w-28 inline-block">netstat</span> Show simulated socket connections</div>
          <div><span className="text-emerald-400 font-mono w-28 inline-block">goto [realm]</span> Navigate: cyber | cpp | python | ai | projects</div>
          <div><span className="text-emerald-400 font-mono w-28 inline-block">clear</span> Clear terminal buffer</div>
          <div><span className="text-emerald-400 font-mono w-28 inline-block">exit</span> Close terminal</div>
        </div>
      );
    } else if (lower === 'whoami') {
      result = (
        <div className="space-y-1 text-xs">
          <div className="text-cyan-400 font-bold">AREEB</div>
          <div className="text-slate-300">Role: Cybersecurity Enthusiast · C++ Systems Programmer · Future AI Builder</div>
          <div className="text-slate-400">Email: areebcyber124@gmail.com</div>
          <div className="text-emerald-400">Status: Building practical security tools and learning through code.</div>
        </div>
      );
    } else if (lower === 'scan') {
      setIsScanning(true);
      result = (
        <div className="space-y-1 text-xs font-mono">
          <div className="text-cyan-400">[!] Initiating SYN Stealth Scan on 192.168.1.0/24...</div>
          <div className="text-slate-400">PORT   STATE SERVICE       VERSION</div>
          <div className="text-emerald-400">22/tcp open  ssh           OpenSSH 9.3p1 (Ubuntu)</div>
          <div className="text-emerald-400">80/tcp open  http          Nginx 1.24.0</div>
          <div className="text-emerald-400">443/tcp open  https         TLS 1.3 AES-GCM</div>
          <div className="text-amber-400">3000/tcp open ppp           React-Three-Fiber WebGL Node</div>
          <div className="text-slate-500">8080/tcp filtered http-proxy (Drop by pfSense firewall)</div>
          <div className="text-cyan-300">[+] Scan completed in 0.42 seconds. 4 open ports identified.</div>
        </div>
      );
    } else if (lower.startsWith('cipher')) {
      const parts = trimmed.split(' ');
      const msg = parts.slice(1).join(' ') || 'SecretPayload';
      const hex = Array.from(msg)
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('');
      result = (
        <div className="space-y-1 text-xs font-mono">
          <div className="text-cyan-400">[AES-256-GCM SIMULATION]</div>
          <div>Plaintext: <span className="text-white">{msg}</span></div>
          <div>Key Derived: <span className="text-amber-400">0x9f4a8b...[Argon2id Salted]</span></div>
          <div>Ciphertext: <span className="text-emerald-400">e5b7c89f3a12{hex}0d48</span></div>
          <div>Auth Tag  : <span className="text-sky-400">0x7c491e0a84f3</span></div>
          <div className="text-slate-400">[+] Authentication tag verified. Tamper-evident integrity intact.</div>
        </div>
      );
    } else if (lower === 'skills') {
      result = (
        <div className="space-y-1 text-xs font-mono">
          <div><span className="text-cyan-300 font-semibold">CYBERSECURITY:</span> Wireshark, Nmap, TCP/IP, Sockets, Packet Sniffing, SIEM, pfSense</div>
          <div><span className="text-emerald-300 font-semibold">C++ SYSTEMS:</span> Modern C++20, RAII, Memory & Pointers, Sockets, File I/O</div>
          <div><span className="text-sky-300 font-semibold">PYTHON:</span> Asyncio, Sockets, Log Parsers, Regex, Automation Scripts</div>
          <div><span className="text-amber-300 font-semibold">AI LAB:</span> LLM Prompt Pipelines, Anomaly Classification, Agent Architectures</div>
        </div>
      );
    } else if (lower === 'netstat') {
      result = (
        <div className="text-xs font-mono text-slate-300 space-y-0.5">
          <div className="text-cyan-400">PROTO LOCAL-ADDR         FOREIGN-ADDR       STATE</div>
          <div>tcp4  127.0.0.1:3000      0.0.0.0:*          LISTEN</div>
          <div>tcp4  192.168.1.15:54320  142.250.190.46:443 ESTABLISHED</div>
          <div>tcp4  192.168.1.15:54322  104.26.10.228:443  ESTABLISHED</div>
          <div>udp4  0.0.0.0:53          0.0.0.0:*          LISTENING</div>
        </div>
      );
    } else if (lower.startsWith('goto')) {
      const target = lower.split(' ')[1];
      if (['cyber', 'cybersecurity'].includes(target)) {
        onNavigate('cybersecurity');
        result = 'Navigating to Cybersecurity realm...';
      } else if (['cpp', 'c++'].includes(target)) {
        onNavigate('cpp');
        result = 'Navigating to C++ realm...';
      } else if (['python', 'py'].includes(target)) {
        onNavigate('python');
        result = 'Navigating to Python realm...';
      } else if (['ai', 'ailab'].includes(target)) {
        onNavigate('ailab');
        result = 'Navigating to AI Lab realm...';
      } else if (['projects', 'project'].includes(target)) {
        onNavigate('projects');
        result = 'Navigating to Projects realm...';
      } else {
        result = 'Unknown realm. Try: goto cyber, goto cpp, goto python, goto ai, goto projects';
      }
    } else if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (lower === 'exit') {
      onClose();
      return;
    } else {
      result = (
        <div className="text-xs text-rose-400 font-mono">
          Command not recognized: "{trimmed}". Type <span className="text-cyan-300 underline cursor-pointer" onClick={() => handleCommand('help')}>help</span> for available commands.
        </div>
      );
    }

    setHistory((prev) => [...prev, { command: trimmed, output: result }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="cyber-card w-full max-w-3xl rounded-2xl flex flex-col h-[75vh] border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden">
        {/* Terminal Title Bar */}
        <div className="px-4 py-3 bg-slate-950/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Terminal className="w-4 h-4" />
            <span className="font-bold">areeb@cyber-terminal:~$</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCommand('help')}
              className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 px-2 py-0.5 rounded border border-white/10"
            >
              help
            </button>
            <button
              onClick={() => handleCommand('scan')}
              className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30"
            >
              scan
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3 font-mono text-xs leading-relaxed">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400/90">
                <span className="text-slate-500">areeb@nexus:~$</span>
                <span className="text-white font-medium">{item.command}</span>
              </div>
              <div className="pl-4 border-l border-white/10 py-1">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(inputVal);
          }}
          className="p-3 bg-slate-950/90 border-t border-white/10 flex items-center gap-2"
        >
          <span className="font-mono text-xs text-cyan-400 font-bold pl-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => {
              sound.playKeypress();
              setInputVal(e.target.value);
            }}
            placeholder="Type a command (help, scan, whoami, cipher, netstat)..."
            className="flex-1 bg-transparent border-none text-xs font-mono text-slate-100 placeholder-slate-600 focus:outline-none"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
