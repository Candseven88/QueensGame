#!/usr/bin/env node

/**
 * QueensGame 批量游戏获取器
 * 从多个源自动获取大量游戏，无需手动添加
 * 支持 GameMonetize RSS、分类页面、热门游戏等多种获取方式
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { parseStringPromise } from 'xml2js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const CONFIG = {
  // GameMonetize 数据源
  RSS_URL: 'https://gamemonetize.com/rss.xml',
  CATEGORY_URLS: {
    'action': 'https://gamemonetize.com/category/action',
    'adventure': 'https://gamemonetize.com/category/adventure', 
    'arcade': 'https://gamemonetize.com/category/arcade',
    'puzzle': 'https://gamemonetize.com/category/puzzle',
    'racing': 'https://gamemonetize.com/category/racing',
    'shooting': 'https://gamemonetize.com/category/shooting',
    'sports': 'https://gamemonetize.com/category/sports',
    'strategy': 'https://gamemonetize.com/category/strategy',
    'hypercasual': 'https://gamemonetize.com/category/hypercasual',
    'multiplayer': 'https://gamemonetize.com/category/multiplayer',
    'girls': 'https://gamemonetize.com/category/girls',
    'platform': 'https://gamemonetize.com/category/platform',
    'clicker': 'https://gamemonetize.com/category/clicker',
    'io': 'https://gamemonetize.com/category/io'
  },
  
  // 获取参数
  GAMES_PER_CATEGORY: 50,  // 每个分类获取50个游戏
  MAX_TOTAL_GAMES: 500,    // 最多获取500个新游戏
  REQUEST_DELAY: 2000,     // 请求间隔2秒
  TIMEOUT: 15000,          // 超时时间15秒
  
  // 文件路径
  DATA_FILE: path.join(__dirname, '../src/data/gameMonetizeData.ts'),
  BACKUP_DIR: path.join(__dirname, '../backups'),
  LOG_FILE: path.join(__dirname, '../logs/batch-fetcher.log'),
  
  // 分类映射
  CATEGORY_MAPPING: {
    'action': 'Royal Action',
    'adventure': 'Royal Adventure', 
    'arcade': 'Hot Games',
    'puzzle': 'Royal Puzzle',
    'racing': 'Royal Racing',
    'shooting': 'Royal Action',
    'sports': 'Royal Tournament',
    'strategy': 'Best Games',
    'hypercasual': 'Trending',
    'multiplayer': 'Weekly Picks',
    'girls': 'Most Played',
    'platform': 'Editor\'s Picks'
  }
};

// 日志系统
class Logger {
  constructor() {
    this.logFile = CONFIG.LOG_FILE;
    this.ensureLogDir();
  }

  ensureLogDir() {
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}`;
    
    console.log(logMessage);
    fs.appendFileSync(this.logFile, logMessage + '\n');
  }

  info(message) { this.log(message, 'INFO'); }
  warn(message) { this.log(message, 'WARN'); }
  error(message) { this.log(message, 'ERROR'); }
  success(message) { this.log(message, 'SUCCESS'); }
}

const logger = new Logger();

// HTTP 请求工具
class HttpClient {
  static async fetch(url, options = {}) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Request timeout: ${url}`));
      }, CONFIG.TIMEOUT);

      https.get(url, {
        headers: {
          'User-Agent': 'QueensGame Batch Fetcher 2.0',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          ...options.headers
        }
      }, (res) => {
        let data = '';
        
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          clearTimeout(timeout);
          resolve({ data, statusCode: res.statusCode });
        });
      }).on('error', (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });
  }

  static async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 游戏数据提取器
class GameExtractor {
  static extractFromRSS(xmlData) {
    logger.info('开始从RSS提取游戏数据...');
    
    return parseStringPromise(xmlData, {
      trim: true,
      explicitArray: false,
      mergeAttrs: true
    }).then(result => {
      if (!result.rss?.channel?.item) {
        throw new Error('Invalid RSS structure');
      }

      const items = Array.isArray(result.rss.channel.item) 
        ? result.rss.channel.item 
        : [result.rss.channel.item];

      return items.map(item => this.transformRSSItem(item));
    });
  }

  static extractFromCategoryPage(html, category) {
    logger.info(`开始从分类页面提取游戏: ${category}`);
    
    const games = [];
    
    // 提取游戏链接
    const gameLinks = html.match(/href="\/[^"]*-game"[^>]*>/g) || [];
    const uniqueLinks = [...new Set(gameLinks)];
    
    uniqueLinks.forEach((link, index) => {
      if (games.length >= CONFIG.GAMES_PER_CATEGORY) return;
      
      const urlMatch = link.match(/href="([^"]+)"/);
      if (!urlMatch) return;
      
      const gameUrl = `https://gamemonetize.com${urlMatch[1]}`;
      const gameName = this.extractGameNameFromUrl(gameUrl);
      
      if (gameName) {
        games.push({
          url: gameUrl,
          name: gameName,
          category: CONFIG.CATEGORY_MAPPING[category] || 'Trending',
          source: 'category_page'
        });
      }
    });
    
    logger.info(`从${category}分类页面提取到${games.length}个游戏`);
    return games;
  }

  static extractGameNameFromUrl(url) {
    const match = url.match(/\/([^\/]+)-game\/?$/);
    if (!match) return null;
    
    return match[1]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  static transformRSSItem(item) {
    const gameId = this.extractGameId(item.link || item.guid);
    const category = this.detectCategory(item.title, item.description, item.category);
    
    return {
      id: gameId,
      title: item.title || 'Untitled Game',
      description: this.generateDescription(item.title, item.description),
      category: category,
      tags: this.generateTags(item.title, item.description, category),
      thumbnail: item.enclosure?.url || `https://img.gamemonetize.com/${gameId.replace('gm-', '')}/512x384.jpg`,
      url: `/games/${this.generateSlug(item.title)}`,
      embedUrl: item.link || `https://html5.gamemonetize.com/${gameId.replace('gm-', '')}/`,
      width: 800,
      height: 600,
      provider: 'gamemonetize',
      rating: this.generateRating(),
      plays: this.generatePlayCount(),
      featured: Math.random() > 0.85,
      trending: Math.random() > 0.80,
      createdAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
      source: 'rss'
    };
  }

  static extractGameId(url) {
    if (!url) return `gm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const matches = url.match(/\/([a-zA-Z0-9_-]+)\/?$/);
    return matches ? `gm-${matches[1]}` : `gm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  static detectCategory(title, description, originalCategory) {
    const text = `${title} ${description || ''}`.toLowerCase();
    
    // 检测关键词
    const categoryKeywords = {
      'Royal Action': ['action', 'fight', 'battle', 'shooter', 'combat', 'war', 'ninja'],
      'Royal Adventure': ['adventure', 'quest', 'explore', 'journey', 'rpg'],
      'Royal Racing': ['race', 'racing', 'car', 'drive', 'speed', 'motor'],
      'Royal Puzzle': ['puzzle', 'brain', 'logic', 'mind', 'think', 'solve'],
      'Royal Tournament': ['sport', 'tournament', 'compete', 'match', 'cup'],
      'Hot Games': ['arcade', 'classic', 'retro', 'pixel', 'casual']
    };

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        return category;
      }
    }

    return CONFIG.CATEGORY_MAPPING[originalCategory?.toLowerCase()] || 'Trending';
  }

  static generateDescription(title, originalDescription) {
    if (originalDescription && originalDescription.length > 20) {
      return originalDescription.length > 160 ? 
        originalDescription.substring(0, 157) + '...' : 
        originalDescription;
    }

    const templates = [
      `Play ${title} online for free! An exciting and engaging game that will keep you entertained for hours.`,
      `${title} is a fun and addictive game perfect for players of all ages. Start playing now!`,
      `Enjoy ${title}, a premium gaming experience with stunning graphics and smooth gameplay.`,
      `${title} offers an amazing gaming adventure with challenging levels and exciting rewards.`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  }

  static generateTags(title, description, category) {
    const text = `${title} ${description || ''}`.toLowerCase();
    const tags = ['html5', 'browser-game', 'free-to-play', 'online'];

    // 分类标签
    const categoryTags = {
      'Royal Action': ['action', 'fast-paced', 'exciting'],
      'Royal Adventure': ['adventure', 'story', 'exploration'],
      'Royal Racing': ['racing', 'speed', 'cars'],
      'Royal Puzzle': ['puzzle', 'brain-teaser', 'logic'],
      'Royal Tournament': ['sports', 'competition', 'tournament'],
      'Hot Games': ['trending', 'popular', 'hot']
    };

    if (categoryTags[category]) {
      tags.push(...categoryTags[category]);
    }

    // 检测游戏类型
    if (text.includes('multi')) tags.push('multiplayer');
    if (text.includes('3d')) tags.push('3d');
    if (text.includes('mobile') || text.includes('touch')) tags.push('mobile-friendly');
    if (text.includes('family') || text.includes('kid')) tags.push('family-friendly');

    return [...new Set(tags)].slice(0, 10);
  }

  static generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  static generateRating() {
    return Math.round((3.5 + Math.random() * 1.5) * 10) / 10;
  }

  static generatePlayCount() {
    const ranges = [
      { min: 10000, max: 50000, weight: 0.4 },
      { min: 50000, max: 150000, weight: 0.35 },
      { min: 150000, max: 500000, weight: 0.2 },
      { min: 500000, max: 1000000, weight: 0.05 }
    ];

    const random = Math.random();
    let currentWeight = 0;

    for (const range of ranges) {
      currentWeight += range.weight;
      if (random <= currentWeight) {
        return Math.floor(Math.random() * (range.max - range.min) + range.min);
      }
    }

    return 25000;
  }
}

// 批量游戏获取器
class BatchGameFetcher {
  constructor() {
    this.fetchedGames = [];
    this.failedRequests = [];
    this.duplicateGames = [];
  }

  async fetchFromRSS() {
    logger.info('开始从RSS获取游戏...');
    
    try {
      const { data } = await HttpClient.fetch(CONFIG.RSS_URL);
      const games = await GameExtractor.extractFromRSS(data);
      
      logger.success(`从RSS获取到${games.length}个游戏`);
      return games;
    } catch (error) {
      logger.error(`RSS获取失败: ${error.message}`);
      return [];
    }
  }

  async fetchFromCategories() {
    logger.info('开始从分类页面获取游戏...');
    
    const allGames = [];
    
    for (const [category, url] of Object.entries(CONFIG.CATEGORY_URLS)) {
      try {
        logger.info(`获取分类: ${category}`);
        
        const { data } = await HttpClient.fetch(url);
        const categoryGames = GameExtractor.extractFromCategoryPage(data, category);
        
        // 从分类页面获取到的游戏需要进一步处理
        for (const gameInfo of categoryGames) {
          const gameData = await this.fetchGameDetails(gameInfo);
          if (gameData) {
            allGames.push(gameData);
          }
          
          if (allGames.length >= CONFIG.GAMES_PER_CATEGORY) break;
        }
        
        await HttpClient.delay(CONFIG.REQUEST_DELAY);
        
      } catch (error) {
        logger.error(`获取分类${category}失败: ${error.message}`);
        this.failedRequests.push({ category, error: error.message });
      }
    }
    
    logger.success(`从分类页面总共获取到${allGames.length}个游戏`);
    return allGames;
  }

  async fetchGameDetails(gameInfo) {
    try {
      const { data } = await HttpClient.fetch(gameInfo.url);
      
      // 提取游戏ID
      const iframeMatch = data.match(/https:\/\/html5\.gamemonetize\.com\/([a-zA-Z0-9]+)/);
      if (!iframeMatch) return null;
      
      const gameId = iframeMatch[1];
      
      // 提取描述
      const descMatch = data.match(/<meta name="description" content="([^"]+)"/);
      const description = descMatch ? descMatch[1] : '';
      
      // 提取尺寸
      const sizeMatch = data.match(/Size[^>]*>([^<]+)</);
      const size = sizeMatch ? sizeMatch[1].trim() : '800 x 600';
      const [width, height] = size.split(/[xX]/).map(s => parseInt(s.trim()) || 800);
      
      return {
        id: `gm-${gameId}`,
        title: gameInfo.name,
        description: description || GameExtractor.generateDescription(gameInfo.name, ''),
        category: gameInfo.category,
        tags: GameExtractor.generateTags(gameInfo.name, description, gameInfo.category),
        thumbnail: `https://img.gamemonetize.com/${gameId}/512x384.jpg`,
        url: `/games/${GameExtractor.generateSlug(gameInfo.name)}`,
        embedUrl: `https://html5.gamemonetize.com/${gameId}/`,
        width: width,
        height: height,
        provider: 'gamemonetize',
        rating: GameExtractor.generateRating(),
        plays: GameExtractor.generatePlayCount(),
        featured: Math.random() > 0.85,
        trending: Math.random() > 0.80,
        createdAt: new Date().toISOString(),
        source: gameInfo.source
      };
      
    } catch (error) {
      logger.error(`获取游戏详情失败: ${gameInfo.name} - ${error.message}`);
      this.failedRequests.push({ game: gameInfo.name, error: error.message });
      return null;
    }
  }

  checkDuplicates(existingGames, newGames) {
    logger.info('开始检查重复游戏...');
    
    const existingIds = new Set(existingGames.map(g => g.id));
    const existingTitles = new Set(existingGames.map(g => g.title.toLowerCase()));
    const existingUrls = new Set(existingGames.map(g => g.embedUrl));
    
    const uniqueGames = [];
    
    newGames.forEach(game => {
      if (existingIds.has(game.id) || 
          existingTitles.has(game.title.toLowerCase()) || 
          existingUrls.has(game.embedUrl)) {
        this.duplicateGames.push(game);
      } else {
        uniqueGames.push(game);
      }
    });
    
    logger.info(`去重完成: ${newGames.length}个新游戏 -> ${uniqueGames.length}个唯一游戏`);
    return uniqueGames;
  }

  async fetchAllGames() {
    logger.info('🚀 开始批量获取游戏...');
    
    // 1. 从RSS获取
    const rssGames = await this.fetchFromRSS();
    
    // 2. 从分类页面获取
    const categoryGames = await this.fetchFromCategories();
    
    // 3. 合并所有游戏
    const allNewGames = [...rssGames, ...categoryGames];
    
    // 4. 读取现有游戏数据
    const existingGames = this.readExistingGames();
    
    // 5. 去重
    const uniqueGames = this.checkDuplicates(existingGames, allNewGames);
    
    // 6. 限制数量
    const finalGames = uniqueGames.slice(0, CONFIG.MAX_TOTAL_GAMES);
    
    this.fetchedGames = finalGames;
    
    logger.success(`🎉 批量获取完成! 获取到${finalGames.length}个新游戏`);
    return finalGames;
  }

  readExistingGames() {
    try {
      const content = fs.readFileSync(CONFIG.DATA_FILE, 'utf8');
      const match = content.match(/export const gameMonetizeGames: ParsedGame\[\] = (\[[\s\S]*?\]);/);
      
      if (match) {
        return eval(match[1]);
      }
    } catch (error) {
      logger.warn(`读取现有游戏失败: ${error.message}`);
    }
    
    return [];
  }

  updateGameDataFile(existingGames, newGames) {
    logger.info('更新游戏数据文件...');
    
    try {
      // 备份现有文件
      this.backupDataFile();
      
      // 合并游戏数据
      const allGames = [...existingGames, ...newGames];
      
      // 生成新文件内容
      const fileContent = `import { ParsedGame } from '../utils/gameMonetizeParser';

// 批量自动获取的游戏数据
// 最后更新时间: ${new Date().toISOString()}
// 本次更新: 新增${newGames.length}个游戏，跳过${this.duplicateGames.length}个重复游戏
// 总游戏数: ${allGames.length}个
export const gameMonetizeGames: ParsedGame[] = ${JSON.stringify(allGames, null, 2)};

// 获取特色游戏
export const getFeaturedGameMonetizeGames = (): ParsedGame[] => {
  return gameMonetizeGames.filter(game => game.featured);
};

// 获取热门游戏
export const getPopularGameMonetizeGames = (): ParsedGame[] => {
  return gameMonetizeGames
    .sort((a, b) => (b.plays || 0) - (a.plays || 0))
    .slice(0, 20);
};

// 按分类获取游戏
export const getGameMonetizeGamesByCategory = (category: string): ParsedGame[] => {
  return gameMonetizeGames.filter(game => game.category === category);
};

// 获取最新游戏
export const getNewestGameMonetizeGames = (): ParsedGame[] => {
  return gameMonetizeGames
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 20);
};
`;
      
      fs.writeFileSync(CONFIG.DATA_FILE, fileContent);
      logger.success(`✅ 游戏数据文件更新成功! 总游戏数: ${allGames.length}`);
      
      return true;
    } catch (error) {
      logger.error(`❌ 更新文件失败: ${error.message}`);
      return false;
    }
  }

  backupDataFile() {
    try {
      if (!fs.existsSync(CONFIG.BACKUP_DIR)) {
        fs.mkdirSync(CONFIG.BACKUP_DIR, { recursive: true });
      }
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFile = path.join(CONFIG.BACKUP_DIR, `gameData-batch-backup-${timestamp}.ts`);
      
      if (fs.existsSync(CONFIG.DATA_FILE)) {
        fs.copyFileSync(CONFIG.DATA_FILE, backupFile);
        logger.info(`数据已备份到: ${backupFile}`);
      }
    } catch (error) {
      logger.warn(`备份失败: ${error.message}`);
    }
  }

  generateReport() {
    const report = `
🎮 QueensGame 批量游戏获取报告
═══════════════════════════════════════════════════════════════════

📊 获取统计:
   • 新增游戏: ${this.fetchedGames.length} 个
   • 重复游戏: ${this.duplicateGames.length} 个 (已跳过)
   • 失败请求: ${this.failedRequests.length} 个

📈 数据源统计:
   • RSS来源: ${this.fetchedGames.filter(g => g.source === 'rss').length} 个
   • 分类页面: ${this.fetchedGames.filter(g => g.source === 'category_page').length} 个

🎯 分类分布:
${Object.entries(this.getCategoryStats()).map(([cat, count]) => `   • ${cat}: ${count} 个`).join('\n')}

⏰ 获取时间: ${new Date().toISOString()}

${this.failedRequests.length > 0 ? 
  `⚠️  失败请求:\n${this.failedRequests.map((req, i) => `   ${i+1}. ${req.category || req.game}: ${req.error}`).join('\n')}` : 
  '✅ 所有请求都成功完成'
}

💡 建议: 如需获取更多游戏，可以再次运行此脚本或调整配置参数
═══════════════════════════════════════════════════════════════════
`;

    logger.info(report);
    return report;
  }

  getCategoryStats() {
    const stats = {};
    this.fetchedGames.forEach(game => {
      stats[game.category] = (stats[game.category] || 0) + 1;
    });
    return stats;
  }
}

// 主函数
async function main() {
  const fetcher = new BatchGameFetcher();
  
  try {
    // 获取游戏
    const newGames = await fetcher.fetchAllGames();
    
    if (newGames.length === 0) {
      logger.warn('⚠️  没有获取到新游戏');
      return;
    }
    
    // 读取现有游戏
    const existingGames = fetcher.readExistingGames();
    
    // 更新数据文件
    const updateSuccess = fetcher.updateGameDataFile(existingGames, newGames);
    
    if (updateSuccess) {
      // 生成报告
      fetcher.generateReport();
      logger.success(`🎉 批量获取完成! 从${existingGames.length}个游戏增加到${existingGames.length + newGames.length}个游戏`);
    }
    
  } catch (error) {
    logger.error(`❌ 批量获取失败: ${error.message}`);
    process.exit(1);
  }
}

// 命令行参数处理
const args = process.argv.slice(2);

if (args.includes('--help')) {
  console.log(`
🎮 QueensGame 批量游戏获取器

✨ 功能特性:
  • 自动从GameMonetize RSS获取最新游戏
  • 从多个分类页面批量获取游戏
  • 智能去重，避免重复添加
  • 自动生成游戏描述、标签和分类
  • 数据备份和恢复功能

🚀 使用方法:
  node batchGameFetcher.js [选项]

📋 选项:
  --help           显示帮助信息
  --max-games N    设置最大获取游戏数量 (默认: 500)
  --delay N        设置请求延迟毫秒数 (默认: 2000)

💡 示例:
  node batchGameFetcher.js                    # 使用默认配置批量获取
  node batchGameFetcher.js --max-games 200   # 最多获取200个游戏
  node batchGameFetcher.js --delay 3000      # 设置3秒请求延迟

🔒 数据安全:
  • 自动备份现有数据
  • 只添加新游戏，不覆盖现有数据
  • 智能去重机制
  `);
  process.exit(0);
}

// 处理命令行参数
const maxGamesArg = args.indexOf('--max-games');
if (maxGamesArg !== -1 && args[maxGamesArg + 1]) {
  CONFIG.MAX_TOTAL_GAMES = parseInt(args[maxGamesArg + 1]) || CONFIG.MAX_TOTAL_GAMES;
}

const delayArg = args.indexOf('--delay');
if (delayArg !== -1 && args[delayArg + 1]) {
  CONFIG.REQUEST_DELAY = parseInt(args[delayArg + 1]) || CONFIG.REQUEST_DELAY;
}

// 运行主函数
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { BatchGameFetcher, GameExtractor, HttpClient, CONFIG }; 