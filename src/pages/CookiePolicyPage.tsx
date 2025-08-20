import React from 'react';
import Hero from '../components/Hero';

const CookiePolicyPage: React.FC = () => {
  return (
    <div>
      <Hero
        title="Cookie Policy"
        subtitle="How we use cookies and similar technologies on our website"
        backgroundImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-0">
                <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device when you visit our website. 
              They help us provide you with a better browsing experience by remembering your preferences 
              and understanding how you use our site.
            </p>

            <h2>2. How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul>
              <li><strong>Essential functionality:</strong> To ensure our website works properly</li>
              <li><strong>Performance and analytics:</strong> To understand how visitors use our site</li>
              <li><strong>Functionality:</strong> To remember your preferences and settings</li>
              <li><strong>Marketing:</strong> To deliver relevant advertisements (with your consent)</li>
            </ul>

            <h2>3. Types of Cookies We Use</h2>

            <h3>3.1 Necessary Cookies</h3>
            <p>
              These cookies are essential for the website to function properly. They cannot be disabled 
              as they are necessary for basic website functionality.
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Cookie Name</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Purpose</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">cookieConsent</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Stores your cookie preferences</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">theme</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Remembers your dark/light mode preference</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">adminUser</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Admin authentication session</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>3.2 Analytics Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our website by collecting 
              and reporting information anonymously.
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Cookie Name</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Provider</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Purpose</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">_ga</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Google Analytics</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Distinguishes unique users</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">2 years</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">_ga_*</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Google Analytics</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Collects data on user behavior</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">2 years</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">_gid</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Google Analytics</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Distinguishes unique users</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">24 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>3.3 Functional Cookies</h3>
            <p>
              These cookies enable enhanced functionality and personalization features.
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Cookie Name</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Purpose</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">language</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Remembers your language preference</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">preferences</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Stores your site preferences</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">6 months</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>3.4 Marketing Cookies</h3>
            <p>
              These cookies are used to deliver advertisements that are relevant to you and your interests.
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Cookie Name</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Provider</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Purpose</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">_fbp</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Facebook</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Tracks user behavior for advertising</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">3 months</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">ads/ga-audiences</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Google</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Creates audience segments</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>4. Third-Party Cookies</h2>
            <p>Some cookies are set by third-party services that appear on our pages:</p>
            <ul>
              <li><strong>Google Analytics:</strong> Web analytics service</li>
              <li><strong>YouTube:</strong> Video embedding service</li>
              <li><strong>Social Media Platforms:</strong> Social sharing buttons</li>
            </ul>

            <h2>5. Managing Your Cookie Preferences</h2>
            <p>You can control and manage cookies in several ways:</p>

            <h3>5.1 Cookie Banner</h3>
            <p>
              When you first visit our website, you'll see a cookie banner where you can:
            </p>
            <ul>
              <li>Accept all cookies</li>
              <li>Reject non-essential cookies</li>
              <li>Customize your preferences</li>
            </ul>

            <h3>5.2 Browser Settings</h3>
            <p>You can also manage cookies through your browser settings:</p>
            <ul>
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
            </ul>

            <h3>5.3 Opt-Out Links</h3>
            <p>You can opt out of specific tracking services:</p>
            <ul>
              <li>
                <strong>Google Analytics:</strong>{' '}
                <a 
                  href="https://tools.google.com/dlpage/gaoptout" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
              </li>
              <li>
                <strong>Facebook:</strong>{' '}
                <a 
                  href="https://www.facebook.com/settings?tab=ads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark"
                >
                  Facebook Ad Preferences
                </a>
              </li>
            </ul>

            <h2>6. Impact of Disabling Cookies</h2>
            <p>If you disable cookies, some features of our website may not work properly:</p>
            <ul>
              <li>Your preferences may not be saved</li>
              <li>Some interactive features may be limited</li>
              <li>We may not be able to provide personalized content</li>
              <li>Analytics data will not be collected</li>
            </ul>

            <h2>7. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons. Please check this page periodically 
              for updates.
            </p>

            <h2>8. Contact Us</h2>
            <p>If you have questions about our use of cookies, please contact us:</p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="mb-2"><strong>Email:</strong> info@whartonaistudio.org</p>
              <p className="mb-0"><strong>Address:</strong> 2bis Place de Touraine, 78000 Versailles, France</p>
            </div>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                <strong>Want to change your cookie preferences?</strong>
              </p>
              <button 
                onClick={() => {
                  localStorage.removeItem('cookieConsent');
                  window.location.reload();
                }}
                className="btn btn-primary text-sm"
              >
                Update Cookie Preferences
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicyPage;