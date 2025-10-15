import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { GamingBackground } from '../components/ui/EnhancedBackground';
import { PremiumButton } from '../components/ui/PremiumButton';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual form handling)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <GamingBackground interactive={false} />
      
      <div className="relative z-10">
        <Header />
        
        <main className="pt-28 sm:pt-32 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 gradient-text-neon">
                Contact Us
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Have questions, suggestions, or need support? We'd love to hear from you! 
                Our team is here to help make your gaming experience even better.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="premium-card p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                
                {submitStatus === 'success' && (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                    <p className="text-green-300">
                      ✅ Thank you for your message! We'll get back to you within 48 hours.
                    </p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                    <p className="text-red-300">
                      ❌ Sorry, there was an error sending your message. Please try again or contact us directly via email.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-white font-medium mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-white font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-white font-medium mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="game-request">Game Request</option>
                      <option value="bug-report">Bug Report</option>
                      <option value="partnership">Partnership</option>
                      <option value="advertising">Advertising</option>
                      <option value="legal">Legal/Privacy</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-white font-medium mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-vertical"
                      placeholder="Please provide as much detail as possible..."
                    />
                  </div>

                  <PremiumButton
                    type="submit"
                    variant="neon"
                    effect="glow"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? '🔄 Sending...' : '📧 Send Message'}
                  </PremiumButton>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Direct Contact */}
                <div className="premium-card p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📧</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2">Email Support</h3>
                        <p className="text-gray-300 mb-2">
                          For general inquiries and support:
                        </p>
                        <a href="mailto:support@queensgame.com" className="text-purple-400 hover:text-purple-300 font-medium">
                          support@queensgame.com
                        </a>
                        <p className="text-gray-400 text-sm mt-1">Response time: Within 48 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🛡️</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2">Privacy & Legal</h3>
                        <p className="text-gray-300 mb-2">
                          For privacy concerns and legal matters:
                        </p>
                        <a href="mailto:privacy@queensgame.com" className="text-blue-400 hover:text-blue-300 font-medium">
                          privacy@queensgame.com
                        </a>
                        <p className="text-gray-400 text-sm mt-1">Response time: Within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🤝</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2">Business Partnerships</h3>
                        <p className="text-gray-300 mb-2">
                          For business inquiries and partnerships:
                        </p>
                        <a href="mailto:business@queensgame.com" className="text-green-400 hover:text-green-300 font-medium">
                          business@queensgame.com
                        </a>
                        <p className="text-gray-400 text-sm mt-1">Response time: Within 72 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ */}
                <div className="premium-card p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-white font-semibold mb-2">🎮 How do I report a game issue?</h3>
                      <p className="text-gray-300 text-sm">
                        Use the contact form above with "Bug Report" category, or email us directly with details about the game and issue.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-semibold mb-2">🎯 Can I request specific games?</h3>
                      <p className="text-gray-300 text-sm">
                        Yes! Select "Game Request" in the form above and tell us what games you'd like to see added.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-semibold mb-2">📱 Do you have a mobile app?</h3>
                      <p className="text-gray-300 text-sm">
                        Currently, we're a web-based platform optimized for all devices. A mobile app may be considered in the future.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-semibold mb-2">💰 Is QueensGame really free?</h3>
                      <p className="text-gray-300 text-sm">
                        Yes! All games are free to play. We're supported by advertising to keep the service free for everyone.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response Times */}
                <div className="premium-card p-6">
                  <h3 className="text-xl font-bold text-white mb-4">📞 Response Times</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">General Support:</span>
                      <span className="text-green-400 font-medium">24-48 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Technical Issues:</span>
                      <span className="text-yellow-400 font-medium">12-24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Privacy/Legal:</span>
                      <span className="text-blue-400 font-medium">Within 24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Business Inquiries:</span>
                      <span className="text-purple-400 font-medium">48-72 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-12 premium-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Why Contact Us?</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎮</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Game Suggestions</h3>
                  <p className="text-gray-300 text-sm">
                    Help us improve by suggesting new games or features you'd like to see.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🛠️</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Technical Support</h3>
                  <p className="text-gray-300 text-sm">
                    Experiencing issues? Our technical team is ready to help you get back to gaming.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">💡</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Feedback</h3>
                  <p className="text-gray-300 text-sm">
                    Your feedback helps us create a better gaming experience for everyone.
                  </p>
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
