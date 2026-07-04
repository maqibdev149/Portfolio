import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatCardProps {
  label: string;
  value: number;
}

export function StatCard({ label, value }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let animationFrame: number;
    let currentValue = 0;

    const animate = () => {
      currentValue += value / 30;
      if (currentValue >= value) {
        setDisplayValue(value);
      } else {
        setDisplayValue(Math.floor(currentValue));
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -6, borderColor: "rgba(59, 130, 246, 0.4)" }}
      className="glass rounded-2xl p-6 border border-white/10 transition-colors duration-300"
    >
      <div className="text-3xl md:text-4xl font-bold text-primary">
        {displayValue}+
      </div>
      <p className="text-text-secondary text-sm mt-2">{label}</p>
    </motion.div>
  );
}
