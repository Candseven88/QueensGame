import { Game, GameCategory } from "../types/Game";
import { gameMonetizeGames } from "./gameMonetizeData";
import { enhanceGameData, distributeSpecialMarks, enhanceGameTags } from "../utils/enhanceGameData";

// 真实的GameMonetize游戏数据 - 包含新游戏推荐
export const featuredGames: Game[] = [
  // 新游戏推荐 - 置顶显示
  {
    id: "lovemoney-game",
    title: "LoveMoney: Moral Clicker RPG",
    description: "LoveMoney is an emotionally charged clicker RPG where desperate circumstances drive difficult choices. You need money for life-saving surgery but face an unconventional opportunity at a mysterious stall. This narrative-driven clicker combines fast-paced gameplay with heavy moral weight, challenging players to balance survival needs against ethical boundaries. Each click advances both your financial goals and a deeply personal story of relationships, sacrifice, and the true cost of desperation.",
    shortDescription: "A bold clicker RPG mixing moral choices with fast-paced gameplay - earn money for life-saving surgery through questionable means.",
    thumbnail: "/thumbnail/LOVEMONEY.jpg",
    category: "Royal Adventure", 
    tags: ["1 Player", "Clicker", "RPG", "Story-driven", "Moral Choices", "Drama", "Survival", "Emotional", "Idle Game", "New Game"],
    url: "/games/lovemoney-game",
    embedUrl: "https://lovemoneygame.io/game/lovemoney-game/",
    fallbackUrls: ["https://sprunki.org/lovemoney"],
    width: 1024,
    height: 768,
    provider: "external",
    rating: 4.5,
    plays: 8500,
    featured: true,
    trending: true,
    editorsPick: true,
    hotGame: true,
    createdAt: "2025-09-23T14:00:00.000Z",
    author: "Independent Developer",
    releaseDate: "2025-09-22",
    language: "English",
    seoKeywords: "lovemoney game, clicker rpg, moral choices, life saving surgery, emotional clicker, story driven game, idle rpg, survival drama, relationship choices",
    external: true,
    instructions: [
      "Click to earn money needed for life-saving surgery",
      "Make difficult moral choices that affect the story outcome",
      "Meet the mysterious stall owner and learn their unconventional methods",
      "Balance your financial needs with ethical boundaries",
      "Experience the emotional weight of survival-driven decisions",
      "Unlock different story paths based on your choices",
      "Manage relationships while pursuing your desperate goal"
    ]
  },
  {
    id: "bloodmoney-2",
    title: "Human Expenditure Program: Bloodmoney 2",
    description: "Experience Human Expenditure Program: Bloodmoney 2, a psychological horror clicker game where each click inflicts pain on Harvey Harvington, and the pain is very real. This deceptively simple clicker mechanic comes with heavy moral responsibility. The game requires mental resilience and is not recommended for those sensitive to flashing lights. Discover what the Human Expenditure Program really is, who's behind it, and your actual role in this dark experiment.",
    shortDescription: "A psychological horror clicker where each click affects Harvey Harvington's well-being in this moral responsibility thriller.",
    thumbnail: "/thumbnail/Bloodmoney_2.jpg",
    category: "Royal Adventure",
    tags: ["1 Player", "Clicker", "Psychological Horror", "Thriller", "Drama", "Mystery", "Virtual Pet", "Horror", "Sad", "Suspense", "New Game"],
    url: "/games/human-expenditure-program-bloodmoney-2",
    embedUrl: "https://yoplay.io/human-expenditure-program-bloodmoney-2.embed",
    fallbackUrls: ["https://sprunki.org/bloodmoney-2"],
    width: 1280,
    height: 720,
    provider: "external",
    rating: 4.3,
    plays: 12000,
    featured: true,
    trending: true,
    editorsPick: true,
    hotGame: true,
    createdAt: "2025-09-23T12:00:00.000Z",
    author: "Shroomychrist Studios",
    releaseDate: "2025-09-20",
    language: "English",
    seoKeywords: "bloodmoney 2, human expenditure program, psychological horror clicker, harvey harvington, virtual pet game, moral responsibility game, shroomychrist studios, clicker horror game, drama thriller",
    external: true,
    instructions: [
      "Click on Harvey Harvington to interact - but remember, the pain you inflict is real",
      "Each click has moral weight and psychological consequences",
      "Monitor Harvey's well-being as you progress through the experiment",
      "Discover the truth behind the Human Expenditure Program through gameplay",
      "Experience the heavy responsibility that comes with each interaction",
      "Use mouse clicks to advance the story and uncover dark secrets",
      "Be prepared for psychological impact - mental resilience required"
    ]
  },
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
    gameCount: 10
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

// Yu-Gi-Oh! and Card Games for GENESYS topic
export const cardGames: Game[] = [
  {
    id: "yugioh-master-duel",
    title: "Yu-Gi-Oh! Master Duel",
    description: "Experience the definitive Yu-Gi-Oh! digital card game with over 10,000 cards from the entire TCG history. Build competitive decks, duel online, and master the art of strategic card battling in this free-to-play masterpiece.",
    shortDescription: "The ultimate Yu-Gi-Oh! digital experience with thousands of cards and competitive online dueling.",
    thumbnail: "https://cdn.cloudflare.steamstatic.com/steam/apps/1449850/header.jpg",
    category: "Card Game",
    tags: ["yugioh", "card game", "strategy", "tcg", "multiplayer", "competitive", "deck building", "anime"],
    url: "/games/yugioh-master-duel",
    embedUrl: "https://www.konami.com/yugioh/masterduel/",
    width: 1920,
    height: 1080,
    provider: "external",
    rating: 4.7,
    plays: 125000,
    featured: true,
    trending: true,
    editorsPick: true,
    createdAt: "2024-09-20T10:00:00.000Z",
    author: "Konami",
    releaseDate: "2022-01-19",
    language: "English",
    seoKeywords: "yugioh master duel, digital card game, online dueling, deck building, tcg",
    external: true
  },
  {
    id: "classic-card-battles",
    title: "Classic Card Battles",
    description: "Dive into strategic card battles with simplified rules reminiscent of classic TCG formats. Perfect for players who enjoy the GENESYS-style gameplay with point-based deck construction and balanced competition.",
    shortDescription: "Strategic card game with simplified rules and balanced deck building mechanics.",
    thumbnail: "https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Classic+Card+Battles",
    category: "Card Game", 
    tags: ["card game", "strategy", "deck building", "genesys", "classic", "tcg", "competitive"],
    url: "/games/classic-card-battles",
    embedUrl: "https://example.com/classic-card-battles",
    width: 1024,
    height: 768,
    provider: "custom",
    rating: 4.3,
    plays: 45000,
    featured: true,
    weeklyPick: true,
    createdAt: "2024-09-15T12:00:00.000Z",
    author: "QueensGame Studios",
    releaseDate: "2024-09-15",
    language: "English",
    seoKeywords: "card battles, strategy game, deck building, simplified rules, tcg"
  },
  {
    id: "duel-arena-legends",
    title: "Duel Arena Legends",
    description: "Enter the ultimate duel arena where strategic card play meets epic monster battles. Build your deck, summon powerful creatures, and engage in turn-based combat that captures the essence of classic card game tournaments.",
    shortDescription: "Epic monster dueling game with strategic deck building and tournament-style gameplay.",
    thumbnail: "https://via.placeholder.com/400x300/6366F1/FFFFFF?text=Duel+Arena+Legends",
    category: "Card Game",
    tags: ["card game", "monsters", "strategy", "tournament", "dueling", "tcg", "competitive", "fantasy"],
    url: "/games/duel-arena-legends", 
    embedUrl: "https://example.com/duel-arena-legends",
    width: 1024,
    height: 768,
    provider: "custom",
    rating: 4.5,
    plays: 67000,
    hotGame: true,
    mostPlayed: true,
    createdAt: "2024-09-10T14:00:00.000Z",
    author: "Arena Games",
    releaseDate: "2024-09-10",
    language: "English",
    seoKeywords: "duel arena, monster battles, card strategy, tournament play"
  },
  {
    id: "nostalgic-card-master",
    title: "Nostalgic Card Master",
    description: "Relive the golden age of trading card games with this nostalgia-filled experience. Features classic gameplay mechanics, familiar card types, and strategic depth that veteran players will appreciate.",
    shortDescription: "Classic trading card experience with nostalgic gameplay and strategic depth.",
    thumbnail: "https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Nostalgic+Card+Master",
    category: "Card Game",
    tags: ["card game", "nostalgic", "classic", "trading card", "strategy", "retro", "tcg"],
    url: "/games/nostalgic-card-master",
    embedUrl: "https://example.com/nostalgic-card-master", 
    width: 1024,
    height: 768,
    provider: "custom",
    rating: 4.2,
    plays: 38000,
    exclusive: true,
    bestGame: true,
    createdAt: "2024-09-05T16:00:00.000Z",
    author: "Retro Gaming Co",
    releaseDate: "2024-09-05",
    language: "English",
    seoKeywords: "nostalgic card game, classic tcg, retro gaming, strategic card play"
  }
];

// 合并所有游戏数据
const rawGames: Game[] = [
  ...featuredGames,
  ...cardGames,
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
