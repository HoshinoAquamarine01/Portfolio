import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import SkillCard from "./SkillCard";
import {
  Search,
  LayoutGrid,
  List,
  Sparkles,
  Code,
  Layers,
  Wrench,
  Database,
  Users,
  X,
  Cpu,
  Star,
} from "lucide-react";

const skills = [
  {
    id: "javascript",
    name: "JavaScript",
    level: 95,
    levelLabel: "Expert",
    category: "frontend",
    color: "#F7DF1E",
    isCore: true,
    tags: ["ES6+", "Async/Await", "DOM", "FP"],
    desc_en: "Core language for web apps, dynamic UI logic, and asynchronous data flows.",
    desc_vi: "Ngôn ngữ cốt lõi cho ứng dụng web, xử lý UI động & luồng dữ liệu bất đồng bộ.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    level: 85,
    levelLabel: "Advanced",
    category: "frontend",
    color: "#3178C6",
    isCore: true,
    tags: ["Generics", "Interfaces", "Type Safety"],
    desc_en: "Strongly typed JavaScript preventing runtime errors in scalable applications.",
    desc_vi: "Lập trình định kiểu chặt chẽ giúp hạn chế lỗi runtime trong dự án quy mô.",
  },
  {
    id: "react",
    name: "React",
    level: 90,
    levelLabel: "Expert",
    category: "frontend",
    color: "#61DAFB",
    isCore: true,
    tags: ["Hooks", "Context API", "Vite", "SPA"],
    desc_en: "Building responsive single-page applications with modern component patterns.",
    desc_vi: "Xây dựng ứng dụng SPA tương tác cao với kiến trúc component tái sử dụng.",
  },
  {
    id: "nodejs",
    name: "Node.js",
    level: 88,
    levelLabel: "Proficient",
    category: "backend",
    color: "#5FA04E",
    isCore: true,
    tags: ["Express", "REST API", "JWT", "Middleware"],
    desc_en: "Scalable server-side event-driven runtime & REST API endpoints architecture.",
    desc_vi: "Server runtime hướng sự kiện xây dựng RESTful API hiệu năng cao.",
  },
  {
    id: "tailwindcss",
    name: "TailwindCSS",
    level: 92,
    levelLabel: "Expert",
    category: "frontend",
    color: "#38BDF8",
    isCore: true,
    tags: ["Utility-First", "Responsive", "Glassmorphism"],
    desc_en: "Utility-first CSS framework for rapid modern UI development.",
    desc_vi: "Framework CSS utility-first giúp thiết kế giao diện hiện đại & responsive nhanh chóng.",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    level: 82,
    levelLabel: "Proficient",
    category: "database",
    color: "#47A248",
    isCore: false,
    tags: ["Mongoose", "Aggregation", "NoSQL"],
    desc_en: "Document-based NoSQL database modeling and aggregation pipelines.",
    desc_vi: "Cơ sở dữ liệu NoSQL lưu trữ tài liệu linh hoạt & tối ưu truy vấn.",
  },
  {
    id: "sqlserver",
    name: "SQL Server",
    level: 85,
    levelLabel: "Proficient",
    category: "database",
    color: "#CC292B",
    isCore: true,
    tags: ["Relational DB", "Queries", "Indexing"],
    desc_en: "Relational database design, stored procedures, and query tuning.",
    desc_vi: "Thiết kế CSDL quan hệ, viết query tối ưu và quản trị toàn vẹn dữ liệu.",
  },
  {
    id: "git",
    name: "Git",
    level: 88,
    levelLabel: "Advanced",
    category: "tools",
    color: "#F05032",
    isCore: true,
    tags: ["GitHub", "Git Flow", "Rebase", "PRs"],
    desc_en: "Distributed version control system for smooth team collaboration.",
    desc_vi: "Hệ thống quản lý phiên bản mã nguồn chuyên nghiệp cho làm việc nhóm.",
  },
  {
    id: "htmlcss",
    name: "HTML & CSS",
    level: 95,
    levelLabel: "Expert",
    category: "frontend",
    color: "#E34F26",
    isCore: true,
    tags: ["Semantic HTML", "Flexbox", "Grid", "WCAG"],
    desc_en: "Clean semantic markup and complex responsive layout designs.",
    desc_vi: "Cấu trúc HTML chuẩn SEO & layout CSS phức tạp với Flexbox/Grid.",
  },
  {
    id: "docker",
    name: "Docker",
    level: 75,
    levelLabel: "Intermediate",
    category: "tools",
    color: "#2496ED",
    isCore: false,
    tags: ["Containers", "Compose", "Deployment"],
    desc_en: "Containerization platform ensuring dev-to-prod environment parity.",
    desc_vi: "Đóng gói ứng dụng vào container đảm bảo nhất quán môi trường triển khai.",
  },
  {
    id: "figma",
    name: "Figma",
    level: 70,
    levelLabel: "Intermediate",
    category: "tools",
    color: "#F24E1E",
    isCore: false,
    tags: ["UI/UX", "Wireframes", "Design Specs"],
    desc_en: "Designing UI prototypes, wireframes, and developer design system handoff.",
    desc_vi: "Thiết kế wireframe, giao diện UI/UX và tra cứu quy chuẩn thiết kế.",
  },
  {
    id: "jira",
    name: "Jira",
    level: 78,
    levelLabel: "Intermediate",
    category: "tools",
    color: "#0052CC",
    isCore: false,
    tags: ["Agile", "Scrum", "Sprints", "Tasks"],
    desc_en: "Project task management, sprint tracking, and team workflow coordination.",
    desc_vi: "Quản lý tiến độ công việc, sprint và phối hợp làm việc theo Agile/Scrum.",
  },
  {
    id: "communication",
    name: "Communication",
    category: "soft",
    color: "#38BDF8",
    isCore: false,
    tags: ["Active Listening", "Clarity", "Cross-team"],
    desc_en: "Clear articulation of ideas, requirements, and engineering choices.",
    desc_vi: "Giao tiếp rõ ràng, lắng nghe tích cực và truyền đạt ý tưởng hiệu quả.",
  },
  {
    id: "teamwork",
    name: "Teamwork",
    category: "soft",
    color: "#34D399",
    isCore: false,
    tags: ["Collaboration", "Peer Review", "Empathy"],
    desc_en: "Collaborative mindset with focus on shared goals and team growth.",
    desc_vi: "Làm việc nhóm ăn ý, tôn trọng ý kiến đồng đội và cùng đạt mục tiêu.",
  },
  {
    id: "problemsolving",
    name: "Problem Solving",
    category: "soft",
    color: "#FBBF24",
    isCore: false,
    tags: ["Debugging", "Analytical", "Root Cause"],
    desc_en: "Structured approach to diagnosing root cause issues and finding solutions.",
    desc_vi: "Phương pháp tư duy hệ thống để tìm ra nguyên nhân gốc rễ và xử lý sự cố.",
  },
  {
    id: "timemanagement",
    name: "Time Management",
    category: "soft",
    color: "#C084FC",
    isCore: false,
    tags: ["Prioritization", "Deadlines", "Focus"],
    desc_en: "Efficient planning to meet deadlines without compromising code quality.",
    desc_vi: "Quản lý thời gian hiệu quả, hoàn thành công việc đúng hạn với chất lượng tốt.",
  },
  {
    id: "criticalthinking",
    name: "Critical Thinking",
    category: "soft",
    color: "#FB7185",
    isCore: false,
    tags: ["Trade-offs", "Architecture", "Analysis"],
    desc_en: "Analyzing trade-offs before implementing architecture choices.",
    desc_vi: "Phân tích và đánh giá đa chiều các giải pháp trước khi ra quyết định kỹ thuật.",
  },
  {
    id: "adaptability",
    name: "Adaptability",
    category: "soft",
    color: "#818CF8",
    isCore: false,
    tags: ["Fast Learner", "Agile", "New Stacks"],
    desc_en: "Quickly learning new tech tools and adapting to evolving requirements.",
    desc_vi: "Học hỏi nhanh các công nghệ mới và linh hoạt thích ứng với sự thay đổi.",
  },
];

