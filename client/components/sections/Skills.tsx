import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { SkillIcon } from "@/components/ui/SkillIcon";
import {
  skillCategories,
  technologies,
  type SkillCategory,
} from "@/data/skills";
import { cn } from "@/lib/utils";

export function Skills() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<SkillCategory>("frontend");

  const filteredSkills = useMemo(
    () => technologies.filter((tech) => tech.category === activeTab),
    [activeTab],
  );

  return (
    <section
      id="skills"
      className="section-padding bg-background-secondary relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center mb-10 md:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-12 bg-primary" />
            <span className="text-primary text-sm font-bold tracking-widest uppercase">
              My Expertise
            </span>
            <div className="h-0.5 w-12 bg-primary" />
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            Skills & Technologies
          </h2>

          <p className="text-text-secondary text-lg">
            Tools and technologies I use to build fast, modern, and scalable
            digital interfaces
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-12">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveTab(category.id)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ease-out",
                activeTab === category.id
                  ? "bg-gradient-main text-white shadow-glow-brand"
                  : "glass text-text-secondary hover:text-white",
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8"
          >
            {filteredSkills.map((tech, index) => (
              <SkillIcon
                key={tech.name}
                name={tech.name}
                icon={tech.icon}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
