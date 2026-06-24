import { Code, User, Briefcase, Download } from "lucide-react";

import toast from "react-hot-toast";

const AboutMe = () => {
  const handleDownloadResume = () => {
    const cvUrl = import.meta.env.VITE_CV_URL;
    if (cvUrl) {
      window.open(cvUrl, "_blank", "noopener,noreferrer");
      toast.success("Opening resume in a new tab...");
    } else {
      toast.error("Resume link is currently unavailable.");
    }
  };
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About<span className="text-primary"> me</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Full-Stack Developer focused on clean, reliable products
            </h3>
            <p className="text-muted-foreground">
              I build maintainable web applications with React, Node.js, and
              MongoDB. I focus on clean architecture, reliable APIs, and
              responsive interfaces that are easy to use and scale.
            </p>
            <p className="text-muted-foreground">
              I care about code quality, teamwork, and delivering practical
              solutions. Right now, I am strengthening my backend skills with
              NestJS and my frontend skills with Next.js through production-
              focused projects.
            </p>
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <li className="rounded-lg border border-border/70 bg-card/70 px-3 py-2 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:shadow-md hover:scale-[1.02]">
                API design and integration
              </li>
              <li className="rounded-lg border border-border/70 bg-card/70 px-3 py-2 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:shadow-md hover:scale-[1.02]">
                Auth and role-based access
              </li>
              <li className="rounded-lg border border-border/70 bg-card/70 px-3 py-2 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:shadow-md hover:scale-[1.02]">
                Responsive, accessible UI
              </li>
              <li className="rounded-lg border border-border/70 bg-card/70 px-3 py-2 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:shadow-md hover:scale-[1.02]">
                Maintainable code and clear structure
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="btn-primary">
                Get In Touch
              </a>
              <button
                onClick={handleDownloadResume}
                className="btn-secondary flex items-center justify-center gap-2"
                aria-label="Download my resume"
              >
                <Download size={18} />
                Download Resume
              </button>
              <a
                href="https://github.com/HoshinoAquamarine01"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                aria-label="Visit my GitHub profile"
              >
                View GitHub
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover border border-border shadow-sm transition-all duration-300 hover:shadow-[0_8px_16px_rgba(167,139,250,0.15)] hover:border-primary/40 hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 hover:bg-primary/20">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Backend Development</h4>
                  <p className="text-muted-foreground">
                    Build robust services with Node.js and Express, design
                    RESTful APIs, and implement secure authentication and
                    authorization.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover border border-border shadow-sm transition-all duration-300 hover:shadow-[0_8px_16px_rgba(167,139,250,0.15)] hover:border-primary/40 hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 hover:bg-primary/20">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Frontend Development
                  </h4>
                  <p className="text-muted-foreground">
                    Create responsive, reusable interfaces with React,
                    prioritizing accessibility, performance, and consistent UX.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover border border-border shadow-sm transition-all duration-300 hover:shadow-[0_8px_16px_rgba(167,139,250,0.15)] hover:border-primary/40 hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 hover:bg-primary/20">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Product Mindset</h4>
                  <p className="text-muted-foreground">
                    Translate requirements into practical milestones, write
                    clean documentation, and deliver features with maintainable
                    code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
