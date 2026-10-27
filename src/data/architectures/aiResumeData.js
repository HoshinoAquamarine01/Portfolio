export const aiResumeFlows = [
  {
    id: "flow-1",
    number: "01",
    name: "Document Ingestion",
    tag: "Multer + Parsers",
    summary:
      "Upload, Cloudinary storage, multi-format text parsing (.pdf / .docx), and regex sanitization.",
    steps: [
      {
        num: "1",
        title: "Client Upload",
        desc: "User selects .pdf or .docx CV file in React UI. Sent via Axios POST with Bearer JWT token.",
      },
      {
        num: "2",
        title: "Gateway & Auth",
        desc: "NestJS intercepts request through Multer, Helmet, CORS, Throttler and JWT AuthGuard.",
      },
      {
        num: "3",
        title: "Cloud & Buffer",
        desc: "Binary file uploaded to Cloudinary for permanent storage; file buffer passed to extraction engine.",
      },
      {
        num: "4",
        title: "Text Extraction",
        desc: "pdf-parse (strips headers, footers & page numbers) or mammoth.extractRawText for Word DOCX.",
      },
      {
        num: "5",
        title: "Sanitization & Save",
        desc: "Regex cleaner normalizes line-breaks (\\n\\s*\\n -> \\n\\n) and persists extracted text to MongoDB.",
      },
    ],
  },
  {
    id: "flow-2",
    number: "02",
    name: "AI Analysis & ATS Pipeline",
    tag: "Gemini Cascade + WS Push",
    summary:
      "Prompt assembly, cascading model fallback, JSON schema enforcement, and real-time WebSocket push.",
    steps: [
      {
        num: "1",
        title: "Prompt Assembly",
        desc: "AiService combines extracted CV text with specialized ATS optimization and scoring prompts.",
      },
      {
        num: "2",
        title: "Cascading Fallback",
        desc: "Auto-routes Gemini 3.7-flash ➔ 3.6-flash ➔ 3.5-flash with Exponential Backoff for 429/500/503 errors.",
      },
      {
        num: "3",
        title: "JSON Schema Enforcer",
        desc: "Configured with responseMimeType: 'application/json', strips markdown fences and validates ATS fields.",
      },
      {
        num: "4",
        title: "Database Commit",
        desc: "Persists overallScore, ATS compatibility, strengths/weaknesses to ResumeAnalysis collection in MongoDB.",
      },
      {
        num: "5",
        title: "Real-Time WebSocket Push",
        desc: "EventsGateway dispatches notification:cv-analysis-complete directly to user_${userId} socket room.",
      },
    ],
  },
  {
    id: "flow-3",
    number: "03",
    name: "Mock Interview Streaming",
    tag: "Bi-directional WebSocket",
    summary:
      "Real-time AI voice/text coaching with token-by-token streaming back to the candidate.",
    steps: [
      {
        num: "1",
        title: "JWT Handshake",
        desc: "Socket.IO establishes authenticated connection, isolating the client into user_${userId} private room.",
      },
      {
        num: "2",
        title: "Candidate Input",
        desc: "Client emits interview:send-answer containing sessionId, current question, and candidate answer.",
      },
      {
        num: "3",
        title: "AI Token Streaming",
        desc: "InterviewService invokes Gemini streaming API to evaluate answers dynamically without latency.",
      },
      {
        num: "4",
        title: "Socket Chunk Emit",
        desc: "EventsGateway emits interview:stream-chunk token-by-token to client with immediate visual feedback.",
      },
      {
        num: "5",
        title: "Session Archival",
        desc: "Fires interview:stream-end and stores full conversation transcript to InterviewSession in MongoDB.",
      },
    ],
  },
  {
    id: "flow-4",
    number: "04",
    name: "Job Match & Export",
    tag: "Skill Gap & PDF/DOCX Gen",
    summary:
      "Skill Gap Analysis, context-aware Cover Letter creation, and ATS-ready export.",
    steps: [
      {
        num: "1",
        title: "Skill Gap Analysis",
        desc: "AI cross-references candidate resume against target Job Description (JD) to highlight missing keywords.",
      },
      {
        num: "2",
        title: "Cover Letter Gen",
        desc: "Synthesizes user career profile with employer JD requirements to draft high-impact cover letters.",
      },
      {
        num: "3",
        title: "Document Export",
        desc: "DocumentGeneratorHelper (pdfkit / docx) renders standardized, ATS-parseable downloadable files.",
      },
    ],
  },
];
