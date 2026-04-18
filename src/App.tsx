import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GeneratingOverlay from './components/GeneratingOverlay';
import Workspace from './components/workspace/Workspace';
import { generateWebsite } from './lib/gemini';
import { AppState, WebsiteProject } from './types';

export default function App() {
  const [state, setState] = React.useState<AppState>('landing');
  const [project, setProject] = React.useState<WebsiteProject | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleStart = async (vision: string) => {
    setState('generating');
    setError(null);
    
    try {
      const result = await generateWebsite(vision);
      
      const newProject: WebsiteProject = {
        id: Math.random().toString(36).substr(2, 9),
        name: result.name,
        description: vision,
        files: result.files,
        createdAt: Date.now()
      };
      
      setProject(newProject);
      // Wait a bit to show the nice animation, then switch
      setTimeout(() => {
        setState('workspace');
      }, 1000); 
    } catch (err) {
      console.error(err);
      setError('Generation failed. Please try again.');
      setState('landing');
    }
  };

  const handleReset = () => {
    setState('landing');
    setProject(null);
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white selection:bg-brand/30 selection:text-brand-light font-sans">
      <Navbar />

      <AnimatePresence mode="wait">
        {state === 'landing' && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <Hero onStart={handleStart} />
            {error && (
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm font-medium backdrop-blur-xl">
                {error}
              </div>
            )}
          </motion.div>
        )}

        {state === 'generating' && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GeneratingOverlay />
          </motion.div>
        )}

        {state === 'workspace' && project && (
          <motion.div
            key="workspace"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <Workspace project={project} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-500/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}

