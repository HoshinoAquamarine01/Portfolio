import { useEffect, useState } from "react";
import {
  Clipboard,
  Github,
  Keyboard,
  Linkedin,
  Cpu,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { downloadResume } from "@/lib/resume";
import {
  recruiterActions,
  recruiterMetrics,
} from "@/data/recruiterData";
import { RecruiterTerminal } from "./recruiter/RecruiterTerminal";
import { RecruiterFaq } from "./recruiter/RecruiterFaq";

const RecruiterMode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("snapshot");

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

      if (
        isOpen &&
        activeTab === "snapshot" &&
        document.activeElement?.tagName !== "INPUT"
      ) {
        const action = recruiterActions.find(
          (item) => item.shortcut === event.key
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

  const handleDownloadResume = async () => {
    const toastId = toast.loading("Downloading resume...");
    try {
      await downloadResume();
      toast.success("Resume downloaded immediately!", { id: toastId });
    } catch {
      toast.error("Could not download resume directly.", { id: toastId });
    }
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
                  <Cpu className="h-3.5 w-3.5" />
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

            <div className="flex-1 overflow-y-auto mb-6 pr-2 scrollbar-thin">
              {activeTab === "faq" && <RecruiterFaq />}

              {activeTab === "snapshot" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {recruiterMetrics.map((item) => (
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
                <RecruiterTerminal
                  onDownloadResume={handleDownloadResume}
                  onClose={() => setIsOpen(false)}
                />
              )}
            </div>

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
