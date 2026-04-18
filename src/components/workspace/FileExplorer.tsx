import React from 'react';
import { File, Folder, ChevronRight, ChevronDown } from 'lucide-react';
import { FileNode } from '../../types';

interface FileExplorerProps {
  files: FileNode[];
  activeFileId: string | null;
  onFileSelect: (id: string) => void;
}

export default function FileExplorer({ files, activeFileId, onFileSelect }: FileExplorerProps) {
  const renderNode = (node: FileNode, depth = 0) => {
    const isActive = node.id === activeFileId;
    const isFolder = node.type === 'folder';

    return (
      <div key={node.id} className="flex flex-col">
        <button
          onClick={() => !isFolder && onFileSelect(node.id)}
          className={`
            flex items-center gap-2 py-1.5 px-3 w-full text-left text-sm transition-colors
            ${isActive ? 'bg-brand/10 text-brand-light' : 'hover:bg-zinc-800 text-zinc-400'}
          `}
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
        >
          {isFolder ? (
            <>
              <ChevronDown className="w-4 h-4" />
              <Folder className="w-4 h-4 fill-brand/20 text-brand" />
            </>
          ) : (
            <>
              <span className="w-4" />
              <File className="w-4 h-4 text-zinc-500" />
            </>
          )}
          <span className="truncate">{node.name}</span>
        </button>
        {isFolder && node.children?.map(child => renderNode(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 border-r border-zinc-800">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Explorer</span>
      </div>
      <div className="flex-1 overflow-y-auto pt-2">
        {files.map(node => renderNode(node))}
      </div>
    </div>
  );
}
