import React from 'react';
import { TeamMember } from '../types';
import { motion } from 'framer-motion';

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden hover-lift"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="aspect-w-3 aspect-h-4">
        <img
          src={member.imageUrl}
          alt={member.name}
          className="w-full h-64 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80";
          }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-neutral-dark dark:text-white mb-2">
          {member.name}
        </h3>
        <p className="text-primary font-medium mb-3">
          {member.role}
        </p>
        <p className="text-neutral dark:text-gray-300 text-sm leading-relaxed">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;