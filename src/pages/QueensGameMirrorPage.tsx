import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import { ArrowLeft, ExternalLink, Maximize2, RotateCcw, AlertCircle } from 'lucide-react';

export const QueensGameMirrorPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const gameUrl = "https://queensgame.vercel.app/";
  const gameTitle = "Queens Game 225 - Ultimate Royal Gaming Portal";

  useEffect(() => {
    // 页面加载完成后设置loading状态
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const reloadGame = () => {
    setIsLoading(true);
    setHasError(false);
    // 强制重新加载iframe
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  const openInNewTab = () => {
    window.open(gameUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SEOHead
        title="Queens Game 225 - Ultimate Royal Gaming Portal | Play Free Online Games"
        description="Play Queens Game 225 and explore premium royal gaming collection. Access queens level 152, queens level 53, queens level 81 and more challenging puzzle games. Free online gaming portal with 80+ queens games and royal adventures."
        keywords="queens 225, queens level 152, queens level 53, queens level 81, 80 queens, queens level 11, queens level 12, queens level 40, color cannon level 39, queens game, royal games, puzzle games, online games, free games"
        canonicalUrl="/games/queensgame-mirror"
      />
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": "Queens Game 225 - Ultimate Royal Gaming Portal",
            "description": "Play Queens Game 225 and master challenging royal puzzle levels! Experience Queens Level 152, Queens Level 53, Queens Level 81, and 80+ queens games.",
            "url": "https://queensgame.vercel.app/games/queensgame-mirror",
            "image": "https://queensgame.vercel.app/thumbnail/How To Get SILKSONG For FREE.jpg",
            "genre": ["Puzzle", "Strategy", "Brain Games", "Logic Games"],
            "gamePlatform": ["Web Browser", "Mobile", "Desktop"],
            "operatingSystem": ["Any"],
            "applicationCategory": "Game",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "25000",
              "bestRating": "5",
              "worstRating": "1"
            },
            "author": {
              "@type": "Organization",
              "name": "Royal Queens Gaming"
            },
            "publisher": {
              "@type": "Organization", 
              "name": "QueensGame Portal"
            },
            "datePublished": "2025-10-03",
            "inLanguage": "en",
            "isAccessibleForFree": true,
            "keywords": "queens 225, queens level 152, queens level 53, queens level 81, 80 queens, puzzle games, royal games, brain games, logic puzzles, free online games"
          })
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Header />
        
        <main className="pt-20">
          {/* Game Header */}
          <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                  </button>
                  <div>
                    <h1 className="text-xl font-bold text-white">{gameTitle}</h1>
                    <p className="text-sm text-white/60">Play Queens Level 225, 152, 53, 81 & More Royal Puzzle Games</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={reloadGame}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    title="Reload Game"
                  >
                    <RotateCcw className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={openInNewTab}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    title="Open in New Tab"
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => {
                      const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
                      if (iframe) {
                        iframe.requestFullscreen?.();
                      }
                    }}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Game Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="relative bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-white text-lg">Loading Gaming Portal...</p>
                    <p className="text-white/60 text-sm mt-2">Preparing your premium gaming experience</p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {hasError && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Unable to Load Game</h3>
                    <p className="text-gray-400 mb-6">
                      The gaming portal couldn't be loaded. Please try again.
                    </p>
                    <div className="space-x-4">
                      <button
                        onClick={reloadGame}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Retry
                      </button>
                      <button
                        onClick={openInNewTab}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Open in New Tab
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Game Iframe */}
              <iframe
                id="game-iframe"
                src={gameUrl}
                title={gameTitle}
                className="w-full h-[80vh] border-0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                style={{ minHeight: '600px' }}
              />
            </div>

            {/* Game Info - SEO Optimized Content */}
            <div className="mt-6 bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">About Queens Game 225 - Royal Gaming Collection</h2>
              
              {/* SEO-rich content section */}
              <div className="mb-6">
                <p className="text-white/90 mb-4">
                  Welcome to <strong>Queens Game 225</strong>, the ultimate destination for royal puzzle gaming! 
                  Experience challenging levels including <em>Queens Level 152</em>, <em>Queens Level 53</em>, 
                  <em>Queens Level 81</em>, and many more exciting puzzle adventures.
                </p>
                <p className="text-white/80 mb-4">
                  Our collection features over <strong>80 Queens games</strong> with varying difficulty levels. 
                  Master strategic gameplay in <em>Queens Level 11</em>, <em>Queens Level 12</em>, and 
                  <em>Queens Level 40</em>. Challenge yourself with special levels like <em>Color Cannon Level 39</em>.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Popular Queens Levels</h3>
                  <ul className="text-white/80 space-y-1">
                    <li>• <strong>Queens 225</strong> - Ultimate challenge level</li>
                    <li>• <strong>Queens Level 152</strong> - Advanced strategic gameplay</li>
                    <li>• <strong>Queens Level 53</strong> - Mid-tier puzzle solving</li>
                    <li>• <strong>Queens Level 81</strong> - Complex royal challenges</li>
                    <li>• <strong>80 Queens</strong> - Classic puzzle collection</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Game Features</h3>
                  <ul className="text-white/80 space-y-1">
                    <li>• Free online queens puzzle games</li>
                    <li>• Progressive difficulty levels (11, 12, 40, 53, 81, 152, 225)</li>
                    <li>• Royal-themed gaming experience</li>
                    <li>• Color cannon special levels</li>
                    <li>• Mobile-friendly responsive design</li>
                  </ul>
                </div>
              </div>

              {/* Additional SEO content */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-md font-semibold text-white mb-2">Why Play Queens Games?</h4>
                <p className="text-white/80 text-sm">
                  Queens games offer the perfect blend of strategy and puzzle-solving. Whether you're tackling 
                  <strong>Queens Level 152</strong> or starting with <strong>Queens Level 11</strong>, each level 
                  provides unique challenges that test your logical thinking and strategic planning skills.
                </p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};
