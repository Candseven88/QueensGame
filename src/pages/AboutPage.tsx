import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { GamingBackground } from '../components/ui/EnhancedBackground';
import { PremiumButton } from '../components/ui/PremiumButton';

export const AboutPage: React.FC = () => {
  const stats = [
    { label: 'Games Available', value: '70+', icon: '🎮' },
    { label: 'Daily Players', value: '10K+', icon: '👥' },
    { label: 'Game Categories', value: '6', icon: '📂' },
    { label: 'Years Experience', value: '5+', icon: '⭐' }
  ];

  const features = [
    {
      icon: '🎯',
      title: 'Curated Game Collection',
      description: 'Hand-picked games from trusted developers, ensuring quality and safety for all players.'
    },
    {
      icon: '🚀',
      title: 'Fast & Responsive',
      description: 'Optimized for all devices with lightning-fast loading times and smooth gameplay.'
    },
    {
      icon: '🔒',
      title: 'Safe & Secure',
      description: 'Family-friendly content with robust security measures and privacy protection.'
    },
    {
      icon: '🆓',
      title: 'Completely Free',
      description: 'All games are free to play, supported by non-intrusive advertising.'
    },
    {
      icon: '🎨',
      title: 'Modern Design',
      description: 'Beautiful, intuitive interface with glassmorphism effects and smooth animations.'
    },
    {
      icon: '📱',
      title: 'Cross-Platform',
      description: 'Play seamlessly across desktop, tablet, and mobile devices.'
    }
  ];

  const team = [
    {
      name: 'Development Team',
      role: 'Full-Stack Engineers',
      description: 'Experienced developers passionate about creating exceptional gaming experiences.',
      icon: '👨‍💻'
    },
    {
      name: 'Game Curators',
      role: 'Content Specialists',
      description: 'Gaming enthusiasts who carefully select and test every game on our platform.',
      icon: '🎮'
    },
    {
      name: 'UX/UI Designers',
      role: 'Design Team',
      description: 'Creative professionals focused on delivering beautiful and intuitive user experiences.',
      icon: '🎨'
    },
    {
      name: 'Community Managers',
      role: 'Player Support',
      description: 'Dedicated team members who listen to feedback and support our gaming community.',
      icon: '🤝'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <GamingBackground interactive={false} />
      
      <div className="relative z-10">
        <Header />
        
        <main className="pt-28 sm:pt-32 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 gradient-text-neon">
                About QueensGame
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Welcome to QueensGame, your premier destination for high-quality online gaming experiences. 
                We're passionate about bringing you the best HTML5 games from around the world, all in one beautiful, 
                easy-to-use platform.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <PremiumButton
                  variant="neon"
                  effect="glow"
                  size="lg"
                  onClick={() => window.location.href = '/games'}
                >
                  🎮 Explore Games
                </PremiumButton>
                <PremiumButton
                  variant="glass"
                  effect="shine"
                  size="lg"
                  onClick={() => window.location.href = '/contact'}
                >
                  📧 Contact Us
                </PremiumButton>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="premium-card p-6 text-center">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2 gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Mission Section */}
            <div className="premium-card p-8 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 gradient-text-neon">
                  Our Mission
                </h2>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    🎯 Democratizing Gaming Entertainment
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    At QueensGame, we believe that exceptional gaming experiences should be accessible to everyone, 
                    everywhere. Our mission is to curate and deliver the finest collection of browser-based games, 
                    ensuring that players of all ages and backgrounds can enjoy premium entertainment without barriers.
                  </p>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    🌟 Quality Over Quantity
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We don't just collect games – we carefully select each title based on gameplay quality, 
                    visual appeal, and user experience. Every game on our platform undergoes thorough testing 
                    to ensure it meets our high standards for entertainment value and technical performance.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-6 rounded-lg border border-purple-400/30">
                    <h4 className="text-xl font-bold text-white mb-3">🎮 For Gamers, By Gamers</h4>
                    <p className="text-gray-300 text-sm">
                      Our team consists of passionate gamers who understand what makes a great gaming experience. 
                      We play every game ourselves before adding it to our collection.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 p-6 rounded-lg border border-green-400/30">
                    <h4 className="text-xl font-bold text-white mb-3">🔒 Safety First</h4>
                    <p className="text-gray-300 text-sm">
                      We prioritize user safety and privacy, ensuring all games are family-friendly and 
                      our platform maintains the highest security standards.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-6 rounded-lg border border-orange-400/30">
                    <h4 className="text-xl font-bold text-white mb-3">🚀 Innovation Driven</h4>
                    <p className="text-gray-300 text-sm">
                      We continuously evolve our platform with the latest web technologies to provide 
                      the smoothest, most enjoyable gaming experience possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 gradient-text-neon">
                  Why Choose QueensGame?
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  We've built QueensGame with features that matter most to gamers, 
                  creating an unparalleled online gaming destination.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="premium-card p-6 hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 gradient-text-neon">
                  Meet Our Team
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Behind QueensGame is a dedicated team of professionals who share a passion for gaming 
                  and creating exceptional user experiences.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {team.map((member, index) => (
                  <div key={index} className="premium-card p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">{member.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                        <p className="text-purple-400 font-medium mb-3">{member.role}</p>
                        <p className="text-gray-300 text-sm leading-relaxed">{member.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Section */}
            <div className="premium-card p-8 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 gradient-text-neon">
                  Built with Modern Technology
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  QueensGame leverages cutting-edge web technologies to deliver a fast, 
                  reliable, and beautiful gaming experience.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚛️</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">React & TypeScript</h3>
                  <p className="text-gray-300 text-sm">Modern frontend framework with type safety</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Tailwind CSS</h3>
                  <p className="text-gray-300 text-sm">Utility-first CSS for beautiful designs</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Vite Build System</h3>
                  <p className="text-gray-300 text-sm">Lightning-fast development and builds</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Security First</h3>
                  <p className="text-gray-300 text-sm">Robust security measures and privacy protection</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Responsive Design</h3>
                  <p className="text-gray-300 text-sm">Optimized for all devices and screen sizes</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Performance Optimized</h3>
                  <p className="text-gray-300 text-sm">Fast loading times and smooth interactions</p>
                </div>
              </div>
            </div>

            {/* Values Section */}
            <div className="premium-card p-8 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 gradient-text-neon">
                  Our Core Values
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-3">🎯</span>
                    Excellence in Gaming
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    We are committed to providing only the highest quality gaming experiences. 
                    Every game is carefully evaluated for entertainment value, technical performance, and user satisfaction.
                  </p>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-3">🤝</span>
                    Community First
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our community of players is at the heart of everything we do. We listen to feedback, 
                    respond to suggestions, and continuously improve based on what our users want and need.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-3">🔒</span>
                    Privacy & Safety
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    We take user privacy and safety seriously. Our platform is designed with robust security measures, 
                    and we maintain transparency about our data practices and privacy policies.
                  </p>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-3">🌟</span>
                    Innovation & Growth
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We embrace new technologies and continuously evolve our platform to provide better experiences. 
                    Innovation drives us to explore new possibilities in web-based gaming.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center premium-card p-8">
              <h2 className="text-3xl font-bold text-white mb-4 gradient-text-neon">
                Ready to Start Gaming?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of players who have made QueensGame their go-to destination for online entertainment. 
                Discover your next favorite game today!
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <PremiumButton
                  variant="neon"
                  effect="glow"
                  size="lg"
                  onClick={() => window.location.href = '/games'}
                >
                  🎮 Browse All Games
                </PremiumButton>
                <PremiumButton
                  variant="glass"
                  effect="shine"
                  size="lg"
                  onClick={() => window.location.href = '/'}
                >
                  🏠 Back to Home
                </PremiumButton>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};
