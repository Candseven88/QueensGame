#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

const DATA_FILE = path.join(__dirname, 'src/data/gameMonetizeData.ts');
const LOG_FILE = path.join(__dirname, 'logs/game-validation.log');

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

// 检查URL是否可访问
function checkUrl(url, type = 'URL') {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve({ accessible: false, error: 'Timeout' });
    }, 10000);

    https.get(url, (res) => {
      clearTimeout(timeout);
      resolve({ 
        accessible: res.statusCode === 200, 
        statusCode: res.statusCode,
        contentType: res.headers['content-type'] 
      });
    }).on('error', (err) => {
      clearTimeout(timeout);
      resolve({ accessible: false, error: err.message });
    });
  });
}

// 验证游戏数据
async function validateGameData(game) {
  const results = {
    id: game.id,
    title: game.title,
    thumbnail: { accessible: false, error: null },
    embedUrl: { accessible: false, error: null },
    issues: []
  };

  // 检查缩略图
  if (game.thumbnail && game.thumbnail.startsWith('http')) {
    try {
      const thumbnailResult = await checkUrl(game.thumbnail, 'Thumbnail');
      results.thumbnail = thumbnailResult;
      
      if (!thumbnailResult.accessible) {
        results.issues.push(`缩略图不可访问: ${game.thumbnail}`);
      }
    } catch (error) {
      results.thumbnail.error = error.message;
      results.issues.push(`缩略图检查失败: ${error.message}`);
    }
  } else {
    results.issues.push('缩略图URL无效或缺失');
  }

  // 检查嵌入URL
  if (game.embedUrl && game.embedUrl.startsWith('http')) {
    try {
      const embedResult = await checkUrl(game.embedUrl, 'Embed URL');
      results.embedUrl = embedResult;
      
      if (!embedResult.accessible) {
        results.issues.push(`嵌入URL不可访问: ${game.embedUrl}`);
      }
    } catch (error) {
      results.embedUrl.error = error.message;
      results.issues.push(`嵌入URL检查失败: ${error.message}`);
    }
  } else {
    results.issues.push('嵌入URL无效或缺失');
  }

  // 检查其他必需字段
  if (!game.title || game.title.trim() === '') {
    results.issues.push('游戏标题缺失');
  }
  
  if (!game.description || game.description.trim() === '') {
    results.issues.push('游戏描述缺失');
  }
  
  if (!game.category || game.category.trim() === '') {
    results.issues.push('游戏分类缺失');
  }
  
  if (!game.tags || game.tags.length === 0) {
    results.issues.push('游戏标签缺失');
  }

  return results;
}

// 读取游戏数据
function readGameData() {
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    
    // 提取游戏数据数组 - 匹配TypeScript格式
    let gameDataMatch = content.match(/export const gameMonetizeGames: ParsedGame\[\] = (\[[\s\S]*?\]);/);
    if (!gameDataMatch) {
      // 尝试其他匹配模式
      const alternativeMatch = content.match(/export const gameMonetizeGames = (\[[\s\S]*?\]);/);
      if (!alternativeMatch) {
        const anotherMatch = content.match(/const gameMonetizeGames = (\[[\s\S]*?\]);/);
        if (!anotherMatch) {
          throw new Error('无法找到游戏数据数组，请检查文件格式');
        }
        gameDataMatch = anotherMatch;
      } else {
        gameDataMatch = alternativeMatch;
      }
    }
    
    // 解析游戏数据
    const gameDataString = gameDataMatch[1];
    
    // 使用更安全的解析方式
    try {
      // 移除可能的注释和多余字符
      const cleanDataString = gameDataString
        .replace(/\/\*[\s\S]*?\*\//g, '') // 移除多行注释
        .replace(/\/\/.*$/gm, '') // 移除单行注释
        .trim();
      
      const games = JSON.parse(cleanDataString);
      return games;
    } catch (parseError) {
      log(`⚠️  JSON解析失败，尝试使用eval: ${parseError.message}`);
      // 如果JSON解析失败，尝试使用eval（仅用于开发环境）
      const games = eval(gameDataString);
      return games;
    }
  } catch (error) {
    log(`❌ 读取游戏数据失败: ${error.message}`);
    return [];
  }
}

// 生成验证报告
function generateValidationReport(validationResults) {
  const totalGames = validationResults.length;
  const gamesWithIssues = validationResults.filter(result => result.issues.length > 0);
  const gamesWithoutIssues = totalGames - gamesWithIssues.length;
  
  const thumbnailIssues = validationResults.filter(result => !result.thumbnail.accessible).length;
  const embedUrlIssues = validationResults.filter(result => !result.embedUrl.accessible).length;
  
  log('\n🔍 === QueensGame 游戏数据验证报告 ===');
  log(`📊 验证统计:`);
  log(`   • 总游戏数: ${totalGames} 个`);
  log(`   • 无问题游戏: ${gamesWithoutIssues} 个`);
  log(`   • 有问题游戏: ${gamesWithIssues.length} 个`);
  log(`   • 缩略图问题: ${thumbnailIssues} 个`);
  log(`   • 嵌入URL问题: ${embedUrlIssues} 个`);
  
  if (gamesWithIssues.length > 0) {
    log(`\n🚨 问题游戏详情:`);
    gamesWithIssues.forEach((result, index) => {
      log(`\n${index + 1}. ${result.title} (${result.id})`);
      result.issues.forEach(issue => {
        log(`   • ${issue}`);
      });
    });
  }
  
  if (gamesWithoutIssues > 0) {
    log(`\n✅ 所有游戏数据验证通过！`);
  }
  
  log(`\n⏰ 验证完成时间: ${new Date().toISOString()}`);
  log(`📝 详细日志已保存到: ${LOG_FILE}`);
}

// 主函数
async function main() {
  log('🎮 开始验证QueensGame游戏数据...');
  
  // 读取游戏数据
  const games = readGameData();
  if (games.length === 0) {
    log('❌ 没有找到游戏数据');
    return;
  }
  
  log(`📚 找到 ${games.length} 个游戏，开始验证...`);
  
  // 验证每个游戏
  const validationResults = [];
  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    log(`🔍 验证游戏 ${i + 1}/${games.length}: ${game.title}`);
    
    const result = await validateGameData(game);
    validationResults.push(result);
    
    // 添加延迟避免请求过快
    if (i < games.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // 生成报告
  generateValidationReport(validationResults);
  
  log('\n🎉 === 游戏数据验证完成 ===');
}

// 运行验证
main().catch(error => {
  log(`❌ 验证过程出错: ${error.message}`);
  process.exit(1);
}); 