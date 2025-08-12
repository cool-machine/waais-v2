import React from 'react';

interface VideoBackgroundProps {
  src?: string;
  poster?: string;
  className?: string;
  children?: React.ReactNode;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  src,
  poster,
  className = "",
  children 
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
        >
          <source src={src} type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-20" />
        </video>
      ) : (
        // Fallback gradient background if no video
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-secondary opacity-10" />
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;