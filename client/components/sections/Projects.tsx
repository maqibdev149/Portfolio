import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section id="projects" className="section-padding bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          variants={headerVariants}
          className="text-center mb-24"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-12 bg-gradient-main" />
            <span className="text-primary text-sm font-mono font-bold tracking-widest">PORTFOLIO</span>
            <div className="h-0.5 w-12 bg-gradient-main" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            Featured Projects
          </h2>

          {/* Subtext */}
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Real client work delivered — responsive, performant, production-grade websites that drive results
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index + 1}
              isEven={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
