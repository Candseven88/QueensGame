import { Game } from '../types/Game';

// 为现有游戏数据添加特殊标记
export function enhanceGameData(games: Game[]): Game[] {
  return games.map((game, index) => {
    const enhanced = { ...game };
    
    // 基于评分和播放次数添加标记
    const rating = game.rating || (4.0 + Math.random() * 1.0); // 4.0-5.0之间
    const plays = game.plays || Math.floor(Math.random() * 200000) + 50000;
    
    // 使用游戏ID和索引生成更可预测的随机种子
    const randomSeed = (game.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + index) % 100;
    
    // 重置所有特殊标记，避免重复分配
    enhanced.trending = false;
    enhanced.editorsPick = false;
    enhanced.exclusive = false;
    enhanced.weeklyPick = false;
    enhanced.hotGame = false;
    enhanced.bestGame = false;
    enhanced.mostPlayed = false;
    
    // 确保基本字段存在
    enhanced.rating = rating;
    enhanced.plays = plays;
    enhanced.featured = enhanced.featured || randomSeed < 15;
    
    return enhanced;
  });
}

// 按类别分布特殊标记，确保每个分类都有内容且不重复
export function distributeSpecialMarks(games: Game[]): Game[] {
  const enhanced = [...games];
  const totalGames = enhanced.length;
  
  // 按评分和播放次数排序，确保高质量游戏优先获得特殊标记
  const sortedGames = enhanced.sort((a, b) => {
    const scoreA = (a.rating || 4.0) * 0.6 + (a.plays || 0) / 100000 * 0.4;
    const scoreB = (b.rating || 4.0) * 0.6 + (b.plays || 0) / 100000 * 0.4;
    return scoreB - scoreA;
  });
  
  // 分配策略：每个分类获得不重复的游戏
  const specialCategories = [
    { 
      key: 'trending', 
      count: Math.max(12, Math.floor(totalGames * 0.20)),
      startIndex: 0 
    },
    { 
      key: 'editorsPick', 
      count: Math.max(10, Math.floor(totalGames * 0.18)),
      startIndex: Math.max(12, Math.floor(totalGames * 0.20))
    },
    { 
      key: 'bestGame', 
      count: Math.max(8, Math.floor(totalGames * 0.15)),
      startIndex: Math.max(12, Math.floor(totalGames * 0.20)) + Math.max(10, Math.floor(totalGames * 0.18))
    },
    { 
      key: 'mostPlayed', 
      count: Math.max(8, Math.floor(totalGames * 0.15)),
      startIndex: Math.max(12, Math.floor(totalGames * 0.20)) + Math.max(10, Math.floor(totalGames * 0.18)) + Math.max(8, Math.floor(totalGames * 0.15))
    },
    { 
      key: 'hotGame', 
      count: Math.max(6, Math.floor(totalGames * 0.12)),
      startIndex: Math.max(12, Math.floor(totalGames * 0.20)) + Math.max(10, Math.floor(totalGames * 0.18)) + Math.max(8, Math.floor(totalGames * 0.15)) + Math.max(8, Math.floor(totalGames * 0.15))
    },
    { 
      key: 'exclusive', 
      count: Math.max(6, Math.floor(totalGames * 0.10)),
      startIndex: Math.floor(totalGames * 0.8)
    },
    { 
      key: 'weeklyPick', 
      count: Math.max(5, Math.floor(totalGames * 0.10)),
      startIndex: Math.floor(totalGames * 0.9)
    }
  ];
  
  // 为每个分类分配不重复的游戏
  specialCategories.forEach(({ key, count, startIndex }) => {
    for (let i = 0; i < count && (startIndex + i) < sortedGames.length; i++) {
      const gameIndex = startIndex + i;
      if (gameIndex < sortedGames.length) {
        (sortedGames[gameIndex] as any)[key] = true;
      }
    }
  });
  
  // 为一些游戏添加季节性标记
  enhanced.forEach((game, index) => {
    const title = game.title.toLowerCase();
    const tags = (game.tags || []).join(' ').toLowerCase();
    
    if (title.includes('christmas') || title.includes('santa') || title.includes('xmas') || 
        tags.includes('christmas') || tags.includes('santa')) {
      game.seasonal = 'Christmas';
    } else if (title.includes('halloween') || title.includes('spooky') || title.includes('ghost') ||
               tags.includes('halloween') || tags.includes('spooky')) {
      game.seasonal = 'Halloween';
    } else if (title.includes('easter') || title.includes('bunny') || title.includes('egg') ||
               tags.includes('easter') || tags.includes('bunny')) {
      game.seasonal = 'Easter';
    }
  });
  
  return enhanced;
}

// 生成更丰富的游戏标签
export function enhanceGameTags(game: Game): string[] {
  const baseTags = game.tags || [];
  const newTags = [...baseTags];
  
  // 基于分类添加标签
  const category = game.category.toLowerCase();
  if (category.includes('action') && !newTags.some(tag => tag.toLowerCase().includes('action'))) {
    newTags.push('Action');
  }
  if (category.includes('puzzle') && !newTags.some(tag => tag.toLowerCase().includes('puzzle'))) {
    newTags.push('Puzzle');
  }
  if (category.includes('racing') && !newTags.some(tag => tag.toLowerCase().includes('racing'))) {
    newTags.push('Racing');
  }
  
  // 基于特殊标记添加标签
  if (game.trending) newTags.push('Trending');
  if (game.editorsPick) newTags.push('Editor\'s Choice');
  if (game.exclusive) newTags.push('Exclusive');
  if (game.featured) newTags.push('Featured');
  
  // 基于评分添加标签
  if ((game.rating || 4.0) >= 4.7) newTags.push('High Rated');
  if ((game.plays || 0) >= 100000) newTags.push('Popular');
  
  return [...new Set(newTags)]; // 去重
} 