import { BookOpen } from "lucide-react";
import { LEARNING_ROADMAP } from "@/data/devDashboardData";

export const DevRoadmapCard = () => {
  return (
    <div className="bg-card/40 backdrop-blur-md border border-border/70 rounded-2xl p-6 shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:border-primary/30 flex flex-col justify-between md:col-span-1">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Learning Roadmap
          </h3>
          <span className="text-xs text-primary font-semibold uppercase tracking-wider bg-primary/10 px-2.5 py-0.5 rounded-full">
            NestJS & Next.js
          </span>
        </div>

        <div className="space-y-4">
          {LEARNING_ROADMAP.map((roadmap) => (
            <div key={roadmap.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-foreground">
                  {roadmap.name}
                </span>
                <span className="text-xs font-mono font-semibold text-muted-foreground">
                  {roadmap.progress}%
                </span>
              </div>
              <div className="h-2 w-full bg-secondary/80 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-linear-to-r ${roadmap.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${roadmap.progress}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-muted-foreground/90 text-left">
                {roadmap.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border/40 text-left text-xs text-muted-foreground leading-relaxed mt-4">
        <span className="font-semibold text-primary">Next Focus:</span> Master
        NestJS Microservices, GraphQL, and build SEO-friendly web apps using
        Next.js.
      </div>
    </div>
  );
};

export default DevRoadmapCard;
