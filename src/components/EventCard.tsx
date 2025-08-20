import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden hover-lift"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {event.imageUrl && (
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80";
            }}
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-neutral-dark dark:text-white">
            {event.title}
          </h3>
          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>
        
        <p className="text-neutral dark:text-gray-300 text-sm mb-4 leading-relaxed">
          {event.description}
        </p>
        
        <div className="space-y-2 text-sm text-neutral dark:text-gray-300">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-primary mr-2" />
            <span>{event.date}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-primary mr-2" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-primary mr-2" />
            <span>{event.location}</span>
          </div>
        </div>
        
        {event.registrationUrl && (
          <div className="mt-4">
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-sm w-full text-center"
            >
              Register Now
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EventCard;