import { useState } from "react";
import { cn } from "@/lib/utils";
import SkillCard from "./SkillCard";
const skills = [
  {
    name: "JavaScript",
    level: 95,
    category: "frontend",
  },
  {
    name: "React",
    level: 80,
    category: "frontend",
  },
  {
    name: "Node.js",
    level: 85,
    category: "backend",
  },
  {
    name: "TailwindCSS",
    level: 80,
    category: "frontend",
  },
  {
    name: "MongoDB",
    level: 75,
    category: "database",
  },
  {
    name: "Git",
    level: 80,
    category: "tools",
  },
  {
    name: "HTML & CSS",
    level: 90,
    category: "frontend",
  },
  {
    name: "TypeScript",
    level: 70,
    category: "frontend",
  },
  {
    name: "Docker",
    level: 70,
    category: "tools",
  },
  {
    name: "Figma",
    level: 60,
    category: "tools",
  },
  {
    name: "Jira",
    level: 70,
    category: "tools",
  },
  {
    name: "SQL server",
    level: 85,
    category: "database",
  },
  {
    name: "Communication",
    category: "soft",
  },
  {
    name: "Teamwork",
    category: "soft",
  },
  {
    name: "Problem Solving",

    category: "soft",
  },
  {
    name: "Time Management",

    category: "soft",
  },
  {
    name: "Critical Thinking",

    category: "soft",
  },
  {
    name: "Adaptability",

    category: "soft",
  },
];
const categories = ["all", "frontend", "backend", "tools", "database", "soft"];

const SkillSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory,
  );
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={cn(
                "px-3.5 py-1.5 sm:px-5 sm:py-2 text-sm sm:text-base rounded-full transition-all duration-300 capitalize focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/60",
                activeCategory === category
                  ? "bg-primary text-primary-foreground hover:shadow-[0_0_15px_rgba(167,139,250,0.4)] hover:scale-105"
                  : "bg-secondary/70 text-foreground hover:bg-secondary hover:shadow-sm hover:scale-[1.02]",
              )}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              aria-label={`Filter skills by ${category} category`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <SkillCard key={key} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
