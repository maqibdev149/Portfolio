export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  type: "Full-time" | "Internship" | "Freelance";
  points: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "onixs-ai",
    company: "Onixs AI",
    role: "Frontend Developer",
    duration: "2025 — Present",
    type: "Full-time",
    points: [
      "Leading frontend development across multiple client projects",
      "Coordinating design-to-development handoff with developers using Cursor AI",
      "Delivering pixel-perfect, responsive React websites for real clients",
      "Improving component architecture and frontend performance across deliverables",
    ],
  },
  {
    id: "sss-group",
    company: "SSS Group",
    role: "Frontend Development Intern",
    duration: "Earlier",
    type: "Internship",
    points: [
      "Gained hands-on experience building responsive web interfaces",
      "Created reusable UI components and improved page consistency",
      "Strengthened frontend development fundamentals",
      "Developed a detail-focused approach to clean, maintainable code",
    ],
  },
];
