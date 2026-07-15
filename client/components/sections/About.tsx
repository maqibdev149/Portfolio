import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { StatCard } from "@/components/ui/StatCard";
import { stats } from "@/data/skills";
import profilePhoto from "@/assets/profile.png";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isContainerInView = useInView(containerRef, { once: true, margin: "-100px" });
  const isPhotoInView = useInView(photoRef, { once: true, margin: "-100px" });

  // 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), {
    stiffness: 100,
    damping: 30,
  });

  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), {
    stiffness: 100,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoRef.current) return;

    const rect = photoRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={containerRef}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          initial="hidden"
          animate={isContainerInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Left Column - Photo */}
          <motion.div
            ref={photoRef}
            variants={itemVariants}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative max-w-md mx-auto lg:max-w-none w-full"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -inset-8 md:-inset-12 bg-accent/20 rounded-full blur-3xl -z-10"
            />

            <motion.div
              style={{
                perspective: 1000,
                rotateX,
                rotateY,
              }}
              className="relative aspect-square"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={isPhotoInView ? { opacity: 0.45 } : { opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute -inset-1 bg-primary/30 rounded-3xl blur-2xl -z-10"
              />

              <img
                src={profilePhoto}
                alt="Muhammad Aqib Aziz — Frontend Developer coding at desk"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center rounded-2xl border border-white/10 shadow-glow-brand"
              />
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
              className="absolute -bottom-4 -right-2 md:-right-4 glass rounded-2xl px-4 py-3 border border-white/10 shadow-glow-blue"
            >
              <p className="text-sm font-mono font-semibold text-white">3+ Years</p>
              <p className="text-xs text-text-secondary">Experience</p>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            ref={contentRef}
            className="flex flex-col gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isContainerInView ? "visible" : "hidden"}
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span className="text-primary text-sm font-mono font-bold tracking-widest uppercase">About Me</span>
              <div className="h-0.5 w-12 bg-primary" />
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight"
            >
              Turning Ideas Into Pixel-Perfect Digital Experiences
            </motion.h2>

            {/* Bio */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-text-secondary leading-relaxed">
                I started my career in frontend development with a passion for turning ideas into intuitive digital experiences. Building polished interfaces has sharpened my eye for detail and strengthened my commitment to creating products users love.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Over the past few years, I've transitioned into building production React applications for real client businesses, from e-commerce platforms to corporate websites. I thrive on clean code, performance optimization, and creating premium user experiences.
              </p>
              <p className="text-text-secondary leading-relaxed">
                My mission is simple: turn complex ideas into beautiful, functional digital products that make a real impact.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {stats.map((stat) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
