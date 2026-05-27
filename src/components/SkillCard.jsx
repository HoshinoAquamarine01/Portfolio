import useScrollReveal from "@/hooks/useScrollReveal";

const SkillCard = ({ skill }) => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-[0_8px_16px_rgba(167,139,250,0.15)] hover:border-primary/40 hover:scale-[1.02]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.6s ease-out",
      }}
    >
      <div className="text-left mb-4">
        <h3 className="font-semibold text-lg">{skill.name}</h3>
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
          <div className="text-right mt-1">
            <span className="text-sm text-muted-foreground">
              {skill.level}%
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default SkillCard;
