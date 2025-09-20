import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Star, Calendar, Play, ArrowRight, Flame } from 'lucide-react';

export const SilksongPromo: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/hollow-knight-silksong');
  };

  return (
    <div className="premium-card p-8 mb-12 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-500/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-lg">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="text-red-400 font-semibold text-sm">HOT TOPIC</span>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full">
                <span className="text-white text-xs font-bold">NEW</span>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="gradient-text-neon">Hollow Knight: Silksong</span>
            </h2>
            
            <p className="text-lg text-white/80 mb-6 leading-relaxed">
              After 6 years of anticipation, the epic sequel is finally here! Discover why this masterpiece is taking the gaming world by storm.
            </p>
            
            <div className="flex items-center space-x-6 mb-6 text-sm">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white font-medium">9.5/10 Review</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-white/80">Sept 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-purple-400" />
                <span className="text-white/80">Game of the Year</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleClick}
                className="group premium-button bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Read Full Review</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => window.open('https://hollowknightsilksong.com', '_blank')}
                className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-white/20 flex items-center justify-center space-x-2"
              >
                <span>Official Site</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop&auto=format"
                alt="Hollow Knight: Silksong"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
              
              {/* Overlay content */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold text-lg">Team Cherry</p>
                    <p className="text-white/80 text-sm">Metroidvania • Action • Adventure</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                    <span className="text-white font-bold">$20</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating stats */}
            <div className="absolute -top-4 -right-4 grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 rounded-lg text-center shadow-lg">
                <div className="text-sm font-bold">15M+</div>
                <div className="text-xs opacity-90">Players</div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-2 rounded-lg text-center shadow-lg">
                <div className="text-sm font-bold">96%</div>
                <div className="text-xs opacity-90">Positive</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom highlight */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-white/60">
              <span>• 200+ Enemies</span>
              <span>• 15 Areas</span>
              <span>• 30+ Boss Fights</span>
              <span>• Hand-drawn Art</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-400">
              <Flame className="w-4 h-4" />
              <span className="font-medium">Trending #1 Game</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 