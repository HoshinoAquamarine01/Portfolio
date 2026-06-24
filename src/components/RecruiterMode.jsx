import { useEffect, useMemo, useState, useRef } from "react";
import {
  Briefcase,
  ChevronDown,
  Clipboard,
  Github,
  HelpCircle,
  Keyboard,
  Linkedin,
  Sparkles,
  UserRoundSearch,
  X,
  Terminal as TerminalIcon,
} from "lucide-react";
import toast from "react-hot-toast";

const recruiterActions = [
  {
    id: "projects",
    title: "Jump to Projects",
    description: "See production-style projects first",
    shortcut: "1",
    icon: Briefcase,
    action: () => {
      document
        .querySelector("#projects")
        ?.scrollIntoView({ behavior: "smooth" });
    },
  },
  {
    id: "skills",
    title: "Jump to Skills",
    description: "Review technical strengths quickly",
    shortcut: "2",
    icon: Sparkles,
    action: () => {
      document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" });
    },
  },
  {
    id: "contact",
    title: "Jump to Contact",
    description: "Start a conversation immediately",
    shortcut: "3",
    icon: UserRoundSearch,
    action: () => {
      document
        .querySelector("#contact")
        ?.scrollIntoView({ behavior: "smooth" });
    },
  },
];

const faqItems = [
  {
    question: "Are you available for new opportunities and when can you start?",
    answer: "Yes, I am actively seeking Full-Stack or Front-End Developer roles (Intern/Fresher/Junior). I can start immediately with a 0-day notice period.",
  },
  {
    question: "What is your preferred work arrangement and location?",
    answer: "I am based in Ho Chi Minh City, Vietnam and prefer On-site or Hybrid work arrangements to collaborate closely with the team. I am also open to Remote opportunities.",
  },
  {
    question: "What are your core technical strengths?",
    answer: "I specialize in building full-stack web applications with React, Node.js, Express, and MongoDB (MERN Stack). I have strong experience in TypeScript, SQL Server, design patterns, API security (RBAC/DAC), and Git workflow.",
  },
  {
    question: "What is your English proficiency level?",
    answer: "I have intermediate English proficiency. I am comfortable reading/writing technical documentation, writing clean code comments, and discussing technical concepts.",
  },
  {
    question: "What are your current learning and career focus areas?",
    answer: "I am currently focused on mastering NestJS for scalable backend architectures and Next.js for high-performance, SEO-friendly frontend development.",
  },
];

