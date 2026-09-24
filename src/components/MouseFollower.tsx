import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useReducedMotion } from 'motion/react';

export const MouseFollower: React.FC = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Soft spring lag for an organic, ambient floating feel
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  useEffect(() => {
    // Only enable on desktop devices with a precision mouse cursor
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasHover || shouldReduceMotion) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldReduceMotion, isVisible, mouseX, mouseY]);

  if (!isSupported || shouldReduceMotion) return null;

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isVisible ? 0.35 : 0
      }}
      transition={{ opacity: { duration: 0.4 } }}
      className="fixed top-0 left-0 w-64 h-64 rounded-full pointer-events-none z-30 transition-opacity blur-3xl bg-radial from-violet-400/25 via-blue-400/10 to-transparent"
      aria-hidden="true"
    />
  );
};
