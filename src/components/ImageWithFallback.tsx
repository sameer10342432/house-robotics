import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackText?: string;
  containerClassName?: string;
  zoomOnHover?: boolean;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackText,
  className = '',
  containerClassName = '',
  zoomOnHover = false,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Skeleton / Shimmer placeholder while image is loading */}
      {!loaded && !error && (
        <div 
          aria-hidden="true" 
          className="absolute inset-0 bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-100 animate-pulse"
        />
      )}

      {error ? (
        <div className="w-full h-full min-h-[140px] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#FAF9FF] to-[#F3F0FF] border border-[#E9E7F2] text-neutral-400 text-center rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-violet-100/60 text-[#6D28D9] flex items-center justify-center mb-2">
            <ImageOff className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-neutral-600">
            {fallbackText || alt || 'House Robotics Visual Asset'}
          </span>
          <span className="text-[10px] text-neutral-400 mt-0.5">High-Performance Media Asset</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`transition-all duration-500 ease-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${zoomOnHover ? 'group-hover:scale-[1.03]' : ''} ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
