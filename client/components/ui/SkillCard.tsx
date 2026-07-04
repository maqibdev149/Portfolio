import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import * as SiIcons from "react-icons/si";
import { Sparkles } from "lucide-react";

interface SkillCardProps {
  name: string;
  icon: string;
  proficiency: number;
  index?: number;
}

// Icon mapping with brand colors
const iconColorMap: Record<string, string> = {
  SiHtml5: "#E34C26",
  SiCss3: "#1572B6",
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
  SiVisualstudiocode: "#007ACC",
  SiGooglechrome: "#4285F4",
  SiOpenai: "#412991",
  SiGooglegemini: "#0099FF",
};

export function SkillCard({ name, icon, proficiency, index = 0 }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Get the icon component
  const getIcon = () => {
    if (icon === "Sparkles") {
      return <Sparkles className="w-9 h-9" />;
    }

    const SiComponent = SiIcons[icon as keyof typeof SiIcons] as any;
    if (SiComponent) {
      return <SiComponent className="w-9 h-9" />;
    }

    return <Sparkles className="w-9 h-9" />;
  };

  const iconColor = iconColorMap[icon] || "rgba(255, 255, 255, 0.8)";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: isInView ? index * 0.05 : 0,
      }}
      whileHover={{ y: -6 }}
      className="group relative glass rounded-2xl p-6 border border-white/10 transition-all duration-300 overflow-hidden"
    >
      {/* Gradient border on hover (pseudo-element simulation) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 -z-10" />

      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="mb-4 text-white"
        style={{ color: iconColor, opacity: 0.8 }}
      >
        {getIcon()}
      </motion.div>

      {/* Skill Name */}
      <h3 className="text-white font-semibold text-sm mb-4">{name}</h3>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-text-muted">{proficiency}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${proficiency}%` }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-gradient-main"
          />
        </div>
      </div>
    </motion.div>
  );
}
