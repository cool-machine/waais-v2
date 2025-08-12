import React from 'react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div>
      <Hero
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information"
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
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

            <h2>1. Data Controller</h2>
            <p>
              The data controller responsible for your personal information is:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="mb-2"><strong>Wharton Alumni AI Studio and Research Center</strong></p>
              <p className="mb-2">2bis Place de Touraine<br />78000 Versailles<br />France</p>
              <p className="mb-0"><strong>Email:</strong> info@whartonaistudio.org</p>
            </div>

            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Information You Provide</h3>
            <ul>
              <li><strong>Contact Information:</strong> Name, email address, phone number</li>
              <li><strong>Professional Information:</strong> Company, job title, graduation year</li>
              <li><strong>Communication Data:</strong> Messages, feedback, and correspondence</li>
              <li><strong>Event Registration:</strong> Event preferences, dietary requirements</li>
              <li><strong>Membership Information:</strong> Alumni status, areas of interest</li>
            </ul>

            <h3>2.2 Information Automatically Collected</h3>
            <ul>
              <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent, click patterns</li>
              <li><strong>Cookies:</strong> See our <a href="/cookie-policy" className="text-primary hover:text-primary-dark">Cookie Policy</a> for details</li>
            </ul>

            <h2>3. Legal Basis for Processing</h2>
            <p>We process your personal data based on the following legal grounds:</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Purpose</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Legal Basis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Newsletter subscription</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Consent (Article 6(1)(a))</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Event registration</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Contract (Article 6(1)(b))</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Website analytics</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Legitimate interest (Article 6(1)(f))</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Legal compliance</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Legal obligation (Article 6(1)(c))</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>4. How We Use Your Information</h2>
            <ul>
              <li>Provide and improve our services</li>
              <li>Send newsletters and event notifications (with consent)</li>
              <li>Process event registrations and membership applications</li>
              <li>Respond to inquiries and provide customer support</li>
              <li>Analyze website usage to improve user experience</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and ensure security</li>
            </ul>

            <h2>5. Data Sharing and Recipients</h2>
            <p>We may share your personal data with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Microsoft Azure (hosting), Google Workspace for Non Profits (email), Slack (internal communication), WhatsApp (community groups)</li>
              <li><strong>Event Partners:</strong> Co-organizers and venue providers (for events only)</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
            </ul>
            <p>We do not sell your personal data to third parties.</p>

            <h2>6. International Data Transfers</h2>
            <p>
              All our data processing takes place within the EU/EEA. We do not transfer personal data outside the European Economic Area.
            </p>

            <h2>7. Data Retention</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Data Type</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Retention Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Newsletter subscriptions</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Until unsubscribed + 1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Event registrations</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">3 years after event</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Contact inquiries</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">2 years after resolution</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Website analytics</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">26 months</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>8. Your Rights</h2>
            <p>Under GDPR, you have the following rights:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
              <li><strong>Restriction:</strong> Limit how we process your data</li>
              <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent at any time (where applicable)</li>
            </ul>

            <p>
              To exercise these rights, contact us at <a href="mailto:info@whartonaistudio.org" className="text-primary hover:text-primary-dark">info@whartonaistudio.org</a>. 
              We will respond within one month.
            </p>

            <h2>9. Security Measures</h2>
            <p>We implement appropriate technical and organizational measures to protect your data:</p>
            <ul>
              <li>SSL/TLS encryption for data transmission</li>
              <li>Access controls and authentication</li>
              <li>Regular security updates and monitoring</li>
              <li>Data encryption at rest</li>
              <li>Staff training on data protection</li>
              <li>Incident response procedures</li>
            </ul>

            <h2>10. Data Breach Notification</h2>
            <p>
              In case of a data breach that poses a high risk to your rights and freedoms, 
              we will notify you without undue delay and inform the relevant supervisory authority within 72 hours.
            </p>

            <h2>11. Cookies</h2>
            <p>
              We use cookies to improve your browsing experience. For detailed information about our use of cookies, 
              please see our <a href="/cookie-policy" className="text-primary hover:text-primary-dark">Cookie Policy</a>.
            </p>

            <h2>12. Children's Privacy</h2>
            <p>
              Our services are not directed to children under 16. We do not knowingly collect personal data from children under 16. 
              If you believe we have collected such data, please contact us immediately.
            </p>

            <h2>13. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by 
              posting the new policy on our website and updating the "Last updated" date.
            </p>

            <h2>14. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or our data practices, contact us:</p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="mb-2"><strong>Email:</strong> info@whartonaistudio.org</p>
              <p className="mb-0"><strong>Address:</strong> 2bis Place de Touraine, 78000 Versailles, France</p>
            </div>

            <h2>15. Supervisory Authority</h2>
            <p>
              You have the right to lodge a complaint with a supervisory authority. For complaints related to our data processing, 
              you can contact the French data protection authority (CNIL) at:{' '}
              <a 
                href="https://www.cnil.fr/en/home" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark"
              >
                https://www.cnil.fr/en/home
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;