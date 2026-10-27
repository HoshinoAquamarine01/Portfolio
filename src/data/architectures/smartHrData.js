export const smartHrStages = [
  {
    id: "stage-1",
    number: "01",
    name: "Ingestion & Multi-Strategy OCR",
    tag: "PDF • DOCX • Tesseract OCR",
    summary:
      "Intake of diverse CV formats, automated MIME-type routing, and regex sanitization reducing prompt tokens by 25-40%.",
    steps: [
      {
        num: "1",
        title: "Multi-Format Upload",
        desc: "HR recruiters upload diverse candidate CV formats (multi-column PDFs, tables in DOCX, or scanned certificate/CV images) alongside Job Description (JD) criteria via React 19 UI.",
      },
      {
        num: "2",
        title: "MIME-Type Routing",
        desc: "CvController / Multer intercept and validate file sizes, routing dynamically: pdf-parse for stream text; mammoth for Word XML; tesseract.js for scanned image OCR.",
      },
      {
        num: "3",
        title: "Regex Token Sanitizer",
        desc: "TextSanitizerUtil removes unprintable control characters (\\u0000-\\u001F) and collapses sequential newlines (\\n{3,} -> \\n\\n), reducing prompt token overhead by 25-40%.",
      },
      {
        num: "4",
        title: "Token Optimization Check",
        desc: "Enforces minimum text length (>= 30 characters), normalizing cleaned raw text before feeding into the structured AI extraction pipeline.",
      },
    ],
  },
  {
    id: "stage-2",
    number: "02",
    name: "Structured AI Extraction & Fallback",
    tag: "Gemini 2.0 Flash ➔ OpenAI GPT-4o-mini",
    summary:
      "Guarantees Zero Schema Violation via native responseSchema and an automated multi-provider fallback chain.",
    steps: [
      {
        num: "1",
        title: "Primary: Gemini 2.0 Flash",
        desc: "Leverages @google/genai SDK with responseMimeType: 'application/json' and responseSchema CV_EXTRACTION_GEMINI_SCHEMA (constraining token sampling directly).",
      },
      {
        num: "2",
        title: "Secondary: OpenAI GPT-4o-mini",
        desc: "Automatically triggered upon network timeouts or HTTP 429 Rate Limits, using Zod Structured Outputs to guarantee 100% schema consistency.",
      },
      {
        num: "3",
        title: "Offline Mock & Heuristic Regex",
        desc: "Final resilient fallback extracting candidate profile entities via heuristic regex patterns during network outages or test runs.",
      },
      {
        num: "4",
        title: "StandardCvProfile Persistence",
        desc: "Normalized JSON entity (personalInfo, workExperience, skills, education, certifications) is persisted to MongoDB (Candidates & CVs collections).",
      },
    ],
  },
  {
    id: "stage-3",
    number: "03",
    name: "Multi-Dimensional Scoring Engine",
    tag: "45% Skill • 35% Exp • 20% Domain",
    summary:
      "Mathematical weighted-scoring model evaluating candidate CV against Job Description (JD) hiring criteria.",
    steps: [
      {
        num: "1",
        title: "Skill Fit (45% Weight)",
        desc: "Categorized into Must-have (75% skill weight) and Nice-to-have (25%). Features Semantic & Synonym Mapping (NestJS ↔ Node.js, MongoDB ↔ NoSQL).",
      },
      {
        num: "2",
        title: "Seniority & Experience Fit (35% Weight)",
        desc: "Compares verified years of experience against JD baseline, applying a linear penalty for experience shortfalls.",
      },
      {
        num: "3",
        title: "Domain Relevance (20% Weight)",
        desc: "Measures industry vertical alignment (Fintech, SaaS, E-commerce) alongside academic degree and professional certification relevance.",
      },
      {
        num: "4",
        title: "Total Match Score: 0 - 100%",
        desc: "Calculates composite metric: S_total = 0.45*S_skill + 0.35*S_exp + 0.20*S_domain paired with detailed Skill Gap Analysis.",
      },
    ],
  },
  {
    id: "stage-4",
    number: "04",
    name: "Adaptive Interview & Assessment",
    tag: "Deep-Dive Probing & Tailored Tests",
    summary:
      "Dynamically generates deep-dive technical interview questions and seniority-calibrated coding assessments.",
    steps: [
      {
        num: "1",
        title: "Skill Gap Synthesis",
        desc: "Synthesizes detected skill gaps (JD competencies missing on CV) with candidate standout projects to pinpoint targeted probing areas.",
      },
      {
        num: "2",
        title: "Technical Probing Questions",
        desc: "LLM generates 3-5 in-depth technical inquiry questions accompanied by reference evaluation rubrics for hiring managers.",
      },
      {
        num: "3",
        title: "Adaptive Coding Challenge",
        desc: "Generates tailored mini-case studies and coding tasks calibrated dynamically to candidate seniority (Junior / Mid / Senior).",
      },
      {
        num: "4",
        title: "HR Analytics & Ranking",
        desc: "Visualizes candidate fit breakdown on dashboard analytics, calculates applicant rankings, and suggests optimal hiring recommendations.",
      },
    ],
  },
];
