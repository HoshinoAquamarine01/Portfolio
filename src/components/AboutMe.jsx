import { Code, User, Briefcase, FileText, Download, Github } from "lucide-react";
import { useSound } from "@/contexts/SoundContext";
import { downloadResume } from "@/lib/resume";

const AboutMe = ({ onOpenResumeModal }) => {
  const { playClick, playHover } = useSound();

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary">me</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Full-Stack Developer focused on clean, reliable products
            </h3>
            <p className="text-muted-foreground">
              I build maintainable web applications with React, Node.js, and MongoDB. I focus on clean architecture, reliable APIs, and responsive interfaces that are easy to use and scale.
            </p>
            <p className="text-muted-foreground">
              I care about code quality, teamwork, and delivering practical solutions. Right now, I am strengthening my backend skills with NestJS and my frontend skills with Next.js through production-focused projects.
            </p>

            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              {[
                "API design and integration",
                "Auth and role-based access",
                "Responsive, accessible UI",
                "Maintainable code and clear structure",
              ].map((item, idx) => (
                <li
                  key={idx}
                  onMouseEnter={() => playHover()}
                  className="rounded-lg border border-border/70 bg-card/70 px-3 py-2 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:shadow-md hover:scale-[1.02] cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-4 justify-start">
              <button
                onClick={() => {
                  playClick();
                  onOpenResumeModal();
                }}
                className="btn-primary flex items-center gap-2 cursor-pointer"
              >
                <FileText size={18} />
                <span>Preview Live CV</span>
              </button>

              <button
                onClick={() => {
                  playClick();
                  downloadResume();
                }}
                className="btn-secondary flex items-center gap-2 cursor-pointer"
              >
                <Download size={18} />
                <span>Download CV</span>
              </button>

              <a
                href="https://github.com/HoshinoAquamarine01"
                target="_blank"
                rel="noreferrer"
                onClick={() => playClick()}
                className="btn-secondary flex items-center gap-2"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div
              onMouseEnter={() => playHover()}
              className="gradient-border p-6 card-hover border border-border shadow-sm transition-all duration-300 hover:shadow-[0_8px_16px_rgba(167,139,250,0.15)] hover:border-primary/40 hover:scale-[1.02]"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 hover:bg-primary/20">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Backend Development</h4>
                  <p className="text-muted-foreground">
                    Build robust services with Node.js and Express, design RESTful APIs, and implement secure authentication.
                  </p>
                </div>
              </div>
            </div>

            <div
              onMouseEnter={() => playHover()}
              className="gradient-border p-6 card-hover border border-border shadow-sm transition-all duration-300 hover:shadow-[0_8px_16px_rgba(167,139,250,0.15)] hover:border-primary/40 hover:scale-[1.02]"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 hover:bg-primary/20">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Frontend Development</h4>
                  <p className="text-muted-foreground">
                    Create responsive, reusable interfaces with React 19, prioritizing performance and consistent UX.
                  </p>
                </div>
              </div>
            </div>

            <div
              onMouseEnter={() => playHover()}
              className="gradient-border p-6 card-hover border border-border shadow-sm transition-all duration-300 hover:shadow-[0_8px_16px_rgba(167,139,250,0.15)] hover:border-primary/40 hover:scale-[1.02]"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 hover:bg-primary/20">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Product & System Mindset</h4>
                  <p className="text-muted-foreground">
                    Translate requirements into practical milestones, write clean code, and design end-to-end architectures.
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


