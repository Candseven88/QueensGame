import React, { useState, useMemo } from "react";
import { Search, Filter, Star, Grid, List, X, ChevronDown } from "lucide-react";
import { Game, GameCategory } from "../../types/Game";
import { gameCategories } from "../../data/gameData";

interface GameFiltersProps {
  games: Game[];
  onFilteredGames: (games: Game[]) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

type SortOption = "newest" | "oldest" | "rating" | "plays" | "name";

export const GameFilters: React.FC<GameFiltersProps> = ({ 
  games, 
  onFilteredGames, 
  viewMode, 
  onViewModeChange 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // 获取所有可用的标签
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    games.forEach(game => {
      game.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [games]);

  // 筛选和排序游戏
  const filteredGames = useMemo(() => {
    let filtered = games.filter(game => {
      const matchesSearch = searchTerm === "" || 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === "all" || game.category === selectedCategory;
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => game.tags.includes(tag));
      const matchesFeatured = !showFeaturedOnly || game.featured;

      return matchesSearch && matchesCategory && matchesTags && matchesFeatured;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "plays":
          return (b.plays || 0) - (a.plays || 0);
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [games, searchTerm, selectedCategory, selectedTags, showFeaturedOnly, sortBy]);

  React.useEffect(() => {
    onFilteredGames(filteredGames);
  }, [filteredGames, onFilteredGames]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedTags([]);
    setShowFeaturedOnly(false);
    setSortBy("newest");
  };

  const activeFiltersCount = [
    searchTerm !== "",
    selectedCategory !== "all",
    selectedTags.length > 0,
    showFeaturedOnly
  ].filter(Boolean).length;

  return (
    <div className="mb-6">
      {/* 紧凑型筛选栏 */}
      <div className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-indigo-900/20 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-lg">
        {/* 第一行：搜索和主要控制 */}
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          {/* 搜索栏 - 移动端全宽，桌面端占主要空间 */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm text-sm"
            />
          </div>

          {/* 右侧控制组 */}
          <div className="flex items-center gap-2">
            {/* 视图切换 */}
            <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/20">
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-1.5 rounded-md transition-all duration-200 ${
                  viewMode === "grid" 
                    ? "bg-white/20 text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={`p-1.5 rounded-md transition-all duration-200 ${
                  viewMode === "list" 
                    ? "bg-white/20 text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* 排序选择 */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
            >
              <option value="newest">Newest</option>
              <option value="rating">Top Rated</option>
              <option value="plays">Most Played</option>
              <option value="name">A-Z</option>
            </select>

            {/* 高级筛选按钮 */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                showAdvancedFilters || activeFiltersCount > 0
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showAdvancedFilters ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* 第二行：快速分类筛选 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-medium text-gray-300 whitespace-nowrap flex-shrink-0">Categories:</span>
          <div className="flex gap-1.5 min-w-0">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20"
              }`}
            >
              All ({games.length})
            </button>
            {gameCategories.slice(0, 6).map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === category.name
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20"
                }`}
              >
                <span className="text-sm">{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(" ")[1] || category.name}</span>
                <span className="text-xs opacity-75">({category.gameCount})</span>
              </button>
            ))}
          </div>
        </div>

        {/* 高级筛选面板 - 紧凑型 */}
        {showAdvancedFilters && (
          <div className="mt-3 pt-3 border-t border-white/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 特色游戏筛选 */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFeaturedOnly}
                    onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                    className="w-4 h-4 text-purple-600 bg-white/10 border-white/30 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-white">Featured Only</span>
                  <span className="text-xs text-gray-400">
                    ({games.filter(g => g.featured).length})
                  </span>
                </label>
              </div>

              {/* 标签筛选 */}
              <div>
                <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
                  {allTags.slice(0, 8).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-2.5 py-1 text-xs rounded-full transition-all duration-200 ${
                        selectedTags.includes(tag)
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 清除筛选按钮 */}
            {activeFiltersCount > 0 && (
              <div className="mt-3 pt-3 border-t border-white/20">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X className="w-3 h-3" />
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* 结果统计 - 紧凑型 */}
        <div className="mt-3 pt-3 border-t border-white/20">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-300">
              Showing <span className="font-semibold text-purple-400">{filteredGames.length}</span> of{" "}
              <span className="font-semibold text-white">{games.length}</span> games
            </p>
            {filteredGames.length !== games.length && (
              <button
                onClick={clearFilters}
                className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
