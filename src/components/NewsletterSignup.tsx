import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import GDPRCompliantForm from './GDPRCompliantForm';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this to your backend
    console.log('Newsletter signup:', { name, email });
    setSubmitted(true);
    setEmail('');
    setName('');
  };

  const handleGDPRSubmit = (data: any, hasConsent: boolean) => {
    console.log('GDPR compliant newsletter signup:', { data, hasConsent });
    setSubmitted(true);
    setEmail('');
    setName('');
  };

  return (
    <div className="bg-primary-light py-16">
      <div className="container-custom text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-neutral text-lg mb-6">
              Get the latest news, event announcements, and resources delivered straight to your inbox.
            </p>
            {submitted ? (
              <div className="bg-green-100 text-green-700 p-4 rounded-md">
                <p className="font-medium">Thank you for subscribing!</p>
                <p>You'll receive our next newsletter soon.</p>
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <GDPRCompliantForm 
                  onSubmit={handleGDPRSubmit}
                  privacyText="We will use your email address to send you our monthly newsletter with updates about events, resources, and community news. You can unsubscribe at any time."
                  consentText="I consent to receiving Wharton Alumni AI Studio and Research Center newsletter and understand I can unsubscribe at any time."
                  showDataMinimization={false}
                >
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address *"
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </GDPRCompliantForm>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;