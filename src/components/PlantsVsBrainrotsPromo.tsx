import React from 'react';
import { ExternalLink, Gamepad2, Zap, Trophy, Users } from 'lucide-react';
import { PremiumButton } from './ui/PremiumButton';

export const PlantsVsBrainrotsPromo: React.FC = () => {
  return (
    <div className="relative mt-8 mb-12 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 via-black/40 to-yellow-900/30 rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-3xl"></div>
      
      {/* Animated Elements */}
      <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-r from-green-500/20 to-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-4 right-4 w-20 h-20 bg-gradient-to-r from-yellow-500/20 to-green-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="relative premium-card p-8 md:p-12 border-2 border-green-500/30 rounded-3xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Content Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-yellow-600 rounded-2xl flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text-neon mb-2">
                  Plants vs Brainrots
                </h2>
                <p className="text-green-300 text-lg">Ultimate Roblox Tycoon Experience</p>
              </div>
            </div>

            <p className="text-white/80 text-lg leading-relaxed">
              Experience the ultimate fusion of Plants vs Zombies and internet culture! Build your plant army, 
              defend against hilarious brainrot characters, and grow your tycoon empire in this epic Roblox adventure.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-white/70">
                <Zap className="w-5 h-5 text-green-400" />
                <span className="text-sm">Tower Defense Action</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Tycoon Gameplay</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Users className="w-5 h-5 text-green-400" />
                <span className="text-sm">Brainrot Memes</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Gamepad2 className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Free to Play</span>
              </div>
            </div>

            {/* Game Features */}
            <div className="bg-green-900/20 p-4 rounded-xl border border-green-500/20">
              <h3 className="text-white font-bold mb-2">🌱 Game Features:</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• 14+ unique plants with special abilities</li>
                <li>• Collect and sell defeated brainrot characters</li>
                <li>• Strategic plant placement and upgrades</li>
                <li>• Regular codes for free rewards</li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <PremiumButton
                variant="neon"
                effect="glow"
                size="lg"
                icon={ExternalLink}
                onClick={() => window.open('https://plantsvsbrainrots.website/', '_blank')}
                className="shadow-2xl bg-gradient-to-r from-green-600 to-yellow-600"
              >
                Play Plants vs Brainrots
              </PremiumButton>
              <PremiumButton
                variant="secondary"
                effect="shimmer"
                size="lg"
                onClick={() => window.open('https://plantsvsbrainrots.website/', '_blank')}
                className="border border-green-400/30"
              >
                View Game Guide
              </PremiumButton>
            </div>
          </div>

          {/* Visual Section */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-green-900/50 to-yellow-900/50 rounded-2xl border border-white/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <Gamepad2 className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Plants vs Brainrots Portal</h3>
                    <p className="text-white/60">Defend Your Garden Empire</p>
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-sm text-white/50">
                    <span>🌱 14 Plants</span>
                    <span>🧠 Brainrot Enemies</span>
                    <span>🎮 Free Codes</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500/30 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-yellow-500/30 rounded-full animate-bounce delay-500"></div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-center space-x-8 text-center">
            <div>
              <div className="text-2xl font-bold gradient-text">14+</div>
              <div className="text-white/60 text-sm">Unique Plants</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">Tycoon</div>
              <div className="text-white/60 text-sm">Game Mode</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">Free</div>
              <div className="text-white/60 text-sm">To Play</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">Roblox</div>
              <div className="text-white/60 text-sm">Platform</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
