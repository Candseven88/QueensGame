import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { GameDetailPage } from "./pages/GameDetailPage";
import { TopicPage } from "./pages/TopicPage";
import { TopicShowcase } from "./components/TopicShowcase";
import { SilksongPromo } from "./components/SilksongPromo";
import { SilentSaltPromo } from "./components/SilentSaltPromo";
import { GameFilters } from "./components/filters/GameFilters";
import { GameGrid } from "./components/filters/GameGrid";
import { GamingBackground } from "./components/ui/EnhancedBackground";
import { RouteTransition } from "./components/animations/PageTransition";
import { PremiumButton } from "./components/ui/PremiumButton";
import { SilksongPage } from "./pages/SilksongPage";
import { DriftBossPage } from "./pages/DriftBossPage";
import { RabbitRoadPage } from "./pages/RabbitRoadPage";
import { BloodmoneyPage } from "./pages/BloodmoneyPage";
import { LoveMoneyPage } from "./pages/LoveMoneyPage";
import { YugiohGenesysPage } from "./pages/YugiohGenesysPage";
import { PalworldPage } from "./pages/PalworldPage";
import { FlamyDashPage } from "./pages/FlamyDashPage";
import { SubwayMotoPage } from "./pages/SubwayMotoPage";
import { KirkaPage } from "./pages/KirkaPage";
import { SilksongFreePage } from "./pages/SilksongFreePage";
import { RaceSurvivalPage } from "./pages/RaceSurvivalPage";
import { QueensGameMirrorPage } from "./pages/QueensGameMirrorPage";
import { CommunityLevelPage } from "./pages/CommunityLevelPage";
import { LevelPage } from "./pages/LevelPage";
import { PixelExilePage } from "./pages/PixelExilePage";
import { DemonRushBlogPage } from "./pages/DemonRushBlogPage";
import { allGames } from "./data/gameData";
import { Game } from "./types/Game";
import { trackPageView, trackGameView } from "./utils/analytics";
import './styles/design-system.css';

