import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Star, Users, Calendar, Tag, Info } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import { SmartGamePlayer } from '../components/SmartGamePlayer';
import { GameGrid } from '../components/filters/GameGrid';
import { allGames } from '../data/gameData';
import { trackPageView, trackGameView } from '../utils/analytics';
import { Game } from '../types/Game';
import { getTopicBySlug } from '../data/topicPages';

export const DriftBossPage: React.FC = () => {
  const navigate = useNavigate();
  const [driftBossGame, setDriftBossGame] = useState<Game | null>(null);
  const [relatedGames, setRelatedGames] = useState<Game[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    // Track page view
    trackPageView('drift-boss', 'Drift Boss Page');
    
    // Find Drift Boss game
    const game = allGames.find(g => g.id === 'gd-drift-boss');
    if (game) {
      setDriftBossGame(game);
      
      // 手动设置Open Graph图像标签，确保使用正确的游戏缩略图
      const setMetaTag = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      // 强制设置Open Graph图像为游戏缩略图
      setMetaTag('og:image', game.thumbnail);
      
      // 同样设置Twitter图像
      const setTwitterTag = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      setTwitterTag('twitter:image', game.thumbnail);
      
      // Find related games (racing and driving games)
      const related = allGames.filter(g => {
        if (g.id === 'gd-drift-boss') return false;
        
        return g.category === 'Royal Racing' || 
          g.tags.some(tag => ['car', 'driving', 'racing', 'drifting'].includes(tag.toLowerCase()));
      }).slice(0, 8);
      
      setRelatedGames(related);
    }
  }, []);
  
  const handleGameClick = (game: Game) => {
    const gameId = game.url.split('/').pop();
    navigate(`/games/${gameId}`);
  };
  
  // Get topic data for SEO
  const topicData = getTopicBySlug('drift-boss');
  
  if (!driftBossGame) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900 z-0">
        <div className="absolute inset-0 opacity-20 bg-grid-pattern"></div>
      </div>
      
      {/* SEO Head */}
      <SEOHead 
        title={topicData?.seoTitle || 'Drift Boss - Play the Viral Car Drifting Game Online | QueensGame'}
        description={topicData?.seoDescription || 'Play Drift Boss online for free! Master the art of drifting in this addictive one-click driving game. Navigate tricky corners, collect coins, and unlock new cars.'}
        keywords={topicData?.seoKeywords || 'drift boss, car drifting game, one click game, driving game, car game, arcade game, drift racing, casual game'}
        game={driftBossGame}
      />
      
      <div className="relative z-10">
        <Header />
        
        <main className="pt-28 sm:pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm text-gray-300 mb-6">
              <button
                onClick={() => navigate('/')}
                className="hover:text-purple-400 transition-colors flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Home</span>
              </button>
              <span>/</span>
              <span className="text-gray-100">{driftBossGame.category}</span>
              <span>/</span>
              <span className="text-white font-medium">{driftBossGame.title}</span>
            </nav>
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl overflow-hidden shadow-2xl mb-12">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-md">
                    Drift Boss
                  </h1>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Master the art of drifting in this addictive one-click driving game. Navigate tricky corners, collect coins, and unlock new cars!
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                      #1 Racing Game
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                      285,000+ Plays
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                      8.5/10 Rating
                    </span>
                  </div>
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3 w-full sm:w-auto"
                  >
                    <Play className="w-5 h-5" />
                    <span>Play Now - Free!</span>
                  </button>
                </div>
                <div className="lg:w-1/2 relative">
                  <img 
                    src={driftBossGame.thumbnail} 
                    alt="Drift Boss Game" 
                    className="w-full h-full object-cover object-center lg:h-96"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                    <div className="grid grid-cols-3 gap-4 w-full">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                        <div className="text-yellow-400 mb-1">
                          <Star className="w-5 h-5 mx-auto" />
                        </div>
                        <div className="text-white font-bold">{driftBossGame.rating || 8.5}</div>
                        <div className="text-white/70 text-xs">Rating</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                        <div className="text-blue-400 mb-1">
                          <Users className="w-5 h-5 mx-auto" />
                        </div>
                        <div className="text-white font-bold">285k+</div>
                        <div className="text-white/70 text-xs">Players</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                        <div className="text-purple-400 mb-1">
                          <Info className="w-5 h-5 mx-auto" />
                        </div>
                        <div className="text-white font-bold">#1</div>
                        <div className="text-white/70 text-xs">Racing</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Game Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Game Description */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-4">About Drift Boss</h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Drift Boss is a casual one-click driving game where you drive your car around very tricky corners and over bumps, aiming to reach what seems like an infinite end! The race track has no guardrails, so you will fall off the platform and into an abyss if you make one false move. Keep playing to earn rewards and unlock better cars!
                  </p>
                  
                  <h3 className="text-xl font-bold text-white mb-3">How to Play</h3>
                  <ol className="space-y-3 mb-6">
                    <li className="flex space-x-3">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        1
                      </span>
                      <span className="text-gray-300">Press the left mouse button or the space key to drift to the right.</span>
                    </li>
                    <li className="flex space-x-3">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        2
                      </span>
                      <span className="text-gray-300">Release to drift to the left.</span>
                    </li>
                    <li className="flex space-x-3">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        3
                      </span>
                      <span className="text-gray-300">Navigate carefully around corners to stay on the track.</span>
                    </li>
                    <li className="flex space-x-3">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        4
                      </span>
                      <span className="text-gray-300">Collect coins to unlock new cars and boosters.</span>
                    </li>
                    <li className="flex space-x-3">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        5
                      </span>
                      <span className="text-gray-300">Use car insurance for an extra life when you fall off.</span>
                    </li>
                  </ol>
                  
                  <h3 className="text-xl font-bold text-white mb-3">Features</h3>
                  <ul className="grid grid-cols-2 gap-3">
                    <li className="bg-white/5 p-3 rounded-lg text-gray-300">
                      <span className="text-blue-400 font-medium">One-Button Controls</span>: Easy to learn, hard to master
                    </li>
                    <li className="bg-white/5 p-3 rounded-lg text-gray-300">
                      <span className="text-blue-400 font-medium">Unlockable Cars</span>: Collect coins to upgrade
                    </li>
                    <li className="bg-white/5 p-3 rounded-lg text-gray-300">
                      <span className="text-blue-400 font-medium">Daily Rewards</span>: Return each day for bonuses
                    </li>
                    <li className="bg-white/5 p-3 rounded-lg text-gray-300">
                      <span className="text-blue-400 font-medium">Boosters</span>: Special power-ups to help you
                    </li>
                  </ul>
                </div>
                
                {/* Game Tags */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h2 className="text-xl font-bold text-white mb-4">Game Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {driftBossGame.tags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => navigate(`/?search=${encodeURIComponent(tag)}`)}
                        className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-105"
                      >
                        <Tag className="w-4 h-4 mr-1" />
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Game Info */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold text-white mb-4">Game Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Developer:</span>
                      <span className="text-white">{driftBossGame.author || 'GameDistribution'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Category:</span>
                      <span className="text-white">{driftBossGame.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Platform:</span>
                      <span className="text-white">Web Browser</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Language:</span>
                      <span className="text-white">{driftBossGame.language || 'English'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Release Date:</span>
                      <span className="text-white">December 2019</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Size:</span>
                      <span className="text-white">{driftBossGame.width}x{driftBossGame.height}</span>
                    </div>
                  </div>
                </div>
                
                {/* Play Stats */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold text-white mb-4">Play Stats</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-300 text-sm">Rating</span>
                        <span className="text-white text-sm font-medium">{driftBossGame.rating || 8.5}/10</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full" style={{ width: `${((driftBossGame.rating || 8.5) / 10) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-300 text-sm">Popularity</span>
                        <span className="text-white text-sm font-medium">Very High</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-300 text-sm">Difficulty</span>
                        <span className="text-white text-sm font-medium">Medium</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Related Games */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">More Racing Games</h2>
                <button
                  onClick={() => navigate('/?category=Royal Racing')}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  View All Racing Games →
                </button>
              </div>
              {/* GameGrid component is replaced by SmartGamePlayer */}
              <GameGrid 
                games={relatedGames}
                viewMode="grid"
                onGameClick={handleGameClick}
              />
            </div>
            
            {/* Game Player Modal - 使用SmartGamePlayer替换原有的iframe */}
            <SmartGamePlayer 
              game={driftBossGame}
              isPlaying={isPlaying}
              onClose={() => setIsPlaying(false)}
            />
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default DriftBossPage; 