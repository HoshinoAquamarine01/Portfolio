import { useState } from "react";
import { Cpu, Layout, Database, Cloud, Zap, ArrowRight, CheckCircle2, ShieldCheck, Code2, Server } from "lucide-react";
import { useSound } from "@/contexts/SoundContext";

const architectureNodes = [
  {
    id: "fe-react",
    category: "client",
    categoryLabel: "Client Layer",
    icon: Layout,
    title: "React 19 & Vite 7",
    subtitle: "Modern Component Architecture",
    description: "Single Page Application (SPA) driven by React 19 features, strict component modularity, and lightning-fast HMR via Vite 7.",
    metrics: ["100/100 Lighthouse Performance", "< 50ms Initial Load", "Zero Bundle Bloat"],
    tech: ["React 19", "Vite", "Tailwind CSS v4", "Lucide Icons", "Web Audio API"],
    projectApplied: ["My Portfolio Website", "App Tracker Dashboard"],
  },
  {
    id: "be-node",
    category: "api",
    categoryLabel: "API & Backend Layer",
    icon: Server,
    title: "Node.js & Express API",
    subtitle: "Asynchronous Micro-services",
    description: "Scalable REST API endpoints with middleware validation, JWT auth flow, and async event loop handling for non-blocking I/O.",
    metrics: ["Sub-20ms Response Time", "Automated Validation", "Stateless Session Management"],
    tech: ["Node.js", "Express.js", "EmailJS API", "JWT", "REST API"],
    projectApplied: ["Mock Interview Engine", "Job Tracker Backend"],
  },
  {
    id: "db-mongo",
    category: "db",
    categoryLabel: "Data & Storage Layer",
    icon: Database,
    title: "MongoDB & Relational Storage",
    subtitle: "Structured & Document Models",
    description: "High-throughput data storage with indexing optimization, schema constraints, and cached query response pipelines.",
    metrics: ["ACID Compliant Transactions", "Index-Optimized Queries", "Real-Time Sync"],
    tech: ["MongoDB", "Mongoose", "PostgreSQL", "JSON Schema"],
    projectApplied: ["User & Application Database", "Analytics Tracking"],
  },
  {
    id: "infra-devops",
    category: "infra",
    categoryLabel: "DevOps & Infrastructure",
    icon: Cloud,
    title: "CI/CD & Automated Deployment",
    subtitle: "Enterprise Release Pipeline",
    description: "Continuous Integration and Deployment (CI/CD) pipelines running lint checks, production bundling, and zero-downtime hosting.",
    metrics: ["Automated GitHub Actions", "Zero Downtime Deploy", "SSL/TLS Security"],
    tech: ["GitHub Actions", "GitHub Pages", "Vercel", "Git Version Control"],
    projectApplied: ["Portfolio Deployment Pipeline", "Production Apps"],
  },
];

const ArchitectureSection = () => {
  const [selectedNode, setSelectedNode] = useState(architectureNodes[0]);
  const { playClick, playHover } = useSound();

  return (
    <section id="architecture" className="py-24 relative overflow-hidden bg-secondary/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 px-4 mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu size={14} />
            <span>Full-Stack Blueprint</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            System Architecture & Stack Matrix
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Interactive blueprint showing how modern components connect in my end-to-end applications.
          </p>
        </div>

        {/* Grid Layout: Architecture Diagram & Node Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Architecture Nodes Matrix (8 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {architectureNodes.map((node) => {
              const IconComponent = node.icon;
              const isSelected = selectedNode.id === node.id;

              return (
                <button
                  key={node.id}
                  onMouseEnter={() => playHover()}
                  onClick={() => {
                    playClick();
                    setSelectedNode(node);
                  }}
                  className={`relative text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group overflow-hidden ${
                    isSelected
                      ? "bg-background border-primary shadow-lg shadow-primary/10 scale-[1.02]"
                      : "bg-background/60 border-border/60 hover:border-primary/50 hover:bg-background/90"
                  }`}
                >
                  {/* Glowing Top Indicator */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-blue-500" />
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-secondary text-foreground/80">
                        {node.categoryLabel}
                      </span>
                      <IconComponent
                        size={24}
                        className={`transition-colors duration-300 ${
                          isSelected ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                        }`}
                      />
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {node.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4 font-medium">
                      {node.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center text-xs font-semibold text-primary pt-3 border-t border-border/40 gap-1">
                    <span>Inspect Layer</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Inspector Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-background border border-primary/20 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-6">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Code2 size={18} />
                <span>Capability & Stack Details</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                {selectedNode.category.toUpperCase()}
              </span>
            </div>

            {/* Content */}
            <div>
              <h4 className="text-xl font-extrabold text-foreground mb-2">
                {selectedNode.title}
              </h4>
              <p className="text-xs font-semibold text-primary/90 mb-4">
                {selectedNode.subtitle}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {selectedNode.description}
              </p>

              {/* Performance Metrics */}
              <div className="mb-6">
                <h5 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-1.5">
                  <Zap size={14} className="text-amber-500" />
                  <span>Key Performance Metrics</span>
                </h5>
                <div className="space-y-2">
                  {selectedNode.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-foreground/90 font-medium">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h5 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-primary" />
                  <span>Tech Stack & Libraries</span>
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.tech.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-secondary text-foreground/90 border border-border/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Applied */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Applied in Projects:
                </h5>
                <div className="text-xs font-semibold text-primary">
                  {selectedNode.projectApplied.join(" • ")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;

