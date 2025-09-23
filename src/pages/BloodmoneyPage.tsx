import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackgroundPattern, DarkBackgroundPattern } from '../components/BackgroundPattern';
import { SEOHead } from '../components/SEOHead';
import { allGames } from '../data/gameData';
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
  Bookmark,
  Brain,
  AlertTriangle,
  BookOpen,
  Zap,
  Award
} from 'lucide-react';
import { trackPageView, trackGameView } from '../utils/analytics';

export const BloodmoneyPage: React.FC = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isGameFullscreen, setIsGameFullscreen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [screenSize, setScreenSize] = useState({ width: 1200, height: 800 });
  const gameContainerRef = useRef<HTMLDivElement>(null);

  // Game data - Human Expenditure Program: Bloodmoney 2
  const game: Game = {
    id: "bloodmoney-2",
    title: "Human Expenditure Program: Bloodmoney 2",
    description: "Experience Human Expenditure Program: Bloodmoney 2, a psychological horror clicker game where each click inflicts pain on Harvey Harvington, and the pain is very real. This deceptively simple clicker mechanic comes with heavy moral responsibility. The game requires mental resilience and is not recommended for those sensitive to flashing lights. Discover what the Human Expenditure Program really is, who's behind it, and your actual role in this dark experiment.",
    shortDescription: "A psychological horror clicker where each click affects Harvey Harvington's well-being in this moral responsibility thriller.",
    thumbnail: "/thumbnail/Bloodmoney_2.jpg",
    category: "Royal Adventure",
    tags: ["1 Player", "Clicker", "Psychological Horror", "Thriller", "Drama", "Mystery", "Virtual Pet", "Horror", "Sad", "Suspense", "New Game"],
    url: "/games/human-expenditure-program-bloodmoney-2",
    embedUrl: "https://yoplay.io/human-expenditure-program-bloodmoney-2.embed",
    fallbackUrls: ["https://sprunki.org/bloodmoney-2"],
    width: 1280,
    height: 720,
    provider: "external",
    rating: 4.3,
    plays: 12000,
    featured: true,
    trending: true,
    editorsPick: true,
    hotGame: true,
    createdAt: "2025-09-23T12:00:00.000Z",
    author: "Shroomychrist Studios",
    releaseDate: "2025-09-20",
    language: "English",
    seoKeywords: "bloodmoney 2, human expenditure program, psychological horror clicker, harvey harvington, virtual pet game, moral responsibility game, shroomychrist studios, clicker horror game, drama thriller",
    external: true,
          instructions: [
        "Click on Harvey Harvington to interact - but remember, the pain you inflict is real",
        "Each click has moral weight and psychological consequences",
        "Monitor Harvey's well-being as you progress through the experiment",
        "Discover the truth behind the Human Expenditure Program through gameplay",
        "Experience the heavy responsibility that comes with each interaction",
        "Use mouse clicks to advance the story and uncover dark secrets",
        "Be prepared for psychological impact - mental resilience required"
      ]
  };

  // Custom SEO data for this specific game
  const seoData = {
    title: "Human Expenditure Program: Bloodmoney 2 - Play Harvey Harvington Clicker Horror | QueensGame",
    description: "Play Bloodmoney 2 free online - a psychological horror clicker where each click affects Harvey Harvington. Experience moral responsibility in this dark experiment by Shroomychrist Studios. Features drama, mystery, and virtual pet mechanics with heavy emotional impact.",
    keywords: "bloodmoney 2, human expenditure program, harvey harvington, psychological horror clicker, shroomychrist studios, virtual pet horror, moral responsibility game, clicker horror, drama thriller, mystery game",
    ogTitle: "Human Expenditure Program: Bloodmoney 2 - Harvey Harvington Horror Clicker",
    ogDescription: "Experience the psychological horror clicker where each click inflicts pain on Harvey Harvington. Discover the dark truth behind the Human Expenditure Program.",
    ogImage: "/thumbnail/Bloodmoney_2.jpg"
  };

  // Monitor screen size changes
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (typeof window !== 'undefined') {
      updateScreenSize();
      window.addEventListener('resize', updateScreenSize);
      return () => window.removeEventListener('resize', updateScreenSize);
    }
  }, []);

  // Track page view
  useEffect(() => {
    trackPageView('/games/human-expenditure-program-bloodmoney-2', 'Human Expenditure Program: Bloodmoney 2');
    
    // Check if game is liked/bookmarked from localStorage
    const likedGames = JSON.parse(localStorage.getItem('likedGames') || '[]');
    const bookmarkedGames = JSON.parse(localStorage.getItem('bookmarkedGames') || '[]');
    
    setIsLiked(likedGames.includes(game.id));
    setIsBookmarked(bookmarkedGames.includes(game.id));
  }, []);

  // Calculate optimal game size
  const getOptimalGameSize = () => {
    const gameWidth = game.width || 1024;
    const gameHeight = game.height || 768;
    const gameRatio = gameWidth / gameHeight;
    
    const availableWidth = screenSize.width - 64;
    const availableHeight = screenSize.height - 120;
    
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

  // Handle game fullscreen mode
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
    const shareData = {
      title: `${game.title} - Play Online at QueensGame`,
      text: `Check out this amazing psychological thriller: ${game.title}!`,
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
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (clipboardError) {
        console.error('Clipboard access failed:', clipboardError);
      }
    }
  };

  // Get recommended games based on similar categories and tags
  const getRecommendedGames = () => {
    return allGames
      .filter(g => {
        if (g.id === game.id) return false;
        
        // Prioritize same category
        if (g.category === game.category) return true;
        
        // Similar tags
        const sharedTags = g.tags.filter(tag => game.tags.includes(tag));
        return sharedTags.length >= 1;
      })
      .sort((a, b) => {
        const scoreA = (a.rating || 0) * 0.6 + (a.plays || 0) / 100000 * 0.4;
        const scoreB = (b.rating || 0) * 0.6 + (b.plays || 0) / 100000 * 0.4;
        return scoreB - scoreA;
      })
      .slice(0, 8);
  };

  const recommendedGames = getRecommendedGames();

  return (
    <div className="min-h-screen relative">
      <BackgroundPattern className="light:block dark:hidden" />
      <DarkBackgroundPattern className="light:hidden dark:block" />
      
      {/* SEO Head Component */}
      <SEOHead 
        game={game}
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        ogTitle={seoData.ogTitle}
        ogDescription={seoData.ogDescription}
        ogImage={seoData.ogImage}
        canonical={`https://queensgame.io${game.url}`}
      />
      
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
              <span className="text-gray-900 dark:text-white font-medium">New Game Recommendation</span>
            </nav>

            {/* Game Header */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
              <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                <div className="flex-shrink-0 mb-6 lg:mb-0">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full lg:w-80 h-auto rounded-lg shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/512x384/333/fff?text=Bloodmoney+2';
                    }}
                  />
                  
                  {/* New Game Badge */}
                  <div className="mt-4 flex justify-center">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                      ✨ New Game Recommendation
                    </span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {game.title}
                      </h1>
                      
                      {/* Game Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          ⭐ Featured
                        </span>
                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          🔥 Trending
                        </span>
                        <span className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          ⭐ Editor's Pick
                        </span>
                        <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          🎯 Hot Game
                        </span>
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
                      <div className="text-white font-bold">{game.rating?.toFixed(1)}</div>
                      <div className="text-gray-300 text-xs">Rating</div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center text-blue-400 mb-1">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="text-white font-bold">
                        {Math.floor((game.plays || 0) / 1000)}k
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
                      trackGameView(game);
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
                {/* Game Highlights */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span>Game Highlights & Why You Should Play</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="w-5 h-5 text-purple-400" />
                        <h3 className="text-white font-medium">Clicker with Consequences</h3>
                      </div>
                      <p className="text-gray-300 text-sm">Simple clicking mechanism with profound moral implications - each click on Harvey Harvington has real emotional weight.</p>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-5 h-5 text-green-400" />
                        <h3 className="text-white font-medium">Heavy Responsibility</h3>
                      </div>
                      <p className="text-gray-300 text-sm">Every click comes with moral responsibility - the pain you inflict is very real, creating an intense psychological experience.</p>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <BookOpen className="w-5 h-5 text-blue-400" />
                        <h3 className="text-white font-medium">Dark Mystery</h3>
                      </div>
                      <p className="text-gray-300 text-sm">Uncover the truth behind the Human Expenditure Program and discover your actual role in this dark experiment.</p>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-orange-400" />
                        <h3 className="text-white font-medium">Mental Resilience Required</h3>
                      </div>
                      <p className="text-gray-300 text-sm">Not for the faint of heart - requires mental resilience and not recommended for those sensitive to flashing lights.</p>
                    </div>
                  </div>
                </div>

                {/* Suitable Players */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <span>Perfect For These Types of Players</span>
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-500 rounded-full p-1 mt-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Horror Game Enthusiasts</h3>
                        <p className="text-gray-300 text-sm">Players who enjoy psychological horror and are prepared for intense, emotionally challenging gaming experiences.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-500 rounded-full p-1 mt-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Moral Philosophy Explorers</h3>
                        <p className="text-gray-300 text-sm">Those who enjoy games that challenge moral boundaries and explore complex ethical questions through gameplay.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-500 rounded-full p-1 mt-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Clicker Game Fans</h3>
                        <p className="text-gray-300 text-sm">Players who appreciate clicker mechanics but seek deeper meaning and psychological impact beyond simple progression.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-500 rounded-full p-1 mt-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Virtual Pet Caretakers</h3>
                        <p className="text-gray-300 text-sm">Gamers who have experience with virtual pet games but are ready for a darker, more complex emotional responsibility.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Game Instructions */}
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
                      {game.instructions?.map((instruction, index) => (
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
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Game Info */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold text-white mb-4">Game Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Developer:</span>
                      <span className="text-white">{game.author}</span>
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
                      <span className="text-white">{game.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Release Date:</span>
                      <span className="text-white">{game.releaseDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Size:</span>
                      <span className="text-white">{game.width}x{game.height}</span>
                    </div>
                  </div>
                </div>

                {/* Related Games */}
                {recommendedGames.length > 0 && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                      <Award className="w-5 h-5" />
                      <span>Recommended Games</span>
                    </h3>
                    <div className="space-y-3">
                      {recommendedGames.slice(0, 6).map((recGame) => (
                        <button
                          key={recGame.id}
                          onClick={() => navigate(`/games/${recGame.url.split('/').pop()}`)}
                          className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 text-left"
                        >
                          <img
                            src={recGame.thumbnail}
                            alt={recGame.title}
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/64x64/333/fff?text=Game';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white text-sm font-medium truncate">
                              {recGame.title}
                            </h4>
                            <p className="text-gray-400 text-xs">
                              ⭐ {recGame.rating?.toFixed(1) || '4.0'} • {recGame.category}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => navigate(`/?category=${encodeURIComponent(game.category)}`)}
                      className="w-full mt-3 text-purple-400 hover:text-purple-300 text-sm font-medium"
                    >
                      View All {game.category} Games →
                    </button>
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
                          scrolling="no"
                          onLoad={() => {
                            const loadingElement = document.getElementById('game-loading');
                            if (loadingElement) {
                              loadingElement.style.display = 'none';
                            }
                            console.log('Game loaded successfully with embed URL');
                          }}
                          onError={() => {
                            const loadingElement = document.getElementById('game-loading');
                            if (loadingElement) {
                              loadingElement.innerHTML = `
                                <div class="text-center">
                                  <div class="text-yellow-400 mb-3 text-2xl">🎮</div>
                                  <p class="text-white mb-4">Game loading from original site...</p>
                                  <p class="text-gray-400 text-sm mb-4">If the game doesn't appear, try opening in a new tab</p>
                                  <div class="flex gap-4 justify-center">
                                    <button onclick="window.open('${game.embedUrl}', '_blank')" class="px-6 py-3 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
                                      Open Original Site
                                    </button>
                                    <button onclick="window.open('${game.fallbackUrls?.[0]}', '_blank')" class="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                                      Try Backup Site
                                    </button>
                                  </div>
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
                      <p className="text-gray-400 text-sm mt-2">Preparing your psychological thriller experience</p>
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