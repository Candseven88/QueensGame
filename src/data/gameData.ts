import { Game, GameCategory } from "../types/Game";
import { gameMonetizeGames } from "./gameMonetizeData";
import { enhanceGameData, distributeSpecialMarks, enhanceGameTags } from "../utils/enhanceGameData";

// 真实的GameMonetize游戏数据 - 包含6个新游戏
export const featuredGames: Game[] = [
  // 特色游戏 - 从所有游戏中精选
  {
    id: "gm-34678",
    title: "Feed Monster Game",
    description: "Wander through an endless maze collecting glowing dots to boost your score while staying ahead of the hungry creatures lurking around. Grab an energizer and turn the tables, chasing monsters for extra points.",
    thumbnail: "https://img.gamemonetize.com/v2537t64ojk8ia8pa1r0d7xdrhlqq9xt/512x384.jpg",
    category: "Royal Action",
    tags: ["1 Player", "Arcade", "Classic", "Funny", "Maze", "PacMan", "Retro"],
    url: "/games/feed-monster-game",
    embedUrl: "https://html5.gamemonetize.com/v2537t64ojk8ia8pa1r0d7xdrhlqq9xt/",
    width: 1280,
    height: 768,
    provider: "gamemonetize",
    rating: 4.7,
    plays: 156000,
    featured: true,
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "gm-brainrot-clicker",
    title: "Brainrot Clicker Game",
    description: "Italian Brainrot Clicker – Tap to earn, laugh to survive! In this absurd HTML5 clicker game, you will meet the weirdest cast ever: sharks with shoes, chocolate blocks with bats, birds with bellies, and more. Your goal? Tap on them as fast as you can to gain points, trigger animations, and unlock total chaos.",
    thumbnail: "https://img.gamemonetize.com/ncqiptu7hxaj72x3ijlmp83kl9pbd7c4/512x384.jpg",
    category: "Royal Clicker",
    tags: ["1 Player", "Arcade", "Clicker", "Italian", "Brainrot", "Meme", "Funny", "Royal"],
    url: "/games/brainrot-clicker-game",
    embedUrl: "https://html5.gamemonetize.com/ncqiptu7hxaj72x3ijlmp83kl9pbd7c4/",
    width: 768,
    height: 1024,
    provider: "gamemonetize",
    rating: 4.3,
    plays: 45000,
    featured: true,
    createdAt: "2025-09-04T10:30:00.000Z"
  },
  {
    id: "gm-snake-2025",
    title: "Snake Game 2025",
    description: "Classic Snake Game – HTML5 + Responsive + Touch Support. Bring back the nostalgia with this modern take on the classic Snake Game, built entirely with HTML5, CSS3, and JavaScript. Lightweight, fast, and fully responsive, this game runs smoothly across all modern browsers and devices.",
    thumbnail: "https://img.gamemonetize.com/i6y64skipzp3fqog4u2qpbqw4o2bhzar/512x384.jpg",
    category: "Royal Action",
    tags: ["1 Player", "Action", "Adventure", "Best Games", "Classic", "Snake", "Royal"],
    url: "/games/snake-game-2025",
    embedUrl: "https://html5.gamemonetize.com/i6y64skipzp3fqog4u2qpbqw4o2bhzar/",
    width: 800,
    height: 600,
    provider: "gamemonetize",
    rating: 4.6,
    plays: 125000,
    featured: true,
    createdAt: "2025-09-04T11:15:00.000Z"
  },
  {
    id: "gm-krashen",
    title: "Krashen",
    description: "Krashen – Stack, Smash, and Conquer! Think you have got perfect timing? Krashen will put your reflexes to the ultimate test. Your mission is simple, but dangerously addictive: Tap at the perfect moment to stack falling blocks on top of each other. Miss the alignment, and the overhanging piece gets sliced away.",
    thumbnail: "https://img.gamemonetize.com/z3r5ki3ft58tzkpzn2w4qchzho944bz8/512x384.jpg",
    category: "Royal Clicker",
    tags: ["1 Player", "2025 games", "Best Games", "Clicker", "Hypercasual", "Stack", "Royal"],
    url: "/games/krashen",
    embedUrl: "https://html5.gamemonetize.com/z3r5ki3ft58tzkpzn2w4qchzho944bz8/",
    width: 800,
    height: 600,
    provider: "gamemonetize",
    rating: 4.5,
    plays: 89000,
    featured: true,
    createdAt: "2025-09-04T11:45:00.000Z"
  }
];

