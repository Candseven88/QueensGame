import React from 'react';
import { gameCategories } from '../data/gameData';

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Game Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover games across various categories. From action-packed adventures to mind-bending puzzles.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {gameCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {category.gameCount} games
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300 group-hover:from-purple-600 group-hover:to-pink-600"
                  style={{ width: `${Math.min(category.gameCount / 200 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};