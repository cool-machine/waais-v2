import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Partner } from '../types';

interface PartnerCardProps {
  partner: Partner;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
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
          src={partner.imageUrl}
          alt={partner.name}
          className="w-full h-32 object-contain bg-gray-50 p-4"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80";
          }}
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-neutral-dark dark:text-white">
            {partner.name}
          </h3>
          {partner.websiteUrl && (
            <a
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        
        <p className="text-neutral dark:text-gray-300 text-sm leading-relaxed">
          {partner.description}
        </p>
        
        {partner.websiteUrl && (
          <div className="mt-3">
            <a
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark text-sm font-medium"
            >
              Learn More →
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PartnerCard;