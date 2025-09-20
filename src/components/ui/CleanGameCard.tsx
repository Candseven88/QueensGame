import React, { useState } from 'react';
import { Game } from '../../types/Game';
import { Play, Star, Users, TrendingUp, Award } from 'lucide-react';

interface CleanGameCardProps {
  game: Game;
  onClick?: (game: Game) => void;
  variant?: 'default' | 'compact';
  className?: string;
}

export const CleanGameCard: React.FC<CleanGameCardProps> = ({
  game,
  onClick,
  variant = 'default',
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getBadgeInfo = () => {
    if (game.featured) return { text: 'Featured', color: 'from-yellow-400 to-orange-500', icon: <Award className="w-3 h-3" /> };
    if (game.trending) return { text: 'Trending', color: 'from-red-500 to-pink-500', icon: <TrendingUp className="w-3 h-3" /> };
    if (game.editorsPick) return { text: "Editor's Pick", color: 'from-green-400 to-blue-500', icon: <Star className="w-3 h-3" /> };
    if (game.exclusive) return { text: 'Exclusive', color: 'from-purple-500 to-indigo-600', icon: null };
    return null;
  };

  const badge = getBadgeInfo();
  const isCompact = variant === 'compact';

  return (
    <div
      className={`
        group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden
        border border-white/10 hover:border-white/20
        transform transition-all duration-300 hover:scale-105 hover:-translate-y-1
        shadow-lg hover:shadow-2xl cursor-pointer
        ${isCompact ? 'h-64' : 'h-80'}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick?.(game)}
    >
      {/* Image Section */}
      <div className={`relative ${isCompact ? 'h-40' : 'h-48'} overflow-hidden`}>
        {/* Loading Placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse" />
        )}
        
        <img
          src={game.thumbnail}
          alt={game.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {/* Category */}
          <div className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg text-xs font-medium text-white border border-white/20">
            {game.category.replace(/Games?/i, '').trim()}
          </div>

          {/* Quality Badge */}
          {badge && (
            <div className={`
              flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-bold text-white
              bg-gradient-to-r ${badge.color} shadow-lg
            `}>
              {badge.icon}
              <span>{badge.text}</span>
            </div>
          )}
        </div>

        {/* Play Button (Only on Hover) */}
        <div className={`
          absolute inset-0 flex items-center justify-center
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
            <div className="relative w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
              <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-white font-bold text-base leading-tight line-clamp-2 group-hover:text-blue-300 transition-colors">
          {game.title}
        </h3>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-3">
            {/* Rating */}
            <div className="flex items-center space-x-1 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-white/90 font-medium">
                {game.rating?.toFixed(1) || '4.5'}
              </span>
            </div>

            {/* Plays */}
            <div className="flex items-center space-x-1 text-white/70">
              <Users className="w-4 h-4" />
              <span>{game.plays ? `${Math.floor(game.plays / 1000)}k` : '25k'}</span>
            </div>
          </div>

          {/* Quick Action */}
          <div className="text-xs text-white/50">
            Click to play
          </div>
        </div>

        {/* Tags (Only if not compact) */}
        {!isCompact && game.tags && game.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {game.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-md border border-white/10"
              >
                {tag}
              </span>
            ))}
            {game.tags.length > 3 && (
              <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-md border border-white/10">
                +{game.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className={`
        absolute inset-0 rounded-2xl pointer-events-none
        transition-opacity duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}
        bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10
        shadow-2xl shadow-blue-500/20
      `} />
    </div>
  );
};

// Compact variant for dense layouts
export const CompactGameCard: React.FC<Omit<CleanGameCardProps, 'variant'>> = (props) => (
  <CleanGameCard variant="compact" {...props} />
); 