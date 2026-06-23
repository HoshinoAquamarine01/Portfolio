import { useState, useEffect } from "react";
import {
  Github,
  GitCommit,
  Clock,
  RefreshCw,
  BookOpen,
  Sparkles,
  MapPin,
  Mail,
  Activity,
  Users,
  Code2,
  Calendar,
} from "lucide-react";

// Mock Fallback Data in case of rate limits or offline state
const FALLBACK_GITHUB_DATA = {
  public_repos: 14,
  followers: 4,
  avatar_url: "https://github.com/HoshinoAquamarine01.png",
  latestCommit: {
    message: "feat: add secure auth flow with RBAC & audit logging",
    repo: "HoshinoAquamarine01/Insurance-Managemnt",
    created_at: new Date().toISOString(),
  },
};

const LEARNING_ROADMAP = [
  {
    name: "Next.js",
    progress: 85,
    status: "In Progress",
    description: "App Router, SSR/SSG, Server Components, SEO optimization",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "NestJS",
    progress: 75,
    status: "In Progress",
    description: "RESTful APIs, MVC, Dependency Injection, TypeORM, Guards",
    color: "from-red-500 to-pink-600",
  },
  {
    name: "TypeScript",
    progress: 90,
    status: "Mastered",
    description: "Type safety, generics, advanced utility types, interfaces",
    color: "from-sky-500 to-blue-600",
  },
  {
    name: "Docker & CI/CD",
    progress: 50,
    status: "Learning",
    description: "Containerization, basic deployment pipeline, Dockerfiles",
    color: "from-cyan-500 to-teal-500",
  },
];

