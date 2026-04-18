import { GoogleGenAI, Type } from "@google/genai";
import { FileNode } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const GENERATION_PROMPT = `
You are an expert full-stack web developer. Your task is to generate a complete website based on the user's vision.
The website should use modern design principles (clean layout, great typography, attractive images, and inspiring quotes).

Return a JSON object with the following structure:
{
  "name": "Project Name",
  "files": [
    {
      "name": "index.html",
      "content": "...",
      "language": "html"
    },
    {
      "name": "style.css",
      "content": "...",
      "language": "css"
    },
    {
      "name": "script.js",
      "content": "...",
      "language": "javascript"
    }
  ]
}

Rules:
1. Use Tailwind CSS via CDN in the HTML.
2. Include at least 3 sections: Hero, Features/Services, and Quotes/Testimonials.
3. Use high-quality placeholder images from Unsplash (via https://images.unsplash.com/...) or Picsum.
4. Add inspiring and relevant quotes.
5. Make it fully responsive.
6. The content should be rich and descriptive, not just "Coming soon".

User Vision:
`;

export async function generateWebsite(vision: string): Promise<{ name: string; files: FileNode[] }> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: GENERATION_PROMPT + vision,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            files: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  content: { type: Type.STRING },
                  language: { type: Type.STRING }
                },
                required: ["name", "content", "language"]
              }
            }
          },
          required: ["name", "files"]
        }
      }
    });

    const result = JSON.parse(response.text);
    
    // Map to FileNode structure
    const files: FileNode[] = result.files.map((f: any, index: number) => ({
      id: `file-${index}`,
      name: f.name,
      type: 'file',
      content: f.content,
      language: f.language
    }));

    return {
      name: result.name,
      files
    };
  } catch (error) {
    console.error("Failed to generate website:", error);
    throw error;
  }
}
