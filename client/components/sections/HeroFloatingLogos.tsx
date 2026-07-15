import { motion } from "framer-motion";
import { SiCss, SiVercel } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const floatingLogos = [
  {
    Icon: SiCss,
    color: "#1572B6",
    position: "top-[38%] right-[38%] lg:right-[36%]",
    delay: 0.65,
  },
  {
    Icon: VscVscode,
    color: "#007ACC",
    position: "top-[26%] right-[26%] lg:right-[24%]",
    delay: 0.8,
  },
  {
    Icon: SiVercel,
    color: "#FFFFFF",
    position: "top-[32%] right-[13%] lg:right-[11%]",
    delay: 0.95,
  },
];

export function HeroFloatingLogos() {
  return (
    <div
      className="absolute inset-0 pointer-events-none hidden lg:block z-[2]"
      aria-hidden
    >
      {/* Covers baked TRT tile in the background image */}
      <div className="absolute top-[31%] right-[10%] lg:right-[9%] w-[4.5rem] h-[4.5rem] rounded-xl bg-[#050816]/90 blur-[2px]" />

      {floatingLogos.map(({ Icon, color, position, delay }, index) => (
        <motion.div
          key={Icon.name}
          initial={{ opacity: 0, scale: 0.85, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay, duration: 0.5, ease: "easeOut" }}
          className={`absolute ${position}`}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4.5 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-14 h-14 lg:w-[4.5rem] lg:h-[4.5rem] rounded-xl border border-primary/35 bg-[#0a1628]/75 backdrop-blur-md flex items-center justify-center shadow-glow-blue"
          >
            <Icon className="w-7 h-7 lg:w-8 lg:h-8" style={{ color }} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
