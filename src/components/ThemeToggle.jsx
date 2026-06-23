import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ThemeToggle = ({ className }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      return true;
    } else {
      localStorage.setItem("theme", "light");
      return false;
    }
  });

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2.5 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer",
        "border border-border hover:border-primary/50",
        "bg-card/60 hover:bg-card/80 backdrop-blur-xs",
        "hover:shadow-lg hover:shadow-primary/20",
        "focus:outline-hidden focus:ring-2 focus:ring-primary",
        className
      )}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="h-4.5 w-4.5 text-yellow-400 transition-transform duration-300" />
      ) : (
        <Moon className="h-4.5 w-4.5 text-blue-600 transition-transform duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
