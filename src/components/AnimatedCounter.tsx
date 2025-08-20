import React from 'react';

interface AnimatedCounterProps {
  end: number;
  title: string;
  icon: React.ReactElement;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, title, icon }) => {
  return (
    <div className="text-center bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
        {end}+
      </div>
      <div className="text-neutral text-sm uppercase tracking-wide">
        {title}
      </div>
    </div>
  );
};

export default AnimatedCounter;