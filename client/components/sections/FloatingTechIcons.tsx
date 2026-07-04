import { motion } from "framer-motion";
import { SiReact, SiTypescript, SiVite, SiTailwindcss } from "react-icons/si";

const techIcons = [
  { Icon: SiReact, label: "React", color: "#61DAFB" },
  { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { Icon: SiVite, label: "Vite", color: "#A855F7" },
  { Icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
];

const positions = [
  { top: "12%", left: "4%", duration: 4.2 },
  { top: "68%", left: "8%", duration: 5.1 },
  { top: "18%", right: "6%", duration: 3.8 },
  { top: "62%", right: "4%", duration: 4.6 },
];

export function FloatingTechIcons() {
  return (
    <>
      {techIcons.map((tech, i) => {
        const pos = positions[i];
        return (
          <motion.div
            key={tech.label}
            className="absolute hidden lg:flex glass rounded-2xl px-3.5 py-2.5 gap-2.5 items-center border border-white/10 shadow-glow-blue/50 z-[1] pointer-events-none"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -14, 0],
              rotate: [0, 4, -4, 0],
            }}
            transition={{
              opacity: { delay: 0.8 + i * 0.15, duration: 0.5 },
              scale: { delay: 0.8 + i * 0.15, duration: 0.5 },
              y: {
                duration: pos.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              },
              rotate: {
                duration: pos.duration + 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              },
            }}
          >
            <tech.Icon className="w-5 h-5" style={{ color: tech.color }} />
            <span className="text-xs font-semibold text-text-secondary">{tech.label}</span>
          </motion.div>
        );
      })}
    </>
  );
}
