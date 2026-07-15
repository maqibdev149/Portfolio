import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useRef } from "react";

const githubStats = [
  { label: "Public Repositories", value: "15+" },
  { label: "Active Streak", value: "7 Days" },
  { label: "Most Used Language", value: "JavaScript" },
  { label: "GitHub Followers", value: "10+" },
];

const contributionColors = [
  "bg-primary/5",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/70",
  "bg-primary",
];

const contributionData = Array.from({ length: 7 * 52 }, (_, index) => {
  const seededValue = ((index * 9301 + 49297) % 233280) / 233280;

  if (seededValue < 0.42) return 0;
  if (seededValue < 0.65) return 1;
  if (seededValue < 0.82) return 2;
  if (seededValue < 0.94) return 3;
  return 4;
});

export function GitHubActivity() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      id="github-activity"
      className="section-padding bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center mb-10 md:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-12 bg-primary" />
            <span className="text-primary text-sm font-mono font-bold tracking-widest uppercase">
              Code Activity
            </span>
            <div className="h-0.5 w-12 bg-primary" />
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            Code, Commit, Repeat
          </h2>

          <p className="text-text-secondary text-lg">
            A quick look at my open-source and personal coding activity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {githubStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{
                y: -6,
                borderColor: "rgba(59, 130, 246, 0.4)",
              }}
              className="glass rounded-2xl p-6 border border-white/10 transition-colors duration-300"
            >
              <div className="text-3xl md:text-4xl font-mono font-bold text-primary break-words">
                {stat.value}
              </div>
              <p className="text-text-secondary text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass rounded-2xl p-5 md:p-6 border border-white/10 mt-8 md:mt-10"
        >
          <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-5">
            <h3 className="font-heading font-semibold text-white">
              Contribution Activity
            </h3>
            <span className="text-text-muted text-xs">Last 12 months</span>
          </div>

          <div className="overflow-x-auto pb-3">
            <div
              className="grid grid-flow-col gap-1 w-max"
              style={{
                gridTemplateRows: "repeat(7, 0.75rem)",
                gridAutoColumns: "0.75rem",
              }}
              role="img"
              aria-label="Placeholder GitHub contribution activity for the last 12 months"
            >
              {contributionData.map((level, index) => (
                <span
                  key={index}
                  className={`block rounded-[2px] ${contributionColors[level]}`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 mt-1 text-text-muted text-xs">
            <span>Less</span>
            {contributionColors.slice(1).map((color) => (
              <span
                key={color}
                className={`w-3 h-3 rounded-[2px] ${color}`}
                aria-hidden="true"
              />
            ))}
            <span>More</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex justify-center mt-10 md:mt-12"
        >
          <a
            href="https://github.com/maqibdev149"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="inline-flex items-center justify-center gap-2 btn-primary"
          >
            <Github className="w-5 h-5" />
            View My GitHub
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
