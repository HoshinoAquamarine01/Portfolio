import { Search, X } from "lucide-react";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import AiResume from "../assets/ai-resume.png";
import SmartHR from "../assets/Smart-HR.png";
import appTrackerImg from "../assets/app-tracker.png";

const projects = [
  {
    id: 1,
    title: "AI Resume Analyzer CV Reviewer",
    timeline: "05/2026 - 10/2026",
    description:
      `An AI-powered career preparation platform designed to 
      evaluate resumes, score ATS compatibility, and deliver 
      actionable improvement suggestions. Features 
      automated multi-format document parsing (PDF/DOCX), 
      context-aware cover letter generation, customized mock interview coaching, 
      real-time WebSocket progress alerts, and an administrative analytics dashboard.`,
    image: AiResume,
    tags: ["React", "Nest.js", "MongoDB", "TailwindCSS", "TypeScript", "AI integration", "Vite", "Redis"],
    demoUrl: "https://ai-resume-analyzer-cv-reviewer.vercel.app/",
    githubUrl: "https://github.com/HoshinoAquamarine01/AI-Resume-Analyzer-CV-Reviewer",
    challenges: `Handling high-concurrency LLM rate limits (HTTP 429/503), 
    unpredictable JSON formatting from LLM outputs, 
    and extracting uncorrupted text across varied resume layouts 
    (multi-column PDFs and Word DOCX files).`,
    solutions: `Architected an automated model fallback 
    chain (Gemini 3.7 -> 3.6 -> 3.5 Flash) with 
    exponential backoff retries, enforced response MIME types 
    (application/json), and built a robust parsing pipeline combining 
    pdf-parse and mammoth with regex sanitization.`,
    codeSnippet: `// Robust AI Inference with cascading model fallback & exponential backoff
private async callGemini(prompt: string): Promise<string> {
  const client = this.getClient();
  const primary = this.getModelName();
  const fallbacks = ["gemini-3.7-flash", "gemini-3.6-flash", "gemini-3.5-flash", "gemini-flash-latest"];
  const models = [primary, ...fallbacks.filter((m) => m !== primary)];
  let lastErr: any;
  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await client.models.generateContent({
          model,
          contents: prompt,
          config: { responseMimeType: "application/json" },
        });
        if (!response?.text) throw new Error("Empty response returned from Gemini API");
        return response.text;
      } catch (err: any) {
        lastErr = err;
        const msg = String(err?.message || err);
        const retryable = /\\b(503|429|500)\\b|UNAVAILABLE|RESOURCE_EXHAUSTED/i.test(msg);
        if (/\\b404\\b|NOT_FOUND/i.test(msg)) break; // Skip to next fallback model
        if (!retryable) throw new BadRequestException(\`Gemini API Error: \${msg}\`);
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1))); // Backoff retry
      }
    }
  }
  throw new BadRequestException(\`Gemini API Error: \${lastErr?.message || "Failed to generate AI response"}\`);
}`
  },
  {
    id: 2,
    title: "Smart HR Candidate Screening System",
    timeline: "09/2026 - Current",
    description:
      `An AI-powered recruitment intelligence and candidate 
      screening platform built to automate hiring workflows. 
      The system leverages multi-strategy document parsers (PDF, DOCX, OCR) 
      and LLMs (Google Gemini 2.0 Flash / OpenAI) 
      to extract structured candidate profiles, 
      compute multi-dimensional JD-fit scores (technical skill, seniority, domain relevance), 
      and dynamically generate tailored interview questions and assessment tests.`,
    image: SmartHR,
    tags: [
      "React",
      "Nest.js",
      "TypeScript",
      "MongoDB",
      "AI Integration",
      "Google Gemini",
      "TailwindCSS",
      "Vite",
      "Redis",
      "OCR"
    ],
    demoUrl: null,
    githubUrl: "https://github.com/HoshinoAquamarine01/Smart-HR-Candidate-Screening-System",
    challenges: `Extracting structured data accurately from diverse, 
    unstructured CV formats (multi-column PDFs, legacy DOCX, scanned image CVs) 
    without hallucination or schema drift, while managing LLM provider rate limits, 
    token overhead, and inference latency during bulk candidate screening.`,
    solutions: `Engineered a multi-strategy extraction pipeline 
    (PdfExtract, DocxExtract, Tesseract OCR) with regex text 
    sanitization to reduce prompt token footprint. 
    Implemented a resilient multi-provider AI fallback architecture 
    (Gemini 2.0 Flash primary with OpenAI GPT-4o-mini fallback) 
    using strict JSON Schema enforcement and Redis caching for deterministic scoring.`,
    codeSnippet:  `import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { CV_EXTRACTION_GEMINI_SCHEMA } from '../schemas/cv-extraction.schema';
import { CV_SYSTEM_PROMPT } from '../prompts/cv-extraction.prompt';
import { StandardCvProfile } from '../interfaces/standard-cv.interface';

@Injectable()
export class GeminiCvExtractor {
  private client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  private readonly modelName = 'gemini-2.0-flash';

  async extractCvStructuredData(cleanedText: string): Promise<StandardCvProfile> {
    const prompt = \`\${CV_SYSTEM_PROMPT}\\n\\n--- RAW CV CONTENT ---\\n\${cleanedText}\`;
    // Enforce strict JSON Schema output to eliminate LLM hallucinations
    const response = await this.client.models.generateContent({
      model: this.modelName,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: CV_EXTRACTION_GEMINI_SCHEMA,
        temperature: 0.1,
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    return parsedData as StandardCvProfile;
  }
}`
  },

  {
    id: 3,
    title: "Application Job Tracker",
    timeline: "02/2026 - 10/2026",
    description:
      "An ongoing job application tracking system that helps users organize opportunities and stay on top of every application stage. It provides structured status pipelines, deadline reminders, and task-focused workflows to manage follow-ups, interviews, and priorities in one place, making the job search process more transparent, consistent, and easier to maintain over time.",
    image: appTrackerImg,
    tags: [
      "React",
      "Node.js",
      "MongoDB",
      "TailwindCSS",
      "Express.js",
      "JavaScript",
      "Vite",
      "Socket.IO",
    ],
    demoUrl: "https://apptracker.io.vn/",
    githubUrl: "https://github.com/HoshinoAquamarine01/Job-Application-Tracker",
    challenges: "Real-time synchronization of job application Kanban card positions across multiple devices or browser tabs to prevent drag-and-drop state conflicts and data desynchronization.",
    solutions: "Architected a WebSocket synchronization layer using Socket.IO. UI states update optimistically while real-time events broadcast changes to parallel sessions, asynchronously persisting updates to MongoDB.",
    codeSnippet: `// Real-time Kanban synchronization handler with Socket.IO & MongoDB
export const registerKanbanHandlers = (io, socket) => {
  socket.on('join-workspace', (workspaceId) => {
    socket.join(workspaceId);
    console.log(\`Socket \${socket.id} joined workspace \${workspaceId}\`);
  });

  socket.on('card-moved', async (data) => {
    const { cardId, sourceCol, destCol, index, workspaceId } = data;
    
    // Broadcast state transition to parallel sessions with zero latency
    socket.to(workspaceId).emit('card-moved-sync', {
      cardId,
      sourceCol,
      destCol,
      index
    });

    try {
      // Asynchronously persist position index and column status in MongoDB
      await JobCard.findByIdAndUpdate(cardId, {
        column: destCol,
        positionIndex: index,
        updatedAt: new Date()
      });
    } catch (err) {
      console.error('Failed to save Kanban move operation to DB:', err);
    }
  });
};`
  },
];

const ProjectSection = () => {
  const [imageErrors, setImageErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const handleImageError = (projectId) => {
    setImageErrors((prev) => ({
      ...prev,
      [projectId]: true,
    }));
  };

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured<span className="text-primary"> Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Here are some of my recent projects, including both completed and
          ongoing work. Click "View Details" to see system architecture and key code blocks.
        </p>

        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects by name, tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-full border border-border/80 bg-card/60 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found matching "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                imageErrors={imageErrors}
                handleImageError={handleImageError}
                onViewDetails={setSelectedProject}
              />
            ))}
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default ProjectSection;
