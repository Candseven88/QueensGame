import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { GamingBackground } from '../components/ui/EnhancedBackground';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <GamingBackground interactive={false} />
      
      <div className="relative z-10">
        <Header />
        
        <main className="pt-28 sm:pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="premium-card p-8">
              <h1 className="text-4xl font-bold text-white mb-8 gradient-text-neon">
                Privacy Policy
              </h1>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-6">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>
                
                <div className="space-y-8 text-gray-300">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">1.1 Automatically Collected Information</h3>
                      <p>
                        When you visit QueensGame, we automatically collect certain information about your device and usage:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>IP address and general location information</li>
                        <li>Browser type, version, and language settings</li>
                        <li>Device information (type, operating system, screen resolution)</li>
                        <li>Pages visited, time spent on pages, and click data</li>
                        <li>Referring website information</li>
                        <li>Game play statistics and preferences</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold text-white">1.2 Cookies and Tracking Technologies</h3>
                      <p>
                        We use cookies and similar tracking technologies to enhance your gaming experience:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                        <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                        <li><strong>Advertising Cookies:</strong> Used to display relevant advertisements</li>
                        <li><strong>Game Progress Cookies:</strong> Save your game progress and preferences</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                    <p>We use the collected information for the following purposes:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provide and maintain our gaming platform</li>
                      <li>Improve user experience and website functionality</li>
                      <li>Analyze usage patterns and optimize performance</li>
                      <li>Display personalized advertisements through Google AdSense</li>
                      <li>Prevent fraud and ensure website security</li>
                      <li>Comply with legal obligations</li>
                      <li>Communicate with users when necessary</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">3. Third-Party Services and Advertising</h2>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">3.1 Google AdSense</h3>
                      <p>
                        We use Google AdSense to display advertisements. Google may use cookies and web beacons to collect information about your visits to this and other websites to provide relevant advertisements. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.
                      </p>
                      
                      <h3 className="text-xl font-semibold text-white">3.2 Game Providers</h3>
                      <p>
                        Our games are provided by third-party services including GameMonetize. These services may collect their own data according to their privacy policies.
                      </p>
                      
                      <h3 className="text-xl font-semibold text-white">3.3 Analytics Services</h3>
                      <p>
                        We use analytics services to understand user behavior and improve our platform. These services may collect and process data according to their own privacy policies.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing and Disclosure</h2>
                    <p>We may share your information in the following circumstances:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>With Service Providers:</strong> Third-party companies that help us operate our website</li>
                      <li><strong>For Legal Compliance:</strong> When required by law or to protect our rights</li>
                      <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                      <li><strong>With Consent:</strong> When you explicitly agree to share information</li>
                    </ul>
                    <p className="mt-4">
                      <strong>We do not sell your personal information to third parties.</strong>
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
                    <p>
                      We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights and Choices</h2>
                    <p>You have the following rights regarding your personal information:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Access:</strong> Request information about data we collect about you</li>
                      <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                      <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                      <li><strong>Cookie Control:</strong> Manage cookies through your browser settings</li>
                      <li><strong>Opt-out:</strong> Opt out of personalized advertising</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">7. Children's Privacy</h2>
                    <p>
                      Our website is designed for general audiences and does not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">8. International Data Transfers</h2>
                    <p>
                      Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Privacy Policy</h2>
                    <p>
                      We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
                    <p>
                      If you have any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg mt-4">
                      <p><strong>Email:</strong> privacy@queensgame.com</p>
                      <p><strong>Website:</strong> Contact form available at /contact</p>
                      <p><strong>Response Time:</strong> We aim to respond within 48 hours</p>
                    </div>
                  </section>

                  <section className="border-t border-gray-600 pt-6">
                    <h2 className="text-2xl font-bold text-white mb-4">GDPR Compliance Notice</h2>
                    <p>
                      For users in the European Union, we comply with the General Data Protection Regulation (GDPR). You have additional rights under GDPR, including the right to data portability and the right to object to processing. To exercise these rights, please contact us using the information above.
                    </p>
                  </section>

                  <section className="border-t border-gray-600 pt-6">
                    <h2 className="text-2xl font-bold text-white mb-4">California Privacy Rights</h2>
                    <p>
                      California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected and the right to delete personal information. For more information or to exercise these rights, please contact us.
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};
