#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

const DATA_FILE = path.join(__dirname, 'src/data/gameData.ts');
const SITEMAP_FILE = path.join(__dirname, 'public/sitemap.xml');
const LOG_FILE = path.join(__dirname, 'logs/sitemap-generation.log');

// 确保日志目录存在
const logDir = path.dirname(LOG_FILE);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// 日志函数
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  
  // 写入日志文件
  fs.appendFileSync(LOG_FILE, logMessage + '\n');
}

// 读取游戏数据 - 从实际的gameData.ts文件中读取
function readGameData() {
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    
    // 尝试匹配 allGames 导出
    const allGamesMatch = content.match(/export const allGames: Game\[\] = [\s\S]*?\.sort\([\s\S]*?\);/);
    if (allGamesMatch) {
      // 提取游戏数据模块中的导入和相关定义
      const gameMonetizeMatch = content.match(/import.*gameMonetizeGames.*from.*gameMonetizeData/);
      if (gameMonetizeMatch) {
        // 读取 gameMonetizeData.ts
        const gameMonetizeFile = path.join(__dirname, 'src/data/gameMonetizeData.ts');
        const gameMonetizeContent = fs.readFileSync(gameMonetizeFile, 'utf8');
        const gameMonetizeDataMatch = gameMonetizeContent.match(/export const gameMonetizeGames[\s\S]*?= (\[[\s\S]*?\]);/);
        
        if (gameMonetizeDataMatch) {
          const gameDataString = gameMonetizeDataMatch[1];
          const games = eval(gameDataString);
          log(`📚 从 gameMonetizeData 中读取到 ${games.length} 个游戏`);
          return games;
        }
      }
    }
    
    throw new Error('无法解析游戏数据');
  } catch (error) {
    log(`❌ 读取游戏数据失败: ${error.message}`);
    // 返回一个基本的游戏列表作为备用
    return [
      { id: 'drift-boss', title: 'Drift Boss', url: '/games/drift-boss', featured: true },
      { id: 'hollow-knight-silksong', title: 'Hollow Knight Silksong', url: '/hollow-knight-silksong', featured: true }
    ];
  }
}

// 生成站点地图XML
function generateSitemapXML(games) {
  const baseUrl = 'https://queensgame.games'; // 使用正确的域名
  const currentDate = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- 首页 -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- 所有游戏页面 -->
  <url>
    <loc>${baseUrl}/games</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 特色页面: Hollow Knight Silksong -->
  <url>
    <loc>${baseUrl}/hollow-knight-silksong</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 特色页面: Drift Boss -->
  <url>
    <loc>${baseUrl}/drift-boss</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 特色页面: Yu-Gi-Oh! GENESYS -->
  <url>
    <loc>${baseUrl}/yugioh-genesys</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;

  // 使用Set来去重，避免重复的游戏URL
  const uniqueGameUrls = new Set();
  const validGames = [];

  // 添加所有唯一的游戏页面
  games.forEach(game => {
    if (game && game.url && !uniqueGameUrls.has(game.url)) {
      uniqueGameUrls.add(game.url);
      validGames.push(game);
    }
  });

  log(`🎮 找到 ${validGames.length} 个唯一游戏页面`);

  validGames.forEach(game => {
    const gameUrl = `${baseUrl}${game.url}`;
    const gamePriority = game.featured ? '0.9' : '0.8';
    const gameChangeFreq = game.featured ? 'weekly' : 'monthly';
    
    xml += `

  <!-- 游戏页面: ${game.title || 'Unknown Game'} -->
  <url>
    <loc>${gameUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${gameChangeFreq}</changefreq>
    <priority>${gamePriority}</priority>
  </url>`;
  });

  // 添加主题页面 - 基于实际存在的路由 /topic/:topicSlug
  const topicPages = [
    { slug: 'hollow-knight-silksong', title: 'Hollow Knight Silksong Topic' }
  ];
  
  topicPages.forEach(topic => {
    xml += `

  <!-- 主题页面: ${topic.title} -->
  <url>
    <loc>${baseUrl}/topic/${topic.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  xml += `

</urlset>`;

  return xml;
}

// 生成站点地图
function generateSitemap() {
  try {
    log('🗺️  开始生成站点地图...');
    
    // 读取游戏数据
    const games = readGameData();
    if (games.length === 0) {
      throw new Error('没有找到游戏数据');
    }
    
    log(`📚 找到 ${games.length} 个游戏`);
    
    // 生成XML内容
    const sitemapXML = generateSitemapXML(games);
    
    // 写入文件
    fs.writeFileSync(SITEMAP_FILE, sitemapXML, 'utf8');
    
    // 计算实际页面数量
    const uniqueGameUrls = new Set();
    games.forEach(game => {
      if (game && game.url) {
        uniqueGameUrls.add(game.url);
      }
    });
    
    const totalPages = uniqueGameUrls.size + 5; // 首页 + /games + 2个特色页面 + 1个主题页面
    
    log(`✅ 站点地图生成成功: ${SITEMAP_FILE}`);
    log(`📊 包含页面数量: ${totalPages} 个页面`);
    log(`📅 生成时间: ${new Date().toISOString()}`);
    
    // 显示站点地图统计
    const stats = {
      totalPages: totalPages,
      homePage: 1,
      gamesPage: 1,
      featuredPages: 2,
      topicPages: 1,
      gamePages: uniqueGameUrls.size
    };
    
    log('\n📈 站点地图统计:');
    log(`   • 首页: ${stats.homePage} 个`);
    log(`   • 游戏总览页: ${stats.gamesPage} 个`);
    log(`   • 特色页面: ${stats.featuredPages} 个`);
    log(`   • 主题页面: ${stats.topicPages} 个`);
    log(`   • 游戏详情页: ${stats.gamePages} 个`);
    log(`   • 总计: ${stats.totalPages} 个页面`);
    
    return true;
  } catch (error) {
    log(`❌ 生成站点地图失败: ${error.message}`);
    return false;
  }
}

// 主函数
function main() {
  log('🎮 === QueensGame 站点地图生成器 ===');
  log('🌐 目标域名: https://queensgame.games');
  
  if (generateSitemap()) {
    log('\n🎉 站点地图生成完成！');
    log('📝 下一步操作:');
    log('   1. 将 sitemap.xml 提交到 Google Search Console');
    log('   2. 将 sitemap.xml 提交到 Bing Webmaster Tools');
    log('   3. 检查 robots.txt 是否正确配置');
    log('   4. 验证所有页面都能正常访问');
    log('   5. 确保所有游戏页面路由都已实现');
  } else {
    log('\n❌ 站点地图生成失败，请检查错误日志');
    process.exit(1);
  }
}

// 运行脚本
main(); 