import React from 'react';
import { FileNode } from '../../types';

interface PreviewProps {
  files: FileNode[];
}

export default function Preview({ files }: PreviewProps) {
  const [srcDoc, setSrcDoc] = React.useState('');

  React.useEffect(() => {
    const htmlFile = files.find(f => f.name.endsWith('.html'));
    const cssFile = files.find(f => f.name.endsWith('.css'));
    const jsFile = files.find(f => f.name.endsWith('.js'));

    if (htmlFile) {
      const doc = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://cdn.tailwindcss.com"></script>
            <style>${cssFile?.content || ''}</style>
          </head>
          <body>
            ${htmlFile.content || ''}
            <script>${jsFile?.content || ''}</script>
          </body>
        </html>
      `;
      setSrcDoc(doc);
    }
  }, [files]);

  return (
    <div className="flex-1 bg-white flex flex-col h-full overflow-hidden">
      <div className="p-2 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 bg-white border border-zinc-200 rounded text-xs text-zinc-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Preview Live
        </div>
      </div>
      <iframe
        title="preview"
        srcDoc={srcDoc}
        className="flex-1 w-full border-none bg-white min-h-0"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
