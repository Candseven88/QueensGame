/**
 * QueensGame 平台配置文件
 * 管理不同游戏平台的数据源和配置
 */

export const PLATFORM_CONFIG = {
  // GameMonetize 平台配置
  gamemonetize: {
    name: 'GameMonetize',
    rssUrl: 'https://gamemonetize.com/rss.xml',
    apiUrl: 'https://api.gamemonetize.com/games',
    enabled: true,
    priority: 1,
    categoryMapping: {
      'Hypercasual': 'Royal Action',
      'Arcade': 'Royal Action',
      'Shooting': 'Royal Action',
      'Racing': 'Royal Racing',
      'Puzzles': 'Royal Puzzle',
      'Adventure': 'Royal Adventure',
      'Girls': 'Royal Adventure',
      'Sports': 'Royal Tournament',
      'Multiplayer': 'Royal Tournament'
    },
    defaultCategory: 'Royal Action',
    rateLimit: 1000, // 毫秒
    maxGamesPerUpdate: 50
  },
  
  // CrazyGames 平台配置
  crazygames: {
    name: 'CrazyGames',
    apiUrl: 'https://api.crazygames.com/games',
    enabled: true, // 已激活
    priority: 2,
    categoryMapping: {
      'Action': 'Royal Action',
      'Racing': 'Royal Racing',
      'Puzzle': 'Royal Puzzle',
      'Adventure': 'Royal Adventure',
      'Sports': 'Royal Tournament'
    },
    defaultCategory: 'Royal Action',
    rateLimit: 1500,
    maxGamesPerUpdate: 30
  },
  
  // Poki 平台配置
  poki: {
    name: 'Poki',
    apiUrl: 'https://api.poki.com/games',
    enabled: true, // 已激活
    priority: 3,
    categoryMapping: {
      'Action': 'Royal Action',
      'Racing': 'Royal Racing',
      'Puzzle': 'Royal Puzzle',
      'Adventure': 'Royal Adventure',
      'Sports': 'Royal Tournament'
    },
    defaultCategory: 'Royal Action',
    rateLimit: 2000,
    maxGamesPerUpdate: 25
  },
  
  // 自定义游戏配置
  custom: {
    name: 'Custom Games',
    enabled: true,
    priority: 0, // 最高优先级
    categoryMapping: {},
    defaultCategory: 'Royal Action',
    rateLimit: 0,
    maxGamesPerUpdate: 100
  }
};

// 获取启用的平台列表
export function getEnabledPlatforms() {
  return Object.entries(PLATFORM_CONFIG)
    .filter(([key, config]) => config.enabled)
    .sort((a, b) => a[1].priority - b[1].priority)
    .map(([key, config]) => ({ key, ...config }));
}

// 获取平台配置
export function getPlatformConfig(platformKey) {
  return PLATFORM_CONFIG[platformKey] || null;
}

// 验证平台配置
export function validatePlatformConfig(platformKey) {
  const config = getPlatformConfig(platformKey);
  if (!config) {
    throw new Error(`未知的平台: ${platformKey}`);
  }
  
  if (!config.enabled) {
    throw new Error(`平台 ${config.name} 已禁用`);
  }
  
  return config;
}

// 获取分类映射
export function getCategoryMapping(platformKey) {
  const config = getPlatformConfig(platformKey);
  return config ? config.categoryMapping : {};
}

// 获取默认分类
export function getDefaultCategory(platformKey) {
  const config = getPlatformConfig(platformKey);
  return config ? config.defaultCategory : 'Royal Action';
}

// 平台数据获取器工厂
export function createPlatformFetcher(platformKey) {
  const config = validatePlatformConfig(platformKey);
  
  switch (platformKey) {
    case 'gamemonetize':
      return createGameMonetizeFetcher(config);
    case 'crazygames':
      return createCrazyGamesFetcher(config);
    case 'poki':
      return createPokiFetcher(config);
    case 'custom':
      return createCustomFetcher(config);
    default:
      throw new Error(`不支持的平台: ${platformKey}`);
  }
}

// GameMonetize 数据获取器
function createGameMonetizeFetcher(config) {
  return {
    name: config.name,
    async fetchGames() {
      // 这里实现真实的RSS或API调用
      // 目前返回模拟数据
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 'gm-new-001',
              title: 'Royal Castle Defense',
              description: 'Defend your royal castle from invading forces...',
              category: 'Hypercasual',
              tags: 'Strategy, Defense, Royal, Medieval',
              thumb: 'https://img.gamemonetize.com/royal-castle/512x384.jpg',
              url: 'https://html5.gamemonetize.com/royal-castle/',
              width: '1280',
              height: '768'
            },
            {
              id: 'gm-new-002',
              title: 'Dragon Quest Royal',
              description: 'Embark on a royal dragon hunting adventure...',
              category: 'Adventure',
              tags: 'RPG, Adventure, Dragon, Royal',
              thumb: 'https://img.gamemonetize.com/dragon-quest/512x384.jpg',
              url: 'https://html5.gamemonetize.com/dragon-quest/',
              width: '1024',
              height: '768'
            }
          ]);
        }, config.rateLimit);
      });
    }
  };
}

// CrazyGames 数据获取器
function createCrazyGamesFetcher(config) {
  return {
    name: config.name,
    async fetchGames() {
      // 实现CrazyGames API调用
      return [];
    }
  };
}

// Poki 数据获取器
function createPokiFetcher(config) {
  return {
    name: config.name,
    async fetchGames() {
      // 实现Poki API调用
      return [];
    }
  };
}

// 自定义游戏数据获取器
function createCustomFetcher(config) {
  return {
    name: config.name,
    async fetchGames() {
      // 返回自定义游戏数据
      return [
        {
          id: 'custom-001',
          title: 'Royal Puzzle Master',
          description: 'Solve royal puzzles to unlock ancient secrets...',
          category: 'Puzzle',
          tags: 'Puzzle, Brain, Royal, Logic',
          thumb: 'https://img.custom.com/royal-puzzle/512x384.jpg',
          url: 'https://html5.custom.com/royal-puzzle/',
          width: '800',
          height: '600'
        }
      ];
    }
  };
}

// 导出默认配置
export default PLATFORM_CONFIG; 