const categoryList = [
  { id: "all", labelKey: "skills.all", icon: Layers },
  { id: "frontend", labelKey: "skills.frontend", icon: Code },
  { id: "backend", labelKey: "skills.backend", icon: Cpu },
  { id: "database", labelKey: "skills.database", icon: Database },
  { id: "tools", labelKey: "skills.devops", icon: Wrench },
  { id: "soft", labelKey: "skills.soft", icon: Users },
];

const SkillSection = () => {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("card"); // 'card' | 'compact'

  // Filter skills based on category and search query
  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        activeCategory === "all" || skill.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();

      if (!query) return matchesCategory;

      const desc = lang === "vi" ? skill.desc_vi : skill.desc_en;
      const tagsString = skill.tags ? skill.tags.join(" ") : "";

      const matchesSearch =
        skill.name.toLowerCase().includes(query) ||
        skill.category.toLowerCase().includes(query) ||
        (desc && desc.toLowerCase().includes(query)) ||
        tagsString.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, lang]);

  // Category item counts
  const counts = useMemo(() => {
    const map = { all: skills.length };
    skills.forEach((s) => {
      map[s.category] = (map[s.category] || 0) + 1;
    });
    return map;
  }, []);

  const coreSkillsCount = useMemo(
    () => skills.filter((s) => s.isCore).length,
    []
  );
  const techSkillsCount = useMemo(
    () => skills.filter((s) => s.category !== "soft").length,
    []
  );
  const softSkillsCount = useMemo(
    () => skills.filter((s) => s.category === "soft").length,
    []
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/20 overflow-hidden">
      {/* Background Decor Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Tech Ecosystem
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            {t("skills.title") || "Skills & Mastery"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            {t("skills.subtitle") ||
              "Comprehensive tech stack and proficiencies across modern software engineering."}
          </p>
        </div>

        {/* Stats Summary Highlights Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
          <div className="bg-card/70 backdrop-blur-md border border-border/80 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-foreground">{techSkillsCount}+</div>
              <div className="text-xs text-muted-foreground font-medium">
                {t("skills.statsTech") || "Tech Stack Items"}
              </div>
            </div>
          </div>

          <div className="bg-card/70 backdrop-blur-md border border-border/80 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Star className="w-6 h-6 fill-amber-400/30" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-foreground">{coreSkillsCount}</div>
              <div className="text-xs text-muted-foreground font-medium">
                {t("skills.statsCore") || "Core Stack Focus"}
              </div>
            </div>
          </div>

          <div className="bg-card/70 backdrop-blur-md border border-border/80 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-foreground">{softSkillsCount}</div>
              <div className="text-xs text-muted-foreground font-medium">
                {t("skills.statsSoft") || "Soft Skills"}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search Bar Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 w-full md:w-auto">
            {categoryList.map((cat) => {
              const IconComp = cat.icon;
              const count = counts[cat.id] || 0;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(167,139,250,0.4)] scale-105"
                      : "bg-card/90 border border-border/70 text-muted-foreground hover:text-foreground hover:bg-secondary/80 hover:scale-[1.02]"
                  )}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{t(cat.labelKey) || cat.id}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded-full font-semibold",
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box & View Mode Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-between md:justify-end">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("skills.searchPlaceholder") || "Search skills..."}
                className="w-full pl-9 pr-8 py-2 bg-card/90 border border-border/80 rounded-xl text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center bg-card/90 border border-border/80 rounded-xl p-1 shrink-0">
              <button
                onClick={() => setViewMode("card")}
                title={t("skills.viewCards") || "Detailed Cards"}
                className={cn(
                  "p-1.5 rounded-lg transition-colors cursor-pointer",
                  viewMode === "card"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("compact")}
                title={t("skills.viewCompact") || "Compact Matrix"}
                className={cn(
                  "p-1.5 rounded-lg transition-colors cursor-pointer",
                  viewMode === "compact"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Skill Grid / Compact List */}
        {filteredSkills.length > 0 ? (
          <div
            className={cn(
              "grid gap-6 transition-all duration-300",
              viewMode === "card"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            )}
          >
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card/40 rounded-2xl border border-dashed border-border/70 p-8">
            <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3 animate-bounce" />
            <h3 className="text-lg font-bold text-foreground mb-1">
              {t("skills.noResults") || "No skills found"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try searching with another keyword or change category filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-xl hover:shadow-md transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillSection;
