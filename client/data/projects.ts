import luluDenimImg from "@/assets/projects/lulu-denim.png";
import bestLondonImg from "@/assets/projects/best-london-recovery.png";
import abgConstructionImg from "@/assets/projects/abg-construction.png";
import onlineAdmissionImg from "@/assets/projects/online-admission.png";

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  role: string;
  challenge: string;
  solution: string;
  liveDemo: string;
  github?: string;
  image: string;
  badge?: string;
}

export const projects: Project[] = [
  {
    id: "lulu-denim",
    name: "LuLu Denim",
    description:
      "A premium e-commerce experience for a London-based hand-painted denim jacket brand — custom product galleries, hero video storytelling, and a fully custom admin panel.",
    tech: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
    role: "Frontend Developer & Product Coordinator — directed UI/UX decisions, wrote technical specs, oversaw implementation",
    challenge:
      "Needed a fashion-editorial feel with fast load times and a mobile-first hero video that wasn't glitchy across devices.",
    solution:
      "Rebuilt hero video handling with poster images, optimized fade-in transitions, and custom responsive breakpoints; added front/back hover-swap product galleries and animated side panels.",
    liveDemo: "https://luludenimlondon.com/",
    image: luluDenimImg,
  },
  {
    id: "best-london-recovery",
    name: "Best London Recovery",
    description:
      "A clean, trust-focused service website for a London-based vehicle recovery and towing business — built for clarity, speed, and conversions.",
    tech: ["React", "Tailwind CSS", "JavaScript", "Vercel"],
    role: "Frontend Developer — built responsive UI from design concept to deployment",
    challenge:
      "Needed a professional, trustworthy first impression with clear service breakdowns and fast mobile performance.",
    solution:
      "Component-driven layout with clear visual hierarchy, optimized images, and accessible contact/quote flows.",
    liveDemo: "https://www.bestlondonrecovery.com/",
    image: bestLondonImg,
  },
  {
    id: "abg-construction",
    name: "ABG Construction Group",
    description:
      "A professional corporate website for A.B.G Construction Group — showcasing bespoke design and construction services across London with a premium, conversion-focused layout.",
    tech: ["React", "Tailwind CSS", "JavaScript"],
    role: "Frontend Developer — implemented responsive UI and polished page sections for a construction brand",
    challenge:
      "Needed a strong, trustworthy first impression that communicates professionalism and makes services easy to explore.",
    solution:
      "Built a clear visual hierarchy, mobile-first sections, and smooth interactions that keep the focus on services and contact.",
    liveDemo: "https://abgconstructiongroup.co.uk/",
    image: abgConstructionImg,
  },
  {
    id: "online-admission",
    name: "Online Admission Portal",
    description:
      "Final year project — a secure online admission portal for MNSUET Multan, streamlining program applications with countdown deadlines, merit-based flow, and a guided apply experience.",
    tech: ["React", "JavaScript", "Bootstrap", "Firebase"],
    role: "Frontend Developer — designed and built the full admission portal as a final year project",
    challenge:
      "Complex multi-step admission forms needed to feel simple and reliable for students applying online.",
    solution:
      "Built a guided application flow with deadline countdown, clear CTAs, program browsing, and secure portal access for a smooth admission experience.",
    liveDemo: "https://onlineadmission-a7ec6.web.app/",
    image: onlineAdmissionImg,
    badge: "Final Year Project",
  },
];
