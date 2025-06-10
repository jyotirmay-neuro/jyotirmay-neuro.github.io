import React, { useState } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  width,
  height 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Auto-resize images based on container
  const imageClasses = `
    ${className}
    ${isLoading ? 'opacity-0' : 'opacity-100'}
    transition-opacity duration-300
    max-w-full h-auto
    object-cover
    ${!width && !height ? 'w-full' : ''}
  `.trim();

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Image not found</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`} />
      )}
      <img
        src={src}
        alt={alt}
        className={imageClasses}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
};

export default ResponsiveImage;