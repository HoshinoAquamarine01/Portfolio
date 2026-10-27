import { Briefcase, Cpu, UserRoundSearch } from "lucide-react";

export const recruiterActions = [
  {
    id: "projects",
    title: "Jump to Projects",
    description: "See production-style projects first",
    shortcut: "1",
    icon: Briefcase,
    action: () => {
      document
        .querySelector("#projects")
        ?.scrollIntoView({ behavior: "smooth" });
    },
  },
  {
    id: "skills",
    title: "Jump to Skills",
    description: "Review technical strengths quickly",
    shortcut: "2",
    icon: Cpu,
    action: () => {
      document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" });
    },
  },
  {
    id: "contact",
    title: "Jump to Contact",
    description: "Start a conversation immediately",
    shortcut: "3",
    icon: UserRoundSearch,
    action: () => {
      document
        .querySelector("#contact")
        ?.scrollIntoView({ behavior: "smooth" });
    },
  },
];

export const faqItems = [
  {
    question: "Are you available for new opportunities and when can you start?",
    answer: "Yes, I am actively seeking Full-Stack or Front-End Developer roles (Intern/Fresher/Junior). I can start immediately with a 0-day notice period.",
  },
  {
    question: "What is your preferred work arrangement and location?",
    answer: "I am based in Ho Chi Minh City, Vietnam and prefer On-site or Hybrid work arrangements to collaborate closely with the team. I am also open to Remote opportunities.",
  },
  {
    question: "What are your core technical strengths?",
    answer: "I specialize in building full-stack web applications with React, Node.js, Express, and MongoDB (MERN Stack). I have strong experience in TypeScript, SQL Server, design patterns, API security (RBAC/DAC), and Git workflow.",
  },
  {
    question: "What is your English proficiency level?",
    answer: "I have intermediate English proficiency. I am comfortable reading/writing technical documentation, writing clean code comments, and discussing technical concepts.",
  },
  {
    question: "What are your current learning and career focus areas?",
    answer: "I am currently focused on mastering NestJS for scalable backend architectures and Next.js for high-performance, SEO-friendly frontend development.",
  },
];

export const recruiterMetrics = [
  { label: "Highlighted Projects", value: "3" },
  { label: "Core Stack Areas", value: "5+" },
  { label: "Preferred Response Time", value: "<24h" },
];
