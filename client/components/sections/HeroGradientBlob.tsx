/** Lightweight CSS substitute when WebGL is unavailable or reduced motion is preferred. */
export function HeroGradientBlob() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center lg:justify-end lg:pr-[8%]"
      aria-hidden
    >
      <div className="relative w-72 h-72 md:w-[420px] md:h-[420px]">
        <div className="hero-gradient-blob top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full" />
        <div className="hero-gradient-blob-secondary top-1/3 right-0 w-40 h-40 md:w-56 md:h-56" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-20 md:w-44 md:h-28 rounded-lg border border-primary/30 bg-white/[0.04] backdrop-blur-sm shadow-glow-brand" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-8 md:translate-y-12 w-40 h-1.5 md:w-52 rounded-full bg-gradient-main opacity-70 blur-[1px]" />
      </div>
    </div>
  );
}
