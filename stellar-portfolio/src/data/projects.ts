export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: { demo?: string; repo?: string };
};

const projects: Project[] = [
  {
    slug: "realtime-analytics",
    title: "Realtime Analytics Dashboard",
    description:
      "High-throughput analytics platform with live charts, row‑level security, and edge caching. 99.9% uptime and sub‑100ms p95.",
    image: "/project-placeholder.svg",
    tags: ["Next.js", "TypeScript", "WebSockets", "PostgreSQL"],
    links: { demo: "#", repo: "#" }
  },
  {
    slug: "design-system",
    title: "Design System & Component Library",
    description:
      "Accessible, themeable component system powering multiple apps. Automated visual regression tests and story-driven docs.",
    image: "/project-placeholder.svg",
    tags: ["React", "TypeScript", "Storybook", "Testing"],
    links: { demo: "#", repo: "#" }
  },
  {
    slug: "ml-tooling",
    title: "ML Experiment Management",
    description:
      "End-to-end tooling for dataset versioning, experiment tracking, and deployment. Reduced iteration time by 40%.",
    image: "/project-placeholder.svg",
    tags: ["Node.js", "GraphQL", "Docker", "CI/CD"],
    links: { demo: "#", repo: "#" }
  }
];

export default projects;
