import React from "react";
import { Star, Play, Calendar, Eye } from "lucide-react";
import { Game } from "../../types/Game";

interface GameGridProps {
  games: Game[];
  viewMode: "grid" | "list";
  onGameClick: (game: Game) => void;
}

export const GameGrid: React.FC<GameGridProps> = ({ games, viewMode, onGameClick }) => {
  if (games.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎮</div>
        <h3 className="text-xl font-bold text-white mb-2">No Games Found</h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto">
          Try adjusting your search terms or filters to discover more amazing games.
        </p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-3">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => onGameClick(game)}
            className="group bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.01] cursor-pointer border border-white/10 hover:border-white/20"
          >
            <div className="flex">
              <div className="relative w-32 h-24 sm:w-36 sm:h-28 flex-shrink-0">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                {game.featured && (
                  <div className="absolute top-1 right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-lg">
                    ⭐
                  </div>
                )}
                <div className="absolute bottom-1 left-1 bg-black/80 backdrop-blur-sm text-white text-xs px-1.5 py-0.5 rounded text-xs">
                  {game.category.split(" ")[1] || game.category}
                </div>
              </div>
              
              <div className="flex-1 p-3 sm:p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-white text-sm sm:text-base line-clamp-1 group-hover:text-purple-300 transition-colors">
                    {game.title}
                  </h3>
                  <div className="flex items-center space-x-1 text-xs text-gray-400 ml-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="font-medium">{game.rating?.toFixed(1)}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-xs sm:text-sm line-clamp-2 mb-2 leading-relaxed">
                  {game.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Play className="w-3 h-3" />
                      <span className="hidden sm:inline">{game.plays?.toLocaleString() || "0"} plays</span>
                      <span className="sm:hidden">{game.plays ? Math.floor(game.plays / 1000) + "k" : "0"}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span className="hidden sm:inline">{new Date(game.createdAt).toLocaleDateString()}</span>
                      <span className="sm:hidden">{new Date(game.createdAt).toLocaleDateString().split("/")[0]}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {game.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-xs px-2 py-0.5 rounded-full backdrop-blur-sm border border-purple-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
      {games.map((game) => (
        <div
          key={game.id}
          onClick={() => onGameClick(game)}
          className="group bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 cursor-pointer border border-white/10 hover:border-white/20"
        >
          <div className="relative">
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {game.featured && (
              <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                ⭐
              </div>
            )}
            <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded text-xs">
              {game.category.split(" ")[1] || game.category}
            </div>
            
            {/* 悬停时的播放按钮 */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Play className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="p-3">
            <h3 className="font-bold text-white text-xs sm:text-sm mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
              {game.title}
            </h3>

            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="font-medium">{game.rating?.toFixed(1)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span className="hidden sm:inline">{game.plays?.toLocaleString() || "0"}</span>
                <span className="sm:hidden">{game.plays ? Math.floor(game.plays / 1000) + "k" : "0"}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {game.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-xs px-2 py-0.5 rounded-full backdrop-blur-sm border border-purple-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
