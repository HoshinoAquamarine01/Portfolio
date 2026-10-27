import { useState, useEffect } from "react";
import { Activity } from "lucide-react";
import { FALLBACK_GITHUB_DATA } from "@/data/devDashboardData";
import { DevStatusCard } from "./dashboard/DevStatusCard";
import { DevGitHubCard } from "./dashboard/DevGitHubCard";
import { DevRoadmapCard } from "./dashboard/DevRoadmapCard";

const DevDashboard = () => {
  const [gitStats, setGitStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

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

  const fetchGitHubStats = async (isManual = false) => {
    if (isManual) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const cachedData = localStorage.getItem("github_dev_dashboard_stats_v2");
      const cachedTime = localStorage.getItem(
        "github_dev_dashboard_stats_time_v2"
      );

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

      const userResponse = await fetch(
        "https://api.github.com/users/HoshinoAquamarine01"
      );

      if (!userResponse.ok) {
        throw new Error("GitHub user API failed");
      }

      const userData = await userResponse.json();
      let latestCommit = null;

      try {
        const reposResponse = await fetch(
          "https://api.github.com/users/HoshinoAquamarine01/repos?sort=pushed&per_page=1"
        );
        if (reposResponse.ok) {
          const repos = await reposResponse.json();
          if (repos && repos.length > 0) {
            const latestRepo = repos[0];
            const commitsResponse = await fetch(
              `https://api.github.com/repos/${latestRepo.full_name}/commits?per_page=1`
            );
            if (commitsResponse.ok) {
              const commits = await commitsResponse.json();
              if (commits && commits.length > 0) {
                latestCommit = {
                  message: commits[0].commit.message,
                  repo: latestRepo.full_name,
                  created_at:
                    commits[0].commit.committer?.date ||
                    commits[0].commit.author?.date ||
                    latestRepo.pushed_at,
                };
              }
            }
          }
        }
      } catch (err) {
        console.warn("Could not fetch latest commit detail", err);
      }

      const compiledStats = {
        public_repos: userData.public_repos,
        followers: userData.followers,
        avatar_url: userData.avatar_url,
        latestCommit: latestCommit || FALLBACK_GITHUB_DATA.latestCommit,
      };

      localStorage.setItem(
        "github_dev_dashboard_stats_v2",
        JSON.stringify(compiledStats)
      );
      localStorage.setItem(
        "github_dev_dashboard_stats_time_v2",
        String(Date.now())
      );

      setGitStats(compiledStats);
    } catch (error) {
      console.warn(
        "GitHub API failed or was rate limited, using fallback data",
        error
      );
      setGitStats(FALLBACK_GITHUB_DATA);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchGitHubStats();
  }, []);

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
            Track real-time work status, live coding metrics from GitHub, and
            current learning progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DevStatusCard
            avatarUrl={gitStats?.avatar_url}
            currentTime={currentTime}
          />
          <DevGitHubCard
            gitStats={gitStats}
            loading={loading}
            isRefreshing={isRefreshing}
            onRefresh={() => fetchGitHubStats(true)}
            getRelativeTime={getRelativeTime}
          />
          <DevRoadmapCard />
        </div>
      </div>
    </section>
  );
};

export default DevDashboard;
