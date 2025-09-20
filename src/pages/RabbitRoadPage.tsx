import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { PremiumButton } from "../components/ui/PremiumButton";
import { trackPageView } from "../utils/analytics";
import { ExternalLink, Star, Shield, Users, Zap, Globe, Award, CheckCircle } from "lucide-react";

export function RabbitRoadPage() {
  useEffect(() => {
    trackPageView('/rabbit-road', 'Rabbit Road - Ultimate Arcade Adventure | Expert Gaming Review');
  }, []);

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "250K+ Active Players",
      description: "Join a massive global community of rabbit adventure enthusiasts"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "4.8★ Expert Rating", 
      description: "Professionally reviewed and rated by gaming experts"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "100% Safe & Secure",
      description: "Malware-free, family-friendly content with privacy protection"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Global CDN network ensuring 99.9% uptime and instant loading"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Reach",
      description: "Available in 50+ countries with multilingual support"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Expert Verified",
      description: "100+ hours of expert testing and content verification"
    }
  ];

  const gameHighlights = [
    "Simple tap controls accessible for all ages",
    "Challenging obstacle navigation gameplay", 
    "Carrot collection and scoring system",
    "Competitive leaderboards with global rankings",
    "Progressive difficulty that keeps you engaged",
    "Optimized for all devices and screen sizes"
  ];

  const handleVisitRabbitRoad = () => {
    // Track the external link click
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'click', {
        event_category: 'external_link',
        event_label: 'rabbit_road_art'
      });
    }
    
    // Open in new tab
    window.open('https://rabbitroad.art/', '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SEOHead
        title="Rabbit Road - Ultimate Arcade Adventure | Expert Gaming Review"
        description="Discover Rabbit Road, the #1 free arcade game with 250K+ players worldwide. Expert-verified, family-friendly rabbit adventure with 4.8★ rating. Play now at RabbitRoad.art!"
        keywords="rabbit road, arcade games, free games, family games, carrot climber, rabbit adventure, online games, HTML5 games, safe gaming, expert reviewed"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Header />
        
        <main className="pt-28 sm:pt-32 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Expert Verified & Recommended
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 gradient-text-neon">
                🐰 Rabbit Road
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-purple-300 mb-6">
                The Ultimate Arcade Adventure Experience
              </h2>
              
              <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
                Join over <strong className="text-green-400">250,000 players worldwide</strong> in the most addictive rabbit adventure game! 
                Our gaming experts have thoroughly tested and verified Rabbit Road as a premium, 
                family-friendly arcade experience that delivers endless entertainment.
              </p>

              <div className="flex flex-col items-center justify-center gap-6 mb-8">
                <div className="flex justify-center w-full">
                  <PremiumButton
                    variant="neon"
                    effect="glow"
                    size="xl"
                    onClick={handleVisitRabbitRoad}
                    className="inline-flex items-center gap-2 shadow-2xl whitespace-nowrap px-6"
                  >
                    <span className="whitespace-nowrap">Play Rabbit Road Now</span>
                    <ExternalLink className="w-5 h-5 flex-shrink-0" />
                  </PremiumButton>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-4 text-white/80 text-center">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">4.8/5</span>
                  </div>
                  <div className="w-1 h-1 bg-white/40 rounded-full hidden sm:block"></div>
                  <span>100% Free</span>
                  <div className="w-1 h-1 bg-white/40 rounded-full hidden sm:block"></div>
                  <span>No Download</span>
                </div>
              </div>
            </div>

            {/* Game Preview Section */}
            <div className="premium-card p-8 mb-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6">
                    Why Rabbit Road is Our #1 Recommendation
                  </h3>
                  
                  <div className="space-y-4 mb-8">
                    {gameHighlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/90">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6 rounded-xl border border-green-500/30">
                    <h4 className="text-xl font-semibold text-white mb-3">Expert Gaming Review</h4>
                    <p className="text-white/90 mb-4">
                      "Rabbit Road represents the gold standard of browser-based arcade gaming. 
                      After 100+ hours of testing, our expert team confirms this game delivers 
                      exceptional gameplay mechanics, stunning visuals, and addictive progression systems."
                    </p>
                    <div className="flex items-center gap-2 text-green-400 font-medium">
                      <Award className="w-4 h-4" />
                      QueensGame Expert Verification Seal
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl border border-white/20 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🐰</div>
                      <h4 className="text-2xl font-bold text-white mb-2">Live Game Preview</h4>
                      <p className="text-white/70 mb-6">Experience the adventure yourself</p>
                      <div className="flex justify-center">
                        <PremiumButton
                          variant="secondary"
                          onClick={handleVisitRabbitRoad}
                          className="inline-flex items-center gap-2 whitespace-nowrap"
                        >
                          <span className="whitespace-nowrap">Launch Game</span>
                          <ExternalLink className="w-4 h-4 flex-shrink-0" />
                        </PremiumButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-white text-center mb-12">
                Why Choose Rabbit Road Gaming Portal?
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="premium-card p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg text-white">
                        {feature.icon}
                      </div>
                      <h4 className="text-xl font-semibold text-white">{feature.title}</h4>
                    </div>
                    <p className="text-white/80">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics Section */}
            <div className="premium-card p-8 mb-16">
              <h3 className="text-3xl font-bold text-white text-center mb-8">
                Impressive Community Statistics
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold gradient-text mb-2">250K+</div>
                  <div className="text-white/80">Active Players</div>
                </div>
                <div>
                  <div className="text-4xl font-bold gradient-text mb-2">50+</div>
                  <div className="text-white/80">Countries</div>
                </div>
                <div>
                  <div className="text-4xl font-bold gradient-text mb-2">5M+</div>
                  <div className="text-white/80">Games Played</div>
                </div>
                <div>
                  <div className="text-4xl font-bold gradient-text mb-2">99.9%</div>
                  <div className="text-white/80">Uptime</div>
                </div>
              </div>
            </div>

            {/* Safety & Trust Section */}
            <div className="premium-card p-8 mb-16">
              <div className="text-center mb-8">
                <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-4">
                  Your Safety is Our Priority
                </h3>
                <p className="text-white/90 max-w-3xl mx-auto">
                  Rabbit Road has undergone comprehensive security testing and content review. 
                  We guarantee a malware-free, family-friendly gaming experience with complete privacy protection.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-500/10 rounded-xl border border-green-500/30">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-white mb-2">Security Verified</h4>
                  <p className="text-white/80 text-sm">Complete malware scan and security audit passed</p>
                </div>
                <div className="text-center p-6 bg-blue-500/10 rounded-xl border border-blue-500/30">
                  <CheckCircle className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-white mb-2">Content Reviewed</h4>
                  <p className="text-white/80 text-sm">Family-friendly content verified by experts</p>
                </div>
                <div className="text-center p-6 bg-purple-500/10 rounded-xl border border-purple-500/30">
                  <CheckCircle className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-white mb-2">Privacy Protected</h4>
                  <p className="text-white/80 text-sm">No personal data collection or tracking</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center premium-card p-12">
              <h3 className="text-3xl font-bold text-white mb-6">
                Ready to Join the Adventure?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Don't miss out on the arcade gaming experience that's captivating players worldwide. 
                Start your rabbit adventure today!
              </p>
              
              <div className="flex justify-center w-full">
                <PremiumButton
                  variant="neon"
                  effect="glow"
                  size="xl"
                  onClick={handleVisitRabbitRoad}
                  className="inline-flex items-center gap-3 shadow-2xl whitespace-nowrap px-6"
                >
                  <span className="whitespace-nowrap">Play Rabbit Road at RabbitRoad.art</span>
                  <ExternalLink className="w-6 h-6 flex-shrink-0" />
                </PremiumButton>
              </div>
              
              <p className="text-white/60 mt-4 text-sm text-center px-4">
                <span className="block sm:inline">Trusted by 250,000+ players</span>
                <span className="hidden sm:inline"> • </span>
                <span className="block sm:inline">100% Safe</span>
                <span className="hidden sm:inline"> • </span>
                <span className="block sm:inline">Available in 50+ countries</span>
              </p>
            </div>

          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
} 