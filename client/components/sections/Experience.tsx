import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/data/experience";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="section-padding bg-background-secondary relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-12 bg-gradient-main" />
            <span className="text-primary text-sm font-bold tracking-widest">CAREER JOURNEY</span>
            <div className="h-0.5 w-12 bg-gradient-main" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            Experience
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Growing from QA and development roots into a full-fledged frontend engineer focused on quality and precision
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Desktop animated line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/5">
            <motion.div
              style={{ scaleY }}
              className="absolute inset-0 bg-gradient-to-b from-primary via-accent to-transparent origin-top"
            />
          </div>

          {/* Mobile line */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-[2px] bg-white/5">
            <motion.div
              style={{ scaleY }}
              className="absolute inset-0 bg-gradient-to-b from-primary via-accent to-transparent origin-top"
            />
          </div>

          <div className="space-y-12 md:space-y-20">
            {experience.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={item.id} className="relative">
                  {/* Timeline node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
                    className="absolute left-6 md:left-1/2 top-8 -translate-x-1/2 z-10"
                  >
                    <div className="relative w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-main shadow-glow-blue">
                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className="absolute inset-0 rounded-full bg-gradient-main"
                      />
                    </div>
                  </motion.div>

                  {/* Card row */}
                  <div
                    className={`md:grid md:grid-cols-2 md:gap-12 ${
                      isLeft ? "" : ""
                    }`}
                  >
                    {/* Left slot */}
                    <div className={`${isLeft ? "block" : "hidden md:block"} pl-14 md:pl-0`}>
                      {isLeft && (
                        <ExperienceCard item={item} fromLeft direction="left" />
                      )}
                    </div>

                    {/* Right slot */}
                    <div className={`${!isLeft ? "block" : "hidden md:block"} pl-14 md:pl-0`}>
                      {!isLeft && (
                        <ExperienceCard item={item} fromLeft={false} direction="right" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  item,
  fromLeft,
  direction,
}: {
  item: (typeof experience)[number];
  fromLeft: boolean;
  direction: "left" | "right";
}) {
  return (
    <motion.article
      initial={{ opacity: 0, x: direction === "left" ? -48 : 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      whileHover={{ y: -6, borderColor: "rgba(59, 130, 246, 0.3)" }}
      className={`glass rounded-2xl p-6 md:p-8 border border-white/10 transition-colors duration-300 ${
        fromLeft ? "md:text-right" : "md:text-left"
      }`}
    >
      <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-1">
        {item.company}
      </h3>
      <p className="text-primary font-medium mb-4">{item.role}</p>

      <div
        className={`flex flex-wrap gap-2 mb-5 ${
          fromLeft ? "md:justify-end" : "justify-start"
        }`}
      >
        <span className="glass text-xs font-medium px-3 py-1 rounded-full border border-white/10 text-text-secondary">
          {item.duration}
        </span>
        <span className="text-xs font-medium px-3 py-1 rounded-full border border-primary/30 text-primary bg-primary/10">
          {item.type}
        </span>
      </div>

      <ul className="space-y-2.5">
        {item.points.map((point) => (
          <li
            key={point}
            className={`text-text-secondary text-sm leading-relaxed flex items-start gap-3 ${
              fromLeft ? "md:flex-row-reverse" : ""
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-main flex-shrink-0 mt-1.5" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
