import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { services } from "@/data/services";

export function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section id="services" className="section-padding bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          variants={headerVariants}
          className="text-center mb-20"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-12 bg-gradient-main" />
            <span className="text-primary text-sm font-mono font-bold tracking-widest">WHAT I OFFER</span>
            <div className="h-0.5 w-12 bg-gradient-main" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            Services
          </h2>

          {/* Subtext */}
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            End-to-end frontend solutions built with precision, performance, and a component-first mindset
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                  borderColor: "rgba(139, 92, 246, 0.4)",
                }}
                className="group glass rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:shadow-glow-blue relative overflow-hidden"
              >
                {/* Hover gradient background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-primary/5 to-accent/5 -z-10 rounded-2xl" />

                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative w-14 h-14 rounded-xl bg-gradient-main flex items-center justify-center shadow-glow-blue"
                >
                  <Icon className="w-7 h-7 text-white" />

                  {/* Soft glow behind icon */}
                  <div className="absolute -inset-1 bg-gradient-main rounded-xl blur-lg opacity-20 -z-10" />
                </motion.div>

                {/* Title */}
                <h3 className="text-lg font-heading font-semibold text-white mt-6 mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
