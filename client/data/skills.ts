export type SkillCategory = "frontend" | "tools" | "ai";

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
}

export const skillCategories: { id: SkillCategory; label: string }[] = [
  { id: "frontend", label: "Frontend" },
  { id: "tools", label: "Tools" },
  { id: "ai", label: "AI Stack" },
];

export const technologies: Skill[] = [
  { name: "HTML5", icon: "SiHtml5", category: "frontend" },
  { name: "CSS", icon: "SiCss", category: "frontend" },
  { name: "JavaScript", icon: "SiJavascript", category: "frontend" },
  { name: "React", icon: "SiReact", category: "frontend" },
  { name: "Next.js", icon: "SiNextdotjs", category: "frontend" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", category: "frontend" },
  { name: "Bootstrap", icon: "SiBootstrap", category: "frontend" },
  { name: "Git", icon: "SiGit", category: "tools" },
  { name: "GitHub", icon: "SiGithub", category: "tools" },
  { name: "Firebase", icon: "SiFirebase", category: "tools" },
  { name: "Vercel", icon: "SiVercel", category: "tools" },
  { name: "Figma", icon: "SiFigma", category: "tools" },
  { name: "VS Code", icon: "VscVscode", category: "tools" },
  { name: "npm", icon: "SiNpm", category: "tools" },
  { name: "Vite", icon: "SiVite", category: "tools" },
  { name: "ChatGPT", icon: "RiOpenaiFill", category: "ai" },
  { name: "Claude", icon: "SiClaude", category: "ai" },
  { name: "Gemini", icon: "SiGooglegemini", category: "ai" },
  { name: "Cursor AI", icon: "SiCursor", category: "ai" },
];

export interface Stat {
  label: string;
  value: number;
}

export const stats: Stat[] = [
  { label: "Years Experience", value: 3 },
  { label: "Projects Delivered", value: 15 },
  { label: "Happy Clients", value: 10 },
];
