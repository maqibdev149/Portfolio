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
      "Ensuring QA-driven quality processes across all deliverables",
    ],
  },
  {
    id: "sss-group",
    company: "SSS Group",
    role: "Web Development & QA Intern",
    duration: "Earlier",
    type: "Internship",
    points: [
      "Gained hands-on experience in software quality assurance",
      "Built foundation in testing methodologies and bug reporting",
      "Learned frontend development fundamentals",
      "Developed detail-obsessed approach that now informs development practices",
    ],
  },
];
