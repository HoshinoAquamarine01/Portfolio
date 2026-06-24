import useScrollReveal from "@/hooks/useScrollReveal";

const SkillCard = ({ skill }) => {
  const [ref, isVisible] = useScrollReveal();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="group glow-card bg-card p-6 rounded-lg shadow-sm border border-border/75 transition-all duration-300 hover:scale-[1.02]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.6s ease-out, transform 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Ambient Glow Overlays */}
      <div className="glow-border" />
      <div className="glow-bg" />

      {/* Relative container to keep content above glow background */}
      <div className="relative z-10">
        <div className="text-left mb-4">
          <h3 className="font-bold text-lg text-foreground">{skill.name}</h3>
        </div>
        {skill.category !== "soft" && (
          <>
            <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
              <div
                className="bg-linear-to-r from-primary to-primary/70 h-2 rounded-full origin-left animate-[grow_1.5s_ease-out] shadow-[0_0_8px_rgba(167,139,250,0.4)]"
                style={{ width: skill.level + "%" }}
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.name} proficiency: ${skill.level}%`}
              />
            </div>
            <div className="text-right mt-1.5">
              <span className="text-sm font-semibold text-muted-foreground font-mono">
                {skill.level}%
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SkillCard;
