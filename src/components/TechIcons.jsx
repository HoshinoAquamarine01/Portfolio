import React from "react";
import {
  MessageSquare,
  Users,
  Lightbulb,
  Clock,
  Brain,
  Sparkles,
  Zap,
  Code2,
} from "lucide-react";

export const TechIcon = ({ name, className = "w-6 h-6", color }) => {
  const iconMap = {
    javascript: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fill="#F7DF1E" d="M0 0h24v24H0z" />
        <path fill="#000" d="M6.4 17.5c.4.7 1.1 1.2 2.1 1.2 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.1-1.9-1.6l-.6-.3c-1.8-.8-3-1.8-3-3.9 0-2.2 1.7-3.7 4.3-3.7 1.8 0 3.1.6 3.9 2.1l-1.9 1.2c-.4-.8-1-1.1-2-1.1-1 0-1.5.4-1.5 1 0 .7.5 1 1.7 1.5l.6.3c2.1.9 3.2 1.9 3.2 4 0 2.4-1.9 3.9-4.7 3.9-2.6 0-4.1-1.3-4.8-2.7l2-1.3zm8.4.2c.4.8 1.1 1.3 2.2 1.3 1.1 0 1.8-.5 1.8-1.5 0-1-.7-1.4-1.7-1.8l-.7-.3c-1.4-.6-2.3-1.2-2.3-2.6 0-1.5 1.2-2.7 3.2-2.7 1.5 0 2.5.6 3.2 1.7l-1.6 1c-.3-.5-.8-.8-1.5-.8-.7 0-1.1.4-1.1.9 0 .5.4.8 1.3 1.2l.7.3c1.7.7 2.7 1.4 2.7 3 0 1.9-1.5 2.9-3.8 2.9-2.3 0-3.6-1.1-4.2-2.4l1.8-1.2z" />
      </svg>
    ),
    react: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      </svg>
    ),
    nodejs: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fill="#5FA04E" d="M12 1.5l10 5.8v11.4L12 24.5l-10-5.8V7.3L12 1.5zm0 3.2L4 9v6l8 4.3 8-4.3V9l-8-4.3z" />
        <path fill="#5FA04E" d="M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
      </svg>
    ),
    tailwindcss: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fill="#38BDF8" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    ),
    mongodb: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fill="#47A248" d="M12 1.5s-6 6.8-6 12.2a6 6 0 0 0 11.7 1.8c.2-.7.3-1.4.3-2 0-5.4-6-12-6-12zm-.3 18.2c-.4 0-.7-.3-.7-.7V10c0-.4.3-.7.7-.7s.7.3.7.7v9c0 .4-.3.7-.7.7z" />
      </svg>
    ),
    git: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fill="#F05032" d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.7 4.7l2.7 2.7c.6-.2 1.3 0 1.8.5.5.5.7 1.2.5 1.8l2.6 2.6c.6-.2 1.3 0 1.8.5.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.5-.5-.7-1.3-.5-1.8L12.7 11v4.7c.3.2.5.5.5.9 0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-.4.2-.8.5-1.1V10.7c-.3-.2-.5-.5-.5-.9 0-.5.2-.9.6-1.2L7.6 5.9 2.4 11c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.6.1-2.2z" />
      </svg>
    ),
    htmlcss: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M2 3l1.8 15.6L12 21l8.2-2.4L22 3H2z" fill="#E34F26" />
        <path d="M12 4.8v14.4l6.6-1.9L20.1 4.8H12z" fill="#1572B6" />
        <path d="M6.5 7.5h11L17 10H9.5l.3 3.5h6.7L16 16.5 12 17.6 8 16.5l-.3-3H10l.1 1.3 1.9.5 1.9-.5.2-2H6.8L6.5 7.5z" fill="#FFF" />
      </svg>
    ),
    typescript: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fill="#3178C6" d="M0 0h24v24H0z" />
        <path fill="#FFF" d="M11.8 12.8h-2.1v6.8H7.3v-6.8H5.2V11h6.6v1.8zm2.7 5.2c.5.3 1.2.5 2 .5.9 0 1.4-.4 1.4-1 0-.6-.4-.9-1.4-1.3l-.7-.3c-1.5-.6-2.4-1.4-2.4-2.8 0-1.8 1.4-3.1 3.7-3.1 1.2 0 2.2.3 2.9.8l-.7 1.6c-.6-.4-1.3-.6-2.1-.6-.9 0-1.4.4-1.4 1 0 .6.4.9 1.4 1.3l.7.3c1.7.7 2.5 1.5 2.5 2.9 0 2-1.6 3.1-4 3.1-1.3 0-2.5-.4-3.3-1l.8-1.4z" />
      </svg>
    ),
    docker: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fill="#2496ED" d="M13.98 11.08h2.12v2.05h-2.12zm-3.1 0h2.12v2.05H10.88zm-3.1 0h2.11v2.05H7.78zm-3.1 0h2.11v2.05H4.68zm9.3-3.08h2.12v2.05h-2.12zm-3.1 0h2.12v2.05H10.88zm-3.1 0h2.11v2.05H7.78zm3.1-3.07h2.12v2.05H10.88zM1.2 14.5c.3 3.6 3.2 6.5 8.8 6.5 6 0 10.3-3.6 11.6-8.2.4.1.9.1 1.4 0 .4-.1.8-.3 1-.6-.5-.4-1.2-.5-1.9-.4-.3-1.6-1.5-3.3-3.6-3.8l-.4-.1-.2.4c-.6 1-1.5 1.7-2.6 2H1.2v4.2z" />
      </svg>
    ),
    figma: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83" />
        <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF" />
        <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#F24E1E" />
        <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262" />
        <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#1ABCFE" />
      </svg>
    ),
    jira: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fill="#0052CC" d="M11.5 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10 10 10 0 0 0-10-10zm-1.8 14.5l-4.2-4.2 1.4-1.4 2.8 2.8 6.4-6.4 1.4 1.4-7.8 7.8z" />
      </svg>
    ),
    sqlserver: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fill="#CC292B" d="M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zm0 3c4.42 0 8 1.34 8 2s-3.58 2-8 2-8-1.34-8-2 3.58-2 8-2zm0 5c4.42 0 8 1.34 8 2s-3.58 2-8 2-8-1.34-8-2 3.58-2 8-2zm0 5c4.42 0 8 1.34 8 2s-3.58 2-8 2-8-1.34-8-2 3.58-2 8-2z" />
      </svg>
    ),
    communication: <MessageSquare className={`${className} text-sky-400`} />,
    teamwork: <Users className={`${className} text-emerald-400`} />,
    problemsolving: <Lightbulb className={`${className} text-amber-400`} />,
    timemanagement: <Clock className={`${className} text-purple-400`} />,
    criticalthinking: <Brain className={`${className} text-rose-400`} />,
    adaptability: <Zap className={`${className} text-indigo-400`} />,
  };

  const normalized = name.toLowerCase().replace(/[^a-z]/g, "");
  return (
    iconMap[normalized] || (
      <Code2 className={className} style={{ color: color || "#A78BFA" }} />
    )
  );
};
