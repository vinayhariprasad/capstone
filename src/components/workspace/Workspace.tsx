import React from 'react';
import { 
  Monitor, 
  Code, 
  Share2, 
  Download, 
  ExternalLink, 
  RotateCcw,
  Zap,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { FileNode, WebsiteProject } from '../../types';
import FileExplorer from './FileExplorer';
import CodeEditor from './CodeEditor';
import Preview from './Preview';

interface WorkspaceProps {
  project: WebsiteProject;
  onReset: () => void;
}

export default function Workspace({ project, onReset }: WorkspaceProps) {
  const [activeTab, setActiveTab] = React.useState<'preview' | 'code'>('preview');
  const [activeFileId, setActiveFileId] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Select first file by default
    if (project.files.length > 0 && !activeFileId) {
      setActiveFileId(project.files[0].id);
    }
  }, [project.files]);

  const activeFile = project.files.find(f => f.id === activeFileId) || null;

  return (
    <div className="fixed inset-0 pt-16 flex flex-col bg-zinc-950">
      {/* Workspace Header */}
      <header className="h-14 border-b border-zinc-800 px-6 flex items-center justify-between bg-zinc-900/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-brand/10 border border-brand/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-brand-light" />
            </div>
            <h2 className="font-semibold text-white tracking-tight">{project.name}</h2>
          </div>
          <div className="h-4 w-px bg-zinc-800" />
          <nav className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
            <button
              onClick={() => setActiveTab('preview')}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all
                ${activeTab === 'preview' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}
              `}
            >
              <Monitor className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all
                ${activeTab === 'code' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}
              `}
            >
              <Code className="w-4 h-4" />
              Editor
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onReset}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
            title="Start New"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <div className="h-4 w-px bg-zinc-800" />
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm font-medium hover:bg-zinc-700 transition-all">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </header>

      {/* Workspace Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-zinc-800 bg-zinc-950">
          <FileExplorer 
            files={project.files} 
            activeFileId={activeFileId}
            onFileSelect={(id) => {
              setActiveFileId(id);
              setActiveTab('code'); // Switch to code view when clicking a file
            }}
          />
        </div>

        {/* Editor/Preview Area */}
        <div className="flex-1 h-full overflow-hidden flex flex-col relative">
          {activeTab === 'preview' ? (
            <div className="absolute inset-0 p-6 bg-zinc-900 overflow-auto">
              {/* Device Frame */}
              <div className="max-w-7xl mx-auto h-full rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden bg-white flex flex-col">
                <Preview files={project.files} />
              </div>
            </div>
          ) : (
            <CodeEditor file={activeFile} />
          )}
        </div>
      </main>

      {/* Footer Status Bar */}
      <footer className="h-8 border-t border-zinc-800 px-4 flex items-center justify-between bg-zinc-950/80 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-brand" />
            <span>Ready to Deploy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-2.5 h-2.5" />
            <span>Sync Complete</span>
          </div>
        </div>
        <div>
          <span>Gemini 3 Flash Pro • UTF-8 • React 19</span>
        </div>
      </footer>
    </div>
  );
}
