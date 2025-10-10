import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackgroundPattern, DarkBackgroundPattern } from '../components/BackgroundPattern';
import { SEOHead } from '../components/SEOHead';
import { allGames } from '../data/gameData';
import { Game } from '../types/Game';
import { 
  Play, 
  Star, 
  Users, 
  Share2, 
  Heart, 
  Bookmark,
  Target,
  Zap,
  Trophy,
  Clock,
  ArrowRight,
  Gamepad2,
  Leaf,
  Shield,
  Gem,
  Crown,
  Users2,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

export const PlantsVsBrainrotsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Get Plants vs Brainrots game data
  const plantsVsBrainrotsGame = allGames.find(game => game.id === 'plants-vs-brainrots');

  // Get recommended games based on similar gameplay
  const getRecommendedGames = () => {
    if (!plantsVsBrainrotsGame) return [];
    
    return allGames
      .filter(g => {
        if (g.id === plantsVsBrainrotsGame.id) return false;
        
        // Prioritize Strategy, Tycoon, and Action games
        const sharedTags = g.tags.filter(tag => plantsVsBrainrotsGame.tags.includes(tag));
        const sameCategory = g.category === plantsVsBrainrotsGame.category;
        const isStrategy = g.tags.some(tag => tag.toLowerCase().includes('strategy')) || 
                         g.tags.some(tag => tag.toLowerCase().includes('tycoon')) ||
                         g.tags.some(tag => tag.toLowerCase().includes('tower defense'));
        
        return sameCategory || sharedTags.length >= 2 || isStrategy;
      })
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6);
  };

  const recommendedGames = getRecommendedGames();

  // Auto-generated content for player types and highlights
  const playerTypes = [
    "Tower Defense enthusiasts",
    "Plants vs Zombies fans", 
    "Roblox tycoon players",
    "Strategy game lovers",
    "Meme culture enthusiasts",
    "Business simulation fans"
  ];

  const gameplayHighlights = [
    "Ultimate fusion of Plants vs Zombies and internet meme culture",
    "Engaging tycoon gameplay with business simulation mechanics",
    "14+ unique plants with special abilities and strategic uses",
    "Hilarious brainrot characters as enemies with unique behaviors",
    "Collect and sell defeated enemies to grow your empire",
    "Regular promotional codes for free cash and exclusive items",
    "Strategic plant placement for optimal defense configurations",
    "Endless progression with upgrades and expansion opportunities"
  ];

  const gameFeatures = [
    {
      icon: <Leaf className="w-6 h-6 text-green-400" />,
      title: "Plant Army Building",
      description: "Grow and manage 14+ unique plants with special defensive abilities"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Brainrot Battles",
      description: "Defend against waves of hilarious internet meme characters"
    },
    {
      icon: <Crown className="w-6 h-6 text-purple-400" />,
      title: "Tycoon Empire",
      description: "Build and expand your plant tycoon business empire"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
      title: "Strategic Gameplay",
      description: "Master tactical plant placement and resource management"
    }
  ];

  useEffect(() => {
    // Check if game is liked/bookmarked from localStorage
    if (plantsVsBrainrotsGame) {
      const likedGames = JSON.parse(localStorage.getItem('likedGames') || '[]');
      const bookmarkedGames = JSON.parse(localStorage.getItem('bookmarkedGames') || '[]');
      
      setIsLiked(likedGames.includes(plantsVsBrainrotsGame.id));
      setIsBookmarked(bookmarkedGames.includes(plantsVsBrainrotsGame.id));
    }
  }, [plantsVsBrainrotsGame]);

  const handleLike = () => {
    if (!plantsVsBrainrotsGame) return;
    
    const likedGames = JSON.parse(localStorage.getItem('likedGames') || '[]');
    let updatedLikes;
    
    if (isLiked) {
      updatedLikes = likedGames.filter((id: string) => id !== plantsVsBrainrotsGame.id);
    } else {
      updatedLikes = [...likedGames, plantsVsBrainrotsGame.id];
    }
    
    localStorage.setItem('likedGames', JSON.stringify(updatedLikes));
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    if (!plantsVsBrainrotsGame) return;
    
    const bookmarkedGames = JSON.parse(localStorage.getItem('bookmarkedGames') || '[]');
    let updatedBookmarks;
    
    if (isBookmarked) {
      updatedBookmarks = bookmarkedGames.filter((id: string) => id !== plantsVsBrainrotsGame.id);
    } else {
      updatedBookmarks = [...bookmarkedGames, plantsVsBrainrotsGame.id];
    }
    
    localStorage.setItem('bookmarkedGames', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handlePlayGame = () => {
    // 直接跳转到 Roblox 游戏页面，因为 Roblox 不支持 iframe 嵌入
    window.open('https://www.roblox.com/games/127742093697776/Plants-Vs-Brainrots', '_blank');
  };

  const handleShare = async () => {
    const shareData = {
      title: `Plants vs Brainrots - Ultimate Roblox Tycoon | QueensGame`,
      text: `Experience the ultimate fusion of Plants vs Zombies and internet culture in this epic Roblox tycoon adventure!`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  if (!plantsVsBrainrotsGame) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌱</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Game Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <BackgroundPattern className="light:block dark:hidden" />
      <DarkBackgroundPattern className="light:hidden dark:block" />
      
      {/* Enhanced SEO Head */}
      <SEOHead 
        game={plantsVsBrainrotsGame}
        title="Plants vs Brainrots - Ultimate Roblox Tycoon Game | Tower Defense Adventure"
        description="Experience Plants vs Brainrots, the ultimate fusion of Plants vs Zombies and internet culture! Build your plant army, defend against brainrot characters, and grow your tycoon empire in this epic Roblox adventure."
        keywords="plants vs brainrots, roblox tycoon, plants vs zombies roblox, tower defense tycoon, brainrot memes, plant army, yo gurt studio, roblox games, tycoon games, strategy games, free roblox games"
      />

      <Header />
      
      <main className="pt-28 sm:pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Game Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full font-medium">
                    🌱 Roblox Tycoon
                  </span>
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full font-medium">
                    🧠 Brainrot Memes
                  </span>
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full font-medium">
                    ⭐ Featured Partner
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Plants vs Brainrots
                  <span className="block text-2xl md:text-3xl lg:text-4xl text-green-600 dark:text-green-400 mt-2">
                    Ultimate Roblox Tycoon
                  </span>
                </h1>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {plantsVsBrainrotsGame.description}
                </p>
              </div>

              {/* Game Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/10 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                  <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{plantsVsBrainrotsGame.rating}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                </div>
                <div className="text-center p-4 bg-white/10 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                  <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{plantsVsBrainrotsGame.plays?.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Plays</div>
                </div>
                <div className="text-center p-4 bg-white/10 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                  <Gamepad2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">Free</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">To Play</div>
                </div>
                <div className="text-center p-4 bg-white/10 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                  <Crown className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">14+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Plants</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handlePlayGame}
                  className="flex items-center justify-center space-x-3 bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <ExternalLink className="w-6 h-6" />
                  <span>Play on Roblox</span>
                </button>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleLike}
                    className={`flex items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                      isLiked 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/10 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-red-500/20 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={handleBookmark}
                    className={`flex items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                      isBookmarked 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white/10 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-blue-500/20 hover:text-blue-400'
                    }`}
                  >
                    <Bookmark className={`w-6 h-6 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center p-4 rounded-xl bg-white/10 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-green-500/20 hover:text-green-400 transition-all duration-300"
                  >
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Game Preview */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-green-900/50 to-yellow-900/50 rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
                <img 
                  src={plantsVsBrainrotsGame.thumbnail} 
                  alt={plantsVsBrainrotsGame.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={handlePlayGame}
                    className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                  >
                    <Play className="w-12 h-12 text-white fill-current" />
                  </button>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500/30 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-yellow-500/30 rounded-full animate-bounce delay-500"></div>
            </div>
          </div>

          {/* Game Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              🌱 Game Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gameFeatures.map((feature, index) => (
                <div key={index} className="p-6 bg-white/10 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Game Instructions */}
          {plantsVsBrainrotsGame.instructions && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                🎮 How to Play
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {plantsVsBrainrotsGame.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-white/10 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Games */}
          {recommendedGames.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                🎯 You Might Also Like
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedGames.map((game) => (
                  <div key={game.id} className="group cursor-pointer" onClick={() => navigate(`/games/${game.url.split('/').pop()}`)}>
                    <div className="bg-white/10 dark:bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={game.thumbnail} 
                          alt={game.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3">
                          <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white text-sm font-medium">{game.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{game.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">{game.shortDescription || game.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">{game.category}</span>
                          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                            <Users className="w-4 h-4" />
                            <span className="text-xs">{game.plays?.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
