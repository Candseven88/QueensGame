import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackgroundPattern, DarkBackgroundPattern } from '../components/BackgroundPattern';
import { SEOHead } from '../components/SEOHead';
import { allGames } from '../data/gameData';
import { topicPages, getGamesForTopic } from '../data/topicPages';
import { Game } from '../types/Game';
import { 
  ArrowLeft, 
  Play, 
  Star, 
  Users, 
  Share2, 
  Heart, 
  Maximize2, 
  Minimize2, 
  X,
  Calendar,
  Clock,
  Trophy,
  Target,
  Gamepad2,
  Link,
  Bookmark
} from 'lucide-react';

export const GameDetailPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isGameFullscreen, setIsGameFullscreen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 1200, height: 800 });
  const gameContainerRef = useRef<HTMLDivElement>(null);

  // 监听屏幕尺寸变化
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // 初始化
    if (typeof window !== 'undefined') {
      updateScreenSize();
      window.addEventListener('resize', updateScreenSize);
      return () => window.removeEventListener('resize', updateScreenSize);
    }
  }, []);

  // 计算游戏的最佳显示尺寸
  const getOptimalGameSize = () => {
    if (!game) return { width: 800, height: 600, aspectRatio: '4/3' };
    
    const gameWidth = game.width || 800;
    const gameHeight = game.height || 600;
    const gameRatio = gameWidth / gameHeight;
    
    // 预留空间给控制条和边距
    const availableWidth = screenSize.width - 64; // 32px padding on each side
    const availableHeight = screenSize.height - 120; // 控制条 + 边距
    
    // 按宽度或高度限制计算最终尺寸
    let finalWidth = Math.min(gameWidth, availableWidth);
    let finalHeight = finalWidth / gameRatio;
    
    if (finalHeight > availableHeight) {
      finalHeight = availableHeight;
      finalWidth = finalHeight * gameRatio;
    }
    
    return {
      width: Math.floor(finalWidth),
      height: Math.floor(finalHeight),
      aspectRatio: `${gameWidth}/${gameHeight}`
    };
  };

  useEffect(() => {
    // Find game by URL parameter
    const foundGame = allGames.find(g => {
      const gameUrlId = g.url.split('/').pop();
      return gameUrlId === gameId;
    });
    
    if (foundGame) {
      setGame(foundGame);
      
      // Check if game is liked/bookmarked from localStorage
      const likedGames = JSON.parse(localStorage.getItem('likedGames') || '[]');
      const bookmarkedGames = JSON.parse(localStorage.getItem('bookmarkedGames') || '[]');
      
      setIsLiked(likedGames.includes(foundGame.id));
      setIsBookmarked(bookmarkedGames.includes(foundGame.id));
    } else {
      navigate('/');
    }
  }, [gameId, navigate]);

  // Handle game iframe fullscreen mode
  const handleGameFullscreen = () => {
    if (!gameContainerRef.current) return;
    
    if (!isGameFullscreen) {
      if (gameContainerRef.current.requestFullscreen) {
        gameContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsGameFullscreen(!isGameFullscreen);
  };

  // Handle like functionality
  const handleLike = () => {
    if (!game) return;
    
    const likedGames = JSON.parse(localStorage.getItem('likedGames') || '[]');
    let updatedLikes;
    
    if (isLiked) {
      updatedLikes = likedGames.filter((id: string) => id !== game.id);
    } else {
      updatedLikes = [...likedGames, game.id];
    }
    
    localStorage.setItem('likedGames', JSON.stringify(updatedLikes));
    setIsLiked(!isLiked);
  };

  // Handle bookmark functionality
  const handleBookmark = () => {
    if (!game) return;
    
    const bookmarkedGames = JSON.parse(localStorage.getItem('bookmarkedGames') || '[]');
    let updatedBookmarks;
    
    if (isBookmarked) {
      updatedBookmarks = bookmarkedGames.filter((id: string) => id !== game.id);
    } else {
      updatedBookmarks = [...bookmarkedGames, game.id];
    }
    
    localStorage.setItem('bookmarkedGames', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  // Handle share functionality
  const handleShare = async () => {
    if (!game) return;
    
    const shareData = {
      title: `${game.title} - Play Online at QueensGame`,
      text: `Check out this amazing game: ${game.title}!`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (clipboardError) {
        console.error('Clipboard access failed:', clipboardError);
      }
    }
  };

  // Get related games based on category and tags
  const getRelatedGames = () => {
    if (!game) return [];
    
    // Enhanced recommendation algorithm with weighted scoring
    const scoredGames = allGames
      .filter(g => g.id !== game.id)
      .map(g => {
        let score = 0;
        
        // Category match (highest weight)
        if (g.category === game.category) score += 10;
        
        // Tag matches (weighted by importance)
        const sharedTags = g.tags.filter(tag => game.tags.includes(tag));
        score += sharedTags.length * 3;
        
        // Special game attributes
        if (g.featured && game.featured) score += 5;
        if (g.trending && game.trending) score += 4;
        if (g.editorsPick && game.editorsPick) score += 4;
        if (g.hotGame && game.hotGame) score += 3;
        
        // Quality indicators
        score += (g.rating || 0) * 2;
        score += Math.min((g.plays || 0) / 10000, 5); // Cap play count contribution
        
        // Freshness boost for new games
        const gameAge = Date.now() - new Date(g.createdAt).getTime();
        const daysSinceCreation = gameAge / (1000 * 60 * 60 * 24);
        if (daysSinceCreation < 30) score += 3; // Boost new games
        
        // Provider diversity (prefer different providers for variety)
        if (g.provider !== game.provider) score += 1;
        
        return { game: g, score };
      })
      .sort((a, b) => b.score - a.score)
      .map(item => item.game);
    
    return scoredGames.slice(0, 12); // Return more recommendations for better variety
  };

  // Get SEO-optimized game recommendations for different sections
  const getCategorizedRecommendations = () => {
    const related = getRelatedGames();
    
    return {
      similar: related.slice(0, 4), // Most similar games
      trending: related.filter(g => g.trending).slice(0, 3),
      featured: related.filter(g => g.featured).slice(0, 3),
      newGames: related
        .filter(g => {
          const gameAge = Date.now() - new Date(g.createdAt).getTime();
          const daysSinceCreation = gameAge / (1000 * 60 * 60 * 24);
          return daysSinceCreation < 7;
        })
        .slice(0, 3),
      sameCategory: related.filter(g => g.category === game?.category).slice(0, 4)
    };
  };

  // Get topic pages this game belongs to
  const getGameTopics = () => {
    if (!game) return [];
    
    return topicPages.filter(topic => {
      try {
        return topic.filterCriteria(game);
      } catch {
        return false;
      }
    });
  };

  const relatedGames = getRelatedGames();
  const gameTopics = getGameTopics();
  const recommendations = getCategorizedRecommendations();

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Game Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The game you're looking for doesn't exist or has been moved.
          </p>
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
      
      {/* SEO Head Component */}
      <SEOHead game={game} />
      
      <div className="relative z-10">
        <Header />
        
        <main className="pt-28 sm:pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <button
                onClick={() => navigate('/')}
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Home</span>
              </button>
              <span>/</span>
              <span className="text-gray-700 dark:text-gray-300">{game.category}</span>
              <span>/</span>
              <span className="text-gray-900 dark:text-white font-medium">{game.title}</span>
            </nav>

            {/* Game Header */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
              <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                <div className="flex-shrink-0 mb-6 lg:mb-0">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full lg:w-80 h-auto rounded-lg shadow-lg"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {game.title}
                      </h1>
                      
                      {/* Game Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {game.featured && (
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            ⭐ Featured
                          </span>
                        )}
                        {game.trending && (
                          <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            🔥 Trending
                          </span>
                        )}
                        {game.editorsPick && (
                          <span className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            ⭐ Editor's Pick
                          </span>
                        )}
                        <span className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded-full">
                          {game.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={handleLike}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          isLiked 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                      </button>
                      
                      <button
                        onClick={handleBookmark}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          isBookmarked 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                      
                      <button
                        onClick={handleShare}
                        className="p-2 bg-white/10 text-white hover:bg-white/20 rounded-lg transition-all duration-300"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Game Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center text-yellow-400 mb-1">
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                      <div className="text-white font-bold">{game.rating?.toFixed(1) || '4.5'}</div>
                      <div className="text-gray-300 text-xs">Rating</div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center text-blue-400 mb-1">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="text-white font-bold">
                        {game.plays ? `${Math.floor(game.plays / 1000)}k` : '25k'}
                      </div>
                      <div className="text-gray-300 text-xs">Plays</div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center text-green-400 mb-1">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div className="text-white font-bold">
                        {new Date(game.createdAt).getFullYear()}
                      </div>
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
                  
                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {game.description}
                  </p>
                  
                  {/* Play Button */}
                  <button
                    onClick={() => {
                      setIsPlaying(true);
                      // 显示即时反馈
                      const button = document.activeElement as HTMLElement;
                      if (button) {
                        button.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                          button.style.transform = '';
                        }, 150);
                      }
                    }}
                    className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 active:scale-95"
                  >
                    <div className="relative">
                      <Play className="w-6 h-6" fill="currentColor" />
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                    </div>
                    <span>Play Now - Free!</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Game Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Game Instructions */}
                {game.instructions && game.instructions.length > 0 && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                        <Target className="w-5 h-5" />
                        <span>How to Play</span>
                      </h2>
                      <button
                        onClick={() => setShowInstructions(!showInstructions)}
                        className="text-sm text-purple-400 hover:text-purple-300"
                      >
                        {showInstructions ? 'Hide' : 'Show'} Instructions
                      </button>
                    </div>
                    
                    {showInstructions && (
                      <ol className="space-y-3">
                        {game.instructions.map((instruction, index) => (
                          <li key={index} className="flex space-x-3">
                            <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-gray-300">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                )}

                {/* Game Tags */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h2 className="text-xl font-bold text-white mb-4">Game Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => navigate(`/?search=${encodeURIComponent(tag)}`)}
                        className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-105"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Game Topics */}
                {gameTopics.length > 0 && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                      <Link className="w-5 h-5" />
                      <span>Game Collections</span>
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {gameTopics.map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => navigate(`/topic/${topic.slug}`)}
                          className={`bg-gradient-to-r ${topic.gradient} rounded-lg p-3 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-left`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-lg">{topic.icon}</span>
                            <span className="font-medium text-sm">{topic.title}</span>
                          </div>
                          <div className="text-xs text-white/80">
                            {getGamesForTopic(topic.slug, allGames).length} games
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Game Info */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold text-white mb-4">Game Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Developer:</span>
                      <span className="text-white">{game.author || 'GameMonetize'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Category:</span>
                      <span className="text-white">{game.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Platform:</span>
                      <span className="text-white">Web Browser</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Language:</span>
                      <span className="text-white">{game.language || 'English'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Size:</span>
                      <span className="text-white">{game.width}x{game.height}</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Game Recommendations */}
                {recommendations.similar.length > 0 && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-lg font-bold text-white mb-4">Similar Games You'll Love</h3>
                    <div className="space-y-3">
                      {recommendations.similar.map((relatedGame) => (
                        <button
                          key={relatedGame.id}
                          onClick={() => navigate(`/games/${relatedGame.url.split('/').pop()}`)}
                          className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 text-left group"
                        >
                          <img
                            src={relatedGame.thumbnail}
                            alt={relatedGame.title}
                            className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white text-sm font-medium truncate group-hover:text-purple-300 transition-colors">
                              {relatedGame.title}
                            </h4>
                            <div className="flex items-center space-x-2 text-xs">
                              <span className="text-yellow-400">⭐ {relatedGame.rating?.toFixed(1) || '4.0'}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-400">{relatedGame.category}</span>
                              {relatedGame.trending && <span className="text-red-400">🔥</span>}
                              {relatedGame.featured && <span className="text-yellow-400">⭐</span>}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => navigate(`/?category=${encodeURIComponent(game.category)}`)}
                      className="w-full mt-4 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                    >
                      View All {game.category} Games →
                    </button>
                  </div>
                )}

                {/* New Games Section */}
                {recommendations.newGames.length > 0 && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                      <span className="text-green-400">🆕</span>
                      <span>New Game Recommendations</span>
                    </h3>
                    <div className="grid gap-3">
                      {recommendations.newGames.map((newGame) => (
                        <button
                          key={newGame.id}
                          onClick={() => navigate(`/games/${newGame.url.split('/').pop()}`)}
                          className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 hover:from-green-500/20 hover:to-blue-500/20 rounded-lg transition-all duration-300 text-left border border-green-400/20"
                        >
                          <img
                            src={newGame.thumbnail}
                            alt={newGame.title}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white text-sm font-medium truncate">
                              {newGame.title}
                            </h4>
                            <p className="text-green-400 text-xs">New Release</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Games */}
                {recommendations.trending.length > 0 && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                      <span className="text-red-400">🔥</span>
                      <span>Trending Now</span>
                    </h3>
                    <div className="grid gap-3">
                      {recommendations.trending.map((trendingGame) => (
                        <button
                          key={trendingGame.id}
                          onClick={() => navigate(`/games/${trendingGame.url.split('/').pop()}`)}
                          className="flex items-center space-x-3 p-3 bg-gradient-to-r from-red-500/10 to-pink-500/10 hover:from-red-500/20 hover:to-pink-500/20 rounded-lg transition-all duration-300 text-left border border-red-400/20"
                        >
                          <img
                            src={trendingGame.thumbnail}
                            alt={trendingGame.title}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white text-sm font-medium truncate">
                              {trendingGame.title}
                            </h4>
                            <p className="text-red-400 text-xs">Trending</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Game Player Modal */}
            {isPlaying && (
              <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
                <div className="relative w-full h-full max-w-7xl max-h-full bg-black rounded-lg overflow-hidden" ref={gameContainerRef}>
                  {/* Game Controls Bar */}
                  <div className="absolute top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm p-3 flex items-center justify-between z-20 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setIsPlaying(false)}
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm px-3 py-2 rounded hover:bg-gray-700"
                      >
                        <X className="w-4 h-4" />
                        <span>Close</span>
                      </button>
                      <div className="text-white font-medium text-sm">{game.title}</div>
                    </div>
                    
                    <button
                      onClick={handleGameFullscreen}
                      className="p-2 text-gray-300 hover:text-white transition-colors hover:bg-gray-700 rounded"
                      title="Toggle Fullscreen"
                    >
                      {isGameFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {/* Game Container with Aspect Ratio */}
                  <div className="relative w-full h-full flex items-center justify-center pt-14">
                    <div className="relative w-full h-full max-w-full max-h-full">
                      {/* 游戏容器 - 智能适配屏幕尺寸 */}
                      <div 
                        className="mx-auto bg-gray-800 shadow-2xl rounded"
                        style={{
                          width: `${getOptimalGameSize().width}px`,
                          height: `${getOptimalGameSize().height}px`,
                          aspectRatio: getOptimalGameSize().aspectRatio
                        }}
                      >
                        <iframe
                          src={game.embedUrl}
                          className="w-full h-full border-0 rounded"
                          frameBorder="0"
                          allowFullScreen
                          title={game.title}
                          allow="gamepad; microphone; camera; fullscreen"
                          loading="eager"
                          onLoad={() => {
                            // 隐藏加载指示器
                            const loadingElement = document.getElementById('game-loading');
                            if (loadingElement) {
                              loadingElement.style.display = 'none';
                            }
                            console.log('Game loaded successfully');
                          }}
                          onError={() => {
                            console.error('Failed to load game');
                            // 显示错误消息
                            const loadingElement = document.getElementById('game-loading');
                            if (loadingElement) {
                              loadingElement.innerHTML = `
                                <div class="text-center">
                                  <div class="text-red-400 mb-3 text-2xl">⚠️</div>
                                  <p class="text-white mb-4">Failed to load game</p>
                                  <button onclick="window.location.reload()" class="px-6 py-3 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
                                    Retry
                                  </button>
                                </div>
                              `;
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Loading Indicator */}
                  <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10" id="game-loading">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white text-lg">Loading Game...</p>
                      <p className="text-gray-400 text-sm mt-2">Please wait while we prepare your game</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}; 