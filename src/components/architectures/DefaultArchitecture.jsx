import { Layout, Cpu, Database, ArrowRight } from "lucide-react";

export const DefaultArchitecture = ({ project }) => {
  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-foreground mb-2">System Architecture Flow</h4>
      <p className="text-sm text-muted-foreground">
        Data flow architecture breakdown for this project:
      </p>

      <div className="p-6 rounded-xl border border-border/50 bg-card/30 flex flex-col md:flex-row items-center justify-around gap-6 py-10 font-mono text-xs sm:text-sm">
        <div className="flex flex-col items-center p-4 rounded-lg border border-primary/50 bg-primary/5 w-40 text-center shadow-md">
          <Layout className="h-6 w-6 text-primary mb-2" />
          <span className="font-bold text-foreground">Client Tier</span>
          <span className="text-[10px] text-muted-foreground mt-1">React, Vite, CSS</span>
        </div>

        <ArrowRight className="h-6 w-6 text-primary rotate-90 md:rotate-0" />

        <div className="flex flex-col items-center p-4 rounded-lg border border-primary/50 bg-primary/5 w-44 text-center shadow-md">
          <Cpu className="h-6 w-6 text-primary mb-2" />
          <span className="font-bold text-foreground">Application API</span>
          <span className="text-[10px] text-muted-foreground mt-1">
            {project.tags.includes("Nest.js") ? "NestJS Backend" : "Node.js, Express"}
          </span>
          {project.tags.includes("Socket.IO") && (
            <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 rounded mt-1">
              WS: Socket.IO
            </span>
          )}
          {project.tags.includes("TypeScript") && (
            <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 rounded mt-1">
              TypeScript
            </span>
          )}
        </div>

        <ArrowRight className="h-6 w-6 text-primary rotate-90 md:rotate-0" />

        <div className="flex flex-col items-center p-4 rounded-lg border border-primary/50 bg-primary/5 w-40 text-center shadow-md">
          <Database className="h-6 w-6 text-primary mb-2" />
          <span className="font-bold text-foreground">Database Layer</span>
          <span className="text-[10px] text-muted-foreground mt-1">
            {project.tags.includes("SQL Server") ? "MS SQL Server" : "MongoDB Atlas + Redis"}
          </span>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-secondary/30 border border-border/40 text-xs sm:text-sm text-muted-foreground">
        <span className="font-semibold text-primary">Flow Annotation:</span> The client dispatches
        HTTP(S) API requests (or WebSocket frames) to the backend. The server validates authentication
        with JWT, processes business logic, and interacts with the database/cache layer before
        returning standardized JSON responses.
      </div>
    </div>
  );
};
