import React from 'react';

interface DecorativeBackgroundProps {
  variant?: 'grid' | 'dots' | 'gradient-mesh' | 'ai-nodes';
  className?: string;
}

export const DecorativeBackground: React.FC<DecorativeBackgroundProps> = ({
  variant = 'grid',
  className = ''
}) => {
  return (
    <div 
      aria-hidden="true" 
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
    >
      {variant === 'grid' && (
        <svg 
          className="absolute inset-0 w-full h-full opacity-[0.035]" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid-pattern" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#6D28D9" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      )}

      {variant === 'dots' && (
        <svg 
          className="absolute inset-0 w-full h-full opacity-[0.045]" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dots-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.5" fill="#6D28D9" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-pattern)" />
        </svg>
      )}

      {variant === 'gradient-mesh' && (
        <>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse-subtle" />
          <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
        </>
      )}

      {variant === 'ai-nodes' && (
        <svg 
          className="absolute inset-0 w-full h-full opacity-[0.06]" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <circle cx="10%" cy="20%" r="4" fill="#6D28D9" />
          <circle cx="35%" cy="40%" r="5" fill="#2563EB" />
          <circle cx="65%" cy="30%" r="4" fill="#06B6D4" />
          <circle cx="90%" cy="50%" r="5" fill="#6D28D9" />
          <circle cx="50%" cy="80%" r="4" fill="#7C3AED" />
          <line x1="10%" y1="20%" x2="35%" y2="40%" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="35%" y1="40%" x2="65%" y2="30%" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="65%" y1="30%" x2="90%" y2="50%" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="35%" y1="40%" x2="50%" y2="80%" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>
      )}
    </div>
  );
};
