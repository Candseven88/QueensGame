import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { GamingBackground } from '../components/ui/EnhancedBackground';
import { GameGrid } from '../components/filters/GameGrid';
import { allGames } from '../data/gameData';
import { Game } from '../types/Game';
import { ArrowLeft, Star, Calendar, Trophy, Gamepad2, Play, Heart, Share2, Clock, Shield, Swords, Crown } from 'lucide-react';

export const SilksongPage: React.FC = () => {
  const navigate = useNavigate();
  const [relatedGames, setRelatedGames] = useState<Game[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Set page title and meta description for SEO
    document.title = 'Hollow Knight: Silksong Review & Similar Games - QueensGame';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Discover our in-depth review of Hollow Knight: Silksong and explore similar adventure games. Find the best metroidvania and action-adventure games to play while waiting for Silksong.');
    
    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'Hollow Knight Silksong, metroidvania games, action adventure, indie games, Team Cherry, Hornet, silksong review, adventure games, platform games');

    // Update Open Graph tags
    const setMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    setMetaTag('og:title', 'Hollow Knight: Silksong Review & Similar Games - QueensGame');
    setMetaTag('og:description', 'Discover our in-depth review of Hollow Knight: Silksong and explore similar adventure games. Find the best metroidvania and action-adventure games.');
    setMetaTag('og:type', 'article');
    setMetaTag('og:url', window.location.href);
    
    // Add structured data for the review page
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "VideoGame",
        "name": "Hollow Knight: Silksong",
        "author": {
          "@type": "Organization",
          "name": "Team Cherry"
        },
        "datePublished": "2025-09-08",
        "genre": ["Action", "Adventure", "Metroidvania", "Indie"],
        "gamePlatform": ["PC", "Nintendo Switch", "PlayStation", "Xbox"]
      },
      "author": {
        "@type": "Organization",
        "name": "QueensGame"
      },
      "datePublished": "2025-09-10",
      "description": "In-depth review of Hollow Knight: Silksong, exploring gameplay, story, and why this sequel was worth the 6-year wait.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "9.5",
        "bestRating": "10"
      }
    };
    
    // Remove old structured data
    const oldScript = document.querySelector('script[type="application/ld+json"][data-silksong]');
    if (oldScript) {
      oldScript.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-silksong', 'true');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    // Get related adventure and action games
    const related = allGames.filter(game => 
      game.category === 'Royal Adventure' || 
      game.category === 'Royal Action' ||
      game.tags.some(tag => 
        ['Adventure', 'Action', 'Platform', 'Classic', 'Retro'].includes(tag)
      )
    ).slice(0, 12);
    setRelatedGames(related);
  }, []);

  const handleGameClick = (game: Game) => {
    const gameId = game.url.split('/').pop();
    navigate(`/games/${gameId}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Hollow Knight: Silksong Review - QueensGame',
        text: 'Check out this amazing review of Hollow Knight: Silksong!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen relative">
      <GamingBackground interactive={true} />
      
      <div className="relative z-10">
        <Header />
        
        <main className="pt-28 sm:pt-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm text-white/60 mb-6">
              <button
                onClick={() => navigate('/')}
                className="hover:text-purple-400 transition-colors flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Home</span>
              </button>
              <span>/</span>
              <span className="text-white font-medium">Hollow Knight: Silksong Review</span>
            </nav>

            {/* Hero Section */}
            <div className="premium-card p-8 mb-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-purple-400 font-semibold">GAME REVIEW</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 gradient-text-neon">
                    Hollow Knight: Silksong
                  </h1>
                  
                  <p className="text-xl text-white/80 mb-6">
                    After 6 long years, the wait is finally over. Hornet's adventure delivers everything fans hoped for and more.
                  </p>
                  
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-white font-bold">9.5/10</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <span className="text-white/80">Released Sept 2025</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-gold-400" />
                      <span className="text-white/80">Game of the Year</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button 
                      onClick={handleShare}
                      className="premium-button px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 flex items-center space-x-2"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share Review</span>
                    </button>
                  </div>
                </div>
                
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop"
                    alt="Hollow Knight: Silksong Gameplay"
                    className="w-full h-80 object-cover rounded-xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm opacity-80">Screenshot from Team Cherry</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Review */}
              <div className="lg:col-span-2">
                <div className="premium-card p-8 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <Gamepad2 className="w-6 h-6 text-purple-400" />
                    <span>Our Verdict</span>
                  </h2>
                  
                  <div className="prose prose-invert max-w-none text-white/90 space-y-6">
                    <p className="text-lg leading-relaxed">
                      <strong>Hollow Knight: Silksong</strong> is nothing short of a masterpiece. After six years of anticipation, Team Cherry has delivered a sequel that not only meets the impossibly high expectations but surpasses them in almost every way.
                    </p>
                    
                    <h3 className="text-xl font-bold text-white mt-8 mb-4 flex items-center space-x-2">
                      <Swords className="w-5 h-5 text-red-400" />
                      <span>Combat & Gameplay</span>
                    </h3>
                    <p>
                      Playing as Hornet feels completely different from the Knight's journey in Hallownest. Her move set is more aggressive and acrobatic, with silk-based abilities that add layers of complexity to both combat and platforming. The game demands precision but rewards mastery with some of the most satisfying gameplay moments I've experienced in years.
                    </p>
                    
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4 my-6">
                      <p className="text-purple-200 italic">
                        "Every boss fight feels like a carefully choreographed dance of death. The difficulty is punishing but never unfair - each defeat teaches you something new."
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mt-8 mb-4 flex items-center space-x-2">
                      <Crown className="w-5 h-5 text-yellow-400" />
                      <span>World & Atmosphere</span>
                    </h3>
                    <p>
                      Pharloom is a stunning kingdom that feels both familiar and entirely fresh. From the mossy grottos to the shining citadel at the peak, every area is meticulously crafted with Team Cherry's signature hand-drawn art style. The orchestral score by Christopher Larkin elevates every moment, whether you're exploring peaceful chambers or facing down terrifying beasts.
                    </p>
                    
                    <h3 className="text-xl font-bold text-white mt-8 mb-4 flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-pink-400" />
                      <span>Why It's Worth Playing</span>
                    </h3>
                    <p>
                      This isn't just a game for Hollow Knight fans - it's a testament to what indie developers can achieve when given the time and support they need. In an industry obsessed with rushed releases and endless sequels, Silksong stands as a beacon of quality craftsmanship and artistic vision.
                    </p>
                    
                    <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
                      <h4 className="text-lg font-bold text-white mb-3">Final Thoughts</h4>
                      <p className="text-green-200">
                        Hollow Knight: Silksong is a rare sequel that justifies every day of its development time. It's challenging, beautiful, and emotionally resonant in ways that few games achieve. This is essential playing for anyone who loves expertly crafted games.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Game Info */}
                <div className="premium-card p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Game Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Developer:</span>
                      <p className="text-white font-medium">Team Cherry</p>
                    </div>
                    <div>
                      <span className="text-white/60">Release Date:</span>
                      <p className="text-white font-medium">September 8, 2025</p>
                    </div>
                    <div>
                      <span className="text-white/60">Platforms:</span>
                      <p className="text-white font-medium">PC, Switch, PS4/5, Xbox</p>
                    </div>
                    <div>
                      <span className="text-white/60">Price:</span>
                      <p className="text-white font-medium">$20 USD</p>
                    </div>
                    <div>
                      <span className="text-white/60">Genre:</span>
                      <p className="text-white font-medium">Metroidvania, Action</p>
                    </div>
                    <div>
                      <span className="text-white/60">Play Time:</span>
                      <p className="text-white font-medium">15-30 hours</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Rating Breakdown */}
                <div className="premium-card p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Rating Breakdown</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Gameplay', score: 10 },
                      { label: 'Graphics', score: 9.5 },
                      { label: 'Audio', score: 10 },
                      { label: 'Story', score: 9 },
                      { label: 'Replayability', score: 9.5 }
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/80">{item.label}</span>
                          <span className="text-white font-medium">{item.score}/10</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${item.score * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Pros & Cons */}
                <div className="premium-card p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Pros & Cons</h3>
                  
                  <div className="mb-4">
                    <h4 className="text-green-400 font-semibold mb-2">✓ Pros</h4>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li>• Incredible hand-drawn visuals</li>
                      <li>• Perfect combat system</li>
                      <li>• Outstanding soundtrack</li>
                      <li>• Challenging but fair difficulty</li>
                      <li>• Amazing value at $20</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-red-400 font-semibold mb-2">✗ Cons</h4>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li>• Very challenging for newcomers</li>
                      <li>• Some obscure progression points</li>
                      <li>• Can be frustrating at times</li>
                    </ul>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="premium-card p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-2xl font-bold gradient-text">200+</div>
                      <div className="text-xs text-white/60">Enemies</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-2xl font-bold gradient-text">15+</div>
                      <div className="text-xs text-white/60">Areas</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-2xl font-bold gradient-text">30+</div>
                      <div className="text-xs text-white/60">Bosses</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-2xl font-bold gradient-text">3</div>
                      <div className="text-xs text-white/60">Developers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Games Section */}
            <div className="mt-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4 gradient-text-neon">
                  Games Like Silksong
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  If you love Hollow Knight: Silksong, check out these amazing adventure and action games
                </p>
              </div>
              
              <div className="premium-card p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-white font-medium">Showing {relatedGames.length} similar games</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">View:</span>
                    <div className="flex bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                          viewMode === 'grid' 
                            ? 'bg-purple-600 text-white' 
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        Grid
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                          viewMode === 'list' 
                            ? 'bg-purple-600 text-white' 
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        List
                      </button>
                    </div>
                  </div>
                </div>

                <GameGrid 
                  games={relatedGames}
                  viewMode={viewMode}
                  onGameClick={handleGameClick}
                />
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}; 