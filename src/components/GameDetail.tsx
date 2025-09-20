import React, { useState } from 'react';
import { ArrowLeft, Play, Star, Eye, Share2, Heart } from 'lucide-react';
import { Game } from '../types/Game';

interface GameDetailProps {
  game: Game;
  onBack: () => void;
}

export const GameDetail: React.FC<GameDetailProps> = ({ game, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleBack = () => {
    setIsPlaying(false);
    onBack();
  };

  const formatPlays = (plays: number) => {
    if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
    if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
    return plays.toString();
  };

  if (isPlaying) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Game</span>
          </button>
          <h1 className="text-xl font-bold">{game.title}</h1>
          <div className="w-20"></div>
        </div>
        
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <iframe
            src={game.embedUrl}
            width={game.width}
            height={game.height}
            frameBorder="0"
            allowFullScreen
            className="border-0 rounded-lg shadow-2xl"
            title={game.title}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Games</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-auto max-h-[500px] object-contain"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={handlePlay}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-lg text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 opacity-0 hover:opacity-100"
                  >
                    <Play className="w-6 h-6" />
                    <span>Play Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Game Info */}
          <div className="space-y-6">
            {/* Game Title and Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {game.title}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                {game.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">
                      {game.rating}
                    </span>
                  </div>
                )}
                {game.plays && (
                  <div className="flex items-center space-x-1">
                    <Eye className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {formatPlays(game.plays)} plays
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-700">
                  {game.category}
                </span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-sm capitalize">
                  {game.provider}
                </span>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handlePlay}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Play Game</span>
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    isLiked
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Game Description */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                About This Game
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {game.description}
              </p>
            </div>

            {/* Game Tags */}
            {game.tags && game.tags.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Game Details */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Game Details
              </h2>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Resolution:</span>
                  <span>{game.width} x {game.height}</span>
                </div>
                <div className="flex justify-between">
                  <span>Provider:</span>
                  <span className="capitalize">{game.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span>Added:</span>
                  <span>{new Date(game.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 