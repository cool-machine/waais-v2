import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Users, Calendar } from 'lucide-react';
import { Startup } from '../types';

interface StartupCardProps {
  startup: Startup;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden hover-lift"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={startup.imageUrl}
          alt={startup.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80";
          }}
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-neutral-dark dark:text-white">
            {startup.name}
          </h3>
          {startup.websiteUrl && (
            <a
              href={startup.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>
        
        <p className="text-neutral dark:text-gray-300 text-sm mb-4 leading-relaxed">
          {startup.description}
        </p>
        
        <div className="space-y-2 text-sm text-neutral dark:text-gray-300">
          <div className="flex items-center">
            <span className="font-medium text-primary mr-2">Industry:</span>
            <span>{startup.industry}</span>
          </div>
          
          <div className="flex items-center">
            <span className="font-medium text-primary mr-2">Stage:</span>
            <span>{startup.stage}</span>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-primary mr-2" />
            <span>Founded {startup.founded}</span>
          </div>
          
          {startup.founders && startup.founders.length > 0 && (
            <div className="flex items-start">
              <Users className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <div>
                <span className="font-medium">Founders:</span>
                <div className="text-xs mt-1">
                  {startup.founders.join(', ')}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StartupCard;