export const popularGames: Game[] = featuredGames;

// 游戏分类数据 - 更新统计数字
export const gameCategories: GameCategory[] = [
  {
    id: "1",
    name: "Royal Action",
    slug: "royal-action",
    description: "Fast-paced action games with thrilling gameplay",
    icon: "⚡",
    gameCount: 16
  },
  {
    id: "2",
    name: "Royal Adventure",
    slug: "royal-adventure",
    description: "Epic adventures and exploration games",
    icon: "👑",
    gameCount: 9
  },
  {
    id: "3",
    name: "Royal Racing",
    slug: "royal-racing",
    description: "High-speed racing and driving games",
    icon: "🏎️",
    gameCount: 4
  },
  {
    id: "4",
    name: "Royal Puzzle",
    slug: "royal-puzzle",
    description: "Brain-teasing puzzles and mind games",
    icon: "🧩",
    gameCount: 12
  },
  {
    id: "5",
    name: "Royal Tournament",
    slug: "royal-tournament",
    description: "Competitive multiplayer and sports games",
    icon: "🏆",
    gameCount: 2
  },
  {
    id: "6",
    name: "Royal Clicker",
    slug: "royal-clicker",
    description: "Addictive clicker games with royal themes",
    icon: "👆",
    gameCount: 2
  }
];

// 按分类分组的游戏
export const gamesByCategory: Record<string, Game[]> = {
  "Royal Action": gameMonetizeGames.filter(g => g.category === "Royal Action"),
  "Royal Adventure": gameMonetizeGames.filter(g => g.category === "Royal Adventure"),
  "Royal Racing": gameMonetizeGames.filter(g => g.category === "Royal Racing"),
  "Royal Puzzle": gameMonetizeGames.filter(g => g.category === "Royal Puzzle"),
  "Royal Tournament": gameMonetizeGames.filter(g => g.category === "Royal Tournament"),
  "Royal Clicker": gameMonetizeGames.filter(g => g.category === "Royal Clicker")
};

// 获取特定分类的游戏
export const getGamesByCategory = (category: string): Game[] => {
  return gamesByCategory[category] || [];
};

// 获取所有分类
export const getAllCategories = (): GameCategory[] => {
  return gameCategories;
};

// 合并所有游戏数据
const rawGames: Game[] = [
  ...featuredGames,
  ...gameMonetizeGames // 使用所有可用的游戏，不再限制数量
];

// 去重函数 - 根据游戏ID去除重复游戏
const removeDuplicateGames = (games: Game[]): Game[] => {
  const uniqueGames = new Map<string, Game>();
  
  games.forEach(game => {
    const existingGame = uniqueGames.get(game.id);
    if (!existingGame) {
      // 如果游戏不存在，直接添加
      uniqueGames.set(game.id, game);
    } else {
      // 如果游戏已存在，保留数据更完整或评分更高的版本
      const shouldReplace = 
        (game.rating || 0) > (existingGame.rating || 0) ||
        (game.plays || 0) > (existingGame.plays || 0) ||
        game.featured === true ||
        game.description.length > existingGame.description.length;
      
      if (shouldReplace) {
        uniqueGames.set(game.id, game);
      }
    }
  });
  
  return Array.from(uniqueGames.values());
};

// 应用去重
const deduplicatedGames = removeDuplicateGames(rawGames);

// 增强游戏数据，添加特殊标记和更丰富的标签
const enhancedGames = distributeSpecialMarks(enhanceGameData(deduplicatedGames)).map(game => ({
  ...game,
  tags: enhanceGameTags(game)
}));

// 所有游戏数据 - 增强后的游戏数据
export const allGames: Game[] = enhancedGames
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
