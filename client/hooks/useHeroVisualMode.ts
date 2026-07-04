import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type HeroVisualMode = "css-fallback" | "mobile-3d" | "desktop-3d";

function prefersReducedMotionMedia(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isMobileOrTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || navigator.maxTouchPoints > 0;
}

export function checkWebGLSupport(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

function resolveVisualMode(reducedMotion: boolean): HeroVisualMode {
  if (reducedMotion || prefersReducedMotionMedia()) {
    return "css-fallback";
  }
  if (!checkWebGLSupport()) {
    return "css-fallback";
  }
  return isMobileOrTouchDevice() ? "mobile-3d" : "desktop-3d";
}

export function useHeroVisualMode(): HeroVisualMode {
  const framerReducedMotion = useReducedMotion();
  const [mode, setMode] = useState<HeroVisualMode>("css-fallback");

  useEffect(() => {
    const update = () => {
      setMode(resolveVisualMode(!!framerReducedMotion));
    };

    update();

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => update();
    motionQuery.addEventListener("change", onMotionChange);
    window.addEventListener("resize", update);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", update);
    };
  }, [framerReducedMotion]);

  return mode;
}
