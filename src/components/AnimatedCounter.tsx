import React from 'react';

interface AnimatedCounterProps {
  value: number;
  label: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, label }) => {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-2">
        {value}+
      </div>
      <div className="text-neutral dark:text-gray-300 text-sm uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
};

export default AnimatedCounter;