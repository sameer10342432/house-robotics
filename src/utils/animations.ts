// Central animation definitions and variants for House Robotics
// Built on motion/react (Framer Motion v12) with GPU-accelerated transforms

import { Variants, Transition } from 'motion/react';

// Standard high-end agency easing
export const smoothEasing = [0.16, 1, 0.3, 1] as const;

export const defaultTransition: Transition = {
  duration: 0.65,
  ease: smoothEasing
};

export const quickTransition: Transition = {
  duration: 0.25,
  ease: smoothEasing
};

// Reusable viewport reveal variants
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: customDelay,
      ease: smoothEasing
    }
  })
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: customDelay,
      ease: smoothEasing
    }
  })
};

export const scaleInVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: customDelay,
      ease: smoothEasing
    }
  })
};

export const slideLeftVariant: Variants = {
  hidden: { opacity: 0, x: -35 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      delay: customDelay,
      ease: smoothEasing
    }
  })
};

export const slideRightVariant: Variants = {
  hidden: { opacity: 0, x: 35 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      delay: customDelay,
      ease: smoothEasing
    }
  })
};

// Stagger container for multi-item grids
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

// Hero sequence staggered entrance
export const heroContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

export const heroItemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: smoothEasing
    }
  }
};

// Micro-interaction presets for interactive elements
export const buttonTapVariants = {
  hover: {
    y: -2,
    scale: 1.02,
    transition: { duration: 0.2, ease: smoothEasing }
  },
  tap: {
    scale: 0.97,
    transition: { duration: 0.1 }
  }
};

export const cardHoverVariants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.015,
    transition: { duration: 0.25, ease: smoothEasing }
  }
};

export const iconHoverVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.08,
    rotate: 3,
    transition: { duration: 0.2, ease: smoothEasing }
  }
};

// Dropdown menu transitions
export const dropdownMenuVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: { duration: 0.18, ease: smoothEasing }
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: smoothEasing }
  },
  exit: {
    opacity: 0,
    y: 6,
    scale: 0.98,
    transition: { duration: 0.16, ease: smoothEasing }
  }
};

// Page route transition variants
export const pageTransitionVariant: Variants = {
  initial: {
    opacity: 0,
    y: 10
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: smoothEasing
    }
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.25,
      ease: smoothEasing
    }
  }
};
