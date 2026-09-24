import React from 'react';
import { motion, useReducedMotion, Variants } from 'motion/react';
import { smoothEasing } from '../utils/animations';

export type AnimationType = 
  | 'fade-up' 
  | 'fade-in' 
  | 'slide-up' 
  | 'slide-left' 
  | 'slide-right' 
  | 'scale-in';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  direction?: AnimationType;
  delay?: number; // ms
  duration?: number; // ms
  className?: string;
  threshold?: number;
}

const getVariants = (type: AnimationType, delaySeconds: number, durationSeconds: number): Variants => {
  switch (type) {
    case 'fade-up':
      return {
        hidden: { opacity: 0, y: 26 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: durationSeconds,
            delay: delaySeconds,
            ease: smoothEasing
          }
        }
      };
    case 'slide-up':
      return {
        hidden: { opacity: 0, y: 44 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: durationSeconds,
            delay: delaySeconds,
            ease: smoothEasing
          }
        }
      };
    case 'slide-left':
      return {
        hidden: { opacity: 0, x: -32 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: durationSeconds,
            delay: delaySeconds,
            ease: smoothEasing
          }
        }
      };
    case 'slide-right':
      return {
        hidden: { opacity: 0, x: 32 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: durationSeconds,
            delay: delaySeconds,
            ease: smoothEasing
          }
        }
      };
    case 'scale-in':
      return {
        hidden: { opacity: 0, scale: 0.94 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: durationSeconds,
            delay: delaySeconds,
            ease: smoothEasing
          }
        }
      };
    case 'fade-in':
    default:
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: durationSeconds,
            delay: delaySeconds,
            ease: smoothEasing
          }
        }
      };
  }
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation,
  direction,
  delay = 0,
  duration = 650,
  className = '',
  threshold = 0.15
}) => {
  const shouldReduceMotion = useReducedMotion();
  const chosenAnimation: AnimationType = animation || direction || 'fade-up';

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const delaySeconds = delay / 1000;
  const durationSeconds = duration / 1000;
  const variants = getVariants(chosenAnimation, delaySeconds, durationSeconds);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
