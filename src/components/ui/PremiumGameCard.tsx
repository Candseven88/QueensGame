import React, { useState, useRef, useEffect } from 'react';
import { Game } from '../../types/Game';
import { Play, Star, Users, Heart, Bookmark, TrendingUp, Award } from 'lucide-react';

interface PremiumGameCardProps {
  game: Game;
  onClick?: (game: Game) => void;
  variant?: 'default' | 'featured' | 'compact' | 'hero';
  showStats?: boolean;
  showActions?: boolean;
  className?: string;
}

export const PremiumGameCard: React.FC<PremiumGameCardProps> = ({
  game,
  onClick,
  variant = 'default',
  showStats = true,
  showActions = true,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });

    // 3D tilt effect
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    
    const rotateX = (deltaY / rect.height) * -10;
    const rotateY = (deltaX / rect.width) * 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'featured':
        return 'h-80 md:h-96';
      case 'compact':
        return 'h-48';
      case 'hero':
        return 'h-96 md:h-[500px]';
      default:
        return 'h-64 md:h-72';
    }
  };

  const getBadgeGradient = () => {
    if (game.featured) return 'from-yellow-400 to-orange-500';
    if (game.trending) return 'from-red-500 to-pink-500';
    if (game.editorsPick) return 'from-green-400 to-blue-500';
    if (game.exclusive) return 'from-purple-500 to-indigo-600';
    return 'from-blue-500 to-purple-600';
  };

  const getBadgeIcon = () => {
    if (game.featured) return <Award className="w-3 h-3" />;
    if (game.trending) return <TrendingUp className="w-3 h-3" />;
    if (game.editorsPick) return <Star className="w-3 h-3" />;
    return null;
  };

  const getBadgeText = () => {
    if (game.featured) return 'Featured';
    if (game.trending) return 'Trending';
    if (game.editorsPick) return "Editor's Pick";
    if (game.exclusive) return 'Exclusive';
    if (game.weeklyPick) return 'Weekly Pick';
    return null;
  };

  return (
    <div
      ref={cardRef}
      className={`
        group relative overflow-hidden cursor-pointer
        transform transition-all duration-500 ease-out
        ${getVariantClasses()}
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${className}
      `}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease-out, opacity 0.5s ease-out, translate 0.5s ease-out'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick?.(game)}
    >
      {/* Background Card */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md border border-white/20 rounded-2xl" />
      
      {/* Animated Border Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      {/* Mouse Follow Light Effect */}
      {isHovered && (
        <div
          className="absolute w-32 h-32 bg-gradient-radial from-white/20 via-white/10 to-transparent rounded-full blur-xl pointer-events-none transition-all duration-200"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}

      {/* Game Image Container */}
      <div className="relative h-full w-full rounded-2xl overflow-hidden">
        {/* Image */}
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Quality Badges */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          {getBadgeText() && (
            <div className={`
              flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold text-white
              bg-gradient-to-r ${getBadgeGradient()} shadow-lg backdrop-blur-sm
              transform transition-all duration-300 group-hover:scale-110
            `}>
              {getBadgeIcon()}
              <span>{getBadgeText()}</span>
            </div>
          )}
          
          {game.rating && game.rating >= 4.5 && (
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
              <Star className="w-3 h-3 fill-current" />
              <span>{game.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <div className="px-3 py-1 rounded-full text-xs font-medium text-white bg-black/50 backdrop-blur-sm border border-white/20">
            {game.category.split(' ')[1] || game.category}
          </div>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="relative">
            {/* Pulsing Background */}
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
            
            {/* Main Button */}
            <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl transform transition-transform duration-300 hover:scale-110">
              <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
          {/* Title */}
          <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-lg">
            {game.title}
          </h3>

          {/* Stats Row */}
          {showStats && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-white/80">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{game.rating?.toFixed(1) || '4.5'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{game.plays ? `${Math.floor(game.plays / 1000)}k` : '25k'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              {showActions && (
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                    <Heart className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                    <Bookmark className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Progress Bar (for variant='hero') */}
          {variant === 'hero' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/60">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-1000" style={{ width: '75%' }} />
              </div>
            </div>
          )}
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

        {/* Ripple Effect on Click */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-active:scale-150 transition-transform duration-300 opacity-50" />
        </div>
      </div>

      {/* Floating Elements (for featured cards) */}
      {variant === 'featured' && (
        <>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-pulse delay-1000" />
        </>
      )}

      {/* Loading Shimmer */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      )}
    </div>
  );
};

// Specialized card variants
export const FeaturedGameCard: React.FC<Omit<PremiumGameCardProps, 'variant'>> = (props) => (
  <PremiumGameCard variant="featured" {...props} />
);

export const CompactGameCard: React.FC<Omit<PremiumGameCardProps, 'variant'>> = (props) => (
  <PremiumGameCard variant="compact" {...props} />
);

export const HeroGameCard: React.FC<Omit<PremiumGameCardProps, 'variant'>> = (props) => (
  <PremiumGameCard variant="hero" {...props} />
); 