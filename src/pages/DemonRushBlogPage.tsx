import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackgroundPattern, DarkBackgroundPattern } from '../components/BackgroundPattern';
import { SEOHead } from '../components/SEOHead';
import { 
  Calendar,
  Clock,
  User,
  ExternalLink,
  Gamepad2,
  Users,
  Zap,
  Shield,
  Sword,
  Star,
  Target,
  TrendingUp,
  ArrowRight,
  PlayCircle
} from 'lucide-react';

export const DemonRushBlogPage: React.FC = () => {
  const navigate = useNavigate();

  // Track page view for analytics
  useEffect(() => {
    // Analytics tracking code would go here
    document.title = "Demon Rush: The Ultimate K-Pop Demon Hunters Experience in Fortnite | QueensGame Blog";
  }, []);

  const handleOfficialGameClick = () => {
    window.open('https://www.fortnite.com/@epic/demon-rush?lang=en-US', '_blank');
  };

  const handleBackToGames = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundPattern className="light:block dark:hidden" />
      <DarkBackgroundPattern className="light:hidden dark:block" />
      
      {/* SEO Head */}
      <SEOHead 
        title="Demon Rush: The Ultimate K-Pop Demon Hunters Experience in Fortnite"
        description="Discover everything about Demon Rush, Fortnite's exciting limited-time mode inspired by K-Pop Demon Hunters. Learn gameplay mechanics, mythic items, character recruitment, and winning strategies."
        keywords="demon rush, fortnite demon rush, k-pop demon hunters, fortnite limited time mode, demon rush gameplay, fortnite mythic items, rumi sword, mira ramen, zoey shield, tiger mask"
        canonical="/blog/demon-rush-fortnite-guide"
      />
      
      <div className="relative z-10">
        <Header />
        
        <main className="pt-28 sm:pt-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <button
                onClick={handleBackToGames}
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Home
              </button>
              <span>/</span>
              <span>Blog</span>
              <span>/</span>
              <span className="text-gray-900 dark:text-white font-medium">Demon Rush Guide</span>
            </nav>

            {/* Article Header */}
            <article className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
              
              {/* Hero Section */}
              <div className="relative h-64 md:h-80 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text-neon">
                      Demon Rush
                    </h1>
                    <p className="text-xl md:text-2xl font-medium opacity-90">
                      K-Pop Meets Epic Battle Royale
                    </p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                  <span className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Limited Time Event</span>
                  </span>
                </div>
              </div>

              {/* Article Meta */}
              <div className="p-6 border-b border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-6 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>QueensGame Editorial Team</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>8 min read</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>October 2025</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleOfficialGameClick}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Play Now</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6 md:p-8">
                
                {/* Introduction */}
                <div className="prose prose-lg max-w-none text-gray-300 mb-8">
                  <p className="text-xl leading-relaxed mb-6 text-white/90">
                    Picture this: you're dropping into a Fortnite match, but instead of the usual Victory Royale hunt, 
                    you're facing waves of supernatural demons while wielding mythical K-Pop inspired weapons. 
                    Welcome to <strong className="text-purple-400">Demon Rush</strong> – where East meets West in the most 
                    unexpected gaming crossover of 2025.
                  </p>
                  
                  <p className="mb-6">
                    This isn't your typical Fortnite experience. Epic Games has crafted something entirely fresh, 
                    drawing inspiration from the animated sensation "K-Pop Demon Hunters" to create a limited-time mode 
                    that's got the gaming community buzzing. But what makes Demon Rush so special? Let's dive deep.
                  </p>
                </div>

                {/* What Makes Demon Rush Different */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
                    <Zap className="w-8 h-8 text-yellow-400" />
                    <span>What Sets Demon Rush Apart</span>
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/5 rounded-lg p-6 border border-purple-400/20">
                      <div className="flex items-center space-x-3 mb-4">
                        <Users className="w-6 h-6 text-blue-400" />
                        <h3 className="text-xl font-semibold text-white">Squad-Based Survival</h3>
                      </div>
                      <p className="text-gray-300">
                        Team up with up to three friends or go solo against relentless demon waves. 
                        Each teammate brings unique strategies to the battlefield.
                      </p>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-6 border border-red-400/20">
                      <div className="flex items-center space-x-3 mb-4">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                        <h3 className="text-xl font-semibold text-white">Progressive Upgrades</h3>
                      </div>
                      <p className="text-gray-300">
                        Collect "Monster Parts" from defeated demons to upgrade weapons and purchase 
                        game-changing equipment between rounds.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-400/30">
                    <p className="text-lg text-white/90 italic">
                      "The beauty of Demon Rush lies in its perfect balance of familiar Fortnite mechanics 
                      with completely fresh gameplay elements that keep you coming back for more."
                    </p>
                  </div>
                </section>

                {/* Mythic Items Breakdown */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
                    <Star className="w-8 h-8 text-yellow-400" />
                    <span>The Legendary Arsenal</span>
                  </h2>
                  
                  <p className="text-gray-300 mb-8 text-lg">
                    Four mythic items inspired by K-Pop Demon Hunters characters transform how you approach combat. 
                    Each item isn't just a weapon – it's a game-changer with unique tactical applications.
                  </p>
                  
                  <div className="grid gap-6 mb-8">
                    <div className="bg-white/5 rounded-lg p-6 border-l-4 border-red-400">
                      <div className="flex items-start space-x-4">
                        <div className="bg-red-500/20 rounded-full p-3">
                          <Sword className="w-6 h-6 text-red-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">Rumi's Enhanced Sword</h3>
                          <p className="text-gray-300 mb-3">
                            This isn't just any melee weapon. Rumi's sword delivers devastating close-range damage 
                            with special combo attacks that can clear multiple demons in a single strike.
                          </p>
                          <div className="text-sm text-red-400 font-medium">
                            Pro Tip: Perfect for crowd control when demons swarm your position
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-6 border-l-4 border-orange-400">
                      <div className="flex items-start space-x-4">
                        <div className="bg-orange-500/20 rounded-full p-3">
                          <Zap className="w-6 h-6 text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">Mira's Super Spicy Ramen</h3>
                          <p className="text-gray-300 mb-3">
                            More than just health recovery – this consumable provides temporary damage buffs 
                            and faster movement speed, making it crucial for intense demon encounters.
                          </p>
                          <div className="text-sm text-orange-400 font-medium">
                            Pro Tip: Save for boss rounds when you need that extra edge
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-6 border-l-4 border-blue-400">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-500/20 rounded-full p-3">
                          <Shield className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">Zoey's Golden Bubble Shield</h3>
                          <p className="text-gray-300 mb-3">
                            Creates a protective barrier that absorbs incoming damage while allowing you to 
                            fire outward. Essential for surviving overwhelming demon rushes.
                          </p>
                          <div className="text-sm text-blue-400 font-medium">
                            Pro Tip: Deploy strategically to revive teammates safely
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-6 border-l-4 border-purple-400">
                      <div className="flex items-start space-x-4">
                        <div className="bg-purple-500/20 rounded-full p-3">
                          <Target className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">Tiger's Teleport Mask</h3>
                          <p className="text-gray-300 mb-3">
                            Instant short-range teleportation that's perfect for escaping dangerous situations 
                            or repositioning for surprise attacks on demon clusters.
                          </p>
                          <div className="text-sm text-purple-400 font-medium">
                            Pro Tip: Master the timing to dodge powerful demon abilities
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Character Recruitment Strategy */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
                    <Users className="w-8 h-8 text-green-400" />
                    <span>Building Your Dream Team</span>
                  </h2>
                  
                  <div className="bg-white/5 rounded-lg p-6 mb-6">
                    <p className="text-gray-300 text-lg mb-4">
                      Here's where Demon Rush gets really interesting. You can recruit Rumi, Mira, or Zoey as AI companions, 
                      but here's the catch – you only get one free recruitment per player. Choose wisely.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-red-500/10 rounded-lg p-4 border border-red-400/30">
                        <h4 className="font-semibold text-white mb-2">Rumi</h4>
                        <p className="text-sm text-gray-300">Aggressive melee fighter, perfect for frontline assault</p>
                      </div>
                      <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-400/30">
                        <h4 className="font-semibold text-white mb-2">Mira</h4>
                        <p className="text-sm text-gray-300">Support specialist with healing and buff abilities</p>
                      </div>
                      <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-400/30">
                        <h4 className="font-semibold text-white mb-2">Zoey</h4>
                        <p className="text-sm text-gray-300">Defensive expert, excels at area control</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Winning Strategies */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
                    <Target className="w-8 h-8 text-purple-400" />
                    <span>Master-Level Strategies</span>
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-6 border border-green-400/30">
                      <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                        <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                        <span>Economy Management</span>
                      </h3>
                      <p className="text-gray-300">
                        Don't spend all your Monster Parts immediately. Save some for crucial upgrades in later rounds 
                        when demons become significantly more powerful. The vending machines offer better deals as you progress.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-400/30">
                      <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                        <span>Positioning is Everything</span>
                      </h3>
                      <p className="text-gray-300">
                        Unlike regular Fortnite, you can't just build your way out of trouble. Learn the map layouts, 
                        identify chokepoints, and always have an escape route planned. High ground advantage still matters.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-400/30">
                      <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                        <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                        <span>Team Synergy</span>
                      </h3>
                      <p className="text-gray-300">
                        Coordinate your mythic item choices with teammates. Having one player focus on crowd control 
                        while another handles healing creates powerful synergistic effects that trivialize difficult encounters.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Why This Matters */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-white mb-6">The Cultural Impact</h2>
                  
                  <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl p-8 border border-pink-400/30">
                    <p className="text-lg text-gray-300 mb-4">
                      Demon Rush represents more than just another Fortnite mode. It's Epic Games' bold experiment 
                      in cross-cultural gaming, bringing K-Pop aesthetics and storytelling into the Western gaming mainstream.
                    </p>
                    
                    <p className="text-gray-300 mb-6">
                      The success of this collaboration could pave the way for more diverse cultural representations 
                      in major gaming titles, breaking down barriers between Eastern and Western entertainment industries.
                    </p>
                    
                    <div className="flex items-center justify-center">
                      <button
                        onClick={handleOfficialGameClick}
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3"
                      >
                        <Gamepad2 className="w-6 h-6" />
                        <span>Experience Demon Rush</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </section>

                {/* Final Thoughts */}
                <section className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6">The Verdict</h2>
                  
                  <div className="bg-white/5 rounded-lg p-6">
                    <p className="text-lg text-gray-300 mb-4">
                      Demon Rush isn't just a limited-time mode – it's a glimpse into the future of culturally diverse gaming. 
                      Whether you're a Fortnite veteran or a newcomer drawn by the K-Pop connection, this mode offers 
                      something genuinely fresh in the battle royale space.
                    </p>
                    
                    <p className="text-gray-300">
                      The clock is ticking on this limited-time experience. Don't let FOMO win – jump in and discover 
                      why the gaming community can't stop talking about demons, K-Pop, and the most unexpected 
                      collaboration of the year.
                    </p>
                  </div>
                </section>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Join the Rush?</h3>
                  <p className="text-white/90 mb-6">
                    Experience the K-Pop demon hunting adventure that's taking Fortnite by storm
                  </p>
                  <button
                    onClick={handleOfficialGameClick}
                    className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Play Demon Rush Now</span>
                  </button>
                </div>
              </div>
            </article>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};
