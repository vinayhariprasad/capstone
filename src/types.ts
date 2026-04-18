export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  language?: string;
}

export interface WebsiteProject {
  id: string;
  name: string;
  description: string;
  files: FileNode[];
  createdAt: number;
}

export type AppState = 'landing' | 'generating' | 'workspace';

export interface GenerationProgress {
  step: string;
  percentage: number;
}
