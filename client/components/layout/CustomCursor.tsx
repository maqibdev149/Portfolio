import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const springX = useSpring(cursorX, {
    damping: 25,
    stiffness: 150,
    mass: 0.5,
  });

  const springY = useSpring(cursorY, {
    damping: 25,
    stiffness: 150,
    mass: 0.5,
  });

  useEffect(() => {
    const checkTouchDevice = () => {
      return (
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0 ||
        matchMedia("(pointer:coarse)").matches
      );
    };

    if (checkTouchDevice()) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    const handleMouseEnter = (e: Event) => {
      if ((e.target as HTMLElement).closest("[data-cursor='hover']")) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: Event) => {
      if ((e.target as HTMLElement).closest("[data-cursor='hover']")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      style={{
        left: springX,
        top: springY,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        borderColor: isHovering ? "rgb(139, 92, 246)" : "rgba(255, 255, 255, 0.3)",
      }}
      transition={{ type: "spring", damping: 25, stiffness: 150 }}
      className="fixed w-5 h-5 rounded-full border-2 pointer-events-none z-50"
    />
  );
}
