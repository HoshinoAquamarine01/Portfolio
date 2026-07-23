import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Command, Volume2, VolumeX } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useSound } from "@/contexts/SoundContext";

const getActiveSectionId = (sections) => {
  for (const section of sections) {
    const element = document.querySelector(section);
    if (element) {
      const { top, bottom } = element.getBoundingClientRect();
      if (top <= 100 && bottom >= 100) return section;
    }
  }
  return null;
};

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Architecture", href: "#architecture" },
  { name: "Certificates", href: "#certificates" },
  { name: "Projects", href: "#projects" },
  { name: "Dashboard", href: "#dashboard" },
  { name: "Contact", href: "#contact" },
];

const Navbar = ({ onOpenCmdPalette }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dateTime, setDateTime] = useState(() => new Date());
  const [activeSection, setActiveSection] = useState("#hero");
  const menuRef = useRef(null);

  const { isMuted, toggleSound, playClick } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      const sections = navItems.map((item) => item.href);
      const active = getActiveSectionId(sections);
      if (active) setActiveSection(active);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs border-b border-border/40"
          : "py-5",
      )}
    >
      <div className="container flex items-center justify-between px-4 mx-auto">
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#"
          onClick={() => playClick()}
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">My</span> Portfolio
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              onClick={() => playClick()}
              className={cn(
                "group relative transition-all duration-300 text-sm font-medium focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/60 rounded px-2 py-1",
                activeSection === item.href
                  ? "text-primary font-semibold"
                  : "text-foreground/80 hover:text-primary",
              )}
            >
              {item.name}
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-primary/70 transition-all duration-300",
                  activeSection === item.href
                    ? "w-full"
                    : "w-0 group-hover:w-full",
                )}
              />
            </a>
          ))}
        </div>

        {/* Desktop Controls & Widgets */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              playClick();
              onOpenCmdPalette();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/60 hover:bg-secondary border border-border/50 text-xs text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            title="Command Palette (Ctrl + K)"
          >
            <Command size={14} className="text-primary" />
            <span className="font-semibold text-[11px]">Ctrl K</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              toggleSound();
            }}
            className="p-2 rounded-xl bg-secondary/60 hover:bg-secondary border border-border/50 text-foreground transition-all cursor-pointer"
            title={isMuted ? "Unmute Sound FX" : "Mute Sound FX"}
          >
            {isMuted ? (
              <VolumeX size={16} className="text-muted-foreground" />
            ) : (
              <Volume2 size={16} className="text-primary" />
            )}
          </button>

          <ThemeToggle className="p-2 bg-transparent border-none shadow-none backdrop-blur-none" />

          {/* Live Clock */}
          <div className="text-xs text-primary font-mono font-semibold pl-3 border-l border-border/50">
            {dateTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => {
              playClick();
              onOpenCmdPalette();
            }}
            className="p-2 text-primary rounded-lg bg-secondary/60"
          >
            <Command size={18} />
          </button>

          <ThemeToggle className="p-2 bg-transparent border-none shadow-none backdrop-blur-none" />

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 text-foreground z-50"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu overlay */}
        <div
          ref={menuRef}
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 lg:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
          role="navigation"
          aria-hidden={!isMenuOpen}
        >
          <div className="flex flex-col space-y-6 items-center">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className={cn(
                  "transition-all duration-300 text-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/60 rounded px-3 py-1",
                  activeSection === item.href
                    ? "text-primary font-bold"
                    : "text-foreground/80 hover:text-primary",
                )}
                onClick={() => {
                  playClick();
                  setIsMenuOpen(false);
                }}
              >
                {item.name}
              </a>
            ))}
            <div className="text-sm text-primary font-mono font-semibold mt-4 pt-4 border-t border-border/50">
              {dateTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


