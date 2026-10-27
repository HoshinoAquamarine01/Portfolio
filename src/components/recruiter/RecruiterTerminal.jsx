import { useState, useRef, useEffect } from "react";

const INITIAL_HISTORY = [
  "BaoPham OS [Version 1.0.0]",
  "(c) Pham Gia Bao. All rights reserved.",
  "",
  "Type 'help' to see list of available commands.",
  "",
];

export const RecruiterTerminal = ({ onDownloadResume, onClose }) => {
  const [terminalHistory, setTerminalHistory] = useState(INITIAL_HISTORY);
  const [cmdInput, setCmdInput] = useState("");
  const terminalEndRef = useRef(null);
  const terminalInputRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    terminalInputRef.current?.focus();
  }, [terminalHistory]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cleanCmd = cmdInput.trim().toLowerCase();
    if (!cleanCmd) return;

    let response = [];
    switch (cleanCmd) {
      case "help":
        response = [
          "Available commands:",
          "  about      - Short introduction about me",
          "  skills     - My primary tech stack",
          "  projects   - Summary of highlighted projects",
          "  cv         - Download my resume/CV",
          "  clear      - Clear the screen",
          "  exit       - Exit recruiter mode",
        ];
        break;
      case "about":
        response = [
          "About Pham Gia Bao:",
          "  Role: Full-Stack Developer",
          "  Location: Ho Chi Minh City, Vietnam",
          "  Focus: Building clean, reliable APIs and responsive, accessible UIs.",
          "  Email: phamgiabao141105@gmail.com",
          "  Next Goal: Mastering NestJS and Next.js.",
        ];
        break;
      case "skills":
        response = [
          "Primary Technical Strengths:",
          "  [Frontend]  React, TypeScript, Redux, TailwindCSS, HTML5/CSS3",
          "  [Backend]   Node.js, Express.js, RESTful APIs, NestJS (Learning)",
          "  [Database]  SQL Server, MongoDB, Mongoose, TypeORM",
          "  [Tools]     Git, Vite, Webhooks, Postman",
        ];
        break;
      case "projects":
        response = [
          "Highlighted Projects:",
          "  1. AI Resume Analyzer CV Reviewer",
          "     AI career prep & ATS platform (React, Nest.js, TypeScript, MongoDB, Gemini)",
          "     Repo: https://github.com/HoshinoAquamarine01/AI-Resume-Analyzer-CV-Reviewer",
          "",
          "  2. Smart HR Candidate Screening System",
          "     Intelligent recruitment screening (React, Nest.js, TypeScript, MongoDB, Gemini, OCR)",
          "     Repo: https://github.com/HoshinoAquamarine01/Smart-HR-Candidate-Screening-System",
          "",
          "  3. Application Job Tracker",
          "     Kanban task-focused job application tracker (React, Express, JavaScript, Socket.IO)",
          "     Repo: https://github.com/HoshinoAquamarine01/Job-Application-Tracker",
        ];
        break;
      case "cv":
        response = ["Initiating CV download..."];
        if (onDownloadResume) {
          onDownloadResume();
        }
        response.push("Done. Check your browser downloads!");
        break;
      case "clear":
        setTerminalHistory([]);
        setCmdInput("");
        return;
      case "exit":
        if (onClose) {
          onClose();
        }
        setCmdInput("");
        return;
      default:
        response = [
          `bash: command not found: ${cmdInput}`,
          "Type 'help' to see a list of available commands.",
        ];
        break;
    }

    setTerminalHistory((prev) => [
      ...prev,
      `guest@baopham-portfolio:~$ ${cmdInput}`,
      ...response,
      "",
    ]);
    setCmdInput("");
  };

  return (
    <div
      onClick={() => terminalInputRef.current?.focus()}
      className="terminal-container rounded-xl p-5 text-left h-[320px] flex flex-col font-mono relative cursor-text select-text"
    >
      <div className="terminal-scanlines" />

      <div className="flex-1 overflow-y-auto pr-1 space-y-1 mb-2 scrollbar-thin text-xs sm:text-sm relative z-20">
        {terminalHistory.map((line, idx) => (
          <div
            key={idx}
            className="terminal-glow min-h-[1.2rem] whitespace-pre-wrap"
          >
            {line}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <form
        onSubmit={handleCommandSubmit}
        className="flex items-center gap-2 text-xs sm:text-sm shrink-0 border-t border-emerald-950/40 pt-2 relative z-20"
      >
        <span className="text-emerald-400 font-bold tracking-tight">
          guest@baopham-portfolio:~$
        </span>
        <input
          ref={terminalInputRef}
          type="text"
          value={cmdInput}
          onChange={(e) => setCmdInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-emerald-400 font-mono text-xs sm:text-sm caret-transparent focus:ring-0 p-0"
          aria-label="Terminal command input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <span className="terminal-cursor -ml-2 sm:-ml-3" />
      </form>
    </div>
  );
};

export default RecruiterTerminal;
