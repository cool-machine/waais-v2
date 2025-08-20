import React from 'react';
import { motion } from 'framer-motion';

interface FloatingContentProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const FloatingContent: React.FC<FloatingContentProps> = ({ 
  children, 
  delay = 0,
  duration = 3,
  className = ""
}) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ 
        y: [-10, 10, -10],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FloatingContent;