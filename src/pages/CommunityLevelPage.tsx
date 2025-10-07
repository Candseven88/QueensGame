import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import { ArrowLeft, Users, Trophy, Star, Play } from 'lucide-react';

export const CommunityLevelPage: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();

  // 设置规范URL - 所有community-level页面都指向主游戏页面
  const canonicalUrl = 'https://queensgame.games/games/queensgame-mirror';
  
  // 根据level ID生成页面内容
  const getLevelInfo = (id: string) => {
    const levelNum = parseInt(id) || 1;
    return {
      title: `Queens Game Level ${levelNum} - Royal Challenge`,
      description: `Master Queens Game Level ${levelNum} in this challenging royal puzzle experience. Play Queens 225, Level 152, Level 53, Level 81 and more strategic puzzle levels. Free online gaming at QueensGame.`,
      keywords: `queens game level ${levelNum}, queens ${levelNum}, royal puzzle, chess puzzle, strategy game, level ${levelNum}, queens challenge`,
      levelNumber: levelNum
    };
  };

  const levelInfo = getLevelInfo(levelId || '1');

  useEffect(() => {
    // 自动重定向到主游戏页面，但保持SEO友好
    const timer = setTimeout(() => {
      navigate('/games/queensgame-mirror', { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      {/* SEO Head with canonical URL pointing to main game */}
      <SEOHead
        title={levelInfo.title}
        description={levelInfo.description}
        keywords={levelInfo.keywords}
        canonical={canonicalUrl}
        ogTitle={levelInfo.title}
        ogDescription={levelInfo.description}
        ogImage="/thumbnail/queens-game.jpg"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Header />
        
        <main className="pt-28 sm:pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Games</span>
            </button>

            {/* Level Info Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-purple-500/20 px-4 py-2 rounded-full mb-4">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-purple-300 font-semibold">LEVEL {levelInfo.levelNumber}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Queens Game Level {levelInfo.levelNumber}
                </h1>
                
                <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                  Challenge yourself with Queens Game Level {levelInfo.levelNumber}! Master strategic puzzle gameplay 
                  in this royal chess-inspired challenge. Perfect for puzzle enthusiasts seeking brain-teasing gameplay.
                </p>

                {/* Level Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-purple-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Users className="w-5 h-5 text-purple-300" />
                      <span className="text-purple-300 font-semibold">Players</span>
                    </div>
                    <div className="text-2xl font-bold text-white">10K+</div>
                  </div>
                  
                  <div className="bg-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-blue-300 font-semibold">Difficulty</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {levelInfo.levelNumber < 20 ? 'Easy' : 
                       levelInfo.levelNumber < 50 ? 'Medium' : 
                       levelInfo.levelNumber < 100 ? 'Hard' : 'Expert'}
                    </div>
                  </div>
                  
                  <div className="bg-green-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Trophy className="w-5 h-5 text-green-400" />
                      <span className="text-green-300 font-semibold">Completion</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {Math.max(95 - levelInfo.levelNumber, 20)}%
                    </div>
                  </div>
                </div>

                {/* Redirect Notice */}
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
                  <p className="text-yellow-200">
                    🎮 Redirecting to Queens Game 225 in 3 seconds...
                  </p>
                  <p className="text-yellow-300/80 text-sm mt-1">
                    All levels are available in the main game
                  </p>
                </div>

                {/* Play Button */}
                <button
                  onClick={() => navigate('/games/queensgame-mirror')}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Play className="w-6 h-6" />
                  <span>Play Queens Game Level {levelInfo.levelNumber} Now</span>
                </button>
              </div>
            </div>

            {/* Level Tips */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Level {levelInfo.levelNumber} Strategy Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                    <p className="text-white/90">Plan your queen placements carefully to avoid conflicts</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                    <p className="text-white/90">Use the process of elimination to narrow down possibilities</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                    <p className="text-white/90">Start with corners and edges for easier placement</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                    <p className="text-white/90">Take your time - there's no rush to complete the level</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};
