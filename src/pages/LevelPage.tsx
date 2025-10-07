import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import { ArrowLeft, Users, Trophy, Star, Play, Target } from 'lucide-react';

export const LevelPage: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();

  // 设置规范URL - 所有level页面都指向主游戏页面
  const canonicalUrl = 'https://queensgame.games/games/queensgame-mirror';
  
  // 根据level ID生成页面内容
  const getLevelInfo = (id: string) => {
    const levelNum = parseInt(id) || 1;
    return {
      title: `Queens Game Level ${levelNum} - Royal Puzzle Challenge`,
      description: `Play Queens Game Level ${levelNum} online free! Master this challenging royal puzzle level with strategic queen placement. Part of Queens 225 collection featuring Level 152, Level 53, Level 81 and more brain-teasing challenges.`,
      keywords: `queens game level ${levelNum}, queens level ${levelNum}, royal puzzle level ${levelNum}, chess puzzle, strategy game, queens challenge, level ${levelNum} solution`,
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
                  <Target className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-300 font-semibold">LEVEL {levelInfo.levelNumber}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Queens Level {levelInfo.levelNumber}
                </h1>
                
                <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                  Master Queens Level {levelInfo.levelNumber} in this strategic puzzle challenge! 
                  Place queens on the board without conflicts in this classic royal chess puzzle. 
                  Perfect for puzzle enthusiasts and strategy game lovers.
                </p>

                {/* Level Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-purple-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Users className="w-5 h-5 text-purple-300" />
                      <span className="text-purple-300 font-semibold">Players</span>
                    </div>
                    <div className="text-2xl font-bold text-white">5K+</div>
                    <div className="text-purple-300/80 text-sm">Completed</div>
                  </div>
                  
                  <div className="bg-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-blue-300 font-semibold">Difficulty</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {levelInfo.levelNumber < 10 ? 'Easy' : 
                       levelInfo.levelNumber < 20 ? 'Medium' : 
                       levelInfo.levelNumber < 50 ? 'Hard' : 'Expert'}
                    </div>
                    <div className="text-blue-300/80 text-sm">Challenge</div>
                  </div>
                  
                  <div className="bg-green-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Trophy className="w-5 h-5 text-green-400" />
                      <span className="text-green-300 font-semibold">Success Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {Math.max(90 - levelInfo.levelNumber, 25)}%
                    </div>
                    <div className="text-green-300/80 text-sm">Average</div>
                  </div>
                </div>

                {/* Redirect Notice */}
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
                  <p className="text-yellow-200">
                    🎮 Redirecting to Queens Game 225 in 3 seconds...
                  </p>
                  <p className="text-yellow-300/80 text-sm mt-1">
                    Level {levelInfo.levelNumber} is available in the main game
                  </p>
                </div>

                {/* Play Button */}
                <button
                  onClick={() => navigate('/games/queensgame-mirror')}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Play className="w-6 h-6" />
                  <span>Play Level {levelInfo.levelNumber} Now</span>
                </button>
              </div>
            </div>

            {/* Level Strategy Guide */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Level {levelInfo.levelNumber} Strategy Guide</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-300">Basic Rules</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                      <p className="text-white/90">Place {levelInfo.levelNumber} queens on the board</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                      <p className="text-white/90">No two queens can attack each other</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                      <p className="text-white/90">Queens attack horizontally, vertically, and diagonally</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-300">Pro Tips</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">💡</div>
                      <p className="text-white/90">Start with corner positions for easier placement</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">⚡</div>
                      <p className="text-white/90">Use backtracking when you get stuck</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">🎯</div>
                      <p className="text-white/90">Visualize attack patterns before placing</p>
                    </div>
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
