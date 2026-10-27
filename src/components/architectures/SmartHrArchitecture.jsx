import { useState } from "react";
import {
  Layers,
  Layout,
  ShieldCheck,
  ScanText,
  Bot,
  Target,
  Award,
  GitBranch,
  Zap,
  Calculator,
  Database,
} from "lucide-react";
import { smartHrStages } from "@/data/architectures/smartHrData";

export const SmartHrArchitecture = () => {
  const [activeStageId, setActiveStageId] = useState("stage-2");

  const currentStage =
    smartHrStages.find((s) => s.id === activeStageId) || smartHrStages[1];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            End-to-End Pipeline Architecture
          </h4>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono">
            NestJS • Gemini 2.0 Flash • OCR
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 font-mono text-xs">
          <div className="p-3 rounded-xl border border-primary/40 bg-primary/5 flex flex-col justify-between hover:border-primary transition-all">
            <div>
              <div className="flex items-center gap-1.5 text-primary font-bold mb-1">
                <Layout className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">1. Client Tier</span>
              </div>
              <p className="text-[10px] text-muted-foreground font-sans mb-1.5">
                React 19 & Vite
              </p>
              <ul className="space-y-0.5 text-[9.5px] text-foreground/80">
                <li>• HR Recruiter UI</li>
                <li>• Multi-file Upload</li>
                <li>• JD Criteria Input</li>
              </ul>
            </div>
            <div className="mt-2 pt-1.5 border-t border-primary/20 text-[8.5px] text-primary/80">
              Multipart / HTTPS
            </div>
          </div>

          <div className="p-3 rounded-xl border border-border/70 bg-card/40 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center gap-1.5 text-blue-400 font-bold mb-1">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">2. API Gateway</span>
              </div>
              <p className="text-[10px] text-muted-foreground font-sans mb-1.5">
                NestJS Controller
              </p>
              <ul className="space-y-0.5 text-[9.5px] text-foreground/80">
                <li>• Multer Handler</li>
                <li>• MIME-Type Router</li>
                <li>• File Size Guard</li>
              </ul>
            </div>
            <div className="mt-2 pt-1.5 border-t border-border/40 text-[8.5px] text-blue-400/80">
              CvService Orchestrator
            </div>
          </div>

          <div className="p-3 rounded-xl border border-border/70 bg-card/40 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                <ScanText className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">3. OCR & Sanitizer</span>
              </div>
              <p className="text-[10px] text-muted-foreground font-sans mb-1.5">
                Triple Strategy
              </p>
              <ul className="space-y-0.5 text-[9.5px] text-foreground/80">
                <li>• pdf-parse (PDF)</li>
                <li>• mammoth (Word)</li>
                <li>• tesseract.js (OCR)</li>
              </ul>
            </div>
            <div className="mt-2 pt-1.5 border-t border-border/40 text-[8.5px] text-amber-400/80">
              -40% Token Footprint
            </div>
          </div>

          <div className="p-3 rounded-xl border border-purple-500/40 bg-purple-500/5 flex flex-col justify-between hover:border-purple-500 transition-all">
            <div>
              <div className="flex items-center gap-1.5 text-purple-400 font-bold mb-1">
                <Bot className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">4. AI Fallback</span>
              </div>
              <p className="text-[10px] text-muted-foreground font-sans mb-1.5">
                Multi-Provider
              </p>
              <ul className="space-y-0.5 text-[9.5px] text-foreground/80">
                <li>• Gemini 2.0 Flash</li>
                <li>• OpenAI GPT-4o-mini</li>
                <li>• Heuristic Regex</li>
              </ul>
            </div>
            <div className="mt-2 pt-1.5 border-t border-purple-500/20 text-[8.5px] text-purple-400/80">
              Zero Schema Drift
            </div>
          </div>

          <div className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-500/5 flex flex-col justify-between hover:border-emerald-500 transition-all">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                <Target className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">5. Fit Scoring</span>
              </div>
              <p className="text-[10px] text-muted-foreground font-sans mb-1.5">
                Tri-Factor Math
              </p>
              <ul className="space-y-0.5 text-[9.5px] text-foreground/80">
                <li>• 45% Skill Fit</li>
                <li>• 35% Seniority Fit</li>
                <li>• 20% Domain Fit</li>
              </ul>
            </div>
            <div className="mt-2 pt-1.5 border-t border-emerald-500/20 text-[8.5px] text-emerald-400/80">
              Total Score 0-100%
            </div>
          </div>

          <div className="p-3 rounded-xl border border-border/70 bg-card/40 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center gap-1.5 text-pink-400 font-bold mb-1">
                <Award className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">6. Adaptive Gen</span>
              </div>
              <p className="text-[10px] text-muted-foreground font-sans mb-1.5">
                Test & Q&A
              </p>
              <ul className="space-y-0.5 text-[9.5px] text-foreground/80">
                <li>• Deep-dive Questions</li>
                <li>• Coding Challenge</li>
                <li>• Candidate Ranking</li>
              </ul>
            </div>
            <div className="mt-2 pt-1.5 border-t border-border/40 text-[8.5px] text-pink-400/80">
              Level-Tailored Tests
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-border/60 bg-card/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-border/40">
          <div>
            <h5 className="font-bold text-sm text-foreground flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" />
              4 Core Data Processing Phases (End-to-End Pipeline)
            </h5>
            <p className="text-xs text-muted-foreground">
              Trace the journey from raw, unstructured CV documents to tailored
              assessment tests:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {smartHrStages.map((stage) => {
            const isSelected = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-border/60 bg-secondary/20 hover:border-border hover:bg-secondary/40"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-primary">
                    {stage.number}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-secondary text-muted-foreground truncate max-w-[80px]">
                    {stage.tag.split("•")[0]}
                  </span>
                </div>
                <div className="text-xs font-semibold text-foreground truncate">
                  {stage.name}
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-4 rounded-lg bg-zinc-950/70 border border-border/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-primary flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              {currentStage.number}. {currentStage.name}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {currentStage.tag}
            </span>
          </div>
          <p className="text-xs text-muted-foreground italic border-b border-border/30 pb-2">
            {currentStage.summary}
          </p>

          <div className="space-y-2.5 pt-1">
            {currentStage.steps.map((step, idx) => (
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
          <Calculator className="h-3.5 w-3.5 text-primary" />
          Scoring Formula & Architecture Highlights
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-lg border border-primary/40 bg-primary/5">
            <div className="flex items-center gap-1.5 font-bold text-foreground mb-1.5">
              <Target className="h-4 w-4 text-primary" />
              <span>JD-Fit Scoring Formula</span>
            </div>
            <div className="font-mono text-[11px] bg-background/80 p-2 rounded border border-primary/20 text-primary font-bold my-1.5">
              S_total = 0.45 · S_skill + 0.35 · S_exp + 0.20 · S_domain
            </div>
            <div className="text-[11px] text-muted-foreground space-y-0.5">
              <div>
                • <strong>45% Skill Fit:</strong> Must-have (75%) +
                Nice-to-have (25%) + Semantic Mapping
              </div>
              <div>
                • <strong>35% Experience Fit:</strong> Verified years matching
                with linear penalty
              </div>
              <div>
                • <strong>20% Domain Fit:</strong> Industry vertical (Fintech,
                SaaS) & Academic background
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-lg border border-purple-500/40 bg-purple-500/5">
            <div className="flex items-center gap-1.5 font-bold text-foreground mb-1.5">
              <Bot className="h-4 w-4 text-purple-400" />
              <span>Multi-Provider Resilience Chain</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Gemini 2.0 Flash serves as primary inference engine with{" "}
              <strong>responseSchema</strong> directly constraining token
              generation. Upon HTTP 429 quota limits or network errors, system
              fails over seamlessly to <strong>OpenAI GPT-4o-mini</strong> (Zod
              Structured Outputs) and local heuristic regex.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-amber-500/40 bg-amber-500/5">
            <div className="flex items-center gap-1.5 font-bold text-foreground mb-1.5">
              <ScanText className="h-4 w-4 text-amber-400" />
              <span>Token Optimization Sanitizer</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              TextSanitizerUtil removes non-printable control characters, strips
              boilerplate headers, and collapses sequential line-breaks (
              <code className="font-mono text-primary text-[10px]">
                \n&#123;3,&#125; -&gt; \n\n
              </code>
              ), achieving a <strong>25% - 40% reduction in prompt tokens</strong>{" "}
              per screening evaluation.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-emerald-500/40 bg-emerald-500/5">
            <div className="flex items-center gap-1.5 font-bold text-foreground mb-1.5">
              <Database className="h-4 w-4 text-emerald-400" />
              <span>Persistence & Candidate Deduplication</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Performs cross-candidate deduplication based on email and phone
              signatures, archiving normalized records into{" "}
              <strong>Candidates Collection</strong> and storing OCR metadata and
              scoring history in <strong>MongoDB Mongoose</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHrArchitecture;
