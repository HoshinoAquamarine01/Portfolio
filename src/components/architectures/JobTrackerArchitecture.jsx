import { useState } from "react";
import {
  Layers,
  Layout,
  ShieldCheck,
  Zap,
  Bot,
  Database,
  GitBranch,
  QrCode,
  Mic,
  MessageSquare,
  ShieldAlert,
} from "lucide-react";
import { jobTrackerFlows } from "@/data/architectures/jobTrackerData";

export const JobTrackerArchitecture = () => {
  const [activeFlowId, setActiveFlowId] = useState("flow-2");

  const currentFlow =
    jobTrackerFlows.find((f) => f.id === activeFlowId) || jobTrackerFlows[1];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            System Architecture Topology
          </h4>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono">
            Express 5 • React 19 • Gemini 2.5 • VietQR
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
                React 19 & Vite SPA
              </p>
              <ul className="space-y-1 text-[10px] text-foreground/80">
                <li>• Kanban & Analytics UI</li>
                <li>• Web Speech API (Voice)</li>
                <li>• Socket.IO Client</li>
                <li>• jsPDF & XLSX Exporters</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-primary/20 text-[9px] text-primary/80">
              HTTP / WS / Voice
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-border/70 bg-card/40 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center gap-1.5 text-blue-400 font-bold mb-1.5">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>2. Security & Guard</span>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans mb-2">
                Express 5 Middleware
              </p>
              <ul className="space-y-1 text-[10px] text-foreground/80">
                <li>• Helmet & SanitizeNoSql</li>
                <li>• Rate Limiting (LimitRequest)</li>
                <li>• JWT & Role Check</li>
                <li>• Redis Maintenance (503)</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-border/40 text-[9px] text-blue-400/80">
              AuditLog Middleware
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-border/70 bg-card/40 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1.5">
                <Zap className="h-4 w-4 shrink-0" />
                <span>3. Real-Time Hub</span>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans mb-2">
                Socket.IO Server
              </p>
              <ul className="space-y-1 text-[10px] text-foreground/80">
                <li>• User Rooms (user_id)</li>
                <li>• 1-on-1 Chat (conv_id)</li>
                <li>• Typing & Read Status</li>
                <li>• Push Notifications</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-border/40 text-[9px] text-amber-400/80">
              Instant Event Push
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-purple-500/40 bg-purple-500/5 flex flex-col justify-between hover:border-purple-500 transition-all">
            <div>
              <div className="flex items-center gap-1.5 text-purple-400 font-bold mb-1.5">
                <Bot className="h-4 w-4 shrink-0" />
                <span>4. External APIs</span>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans mb-2">
                AI & FinTech Hub
              </p>
              <ul className="space-y-1 text-[10px] text-foreground/80">
                <li>• Google Gemini 2.5 / Ollama</li>
                <li>• SePay / VietQR Gateway</li>
                <li>• Cloudinary Media CDN</li>
                <li>• Google OAuth 2.0</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-purple-500/20 text-[9px] text-purple-400/80">
              IPN Webhooks & LLM
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-border/70 bg-card/40 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1.5">
                <Database className="h-4 w-4 shrink-0" />
                <span>5. Persistence</span>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans mb-2">
                Storage & Cache
              </p>
              <ul className="space-y-1 text-[10px] text-foreground/80">
                <li>• MongoDB 6.0 (Mongoose)</li>
                <li>• Jobs & MockSessions</li>
                <li>• Transactions & Audit</li>
                <li>• Redis 7.0 (Cache/Flags)</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-border/40 text-[9px] text-emerald-400/80">
              Data Integrity & Cache
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-border/60 bg-card/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-border/40">
          <div>
            <h5 className="font-bold text-sm text-foreground flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" />
              5 Core Data Pipelines (End-to-End Walkthrough)
            </h5>
            <p className="text-xs text-muted-foreground">
              Select a subsystem pipeline to trace step-by-step lifecycle:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
          {jobTrackerFlows.map((flow) => {
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
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-secondary text-muted-foreground truncate max-w-[70px]">
                    {flow.tag.split("•")[0]}
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
          Reliability & Architectural Highlights
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-lg border border-primary/40 bg-primary/5">
            <div className="flex items-center gap-1.5 font-bold text-foreground mb-1.5">
              <QrCode className="h-4 w-4 text-primary" />
              <span>Automated VietQR & SePay IPN Reconciliation</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Generates dynamic VietQR codes with unique transaction signatures
              (
              <code className="font-mono text-primary text-[10px]">
                APP_XXXX
              </code>
              ). When payment completes, SePay triggers an automated webhook
              IPN callback that reconciles funds and immediately upgrades VIP
              permissions over Socket.IO with zero page reloads.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-purple-500/40 bg-purple-500/5">
            <div className="flex items-center gap-1.5 font-bold text-foreground mb-1.5">
              <Mic className="h-4 w-4 text-purple-400" />
              <span>
                Voice AI Mock Interview (Web Speech + Gemini 2.5)
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Combines Web Speech API for low-latency client-side
              speech-to-text with Google Gemini 2.5 / Ollama. Evaluates oral
              candidate responses dynamically against technical rubrics and
              outputs comprehensive multi-dimensional radar performance
              scores.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-amber-500/40 bg-amber-500/5">
            <div className="flex items-center gap-1.5 font-bold text-foreground mb-1.5">
              <MessageSquare className="h-4 w-4 text-amber-400" />
              <span>Isolated Real-Time Socket Architecture</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Enforces strict room tenancy with private channels (
              <code className="font-mono text-primary text-[10px]">
                user_${"{userId}"}
              </code>
              ) for personal push alerts and sorted conversation rooms (
              <code className="font-mono text-primary text-[10px]">
                conv_${"{sortedIds}"}
              </code>
              ) supporting typing indicators, read receipts, and 1-on-1
              messaging.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-emerald-500/40 bg-emerald-500/5">
            <div className="flex items-center gap-1.5 font-bold text-foreground mb-1.5">
              <ShieldAlert className="h-4 w-4 text-emerald-400" />
              <span>
                Immutable Audit Trail & Redis Maintenance Guard
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              AuditLogMiddleware systematically logs every mutating transaction
              (POST, PUT, PATCH, DELETE) with user, IP, and endpoint context.
              Integrated Redis maintenance gating gracefully redirects standard
              user traffic to HTTP 503 while maintaining admin privileges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTrackerArchitecture;
