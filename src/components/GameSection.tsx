import React from 'react';
import { GameCard } from './GameCard';
import { Game } from '../types/Game';

interface GameSectionProps {
  title: string;
  subtitle?: string;
  games: Game[];
  showViewAll?: boolean;
  onGameClick?: (game: Game) => void;
}

export const GameSection: React.FC<GameSectionProps> = ({ 
  title, 
  subtitle, 
  games, 
  showViewAll = true,
  onGameClick
}) => {
  const handleGameClick = (game: Game) => {
    if (onGameClick) {
      onGameClick(game);
    } else {
      // Fallback behavior
      console.log(`Opening game: ${game.title}`);
      // window.open(game.url, '_blank');
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-600 dark:text-gray-300">
                {subtitle}
              </p>
            )}
          </div>
          {showViewAll && (
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
              View All
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onClick={() => handleGameClick(game)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};