import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/data/process";

export function Process() {
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section id="process" className="section-padding bg-background-secondary relative overflow-hidden">
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
            <span className="text-primary text-sm font-bold tracking-widest">HOW I WORK</span>
            <div className="h-0.5 w-12 bg-gradient-main" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            Development Process
          </h2>

          {/* Subtext */}
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A structured, quality-first workflow — every step includes a quality checkpoint rooted in my QA background
          </p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Desktop connector track */}
          <div className="hidden xl:block absolute top-7 left-[7%] right-[7%] h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX }}
              className="h-full bg-gradient-main origin-left"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-8 xl:gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
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
                  className="relative z-10 w-14 h-14 rounded-full glass border-2 border-primary/40 flex items-center justify-center font-heading font-bold text-xl text-primary mb-5 bg-background-secondary"
                >
                  {step.number}
                  <div className="absolute -inset-1 bg-gradient-main rounded-full blur-md opacity-20 -z-10" />
                </motion.div>

                <h3 className="font-heading font-semibold text-white text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-xs leading-relaxed max-w-[140px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
