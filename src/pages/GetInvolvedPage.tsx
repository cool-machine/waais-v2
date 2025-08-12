import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageSquare, Users, Calendar } from 'lucide-react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import GDPRCompliantForm from '../components/GDPRCompliantForm';

const GetInvolvedPage: React.FC = () => {
  const handleContactSubmit = (formData: { [key: string]: string }) => {
    console.log('Contact form submitted:', formData);
    // Handle the contact form submission
  };

  return (
    <div>
      <Hero
        title="Get Involved"
        subtitle="Join our community of Wharton alumni passionate about AI innovation and knowledge sharing."
        backgroundImage="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <SectionHeading
            title="Ways to Participate"
            subtitle="There are many ways to get involved with Wharton Alumni AI Studio and Research Center community."
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary-light p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Newsletter</h3>
              <p className="text-neutral mb-4">
                Stay updated with our monthly newsletter featuring events, resources, and community highlights.
              </p>
              <Link to="/get-involved/newsletter" className="text-primary hover:text-primary-dark font-medium">
                Subscribe →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary-light p-4 rounded-full inline-flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">WhatsApp Group</h3>
              <p className="text-neutral mb-4">
                Join our WhatsApp group for real-time discussions, event updates, and networking opportunities.
              </p>
              <Link to="/get-involved/whatsapp" className="text-primary hover:text-primary-dark font-medium">
                Join Group →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary-light p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Become a Mentor</h3>
              <p className="text-neutral mb-4">
                Share your expertise with early-stage AI startups and help them find product-market fit.
              </p>
              <Link to="/get-involved/mentor" className="text-primary hover:text-primary-dark font-medium">
                Apply Now →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary-light p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Volunteer</h3>
              <p className="text-neutral mb-4">
                Help organize events, create content, or contribute to our community in other ways.
              </p>
              <Link to="/get-involved/volunteer" className="text-primary hover:text-primary-dark font-medium">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-primary-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading
                title="Become a Mentor"
                subtitle="Share your expertise and help shape the future of AI innovation."
              />
              <p className="text-neutral mb-6">
                As a mentor in our Give Back program, you'll be matched with an early-stage AI startup that can benefit from your industry expertise and business acumen. This is a rewarding opportunity to:
              </p>
              <ul className="space-y-3 text-neutral mb-6">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Guide entrepreneurs through critical business challenges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Stay at the forefront of AI innovation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Expand your professional network</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Give back to Wharton Alumni AI Studio and Research Center community</span>
                </li>
              </ul>
              <Link to="/get-involved/mentor" className="btn btn-primary">
                Apply to Become a Mentor
              </Link>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Mentorship session"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <GDPRCompliantForm onSubmit={handleContactSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                </div>
              </GDPRCompliantForm>
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading
                title="Contact Us"
                subtitle="Have questions or want to learn more about getting involved?"
              />
              <p className="text-neutral mb-6">
                We're always happy to hear from Wharton alumni interested in our community. Whether you have questions about our programs, want to propose a collaboration, or are interested in volunteering, please reach out using the contact form.
              </p>
              <p className="text-neutral mb-6">
                Our team will get back to you within 2 business days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolvedPage;