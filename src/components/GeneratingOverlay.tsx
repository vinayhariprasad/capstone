import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

const STEPS = [
  "Analyzing vision...",
  "Synthesizing layout architecture...",
  "Generating high-end typography system...",
  "Curating high-resolution visual assets...",
  "Drafting semantic HTML5 structure...",
  "Applying Tailwind CSS utility engine...",
  "Injecting interactive JavaScript logic...",
  "Reviewing aesthetic cohesion...",
  "Finalizing production build..."
];

export default function GeneratingOverlay() {
  const [stepIndex, setStepIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 blur-[120px] rounded-full animate-pulse [animation-delay:1s]" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-lg w-full">
        <div className="w-20 h-20 rounded-3xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-8 relative">
          <Sparkles className="w-10 h-10 text-brand-light animate-pulse" />
          <div className="absolute -inset-4 bg-brand/20 blur-xl opacity-50 rounded-full animate-pulse" />
        </div>

        <h2 className="text-3xl font-display font-bold text-white mb-2 text-center">
          Building your <span className="gradient-text">digital presence</span>
        </h2>
        <p className="text-zinc-500 text-sm mb-12 text-center uppercase tracking-widest font-bold">
          AI-Powered Generation in Progress
        </p>

        <div className="w-full space-y-4 mb-12">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: idx === stepIndex ? 1 : idx < stepIndex ? 0.4 : 0,
                x: 0,
                scale: idx === stepIndex ? 1.02 : 1
              }}
              className={`flex items-center gap-3 py-2 px-4 rounded-xl border transition-all duration-500 ${
                idx === stepIndex 
                  ? 'bg-zinc-900 border-zinc-800 text-white' 
                  : idx < stepIndex 
                    ? 'border-transparent text-zinc-500 line-through decoration-brand/50' 
                    : 'border-transparent text-zinc-700'
              }`}
            >
              {idx < stepIndex ? (
                <CheckCircle2 className="w-4 h-4 text-brand" />
              ) : idx === stepIndex ? (
                <Loader2 className="w-4 h-4 text-brand animate-spin" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-zinc-800" />
              )}
              <span className="text-sm font-medium">{step}</span>
            </motion.div>
          ))}
        </div>

        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden mb-2">
          <motion.div 
            className="h-full bg-gradient-to-r from-brand to-fuchsia-500"
            initial={{ width: '0%' }}
            animate={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <div className="flex justify-between w-full text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
          <span>Processing model shards</span>
          <span>{Math.round(((stepIndex + 1) / STEPS.length) * 100)}% Complete</span>
        </div>
      </div>
    </div>
  );
}