const RecruiterMode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("snapshot");
  const [expandedIndex, setExpandedIndex] = useState(null);
  
  // Terminal states
  const [terminalHistory, setTerminalHistory] = useState([
    "BaoPham OS [Version 1.0.0]",
    "(c) Pham Gia Bao. All rights reserved.",
    "",
    "Type 'help' to see list of available commands.",
    ""
  ]);
  const [cmdInput, setCmdInput] = useState("");
  const terminalEndRef = useRef(null);
  const terminalInputRef = useRef(null);

  const metrics = useMemo(
    () => [
      { label: "Highlighted Projects", value: "3" },
      { label: "Core Stack Areas", value: "5+" },
      { label: "Preferred Response Time", value: "<24h" },
    ],
    [],
  );

  // Auto scroll terminal history
  useEffect(() => {
    if (activeTab === "terminal") {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
      terminalInputRef.current?.focus();
    }
  }, [terminalHistory, activeTab]);

  useEffect(() => {
    const onKeydown = (event) => {
      const isPaletteShortcut =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      if (isPaletteShortcut) {
        event.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }

      // Hotkeys for jumps, only active when recruiter modal is open and on snapshot tab
      if (isOpen && activeTab === "snapshot" && document.activeElement?.tagName !== "INPUT") {
        const action = recruiterActions.find(
          (item) => item.shortcut === event.key,
        );
        if (action) {
          action.action();
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [isOpen, activeTab]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("phamgiabao141105@gmail.com");
      toast.success("Email copied. You can reach out anytime.");
    } catch {
      toast.error("Cannot copy email automatically on this browser.");
    }
  };

  const handleDownloadResume = () => {
    const cvUrl = import.meta.env.VITE_CV_URL;
    if (cvUrl) {
      window.open(cvUrl, "_blank", "noopener,noreferrer");
      toast.success("Opening resume in a new tab...");
    } else {
      toast.error("Resume link is currently unavailable.");
    }
  };

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
          "  exit       - Exit recruiter mode"
        ];
        break;
      case "about":
        response = [
          "About Pham Gia Bao:",
          "  Role: Full-Stack Developer",
          "  Location: Ho Chi Minh City, Vietnam",
          "  Focus: Building clean, reliable APIs and responsive, accessible UIs.",
          "  Email: phamgiabao141105@gmail.com",
          "  Next Goal: Mastering NestJS and Next.js."
        ];
        break;
      case "skills":
        response = [
          "Primary Technical Strengths:",
          "  [Frontend]  React, TypeScript, Redux, TailwindCSS, HTML5/CSS3",
          "  [Backend]   Node.js, Express.js, RESTful APIs, NestJS (Learning)",
          "  [Database]  SQL Server, MongoDB, Mongoose, TypeORM",
          "  [Tools]     Git, Vite, Webhooks, Postman"
        ];
        break;
      case "projects":
        response = [
          "Highlighted Projects:",
          "  1. Fresh-Fruit-Web",
          "     Fresh produce e-commerce app (React, Express, MongoDB, Tailwind)",
          "     Repo: https://github.com/vanhuy2005/fresh-fruit-web",
          "",
          "  2. Insurance-Management",
          "     Digital insurance lifecycle tracking (React, SQL Server, TypeScript, VietQR/SePay)",
          "     Repo: https://github.com/HoshinoAquamarine01/Insurance-Managemnt",
          "",
          "  3. Application Job Tracker",
          "     Kanban task-focused job application tracker (React, Express, TypeScript, Socket.IO)",
          "     Repo: https://github.com/HoshinoAquamarine01/Job-Application-Tracker"
        ];
        break;
      case "cv":
        response = ["Initiating CV download..."];
        handleDownloadResume();
        response.push("Done. Check your browser downloads!");
        break;
      case "clear":
        setTerminalHistory([]);
        setCmdInput("");
        return;
      case "exit":
        setIsOpen(false);
        setCmdInput("");
        return;
      default:
        response = [
          `bash: command not found: ${cmdInput}`,
          "Type 'help' to see a list of available commands."
        ];
        break;
    }

    setTerminalHistory((prev) => [
      ...prev,
      `guest@baopham-portfolio:~$ ${cmdInput}`,
      ...response,
      ""
    ]);
    setCmdInput("");
  };

  const toggleFaq = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 left-5 z-50 hidden items-center gap-2 rounded-full border border-primary/40 bg-card/70 hover:bg-card/90 px-4 py-2 text-sm font-medium text-foreground shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/70 hover:shadow-primary/30 md:inline-flex"
        aria-label="Open recruiter mode"
      >
        <Keyboard className="h-4 w-4 text-primary" />
        Recruiter Mode
        <span className="rounded-full border border-border/80 px-2 py-0.5 text-xs text-muted-foreground bg-background/50">
          Ctrl+K
        </span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Recruiter mode"
        >
          <div className="relative w-full max-w-3xl rounded-2xl border border-border/70 bg-background/98 p-6 shadow-2xl backdrop-blur-lg sm:p-8 flex flex-col max-h-[90vh]">
            <div className="mb-4 text-center shrink-0">
              <div className="mb-3 flex justify-center">
                <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Recruiter Quick Review
                </p>
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                {activeTab === "snapshot"
                  ? "Professional Snapshot"
                  : activeTab === "faq"
                  ? "Recruiter FAQ"
                  : "Interactive CLI Terminal"}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {activeTab === "snapshot"
                  ? "Fast path for hiring teams. Use Ctrl+K to open, 1/2/3 for quick jumps."
                  : activeTab === "faq"
                  ? "Quick answers to common screening questions for faster evaluation."
                  : "Simulated CLI environment. Type 'help' to discover commands."}
              </p>

              <button
                type="button"
                className="absolute top-6 right-6 rounded-full border border-border/80 p-2 text-muted-foreground transition-all hover:text-foreground hover:bg-card/50 cursor-pointer"
                onClick={() => setIsOpen(false)}
                aria-label="Close recruiter mode"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Tab Switched Header */}
            <div className="flex justify-center mb-6 shrink-0">
              <div className="inline-flex rounded-full bg-secondary/50 p-1 border border-border/50">
                <button
                  type="button"
                  onClick={() => setActiveTab("snapshot")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeTab === "snapshot"
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Snapshot
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("faq")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeTab === "faq"
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Recruiter FAQ
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("terminal")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeTab === "terminal"
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Terminal CLI
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto mb-6 pr-2 scrollbar-thin">
              {activeTab === "faq" && (
                <div className="space-y-3 text-left">
                  {faqItems.map((item, idx) => {
                    const isExpanded = expandedIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-border/70 bg-card/45 hover:bg-card/75 transition-all duration-300"
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(idx)}
                          className="w-full px-5 py-3.5 flex items-center justify-between text-left font-medium text-foreground gap-4 focus:outline-none cursor-pointer"
                          aria-expanded={isExpanded}
                        >
                          <span className="flex items-center gap-3 text-sm sm:text-base font-semibold">
                            <HelpCircle className="h-4.5 w-4.5 text-primary shrink-0" />
                            {item.question}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 ${
                              isExpanded ? "rotate-180 text-primary" : ""
                            }`}
                          />
                        </button>

                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="min-h-0 px-5 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed">
                              {item.answer}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === "snapshot" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {metrics.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-border/70 bg-card/50 hover:bg-card/80 p-4 text-left transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                      >
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="mt-2 text-2xl font-bold bg-linear-to-r from-foreground to-primary bg-clip-text text-transparent">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {recruiterActions.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className="rounded-xl border border-border/70 bg-card/50 hover:bg-card/80 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
                          onClick={() => {
                            item.action();
                            setIsOpen(false);
                          }}
                        >
                          <div className="mb-3 flex items-center justify-between">
                            <Icon className="h-5 w-5 text-primary" />
                            <span className="rounded-full border border-border/80 px-2 py-0.5 text-xs text-muted-foreground bg-background/50 font-semibold">
                              {item.shortcut}
                            </span>
                          </div>
                          <p className="font-semibold text-foreground">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "terminal" && (
                <div
                  onClick={() => terminalInputRef.current?.focus()}
                  className="terminal-container rounded-xl p-5 text-left h-[320px] flex flex-col font-mono relative cursor-text select-text"
                >
                  <div className="terminal-scanlines" />
                  
                  {/* Console Lines History */}
                  <div className="flex-1 overflow-y-auto pr-1 space-y-1 mb-2 scrollbar-thin text-xs sm:text-sm relative z-20">
                    {terminalHistory.map((line, idx) => (
                      <div key={idx} className="terminal-glow min-h-[1.2rem] whitespace-pre-wrap">
                        {line}
                      </div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>

                  {/* CLI Command Input */}
                  <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 text-xs sm:text-sm shrink-0 border-t border-emerald-950/40 pt-2 relative z-20">
                    <span className="text-emerald-400 font-bold tracking-tight">guest@baopham-portfolio:~$</span>
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
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/30 shrink-0">
              <button
                type="button"
                onClick={copyEmail}
                className="cosmic-button inline-flex items-center gap-2 cursor-pointer"
              >
                <Clipboard className="h-4 w-4" />
                Copy Email
              </button>
              <button
                type="button"
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-2 rounded-full border border-border/80 px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary cursor-pointer bg-card/40"
              >
                Download Resume
              </button>
              <a
                href="https://github.com/HoshinoAquamarine01"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary cursor-pointer"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/baogia2005/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary cursor-pointer"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecruiterMode;
