#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

const DATA_FILE = path.join(__dirname, 'src/data/gameMonetizeData.ts');
const LOG_FILE = path.join(__dirname, 'logs/specific-games-fetch.log');

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

// 目标游戏列表
const TARGET_GAMES = [
  {
    name: 'Little Dentist For Kid',
    url: 'https://gamemonetize.com/little-dentist-for-kid-game',
    category: 'Royal Adventure',
    tags: ['Doctor', 'Family', 'Kid', 'Kids', 'Educational', 'Medical']
  },
  {
    name: 'Tralalero Tralala Jeep Adventure',
    url: 'https://gamemonetize.com/tralalero-tralala-jeep-adventure-game',
    category: 'Royal Racing',
    tags: ['Arcade', 'Racing', 'Car', 'Driving', 'Adventure', 'Collecting']
  },
  {
    name: 'Super Stickman Dragon',
    url: 'https://gamemonetize.com/super-stickman-dragon-game',
    category: 'Royal Action',
    tags: ['Action', 'Fighting', 'Stickman', 'Dragon Ball Z', 'Physics', 'Hypercasual']
  },
  {
    name: 'Skibidi Toilet Move Face',
    url: 'https://gamemonetize.com/skibidi-toilet-move-face-game',
    category: 'Royal Adventure',
    tags: ['Adventure', 'Battle', 'Strategy', 'Monster', 'Casual', 'Skibidi']
  },
  {
    name: 'Drive Zone',
    url: 'https://gamemonetize.com/drive-zone-game',
    category: 'Royal Racing',
    tags: ['3D', 'Racing', 'Car', 'Driving', 'Simulator', 'Sport', 'Offroad']
  },
  {
    name: 'Carrot Climber',
    url: 'https://gamemonetize.com/carrot-climber-game',
    category: 'Royal Action',
    tags: ['Arcade', 'Jumping', 'Platformer', 'Casual', 'Hypercasual', 'Puzzle']
  }
];

// 从GameMonetize页面提取游戏信息
async function fetchGameInfo(targetGame) {
  return new Promise((resolve) => {
    https.get(targetGame.url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          // 提取游戏ID（从iframe URL中）
          const iframeMatch = data.match(/https:\/\/html5\.gamemonetize\.co\/([a-zA-Z0-9]+)/);
          if (!iframeMatch) {
            resolve(null);
            return;
          }
          
          const gameId = iframeMatch[1];
          
          // 提取游戏描述
          const descMatch = data.match(/<meta name="description" content="([^"]+)"/);
          const description = descMatch ? descMatch[1] : '';
          
          // 提取游戏尺寸
          const sizeMatch = data.match(/Size[^>]*>([^<]+)</);
          const size = sizeMatch ? sizeMatch[1].trim() : '800 x 600';
          
          // 解析尺寸
          const [width, height] = size.split('X').map(s => parseInt(s.trim()) || 800);
          
          // 构建游戏数据
          const gameData = {
            id: `gm-${gameId}`,
            title: targetGame.name,
            description: description || `${targetGame.name} - An exciting game from GameMonetize`,
            category: targetGame.category,
            tags: targetGame.tags,
            thumbnail: `https://img.gamemonetize.com/${gameId}/512x384.jpg`,
            url: `/games/${targetGame.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
            embedUrl: `https://html5.gamemonetize.com/${gameId}/`,
            width: width,
            height: height,
            provider: 'gamemonetize',
            rating: 4.5 + (Math.random() * 0.5), // 4.5-5.0之间的随机评分
            plays: Math.floor(Math.random() * 100000) + 50000, // 50k-150k之间的随机游玩次数
            featured: Math.random() > 0.5, // 50%概率成为特色游戏
            createdAt: new Date().toISOString()
          };
          
          resolve(gameData);
        } catch (error) {
          log(`❌ 解析游戏数据失败: ${error.message}`);
          resolve(null);
        }
      });
    }).on('error', (err) => {
      log(`❌ 获取游戏页面失败: ${err.message}`);
      resolve(null);
    });
  });
}

// 读取现有游戏数据
function readExistingGames() {
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    const gameDataMatch = content.match(/export const gameMonetizeGames: ParsedGame\[\] = (\[[\s\S]*?\]);/);
    if (!gameDataMatch) {
      throw new Error('无法找到游戏数据数组');
    }
    
    const gameDataString = gameDataMatch[1];
    const games = eval(gameDataString);
    return games;
  } catch (error) {
    log(`❌ 读取现有游戏数据失败: ${error.message}`);
    return [];
  }
}

