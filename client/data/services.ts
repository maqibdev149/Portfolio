import { LucideIcon } from "lucide-react";
import {
  Layout,
  Rocket,
  Code2,
  MonitorSmartphone,
  Plug,
  Zap,
  Bug,
  Palette,
} from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: ServiceItem[] = [
  {
    id: "responsive-websites",
    title: "Responsive Websites",
    description: "Pixel-perfect designs that work seamlessly across all devices and screen sizes",
    icon: Layout,
  },
  {
    id: "landing-pages",
    title: "Landing Pages",
    description: "High-converting landing pages built for engagement and performance",
    icon: Rocket,
  },
  {
    id: "react-development",
    title: "React Development",
    description: "Modern, scalable React applications with clean, maintainable code",
    icon: Code2,
  },
  {
    id: "frontend-development",
    title: "Frontend Development",
    description: "Full-stack frontend solutions with optimal UX and performance",
    icon: MonitorSmartphone,
  },
  {
    id: "api-integration",
    title: "API Integration",
    description: "Seamless integration with external APIs and backend services",
    icon: Plug,
  },
  {
    id: "performance-optimization",
    title: "Performance Optimization",
    description: "Fast-loading websites with optimized assets and efficient code",
    icon: Zap,
  },
  {
    id: "bug-fixing",
    title: "Bug Fixing",
    description: "Identify and fix frontend bugs with a precise, performance-focused approach",
    icon: Bug,
  },
  {
    id: "website-redesign",
    title: "Website Redesign",
    description: "Modernize existing websites with fresh design and improved functionality",
    icon: Palette,
  },
];
