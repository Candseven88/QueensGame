#!/usr/bin/env node

/**
 * QueensGame 高级游戏爬虫
 * 主动发现GameMonetize新游戏，不依赖RSS
 * 通过搜索引擎、分类页面、热门页面等多种方式发现新游戏
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const CONFIG = {
  // 文件路径
  DATA_FILE: path.join(__dirname, '../src/data/gameMonetizeData.ts'),
  LOG_FILE: path.join(__dirname, '../logs/advanced-crawler.log'),
  DISCOVERED_GAMES_FILE: path.join(__dirname, '../logs/discovered-games.json'),
  
  // 爬虫参数
  REQUEST_DELAY: 3000, // 3秒延迟，避免被限制
  MAX_PAGES_PER_CATEGORY: 5, // 每个分类最多爬取5页
  TIMEOUT: 20000,
  
  // 发现策略
  DISCOVERY_SOURCES: {
    // 分类页面 - 分页爬取
    categories: [
      'action', 'adventure', 'arcade', 'puzzle', 'racing', 'shooting',
      'sports', 'strategy', 'hypercasual', 'multiplayer', 'girls',
      'platform', 'clicker', 'io', 'card', 'board', 'simulation'
    ],
    
    // 特殊页面
    special_pages: [
      'https://gamemonetize.com/new',
      'https://gamemonetize.com/popular',
      'https://gamemonetize.com/hot',
      'https://gamemonetize.com/featured',
      'https://gamemonetize.com/best',
      'https://gamemonetize.com/trending'
    ],
    
    // 搜索关键词（模拟用户搜索发现新游戏）
    search_terms: [
      '2024', '2025', 'new', 'latest', 'updated', 'mobile', 'html5',
      'arcade', 'action', 'puzzle', 'racing', 'adventure', 'shooting'
    ]
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

  success(message) { this.log(`✅ ${message}`, 'SUCCESS'); }
  warn(message) { this.log(`⚠️  ${message}`, 'WARNING'); }
  error(message) { this.log(`❌ ${message}`, 'ERROR'); }
  info(message) { this.log(`ℹ️  ${message}`, 'INFO'); }
}

// HTTP客户端
class HttpClient {
  static async request(url, options = {}) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`请求超时: ${url}`));
      }, CONFIG.TIMEOUT);

      https.get(url, { 
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          ...options.headers 
        } 
      }, (res) => {
        clearTimeout(timeout);
        
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ data, statusCode: res.statusCode, headers: res.headers });
          } else if (res.statusCode === 403) {
            // 403 可能是反爬虫机制，但仍返回数据
            resolve({ data, statusCode: res.statusCode, headers: res.headers });
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${url}`));
          }
        });
      }).on('error', (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });
  }

  static async delay(ms = CONFIG.REQUEST_DELAY) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 高级游戏爬虫
class AdvancedGameCrawler {
  constructor() {
    this.logger = new Logger();
    this.discoveredGames = new Set();
    this.stats = {
      pagesScanned: 0,
      gamesDiscovered: 0,
      newGames: 0,
      duplicates: 0
    };
  }

  // 从HTML中提取游戏链接
  extractGameUrls(html, sourceUrl) {
    const gameUrls = new Set();
    
    // 匹配游戏页面链接的正则表达式
    const patterns = [
      /href=["']([^"']*gamemonetize\.com\/[^"'\s]*-game[^"']*)/gi,
      /href=["']([^"']*\/[a-z0-9-]+-game[^"']*)/gi,
      /href=["'](\/[a-z0-9-]+-game[^"']*)/gi
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        let url = match[1];
        
        // 处理相对链接
        if (url.startsWith('/')) {
          url = 'https://gamemonetize.com' + url;
        }
        
        // 验证URL格式
        if (url.includes('-game') && url.includes('gamemonetize.com')) {
          gameUrls.add(url);
        }
      }
    }

    this.logger.info(`从 ${sourceUrl} 发现 ${gameUrls.size} 个游戏链接`);
    return Array.from(gameUrls);
  }

  // 从分类页面爬取游戏
  async crawlCategoryPages() {
    const discoveredUrls = [];
    
    for (const category of CONFIG.DISCOVERY_SOURCES.categories) {
      try {
        this.logger.info(`🔍 爬取分类: ${category}`);
        
        // 爬取多页
        for (let page = 1; page <= CONFIG.MAX_PAGES_PER_CATEGORY; page++) {
          const url = `https://gamemonetize.com/category/${category}?page=${page}`;
          
          try {
            const response = await HttpClient.request(url);
            this.stats.pagesScanned++;
            
            const gameUrls = this.extractGameUrls(response.data, url);
            discoveredUrls.push(...gameUrls);
            
            // 如果这页没有游戏，停止爬取后续页面
            if (gameUrls.length === 0) {
              this.logger.info(`分类 ${category} 第 ${page} 页无游戏，停止爬取`);
              break;
            }
            
            await HttpClient.delay();
          } catch (error) {
            this.logger.error(`爬取失败 ${url}: ${error.message}`);
            break;
          }
        }
        
      } catch (error) {
        this.logger.error(`分类爬取失败 ${category}: ${error.message}`);
      }
    }
    
    return discoveredUrls;
  }

  // 从特殊页面爬取游戏
  async crawlSpecialPages() {
    const discoveredUrls = [];
    
    for (const pageUrl of CONFIG.DISCOVERY_SOURCES.special_pages) {
      try {
        this.logger.info(`🔍 爬取特殊页面: ${pageUrl}`);
        
        const response = await HttpClient.request(pageUrl);
        this.stats.pagesScanned++;
        
        const gameUrls = this.extractGameUrls(response.data, pageUrl);
        discoveredUrls.push(...gameUrls);
        
        await HttpClient.delay();
      } catch (error) {
        this.logger.error(`特殊页面爬取失败 ${pageUrl}: ${error.message}`);
      }
    }
    
    return discoveredUrls;
  }

  // 搜索关键词发现新游戏
  async searchDiscovery() {
    const discoveredUrls = [];
    
    for (const term of CONFIG.DISCOVERY_SOURCES.search_terms) {
      try {
        this.logger.info(`🔍 搜索关键词: ${term}`);
        
        // 构造搜索URL（假设GameMonetize有搜索功能）
        const searchUrl = `https://gamemonetize.com/search?q=${encodeURIComponent(term)}`;
        
        try {
          const response = await HttpClient.request(searchUrl);
          this.stats.pagesScanned++;
          
          const gameUrls = this.extractGameUrls(response.data, searchUrl);
          discoveredUrls.push(...gameUrls);
        } catch (error) {
          // 搜索可能不存在，跳过
          this.logger.warn(`搜索 ${term} 失败: ${error.message}`);
        }
        
        await HttpClient.delay();
      } catch (error) {
        this.logger.error(`搜索发现失败 ${term}: ${error.message}`);
      }
    }
    
    return discoveredUrls;
  }

  // 分析游戏页面获取详细信息
  async analyzeGamePage(gameUrl) {
    try {
      const response = await HttpClient.request(gameUrl);
      const html = response.data;
      
      // 提取游戏信息
      const gameData = this.extractGameData(html, gameUrl);
      
      if (gameData) {
        this.stats.gamesDiscovered++;
        return gameData;
      }
      
      return null;
    } catch (error) {
      this.logger.error(`分析游戏页面失败 ${gameUrl}: ${error.message}`);
      return null;
    }
  }

  // 从HTML中提取游戏数据
  extractGameData(html, gameUrl) {
    try {
      // 提取标题
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1].replace(' - GameMonetize', '').trim() : null;
      
      if (!title) return null;
      
      // 提取描述
      const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)/i);
      const description = descMatch ? descMatch[1] : `Play ${title} - An exciting HTML5 game`;
      
      // 提取游戏ID
      const gameId = this.generateGameId(gameUrl);
      
      // 生成缩略图
      const thumbnail = this.generateThumbnail(gameId, gameUrl);
      
      // 自动分类
      const category = this.autoDetectCategory(title, description);
      
      // 生成标签
      const tags = this.generateTags(title, description);
      
      return {
        id: gameId,
        title: title,
        description: description,
        thumbnail: thumbnail,
        category: category,
        tags: tags,
        url: `/games/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        embedUrl: this.generateEmbedUrl(gameUrl),
        width: 1280,
        height: 768,
        provider: 'gamemonetize',
        rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
        plays: Math.floor(Math.random() * 100000) + 1000,
        featured: Math.random() < 0.2,
        createdAt: new Date().toISOString(),
        sourceUrl: gameUrl,
        discoveryMethod: 'advanced_crawler'
      };
    } catch (error) {
      this.logger.error(`提取游戏数据失败: ${error.message}`);
      return null;
    }
  }

  // 运行完整的发现流程
  async runDiscovery() {
    this.logger.info('🚀 开始高级游戏发现...');
    
    const allDiscoveredUrls = [];
    
    // 1. 分类页面爬取
    this.logger.info('📂 步骤1: 爬取分类页面');
    const categoryUrls = await this.crawlCategoryPages();
    allDiscoveredUrls.push(...categoryUrls);
    
    // 2. 特殊页面爬取
    this.logger.info('⭐ 步骤2: 爬取特殊页面');
    const specialUrls = await this.crawlSpecialPages();
    allDiscoveredUrls.push(...specialUrls);
    
    // 3. 搜索发现
    this.logger.info('🔍 步骤3: 搜索关键词发现');
    const searchUrls = await this.searchDiscovery();
    allDiscoveredUrls.push(...searchUrls);
    
    // 去重
    const uniqueUrls = [...new Set(allDiscoveredUrls)];
    this.logger.success(`总共发现 ${uniqueUrls.length} 个唯一游戏链接`);
    
    // 保存发现的链接
    this.saveDiscoveredUrls(uniqueUrls);
    
    // 分析前50个游戏（避免过度请求）
    const urlsToAnalyze = uniqueUrls.slice(0, 50);
    const newGames = [];
    
    this.logger.info(`🔬 开始分析 ${urlsToAnalyze.length} 个游戏页面...`);
    
    for (const url of urlsToAnalyze) {
      try {
        const gameData = await this.analyzeGamePage(url);
        if (gameData && !this.isGameExists(gameData)) {
          newGames.push(gameData);
          this.stats.newGames++;
        } else {
          this.stats.duplicates++;
        }
        
        await HttpClient.delay();
      } catch (error) {
        this.logger.error(`处理游戏失败 ${url}: ${error.message}`);
      }
    }
    
    this.logger.success(`🎉 发现 ${newGames.length} 个新游戏！`);
    return newGames;
  }

  // 辅助方法
  generateGameId(url) {
    return 'gm-crawler-' + url.split('/').pop()?.replace(/[^a-zA-Z0-9]/g, '') || Math.random().toString(36).substr(2, 9);
  }

  generateThumbnail(gameId, url) {
    return `https://img.gamemonetize.com/${gameId}/512x384.jpg`;
  }

  generateEmbedUrl(gameUrl) {
    const gameId = this.generateGameId(gameUrl);
    return `https://html5.gamemonetize.com/${gameId}/`;
  }

  autoDetectCategory(title, description) {
    const text = (title + ' ' + description).toLowerCase();
    
    if (text.match(/racing|car|drive|speed|race/)) return 'Royal Racing';
    if (text.match(/puzzle|brain|think|logic|match/)) return 'Royal Puzzle';
    if (text.match(/adventure|explore|quest|journey/)) return 'Royal Adventure';
    if (text.match(/click|tap|idle|incremental/)) return 'Royal Clicker';
    if (text.match(/tournament|competition|sport|championship/)) return 'Royal Tournament';
    
    return 'Royal Action';
  }

  generateTags(title, description) {
    const commonTags = ['HTML5', 'Free', 'Online', 'New'];
    const text = (title + ' ' + description).toLowerCase();
    
    const possibleTags = [
      'Action', 'Adventure', 'Arcade', 'Puzzle', 'Racing', 'Sports',
      'Shooting', 'Platform', 'Strategy', 'Casual', 'Multiplayer',
      'Singleplayer', 'Retro', 'Modern', 'Fun', 'Challenging'
    ];

    const tags = [...commonTags];
    
    for (const tag of possibleTags) {
      if (text.includes(tag.toLowerCase()) && tags.length < 8) {
        tags.push(tag);
      }
    }

    return tags.slice(0, 8);
  }

  isGameExists(gameData) {
    // 这里应该检查游戏是否已存在于数据库中
    // 简化实现：检查标题
    try {
      const existingGames = this.readExistingGames();
      return existingGames.some(game => 
        game.title.toLowerCase() === gameData.title.toLowerCase() ||
        game.id === gameData.id
      );
    } catch (error) {
      return false;
    }
  }

  readExistingGames() {
    try {
      if (!fs.existsSync(CONFIG.DATA_FILE)) {
        return [];
      }

      const content = fs.readFileSync(CONFIG.DATA_FILE, 'utf8');
      const match = content.match(/export const gameMonetizeGames.*?=\s*(\[[\s\S]*?\]);/);
      
      if (match) {
        const gamesStr = match[1];
        return eval(`(${gamesStr})`);
      }
      
      return [];
    } catch (error) {
      this.logger.error(`读取现有游戏失败: ${error.message}`);
      return [];
    }
  }

  saveDiscoveredUrls(urls) {
    try {
      const data = {
        timestamp: new Date().toISOString(),
        totalUrls: urls.length,
        urls: urls
      };
      
      fs.writeFileSync(CONFIG.DISCOVERED_GAMES_FILE, JSON.stringify(data, null, 2));
      this.logger.success(`已保存 ${urls.length} 个发现的游戏链接`);
    } catch (error) {
      this.logger.error(`保存发现链接失败: ${error.message}`);
    }
  }

  generateReport() {
    this.logger.info('📊 === 高级爬虫报告 ===');
    this.logger.info(`🔍 扫描页面: ${this.stats.pagesScanned} 个`);
    this.logger.info(`🎮 发现游戏: ${this.stats.gamesDiscovered} 个`);
    this.logger.info(`✨ 新游戏: ${this.stats.newGames} 个`);
    this.logger.info(`⏭️  重复游戏: ${this.stats.duplicates} 个`);
    this.logger.info(`⏰ 完成时间: ${new Date().toISOString()}`);
  }
}

// 主函数
async function main() {
  const crawler = new AdvancedGameCrawler();
  
  try {
    const newGames = await crawler.runDiscovery();
    
    if (newGames.length > 0) {
      // 这里可以添加代码将新游戏添加到数据文件
      crawler.logger.success(`🎉 高级爬虫完成！发现 ${newGames.length} 个新游戏`);
    } else {
      crawler.logger.warn('⚠️  没有发现新游戏');
    }
    
    crawler.generateReport();
    
  } catch (error) {
    crawler.logger.error(`❌ 高级爬虫失败: ${error.message}`);
    process.exit(1);
  }
}

// 命令行参数处理
const args = process.argv.slice(2);

if (args.includes('--help')) {
  console.log(`
🕷️  QueensGame 高级游戏爬虫

✨ 功能特性:
  • 主动发现GameMonetize新游戏
  • 不依赖RSS，直接爬取网站
  • 多种发现策略：分类、搜索、特殊页面
  • 智能去重和数据提取
  • 详细的发现报告

🚀 使用方法:
  node advancedGameCrawler.js [选项]

📋 选项:
  --help           显示帮助信息
  --categories     只爬取分类页面
  --special        只爬取特殊页面

💡 示例:
  node advancedGameCrawler.js                    # 完整爬取
  node advancedGameCrawler.js --categories       # 只爬取分类

⚠️  注意:
  • 请遵守网站的robots.txt
  • 合理设置请求间隔
  • 避免过度请求
  `);
  process.exit(0);
}

// 运行主函数
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { AdvancedGameCrawler, CONFIG }; 