const DevDashboard = () => {
  const [gitStats, setGitStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Live Clock Effect for Ho Chi Minh City Time
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setCurrentTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch GitHub Stats
  const fetchGitHubStats = async (isManual = false) => {
    if (isManual) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      // 1. Check LocalStorage Cache (Cache for 15 minutes to prevent rate limiting)
      const cachedData = localStorage.getItem("github_dev_dashboard_stats");
      const cachedTime = localStorage.getItem("github_dev_dashboard_stats_time");

      if (
        !isManual &&
        cachedData &&
        cachedTime &&
        Date.now() - Number(cachedTime) < 15 * 60 * 1000
      ) {
        setGitStats(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      // 2. Fetch from GitHub API
      const userResponse = await fetch(
        "https://api.github.com/users/HoshinoAquamarine01"
      );
      const eventsResponse = await fetch(
        "https://api.github.com/users/HoshinoAquamarine01/events"
      );

      if (!userResponse.ok) {
        throw new Error("GitHub user API failed");
      }

      const userData = await userResponse.json();
      let latestCommit = null;

      if (eventsResponse.ok) {
        const events = await eventsResponse.json();
        // Find the first push event
        const pushEvent = events.find((event) => event.type === "PushEvent");
        if (pushEvent && pushEvent.payload.commits?.length > 0) {
          latestCommit = {
            message: pushEvent.payload.commits[0].message,
            repo: pushEvent.repo.name,
            created_at: pushEvent.created_at,
          };
        }
      }

      const compiledStats = {
        public_repos: userData.public_repos,
        followers: userData.followers,
        avatar_url: userData.avatar_url,
        latestCommit: latestCommit || FALLBACK_GITHUB_DATA.latestCommit,
      };

      // 3. Save Cache
      localStorage.setItem(
        "github_dev_dashboard_stats",
        JSON.stringify(compiledStats)
      );
      localStorage.setItem("github_dev_dashboard_stats_time", String(Date.now()));

      setGitStats(compiledStats);
    } catch (error) {
      console.warn("GitHub API failed or was rate limited, using fallback data", error);
      // Fallback
      setGitStats(FALLBACK_GITHUB_DATA);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchGitHubStats();
  }, []);

  // Helper to format relative time
  const getRelativeTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <section id="dashboard" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Activity className="h-3.5 w-3.5" />
            Live Activity
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Dev Status <span className="text-primary">Dashboard</span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Track real-time work status, live coding metrics from GitHub, and current learning progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Personal Status */}
          <div className="bg-card/40 backdrop-blur-md border border-border/70 rounded-2xl p-6 shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:border-primary/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Current Status
                </h3>
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>

              <div className="flex flex-col items-center text-center my-6">
                <div className="relative mb-4 group">
                  <div className="absolute inset-0 bg-primary rounded-full blur-sm opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <img
                    src={gitStats?.avatar_url || "https://github.com/HoshinoAquamarine01.png"}
                    alt="Developer Avatar"
                    className="w-20 h-20 rounded-full border-2 border-primary/50 relative z-10"
                    onError={(e) => {
                      e.target.src = "https://github.com/HoshinoAquamarine01.png";
                    }}
                  />
                </div>
                <h4 className="font-bold text-lg text-foreground">Phạm Gia Bảo</h4>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  Ho Chi Minh City, Vietnam
                </p>
                <div className="mt-4 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-xs font-semibold uppercase tracking-wider">
                  Active & Open for Work
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/40">
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4.5 w-4.5 text-primary shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Local Time (ICT)</p>
                  <p className="font-mono text-sm font-semibold tracking-wider text-foreground">
                    {currentTime || "--:--:--"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4.5 w-4.5 text-primary shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Contact Email</p>
                  <a
                    href="mailto:phamgiabao141105@gmail.com"
                    className="text-sm font-semibold hover:text-primary transition-colors text-foreground"
                  >
                    phamgiabao141105@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: GitHub Live Stats */}
          <div className="bg-card/40 backdrop-blur-md border border-border/70 rounded-2xl p-6 shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:border-primary/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                  <Github className="h-5 w-5 text-primary" />
                  GitHub Activity
                </h3>
                <button
                  type="button"
                  onClick={() => fetchGitHubStats(true)}
                  disabled={isRefreshing || loading}
                  className={`p-1.5 rounded-lg border border-border bg-card/60 hover:bg-card/90 transition-all text-muted-foreground hover:text-foreground cursor-pointer ${
                    isRefreshing ? "animate-spin text-primary border-primary/50" : ""
                  }`}
                  title="Reload live stats"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>

              {loading ? (
                // Loading Skeleton
                <div className="space-y-6 py-4 animate-pulse">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-muted rounded-xl"></div>
                    <div className="h-20 bg-muted rounded-xl"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                    <div className="h-16 bg-muted rounded-xl"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Stats Count Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card/60 border border-border/50 rounded-xl p-4 text-center group hover:border-primary/40 hover:shadow-md transition-all duration-300">
                      <Code2 className="h-5 w-5 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground font-mono">
                        {gitStats?.public_repos || 0}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Public Repos</p>
                    </div>
                    <div className="bg-card/60 border border-border/50 rounded-xl p-4 text-center group hover:border-primary/40 hover:shadow-md transition-all duration-300">
                      <Users className="h-5 w-5 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground font-mono">
                        {gitStats?.followers || 0}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Followers</p>
                    </div>
                  </div>

                  {/* Latest Commit widget */}
                  {gitStats?.latestCommit && (
                    <div className="bg-card/60 border border-border/50 rounded-xl p-4 text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <GitCommit className="h-4.5 w-4.5 text-primary" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Latest Commit
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground line-clamp-2 italic leading-relaxed">
                        "{gitStats.latestCommit.message}"
                      </p>
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground border-t border-border/30 pt-2.5">
                        <a
                          href={`https://github.com/${gitStats.latestCommit.repo}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-primary transition-colors hover:underline font-mono"
                        >
                          {gitStats.latestCommit.repo.split("/")[1] || gitStats.latestCommit.repo}
                        </a>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {getRelativeTime(gitStats.latestCommit.created_at)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-border/40 text-center">
              <a
                href="https://github.com/HoshinoAquamarine01"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Visit GitHub Profile</span>
              </a>
            </div>
          </div>

          {/* Column 3: Current Roadmap */}
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
                      <span className="font-semibold text-foreground">{roadmap.name}</span>
                      <span className="text-xs font-mono font-semibold text-muted-foreground">
                        {roadmap.progress}%
                      </span>
                    </div>
                    {/* Progress Track */}
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
              <span className="font-semibold text-primary">Next Focus:</span> Master NestJS Microservices, GraphQL, and build SEO-friendly web apps using Next.js.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevDashboard;
