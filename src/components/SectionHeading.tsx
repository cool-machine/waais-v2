import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  centered = false 
}) => {
  return (
    <div className={centered ? 'text-center' : ''}>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-dark dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-neutral dark:text-gray-300 text-lg max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;