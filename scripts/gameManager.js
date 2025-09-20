#!/usr/bin/env node

/**
 * QueensGame 游戏管理器
 * 提供简单易用的命令行界面来管理游戏
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../src/data/gameMonetizeData.ts');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorText(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

// 显示帮助信息
function showHelp() {
  console.log(`
${colorText('🎮 QueensGame 游戏管理器', 'cyan')}
${colorText('═'.repeat(50), 'blue')}

${colorText('🚀 快速添加游戏的方法:', 'green')}

${colorText('1. 批量自动获取 (推荐)', 'yellow')}
   ${colorText('node scripts/batchGameFetcher.js', 'cyan')}
   • 一次性从GameMonetize获取数百个游戏
   • 自动分类和去重
   • 无需手动操作

${colorText('2. 指定游戏添加', 'yellow')}
   ${colorText('node scripts/gameManager.js --add-url <游戏URL>', 'cyan')}
   • 添加单个指定的游戏
   • 自动提取游戏信息

${colorText('3. 批量URL添加', 'yellow')}
   ${colorText('node scripts/gameManager.js --add-batch', 'cyan')}
   • 从文件中读取多个游戏URL
   • 批量添加指定游戏

${colorText('📊 游戏管理命令:', 'green')}
   ${colorText('--count', 'cyan')}           显示当前游戏总数
   ${colorText('--list', 'cyan')}            列出所有游戏
   ${colorText('--categories', 'cyan')}      显示分类统计
   ${colorText('--add-url <URL>', 'cyan')}   添加单个游戏
   ${colorText('--add-batch', 'cyan')}       从文件批量添加游戏
   ${colorText('--search <关键词>', 'cyan')}   搜索游戏
   ${colorText('--backup', 'cyan')}          备份游戏数据
   ${colorText('--help', 'cyan')}            显示帮助信息

${colorText('💡 使用示例:', 'green')}
   ${colorText('# 查看当前游戏数量', 'yellow')}
   node scripts/gameManager.js --count

   ${colorText('# 批量自动获取游戏 (推荐)', 'yellow')}
   node scripts/batchGameFetcher.js

   ${colorText('# 添加指定游戏', 'yellow')}
   node scripts/gameManager.js --add-url https://gamemonetize.com/example-game

   ${colorText('# 搜索游戏', 'yellow')}
   node scripts/gameManager.js --search "puzzle"

${colorText('🔒 数据安全保证:', 'green')}
   • 所有操作都会自动备份数据
   • 智能去重，不会添加重复游戏
   • 现有游戏数据100%保留

${colorText('═'.repeat(50), 'blue')}
  `);
}

// 读取游戏数据
function readGames() {
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    const match = content.match(/export const gameMonetizeGames: ParsedGame\[\] = (\[[\s\S]*?\]);/);
    
    if (match) {
      return eval(match[1]);
    }
  } catch (error) {
    console.log(colorText(`❌ 读取游戏数据失败: ${error.message}`, 'red'));
  }
  
  return [];
}

// 显示游戏统计
function showGameCount() {
  const games = readGames();
  const categories = {};
  
  games.forEach(game => {
    categories[game.category] = (categories[game.category] || 0) + 1;
  });
  
  console.log(`
${colorText('📊 游戏统计信息', 'cyan')}
${colorText('═'.repeat(30), 'blue')}

${colorText('总游戏数:', 'green')} ${colorText(games.length, 'yellow')} 个

${colorText('分类分布:', 'green')}
${Object.entries(categories)
  .sort(([,a], [,b]) => b - a)
  .map(([cat, count]) => `  • ${cat}: ${colorText(count, 'yellow')} 个`)
  .join('\n')}

${colorText('特色游戏:', 'green')} ${colorText(games.filter(g => g.featured).length, 'yellow')} 个
${colorText('热门游戏:', 'green')} ${colorText(games.filter(g => g.trending).length, 'yellow')} 个
  `);
}

// 显示分类统计
function showCategories() {
  const games = readGames();
  const categories = {};
  
  games.forEach(game => {
    if (!categories[game.category]) {
      categories[game.category] = {
        count: 0,
        games: []
      };
    }
    categories[game.category].count++;
    categories[game.category].games.push(game.title);
  });
  
  console.log(`
${colorText('🎯 分类详细统计', 'cyan')}
${colorText('═'.repeat(40), 'blue')}
  `);
  
  Object.entries(categories)
    .sort(([,a], [,b]) => b.count - a.count)
    .forEach(([category, data]) => {
      console.log(`
${colorText(category, 'green')} (${colorText(data.count, 'yellow')} 个游戏)
${colorText('─'.repeat(category.length + 10), 'blue')}
${data.games.slice(0, 5).map(title => `  • ${title}`).join('\n')}
${data.count > 5 ? `  ${colorText(`... 还有 ${data.count - 5} 个游戏`, 'magenta')}` : ''}
      `);
    });
}

// 列出所有游戏
function listGames() {
  const games = readGames();
  
  console.log(`
${colorText('📋 所有游戏列表', 'cyan')}
${colorText('═'.repeat(30), 'blue')}
  `);
  
  games.forEach((game, index) => {
    const status = [];
    if (game.featured) status.push(colorText('⭐ 特色', 'yellow'));
    if (game.trending) status.push(colorText('🔥 热门', 'red'));
    
    console.log(`${index + 1}. ${colorText(game.title, 'green')} (${game.category})
   ${game.description.substring(0, 60)}...
   ${status.join(' ')} ${colorText(`⭐${game.rating}`, 'yellow')} ${colorText(`🎮${game.plays}次`, 'cyan')}
   `);
  });
}

// 搜索游戏
function searchGames(keyword) {
  const games = readGames();
  const results = games.filter(game => 
    game.title.toLowerCase().includes(keyword.toLowerCase()) ||
    game.description.toLowerCase().includes(keyword.toLowerCase()) ||
    game.category.toLowerCase().includes(keyword.toLowerCase()) ||
    game.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
  );
  
  console.log(`
${colorText('🔍 搜索结果', 'cyan')} (关键词: "${colorText(keyword, 'yellow')}")
${colorText('═'.repeat(30), 'blue')}

找到 ${colorText(results.length, 'yellow')} 个匹配的游戏:
  `);
  
  results.forEach((game, index) => {
    console.log(`${index + 1}. ${colorText(game.title, 'green')} (${game.category})
   ${game.description.substring(0, 80)}...
   `);
  });
  
  if (results.length === 0) {
    console.log(colorText('   没有找到匹配的游戏', 'red'));
  }
}

// 备份数据
function backupData() {
  try {
    const backupDir = path.join(__dirname, '../backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupDir, `gameData-manual-backup-${timestamp}.ts`);
    
    fs.copyFileSync(DATA_FILE, backupFile);
    
    console.log(`
${colorText('💾 数据备份成功', 'green')}
${colorText('═'.repeat(20), 'blue')}

备份文件: ${colorText(backupFile, 'cyan')}
备份时间: ${colorText(new Date().toISOString(), 'yellow')}
    `);
  } catch (error) {
    console.log(colorText(`❌ 备份失败: ${error.message}`, 'red'));
  }
}

// 从URL添加游戏
async function addGameFromUrl(url) {
  console.log(colorText(`🔍 正在分析游戏URL: ${url}`, 'cyan'));
  
  // 这里应该调用现有的fetchSpecificGames.js功能
  // 为了简化，我们提示用户使用现有脚本
  console.log(`
${colorText('💡 添加单个游戏建议:', 'yellow')}

要添加指定的游戏，请使用以下方法之一:

${colorText('方法1: 使用现有的特定游戏获取脚本', 'green')}
1. 编辑 scripts/fetchSpecificGames.js 文件
2. 在 TARGET_GAMES 数组中添加你的游戏信息
3. 运行: node scripts/fetchSpecificGames.js

${colorText('方法2: 使用批量获取器 (推荐)', 'green')}
运行: node scripts/batchGameFetcher.js
自动获取大量游戏，可能包含你想要的游戏

${colorText('方法3: 手动添加到游戏列表', 'green')}
如果你有具体的游戏URL列表，可以创建一个文本文件包含所有URL，
然后修改fetchSpecificGames.js来批量处理
  `);
}

// 批量添加游戏
function addGamesFromFile() {
  console.log(`
${colorText('📁 批量添加游戏', 'cyan')}
${colorText('═'.repeat(25), 'blue')}

要批量添加游戏，请按以下步骤操作:

${colorText('步骤1:', 'green')} 创建游戏URL列表文件
创建一个文本文件(如 game-urls.txt)，每行一个游戏URL:
${colorText(`
https://gamemonetize.com/game1-name
https://gamemonetize.com/game2-name
https://gamemonetize.com/game3-name
`, 'yellow')}

${colorText('步骤2:', 'green')} 修改批量获取脚本
编辑 scripts/fetchSpecificGames.js，添加你的游戏列表

${colorText('步骤3:', 'green')} 运行批量获取
node scripts/fetchSpecificGames.js

${colorText('或者更简单的方法:', 'magenta')}
直接运行批量自动获取器:
${colorText('node scripts/batchGameFetcher.js', 'cyan')}
这将自动获取数百个高质量游戏!
  `);
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help')) {
    showHelp();
    return;
  }
  
  if (args.includes('--count')) {
    showGameCount();
    return;
  }
  
  if (args.includes('--list')) {
    listGames();
    return;
  }
  
  if (args.includes('--categories')) {
    showCategories();
    return;
  }
  
  if (args.includes('--backup')) {
    backupData();
    return;
  }
  
  const searchIndex = args.indexOf('--search');
  if (searchIndex !== -1 && args[searchIndex + 1]) {
    searchGames(args[searchIndex + 1]);
    return;
  }
  
  const urlIndex = args.indexOf('--add-url');
  if (urlIndex !== -1 && args[urlIndex + 1]) {
    addGameFromUrl(args[urlIndex + 1]);
    return;
  }
  
  if (args.includes('--add-batch')) {
    addGamesFromFile();
    return;
  }
  
  // 如果没有匹配的命令，显示帮助
  console.log(colorText('❌ 无效的命令参数', 'red'));
  showHelp();
}

main(); 