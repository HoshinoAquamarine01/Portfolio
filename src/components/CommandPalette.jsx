import { useState, useEffect, useRef } from "react";
import {
  Search,
  Command,
  FileText,
  Eye,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  UserCheck,
  ArrowRight,
  Code2,
  Sparkles,
} from "lucide-react";
import { useSound } from "@/contexts/SoundContext";
import { downloadResume } from "@/lib/resume";

const CommandPalette = ({ isOpen, onClose, onOpenResumeModal }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const { isMuted, toggleSound, playClick, playHover, playModalOpen } = useSound();

  useEffect(() => {
    if (isOpen) {
      playModalOpen();
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen, playModalOpen]);

  // Command items list
  const commands = [
    // Navigation
    {
      id: "nav-hero",
      group: "Navigation",
      title: "Jump to Hero Section",
      icon: Sparkles,
      action: () => {
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-about",
      group: "Navigation",
      title: "Jump to About Me",
      icon: Code2,
      action: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-skills",
      group: "Navigation",
      title: "Jump to Skills",
      icon: Code2,
      action: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-arch",
      group: "Navigation",
      title: "Jump to System Architecture",
      icon: Code2,
      action: () => {
        document.getElementById("architecture")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-projects",
      group: "Navigation",
      title: "Jump to Projects",
      icon: Code2,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-contact",
      group: "Navigation",
      title: "Jump to Contact Form",
      icon: Code2,
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      },
    },

    // Quick Actions
    {
      id: "act-preview-cv",
      group: "Quick Actions",
      title: "Preview Live Resume (Modal)",
      icon: Eye,
      action: () => {
        onOpenResumeModal();
      },
    },
    {
      id: "act-download-cv",
      group: "Quick Actions",
      title: "Download Resume PDF",
      icon: FileText,
      action: () => {
        downloadResume();
      },
    },
    {
      id: "act-recruiter",
      group: "Quick Actions",
      title: "Trigger 1-Min Recruiter Pitch",
      icon: UserCheck,
      action: () => {
        window.dispatchEvent(new CustomEvent("open-recruiter-mode"));
      },
    },

    // Settings
    {
      id: "set-theme",
      group: "Settings",
      title: "Toggle Theme (Light/Dark)",
      icon: document.documentElement.classList.contains("dark") ? Sun : Moon,
      action: () => {
        document.documentElement.classList.toggle("dark");
      },
    },
    {
      id: "set-sound",
      group: "Settings",
      title: `Toggle Sound FX (${isMuted ? "Unmute 🔊" : "Mute 🔇"})`,
      icon: isMuted ? VolumeX : Volume2,
      action: () => {
        toggleSound();
      },
    },
  ];

  // Filter commands by search query
  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.group.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation inside modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        playHover();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        playHover();
        setSelectedIndex((prev) =>
          prev === 0 ? filteredCommands.length - 1 : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          playClick();
          filteredCommands[selectedIndex].action();
          onClose();
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose, playClick, playHover]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-background border border-primary/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border/50 bg-secondary/20">
          <Search size={20} className="text-primary mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search section..."
            className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm font-medium"
          />
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-secondary text-muted-foreground text-[10px] font-mono border border-border/50 ml-2">
            <span>ESC</span>
          </div>
        </div>

        {/* Command List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const IconComp = cmd.icon;
              const isSelected = idx === selectedIndex;

              return (
                <button
                  key={cmd.id}
                  onMouseEnter={() => {
                    playHover();
                    setSelectedIndex(idx);
                  }}
                  onClick={() => {
                    playClick();
                    cmd.action();
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp
                      size={18}
                      className={isSelected ? "text-primary-foreground" : "text-primary"}
                    />
                    <span>{cmd.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        isSelected
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {cmd.group}
                    </span>
                    <ArrowRight
                      size={14}
                      className={`transition-transform ${
                        isSelected ? "translate-x-1 opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/40 border-t border-border/50 text-[11px] text-muted-foreground font-medium">
          <div className="flex items-center gap-2">
            <Command size={12} className="text-primary" />
            <span>Use ↑ ↓ arrows to navigate, Enter to select</span>
          </div>
          <span>Developer Portfolio</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;

