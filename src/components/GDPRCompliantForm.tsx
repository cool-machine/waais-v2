import React, { useState } from 'react';
import { Shield } from 'lucide-react';

interface GDPRCompliantFormProps {
  children: React.ReactNode;
  onSubmit: (data: any, hasConsent: boolean) => void;
  privacyText?: string;
  consentText?: string;
  showDataMinimization?: boolean;
}

const GDPRCompliantForm: React.FC<GDPRCompliantFormProps> = ({
  children,
  onSubmit,
  privacyText = "We will use your information to respond to your inquiry. For more details, see our Privacy Policy.",
  consentText = "I consent to the processing of my personal data for the purposes stated above.",
  showDataMinimization = true
}) => {
  const [hasConsent, setHasConsent] = useState(false);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConsent) {
      alert('Please provide consent to process your personal data.');
      return;
    }
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data, hasConsent);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {children}
      
      {/* Data Minimization Notice */}
      {showDataMinimization && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-1">
                Data Protection Notice
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                We only collect the minimum data necessary to fulfill your request. 
                Fields marked with * are required for processing.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Information */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <button
          type="button"
          onClick={() => setShowPrivacyInfo(!showPrivacyInfo)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-medium text-neutral-dark dark:text-white">
            How we use your data
          </span>
          <span className="text-primary">
            {showPrivacyInfo ? '−' : '+'}
          </span>
        </button>
        
        {showPrivacyInfo && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-neutral dark:text-gray-300 mb-3">
              {privacyText}
            </p>
            <div className="text-xs text-neutral dark:text-gray-400 space-y-1">
              <p><strong>Legal basis:</strong> Consent (Article 6(1)(a) GDPR)</p>
              <p><strong>Data retention:</strong> 2 years after resolution</p>
              <p><strong>Your rights:</strong> Access, rectification, erasure, restriction, portability, objection</p>
              <p>
                <strong>Contact:</strong>{' '}
                <a href="mailto:info@whartonaistudio.org" className="text-primary hover:text-primary-dark">
                  info@whartonaistudio.org
                </a>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start">
        <input
          type="checkbox"
          id="gdpr-consent"
          checked={hasConsent}
          onChange={(e) => setHasConsent(e.target.checked)}
          required
          className="mt-1 mr-3 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label htmlFor="gdpr-consent" className="text-sm text-neutral dark:text-gray-300">
          {consentText} You can withdraw your consent at any time by contacting us at{' '}
          <a href="mailto:info@whartonaistudio.org" className="text-primary hover:text-primary-dark">
            info@whartonaistudio.org
          </a>. 
          Read our{' '}
          <a href="/privacy-policy" className="text-primary hover:text-primary-dark">
            Privacy Policy
          </a>{' '}
          for more information. <span className="text-red-500">*</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!hasConsent}
        className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
          hasConsent
            ? 'bg-primary hover:bg-primary-dark text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Submit
      </button>

      {/* Additional GDPR Information */}
      <div className="text-xs text-neutral dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        <p>
          By submitting this form, you acknowledge that you have read and understood our{' '}
          <a href="/privacy-policy" className="text-primary hover:text-primary-dark">Privacy Policy</a>.
          You have the right to lodge a complaint with a supervisory authority if you believe 
          your data protection rights have been violated.
        </p>
      </div>
    </form>
  );
};

export default GDPRCompliantForm;