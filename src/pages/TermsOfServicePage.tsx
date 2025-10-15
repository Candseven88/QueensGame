import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { GamingBackground } from '../components/ui/EnhancedBackground';

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <GamingBackground interactive={false} />
      
      <div className="relative z-10">
        <Header />
        
        <main className="pt-28 sm:pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="premium-card p-8">
              <h1 className="text-4xl font-bold text-white mb-8 gradient-text-neon">
                Terms of Service
              </h1>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-6">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>
                
                <div className="space-y-8 text-gray-300">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                    <p>
                      By accessing and using QueensGame ("the Website", "our Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                    </p>
                    <p className="mt-4">
                      These Terms of Service ("Terms") govern your use of our website located at QueensGame and all associated services, features, and content.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                    <p>
                      QueensGame is an online gaming platform that provides free access to HTML5 games, puzzle games, and interactive entertainment content. Our service includes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access to a curated collection of online games</li>
                      <li>Game discovery and filtering features</li>
                      <li>User interface for browsing and playing games</li>
                      <li>Community features and game recommendations</li>
                      <li>Educational and entertainment content</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">3. User Eligibility and Account</h2>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">3.1 Age Requirements</h3>
                      <p>
                        You must be at least 13 years old to use our service. Users under 18 should have parental consent before using our website.
                      </p>
                      
                      <h3 className="text-xl font-semibold text-white">3.2 Account Responsibility</h3>
                      <p>
                        While we don't require account creation for basic usage, if you choose to create an account or provide personal information, you are responsible for maintaining the confidentiality of your information.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use Policy</h2>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">4.1 Permitted Uses</h3>
                      <p>You may use our service for:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Playing games for personal entertainment</li>
                        <li>Browsing and discovering new games</li>
                        <li>Sharing games with friends (through provided sharing features)</li>
                        <li>Educational purposes</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold text-white">4.2 Prohibited Uses</h3>
                      <p>You agree NOT to:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Use the service for any unlawful purpose or activity</li>
                        <li>Attempt to gain unauthorized access to our systems</li>
                        <li>Interfere with or disrupt the service or servers</li>
                        <li>Use automated systems (bots, scrapers) without permission</li>
                        <li>Reverse engineer, decompile, or disassemble any games or software</li>
                        <li>Remove or modify any copyright, trademark, or proprietary notices</li>
                        <li>Upload or transmit viruses, malware, or harmful code</li>
                        <li>Harass, abuse, or harm other users</li>
                        <li>Violate any applicable laws or regulations</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property Rights</h2>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">5.1 Our Content</h3>
                      <p>
                        The QueensGame website, including its design, layout, graphics, and original content, is owned by us and protected by copyright and other intellectual property laws.
                      </p>
                      
                      <h3 className="text-xl font-semibold text-white">5.2 Third-Party Games</h3>
                      <p>
                        Games provided through our platform are owned by their respective developers and publishers. We provide these games under license or through embedded content with proper attribution.
                      </p>
                      
                      <h3 className="text-xl font-semibold text-white">5.3 User-Generated Content</h3>
                      <p>
                        Any content you submit to our website (comments, feedback, etc.) grants us a non-exclusive, royalty-free license to use, modify, and display such content in connection with our service.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">6. Privacy and Data Collection</h2>
                    <p>
                      Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">7. Advertising and Third-Party Content</h2>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">7.1 Advertisements</h3>
                      <p>
                        Our service is supported by advertising. We use Google AdSense and other advertising networks to display relevant advertisements. You acknowledge that:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Advertisements may be targeted based on your interests and browsing behavior</li>
                        <li>We are not responsible for the content of third-party advertisements</li>
                        <li>Clicking on advertisements may redirect you to external websites</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold text-white">7.2 Third-Party Links</h3>
                      <p>
                        Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these external sites.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">8. Disclaimers and Limitations</h2>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">8.1 Service Availability</h3>
                      <p>
                        We strive to maintain continuous service availability but cannot guarantee uninterrupted access. The service is provided "as is" and "as available."
                      </p>
                      
                      <h3 className="text-xl font-semibold text-white">8.2 Game Content</h3>
                      <p>
                        We curate games for quality and appropriateness but cannot guarantee that all content will meet your expectations or be suitable for all audiences.
                      </p>
                      
                      <h3 className="text-xl font-semibold text-white">8.3 Technical Issues</h3>
                      <p>
                        Game performance may vary based on your device, browser, and internet connection. We are not responsible for technical issues beyond our control.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
                    <p>
                      To the fullest extent permitted by law, QueensGame and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of the service.
                    </p>
                    <p className="mt-4">
                      Our total liability for any claims arising from your use of the service shall not exceed the amount you paid us (if any) for using the service.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">10. Indemnification</h2>
                    <p>
                      You agree to indemnify and hold harmless QueensGame, its operators, and affiliates from any claims, damages, losses, or expenses arising from your use of the service or violation of these Terms.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">11. Termination</h2>
                    <p>
                      We reserve the right to terminate or suspend your access to the service at any time, with or without cause, and with or without notice. Upon termination, your right to use the service will cease immediately.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
                    <p>
                      We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes are posted constitutes acceptance of the modified Terms.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">13. Governing Law</h2>
                    <p>
                      These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms or your use of the service shall be resolved through appropriate legal channels.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">14. Severability</h2>
                    <p>
                      If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions will remain in full force and effect.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">15. Contact Information</h2>
                    <p>
                      If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg mt-4">
                      <p><strong>Email:</strong> legal@queensgame.com</p>
                      <p><strong>Website:</strong> Contact form available at /contact</p>
                      <p><strong>Response Time:</strong> We aim to respond within 48 hours</p>
                    </div>
                  </section>

                  <section className="border-t border-gray-600 pt-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Entire Agreement</h2>
                    <p>
                      These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and QueensGame regarding your use of the service and supersede all prior agreements and understandings.
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
