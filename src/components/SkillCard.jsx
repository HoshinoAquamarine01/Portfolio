import { useLanguage } from "@/contexts/LanguageContext";
import useScrollReveal from "@/hooks/useScrollReveal";
import { TechIcon } from "./TechIcons";
import { Star, CheckCircle2 } from "lucide-react";

const SkillCard = ({ skill, viewMode = "card" }) => {
  const [ref, isVisible] = useScrollReveal();
  const { lang } = useLanguage();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const isSoft = skill.category === "soft";
  const desc = lang === "vi" ? skill.desc_vi : skill.desc_en;

  // Level badge helper
  const getLevelColor = (level) => {
    if (level >= 90) return "bg-emerald-500/10 text-emerald-500 border-emerald-500/30";
    if (level >= 80) return "bg-primary/10 text-primary border-primary/30";
    return "bg-sky-500/10 text-sky-500 border-sky-500/30";
  };

  if (viewMode === "compact") {
    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        className="group glow-card bg-card/80 backdrop-blur-sm p-4 rounded-xl border border-border/80 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-between gap-3 shadow-xs"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease-out, transform 0.3s ease",
        }}
      >
        <div className="glow-border" />
        <div className="glow-bg" />

        <div className="relative z-10 flex items-center gap-3 min-w-0">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
            style={{
              backgroundColor: `${skill.color}15`,
              border: `1px solid ${skill.color}30`,
            }}
          >
            <TechIcon name={skill.id || skill.name} className="w-5 h-5" color={skill.color} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                {skill.name}
              </h4>
              {skill.isCore && (
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
              )}
            </div>
            <span className="text-xs text-muted-foreground capitalize block truncate">
              {skill.tags ? skill.tags.slice(0, 2).join(" • ") : skill.category}
            </span>
          </div>
        </div>

        {!isSoft && (
          <div className="relative z-10 shrink-0 text-right">
            <span className="text-xs font-mono font-semibold text-foreground/90 bg-secondary/80 px-2 py-1 rounded-md border border-border/60">
              {skill.level}%
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="group glow-card bg-card/90 backdrop-blur-md p-6 rounded-2xl border border-border/80 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.6s ease-out, transform 0.3s ease, border-color 0.3s ease, shadow 0.3s ease",
      }}
    >
      {/* Ambient Glow Overlays */}
      <div className="glow-border" />
      <div className="glow-bg" />

      <div className="relative z-10">
        {/* Top Bar: Icon + Title + Core Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm"
              style={{
                backgroundColor: `${skill.color}1A`,
                border: `1px solid ${skill.color}40`,
                boxShadow: `0 0 15px ${skill.color}20`,
              }}
            >
              <TechIcon name={skill.id || skill.name} className="w-6 h-6" color={skill.color} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </h3>
              </div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {skill.category}
              </span>
            </div>
          </div>

          {skill.isCore ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              Core
            </span>
          ) : !isSoft && skill.levelLabel ? (
            <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border shrink-0 ${getLevelColor(skill.level)}`}>
              {skill.levelLabel}
            </span>
          ) : null}
        </div>

        {/* Short Description */}
        {desc && (
          <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed mb-5 line-clamp-2">
            {desc}
          </p>
        )}

        {/* Technical Sub-tags / Concepts */}
        {skill.tags && skill.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {skill.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-secondary/70 text-foreground/80 border border-border/40 transition-colors group-hover:border-primary/30"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section: Progress Bar or Soft Skill Indicator */}
      <div className="relative z-10 mt-auto pt-2 border-t border-border/40">
        {!isSoft ? (
          <div>
            <div className="flex items-center justify-between text-xs font-medium mb-1.5">
              <span className="text-muted-foreground">Proficiency</span>
              <span className="font-mono font-bold text-foreground">{skill.level}%</span>
            </div>
            <div className="w-full bg-secondary/70 h-2 rounded-full overflow-hidden p-0.5 border border-border/30">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: isVisible ? `${skill.level}%` : "0%",
                  backgroundColor: skill.color || "hsl(var(--primary))",
                  boxShadow: `0 0 10px ${skill.color}80`,
                }}
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.name} proficiency: ${skill.level}%`}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-emerald-400 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Applied in Cross-Functional Work
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillCard;
