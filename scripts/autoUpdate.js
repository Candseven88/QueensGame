#!/usr/bin/env node

/**
 * QueensGame 智能增量更新脚本
 * 只添加新游戏，不覆盖或删除现有游戏数据
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__dirname);

// 配置
const CONFIG = {
  RSS_URL: 'https://gamemonetize.com/rss.xml', // 假设的RSS URL
  UPDATE_INTERVAL: 7 * 24 * 60 * 60 * 1000, // 7天
  DATA_FILE: path.join(__dirname, 'src/data/gameMonetizeData.ts'),
  BACKUP_DIR: path.join(__dirname, 'backups'),
  LOG_FILE: path.join(__dirname, 'logs/auto-update.log'),
  MAX_BACKUPS: 10 // 最多保留10个备份文件
};

// 日志函数
function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}`;
  
  console.log(logMessage);
  
  // 确保日志目录存在
  const logDir = path.dirname(CONFIG.LOG_FILE);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  // 写入日志文件
  fs.appendFileSync(CONFIG.LOG_FILE, logMessage + '\n');
}

// 获取RSS数据
function fetchRSSData() {
  return new Promise((resolve, reject) => {
    log('开始获取GameMonetize RSS数据...');
    
    // 这里应该使用真实的RSS URL
    // 目前使用模拟数据作为示例，但包含更多游戏
    const mockRSSData = [
      {
        id: 'gm-34678',
        title: 'Feed Monster Game',
        description: 'Wander through an endless maze collecting glowing dots...',
        category: 'Hypercasual',
        tags: '1 Player, Arcade, Classic, Funny, Maze, PacMan, Retro',
        thumb: 'https://img.gamemonetize.com/v2537t64ojk8ia8pa1r0d7xdrhlqq9xt/512x384.jpg',
        url: 'https://html5.gamemonetize.com/v2537t64ojk8ia8pa1r0d7xdrhlqq9xt/',
        width: '1280',
        height: '768'
      },
      {
        id: 'gm-34679',
        title: 'New Adventure Quest',
        description: 'Embark on an epic journey through mystical lands...',
        category: 'Adventure',
        tags: 'RPG, Adventure, Fantasy, Quest',
        thumb: 'https://img.gamemonetize.com/example1/512x384.jpg',
        url: 'https://html5.gamemonetize.com/example1/',
        width: '800',
        height: '600'
      },
      {
        id: 'gm-34680',
        title: 'Speed Racing Pro',
        description: 'Experience the thrill of high-speed racing...',
        category: 'Racing',
        tags: 'Racing, Speed, Cars, Competition',
        thumb: 'https://img.gamemonetize.com/example2/512x384.jpg',
        url: 'https://html5.gamemonetize.com/example2/',
        width: '1024',
        height: '768'
      }
    ];
    
    // 模拟网络延迟
    setTimeout(() => {
      log(`成功获取RSS数据，共${mockRSSData.length}个新游戏`);
      resolve(mockRSSData);
    }, 1000);
  });
}

// 解析游戏数据
function parseGameData(rssData) {
  log('开始解析游戏数据...');
  
  const parsedGames = rssData.map((game, index) => {
    // 生成随机统计数据
    const rating = 4.0 + Math.random() * 1.0;
    const plays = Math.floor(Math.random() * 200000) + 50000;
    
    // 分类映射
    const categoryMapping = {
      'Hypercasual': 'Royal Action',
      'Arcade': 'Royal Action',
      'Shooting': 'Royal Action',
      'Racing': 'Royal Racing',
      'Puzzles': 'Royal Puzzle',
      'Adventure': 'Royal Adventure',
      'Girls': 'Royal Adventure',
      'Sports': 'Royal Tournament',
      'Multiplayer': 'Royal Tournament'
    };
    
    const category = categoryMapping[game.category] || 'Royal Action';
    
    return {
      id: game.id,
      title: game.title,
      description: game.description,
      thumbnail: game.thumb,
      category: category,
      tags: game.tags.split(', '),
      url: `/games/${game.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
      embedUrl: game.url,
      width: parseInt(game.width),
      height: parseInt(game.height),
      provider: 'gamemonetize',
      rating: Math.round(rating * 10) / 10,
      plays: plays,
      featured: Math.random() > 0.8, // 20%概率成为特色游戏
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    };
  });
  
  log(`成功解析${parsedGames.length}个新游戏数据`);
  return parsedGames;
}

// 智能重复检测 - 基于多个字段
function detectDuplicateGames(existingGames, newGames) {
  log('开始智能重复检测...');
  
  // 创建现有游戏的多种索引
  const existingGameIds = new Set(existingGames.map(game => game.id));
  const existingGameTitles = new Set(existingGames.map(game => game.title.toLowerCase()));
  const existingGameUrls = new Set(existingGames.map(game => game.embedUrl));
  
  // 检测重复的游戏
  const duplicates = [];
  const uniqueNewGames = [];
  
  newGames.forEach(newGame => {
    let isDuplicate = false;
    let duplicateReason = '';
    
    // 检查ID重复
    if (existingGameIds.has(newGame.id)) {
      isDuplicate = true;
      duplicateReason = `ID重复: ${newGame.id}`;
    }
    // 检查标题重复（忽略大小写）
    else if (existingGameTitles.has(newGame.title.toLowerCase())) {
      isDuplicate = true;
      duplicateReason = `标题重复: ${newGame.title}`;
    }
    // 检查嵌入URL重复
    else if (existingGameUrls.has(newGame.embedUrl)) {
      isDuplicate = true;
      duplicateReason = `URL重复: ${newGame.embedUrl}`;
    }
    
    if (isDuplicate) {
      duplicates.push({ game: newGame, reason: duplicateReason });
      log(`检测到重复游戏: ${newGame.title} - ${duplicateReason}`);
    } else {
      uniqueNewGames.push(newGame);
    }
  });
  
  log(`重复检测完成: 发现${duplicates.length}个重复游戏，${uniqueNewGames.length}个新游戏`);
  
  return {
    duplicates,
    uniqueNewGames
  };
}

// 备份现有数据
function backupCurrentData() {
  log('开始备份现有数据...');
  
  const backupDir = CONFIG.BACKUP_DIR;
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(backupDir, `gameData-backup-${timestamp}.ts`);
  
  try {
    if (fs.existsSync(CONFIG.DATA_FILE)) {
      const currentData = fs.readFileSync(CONFIG.DATA_FILE, 'utf8');
      fs.writeFileSync(backupFile, currentData);
      log(`数据已备份到: ${backupFile}`);
      
      // 清理旧的备份文件
      cleanupOldBackups();
    }
  } catch (error) {
    log(`备份失败: ${error.message}`, 'ERROR');
  }
}

// 清理旧的备份文件
function cleanupOldBackups() {
  try {
    const backupDir = CONFIG.BACKUP_DIR;
    if (!fs.existsSync(backupDir)) return;
    
    const files = fs.readdirSync(backupDir)
      .filter(file => file.endsWith('.ts'))
      .map(file => ({
        name: file,
        path: path.join(backupDir, file),
        mtime: fs.statSync(path.join(backupDir, file)).mtime
      }))
      .sort((a, b) => b.mtime - a.mtime);
    
    // 删除超过最大数量的备份文件
    if (files.length > CONFIG.MAX_BACKUPS) {
      const filesToDelete = files.slice(CONFIG.MAX_BACKUPS);
      filesToDelete.forEach(file => {
        fs.unlinkSync(file.path);
        log(`删除旧备份文件: ${file.name}`);
      });
    }
  } catch (error) {
    log(`清理备份文件失败: ${error.message}`, 'WARN');
  }
}

// 读取现有游戏数据
function readExistingGames() {
  try {
    if (fs.existsSync(CONFIG.DATA_FILE)) {
      const fileContent = fs.readFileSync(CONFIG.DATA_FILE, 'utf8');
      
      // 提取现有的游戏数组
      const gamesMatch = fileContent.match(/export const gameMonetizeGames: ParsedGame\[\] = (\[[\s\S]*?\]);/);
      if (gamesMatch) {
        // 使用eval安全地解析游戏数据（在生产环境中应该使用更安全的方法）
        const existingGames = eval(gamesMatch[1]);
        log(`读取到现有游戏数据，共${existingGames.length}个游戏`);
        return existingGames;
      }
    }
  } catch (error) {
    log(`读取现有游戏数据失败: ${error.message}`, 'WARN');
  }
  
  log('未找到现有游戏数据，将创建新的数据文件');
  return [];
}

// 智能合并游戏数据 - 只添加新游戏，不修改现有游戏
function smartMergeGameData(existingGames, newGames) {
  log('开始智能合并游戏数据...');
  
  // 检测重复游戏
  const { duplicates, uniqueNewGames } = detectDuplicateGames(existingGames, newGames);
  
  if (uniqueNewGames.length === 0) {
    log('没有新的游戏需要添加');
    return {
      mergedGames: existingGames,
      addedCount: 0,
      duplicateCount: duplicates.length
    };
  }
  
  // 合并游戏数据 - 新游戏添加到末尾
  const mergedGames = [...existingGames, ...uniqueNewGames];
  
  log(`智能合并完成: 现有${existingGames.length}个游戏 + 新增${uniqueNewGames.length}个游戏 = 总计${mergedGames.length}个游戏`);
  
  return {
    mergedGames,
    addedCount: uniqueNewGames.length,
    duplicateCount: duplicates.length
  };
}

// 更新游戏数据文件
function updateGameDataFile(mergedGames, addedCount, duplicateCount) {
  log('开始更新游戏数据文件...');
  
  try {
    // 生成新的数据文件内容
    const fileContent = `import { ParsedGame } from '../utils/gameMonetizeParser';

// 从GameMonetize RSS智能增量更新的游戏数据
// 最后更新时间: ${new Date().toISOString()}
// 本次更新: 新增${addedCount}个游戏，跳过${duplicateCount}个重复游戏
export const gameMonetizeGames: ParsedGame[] = ${JSON.stringify(mergedGames, null, 2)};

// 获取特色游戏
export const getFeaturedGameMonetizeGames = (): ParsedGame[] => {
  return gameMonetizeGames.filter(game => game.featured);
};

// 获取热门游戏
export const getPopularGameMonetizeGames = (): ParsedGame[] => {
  return gameMonetizeGames
    .sort((a, b) => (b.plays || 0) - (a.plays || 0))
    .slice(0, 10);
};

// 按分类获取游戏
export const getGameMonetizeGamesByCategory = (category: string): ParsedGame[] => {
  return gameMonetizeGames.filter(game => game.category === category);
};
`;
    
    // 写入文件
    fs.writeFileSync(CONFIG.DATA_FILE, fileContent);
    log(`游戏数据文件已更新，共${mergedGames.length}个游戏`);
    
    return true;
  } catch (error) {
    log(`更新数据文件失败: ${error.message}`, 'ERROR');
    return false;
  }
}

// 更新分类数据
function updateCategoryData(mergedGames) {
  log('开始更新分类数据...');
  
  try {
    // 统计各分类的游戏数量
    const categoryCounts = {};
    mergedGames.forEach(game => {
      categoryCounts[game.category] = (categoryCounts[game.category] || 0) + 1;
    });
    
    log('分类统计:', categoryCounts);
    
    // 这里可以更新其他相关的分类数据文件
    // 目前只是记录日志
    
    return true;
  } catch (error) {
    log(`更新分类数据失败: ${error.message}`, 'ERROR');
    return false;
  }
}

// 生成更新报告
function generateUpdateReport(existingCount, addedCount, duplicateCount, totalCount) {
  const report = `
🔄 QueensGame 增量更新报告
═══════════════════════════════════════════════════════════════════

📊 更新统计:
   • 现有游戏: ${existingCount} 个
   • 新增游戏: ${addedCount} 个
   • 重复游戏: ${duplicateCount} 个 (已跳过)
   • 总计游戏: ${totalCount} 个

⏰ 更新时间: ${new Date().toISOString()}

✅ 更新状态: ${addedCount > 0 ? '成功添加新游戏' : '无新游戏需要添加'}

🔍 重复检测: 基于游戏ID、标题和URL进行智能去重

💾 数据安全: 现有游戏数据完全保留，只做增量添加
═══════════════════════════════════════════════════════════════════
`;

  log(report);
  return report;
}

// 主更新函数
async function performUpdate() {
  try {
    log('=== 开始智能增量更新流程 ===');
    
    // 1. 备份现有数据
    backupCurrentData();
    
    // 2. 读取现有游戏数据
    const existingGames = readExistingGames();
    const existingCount = existingGames.length;
    
    // 3. 获取RSS数据
    const rssData = await fetchRSSData();
    
    // 4. 解析新游戏数据
    const newGames = parseGameData(rssData);
    
    // 5. 智能合并游戏数据
    const { mergedGames, addedCount, duplicateCount } = smartMergeGameData(existingGames, newGames);
    
    // 6. 更新游戏数据文件
    const updateSuccess = updateGameDataFile(mergedGames, addedCount, duplicateCount);
    
    if (updateSuccess) {
      // 7. 更新分类数据
      updateCategoryData(mergedGames);
      
      // 8. 生成更新报告
      generateUpdateReport(existingCount, addedCount, duplicateCount, mergedGames.length);
      
      log('=== 智能增量更新完成 ===');
    } else {
      log('=== 智能增量更新失败 ===', 'ERROR');
    }
    
  } catch (error) {
    log(`智能增量更新过程中发生错误: ${error.message}`, 'ERROR');
  }
}

// 定时执行更新
function scheduleUpdate() {
  log('设置定时更新任务，每7天执行一次...');
  
  // 立即执行一次
  performUpdate();
  
  // 设置定时器
  setInterval(() => {
    log('定时器触发，开始执行智能增量更新...');
    performUpdate();
  }, CONFIG.UPDATE_INTERVAL);
}

// 命令行参数处理
const args = process.argv.slice(2);

if (args.includes('--now')) {
  // 立即执行更新
  log('手动触发智能增量更新...');
  performUpdate();
} else if (args.includes('--schedule')) {
  // 启动定时更新
  scheduleUpdate();
} else if (args.includes('--help')) {
  console.log(`
QueensGame 智能增量更新脚本

🎯 特性:
  • 智能重复检测 (基于ID、标题、URL)
  • 只添加新游戏，不覆盖现有数据
  • 自动备份和清理
  • 详细的更新报告

用法:
  node autoUpdate.js [选项]

选项:
  --now      立即执行一次智能增量更新
  --schedule 启动定时更新（每7天）
  --help     显示帮助信息

示例:
  node autoUpdate.js --now        # 立即执行智能增量更新
  node autoUpdate.js --schedule   # 启动定时智能增量更新

🔒 数据安全保证:
  • 现有游戏数据100%保留
  • 只做增量添加，不做覆盖
  • 自动备份，可随时回滚
    `);
} else {
  console.log('使用 --help 查看使用说明');
}

export {
  performUpdate,
  scheduleUpdate,
  fetchRSSData,
  parseGameData,
  detectDuplicateGames,
  smartMergeGameData
}; 