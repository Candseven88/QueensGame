import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Search, Menu, X, Gamepad2, Crown, Home, Star, TrendingUp } from 'lucide-react';
import { PremiumButton } from './ui/PremiumButton';
import { allGames } from '../data/gameData';
import { Game } from '../types/Game';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // 处理Logo点击，返回主页
  const handleLogoClick = useCallback(() => {
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    }
  }, []);

  // 搜索功能
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    
    if (query.trim().length === 0) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results = allGames.filter(game =>
      game.title.toLowerCase().includes(query.toLowerCase()) ||
      game.description.toLowerCase().includes(query.toLowerCase()) ||
      game.category.toLowerCase().includes(query.toLowerCase()) ||
      game.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, 8);

    setSearchResults(results);
    setShowSearchResults(true);
  }, []);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults.length > 0) {
      const firstResult = searchResults[0];
      const gameId = firstResult.url.split('/').pop();
      window.location.href = `/games/${gameId}`;
    }
  }, [searchQuery, searchResults]);

  const handleGameClick = useCallback((game: Game) => {
    const gameId = game.url.split('/').pop();
    window.location.href = `/games/${gameId}`;
    setShowSearchResults(false);
    setSearchQuery('');
  }, []);

  // 点击外部关闭搜索结果
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('.search-container')) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // 增强版搜索输入框组件
  const searchInput = (
    <form onSubmit={handleSearchSubmit} className="relative search-container">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur group-focus-within:blur-md transition-all duration-300"></div>
        <div className="relative premium-card p-0 border-white/20">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 group-focus-within:text-white transition-colors duration-300" />
          <input
            type="text"
            placeholder="Search royal games..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-12 pr-6 py-3 bg-transparent text-white placeholder-white/40 focus:outline-none focus:placeholder-white/60 transition-all duration-300 w-full rounded-2xl"
          />
        </div>
      </div>

      {/* 增强版搜索结果下拉框 */}
      {showSearchResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 premium-card rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto border border-white/20 slide-in-down">
          {searchResults.map((game, index) => (
            <div
              key={game.id}
              onClick={() => handleGameClick(game)}
              className={`
                flex items-center space-x-4 p-4 hover:bg-white/10 cursor-pointer 
                border-b border-white/10 last:border-b-0 transition-all duration-300
                fade-in-scale
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-12 h-9 object-cover rounded-lg shadow-lg"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate mb-1">
                  {game.title}
                </h4>
                <p className="text-xs text-white/60 truncate">
                  {game.category} • {game.plays?.toLocaleString() || '0'} plays
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-xs text-white/80 font-medium">
                  {game.rating?.toFixed(1) || '4.0'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </form>
  );

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
      ${isScrolled 
        ? 'bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
        : 'bg-black/10 backdrop-blur-sm'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* 增强版Logo */}
          <div 
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={handleLogoClick}
            title="Click to return to homepage"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold gradient-text-neon">QueensGame</span>
              <div className="text-xs text-white/60 -mt-1">Royal Gaming Experience</div>
            </div>
          </div>

          {/* 增强版导航 */}
          <nav className="hidden md:flex items-center space-x-2">
            <PremiumButton
              variant="secondary"
              effect="shimmer"
              size="sm"
              icon={Home}
              onClick={() => window.location.href = '/'}
              className="bg-transparent hover:bg-white/10 border border-white/20"
            >
              Home
            </PremiumButton>
            <PremiumButton
              variant="secondary"
              effect="shimmer"
              size="sm"
              icon={Gamepad2}
              onClick={() => window.location.href = '/games'}
              className="bg-transparent hover:bg-white/10 border border-white/20"
            >
              All Games
            </PremiumButton>
            <PremiumButton
              variant="secondary"
              effect="shimmer"
              size="sm"
              icon={TrendingUp}
              onClick={() => window.location.href = '/topic/trending'}
              className="bg-transparent hover:bg-white/10 border border-white/20"
            >
              Trending
            </PremiumButton>
            <PremiumButton
              variant="secondary"
              effect="shimmer"
              size="sm"
              icon={Star}
              onClick={() => window.location.href = '/topic/editors-picks'}
              className="bg-transparent hover:bg-white/10 border border-white/20"
            >
              Featured
            </PremiumButton>

          </nav>

          {/* 增强版搜索和菜单 */}
          <div className="flex items-center space-x-4">
            {/* 桌面端搜索框 */}
            <div className="hidden sm:block w-80">
              {searchInput}
            </div>

            {/* 增强版移动端菜单按钮 */}
            <div className="md:hidden">
              <PremiumButton
                variant="secondary"
                effect="glow"
                size="sm"
                onClick={toggleMenu}
                className="bg-white/10 border border-white/20 p-3"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </PremiumButton>
            </div>
          </div>
        </div>

        {/* 增强版移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 premium-card mt-2 rounded-2xl overflow-hidden slide-in-down">
            <div className="p-4 space-y-3">
              <PremiumButton
                variant="secondary"
                effect="ripple"
                size="sm"
                icon={Home}
                fullWidth
                onClick={() => {
                  window.location.href = '/';
                  setIsMenuOpen(false);
                }}
                className="justify-start bg-transparent hover:bg-white/10 border border-white/10"
              >
                Home
              </PremiumButton>
              
              <PremiumButton
                variant="secondary"
                effect="ripple"
                size="sm"
                icon={Gamepad2}
                fullWidth
                onClick={() => {
                  window.location.href = '/games';
                  setIsMenuOpen(false);
                }}
                className="justify-start bg-transparent hover:bg-white/10 border border-white/10"
              >
                All Games
              </PremiumButton>
              
              <PremiumButton
                variant="secondary"
                effect="ripple"
                size="sm"
                icon={TrendingUp}
                fullWidth
                onClick={() => {
                  window.location.href = '/topic/trending';
                  setIsMenuOpen(false);
                }}
                className="justify-start bg-transparent hover:bg-white/10 border border-white/10"
              >
                Trending
              </PremiumButton>
              
              <PremiumButton
                variant="secondary"
                effect="ripple"
                size="sm"
                icon={Star}
                fullWidth
                onClick={() => {
                  window.location.href = '/topic/editors-picks';
                  setIsMenuOpen(false);
                }}
                className="justify-start bg-transparent hover:bg-white/10 border border-white/10"
              >
                Featured
              </PremiumButton>
              

              
              {/* 移动端搜索框 */}
              <div className="pt-3 border-t border-white/10">
                {searchInput}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};