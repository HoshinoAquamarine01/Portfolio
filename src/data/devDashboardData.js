export const FALLBACK_GITHUB_DATA = {
  public_repos: 8,
  followers: 2,
  avatar_url: "https://github.com/HoshinoAquamarine01.png",
  latestCommit: {
    message: "feat: update portfolio components & dynamic dev stats",
    repo: "HoshinoAquamarine01/Portfolio",
    created_at: new Date().toISOString(),
  },
};

export const LEARNING_ROADMAP = [
  {
    name: "Next.js",
    progress: 10,
    status: "In Progress",
    description: "App Router, SSR/SSG, Server Components, SEO optimization",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "NestJS",
    progress: 25,
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
