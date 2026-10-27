import { Github, GitCommit, RefreshCw, Code2, Users, Calendar } from "lucide-react";

export const DevGitHubCard = ({
  gitStats,
  loading,
  isRefreshing,
  onRefresh,
  getRelativeTime,
}) => {
  return (
    <div className="bg-card/40 backdrop-blur-md border border-border/70 rounded-2xl p-6 shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:border-primary/30 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <Github className="h-5 w-5 text-primary" />
            GitHub Activity
          </h3>
          <button
            type="button"
            onClick={onRefresh}
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
                    {gitStats.latestCommit.repo.split("/")[1] ||
                      gitStats.latestCommit.repo}
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
  );
};

export default DevGitHubCard;