function App() {
  const [showAllGames, setShowAllGames] = useState(false);
  const [filteredGames, setFilteredGames] = useState<Game[]>(allGames);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleGameClick = (game: Game) => {
    trackGameView(game);
    const gameId = game.url.split("/").pop();
    window.location.href = `/games/${gameId}`;
  };

  const handleFilteredGames = (games: Game[]) => {
    setFilteredGames(games);
  };

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
  };

  return (
    <Router>
      <div className="min-h-screen relative">
        {/* Enhanced Gaming Background */}
        <GamingBackground interactive={true} />
        
        <div className="relative z-10">
          <RouteTransition>
            <Routes>
              <Route path="/games/:gameId" element={<GameDetailPage />} />
              <Route path="/topic/:topicSlug" element={<TopicPage />} />
              <Route path="/community-level/:levelId" element={<CommunityLevelPage />} />
              <Route path="/level/:levelId" element={<LevelPage />} />
              <Route path="/hollow-knight-silksong" element={<SilksongPage />} />
              <Route path="/drift-boss" element={<DriftBossPage />} />
              <Route path="/rabbit-road" element={<RabbitRoadPage />} />
              <Route path="/games/human-expenditure-program-bloodmoney-2" element={<BloodmoneyPage />} />
              <Route path="/games/lovemoney-game" element={<LoveMoneyPage />} />
              <Route path="/games/flamy-dash" element={<FlamyDashPage />} />
              <Route path="/games/subway-moto" element={<SubwayMotoPage />} />
              <Route path="/games/kirka" element={<KirkaPage />} />
              <Route path="/games/silksong-free" element={<SilksongFreePage />} />
              <Route path="/games/race-survival-arena-king" element={<RaceSurvivalPage />} />
              <Route path="/games/queensgame-mirror" element={<QueensGameMirrorPage />} />
              <Route path="/games/pixel-exile" element={<PixelExilePage />} />
              <Route path="/blog/demon-rush-fortnite-guide" element={<DemonRushBlogPage />} />
              <Route path="/yugioh-genesys" element={<YugiohGenesysPage />} />
              <Route path="/palworld" element={<PalworldPage />} />
              
              {/* 所有游戏页面路由 */}
              <Route path="/games" element={
                <>
                  <Header />
                  <main className="pt-28 sm:pt-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 gradient-text-neon">
                          All Games
                        </h1>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto">
                          Browse our complete collection of {allGames.length} premium games
                        </p>
                      </div>
                      
                      {/* 游戏过滤器和网格 */}
                      <div className="premium-card p-6 mb-8">
                        <GameFilters 
                          games={allGames} 
                          onFilteredGames={handleFilteredGames}
                          viewMode={viewMode}
                          onViewModeChange={handleViewModeChange}
                        />
                      </div>

                      <GameGrid 
                        games={filteredGames}
                        viewMode={viewMode}
                        onGameClick={handleGameClick}
                      />

                      {/* 统计信息 */}
                      <div className="text-center mt-12 pb-8">
                        <div className="premium-card p-4 max-w-md mx-auto">
                          <p className="text-white">
                            Total Games: <span className="gradient-text font-bold">{allGames.length}</span>
                            {filteredGames.length !== allGames.length && (
                              <>
                                {" "}• Showing: <span className="gradient-text font-bold">{filteredGames.length}</span>
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </main>
                  <Footer />
                </>
              } />
              
              <Route path="/" element={
                <>
                  <Header />
                  <main className="pt-28 sm:pt-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      {/* Welcome Section */}
                      <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg gradient-text-neon">
                          Welcome to QueensGame
                        </h1>
                        <p className="text-lg md:text-xl text-white max-w-3xl mx-auto drop-shadow-md mb-8">
                          Discover our premium collection of royal gaming experiences. Play the best HTML5 games online for free!
                        </p>
                        
                        {/* Quick Action Buttons */}
                        <div className="flex items-center justify-center space-x-6 mb-8">
                          <PremiumButton
                            variant={showAllGames ? "secondary" : "neon"}
                            effect="glow"
                            size="lg"
                            onClick={() => setShowAllGames(!showAllGames)}
                            className="shadow-2xl"
                          >
                            {showAllGames ? 'Show Featured' : 'Browse All Games'}
                          </PremiumButton>
                        </div>

                        {/* Featured Queens Game 225 Promotion */}
                        <div className="premium-card p-8 mb-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-2 border-purple-400/30">
                          <div className="text-center">
                            <div className="inline-flex items-center space-x-2 bg-purple-500/20 px-4 py-2 rounded-full mb-4">
                              <span className="text-purple-300 font-semibold">🏆 TRENDING NOW</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold gradient-text-neon mb-4">
                              Queens Game 225 - Ultimate Royal Challenge
                            </h2>
                            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-6">
                              Master the ultimate royal puzzle experience! Play <strong>Queens Level 152</strong>, <strong>Queens Level 53</strong>, 
                              <strong>Queens Level 81</strong> and 80+ challenging puzzle levels. From beginner-friendly <em>Queens Level 11</em> 
                              to the ultimate <em>Queens 225</em> challenge.
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                              <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm">Queens 225</span>
                              <span className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-sm">Level 152</span>
                              <span className="bg-green-500/30 text-green-200 px-3 py-1 rounded-full text-sm">Level 53</span>
                              <span className="bg-yellow-500/30 text-yellow-200 px-3 py-1 rounded-full text-sm">Level 81</span>
                              <span className="bg-red-500/30 text-red-200 px-3 py-1 rounded-full text-sm">80 Queens</span>
                              <span className="bg-pink-500/30 text-pink-200 px-3 py-1 rounded-full text-sm">Color Cannon 39</span>
                            </div>
                            <PremiumButton
                              variant="neon"
                              effect="glow"
                              size="lg"
                              onClick={() => handleGameClick(allGames.find(g => g.id === 'queensgame-mirror')!)}
                              className="shadow-2xl"
                            >
                              🎮 Play Queens Game 225 Now
                            </PremiumButton>
                          </div>
                        </div>
                      </div>

                      {/* Conditional Content */}
                      {showAllGames ? (
                        <div>
                          {/* Full Game Browser with Filters */}
                          <div className="premium-card p-6 mb-8">
                            <GameFilters 
                              games={allGames} 
                              onFilteredGames={handleFilteredGames}
                              viewMode={viewMode}
                              onViewModeChange={handleViewModeChange}
                            />
                          </div>

                          <GameGrid 
                            games={filteredGames}
                            viewMode={viewMode}
                            onGameClick={handleGameClick}
                          />

                          {/* Statistics */}
                          <div className="text-center mt-12 pb-8">
                            <div className="premium-card p-4 max-w-md mx-auto">
                              <p className="text-white">
                                Total Games: <span className="gradient-text font-bold">{allGames.length}</span>
                                {filteredGames.length !== allGames.length && (
                                  <>
                                    {" "}• Showing: <span className="gradient-text font-bold">{filteredGames.length}</span>
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Featured Topic Showcase */}
                          <TopicShowcase onGameClick={handleGameClick} />
                          
                          {/* Simple Stats */}
                          <div className="text-center mt-12 pb-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                              <div className="premium-card p-4">
                                <div className="text-2xl font-bold gradient-text mb-1">{allGames.length}+</div>
                                <div className="text-white/80 text-sm">Total Games</div>
                              </div>
                              <div className="premium-card p-4">
                                <div className="text-2xl font-bold gradient-text mb-1">12</div>
                                <div className="text-white/80 text-sm">Categories</div>
                              </div>
                              <div className="premium-card p-4">
                                <div className="text-2xl font-bold gradient-text mb-1">100%</div>
                                <div className="text-white/80 text-sm">Free to Play</div>
                              </div>
                              <div className="premium-card p-4">
                                <div className="text-2xl font-bold gradient-text mb-1">Daily</div>
                                <div className="text-white/80 text-sm">Updates</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Silent Salt Featured Partner Promo */}
                          <SilentSaltPromo />
                          
                          {/* Silksong Hot Topic Promo - 放在页面底部 */}
                          <SilksongPromo />
                        </>
                      )}
                    </div>
                  </main>
                  <Footer />
                </>
              } />
            </Routes>
          </RouteTransition>
        </div>
      </div>
    </Router>
  );
}

export default App;
