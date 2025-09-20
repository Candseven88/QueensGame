import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackgroundPattern, DarkBackgroundPattern } from '../components/BackgroundPattern';
import { GameGrid } from '../components/filters/GameGrid';
import { allGames } from '../data/gameData';
import { getTopicBySlug, getGamesForTopic } from '../data/topicPages';
import { Game } from '../types/Game';
import { ArrowLeft, TrendingUp, Calendar, Star, Trophy, Flame, Users, Diamond } from 'lucide-react';

export const TopicPage: React.FC = () => {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const navigate = useNavigate();
  const [topicGames, setTopicGames] = useState<Game[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'rating' | 'plays' | 'name'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const topic = topicSlug ? getTopicBySlug(topicSlug) : null;

  useEffect(() => {
    if (topic) {
      // Set page title and meta description
      document.title = topic.seoTitle;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', topic.seoDescription);
      
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
      
      setMetaTag('og:title', topic.seoTitle);
      setMetaTag('og:description', topic.seoDescription);
      setMetaTag('og:type', 'website');
      setMetaTag('og:url', window.location.href);
      
      // Add structured data for the topic page
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": topic.title,
        "description": topic.description,
        "url": window.location.href,
        "mainEntity": {
          "@type": "ItemList",
          "name": topic.title,
          "numberOfItems": getGamesForTopic(topicSlug!, allGames).length
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": window.location.origin
            },
            {
              "@type": "ListItem", 
              "position": 2,
              "name": topic.title,
              "item": window.location.href
            }
          ]
        }
      };
      
      // Remove old structured data
      const oldScript = document.querySelector('script[type="application/ld+json"][data-topic]');
      if (oldScript) {
        oldScript.remove();
      }
      
      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-topic', 'true');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
      
      // Get games for this topic
      const games = getGamesForTopic(topicSlug!, allGames);
      setTopicGames(games);
    } else {
      navigate('/');
    }
  }, [topic, topicSlug, navigate]);

  // Sort games based on selected criteria
  const sortedGames = React.useMemo(() => {
    const sorted = [...topicGames];
    
    sorted.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'plays':
          return (b.plays || 0) - (a.plays || 0);
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    
    return sorted;
  }, [topicGames, sortBy]);

  const handleGameClick = (game: Game) => {
    const gameId = game.url.split('/').pop();
    navigate(`/games/${gameId}`);
  };

  const getTopicIcon = (iconString: string) => {
    switch (iconString) {
      case '🔥': return <Flame className="w-8 h-8" />;
      case '⭐': return <Star className="w-8 h-8" />;
      case '🏆': return <Trophy className="w-8 h-8" />;
      case '👥': return <Users className="w-8 h-8" />;
      case '📅': return <Calendar className="w-8 h-8" />;
      case '💎': return <Diamond className="w-8 h-8" />;
      case '⚡': return <TrendingUp className="w-8 h-8" />;
      default: return <span className="text-3xl">{iconString}</span>;
    }
  };

  if (!topic) {
    return null;
  }

  return (
    <div className="min-h-screen relative">
      <BackgroundPattern className="light:block dark:hidden" />
      <DarkBackgroundPattern className="light:hidden dark:block" />
      
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
              <span className="text-gray-900 dark:text-white font-medium">{topic.title}</span>
            </nav>

            {/* Topic Header */}
            <div className="text-center mb-12">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${topic.gradient} mb-6 text-white shadow-lg`}>
                {getTopicIcon(topic.icon)}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {topic.title}
              </h1>
              
              <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-md mb-6">
                {topic.description}
              </p>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-white/80">
                <span>{sortedGames.length} games available</span>
                <span>•</span>
                <span>Updated daily</span>
                <span>•</span>
                <span>Free to play</span>
              </div>
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="plays">Most Played</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>
              
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

            {/* Games Grid */}
            {sortedGames.length > 0 ? (
              <GameGrid 
                games={sortedGames}
                viewMode={viewMode}
                onGameClick={handleGameClick}
              />
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-xl font-bold text-white mb-2">No Games Found</h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  We're working on adding more games to this category. Check back soon!
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Browse All Games
                </button>
              </div>
            )}

            {/* Related Topics */}
            <div className="mt-16 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Explore More Categories
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { slug: 'trending', title: 'Trending', icon: '🔥', gradient: 'from-red-500 to-pink-500' },
                  { slug: 'editors-picks', title: "Editor's Picks", icon: '⭐', gradient: 'from-teal-500 to-cyan-500' },
                  { slug: 'best-games', title: 'Best Games', icon: '🏆', gradient: 'from-yellow-500 to-orange-500' },
                  { slug: 'most-played', title: 'Most Played', icon: '👥', gradient: 'from-purple-500 to-indigo-500' },
                  { slug: 'weekly-picks', title: 'Weekly Picks', icon: '📅', gradient: 'from-green-500 to-teal-500' },
                  { slug: 'exclusive', title: 'Exclusive', icon: '💎', gradient: 'from-indigo-500 to-purple-500' }
                ].filter(cat => cat.slug !== topicSlug).map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => navigate(`/topic/${category.slug}`)}
                    className={`group bg-gradient-to-r ${category.gradient} rounded-xl p-4 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="text-sm font-medium">{category.title}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}; 