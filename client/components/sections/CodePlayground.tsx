import { motion, useInView } from "framer-motion";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";

export function CodePlayground() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, {
    once: true,
    margin: "-100px",
  });
  const [count, setCount] = useState(0);

  return (
    <section
      id="code-playground"
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
          className="max-w-2xl mx-auto text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-12 bg-gradient-main" />
            <span className="text-primary text-sm font-mono font-bold tracking-widest uppercase">
              See It in Action
            </span>
            <div className="h-0.5 w-12 bg-gradient-main" />
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            Not Just Design — Real Code
          </h2>

          <p className="text-text-secondary text-lg">
            A live example of HTML, CSS, and JavaScript working together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="min-w-0 glass rounded-3xl border border-white/10 overflow-hidden hover:border-primary/30 transition-colors duration-300"
          >
            <div className="flex items-center px-5 py-3 border-b border-white/10 bg-background-secondary">
              <div
                className="flex items-center gap-2"
                aria-hidden="true"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </div>
              <span className="ml-5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-text-muted text-xs font-mono">
                script.js
              </span>
            </div>

            <pre className="p-6 md:p-8 overflow-x-auto text-sm md:text-base leading-7 font-mono">
              <code>
                <span className="text-primary">const</span>
                <span className="text-text-secondary"> counter = </span>
                <span className="text-accent">
                  document.querySelector
                </span>
                <span className="text-text-secondary">(</span>
                <span className="text-accent">'#count'</span>
                <span className="text-text-secondary">);{"\n"}</span>
                <span className="text-primary">let</span>
                <span className="text-text-secondary"> value = </span>
                <span className="text-white">0</span>
                <span className="text-text-secondary">;{"\n\n"}</span>
                <span className="text-primary">function</span>
                <span className="text-white"> updateCounter</span>
                <span className="text-text-secondary">(change) {"{"}{"\n"}</span>
                <span className="text-text-secondary">
                  {"  "}value += change;{"\n"}
                  {"  "}counter.textContent = value;{"\n"}
                  {"}"}
                </span>
              </code>
            </pre>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="min-w-0 glass rounded-3xl border border-white/10 p-5 sm:p-8 hover:border-primary/30 transition-colors duration-300 flex flex-col"
          >
            <p className="text-text-muted text-xs font-bold tracking-widest uppercase">
              Live Preview
            </p>

            <div className="flex-1 min-h-72 flex flex-col items-center justify-center text-center">
              <p className="text-text-secondary mb-3">Current count</p>
              <motion.p
                key={count}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-7xl md:text-8xl font-heading font-bold text-primary"
                aria-live="polite"
              >
                {count}
              </motion.p>

              <div className="flex items-center gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setCount((current) => current - 1)}
                  className="btn-glass p-3"
                  aria-label="Decrease count"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setCount(0)}
                  className="btn-glass p-3"
                  aria-label="Reset count"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setCount((current) => current + 1)}
                  className="btn-primary p-3"
                  aria-label="Increase count"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
