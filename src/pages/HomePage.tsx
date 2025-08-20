import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Calendar, Lightbulb, BookOpen, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import EventCard from '../components/EventCard';
import StartupCard from '../components/StartupCard';
import PartnerCard from '../components/PartnerCard';
import NewsletterSignup from '../components/NewsletterSignup';
import AnimatedLogo from '../components/AnimatedLogo';
import AnimatedCounter from '../components/AnimatedCounter';
import TestimonialSlider from '../components/TestimonialSlider';
import AnimatedSection from '../components/AnimatedSection';
import ParticleBackground from '../components/ParticleBackground';
import { events } from '../data/events';
import { startups } from '../data/startups';
import { partners } from '../data/partners';

const HomePage: React.FC = () => {
  const upcomingEvents = events.filter(event => event.type === 'upcoming').slice(0, 3);
  const featuredStartups = startups.slice(0, 3);
  const featuredPartners = partners.slice(0, 4);

  return (
    <div>
      {/* Hero Section with Video Background */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-w-full min-h-full transform -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/hhYQ_X5C0mk?autoplay=1&mute=1&loop=1&playlist=hhYQ_X5C0mk&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
            title="Background video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
          ></iframe>
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-20 py-20 md:py-28 flex items-center justify-center min-h-screen">
          <div className="container-custom text-center">
            <motion.div
              className="relative z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                <div className="block whitespace-nowrap">Wharton Alumni AI Studio</div>
                <div className="block whitespace-nowrap">and Research Center</div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-200">
                  Connecting Wharton alumni to foster innovation, knowledge sharing, and collaboration in the AI space.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <Link
                  to="/events"
                  className="btn bg-primary hover:bg-primary-dark text-white"
                >
                  Explore Events
                </Link>
                <Link
                  to="/get-involved"
                  className="btn bg-transparent border border-white text-white hover:bg-white hover:text-neutral-dark"
                >
                  Join Our Community
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated Logo Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Empowering the <span className="text-gradient">Wharton Alumni Network</span> in AI
                </h2>
                <p className="text-neutral text-lg mb-6">
                  Wharton Alumni AI Studio and Research Center brings together alumni expertise to support innovation and knowledge sharing in artificial intelligence. Our community is built on collaboration, mentorship, and a shared passion for advancing AI technology.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/about" className="btn btn-primary">
                    About Us
                  </Link>
                  <Link to="/get-involved" className="btn btn-outline">
                    Get Involved
                  </Link>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <AnimatedLogo />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What We Do Section with Animated Counters */}
      <section className="section bg-primary-light relative">
        <ParticleBackground />
        <div className="container-custom relative z-10">
          <AnimatedSection>
            <SectionHeading
              title="What We Do"
              subtitle="Wharton Alumni AI Studio and Research Center brings together alumni expertise to support innovation and knowledge sharing in artificial intelligence."
              centered={true}
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <AnimatedSection delay={0.1}>
              <div className="text-center hover-lift">
                <div className="bg-white p-4 rounded-full inline-flex items-center justify-center mb-4 shadow-md">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Knowledge Sharing</h3>
                <p className="text-neutral">
                  We organize events for sharing knowledge and insights among alumni in the AI space.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="text-center hover-lift">
                <div className="bg-white p-4 rounded-full inline-flex items-center justify-center mb-4 shadow-md">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Startup Matching</h3>
                <p className="text-neutral">
                  We connect early-stage tech startups with experienced alumni who are industry experts.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="text-center hover-lift">
                <div className="bg-white p-4 rounded-full inline-flex items-center justify-center mb-4 shadow-md">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Pain Point Discussions</h3>
                <p className="text-neutral">
                  We facilitate meetings to identify and address key challenges in AI implementation.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="text-center hover-lift">
                <div className="bg-white p-4 rounded-full inline-flex items-center justify-center mb-4 shadow-md">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Strategic Partnerships</h3>
                <p className="text-neutral">
                  We partner with established organizations to create valuable events and resources.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <div className="mt-20">
            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <AnimatedCounter 
                  end={500} 
                  title="Alumni Members" 
                  icon={<Users className="h-6 w-6 text-primary" />} 
                />
                <AnimatedCounter 
                  end={48} 
                  title="Events Hosted" 
                  icon={<Calendar className="h-6 w-6 text-primary" />} 
                />
                <AnimatedCounter 
                  end={75} 
                  title="Startups Supported" 
                  icon={<Zap className="h-6 w-6 text-primary" />} 
                />
                <AnimatedCounter 
                  end={25} 
                  title="Global Partners" 
                  icon={<Globe className="h-6 w-6 text-primary" />} 
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="flex justify-between items-center mb-10">
              <SectionHeading
                title="Upcoming Events"
                subtitle="Join us for these exciting opportunities to learn and connect."
              />
              <Link to="/events" className="hidden md:flex items-center text-primary hover:text-primary-dark">
                View All Events <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <AnimatedSection key={event.id} delay={0.1 * index}>
                <EventCard event={event} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="mt-8 text-center md:hidden">
              <Link to="/events" className="btn btn-outline">
                View All Events
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-secondary-light">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading
              title="What Our Community Says"
              subtitle="Hear from members of our Wharton Alumni AI Studio and Research Center community."
              centered={true}
            />
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="mt-12 max-w-4xl mx-auto">
              <TestimonialSlider />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Startups Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="flex justify-between items-center mb-10">
              <SectionHeading
                title="Featured Startups"
                subtitle="Innovative AI startups founded or supported by our community."
              />
              <Link to="/startup-community/startups" className="hidden md:flex items-center text-primary hover:text-primary-dark">
                View All Startups <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredStartups.map((startup, index) => (
              <AnimatedSection key={startup.id} delay={0.1 * index}>
                <StartupCard startup={startup} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="mt-8 text-center md:hidden">
              <Link to="/startup-community/startups" className="btn btn-outline">
                View All Startups
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSignup />

      {/* Partners Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading
              title="Our Partners"
              subtitle="We collaborate with leading organizations to create value for our community."
              centered={true}
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {featuredPartners.map((partner, index) => (
              <AnimatedSection key={partner.id} delay={0.1 * index}>
                <PartnerCard partner={partner} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white relative overflow-hidden">
        <ParticleBackground />
        <div className="container-custom text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Get Involved?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join our community of Wharton alumni passionate about AI innovation and knowledge sharing.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/get-involved" className="btn bg-white text-primary hover:bg-gray-100">
                Join Our Community
              </Link>
              <Link to="/get-involved/mentor" className="btn bg-transparent border border-white text-white hover:bg-white hover:text-primary">
                Become a Mentor
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default HomePage;