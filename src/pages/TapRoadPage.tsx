import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackgroundPattern, DarkBackgroundPattern } from '../components/BackgroundPattern';
import { SEOHead } from '../components/SEOHead';
import { GameModal } from '../components/GameModal';
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
  Circle,
  Gem,
  Map,
  Users2,
  TrendingUp,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  MousePointer
} from 'lucide-react';

export const TapRoadPage: React.FC = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Get TAP ROAD game data
  const tapRoadGame = allGames.find(game => game.id === 'tap-road');

  // Get recommended games based on similar gameplay
  const getRecommendedGames = () => {
    if (!tapRoadGame) return [];
    
    return allGames
      .filter(g => {
        if (g.id === tapRoadGame.id) return false;
        
        // Prioritize arcade games and similar categories
        const sharedTags = g.tags.filter(tag => tapRoadGame.tags.includes(tag));
        const sameCategory = g.category === tapRoadGame.category;
        const isArcade = g.tags.some(tag => tag.toLowerCase().includes('arcade')) || 
                        g.tags.some(tag => tag.toLowerCase().includes('action')) ||
                        g.tags.some(tag => tag.toLowerCase().includes('racing'));
        
        return sameCategory || sharedTags.length >= 2 || isArcade;
      })
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6);
  };

  const recommendedGames = getRecommendedGames();

  // Player types who would enjoy TAP ROAD
  const playerTypes = [
    "Arcade game lovers",
    "Endless runner fans", 
    "Reflex game players",
    "Neon theme enthusiasts",
    "Mobile game users",
    "Quick session gamers"
  ];

  const gameplayHighlights = [
    "TAP ROAD offers simple one-tap controls that anyone can learn in seconds",
    "Navigate your glowing ball through endless neon tracks with precision timing",
    "TAP ROAD features stunning visual effects with bright neon colors and smooth animations",
    "Collect gems scattered throughout the track to unlock new balls and themes in TAP ROAD",
    "Experience increasing speed that makes TAP ROAD more challenging as you progress",
    "TAP ROAD works perfectly on desktop, tablet, and mobile devices without downloads",
    "Compete for high scores and see how far you can roll in TAP ROAD",
    "Master the rhythm of obstacle patterns to become a TAP ROAD champion"
  ];

  const gameFeatures = [
    {
      icon: <Circle className="w-6 h-6 text-cyan-400" />,
      title: "Glowing Ball Control",
      description: "Guide a luminous sphere through neon-lit tracks with perfect timing"
    },
    {
      icon: <Gem className="w-6 h-6 text-purple-400" />,
      title: "Gem Collection",
      description: "Gather precious gems to unlock new balls and exciting track themes"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Endless Gameplay",
      description: "Experience infinite replayability with randomly generated track layouts"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-400" />,
      title: "Speed Progression",
      description: "Feel the rush as TAP ROAD speeds up and challenges your reflexes"
    }
  ];

  useEffect(() => {
    // Check if game is liked/bookmarked from localStorage
    if (tapRoadGame) {
      const likedGames = JSON.parse(localStorage.getItem('likedGames') || '[]');
      const bookmarkedGames = JSON.parse(localStorage.getItem('bookmarkedGames') || '[]');
      
      setIsLiked(likedGames.includes(tapRoadGame.id));
      setIsBookmarked(bookmarkedGames.includes(tapRoadGame.id));
    }
  }, [tapRoadGame]);

  const handleLike = () => {
    if (!tapRoadGame) return;
    
    const likedGames = JSON.parse(localStorage.getItem('likedGames') || '[]');
    let updatedLikes;
    
    if (isLiked) {
      updatedLikes = likedGames.filter((id: string) => id !== tapRoadGame.id);
    } else {
      updatedLikes = [...likedGames, tapRoadGame.id];
    }
    
    localStorage.setItem('likedGames', JSON.stringify(updatedLikes));
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    if (!tapRoadGame) return;
    
    const bookmarkedGames = JSON.parse(localStorage.getItem('bookmarkedGames') || '[]');
    let updatedBookmarks;
    
    if (isBookmarked) {
      updatedBookmarks = bookmarkedGames.filter((id: string) => id !== tapRoadGame.id);
    } else {
      updatedBookmarks = [...bookmarkedGames, tapRoadGame.id];
    }
    
    localStorage.setItem('bookmarkedGames', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handlePlayGame = () => {
    // 在页面内打开游戏模态窗口，而不是跳转到外部网站
    setIsPlaying(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: `TAP ROAD - Neon Ball Rolling Game | QueensGame`,
      text: `Play TAP ROAD online for free! Guide a glowing ball through neon tracks and test your reflexes!`,
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

  if (!tapRoadGame) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Game Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
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
        game={tapRoadGame}
        title="TAP ROAD - Free Neon Ball Rolling Game Online | Endless Runner"
        description="Play TAP ROAD online for free! Guide a glowing ball through neon tracks, dodge obstacles, and collect gems. Perfect endless runner game for kids aged 7-14 and families. No downloads required!"
        keywords="TAP ROAD, tap road game, neon ball game, endless runner, arcade game, reflex game, free online game, browser game, mobile game, family game, kids game, glowing ball, neon tracks"
      />
      
      <div className="relative z-10">
        <Header />
        
        <main className="pt-28 sm:pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Hero Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 border border-white/20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      🆕 NEW GAME
                    </span>
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      🔥 HOT
                    </span>
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ⭐ FREE
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 gradient-text-neon">
                    TAP ROAD
                  </h1>
                  
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    Play TAP ROAD online for free and dive into a neon-lit endless runner that tests your reflexes! 
                    Guide a glowing ball along twisting tracks, dodge hazards, and collect gems in this exciting arcade adventure.
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <button
                      onClick={handlePlayGame}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3"
                    >
                      <Play className="w-6 h-6" fill="currentColor" />
                      <span>Play TAP ROAD Now!</span>
                    </button>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={handleLike}
                        className={`p-3 rounded-lg transition-all duration-300 ${
                          isLiked 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                      </button>
                      
                      <button
                        onClick={handleBookmark}
                        className={`p-3 rounded-lg transition-all duration-300 ${
                          isBookmarked 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                      
                      <button
                        onClick={handleShare}
                        className="p-3 bg-white/10 text-white hover:bg-white/20 rounded-lg transition-all duration-300"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Game Stats */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center text-yellow-400 mb-1">
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                      <div className="text-white font-bold">{tapRoadGame.rating?.toFixed(1)}</div>
                      <div className="text-gray-300 text-xs">Rating</div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center text-blue-400 mb-1">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="text-white font-bold">
                        {tapRoadGame.plays ? `${Math.floor(tapRoadGame.plays / 1000)}k` : '25k'}
                      </div>
                      <div className="text-gray-300 text-xs">Plays</div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center text-green-400 mb-1">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="text-white font-bold">New</div>
                      <div className="text-gray-300 text-xs">Release</div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center text-purple-400 mb-1">
                        <Gamepad2 className="w-4 h-4" />
                      </div>
                      <div className="text-white font-bold">Free</div>
                      <div className="text-gray-300 text-xs">Price</div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <img
                    src="/thumbnail/TAP ROAD 1.jpg"
                    alt="TAP ROAD Game Screenshot - Neon Ball Rolling Adventure"
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    <Circle className="w-6 h-6 text-cyan-400" />
                    <span className="text-white font-bold">Neon Runner</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Game Screenshots */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Map className="w-6 h-6 text-cyan-400" />
                <span>TAP ROAD Screenshots</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <img
                    src="/thumbnail/TAP ROAD 1.jpg"
                    alt="TAP ROAD gameplay showing neon ball on glowing track"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                    Neon Track Gameplay
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="/thumbnail/TAP ROAD 2.webp"
                    alt="TAP ROAD advanced level with obstacles and gems"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                    Advanced Challenge
                  </div>
                </div>
              </div>
            </div>

            {/* Game Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {gameFeatures.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* About TAP ROAD */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <Circle className="w-6 h-6 text-cyan-400" />
                    <span>About TAP ROAD</span>
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      TAP ROAD is a fast-paced ball-rolling game where you control a luminous sphere speeding down an ever-changing neon track. 
                      With each tap, you switch lanes to avoid spikes, gaps, and other obstacles. The game combines simple controls with 
                      challenging gameplay that keeps players engaged for hours.
                    </p>
                    <p>
                      In TAP ROAD, timing is everything. You need to tap at the perfect moment to change lanes and avoid obstacles. 
                      The game starts easy but gets faster as you progress, testing your reflexes and concentration. 
                      TAP ROAD is perfect for players who enjoy arcade-style games with beautiful visual effects.
                    </p>
                    <p>
                      What makes TAP ROAD special is its stunning neon graphics and smooth gameplay. The glowing ball and colorful tracks 
                      create an amazing visual experience. Plus, TAP ROAD works on any device - desktop, tablet, or mobile - 
                      without requiring any downloads or installations.
                    </p>
                  </div>
                </div>

                {/* Gameplay Features */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    <span>TAP ROAD Features</span>
                  </h2>
                  <div className="grid gap-4">
                    {gameplayHighlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                          {index + 1}
                        </div>
                        <p className="text-gray-300">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Perfect For Section */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <Target className="w-6 h-6 text-green-400" />
                    <span>Perfect For</span>
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {playerTypes.map((type, index) => (
                      <div key={index} className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-4 border border-cyan-400/20">
                        <div className="flex items-center space-x-2">
                          <Circle className="w-5 h-5 text-cyan-400" />
                          <span className="text-white font-medium">{type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How to Play TAP ROAD */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <Gamepad2 className="w-6 h-6 text-purple-400" />
                    <span>How to Play TAP ROAD</span>
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg p-4 border border-purple-400/20">
                      <h3 className="text-white font-bold mb-3 flex items-center space-x-2">
                        <MousePointer className="w-5 h-5 text-purple-400" />
                        <span>Controls</span>
                      </h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center space-x-2">
                          <ArrowLeft className="w-4 h-4 text-cyan-400" />
                          <span>Tap or click left side of screen to move left</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <ArrowRight className="w-4 h-4 text-cyan-400" />
                          <span>Tap or click right side of screen to move right</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <ArrowUp className="w-4 h-4 text-cyan-400" />
                          <span>Use left and right arrow keys on desktop</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-white font-bold mb-3">TAP ROAD Tips for Success</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                            1
                          </span>
                          <span className="text-gray-300">Start slow and get comfortable with TAP ROAD's rhythm before trying for high scores</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                            2
                          </span>
                          <span className="text-gray-300">Focus on avoiding obstacles first - gem collection comes naturally as you play TAP ROAD</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                            3
                          </span>
                          <span className="text-gray-300">Watch for patterns in TAP ROAD - obstacle sequences often repeat, so you can learn them</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                            4
                          </span>
                          <span className="text-gray-300">Stay centered early in TAP ROAD to give yourself time to react to obstacles</span>
                        </div>
                      </div>
                    </div>
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
                      <span className="text-gray-300">Game:</span>
                      <span className="text-white">TAP ROAD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Category:</span>
                      <span className="text-white">{tapRoadGame.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Platform:</span>
                      <span className="text-white">Web Browser</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Language:</span>
                      <span className="text-white">{tapRoadGame.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Price:</span>
                      <span className="text-green-400 font-bold">Free</span>
                    </div>
                  </div>
                </div>

                {/* Similar Games */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold text-white mb-4">Similar to TAP ROAD</h3>
                  <div className="space-y-3">
                    {recommendedGames.slice(0, 4).map((game) => (
                      <button
                        key={game.id}
                        onClick={() => navigate(`/games/${game.url.split('/').pop()}`)}
                        className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 text-left group"
                      >
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-sm font-medium truncate group-hover:text-cyan-300 transition-colors">
                            {game.title}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs">
                            <span className="text-yellow-400">⭐ {game.rating?.toFixed(1) || '4.0'}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-400">{game.category}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-300 transition-colors" />
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => navigate(`/?category=${encodeURIComponent(tapRoadGame.category)}`)}
                    className="w-full mt-4 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                  >
                    View All {tapRoadGame.category} Games →
                  </button>
                </div>

                {/* TAP ROAD FAQ */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold text-white mb-4">TAP ROAD FAQ</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="text-white font-medium mb-1">Is TAP ROAD safe for kids?</h4>
                      <p className="text-gray-300">Yes! TAP ROAD features family-friendly visuals and simple controls. Perfect for children aged 7 and up.</p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Can I play TAP ROAD offline?</h4>
                      <p className="text-gray-300">TAP ROAD requires an internet connection to load, but it's optimized to work on slower connections too.</p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">How do I earn more gems in TAP ROAD?</h4>
                      <p className="text-gray-300">Focus on long runs without crashing. Gems appear more frequently as you cover greater distances in TAP ROAD.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Game Player Modal */}
            <GameModal
              game={tapRoadGame}
              isOpen={isPlaying}
              onClose={() => setIsPlaying(false)}
            />
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};
