import React from 'react';
import { Sparkles, Github, Twitter, Layers } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-bottom border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-fuchsia-600 flex items-center justify-center">
          <Layers className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-display font-bold tracking-tight text-white">Aura</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
        <a href="#" className="hover:text-brand-light transition-colors">Templates</a>
        <a href="#" className="hover:text-brand-light transition-colors">Showcase</a>
        <a href="#" className="hover:text-brand-light transition-colors">Pricing</a>
        <a href="#" className="hover:text-brand-light transition-colors">Resources</a>
      </div>

      <div className="flex items-center gap-4">
        <a href="#" className="p-2 text-zinc-500 hover:text-white transition-colors">
          <Github className="w-5 h-5" />
        </a>
        <button className="hidden sm:block px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-medium hover:bg-zinc-800 transition-colors">
          Sign In
        </button>
        <button className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-colors">
          Get Started
        </button>
      </div>
    </nav>
  );
}
