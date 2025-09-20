import React, { useState } from 'react';
import { Game } from '../../types/Game';
import { Play, Star, Users } from 'lucide-react';

interface SimpleGameCardProps {
  game: Game;
  onClick?: (game: Game) => void;
  className?: string;
}

export const SimpleGameCard: React.FC<SimpleGameCardProps> = ({
  game,
  onClick,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // 获取最重要的一个标记用于显示
  const getPrimaryBadge = () => {
    if (game.featured) return { text: 'Featured', color: 'bg-yellow-500' };
    if (game.trending) return { text: 'Trending', color: 'bg-red-500' };
    if (game.editorsPick) return { text: "Editor's Pick", color: 'bg-green-500' };
    if (game.exclusive) return { text: 'Exclusive', color: 'bg-purple-500' };
    return null;
  };

  const primaryBadge = getPrimaryBadge();

  return (
    <div
      className={`
        group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden
        border border-white/10 hover:border-white/20
        transform transition-all duration-200 hover:scale-[1.02]
        shadow-lg hover:shadow-xl cursor-pointer
        h-72 w-full
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick?.(game)}
    >
      {/* 图片区域 - 保持宽高比 */}
      <div className="relative h-48 w-full overflow-hidden">
        {/* 加载占位符 */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse" />
        )}
        
        {/* 游戏图片 */}
        <img
          src={game.thumbnail}
          alt={game.title}
          className={`w-full h-full object-cover transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-105' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* 简单的渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

        {/* 主要标记 */}
        {primaryBadge && (
          <div className={`
            absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white
            ${primaryBadge.color} shadow-lg
          `}>
            {primaryBadge.text}
          </div>
        )}

        {/* 分类标签 */}
        <div className="absolute top-3 left-3">
          <div className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md text-xs font-medium text-white">
            {game.category.replace(/Royal\s*/g, '').trim()}
          </div>
        </div>

        {/* 播放按钮 - 仅悬浮时显示 */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
              <Play className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" />
            </div>
          </div>
        )}
      </div>

      {/* 内容区域 */}
      <div className="p-4 h-24 flex flex-col justify-between">
        {/* 游戏标题 */}
        <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 mb-2">
          {game.title}
        </h3>

        {/* 统计信息 */}
        <div className="flex items-center justify-between text-xs">
          {/* 评分 */}
          <div className="flex items-center space-x-1 text-yellow-400">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-white font-medium">
              {game.rating?.toFixed(1) || '4.5'}
            </span>
          </div>

          {/* 播放量 */}
          <div className="flex items-center space-x-1 text-white/60">
            <Users className="w-3 h-3" />
            <span>{game.plays ? `${Math.floor(game.plays / 1000)}k` : '25k'}</span>
          </div>

          {/* 提示文字 */}
          <div className="text-white/40 text-xs">
            Click to play
          </div>
        </div>
      </div>

      {/* 简单的悬浮效果 */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-xl pointer-events-none" />
      )}
    </div>
  );
}; 