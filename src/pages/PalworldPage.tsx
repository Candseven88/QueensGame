import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackgroundPattern, DarkBackgroundPattern } from '../components/BackgroundPattern';
import { ArrowLeft, ExternalLink, Play, Calendar, Users, Star, Gamepad2, Sparkles } from 'lucide-react';

export const PalworldPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // SEO Setup
    document.title = 'Palworld: Palfarm - Revolutionary Farming Simulator with Creature Collection | QueensGame';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Discover Palworld Palfarm, the cozy life farming simulator spinoff that combines creature collection with peaceful farming gameplay. Explore the latest from Pocketpair with multiplayer support and mysterious black market elements.');

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'palworld, palfarm, farming simulator, creature collection, pocketpair, cozy life sim, multiplayer farming, pal creatures, pokemon-like games, farming games 2024');

    // Open Graph tags
    const setMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    setMetaTag('og:title', 'Palworld: Palfarm - Revolutionary Farming Simulator | QueensGame');
    setMetaTag('og:description', 'Discover Palworld Palfarm, the cozy life farming simulator spinoff that combines creature collection with peaceful farming gameplay.');
    setMetaTag('og:type', 'article');
    setMetaTag('og:url', window.location.href);
    setMetaTag('og:image', `${window.location.origin}/thumbnail/palworld.jpg`);

    // Structured data for article
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Palworld: Palfarm - Revolutionary Farming Simulator with Creature Collection",
      "description": "Comprehensive guide to Palworld Palfarm, the upcoming cozy life farming simulator spinoff from Pocketpair featuring creature collection and multiplayer gameplay.",
      "image": `${window.location.origin}/thumbnail/palworld.jpg`,
      "author": {
        "@type": "Organization",
        "name": "QueensGame"
      },
      "publisher": {
        "@type": "Organization",
        "name": "QueensGame",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/favicon.ico`
        }
      },
      "datePublished": "2024-09-24",
      "dateModified": "2024-09-24",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      },
      "articleSection": "Gaming",
      "keywords": ["palworld", "palfarm", "farming simulator", "creature collection", "pocketpair"],
      "about": {
        "@type": "Thing",
        "name": "Palworld Palfarm",
        "description": "Cozy life farming simulator spinoff of Palworld"
      }
    };
    
    // Remove old structured data
    const oldScript = document.querySelector('script[type="application/ld+json"][data-palworld]');
    if (oldScript) {
      oldScript.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-palworld', 'true');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, []);

  const relatedTopics = [
    { title: 'Action Games', slug: 'action-games', icon: '⚡', description: 'Fast-paced gaming adventures' },
    { title: 'Best Games', slug: 'best-games', icon: '🏆', description: 'Top-rated gaming experiences' },
    { title: 'Trending Games', slug: 'trending', icon: '🔥', description: 'Popular games right now' },
    { title: "Editor's Picks", slug: 'editors-picks', icon: '⭐', description: 'Curated premium games' }
  ];

  const gameFeatures = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Multiplayer Support',
      description: 'Build and manage farms together with friends in cooperative multiplayer mode'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Creature Collection',
      description: 'Befriend and work alongside adorable Pals with unique abilities and personalities'
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: 'Cozy Gameplay',
      description: 'Relaxing farming experience with daily conversations and relationship building'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Special Events',
      description: 'Participate in weddings, festivals, and seasonal celebrations on the islands'
    }
  ];

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
              <span className="text-gray-900 dark:text-white font-medium">Palworld: Palfarm</span>
            </nav>

            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-blue-500 mb-6 text-white shadow-lg">
                <span className="text-3xl">🌱</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Palworld: <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Palfarm</span>
              </h1>
              
              <p className="text-xl text-white max-w-4xl mx-auto drop-shadow-md mb-8">
                Discover the revolutionary farming simulator spinoff that combines creature collection with cozy life simulation. 
                Experience peaceful farming on the Palpagos Islands with adorable Pals as your companions.
              </p>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-white/80">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Coming Soon 2024</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Multiplayer Support</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>By Pocketpair</span>
                </span>
              </div>
            </div>

            {/* Featured Images Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <img 
                  src="/thumbnail/palworld.jpg" 
                  alt="Palworld Palfarm farming gameplay with Pals working together" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">Farm Life with Pals</h3>
                  <p className="text-sm opacity-90">Peaceful farming simulation</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <img 
                  src="/thumbnail/palworld 2.jpg" 
                  alt="Palworld Palfarm multiplayer farming and creature care" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">Multiplayer Adventures</h3>
                  <p className="text-sm opacity-90">Build together with friends</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <img 
                  src="/thumbnail/palworld 3.jpg" 
                  alt="Palworld Palfarm cozy island life and relationship building" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">Island Community</h3>
                  <p className="text-sm opacity-90">Build relationships and friendships</p>
                </div>
              </div>
            </div>

            {/* Main Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Main Article Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* What is Palworld: Palfarm */}
                <article className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h2 className="text-3xl font-bold text-white mb-6">What is Palworld: Palfarm?</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-white/90 mb-4">
                      <strong>Palworld: Palfarm</strong> represents a fascinating evolution in the Palworld universe, developed by Pocketpair as a response to community requests for a more peaceful and cozy gaming experience. This farming simulation spinoff strips away the intense survival elements of the original Palworld, focusing instead on the joy of agricultural life alongside beloved Pal creatures.
                    </p>
                    <p className="text-white/90 mb-4">
                      Set on the idyllic Palpagos Islands, Palfarm invites players to create their own farming paradise where Pals serve as willing agricultural partners rather than workforce. The game emphasizes relationship-building, both with the adorable creatures and the island's human inhabitants, creating a heartwarming social simulation experience.
                    </p>
                    <p className="text-white/90">
                      What makes Palfarm particularly intriguing is its unique blend of wholesome farming mechanics with subtle darker undertones, including mysterious "nasty Pals" that threaten your peaceful existence and a black market that adds unexpected depth to this seemingly innocent farming simulator.
                    </p>
                  </div>
                </article>

                {/* Key Features */}
                <article className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h2 className="text-3xl font-bold text-white mb-6">Revolutionary Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gameFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                          <p className="text-white/80 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                {/* The Darker Side */}
                <article className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h2 className="text-3xl font-bold text-white mb-6">The Mysterious Underbelly</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-white/90 mb-4">
                      Despite its cozy exterior, Palfarm harbors intriguing mysteries that set it apart from traditional farming simulators. The game features <strong>"nasty Pals"</strong> that will attempt to raid your farm, requiring strategic combat to protect your peaceful sanctuary.
                    </p>
                    <p className="text-white/90 mb-4">
                      Perhaps most intriguingly, Palfarm includes a <strong>black market system</strong> where players can acquire guns and other suspicious items. This unexpected element adds a layer of complexity and moral ambiguity that challenges players' assumptions about this seemingly innocent farming game.
                    </p>
                    <p className="text-white/90">
                      As the developers cryptically note: "Is one of your Pals slacking off? Time to teach them the joy of working." This ominous statement suggests that even in this peaceful setting, the question of Pal treatment remains as ethically complex as in the original Palworld.
                    </p>
                  </div>
                </article>

                {/* Community and Multiplayer */}
                <article className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h2 className="text-3xl font-bold text-white mb-6">Building Island Communities</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-white/90 mb-4">
                      Palfarm's multiplayer capabilities allow friends to create shared farming communities on the Palpagos Islands. Players can collaborate on large-scale agricultural projects, share resources, and even participate in special events like Pal-officiated weddings.
                    </p>
                    <p className="text-white/90 mb-4">
                      The relationship system extends beyond Pals to include meaningful interactions with island residents. Through daily conversations, gift-giving, and collaborative work, players can develop deep friendships that unlock new storylines and gameplay opportunities.
                    </p>
                    <p className="text-white/90">
                      This social aspect transforms Palfarm from a simple farming simulator into a rich life simulation that captures the essence of community building in a tropical paradise setting.
                    </p>
                  </div>
                </article>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Game Info Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4">Game Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Developer:</span>
                      <span className="text-white font-medium">Pocketpair</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Genre:</span>
                      <span className="text-white font-medium">Farming Simulation</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Platform:</span>
                      <span className="text-white font-medium">PC (Steam)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Release:</span>
                      <span className="text-white font-medium">Coming Soon</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Multiplayer:</span>
                      <span className="text-white font-medium">Yes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Price:</span>
                      <span className="text-white font-medium">TBA</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <a
                      href="https://store.steampowered.com/app/1623730/Palworld/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Wishlist on Steam</span>
                    </a>
                    
                    <div className="aspect-video rounded-lg overflow-hidden bg-black/20">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/AmurGwwjvGM"
                        title="Palworld Palfarm Official Trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                </div>

                {/* Related Games */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4">Related Topics</h3>
                  <div className="space-y-3">
                    {relatedTopics.map((topic) => (
                      <button
                        key={topic.slug}
                        onClick={() => navigate(`/topic/${topic.slug}`)}
                        className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 hover:border-white/20"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{topic.icon}</span>
                          <div>
                            <div className="text-white font-medium">{topic.title}</div>
                            <div className="text-white/60 text-xs">{topic.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                  <div className="space-y-2 text-sm">
                    <button 
                      onClick={() => navigate('/drift-boss')}
                      className="block w-full text-left text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      → Drift Boss - Racing Action
                    </button>
                    <button 
                      onClick={() => navigate('/rabbit-road')}
                      className="block w-full text-left text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      → Rabbit Road - Adventure Game
                    </button>
                    <button 
                      onClick={() => navigate('/yugioh-genesys')}
                      className="block w-full text-left text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      → Yu-Gi-Oh! GENESYS Format
                    </button>
                    <button 
                      onClick={() => navigate('/hollow-knight-silksong')}
                      className="block w-full text-left text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      → Hollow Knight: Silksong
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mb-12">
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-4">Experience More Gaming Adventures</h2>
                <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                  While waiting for Palworld: Palfarm, explore our curated collection of premium games featuring similar themes of adventure, strategy, and community building.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => navigate('/topic/action-games')}
                    className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>Play Action Games</span>
                  </button>
                  <button
                    onClick={() => navigate('/topic/best-games')}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Star className="w-5 h-5" />
                    <span>Best Games Collection</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}; 