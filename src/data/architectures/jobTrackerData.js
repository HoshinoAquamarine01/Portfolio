export const jobTrackerFlows = [
  {
    id: "flow-1",
    number: "01",
    name: "Kanban Tracking & Reporting",
    tag: "Drag & Drop • Audit • Excel/PDF",
    summary:
      "Kanban card state lifecycle, optimistic updates, audit log mutation tracking, and client-side reporting exports.",
    steps: [
      {
        num: "1",
        title: "Drag & Drop Interaction",
        desc: "Candidate moves job cards across Kanban columns (Applied ➔ Screening ➔ Interview ➔ Offer ➔ Rejected).",
      },
      {
        num: "2",
        title: "Optimistic State & PATCH API",
        desc: "UI updates optimistically and dispatches PATCH /api/jobs/:id with updated status, notes, and interview dates.",
      },
      {
        num: "3",
        title: "Atomic MongoDB Update",
        desc: "Backend executes findOneAndUpdate({ _id: id, userId: req.user._id }), enforcing tenant data isolation.",
      },
      {
        num: "4",
        title: "Mutation Audit Logging",
        desc: "AuditLogMiddleware records ACTION: UPDATE_JOB containing user IP, endpoint, and payload to MongoDB.",
      },
      {
        num: "5",
        title: "Client-Side Export Engine",
        desc: "Candidate exports tracking metrics directly into professional Excel spreadsheets (xlsx) or PDF reports (jsPDF).",
      },
    ],
  },
  {
    id: "flow-2",
    number: "02",
    name: "Voice AI Mock Interview",
    tag: "Web Speech API • Gemini 2.5 / Ollama",
    summary:
      "Real-time voice-to-text transcription, per-question AI rubric scoring, and radar-chart performance analytics.",
    steps: [
      {
        num: "1",
        title: "Role & Question Generation",
        desc: "Candidate selects target job role, seniority level, and tech stack; backend prompts Gemini 2.5 / Ollama to generate structured questions.",
      },
      {
        num: "2",
        title: "Real-Time Voice-to-Text",
        desc: "Web Speech API captures candidate oral responses in browser and transcribes speech into text with zero latency.",
      },
      {
        num: "3",
        title: "Per-Question AI Grading",
        desc: "Backend sends answer to AI model, returning immediate structured JSON: { marks, feedback, modelAnswer }.",
      },
      {
        num: "4",
        title: "Session Evaluation & Radar Chart",
        desc: "Final session evaluation aggregates scores into radar charts, categorizing technical depth, communication, and key strengths.",
      },
      {
        num: "5",
        title: "MockInterviewSession Save",
        desc: "Entire transcript, question history, and rubric feedback are permanently stored in MockInterviewSession on MongoDB.",
      },
    ],
  },
  {
    id: "flow-3",
    number: "03",
    name: "Automated VietQR & SePay IPN",
    tag: "VietQR • Webhook IPN • Zero Reload",
    summary:
      "Dynamic banking QR code generation, automated SePay webhook reconciliation, and zero-reload Socket.IO plan upgrades.",
    steps: [
      {
        num: "1",
        title: "Plan Selection & Transfer Code",
        desc: "User selects PRO/VIP plan; backend generates Transaction record (status: 'PENDING', transferCode: 'APP_XXXX').",
      },
      {
        num: "2",
        title: "Dynamic VietQR Rendering",
        desc: "Client displays VietQR code embedding destination account, exact price, and unique transfer description.",
      },
      {
        num: "3",
        title: "Mobile Banking & SePay Callback",
        desc: "User transfers money via bank app; SePay payment gateway triggers instant webhook IPN POST /api/payments/sepay-webhook.",
      },
      {
        num: "4",
        title: "HMAC Reconciliation & Upgrade",
        desc: "Server validates payment signature and transferCode, marks Transaction as 'COMPLETED', and elevates User plan to PRO.",
      },
      {
        num: "5",
        title: "Socket.IO Push Upgrade",
        desc: "Emits PAYMENT_SUCCESS event directly to user_${userId} room; client UI refreshes VIP status instantly without page reload.",
      },
    ],
  },
  {
    id: "flow-4",
    number: "04",
    name: "Real-Time Chat & Notifications",
    tag: "Private Rooms • Typing Indicators",
    summary:
      "1-on-1 direct candidate chat, room isolation, real-time typing indicators, read receipts, and system broadcast alerts.",
    steps: [
      {
        num: "1",
        title: "Authenticated Handshake",
        desc: "Socket.IO client authenticates via JWT, entering private user_${userId} channel and broadcasting online presence.",
      },
      {
        num: "2",
        title: "Direct Chat Room Isolation",
        desc: "Joining 1-on-1 conversations binds sockets to isolated room conv_${sortedIds}, ensuring strict conversation boundaries.",
      },
      {
        num: "3",
        title: "Typing Status & Read Receipts",
        desc: "Dispatches typing, stopTyping, and markAsRead events in real time to the active conversation counterpart.",
      },
      {
        num: "4",
        title: "Targeted & Global Push",
        desc: "Server issues emitUserNotification for interview reminders and connection invites, or broadcastNotification for system announcements.",
      },
    ],
  },
  {
    id: "flow-5",
    number: "05",
    name: "Audit Trail & Maintenance Guard",
    tag: "Audit Log MW • Redis 503 Guard",
    summary:
      "Enterprise-grade mutation logging and Redis-cached maintenance mode blocking non-admin traffic with HTTP 503.",
    steps: [
      {
        num: "1",
        title: "Mutating Request Interception",
        desc: "AuditLogMiddleware intercepts all mutating HTTP verbs (POST, PUT, PATCH, DELETE) before reaching router handlers.",
      },
      {
        num: "2",
        title: "Security Metadata Capture",
        desc: "Captures userId, IP address, HTTP method, endpoint, user-agent, and sanitized payload into AuditLog collection.",
      },
      {
        num: "3",
        title: "Redis Maintenance Flag",
        desc: "Admin toggles system maintenance via /api/system/maintenance, storing the operational flag in Redis cache.",
      },
      {
        num: "4",
        title: "HTTP 503 Gatekeeping",
        desc: "Maintenance guard checks Redis cache, serving HTTP 503 Service Unavailable to standard users while permitting admin access.",
      },
    ],
  },
];
