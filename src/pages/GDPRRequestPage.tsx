import React, { useState } from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { Shield, Download, Edit, Trash2, Eye, StopCircle, ArrowRight } from 'lucide-react';

const GDPRRequestPage: React.FC = () => {
  const [formData, setFormData] = useState({
    requestType: '',
    name: '',
    email: '',
    verificationMethod: 'email',
    additionalInfo: '',
    agreeToVerification: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this to your backend
    console.log('GDPR request submitted:', formData);
    setSubmitted(true);
  };

  const requestTypes = [
    {
      value: 'access',
      label: 'Access Request',
      description: 'Get a copy of your personal data',
      icon: <Eye className="h-5 w-5" />
    },
    {
      value: 'rectification',
      label: 'Rectification Request',
      description: 'Correct inaccurate or incomplete data',
      icon: <Edit className="h-5 w-5" />
    },
    {
      value: 'erasure',
      label: 'Erasure Request',
      description: 'Delete your personal data ("right to be forgotten")',
      icon: <Trash2 className="h-5 w-5" />
    },
    {
      value: 'restriction',
      label: 'Restriction Request',
      description: 'Limit how we process your data',
      icon: <StopCircle className="h-5 w-5" />
    },
    {
      value: 'portability',
      label: 'Data Portability Request',
      description: 'Receive your data in a machine-readable format',
      icon: <Download className="h-5 w-5" />
    },
    {
      value: 'objection',
      label: 'Objection Request',
      description: 'Object to processing based on legitimate interests',
      icon: <Shield className="h-5 w-5" />
    }
  ];

  return (
    <div>
      <Hero
        title="GDPR Data Subject Rights"
        subtitle="Exercise your rights under the General Data Protection Regulation"
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Your Rights Under GDPR</h2>
              <p className="text-neutral mb-6">
                As a data subject, you have several rights regarding your personal data. 
                Use this form to exercise any of these rights. We will respond to your request within one month.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {requestTypes.map((type) => (
                  <div key={type.value} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                    <div className="flex items-center mb-2">
                      <div className="text-primary mr-2">{type.icon}</div>
                      <h3 className="font-semibold">{type.label}</h3>
                    </div>
                    <p className="text-sm text-neutral">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {submitted ? (
              <motion.div 
                className="bg-green-50 border border-green-200 rounded-lg p-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Shield className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">Request Submitted Successfully</h3>
                <p className="text-green-700 mb-6">
                  We have received your GDPR request. We will verify your identity and respond within one month
                  as required by law. You will receive a confirmation email shortly.
                </p>
                <div className="bg-white border border-green-200 rounded-lg p-4 text-left">
                  <h4 className="font-semibold text-green-800 mb-2">What happens next?</h4>
                  <ol className="text-sm text-green-700 space-y-1">
                    <li>1. We will verify your identity using the method you selected</li>
                    <li>2. We will process your request within one month</li>
                    <li>3. You will receive our response via email</li>
                    <li>4. If needed, we may contact you for additional information</li>
                  </ol>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="bg-white rounded-lg shadow-md p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-6">Submit a GDPR Request</h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-neutral-dark font-medium mb-3">
                      Type of Request <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {requestTypes.map((type) => (
                        <label key={type.value} className="flex items-start cursor-pointer">
                          <input
                            type="radio"
                            name="requestType"
                            value={type.value}
                            checked={formData.requestType === type.value}
                            onChange={handleChange}
                            required
                            className="mt-1 mr-3"
                          />
                          <div>
                            <div className="flex items-center mb-1">
                              <div className="text-primary mr-2">{type.icon}</div>
                              <span className="font-medium">{type.label}</span>
                            </div>
                            <span className="text-sm text-neutral">{type.description}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-neutral-dark font-medium mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-neutral-dark font-medium mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="verificationMethod" className="block text-neutral-dark font-medium mb-1">
                      Identity Verification Method <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="verificationMethod"
                      name="verificationMethod"
                      value={formData.verificationMethod}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="email">Email verification</option>
                      <option value="phone">Phone verification</option>
                      <option value="document">Document verification</option>
                    </select>
                    <p className="text-sm text-neutral mt-1">
                      We need to verify your identity before processing your request to protect your privacy.
                    </p>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="additionalInfo" className="block text-neutral-dark font-medium mb-1">
                      Additional Information
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Please provide any additional details about your request..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>

                  <div className="mb-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreeToVerification"
                        checked={formData.agreeToVerification}
                        onChange={handleChange}
                        required
                        className="mt-1 mr-2"
                      />
                      <span className="text-sm text-neutral">
                        I understand that my identity will be verified before processing this request, 
                        and I consent to the processing of my personal data for this purpose. 
                        I confirm that the information provided is accurate and complete. <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="btn bg-primary hover:bg-primary-dark text-white w-full"
                    disabled={!formData.agreeToVerification || !formData.requestType}
                  >
                    Submit GDPR Request
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </form>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Important Information</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• We will respond to your request within one month</li>
                    <li>• Complex requests may take up to three months (we will inform you)</li>
                    <li>• We may ask for additional information to verify your identity</li>
                    <li>• Some requests may be refused if they are unfounded or excessive</li>
                    <li>• You have the right to lodge a complaint with a supervisory authority</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GDPRRequestPage;