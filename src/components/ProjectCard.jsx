import { ExternalLink, Github } from "lucide-react";
import useScrollReveal from "@/hooks/useScrollReveal";

const ProjectCard = ({ project, imageErrors, handleImageError }) => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className="group flex h-full flex-col rounded-lg bg-card overflow-hidden shadow-sm transition-all duration-300 hover:shadow-[0_10px_25px_rgba(167,139,250,0.15)] hover:border-primary/40 hover:scale-[1.02] border border-border"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.6s ease-out",
      }}
    >
      <div className="h-48 overflow-hidden bg-secondary/50 relative">
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
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
        <p className="text-xs text-muted-foreground mb-3">
          Time: {project.timeline}
        </p>
        <p className="text-muted-foreground text-sm mb-4">
          {project.description}
        </p>
        <div className="mt-auto flex items-center pt-2">
          <div className="flex items-center space-x-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]"
                aria-label={`${project.title} live demo`}
              >
                <ExternalLink size={20} />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} source code`}
              className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
