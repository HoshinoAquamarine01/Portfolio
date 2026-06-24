import { ExternalLink, Github, Info } from "lucide-react";
import useScrollReveal from "@/hooks/useScrollReveal";

const ProjectCard = ({ project, imageErrors, handleImageError, onViewDetails }) => {
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
      className="group glow-card flex h-full flex-col rounded-lg bg-card overflow-hidden shadow-sm transition-all duration-300 hover:shadow-[0_10px_25px_rgba(167,139,250,0.15)] hover:scale-[1.02] border border-border/75"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.6s ease-out, transform 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Ambient Glow Overlays */}
      <div className="glow-border" />
      <div className="glow-bg" />

      {/* Card Content (Relative and higher z-index to stay above glow background) */}
      <div className="relative z-10 flex flex-col h-full flex-1">
        <div className="h-48 overflow-hidden bg-secondary/50 relative shrink-0">
          {imageErrors[project.id] ? (
            <div className="w-full h-full flex items-center justify-center bg-secondary/50">
              <span className="text-muted-foreground text-sm">
                Image unavailable
              </span>
            </div>
          ) : (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              onError={() => handleImageError(project.id)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-semibold border border-border/75 rounded-full bg-secondary/60 text-secondary-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-1 text-xs font-semibold border border-border/75 rounded-full bg-secondary/40 text-muted-foreground">
                +{project.tags.length - 4} more
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold mb-1 text-foreground">{project.title}</h3>
          <p className="text-xs text-muted-foreground mb-3 font-medium">
            Timeline: {project.timeline}
          </p>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
            {project.description}
          </p>
          
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/20">
            <button
              onClick={() => onViewDetails(project)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-all hover:translate-x-0.5 cursor-pointer"
            >
              <Info className="h-3.5 w-3.5" />
              View Details
            </button>

            <div className="flex items-center space-x-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/75 hover:text-primary transition-all duration-300 hover:scale-125"
                  aria-label={`${project.title} live demo`}
                >
                  <ExternalLink size={18} />
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} source code`}
                className="text-foreground/75 hover:text-primary transition-all duration-300 hover:scale-125"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
