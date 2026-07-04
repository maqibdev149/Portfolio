import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, type ComponentType } from "react";
import { RiOpenaiFill } from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

interface SkillIconProps {
  name: string;
  icon: string;
  index: number;
}

const iconComponents: Record<string, ComponentType<{ className?: string }>> = {
  SiHtml5: SiIcons.SiHtml5,
  SiCss: SiIcons.SiCss,
  SiJavascript: SiIcons.SiJavascript,
  SiTypescript: SiIcons.SiTypescript,
  SiReact: SiIcons.SiReact,
  SiNextdotjs: SiIcons.SiNextdotjs,
  SiTailwindcss: SiIcons.SiTailwindcss,
  SiBootstrap: SiIcons.SiBootstrap,
  SiGit: SiIcons.SiGit,
  SiGithub: SiIcons.SiGithub,
  SiFirebase: SiIcons.SiFirebase,
  SiVercel: SiIcons.SiVercel,
  SiFigma: SiIcons.SiFigma,
  VscVscode,
  SiNpm: SiIcons.SiNpm,
  SiVite: SiIcons.SiVite,
  RiOpenaiFill,
  SiClaude: SiIcons.SiClaude,
  SiGooglegemini: SiIcons.SiGooglegemini,
  SiCursor: SiIcons.SiCursor,
};

const iconColorMap: Record<string, string> = {
  SiHtml5: "#E34C26",
  SiCss: "#1572B6",
  SiJavascript: "#F7DF1E",
  SiTypescript: "#3178C6",
  SiReact: "#61DAFB",
  SiNextdotjs: "#FFFFFF",
  SiTailwindcss: "#06B6D4",
  SiBootstrap: "#7952B3",
  SiGit: "#F1502F",
  SiGithub: "#FFFFFF",
  SiFirebase: "#FFCA28",
  SiVercel: "#FFFFFF",
  SiFigma: "#F24E1E",
  VscVscode: "#007ACC",
  SiNpm: "#CB3837",
  SiVite: "#646CFF",
  RiOpenaiFill: "#10A37F",
  SiClaude: "#D97757",
  SiGooglegemini: "#8E75FF",
  SiCursor: "#FFFFFF",
};

export function SkillIcon({ name, icon, index }: SkillIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const IconComponent = iconComponents[icon];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }}
      className="group glass-card flex flex-col items-center justify-center gap-3 p-6 transition-all duration-300 ease-out hover:shadow-glow-blue hover:border-primary/30"
    >
      <div style={{ color: iconColorMap[icon] || "#B0B8C4" }}>
        {IconComponent ? (
          <IconComponent className="w-10 h-10 md:w-12 md:h-12" />
        ) : null}
      </div>
      <span className="text-xs md:text-sm text-text-secondary font-medium text-center">
        {name}
      </span>
    </motion.div>
  );
}
