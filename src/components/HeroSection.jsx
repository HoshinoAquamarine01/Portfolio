import { ArrowDown, FileText } from "lucide-react";
import { useState } from "react";
import profileImg from "../assets/chandung.png";
import { useSound } from "@/contexts/SoundContext";

const techStack = [
  "React 19",
  "Node.js",
  "MongoDB",
  "TailwindCSS v4",
  "Express.js",
  "System Design",
];

const PROFILE_IMAGE_SRC = profileImg;

const HeroSection = ({ onOpenResumeModal }) => {
  const [showProfileImage, setShowProfileImage] = useState(true);
  const { playClick, playHover } = useSound();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 pt-28 pb-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_28%)]" />

      <div className="container relative z-10 mx-auto max-w-5xl text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-7">
          <div className="opacity-0 animate-fade-in relative h-36 w-36 overflow-hidden rounded-full border-2 border-primary/50 bg-card/70 p-1 shadow-lg shadow-primary/20 sm:h-40 sm:w-40">
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-primary/20 via-card to-primary/10">
              {showProfileImage ? (
                <img
                  src={PROFILE_IMAGE_SRC}
                  alt="Portrait"
                  className="h-full w-full object-cover"
                  onError={() => setShowProfileImage(false)}
                />
              ) : (
                <span className="text-lg font-semibold tracking-wide text-foreground/80">
                  Pham Gia Bao
                </span>
              )}
            </div>
          </div>

          <div className="opacity-0 animate-fade-in inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-primary backdrop-blur-sm shadow-xs">
            Full Stack Engineer & Solution Architect
          </div>

          <div className="space-y-4">
            <h1 className="opacity-0 animate-fade-in text-4xl font-bold leading-[1.02] tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block text-foreground/90">Hello, I&apos;m</span>
              <span className="block bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Pham Gia Bao
              </span>
            </h1>

            <p className="opacity-0 animate-fade-in-delay-2 mx-auto max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg md:text-xl">
              Building scalable, high-performance web applications with clean code & modern architecture.
            </p>
          </div>

          <div className="opacity-0 animate-fade-in-delay-3 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            {techStack.map((tech, idx) => (
              <span
                key={tech}
                onMouseEnter={() => playHover()}
                style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
                className="opacity-0 animate-fade-in rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-xs sm:text-sm sm:px-4 sm:py-2 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-primary hover:bg-card/80 hover:shadow-[0_0_15px_rgba(167,139,250,0.4)] hover:-translate-y-1 cursor-pointer hover:scale-[1.05]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="opacity-0 animate-fade-in-delay-4 flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#projects"
              onClick={() => playClick()}
              className="btn-primary"
            >
              Explore Work
            </a>

            <button
              onClick={() => {
                playClick();
                onOpenResumeModal();
              }}
              className="flex items-center gap-2 rounded-full border border-primary/50 bg-secondary/80 px-6 py-2.5 font-semibold text-foreground transition-all duration-300 hover:border-primary hover:bg-secondary hover:shadow-[0_0_15px_rgba(167,139,250,0.4)] hover:scale-[1.05] cursor-pointer"
            >
              <FileText size={18} className="text-primary" />
              <span>View Live CV</span>
            </button>

            <a
              href="#contact"
              onClick={() => playClick()}
              className="rounded-full border border-border/80 bg-card/60 px-6 py-2.5 font-medium text-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_15px_rgba(167,139,250,0.4)] hover:scale-[1.05]"
            >
              Get In Touch
            </a>
          </div>

          <a
            href="#about"
            onClick={() => playClick()}
            aria-label="Scroll to About section"
            className="mt-10 flex flex-col items-center gap-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            <span className="rounded-full border border-border/80 bg-card/70 px-4 py-2 text-sm font-medium tracking-wide text-muted-foreground shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_15px_rgba(167,139,250,0.4)] hover:scale-[1.05]">
              Scroll Down
            </span>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-card/70 text-primary shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_15px_rgba(167,139,250,0.4)] hover:scale-[1.05]">
              <ArrowDown className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


