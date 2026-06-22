import { Search, X } from "lucide-react";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ffWebImg from "../assets/ff-web.png";
import insuranceImg from "../assets/insurance.png";
import appTrackerImg from "../assets/app-tracker.png";
const projects = [
  {
    id: 1,
    title: "Fresh-Fruit-Web",
    timeline: "09/2025 - 11/2025",
    description:
      "A full-stack e-commerce web application for fresh produce, built to deliver a smooth shopping experience from product discovery to checkout. It includes category-based browsing, detailed product views, cart and quantity management, and a scalable backend structure designed for future admin features such as inventory control, order management, and promotional campaigns.",
    image: ffWebImg,
    tags: ["React", "Node.js", "MongoDB", "TailwindCSS", "Express.js", "Vite"],
    demoUrl: null,
    githubUrl: "https://github.com/vanhuy2005/fresh-fruit-web",
  },
  {
    id: 2,
    title: "Insurance-Management",
    timeline: "3/2026 - 5/2026",
    description:
      "A comprehensive insurance management platform designed to digitalize policy lifecycles, premium tracking, and claims processing. The system features real-time payment monitoring via VietQR/SePay webhook integration, a robust security architecture (DAC/RBAC) with granular column-level access controls, and detailed audit logs for a highly secure and automated workflow.",
    image: insuranceImg,
    tags: [
      "React",
      "Node.js",
      "SQL Server",
      "TailwindCSS",
      "Express.js",
      "TypeScript",
      "Vite",
    ],
    demoUrl: null,
    githubUrl: "https://github.com/HoshinoAquamarine01/Insurance-Managemnt",
  },
  {
    id: 3,
    title: "Application Job Tracker",
    timeline: "02/2026 - Now",
    description:
      "An ongoing job application tracking system that helps users organize opportunities and stay on top of every application stage. It provides structured status pipelines, deadline reminders, and task-focused workflows to manage follow-ups, interviews, and priorities in one place, making the job search process more transparent, consistent, and easier to maintain over time.",
    image: appTrackerImg,
    tags: [
      "React",
      "Node.js",
      "MongoDB",
      "TailwindCSS",
      "Express.js",
      "TypeScript",
      "Vite",
      "Socket.IO",
    ],
    demoUrl: null,
    githubUrl: "https://github.com/HoshinoAquamarine01/Job-Application-Tracker",
  },
];
const ProjectSection = () => {
  const [imageErrors, setImageErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const handleImageError = (projectId) => {
    setImageErrors((prev) => ({
      ...prev,
      [projectId]: true,
    }));
  };

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured<span className="text-primary"> Project</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Here are some of my recent projects, including both completed and
          ongoing work.
        </p>

        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects by name, tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-full border border-border bg-card/60 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found matching "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                imageErrors={imageErrors}
                handleImageError={handleImageError}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
