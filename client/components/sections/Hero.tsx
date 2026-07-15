import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-laptop-bg.png";
import { HeroFloatingLogos } from "./HeroFloatingLogos";

const description =
  "I'm Muhammad Aqib Aziz, a Frontend Developer focused on building fast, responsive products with React.js, Next.js, and Tailwind CSS that hold up under real-world use.";

const typingPhrases = [
  "building with React.js",
  "styling with Tailwind CSS",
  "shipping with Firebase",
  "versioning with Git",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];
    let delay = isDeleting ? 45 : 85;

    if (!isDeleting && typedText === currentPhrase) {
      delay = 1400;
    } else if (isDeleting && typedText === "") {
      delay = 300;
    }

    const timeout = window.setTimeout(() => {
      if (!isDeleting && typedText === currentPhrase) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setPhraseIndex((current) => (current + 1) % typingPhrases.length);
        return;
      }

      setTypedText(
        currentPhrase.slice(0, typedText.length + (isDeleting ? -1 : 1)),
      );
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [isDeleting, phraseIndex, typedText]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          aria-hidden
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-right"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent md:via-background/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30 pointer-events-none" />

      <HeroFloatingLogos />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.1,
                delayChildren: prefersReducedMotion ? 0 : 0.12,
              },
            },
          }}
          className="max-w-[560px]"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base text-primary font-medium mb-5"
          >
            Frontend Developer
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-heading font-extrabold text-white leading-[1.1] tracking-tight text-[clamp(2rem,10vw,2.5rem)] sm:text-5xl md:text-6xl lg:text-[3.4rem] mb-6 drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]"
          >
            I Break Things First So Users Don&apos;t Have To
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-mono text-sm md:text-base text-text-muted mb-6 min-h-6"
            aria-label={`Currently ${typingPhrases[phraseIndex]}`}
          >
            <span aria-hidden="true">
              Currently:{" "}
              <span className="text-accent">{typedText}</span>
              <span className="typing-cursor text-primary">|</span>
            </span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-text-secondary leading-relaxed mb-10 max-w-[520px]"
          >
            {description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              data-cursor="hover"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 btn-primary"
            >
              Contact Us
              <ArrowUpRight className="w-5 h-5" />
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              data-cursor="hover"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 btn-glass"
            >
              View Projects
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
