import { useState } from "react";
import {
  Layers,
  Layout,
  ShieldCheck,
  Cloud,
  Bot,
  Database,
  GitBranch,
  Zap,
  Lock,
  Sparkles,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { aiResumeFlows } from "@/data/architectures/aiResumeData";

export const AiResumeArchitecture = () => {
  const [activeFlowId, setActiveFlowId] = useState("flow-2");

  const currentFlow =
    aiResumeFlows.find((f) => f.id === activeFlowId) || aiResumeFlows[1];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            5-Tier Architecture Topology
          </h4>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono">
            NestJS • Gemini 3.7 • Socket.IO
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl border border-primary/40 bg-primary/5 flex flex-col justify-between hover:border-primary transition-all">
            <div>
              <div className="flex items-center gap-1.5 text-primary font-bold mb-1.5">
                <Layout className="h-4 w-4 shrink-0" />
                <span>1. Client Tier</span>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans mb-2">
                React 18 & Vite SPA
              </p>
              <ul className="space-y-1 text-[10px] text-foreground/80">
                <li className="flex items-center gap-1">• Tailwind CSS UI</li>
                <li className="flex items-center gap-1">• Axios (JWT Bearer)</li>
                <li className="flex items-center gap-1">• Socket.IO Client</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-primary/20 text-[9px] text-primary/80">
              Dispatches HTTP / WS
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-border/70 bg-card/40 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center gap-1.5 text-blue-400 font-bold mb-1.5">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>2. API Gateway</span>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans mb-2">
                NestJS Security Hub
              </p>
              <ul className="space-y-1 text-[10px] text-foreground/80">
                <li>• Helmet & CORS</li>
                <li>• Throttler / Rate Limit</li>
                <li>• JWT Auth & RBAC</li>
                <li>• WS EventsGateway</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-border/40 text-[9px] text-blue-400/80">
              user_id Room Isolation
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-border/70 bg-card/40 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1.5">
                <Cloud className="h-4 w-4 shrink-0" />
                <span>3. Ingestion & File</span>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans mb-2">
                Document Engine
              </p>
              <ul className="space-y-1 text-[10px] text-foreground/80">
                <li>• Cloudinary (Raw Files)</li>
                <li>• pdf-parse (Headers strip)</li>
                <li>• mammoth (Word DOCX)</li>
                <li>• Regex Text Cleaner</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-border/40 text-[9px] text-amber-400/80">
              Clean Text Normalization
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-purple-500/40 bg-purple-500/5 flex flex-col justify-between hover:border-purple-500 transition-all">
            <div>
              <div className="flex items-center gap-1.5 text-purple-400 font-bold mb-1.5">
                <Bot className="h-4 w-4 shrink-0" />
                <span>4. AI Pipeline</span>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans mb-2">
                Gemini Multi-Model
              </p>
              <ul className="space-y-1 text-[10px] text-foreground/80">
                <li>• Resume & AiService</li>
                <li>• 3.7 ➔ 3.6 ➔ 3.5 Fallback</li>
                <li>• Exponential Backoff</li>
                <li>• Stream Interview Svc</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-purple-500/20 text-[9px] text-purple-400/80">
              Strict JSON Schema
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-border/70 bg-card/40 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1.5">
                <Database className="h-4 w-4 shrink-0" />
                <span>5. Persistence</span>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans mb-2">
                Database & Cache
              </p>
              <ul className="space-y-1 text-[10px] text-foreground/80">
                <li>• MongoDB (Mongoose)</li>
                <li>• Resumes & Analysis</li>
                <li>• Interview Transcripts</li>
                <li>• Redis (Rate & Cache)</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-border/40 text-[9px] text-emerald-400/80">
              Audit Logs & State Sync
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-border/60 bg-card/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-border/40">
          <div>
            <h5 className="font-bold text-sm text-foreground flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" />
              4 Core Data Flows (End-to-End Walkthrough)
            </h5>
            <p className="text-xs text-muted-foreground">
              Select a data pipeline to trace step-by-step lifecycle:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {aiResumeFlows.map((flow) => {
            const isSelected = flow.id === activeFlowId;
            return (
              <button
                key={flow.id}
                onClick={() => setActiveFlowId(flow.id)}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-border/60 bg-secondary/20 hover:border-border hover:bg-secondary/40"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-primary">
                    {flow.number}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-secondary text-muted-foreground">
                    {flow.tag}
                  </span>
                </div>
                <div className="text-xs font-semibold text-foreground truncate">
                  {flow.name}
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-4 rounded-lg bg-zinc-950/70 border border-border/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-primary flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              {currentFlow.number}. {currentFlow.name}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {currentFlow.tag}
            </span>
          </div>
          <p className="text-xs text-muted-foreground italic border-b border-border/30 pb-2">
            {currentFlow.summary}
          </p>

          <div className="space-y-2.5 pt-1">
            {currentFlow.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs">
                <span className="shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary border border-primary/40 flex items-center justify-center font-mono font-bold text-[10px]">
                  {step.num}
                </span>
                <div className="flex-1">
                  <span className="font-semibold text-foreground mr-2">
                    {step.title}:
                  </span>
                  <span className="text-muted-foreground">{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          Reliability & Security Pillars
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-border/50 bg-card/30 flex items-start gap-2.5">
            <Lock className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-foreground">
                Socket.IO Room Isolation
              </div>
              <div className="text-muted-foreground text-[11px] mt-0.5">
                JWT handshake isolates sockets into private{" "}
                <code className="text-primary font-mono text-[10px]">
                  user_${"{userId}"}
                </code>{" "}
                rooms, preventing cross-tenant data leaks.
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-border/50 bg-card/30 flex items-start gap-2.5">
            <Sparkles className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-foreground">
                Cascading Gemini Fallback
              </div>
              <div className="text-muted-foreground text-[11px] mt-0.5">
                Automatically cycles 3.7 ➔ 3.6 ➔ 3.5 Flash with Exponential
                Backoff when encountering HTTP 429/500/503 limits.
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-border/50 bg-card/30 flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-foreground">
                Strict JSON Schema Enforcement
              </div>
              <div className="text-muted-foreground text-[11px] mt-0.5">
                Uses{" "}
                <code className="text-primary font-mono text-[10px]">
                  responseMimeType: "application/json"
                </code>{" "}
                and regex sanitization to eliminate unpredictable LLM formatting
                crashes.
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-border/50 bg-card/30 flex items-start gap-2.5">
            <Activity className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-foreground">
                Activity Audit Logging
              </div>
              <div className="text-muted-foreground text-[11px] mt-0.5">
                Every sensitive event (Upload, AI Analysis, Payment, Password
                change) is recorded via ActivityLogService for compliance.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiResumeArchitecture;
