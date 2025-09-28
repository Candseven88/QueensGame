import React from 'react';
import { ExternalLink, Crown, Moon, Sword, Shield } from 'lucide-react';
import { PremiumButton } from './ui/PremiumButton';

export const SilentSaltPromo: React.FC = () => {
  return (
    <div className="relative mt-16 mb-12 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-black/40 to-blue-900/30 rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-3xl"></div>
      
      {/* Animated Elements */}
      <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-4 right-4 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="relative premium-card p-8 md:p-12 border-2 border-purple-500/30 rounded-3xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Content Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text-neon mb-2">
                  Silent Salt Cookie
                </h2>
                <p className="text-purple-300 text-lg">The Devil of Silence Awaits</p>
              </div>
            </div>

            <p className="text-white/80 text-lg leading-relaxed">
              Experience the power of the fifth Beast Cookie in this epic Cookie Run Kingdom adventure. 
              Wield corrupted Solidarity transformed into devastating Silence abilities alongside the legendary Nox Black Salt.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-white/70">
                <Sword className="w-5 h-5 text-purple-400" />
                <span className="text-sm">Epic Combat System</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Stealth Mechanics</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Beast Cookie Rarity</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Moon className="w-5 h-5 text-purple-400" />
                <span className="text-sm">Eclipse Powers</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <PremiumButton
                variant="neon"
                effect="glow"
                size="lg"
                icon={ExternalLink}
                onClick={() => window.open('https://silentsalt.site/', '_blank')}
                className="shadow-2xl"
              >
                Play Silent Salt Now
              </PremiumButton>
              <PremiumButton
                variant="secondary"
                effect="shimmer"
                size="lg"
                onClick={() => window.open('https://silentsalt.site/', '_blank')}
                className="border border-white/30"
              >
                Learn More
              </PremiumButton>
            </div>
          </div>

          {/* Visual Section */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl border border-white/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <Moon className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Silent Salt Portal</h3>
                    <p className="text-white/60">Experience the Land of Silence</p>
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-sm text-white/50">
                    <span>⚡ 10K+ Players</span>
                    <span>⭐ 4.9 Rating</span>
                    <span>🎮 Free to Play</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500/30 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500/30 rounded-full animate-bounce delay-500"></div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-center space-x-8 text-center">
            <div>
              <div className="text-2xl font-bold gradient-text">14s</div>
              <div className="text-white/60 text-sm">Ultimate Cooldown</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">Beast</div>
              <div className="text-white/60 text-sm">Cookie Rarity</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">Front</div>
              <div className="text-white/60 text-sm">Position</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">Ambush</div>
              <div className="text-white/60 text-sm">Cookie Type</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 