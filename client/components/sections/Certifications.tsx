import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/data/certifications";

export function Certifications() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section
      id="certifications"
      className="section-padding bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          variants={headerVariants}
          className="text-center mb-16"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-12 bg-gradient-main" />
            <span className="text-primary text-sm font-mono font-bold tracking-widest">
              CREDENTIALS
            </span>
            <div className="h-0.5 w-12 bg-gradient-main" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            Certifications
          </h2>

          {/* Subtext */}
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Continuous learning in frontend engineering and modern web development
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.id}
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -6,
                borderColor: "rgba(59, 130, 246, 0.3)",
              }}
              className="group glass rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:shadow-glow-purple overflow-hidden"
            >
              {/* Badge Icon Container */}
              <motion.div
                whileHover={{
                  rotate: 10,
                  scale: 1.1,
                }}
                className="w-14 h-14 rounded-xl bg-gradient-main flex items-center justify-center shadow-glow-blue mb-4"
              >
                {cert.badgeUrl ? (
                  <img
                    src={cert.badgeUrl}
                    alt={cert.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <Award className="w-7 h-7 text-white" />
                )}

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-main rounded-xl blur-lg opacity-20 -z-10" />
              </motion.div>

              {/* Certificate Title */}
              <h3 className="text-lg font-heading font-semibold text-white mb-2">
                {cert.title}
              </h3>

              {/* Issuer */}
              <p className="text-primary text-sm font-medium mb-1">{cert.issuer}</p>

              {/* Date */}
              <p className="text-text-muted text-xs mb-4">{cert.date}</p>

              {/* View Credential Link */}
              <motion.div
                className="flex items-center gap-2 text-primary text-sm font-medium group-hover:text-accent transition-colors"
                whileHover={{ x: 4 }}
              >
                View Credential
                <ExternalLink className="w-3 h-3" />
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
