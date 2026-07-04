export interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: "research",
    number: 1,
    title: "Research",
    description: "Understanding goals, audience, and competitors",
  },
  {
    id: "planning",
    number: 2,
    title: "Planning",
    description: "Structuring sitemap, content, and technical approach",
  },
  {
    id: "design",
    number: 3,
    title: "Design",
    description: "Crafting wireframes and high-fidelity UI",
  },
  {
    id: "development",
    number: 4,
    title: "Development",
    description: "Building with clean, scalable, performant code",
  },
  {
    id: "testing",
    number: 5,
    title: "Testing",
    description: "Rigorous QA across devices, browsers, and edge cases",
  },
  {
    id: "deployment",
    number: 6,
    title: "Deployment",
    description: "Shipping to production with zero-downtime releases",
  },
  {
    id: "maintenance",
    number: 7,
    title: "Maintenance",
    description: "Ongoing monitoring, updates, and performance tuning",
  },
];
