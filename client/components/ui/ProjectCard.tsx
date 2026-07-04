import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useState, useRef } from "react";
import { ExternalLink, Github, ChevronDown } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  isEven: boolean;
}

export function ProjectCard({ project, index, isEven }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="group"
    >
      <div
        className={`grid lg:grid-cols-2 gap-8 items-center ${isEven ? "lg:flex-row-reverse" : ""}`}
      >
        {/* Image Container */}
        <motion.div
          initial={{ x: isEven ? 40 : -40, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: isEven ? 40 : -40, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`relative order-last lg:order-none ${isEven ? "lg:order-last" : "lg:order-first"}`}
        >
          {/* Browser Chrome Frame */}
          <div className="glass rounded-3xl border border-white/10 overflow-hidden p-3 hover:border-primary/30 transition-all duration-300 hover:shadow-glow-blue">
            {/* Browser Top Bar */}
            <div className="bg-background-secondary rounded-2xl overflow-hidden mb-1">
              <div className="bg-gradient-to-b from-background-secondary to-background-secondary px-4 py-2 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                </div>
                <div className="ml-3 text-text-muted text-xs flex-1 truncate">
                  {project.liveDemo.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </div>
              </div>

              {/* Image Container with Aspect Ratio */}
              <div className="relative aspect-video overflow-hidden bg-background">
                <motion.img
                  src={project.image}
                  alt={`${project.name} website screenshot`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />

                {/* Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Container */}
        <motion.div
          initial={{ x: isEven ? -40 : 40, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: isEven ? -40 : 40, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`relative z-10 ${isEven ? "lg:order-first" : "lg:order-last"}`}
        >
          {/* Index Number Background */}
          <div className="absolute -top-8 -left-2 text-7xl font-bold text-white/5 font-heading pointer-events-none">
            {String(index).padStart(2, "0")}
          </div>

          {project.badge && (
            <span className="inline-block mb-3 text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">
              {project.badge}
            </span>
          )}

          {/* Project Title */}
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3 relative z-10">
            {project.name}
          </h3>

          {/* Description */}
          <p className="text-text-secondary mb-6 leading-relaxed">{project.description}</p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <div
                key={tech}
                className="glass bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs font-medium text-text-secondary"
              >
                {tech}
              </div>
            ))}
          </div>

          {/* Role Badge */}
          <div className="mb-6">
            <p className="text-primary text-xs font-bold tracking-widest mb-1">MY ROLE</p>
            <p className="text-text-secondary text-sm">{project.role}</p>
          </div>

          {/* Expandable Details */}
          <AnimatePresence>
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-primary hover:text-accent transition-colors mb-6"
            >
              <span className="text-sm font-semibold">
                {isExpanded ? "Hide Details" : "View Details"}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>

            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 mb-6 overflow-hidden"
              >
                <div className="glass rounded-xl p-4 border border-white/5">
                  <p className="text-primary text-xs font-bold tracking-widest mb-2">CHALLENGE</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{project.challenge}</p>
                </div>

                <div className="glass rounded-xl p-4 border border-white/5">
                  <p className="text-primary text-xs font-bold tracking-widest mb-2">SOLUTION</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{project.solution}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="flex items-center gap-2 btn-primary text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="flex items-center gap-2 btn-glass text-sm"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
