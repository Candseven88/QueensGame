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
  Car,
  Gauge
} from 'lucide-react';

export const SubwayMotoPage: React.FC = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Get Subway Moto game data
  const subwayMotoGame = allGames.find(game => game.id === 'subway-moto');

  // Get recommended games based on similar gameplay
  const getRecommendedGames = () => {
    if (!subwayMotoGame) return [];
    
    return allGames
      .filter(g => {
        if (g.id === subwayMotoGame.id) return false;
        
        // Prioritize racing games and similar categories
        const sharedTags = g.tags.filter(tag => subwayMotoGame.tags.includes(tag));
        const sameCategory = g.category === subwayMotoGame.category;
        const isRacing = g.tags.some(tag => tag.toLowerCase().includes('racing')) || 
                        g.tags.some(tag => tag.toLowerCase().includes('speed'));
        
        return sameCategory || sharedTags.length >= 2 || isRacing;
      })
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6);
  };

  const recommendedGames = getRecommendedGames();

  // Auto-generated content for player types and highlights
  const playerTypes = [
    "Racing game enthusiasts",
    "High-speed thrill seekers", 
    "Motorcycle racing fans",
    "3D graphics lovers"
  ];

  const gameplayHighlights = [
    "High-speed motorcycle racing through underground subway tunnels",
    "Stunning 3D graphics with realistic physics and smooth controls",
    "Challenging obstacle courses that test your reflexes and timing",
    "Spectacular stunts and jumps for extra points and style bonuses",
    "Progressive difficulty that keeps the adrenaline pumping",
    "Coin collection system for motorcycle upgrades and improvements"
  ];

  useEffect(() => {
    // Check if game is liked/bookmarked from localStorage
    if (subwayMotoGame) {
      const likedGames = JSON.parse(localStorage.getItem('likedGames') || '[]');
      const bookmarkedGames = JSON.parse(localStorage.getItem('bookmarkedGames') || '[]');
      
      setIsLiked(likedGames.includes(subwayMotoGame.id));
      setIsBookmarked(bookmarkedGames.includes(subwayMotoGame.id));
    }
  }, [subwayMotoGame]);

  const handleLike = () => {
    if (!subwayMotoGame) return;
    
    const likedGames = JSON.parse(localStorage.getItem('likedGames') || '[]');
    let updatedLikes;
    
    if (isLiked) {
      updatedLikes = likedGames.filter((id: string) => id !== subwayMotoGame.id);
    } else {
      updatedLikes = [...likedGames, subwayMotoGame.id];
    }
    
    localStorage.setItem('likedGames', JSON.stringify(updatedLikes));
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    if (!subwayMotoGame) return;
    
    const bookmarkedGames = JSON.parse(localStorage.getItem('bookmarkedGames') || '[]');
    let updatedBookmarks;
    
    if (isBookmarked) {
      updatedBookmarks = bookmarkedGames.filter((id: string) => id !== subwayMotoGame.id);
    } else {
      updatedBookmarks = [...bookmarkedGames, subwayMotoGame.id];
    }
    
    localStorage.setItem('bookmarkedGames', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    const shareData = {
      title: `Subway Moto - New Game Recommendation | QueensGame`,
      text: `Experience the ultimate subway motorcycle racing adventure: Subway Moto!`,
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

  if (!subwayMotoGame) {
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
        game={subwayMotoGame}
        title="Subway Moto - New Game Recommendation | High-Speed Underground Racing"
        description="Rev up your engines for the ultimate subway motorcycle adventure! High-speed racing through underground tunnels with stunning 3D graphics. Perfect for racing enthusiasts and thrill seekers!"
        keywords="subway moto, new game recommendation, motorcycle racing, 3D racing game, subway racing, high speed racing, underground racing, adrenaline racing, free online racing"
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
                      🆕 NEW RELEASE
                    </span>
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      🔥 TRENDING
                    </span>
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ⭐ EDITOR'S PICK
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 gradient-text-neon">
                    Subway Moto
                  </h1>
                  
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    Rev up your engines for the ultimate subway motorcycle adventure! Navigate through underground 
                    tunnels at breakneck speeds with stunning 3D graphics and challenging obstacle courses.
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3"
                    >
                      <Play className="w-6 h-6" fill="currentColor" />
                      <span>Play Now - Free!</span>
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
                      <div className="text-white font-bold">{subwayMotoGame.rating?.toFixed(1)}</div>
                      <div className="text-gray-300 text-xs">Rating</div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center text-blue-400 mb-1">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="text-white font-bold">
                        {subwayMotoGame.plays ? `${Math.floor(subwayMotoGame.plays / 1000)}k` : '22k'}
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
                    src={subwayMotoGame.thumbnail}
                    alt="Subway Moto Game Screenshot"
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    <Car className="w-6 h-6 text-white" />
                    <span className="text-white font-bold">3D Racing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Gameplay Highlights */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <Gauge className="w-6 h-6 text-red-400" />
                    <span>Racing Highlights</span>
                  </h2>
                  <div className="grid gap-4">
                    {gameplayHighlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
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
                      <div key={index} className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg p-4 border border-red-400/20">
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-5 h-5 text-red-400" />
                          <span className="text-white font-medium">{type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How to Play */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <Gamepad2 className="w-6 h-6 text-purple-400" />
                    <span>How to Play</span>
                  </h2>
                  <ol className="space-y-3">
                    {subwayMotoGame.instructions?.map((instruction, index) => (
                      <li key={index} className="flex space-x-3">
                        <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-300">{instruction}</span>
                      </li>
                    ))}
                  </ol>
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
                      <span className="text-white">{subwayMotoGame.author}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Category:</span>
                      <span className="text-white">{subwayMotoGame.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Platform:</span>
                      <span className="text-white">Web Browser</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Language:</span>
                      <span className="text-white">{subwayMotoGame.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Size:</span>
                      <span className="text-white">{subwayMotoGame.width}x{subwayMotoGame.height}</span>
                    </div>
                  </div>
                </div>

                {/* Similar Racing Games */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold text-white mb-4">Similar Racing Games</h3>
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
                          <h4 className="text-white text-sm font-medium truncate group-hover:text-purple-300 transition-colors">
                            {game.title}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs">
                            <span className="text-yellow-400">⭐ {game.rating?.toFixed(1) || '4.0'}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-400">{game.category}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-300 transition-colors" />
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => navigate(`/?category=${encodeURIComponent(subwayMotoGame.category)}`)}
                    className="w-full mt-4 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                  >
                    View All {subwayMotoGame.category} Games →
                  </button>
                </div>
              </div>
            </div>

            {/* Game Player Modal */}
            <GameModal
              game={subwayMotoGame}
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