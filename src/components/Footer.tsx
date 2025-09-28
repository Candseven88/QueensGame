import React from 'react';
import { Crown, Github, Twitter, Mail, Heart, Star, TrendingUp, Users } from 'lucide-react';
import { PremiumButton } from './ui/PremiumButton';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/', icon: Crown },
    { name: 'Trending Games', href: '/topic/trending', icon: TrendingUp },
    { name: 'Featured Games', href: '/topic/editors-picks', icon: Star },
    { name: 'All Categories', href: '/categories', icon: Users }
  ];

  const socialLinks = [
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Email', href: '#', icon: Mail }
  ];

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-purple-900/20 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 floating">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div>
                <h3 className="text-3xl font-bold gradient-text-neon mb-2">QueensGame</h3>
                <p className="text-white/80 text-lg">Royal Gaming Experience</p>
              </div>
            </div>
            
            <p className="text-white/70 text-lg leading-relaxed max-w-md">
              Discover the finest collection of premium HTML5 games. Experience royal entertainment with cutting-edge graphics and immersive gameplay.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md">
              <div className="text-center premium-card p-4 rounded-xl">
                <div className="text-2xl font-bold gradient-text mb-1">500+</div>
                <div className="text-white/60 text-sm">Games</div>
              </div>
              <div className="text-center premium-card p-4 rounded-xl">
                <div className="text-2xl font-bold gradient-text mb-1">1M+</div>
                <div className="text-white/60 text-sm">Players</div>
              </div>
              <div className="text-center premium-card p-4 rounded-xl">
                <div className="text-2xl font-bold gradient-text mb-1">24/7</div>
                <div className="text-white/60 text-sm">Available</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white mb-4">Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <div
                  key={link.name}
                  className="fade-in-scale"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PremiumButton
                    variant="secondary"
                    effect="shimmer"
                    size="sm"
                    icon={link.icon}
                    onClick={() => window.location.href = link.href}
                    className="justify-start bg-transparent hover:bg-white/10 border border-white/20 w-full"
                  >
                    {link.name}
                  </PremiumButton>
                </div>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white mb-4">Connect With Us</h4>
            
            <div className="space-y-3">
              {socialLinks.map((social, index) => (
                <div
                  key={social.name}
                  className="fade-in-scale"
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  <PremiumButton
                    variant="aurora"
                    effect="glow"
                    size="sm"
                    icon={social.icon}
                    onClick={() => window.open(social.href, '_blank')}
                    className="justify-start w-full"
                  >
                    {social.name}
                  </PremiumButton>
                </div>
              ))}
            </div>

            {/* Featured Partner Games */}
            <div className="premium-card p-6 rounded-xl space-y-4 border border-purple-500/20">
              <h5 className="text-lg font-bold text-white flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                Featured Partner
              </h5>
              <div className="space-y-3">
                <a 
                  href="https://silentsalt.site/" 
                  target="_blank" 
                  rel="dofollow"
                  className="block group"
                >
                  <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300 group-hover:scale-105">
                    <h6 className="text-white font-bold mb-1 group-hover:text-purple-300 transition-colors">
                      Silent Salt Game Portal
                    </h6>
                    <p className="text-white/60 text-sm mb-2">
                      Experience the power of the Devil of Silence in this thrilling Cookie Run Kingdom adventure
                    </p>
                    <div className="flex items-center text-xs text-purple-300">
                      <span>Play Silent Salt Cookie →</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="premium-card p-6 rounded-xl space-y-4">
              <h5 className="text-lg font-bold text-white">Stay Updated</h5>
              <p className="text-white/60 text-sm">Get notified about new games and features</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                />
                <PremiumButton
                  variant="neon"
                  effect="glow"
                  size="sm"
                  className="px-4"
                >
                  Join
                </PremiumButton>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-white/60">
              <span>&copy; {currentYear} QueensGame. All rights reserved.</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacy" className="text-white/60 hover:text-white transition-colors hover:underline">
                Privacy Policy
              </a>
              <a href="/terms" className="text-white/60 hover:text-white transition-colors hover:underline">
                Terms of Service
              </a>
              <a href="/contact" className="text-white/60 hover:text-white transition-colors hover:underline">
                Contact Us
              </a>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 text-center text-white/40 text-sm">
            <p>Built with ❤️ for gamers worldwide • Powered by cutting-edge web technologies</p>
            <p className="mt-2">Experience the future of online gaming at QueensGame</p>
          </div>
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full animate-shimmer pointer-events-none"></div>
    </footer>
  );
};