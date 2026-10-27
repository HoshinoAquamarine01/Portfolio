import { useState, useEffect } from "react";
import { X, ShieldCheck, Cpu } from "lucide-react";
import { AiResumeArchitecture } from "./architectures/AiResumeArchitecture";
import { SmartHrArchitecture } from "./architectures/SmartHrArchitecture";
import { JobTrackerArchitecture } from "./architectures/JobTrackerArchitecture";
import { DefaultArchitecture } from "./architectures/DefaultArchitecture";

const ProjectModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const isAiResume =
    project.title?.toLowerCase().includes("resume") ||
    project.title?.toLowerCase().includes("ai resume");

  const isSmartHr =
    project.title?.toLowerCase().includes("smart hr") ||
    project.title?.toLowerCase().includes("screening");

  const isJobTracker =
    project.title?.toLowerCase().includes("tracker") ||
    project.title?.toLowerCase().includes("job application");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-5xl rounded-2xl border border-border/80 bg-background/98 p-6 shadow-2xl backdrop-blur-lg flex flex-col max-h-[90vh] overflow-hidden text-left">
        <div className="flex items-center justify-between pb-4 border-b border-border/40 shrink-0">
          <div>
            <h3
              id="modal-title"
              className="text-2xl font-bold text-foreground bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
            >
              {project.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">Timeline: {project.timeline}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border/80 p-2 text-muted-foreground transition-all hover:text-foreground hover:bg-card/50 cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex border-b border-border/30 shrink-0 mt-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 border-b-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "overview"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("architecture")}
            className={`px-4 py-2 border-b-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
              activeTab === "architecture"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Architecture
            {(isAiResume || isSmartHr || isJobTracker) && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-primary/15 text-primary border border-primary/20">
                Detailed Flow
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`px-4 py-2 border-b-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "code"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Code Preview
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 pr-2 scrollbar-thin">
          {activeTab === "overview" && (
            <div className="space-y-6 animate-scale-in">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Description</h4>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 rounded-xl border border-border/50 bg-card/40 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-400"></div>
                  <h5 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Cpu className="h-4.5 w-4.5 text-red-400" />
                    Technical Challenges
                  </h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.challenges ||
                      "Updating technical challenges and complex business logic details..."}
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-border/50 bg-card/40 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-400"></div>
                  <h5 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <ShieldCheck className="h-4.5 w-4.5 text-green-400" />
                    Solutions & Architecture
                  </h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.solutions ||
                      "Updating architectural solutions and performance optimization details..."}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs font-semibold border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "architecture" && (
            <div className="space-y-6 animate-scale-in">
              {isAiResume ? (
                <AiResumeArchitecture />
              ) : isSmartHr ? (
                <SmartHrArchitecture />
              ) : isJobTracker ? (
                <JobTrackerArchitecture />
              ) : (
                <DefaultArchitecture project={project} />
              )}
            </div>
          )}

          {activeTab === "code" && (
            <div className="space-y-4 animate-scale-in">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-foreground">Source Code Highlight</h4>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-primary/15 border border-primary/30 text-primary">
                  {project.tags.includes("TypeScript") ? "TypeScript" : "JavaScript"}
                </span>
              </div>

              <div className="relative rounded-xl border border-border/80 bg-zinc-950/95 p-4 text-xs font-mono text-zinc-300 overflow-x-auto shadow-inner leading-relaxed select-all">
                <pre>{project.codeSnippet || "// No code snippet available for this project."}</pre>
              </div>
              <p className="text-xs text-muted-foreground">
                * The code snippet above represents the core processing logic or key feature
                implemented in the project codebase.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border/40 shrink-0">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border/80 bg-card/60 px-5 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary cursor-pointer"
          >
            GitHub Repo
          </a>
          <button onClick={onClose} className="cosmic-button text-sm cursor-pointer">
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
