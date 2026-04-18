import React from 'react';
import { Sparkles, ArrowRight, Code2, Layout, Zap, FolderTree } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onStart: (vision: string) => void;
}

export default function Hero({ onStart }: HeroProps) {
  const [vision, setVision] = React.useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand-light text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Next Generation Web Builder</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
          Launch your <span className="gradient-text italic">vision</span> <br /> 
          in seconds
        </h1>
        
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Aura uses advanced AI to generate full-stack websites with stunning designs, 
          rich content, and optimized code—all from a single prompt.
        </p>

        <div className="relative max-w-2xl mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand to-fuchsia-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative glass-panel rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
            <textarea
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder="Describe your website (e.g., 'A modern coffee shop website with an artisanal feel, menu section, and user testimonials')"
              className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-zinc-500 p-4 resize-none h-24 sm:h-auto"
            />
            <button
              onClick={() => vision.trim() && onStart(vision)}
              disabled={!vision.trim()}
              className="sm:w-auto w-full bg-brand hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shrink-0 self-end"
            >
              Generate
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {[
            "Coffee Shop",
            "SaaS Landing Page",
            "Personal Portfolio",
            "Eco-friendly E-commerce",
            "Law Firm"
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setVision(`A ${suggestion.toLowerCase()} website with a modern design, high-quality images, and sections for features, about us, and contact.`)}
              className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
            >
              + {suggestion}
            </button>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 justify-center">
            <Code2 className="w-5 h-5" />
            <span className="font-medium">Clean Code</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Layout className="w-5 h-5" />
            <span className="font-medium">Responsive</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Zap className="w-5 h-5" />
            <span className="font-medium">Instant Live</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <FolderTree className="w-5 h-5" />
            <span className="font-medium">Full Project</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
