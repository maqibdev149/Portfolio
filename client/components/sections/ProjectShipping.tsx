import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ClipboardList,
  Flame,
  Github,
  Globe2,
  Rocket,
  Search,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useRef } from "react";

interface ShippingStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

const shippingSteps: ShippingStep[] = [
  {
    title: "Research",
    icon: Search,
    description: "Understanding goals, audience, and competitors",
  },
  {
    title: "Planning",
    icon: ClipboardList,
    description: "Structuring sitemap, content, and technical approach",
  },
  {
    title: "Version Control",
    icon: Github,
    description:
      "Managing code with Git and GitHub for clean, trackable development",
  },
  {
    title: "Firebase Setup",
    icon: Flame,
    description:
      "Configuring Firebase for hosting, authentication, and real-time databases",
  },
  {
    title: "Domain & DNS",
    icon: Globe2,
    description:
      "Setting up custom domains and DNS configuration through GoDaddy",
  },
  {
    title: "Go Live",
    icon: Rocket,
    description: "Final deployment, testing, and handover to the client",
  },
  {
    title: "Testing",
    icon: ShieldCheck,
    description: "Testing responsive behavior across devices, browsers, and edge cases",
  },
  {
    title: "Maintenance",
    icon: Wrench,
    description: "Ongoing monitoring, updates, and performance tuning",
  },
];

export function ProjectShipping() {
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, {
    once: true,
    margin: "-100px",
  });

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start center", "end center"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="project-shipping"
      className="section-padding bg-background-secondary relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-12 bg-gradient-main" />
            <span className="text-primary text-sm font-mono font-bold tracking-widest uppercase">
              From Code to Live
            </span>
            <div className="h-0.5 w-12 bg-gradient-main" />
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            How I Ship Projects
          </h2>

          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            From first idea to a live, production-ready website — a structured,
            frontend-focused workflow
          </p>
        </motion.div>

        <div ref={stepsRef} className="relative">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX }}
              className="h-full bg-gradient-main origin-left"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {shippingSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center relative"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.12,
                      boxShadow: "0 0 30px rgba(59,130,246,0.45)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 14,
                      delay: index * 0.1,
                    }}
                    className="relative z-10 w-16 h-16 rounded-full glass border-2 border-primary/40 flex items-center justify-center text-primary mb-6 bg-background-secondary"
                  >
                    <Icon className="w-6 h-6" aria-hidden="true" />
                    <div className="absolute -inset-1 bg-gradient-main rounded-full blur-md opacity-20 -z-10" />
                  </motion.div>

                  <span className="text-primary text-xs font-bold tracking-widest mb-2">
                    0{index + 1}
                  </span>
                  <h3 className="font-heading font-semibold text-white text-lg mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed max-w-[230px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
