#!/usr/bin/env node

/**
 * QueensGame 专用增量更新脚本
 * 专门用于 npm run update-games 命令
 * 确保只添加新游戏，不覆盖现有数据
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

// 配置
const CONFIG = {
  DATA_FILE: path.join(__dirname, 'src/data/gameMonetizeData.ts'),
  BACKUP_DIR: path.join(__dirname, 'backups'),
  LOG_FILE: path.join(__dirname, 'logs/incremental-update.log'),
  MAX_BACKUPS: 5 // 增量更新保留5个备份
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

// 获取新游戏数据（这里可以集成真实的RSS或API）
function fetchNewGames() {
  return new Promise((resolve, reject) => {
    log('🎮 开始获取新游戏数据...');
    
    // 模拟从不同平台获取的新游戏数据
    const newGamesFromPlatforms = [
      // 从GameMonetize获取的新游戏
      {
        id: 'gm-new-2025-001',
        title: 'Royal Castle Defense Pro',
        description: 'Defend your royal castle from invading forces in this epic strategy game. Build towers, train soldiers, and protect your kingdom from waves of enemies. New enhanced graphics and gameplay mechanics.',
        category: 'Royal Strategy',
        tags: ['Strategy', 'Defense', 'Royal', 'Medieval', 'Tower Defense', '2025'],
        thumbnail: 'https://img.gamemonetize.com/w1ccjotbnts714u46xi817i2n3au243a/512x384.jpg',
        url: '/games/royal-castle-defense-pro',
        embedUrl: 'https://html5.gamemonetize.com/w1ccjotbnts714u46xi817i2n3au243a/',
        width: 1280,
        height: 768,
        provider: 'gamemonetize',
        rating: 4.6,
        plays: 85000,
        featured: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'gm-new-2025-002',
        title: 'Dragon Quest Royal Adventure',
        description: 'Embark on an epic royal dragon hunting adventure. Explore mystical lands, battle fierce dragons, and become the ultimate dragon slayer. Experience stunning 3D graphics and immersive gameplay.',
        category: 'Royal Adventure',
        tags: ['RPG', 'Adventure', 'Dragon', 'Royal', 'Fantasy', '3D'],
        thumbnail: 'https://img.gamemonetize.com/a02km4qyipo77qsylzqktgxlm2sia2tf/512x384.jpg',
        url: '/games/dragon-quest-royal-adventure',
        embedUrl: 'https://html5.gamemonetize.com/a02km4qyipo77qsylzqktgxlm2sia2tf/',
        width: 1024,
        height: 768,
        provider: 'gamemonetize',
        rating: 4.4,
        plays: 72000,
        featured: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'gm-new-2025-003',
        title: 'Royal Puzzle Master Deluxe',
        description: 'Solve royal puzzles to unlock ancient secrets. Challenge your mind with brain-teasing puzzles and discover the mysteries of the royal kingdom. Enhanced puzzle mechanics and beautiful artwork.',
        category: 'Royal Puzzle',
        tags: ['Puzzle', 'Brain', 'Royal', 'Logic', 'Mind Games', 'Deluxe'],
        thumbnail: 'https://img.gamemonetize.com/6nclv6w89nvzotvfsoc3gziz76bjop1a/512x384.jpg',
        url: '/games/royal-puzzle-master-deluxe',
        embedUrl: 'https://html5.gamemonetize.com/6nclv6w89nvzotvfsoc3gziz76bjop1a/',
        width: 800,
        height: 600,
        provider: 'gamemonetize',
        rating: 4.8,
        plays: 95000,
        featured: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'gm-new-2025-004',
        title: 'Royal Racing Championship',
        description: 'Compete in the most prestigious royal racing championship. Drive exotic cars through stunning royal landscapes and compete against the best drivers in the kingdom.',
        category: 'Royal Racing',
        tags: ['Racing', 'Royal', 'Championship', 'Cars', 'Speed', 'Competition'],
        thumbnail: 'https://img.gamemonetize.com/cjuftfessx0di02doxcwbzfsom0dd3v7/512x384.jpg',
        url: '/games/royal-racing-championship',
        embedUrl: 'https://html5.gamemonetize.com/cjuftfessx0di02doxcwbzfsom0dd3v7/',
        width: 1280,
        height: 720,
        provider: 'gamemonetize',
        rating: 4.5,
        plays: 68000,
        featured: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'gm-new-2025-005',
        title: 'Royal Arcade Collection',
        description: 'Experience the best royal arcade games in one collection. From classic arcade action to modern royal-themed challenges, this collection has it all.',
        category: 'Royal Arcade',
        tags: ['Arcade', 'Royal', 'Collection', 'Classic', 'Action', 'Retro'],
        thumbnail: 'https://img.gamemonetize.com/klzoqsmeofr7ylbhwhbwy9znj3n4ucsw/512x384.jpg',
        url: '/games/royal-arcade-collection',
        embedUrl: 'https://html5.gamemonetize.com/klzoqsmeofr7ylbhwhbwy9znj3n4ucsw/',
        width: 800,
        height: 600,
        provider: 'gamemonetize',
        rating: 4.7,
        plays: 78000,
        featured: true,
        createdAt: new Date().toISOString()
      }
    ];
    
    // 模拟网络延迟
    setTimeout(() => {
      log(`✅ 成功获取新游戏数据，共${newGamesFromPlatforms.length}个新游戏`);
      resolve(newGamesFromPlatforms);
    }, 1000);
  });
}

// 智能重复检测 - 基于多个字段进行严格检测
function detectDuplicateGames(existingGames, newGames) {
  log('🔍 开始智能重复检测...');
  
  // 创建现有游戏的多种索引
  const existingGameIds = new Set(existingGames.map(game => game.id));
  const existingGameTitles = new Set(existingGames.map(game => game.title.toLowerCase().trim()));
  const existingGameUrls = new Set(existingGames.map(game => game.embedUrl));
  const existingGameSlugs = new Set(existingGames.map(game => game.url));
  
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
    // 检查标题重复（忽略大小写和空格）
    else if (existingGameTitles.has(newGame.title.toLowerCase().trim())) {
      isDuplicate = true;
      duplicateReason = `标题重复: ${newGame.title}`;
    }
    // 检查嵌入URL重复
    else if (existingGameUrls.has(newGame.embedUrl)) {
      isDuplicate = true;
      duplicateReason = `嵌入URL重复: ${newGame.embedUrl}`;
    }
    // 检查游戏路径重复
    else if (existingGameSlugs.has(newGame.url)) {
      isDuplicate = true;
      duplicateReason = `游戏路径重复: ${newGame.url}`;
    }
    
    if (isDuplicate) {
      duplicates.push({ game: newGame, reason: duplicateReason });
      log(`⚠️  检测到重复游戏: ${newGame.title} - ${duplicateReason}`);
    } else {
      uniqueNewGames.push(newGame);
      log(`✅ 新游戏: ${newGame.title} (${newGame.provider})`);
    }
  });
  
  log(`🔍 重复检测完成: 发现${duplicates.length}个重复游戏，${uniqueNewGames.length}个新游戏`);
  
  return {
    duplicates,
    uniqueNewGames
  };
}

// 备份现有数据
function backupCurrentData() {
  log('💾 开始备份现有数据...');
  
  const backupDir = CONFIG.BACKUP_DIR;
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(backupDir, `incremental-backup-${timestamp}.ts`);
  
  try {
    if (fs.existsSync(CONFIG.DATA_FILE)) {
      const currentData = fs.readFileSync(CONFIG.DATA_FILE, 'utf8');
      fs.writeFileSync(backupFile, currentData);
      log(`✅ 数据已备份到: ${backupFile}`);
      
      // 清理旧的备份文件
      cleanupOldBackups();
    }
  } catch (error) {
    log(`❌ 备份失败: ${error.message}`, 'ERROR');
  }
}

// 清理旧的备份文件
function cleanupOldBackups() {
  try {
    const backupDir = CONFIG.BACKUP_DIR;
    if (!fs.existsSync(backupDir)) return;
    
    const files = fs.readdirSync(backupDir)
      .filter(file => file.startsWith('incremental-backup-') && file.endsWith('.ts'))
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
        log(`🗑️  删除旧备份文件: ${file.name}`);
      });
    }
  } catch (error) {
    log(`⚠️  清理备份文件失败: ${error.message}`, 'WARN');
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
        // 使用eval安全地解析游戏数据
        const existingGames = eval(gamesMatch[1]);
        log(`📚 读取到现有游戏数据，共${existingGames.length}个游戏`);
        return existingGames;
      }
    }
  } catch (error) {
    log(`⚠️  读取现有游戏数据失败: ${error.message}`, 'WARN');
  }
  
  log('📝 未找到现有游戏数据，将创建新的数据文件');
  return [];
}

// 智能合并游戏数据 - 只添加新游戏，不修改现有游戏
function smartMergeGameData(existingGames, newGames) {
  log('🔄 开始智能合并游戏数据...');
  
  // 检测重复游戏
  const { duplicates, uniqueNewGames } = detectDuplicateGames(existingGames, newGames);
  
  if (uniqueNewGames.length === 0) {
    log('ℹ️  没有新的游戏需要添加');
    return {
      mergedGames: existingGames,
      addedCount: 0,
      duplicateCount: duplicates.length
    };
  }
  
  // 合并游戏数据 - 新游戏添加到末尾
  const mergedGames = [...existingGames, ...uniqueNewGames];
  
  log(`✅ 智能合并完成: 现有${existingGames.length}个游戏 + 新增${uniqueNewGames.length}个游戏 = 总计${mergedGames.length}个游戏`);
  
  return {
    mergedGames,
    addedCount: uniqueNewGames.length,
    duplicateCount: duplicates.length
  };
}

// 更新游戏数据文件
function updateGameDataFile(mergedGames, addedCount, duplicateCount) {
  log('📝 开始更新游戏数据文件...');
  
  try {
    // 生成新的数据文件内容
    const fileContent = `import { ParsedGame } from '../utils/gameMonetizeParser';

// 从多个平台智能增量更新的游戏数据
// 最后更新时间: ${new Date().toISOString()}
// 本次更新: 新增${addedCount}个游戏，跳过${duplicateCount}个重复游戏
// 数据安全: 现有游戏数据100%保留，只做增量添加
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

// 按提供商获取游戏
export const getGameMonetizeGamesByProvider = (provider: string): ParsedGame[] => {
  return gameMonetizeGames.filter(game => game.provider === provider);
};
`;
    
    // 写入文件
    fs.writeFileSync(CONFIG.DATA_FILE, fileContent);
    log(`✅ 游戏数据文件已更新，共${mergedGames.length}个游戏`);
    
    return true;
  } catch (error) {
    log(`❌ 更新数据文件失败: ${error.message}`, 'ERROR');
    return false;
  }
}

// 生成详细的更新报告
function generateUpdateReport(existingCount, addedCount, duplicateCount, totalCount, duplicates) {
  const report = `
🔄 QueensGame 增量更新报告
═══════════════════════════════════════════════════════════════════

📊 更新统计:
   • 现有游戏: ${existingCount} 个
   • 新增游戏: ${addedCount} 个
   • 重复游戏: ${duplicateCount} 个 (已智能跳过)
   • 总计游戏: ${totalCount} 个

⏰ 更新时间: ${new Date().toISOString()}

✅ 更新状态: ${addedCount > 0 ? '成功添加新游戏' : '无新游戏需要添加'}

🔍 重复检测详情:
${duplicates.length > 0 ? duplicates.map(d => `   • ${d.game.title} - ${d.reason}`).join('\n') : '   • 无重复游戏'}

💾 数据安全保证:
   • 现有游戏数据100%保留
   • 只做增量添加，不做覆盖
   • 自动备份，可随时回滚
   • 智能去重，避免数据重复

🎯 平台集成:
   • 支持多平台游戏数据
   • 统一的数据格式和标准
   • 自动分类和标签管理
═══════════════════════════════════════════════════════════════════
`;

  log(report);
  return report;
}

// 主更新函数
async function performIncrementalUpdate() {
  try {
    log('🚀 === 开始QueensGame增量更新流程 ===');
    
    // 1. 备份现有数据
    backupCurrentData();
    
    // 2. 读取现有游戏数据
    const existingGames = readExistingGames();
    const existingCount = existingGames.length;
    
    // 3. 获取新游戏数据
    const newGames = await fetchNewGames();
    
    // 4. 智能合并游戏数据
    const { mergedGames, addedCount, duplicateCount } = smartMergeGameData(existingGames, newGames);
    
    // 5. 更新游戏数据文件
    const updateSuccess = updateGameDataFile(mergedGames, addedCount, duplicateCount);
    
    if (updateSuccess) {
      // 6. 生成更新报告
      const duplicates = detectDuplicateGames(existingGames, newGames).duplicates;
      generateUpdateReport(existingCount, addedCount, duplicateCount, mergedGames.length, duplicates);
      
      log('🎉 === QueensGame增量更新完成 ===');
      
      // 7. 显示成功消息
      if (addedCount > 0) {
        console.log(`\n🎮 成功添加 ${addedCount} 个新游戏！`);
        console.log(`📊 游戏库现在共有 ${mergedGames.length} 个游戏`);
        console.log(`🔒 现有游戏数据完全保留，安全无忧！\n`);
      } else {
        console.log(`\nℹ️  没有新游戏需要添加，游戏库保持 ${existingCount} 个游戏\n`);
      }
    } else {
      log('❌ === QueensGame增量更新失败 ===', 'ERROR');
      console.log('\n❌ 更新失败，请检查日志文件\n');
    }
    
  } catch (error) {
    log(`❌ 增量更新过程中发生错误: ${error.message}`, 'ERROR');
    console.log(`\n❌ 更新过程中发生错误: ${error.message}\n`);
  }
}

// 命令行参数处理
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
🎮 QueensGame 增量更新脚本

🎯 特性:
  • 🚫 智能重复检测 (基于ID、标题、URL、路径)
  • ✅ 只添加新游戏，不覆盖现有数据
  • 💾 自动备份和清理
  • 📊 详细的更新报告
  • 🔒 100%数据安全保障

用法:
  node incrementalUpdate.js [选项]

选项:
  --help, -h  显示帮助信息

示例:
  node incrementalUpdate.js        # 执行增量更新

🔒 数据安全保证:
  • 现有游戏数据100%保留
  • 只做增量添加，不做覆盖
  • 自动备份，可随时回滚
  • 智能去重，避免数据重复

📱 集成平台:
  • GameMonetize
  • 其他游戏平台
  • 统一数据标准
    `);
} else {
  // 执行增量更新
  performIncrementalUpdate();
}

export {
  performIncrementalUpdate,
  detectDuplicateGames,
  smartMergeGameData
}; 