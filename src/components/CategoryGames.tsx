import React from 'react';
import { GameCard } from './GameCard';
import { Game } from '../types/Game';

interface CategoryGamesProps {
  category: string;
  games: Game[];
  title?: string;
  subtitle?: string;
}

export const CategoryGames: React.FC<CategoryGamesProps> = ({ 
  category, 
  games, 
  title, 
  subtitle 
}) => {
  const filteredGames = games.filter(game => game.category === category);
  
  if (filteredGames.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
          No games found in this category
        </h3>
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {title || `${category} Games`}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}; 