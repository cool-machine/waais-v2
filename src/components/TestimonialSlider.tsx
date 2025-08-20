import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "AI Product Manager",
    company: "TechCorp London",
    content: "The Wharton AI Studio has been instrumental in connecting me with like-minded professionals and cutting-edge AI insights. The community is incredibly supportive and knowledgeable.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Data Science Director",
    company: "FinanceAI",
    content: "Being part of this community has accelerated my understanding of AI applications in finance. The networking opportunities and knowledge sharing are unparalleled.",
  },
  {
    id: 3,
    name: "Dr. Emma Wilson",
    role: "AI Research Lead",
    company: "Healthcare Innovations",
    content: "The quality of discussions and the expertise within the Wharton AI Studio community is remarkable. It's become an essential part of my professional development.",
  },
];

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative bg-white dark:bg-dark-lighter rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      <div className="absolute top-4 left-4">
        <Quote className="h-8 w-8 text-primary opacity-20" />
      </div>
      
      <div className="relative z-10">
        <blockquote className="text-lg md:text-xl text-neutral dark:text-gray-300 mb-6 italic">
          "{currentTestimonial.content}"
        </blockquote>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {currentTestimonial.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="font-semibold text-neutral-dark dark:text-white">
                {currentTestimonial.name}
              </div>
              <div className="text-sm text-neutral dark:text-gray-400">
                {currentTestimonial.role} at {currentTestimonial.company}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex 
                ? 'bg-primary' 
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;