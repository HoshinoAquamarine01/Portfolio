import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Certificates", href: "#certificates" },
  { name: "Projects", href: "#projects" },
  { name: "Dashboard", href: "#dashboard" },
  { name: "Contact", href: "#contact" },
];


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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dateTime, setDateTime] = useState(() => new Date());
  const [activeSection, setActiveSection] = useState("#hero");
  const menuRef = useRef(null);

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
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
          : "py-5",
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">My</span> Portfolio
          </span>
        </a>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className={cn(
                "group relative transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/60 rounded px-2 py-1",
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
          <div className="text-sm text-primary font-semibold ml-4 pl-4 border-l border-border/50">
            {dateTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
          <ThemeToggle className="p-2 bg-transparent border-none shadow-none backdrop-blur-none" />
        </div>

        <div className="flex items-center gap-2.5 md:hidden">
          <ThemeToggle className="p-2 bg-transparent border-none shadow-none backdrop-blur-none" />
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 text-foreground z-50"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div
          ref={menuRef}
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
          role="navigation"
          aria-hidden={!isMenuOpen}
        >
          <div className="flex flex-col space-y-8 items-center">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className={cn(
                  "transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/60 rounded px-2 py-1",
                  activeSection === item.href
                    ? "text-primary font-semibold"
                    : "text-foreground/80 hover:text-primary",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="text-sm text-primary font-semibold mt-4 pt-4 border-t border-border/50">
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
