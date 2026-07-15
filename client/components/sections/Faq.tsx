import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

const faqs = [
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. I work remotely with clients across different time zones and keep communication clear throughout every stage of the project.",
  },
  {
    question: "What's your tech stack?",
    answer:
      "My core stack includes React, JavaScript, Tailwind CSS, Firebase, Git, and modern frontend tooling.",
  },
  {
    question: "Do you handle deployment and hosting too?",
    answer:
      "Yes. I can manage deployment, hosting, custom domain setup, and DNS configuration as part of the project delivery.",
  },
  {
    question: "What's your typical project turnaround time?",
    answer:
      "Timelines depend on the scope and complexity, but I provide a clear delivery plan and milestones before development begins.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes. Post-launch support can include bug fixes, performance monitoring, content updates, and ongoing improvements.",
  },
];

export function Faq() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, {
    once: true,
    margin: "-100px",
  });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="section-padding bg-background-secondary relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-12 bg-gradient-main" />
            <span className="text-primary text-sm font-mono font-bold tracking-widest uppercase">
              Common Questions
            </span>
            <div className="h-0.5 w-12 bg-gradient-main" />
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-text-secondary text-lg">
            Quick answers before you reach out
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="glass rounded-2xl border border-white/10 overflow-hidden hover:border-primary/30 transition-colors duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="w-full min-h-11 flex items-center justify-between gap-3 sm:gap-6 p-4 sm:p-6 text-left"
                >
                  <span className="font-heading font-semibold text-white text-base md:text-lg">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 w-9 h-9 rounded-full border border-primary/30 flex items-center justify-center text-primary"
                  >
                    <ChevronDown className="w-5 h-5" aria-hidden="true" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-secondary leading-relaxed px-4 sm:px-6 pb-5 sm:pb-6 sm:pr-16 border-t border-white/10 pt-5">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
