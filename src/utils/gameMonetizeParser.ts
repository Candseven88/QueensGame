export interface GameMonetizeGame {
  id: string;
  title: string;
  description: string;
  instructions: string;
  url: string;
  category: string;
  tags: string;
  thumb: string;
  width: string;
  height: string;
}

export interface ParsedGame {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  tags: string[];
  url: string;
  embedUrl: string;
  fallbackUrls?: string[];
  width: number;
  height: number;
  provider: 'gamemonetize' | 'gamedistribution' | 'crazygames' | 'poki' | 'gameflare' | 'custom';
  rating: number;
  plays: number;
  featured: boolean;
  trending?: boolean;
  createdAt: string;
  instructions?: string[];
  author?: string;
  language?: string;
}

// 将GameMonetize分类映射到QueensGame皇家分类
const categoryMapping: Record<string, string> = {
  'Action': 'Royal Action',
  'Adventure': 'Royal Adventure',
  'Arcade': 'Royal Action',
  'Puzzles': 'Royal Puzzle',
  'Puzzle': 'Royal Puzzle',
  'Racing': 'Royal Racing',
  'Shooting': 'Royal Action',
  'Sports': 'Royal Tournament',
  'Strategy': 'Royal Strategy',
  'Fighting': 'Royal Action',
  'Hypercasual': 'Royal Action',
  'Clicker': 'Royal Puzzle',
  'Girls': 'Royal Adventure',
  'Multiplayer': 'Royal Tournament',
  'Simulation': 'Royal Strategy',
  'Educational': 'Royal Puzzle',
  'Family': 'Royal Adventure',
  'Kids': 'Royal Adventure',
  'Casual': 'Royal Puzzle',
  'Retro': 'Royal Action',
  'Classic': 'Royal Action',
  'Minecraft': 'Royal Adventure',
  'Maze': 'Royal Puzzle',
  'Match 3': 'Royal Puzzle',
  'Matching': 'Royal Puzzle',
  'Platform': 'Royal Adventure',
  'Survival': 'Royal Action',
  'Zombie': 'Royal Action',
  'War': 'Royal Action',
  'Battle': 'Royal Action',
  'Monster': 'Royal Action',
  'Superhero': 'Royal Action',
  'Princess': 'Royal Adventure',
  'Fashion': 'Royal Adventure',
  'Dress Up': 'Royal Adventure',
  'Makeover': 'Royal Adventure',
  'Beauty': 'Royal Adventure',
  'Hair': 'Royal Adventure',
  'Cooking': 'Royal Puzzle',
  'Farm': 'Royal Strategy',
  'Building': 'Royal Strategy',
  'Craft': 'Royal Strategy',
  'Mining': 'Royal Strategy',
  'Pixel': 'Royal Action',
  '3D': 'Royal Action',
  '2D': 'Royal Action',
  'Unity3D': 'Royal Action',
  'WebGL': 'Royal Action',
  'HTML5': 'Royal Action',
  'Mobile': 'Royal Action',
  'Android': 'Royal Action',
  'iOS': 'Royal Action',
  'PC': 'Royal Action',
  'Browser': 'Royal Action',
  'Online': 'Royal Action',
  'Offline': 'Royal Action'
};

// 生成随机评分和播放次数
const generateRandomStats = () => {
  const rating = Math.random() * 1.5 + 3.5; // 3.5 - 5.0
  const plays = Math.floor(Math.random() * 900000) + 10000; // 10,000 - 1,000,000
  return { rating: Math.round(rating * 10) / 10, plays };
};

// 解析GameMonetize游戏数据
export const parseGameMonetizeGames = (rssData: string): ParsedGame[] => {
  try {
    const games = JSON.parse(rssData);
    
    return games.map((game: GameMonetizeGame, index: number) => {
      const { rating, plays } = generateRandomStats();
      const tags = game.tags.split(', ').map(tag => tag.trim());
      
      // 映射分类
      const mappedCategory = categoryMapping[game.category] || 'Royal Adventure';
      
      // 生成创建日期（最近30天内）
      const daysAgo = Math.floor(Math.random() * 30);
      const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
      
      return {
        id: `gm-${game.id}`,
        title: game.title,
        description: game.description,
        thumbnail: game.thumb,
        category: mappedCategory,
        tags: tags,
        url: `/games/${game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        embedUrl: game.url,
        width: parseInt(game.width) || 800,
        height: parseInt(game.height) || 600,
        provider: 'gamemonetize' as const,
        rating,
        plays,
        featured: index < 10, // 前10个游戏设为特色游戏
        createdAt
      };
    });
  } catch (error) {
    console.error('Error parsing GameMonetize RSS data:', error);
    return [];
  }
};

// 按分类分组游戏
export const groupGamesByCategory = (games: ParsedGame[]) => {
  const grouped: Record<string, ParsedGame[]> = {};
  
  games.forEach(game => {
    if (!grouped[game.category]) {
      grouped[game.category] = [];
    }
    grouped[game.category].push(game);
  });
  
  return grouped;
};

// 获取特色游戏
export const getFeaturedGames = (games: ParsedGame[]) => {
  return games.filter(game => game.featured).slice(0, 6);
};

// 获取热门游戏
export const getPopularGames = (games: ParsedGame[]) => {
  return games
    .sort((a, b) => b.plays - a.plays)
    .slice(0, 6);
}; 