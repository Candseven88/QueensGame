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
  Map,
  BookOpen
} from 'lucide-react';

export const SilksongFreePage: React.FC = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Get Silksong Free game data
  const silksongFreeGame = allGames.find(game => game.id === 'silksong-free');

  // Get recommended games based on similar gameplay
  const getRecommendedGames = () => {
    if (!silksongFreeGame) return [];
    
    return allGames
      .filter(g => {
        if (g.id === silksongFreeGame.id) return false;
        
        // Prioritize adventure games and similar categories
        const sharedTags = g.tags.filter(tag => silksongFreeGame.tags.includes(tag));
        const sameCategory = g.category === silksongFreeGame.category;
        const isAdventure = g.tags.some(tag => tag.toLowerCase().includes('adventure')) || 
                           g.tags.some(tag => tag.toLowerCase().includes('exploration')) ||
                           g.tags.some(tag => tag.toLowerCase().includes('guide'));
        
        return sameCategory || sharedTags.length >= 2 || isAdventure;
      })
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6);
  };

  const recommendedGames = getRecommendedGames();

  // Auto-generated content for player types and highlights
  const playerTypes = [
    "Hollow Knight fans",
    "Adventure game enthusiasts", 
    "Gaming guide seekers",
    "Interactive story lovers"
  ];

  const gameplayHighlights = [
    "Comprehensive interactive guide to Silksong gaming resources",
    "Beautiful exploration environments with educational content",
    "Learn valuable gaming tips and community insights",
    "Interactive elements that engage and inform players",
    "Perfect blend of entertainment and educational gameplay",
    "Community-focused content that enhances your gaming experience"
  ];

  useEffect(() => {
    // Check if game is liked/bookmarked from localStorage
    if (silksongFreeGame) {
      const likedGames = JSON.parse(localStorage.getItem('likedGames') || '[]');
      const bookmarkedGames = JSON.parse(localStorage.getItem('bookmarkedGames') || '[]');
      
      setIsLiked(likedGames.includes(silksongFreeGame.id));
      setIsBookmarked(bookmarkedGames.includes(silksongFreeGame.id));
    }
  }, [silksongFreeGame]);

  const handleLike = () => {
    if (!silksongFreeGame) return;
    
    const likedGames = JSON.parse(localStorage.getItem('likedGames') || '[]');
    let updatedLikes;
    
    if (isLiked) {
      updatedLikes = likedGames.filter((id: string) => id !== silksongFreeGame.id);
    } else {
      updatedLikes = [...likedGames, silksongFreeGame.id];
    }
    
    localStorage.setItem('likedGames', JSON.stringify(updatedLikes));
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    if (!silksongFreeGame) return;
    
    const bookmarkedGames = JSON.parse(localStorage.getItem('bookmarkedGames') || '[]');
    let updatedBookmarks;
    
    if (isBookmarked) {
      updatedBookmarks = bookmarkedGames.filter((id: string) => id !== silksongFreeGame.id);
    } else {
      updatedBookmarks = [...bookmarkedGames, silksongFreeGame.id];
    }
    
    localStorage.setItem('bookmarkedGames', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    const shareData = {
      title: `How to Get Silksong for Free - New Game Recommendation | QueensGame`,
      text: `Discover the ultimate Silksong guide with interactive exploration and gaming tips!`,
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

  if (!silksongFreeGame) {
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
        game={silksongFreeGame}
        title="How to Get Silksong for Free - New Game Recommendation | Interactive Gaming Guide"
        description="Discover the ultimate Silksong guide! Interactive adventure combining exploration with gaming tips. Perfect for Hollow Knight fans and adventure seekers!"
        keywords="silksong free, new game recommendation, hollow knight silksong, adventure game, gaming guide, interactive guide, exploration game, gaming tips, community resources"
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
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 gradient-text-neon">
                    How to Get Silksong for Free
                  </h1>
                  
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    Discover the ultimate interactive guide to Silksong gaming resources! Explore beautiful 
                    environments while learning valuable gaming tips and community insights.
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3"
                    >
                      <Play className="w-6 h-6" fill="currentColor" />
                      <span>Explore Now - Free!</span>
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
                      <div className="text-white font-bold">{silksongFreeGame.rating?.toFixed(1)}</div>
                      <div className="text-gray-300 text-xs">Rating</div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center text-blue-400 mb-1">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="text-white font-bold">
                        {silksongFreeGame.plays ? `${Math.floor(silksongFreeGame.plays / 1000)}k` : '18k'}
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
                    src={silksongFreeGame.thumbnail}
                    alt="Silksong Free Guide Screenshot"
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    <BookOpen className="w-6 h-6 text-white" />
                    <span className="text-white font-bold">Interactive Guide</span>
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
                    <Map className="w-6 h-6 text-cyan-400" />
                    <span>Guide Features</span>
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
                      <div key={index} className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-4 border border-cyan-400/20">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-5 h-5 text-cyan-400" />
                          <span className="text-white font-medium">{type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How to Use */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <Gamepad2 className="w-6 h-6 text-purple-400" />
                    <span>How to Use This Guide</span>
                  </h2>
                  <ol className="space-y-3">
                    {silksongFreeGame.instructions?.map((instruction, index) => (
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
                  <h3 className="text-lg font-bold text-white mb-4">Guide Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Developer:</span>
                      <span className="text-white">{silksongFreeGame.author}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Category:</span>
                      <span className="text-white">{silksongFreeGame.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Platform:</span>
                      <span className="text-white">Web Browser</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Language:</span>
                      <span className="text-white">{silksongFreeGame.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Size:</span>
                      <span className="text-white">{silksongFreeGame.width}x{silksongFreeGame.height}</span>
                    </div>
                  </div>
                </div>

                {/* Similar Adventure Games */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold text-white mb-4">Similar Adventure Games</h3>
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
                    onClick={() => navigate(`/?category=${encodeURIComponent(silksongFreeGame.category)}`)}
                    className="w-full mt-4 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                  >
                    View All {silksongFreeGame.category} Games →
                  </button>
                </div>
              </div>
            </div>

            {/* Game Player Modal */}
            <GameModal
              game={silksongFreeGame}
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