// 检查重复游戏
function checkDuplicates(existingGames, newGame) {
  const existingIds = new Set(existingGames.map(g => g.id));
  const existingTitles = new Set(existingGames.map(g => g.title.toLowerCase().trim()));
  const existingUrls = new Set(existingGames.map(g => g.embedUrl));
  
  if (existingIds.has(newGame.id)) {
    return { isDuplicate: true, reason: `ID重复: ${newGame.id}` };
  }
  
  if (existingTitles.has(newGame.title.toLowerCase().trim())) {
    return { isDuplicate: true, reason: `标题重复: ${newGame.title}` };
  }
  
  if (existingUrls.has(newGame.embedUrl)) {
    return { isDuplicate: true, reason: `嵌入URL重复: ${newGame.embedUrl}` };
  }
  
  return { isDuplicate: false };
}

// 更新游戏数据文件
function updateGameDataFile(existingGames, newGames) {
  try {
    // 合并游戏数据
    const allGames = [...existingGames, ...newGames];
    
    // 生成新的数据文件内容
    const fileContent = `import { ParsedGame } from '../utils/gameMonetizeParser';

// 从多个平台智能增量更新的游戏数据
// 最后更新时间: ${new Date().toISOString()}
// 本次更新: 新增${newGames.length}个游戏
// 数据安全: 现有游戏数据100%保留，只做增量添加
export const gameMonetizeGames: ParsedGame[] = ${JSON.stringify(allGames, null, 2)};

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
    fs.writeFileSync(DATA_FILE, fileContent, 'utf8');
    log(`✅ 游戏数据文件更新成功`);
    
    return true;
  } catch (error) {
    log(`❌ 更新游戏数据文件失败: ${error.message}`);
    return false;
  }
}

// 主函数
async function main() {
  log('🎮 开始获取指定的GameMonetize游戏...');
  
  // 读取现有游戏
  const existingGames = readExistingGames();
  log(`📚 现有游戏数量: ${existingGames.length} 个`);
  
  // 获取新游戏数据
  const newGames = [];
  const failedGames = [];
  
  for (let i = 0; i < TARGET_GAMES.length; i++) {
    const targetGame = TARGET_GAMES[i];
    log(`🔍 获取游戏 ${i + 1}/${TARGET_GAMES.length}: ${targetGame.name}`);
    
    try {
      const gameData = await fetchGameInfo(targetGame);
      
      if (gameData) {
        // 检查重复
        const duplicateCheck = checkDuplicates(existingGames, gameData);
        
        if (duplicateCheck.isDuplicate) {
          log(`⚠️  跳过重复游戏: ${gameData.title} - ${duplicateCheck.reason}`);
        } else {
          newGames.push(gameData);
          log(`✅ 成功获取游戏: ${gameData.title}`);
        }
      } else {
        failedGames.push(targetGame.name);
        log(`❌ 获取游戏失败: ${targetGame.name}`);
      }
      
      // 添加延迟避免请求过快
      if (i < TARGET_GAMES.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      log(`❌ 处理游戏时出错: ${targetGame.name} - ${error.message}`);
      failedGames.push(targetGame.name);
    }
  }
  
  // 生成报告
  log('\n📊 === 游戏获取报告 ===');
  log(`📈 成功获取: ${newGames.length} 个游戏`);
  log(`❌ 获取失败: ${failedGames.length} 个游戏`);
  
  if (newGames.length > 0) {
    log(`\n🎮 新增游戏列表:`);
    newGames.forEach((game, index) => {
      log(`${index + 1}. ${game.title} (${game.category})`);
    });
    
    // 更新数据文件
    if (updateGameDataFile(existingGames, newGames)) {
      log(`\n🎉 成功添加 ${newGames.length} 个新游戏到QueensGame！`);
      log(`📊 游戏总数: ${existingGames.length + newGames.length} 个`);
    }
  }
  
  if (failedGames.length > 0) {
    log(`\n⚠️  获取失败的游戏:`);
    failedGames.forEach((name, index) => {
      log(`${index + 1}. ${name}`);
    });
  }
  
  log(`\n⏰ 完成时间: ${new Date().toISOString()}`);
}

// 运行脚本
main().catch(error => {
  log(`❌ 脚本执行失败: ${error.message}`);
  process.exit(1);
}); 