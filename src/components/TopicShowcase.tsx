import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleGameCard } from './ui/SimpleGameCard';
import { PremiumButton } from './ui/PremiumButton';
import { allGames } from '../data/gameData';
import { topicPages, getGamesForTopic } from '../data/topicPages';
import { Game } from '../types/Game';
import { ChevronRight, Flame, Star, Trophy, Users, Calendar, Diamond, TrendingUp, ExternalLink, Car } from 'lucide-react';

interface TopicShowcaseProps {
  onGameClick: (game: Game) => void;
}

export const TopicShowcase: React.FC<TopicShowcaseProps> = ({ onGameClick }) => {
  const navigate = useNavigate();

  // Get featured topics to display on homepage
  const featuredTopics = topicPages
    .filter(topic => ['trending', 'editors-picks', 'best-games', 'most-played'].includes(topic.id))
    .sort((a, b) => a.priority - b.priority);

  const getTopicIcon = (iconString: string) => {
    switch (iconString) {
      case '🔥': return <Flame className="w-5 h-5" />;
      case '⭐': return <Star className="w-5 h-5" />;
      case '🏆': return <Trophy className="w-5 h-5" />;
      case '👥': return <Users className="w-5 h-5" />;
      case '📅': return <Calendar className="w-5 h-5" />;
      case '💎': return <Diamond className="w-5 h-5" />;
      case '⚡': return <TrendingUp className="w-5 h-5" />;
      default: return <span className="text-lg">{iconString}</span>;
    }
  };

  return (
    <div className="space-y-16">
      {/* HOT TOPIC - Special Featured Pages */}
      <section className="space-y-6">
        <div className="text-center premium-card p-6">
          <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3">
            🔥 HOT TOPIC
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Explore our most popular featured gaming experiences
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Rabbit Road Card */}
          <div className="premium-card p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
               onClick={() => navigate('/rabbit-road')}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg">
                <span className="text-2xl">🐰</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">Rabbit Road</h3>
                <p className="text-white/70 text-sm">Expert-verified arcade adventure</p>
              </div>
              <ExternalLink className="w-5 h-5 text-white/60" />
            </div>
            <div className="space-y-3">
              <p className="text-white/80 text-sm">
                Join 250K+ players worldwide in the ultimate rabbit adventure! Expert-tested, family-friendly arcade experience.
              </p>
              <div className="flex items-center justify-between text-xs text-white/60">
                <div className="flex items-center space-x-4">
                  <span>⭐ 4.8/5 Rating</span>
                  <span>👥 250K+ Players</span>
                </div>
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Expert Verified</span>
              </div>
            </div>
          </div>

          {/* Drift Boss Card */}
          <div className="premium-card p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
               onClick={() => navigate('/drift-boss')}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg">
                <Car className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">Drift Boss</h3>
                <p className="text-white/70 text-sm">Master the art of drifting</p>
              </div>
              <ExternalLink className="w-5 h-5 text-white/60" />
            </div>
            <div className="space-y-3">
              <p className="text-white/80 text-sm">
                Navigate tricky corners, collect coins, and unlock new cars in this addictive one-click driving game.
              </p>
              <div className="flex items-center justify-between text-xs text-white/60">
                <div className="flex items-center space-x-4">
                  <span>🏎️ Racing</span>
                  <span>🎮 One-Click</span>
                </div>
                <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">Viral Game</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featuredTopics.map((topic) => {
        const topicGames = getGamesForTopic(topic.slug, allGames)
          .sort((a, b) => {
            // Sort by rating and plays for better showcasing
            const scoreA = (a.rating || 0) * 0.6 + (a.plays || 0) / 100000 * 0.4;
            const scoreB = (b.rating || 0) * 0.6 + (b.plays || 0) / 100000 * 0.4;
            return scoreB - scoreA;
          })
          .slice(0, 8); // Show only top 8 games per topic

        if (topicGames.length === 0) return null;

        return (
          <section key={topic.id} className="space-y-6">
            {/* Topic Header */}
            <div className="flex items-center justify-between premium-card p-6">
              <div className="flex items-center space-x-6">
                <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${topic.gradient} text-white shadow-xl`}>
                  {getTopicIcon(topic.icon)}
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {topic.title}
                  </h2>
                  <p className="text-white/80 text-lg max-w-lg">
                    {topic.description}
                  </p>
                </div>
              </div>
              
              <PremiumButton
                variant="aurora"
                effect="shimmer"
                icon={ChevronRight}
                iconPosition="right"
                onClick={() => navigate(`/topic/${topic.slug}`)}
                className="shadow-xl"
              >
                View All
              </PremiumButton>
            </div>

                        {/* Games Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {topicGames.map((game) => (
                <SimpleGameCard
                  key={game.id}
                  game={game}
                  onClick={onGameClick}
                />
              ))}
            </div>

            {/* Enhanced Quick Stats */}
            <div className="flex items-center justify-center space-x-8 text-white/60 premium-card p-4 rounded-2xl">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>{getGamesForTopic(topic.slug, allGames).length} total games</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Updated daily</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-green-400" />
                <span>Free to play</span>
              </div>
            </div>
          </section>
        );
      })}
      
      {/* All Categories Quick Access */}
      <section className="space-y-6">
        <div className="text-center premium-card p-6">
          <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3">
            Explore All Categories
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Discover games organized by themes, seasons, and special collections
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {topicPages.slice(0, 12).map((topic) => {
            const gameCount = getGamesForTopic(topic.slug, allGames).length;
            
            return (
              <div
                key={topic.id}
                className="group cursor-pointer transition-transform duration-200 hover:scale-105"
                onClick={() => navigate(`/topic/${topic.slug}`)}
              >
                <div className={`
                  relative overflow-hidden rounded-xl p-4 text-white 
                  bg-gradient-to-br ${topic.gradient} 
                  shadow-lg hover:shadow-xl transition-all duration-200
                `}>
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="text-2xl mb-2">{topic.icon}</div>
                    <div className="text-sm font-bold mb-1">{topic.title}</div>
                    <div className="text-xs text-white/80">{gameCount} games</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}; 