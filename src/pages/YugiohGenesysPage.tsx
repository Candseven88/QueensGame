import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackgroundPattern, DarkBackgroundPattern } from '../components/BackgroundPattern';
import { ArrowLeft, Calendar, Trophy, Users, Star, Zap, BookOpen, Target, Crown, Shield } from 'lucide-react';

export const YugiohGenesysPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // SEO Optimization
    document.title = 'Yu-Gi-Oh! GENESYS Format Guide - Revolutionary Tournament Experience | QueensGame';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Discover Yu-Gi-Oh! GENESYS - the revolutionary TCG format with simplified rules, point-based deck construction, and nostalgic gameplay. Perfect for new and returning duelists.');

    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'yugioh genesys, yugioh tournament format, tcg genesys, point system yugioh, simplified yugioh rules, no link monsters, pendulum ban, deck building points, konami official format');

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
    
    setMetaTag('og:title', 'Yu-Gi-Oh! GENESYS Format Guide - Revolutionary Tournament Experience');
    setMetaTag('og:description', 'Discover Yu-Gi-Oh! GENESYS - the revolutionary TCG format with simplified rules, point-based deck construction, and nostalgic gameplay.');
    setMetaTag('og:type', 'article');
    setMetaTag('og:url', window.location.href);
    setMetaTag('og:image', '/thumbnail/yugioh-genesys-banner.jpg');

    // Structured Data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Yu-Gi-Oh! GENESYS Format Guide - Revolutionary Tournament Experience",
      "description": "Comprehensive guide to Yu-Gi-Oh! GENESYS format featuring simplified rules, point-based deck construction, and official tournament play.",
      "author": {
        "@type": "Organization",
        "name": "QueensGame"
      },
      "publisher": {
        "@type": "Organization",
        "name": "QueensGame",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.png`
        }
      },
      "datePublished": "2024-09-24",
      "dateModified": "2024-09-24",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      },
      "image": {
        "@type": "ImageObject",
        "url": "/thumbnail/yugioh-genesys-banner.jpg",
        "width": 1200,
        "height": 630
      },
      "keywords": "yugioh genesys, tcg format, tournament rules, point system, deck building",
      "articleSection": "Gaming Guide",
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
            "name": "Yu-Gi-Oh! GENESYS",
            "item": window.location.href
          }
        ]
      }
    };

    // Remove old structured data
    const oldScript = document.querySelector('script[type="application/ld+json"][data-genesys]');
    if (oldScript) {
      oldScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-genesys', 'true');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, []);

  const rulesList = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "No Link or Pendulum Monsters",
      description: "Original field layout used - no Extra Monster Zones or Pendulum Zones"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "No Forbidden & Limited List",
      description: "All cards except Link/Pendulum monsters are allowed with 3-copy limit"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Point System Deck Construction",
      description: "Powerful cards cost points - standard cap is 100 points per deck"
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: "Flexible Point Caps",
      description: "Tournaments can set different point limits (50, 100, 200, or even 0 points)"
    }
  ];

  const benefits = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Perfect for New Duelists",
      description: "Simplified game complexity makes it easier for newcomers to learn and enjoy Yu-Gi-Oh!"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Nostalgic Experience",
      description: "Brings back the classic Yu-Gi-Oh! feel from the DM to ZEXAL era without modern complexity"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Competitive Balance",
      description: "Point system creates fair competition by limiting overpowered card combinations"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Deck Building Challenge",
      description: "Strategic point allocation adds a new layer of deck construction creativity"
    }
  ];

  const upcomingEvents = [
    { date: "October 4-5", location: "Anaheim, California, USA", type: "YCS Invitational" },
    { date: "October 11-12", location: "São Paulo, Brazil", type: "YCS Invitational" },
    { date: "November 8-9", location: "Pittsburgh, Pennsylvania, USA", type: "YCS Invitational" },
    { date: "November 22-23", location: "Bologna, Europe", type: "YCS Invitational" },
    { date: "November 29-30", location: "Mérida, Mexico", type: "YCS Invitational" }
  ];

  const relatedTopics = [
    { slug: 'trending', title: 'Trending Games', icon: '🔥', description: 'Hot games everyone is playing' },
    { slug: 'puzzle-games', title: 'Puzzle Games', icon: '🧩', description: 'Strategic thinking challenges' },
    { slug: 'best-games', title: 'Best Games', icon: '🏆', description: 'Top-rated gaming experiences' },
    { slug: 'editors-picks', title: "Editor's Picks", icon: '⭐', description: 'Curated premium selections' }
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
              <span className="text-gray-900 dark:text-white font-medium">Yu-Gi-Oh! GENESYS</span>
            </nav>

            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 mb-8 text-white shadow-2xl">
                <span className="text-4xl">🃏</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                Yu-Gi-Oh! <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">GENESYS</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto drop-shadow-md mb-8 leading-relaxed">
                Experience the revolutionary Yu-Gi-Oh! format that brings back the classic dueling spirit with 
                simplified rules, strategic point-based deck construction, and nostalgic gameplay
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
                <span className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>September 2024 Launch</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>Official Konami Format</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Tournament Supported</span>
                </span>
              </div>
            </div>

            {/* What is GENESYS Section */}
            <section className="mb-16">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  What is Yu-Gi-Oh! GENESYS?
                </h2>
                
                <div className="prose prose-lg max-w-none text-white/90 mb-8">
                  <p className="text-lg leading-relaxed mb-6">
                    Yu-Gi-Oh! GENESYS is Konami's revolutionary new tournament format designed to recapture the 
                    essence of classic Yu-Gi-Oh! dueling. After over 2 years of development, this format offers 
                    a simplified, more accessible experience perfect for both newcomers and veteran duelists 
                    seeking nostalgia.
                  </p>
                  
                  <p className="text-lg leading-relaxed">
                    The format eliminates Link and Pendulum monsters while introducing an innovative point 
                    system for deck construction, creating balanced and strategic gameplay reminiscent of 
                    the beloved DM through ZEXAL eras.
                  </p>
                </div>

                {/* Key Rules Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {rulesList.map((rule, index) => (
                    <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-3 text-white">
                          {rule.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">{rule.title}</h3>
                          <p className="text-white/80 text-sm">{rule.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                Why Choose GENESYS?
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-white mx-auto">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 text-center">{benefit.title}</h3>
                    <p className="text-white/80 text-sm text-center leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Events */}
            <section className="mb-16">
              <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-3xl p-8 md:p-12 border border-purple-500/20">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  Upcoming GENESYS Events
                </h2>
                
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold text-white">{event.type}</h3>
                        <p className="text-purple-300">{event.location}</p>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg px-4 py-2 text-white font-medium">
                        {event.date}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <p className="text-white/80 text-sm">
                    First North American full GENESYS YCS scheduled for 2026
                  </p>
                </div>
              </div>
            </section>

            {/* Getting Started Section */}
            <section className="mb-16">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  Getting Started with GENESYS
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
                    <h3 className="text-xl font-semibold text-white mb-3">Learn the Rules</h3>
                    <p className="text-white/80 text-sm">Familiarize yourself with the simplified format and point system for deck construction.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
                    <h3 className="text-xl font-semibold text-white mb-3">Build Your Deck</h3>
                    <p className="text-white/80 text-sm">Use the official deck builder tool to create legal decks within the point limitations.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
                    <h3 className="text-xl font-semibold text-white mb-3">Find Tournaments</h3>
                    <p className="text-white/80 text-sm">Locate Official Tournament Stores running sanctioned GENESYS events in your area.</p>
                  </div>
                </div>
                
                <div className="text-center mt-10">
                  <button
                    onClick={() => navigate('/topic/yugioh-genesys')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Explore GENESYS Games
                  </button>
                </div>
              </div>
            </section>

            {/* Related Topics */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Explore More Gaming Content
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedTopics.map((topic) => (
                  <button
                    key={topic.slug}
                    onClick={() => navigate(`/topic/${topic.slug}`)}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 text-left group"
                  >
                    <div className="text-3xl mb-3">{topic.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-white/70 text-sm">{topic.description}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center mb-16">
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl p-8 md:p-12 border border-purple-500/30">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Experience GENESYS?
                </h2>
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                  Join the revolutionary Yu-Gi-Oh! format that's bringing back the classic dueling experience. 
                  Perfect for new players and nostalgic veterans alike.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/games')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Play Card Games
                  </button>
                  <button
                    onClick={() => navigate('/topic/trending')}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                  >
                    Browse Trending
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}; 