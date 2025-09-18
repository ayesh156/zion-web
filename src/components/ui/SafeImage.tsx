'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FileImage, Loader2 } from 'lucide-react';

interface SafeImageProps {
  src: string; 
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  fallbackComponent?: React.ReactNode;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fill = false,
  width,
  height,
  sizes,
  priority = false,
  onLoad,
  onError,
  fallbackComponent
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
    console.error('Failed to load image:', src);
  };

  // Validate URL
  if (!src || typeof src !== 'string' || src.trim() === '') {
    return (
      <div className={`flex items-center justify-center bg-gray-200 ${className}`}>
        {fallbackComponent || <FileImage className="w-8 h-8 text-gray-400" />}
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 ${className}`}>
        {fallbackComponent || (
          <div className="text-center text-gray-500">
            <FileImage className="w-8 h-8 mx-auto mb-1" />
            <p className="text-xs">Failed to load</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gray-100">
      {/* Loading indicator */}
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 ${className}`}>
          <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
        </div>
      )}
      
      {/* Actual image */}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        unoptimized={false}
      />
    </div>
  );
};

export default SafeImage;
