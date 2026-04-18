import React from 'react';
import { FileNode } from '../../types';

interface CodeEditorProps {
  file: FileNode | null;
}

export default function CodeEditor({ file }: CodeEditorProps) {
  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-600 bg-zinc-900 font-mono italic">
        Select a file to view code
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-900">
      <div className="p-3 border-b border-zinc-800 bg-zinc-950 flex items-center gap-2">
        <span className="text-xs font-mono text-brand-light">{file.name}</span>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <pre className="font-mono text-sm leading-relaxed text-zinc-300">
          <code>{file.content}</code>
        </pre>
      </div>
    </div>
  );
}
