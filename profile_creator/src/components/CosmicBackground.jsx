import React from 'react';

const CosmicBackground = ({ children, className = "" }) => {
  const generateStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 3 + 1
    }));
  };

  const stars = generateStars(50);

  return (
    <div className={`relative min-h-screen cosmic-gradient overflow-hidden ${className}`}>
      {/* Animated stars */}
      {stars?.map((star) => (
        <div
          key={star?.id}
          className="absolute rounded-full bg-white star-twinkle"
          style={{
            left: `${star?.left}%`,
            top: `${star?.top}%`,
            width: `${star?.size}px`,
            height: `${star?.size}px`,
            animationDelay: `${star?.delay}s`
          }}
        />
      ))}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default CosmicBackground;