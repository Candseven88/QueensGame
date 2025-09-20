# 游戏数据扩展指南

## 🎮 当前问题
某些游戏分类显示为空，这是因为：
1. GameMonetize数据缺少特殊标记（trending, editorsPick等）
2. 游戏数量相对较少
3. 需要从更多平台获取数据

## 🔧 已实施的解决方案

### 1. 数据增强系统
我已经创建了`enhanceGameData.ts`工具，会自动为现有游戏添加：
- ✅ Trending标记 (20%的游戏)
- ✅ Editor's Pick标记 (15%的游戏) 
- ✅ Exclusive标记 (10%的游戏)
- ✅ Weekly Pick标记 (12%的游戏)
- ✅ Hot Game标记 (18%的游戏)
- ✅ 基于评分的Best Game标记
- ✅ 基于播放量的Most Played标记

### 2. 智能分配算法
- 高评分游戏更容易获得Editor's Pick
- 高播放量游戏更容易成为Trending
- 确保每个分类至少有5-8个游戏

## 🚀 手动扩展数据选项

### 选项1: 运行GameMonetize脚本获取更多游戏
```bash
# 进入项目目录
cd /Users/chenjianhua/Desktop/Application\ AI/55-QueensGame

# 运行游戏获取脚本
node scripts/realGameMonetizeAPI.js
```

### 选项2: 从其他平台获取游戏
您可以选择以下平台之一：

#### A. CrazyGames平台
- **游戏数量**: 5000+ 高质量游戏
- **API**: 需要申请API密钥
- **优势**: 游戏质量高，分类丰富

#### B. itch.io平台  
- **游戏数量**: 100000+ 独立游戏
- **API**: 公开API，无需密钥
- **优势**: 独特创意游戏，HTML5支持好

#### C. Kongregate平台
- **游戏数量**: 10000+ 经典游戏
- **API**: 有限制的公开API
- **优势**: 经典游戏，社区评分系统

### 选项3: 手动添加热门游戏
如果您想快速填充某些分类，可以手动添加一些热门游戏：

```typescript
// 在 src/data/additionalGames.ts 中添加
export const trendingGames: Game[] = [
  {
    id: "manual-1",
    title: "Among Us Online",
    description: "Play the viral social deduction game online",
    category: "Trending Games", 
    trending: true,
    // ... 其他字段
  }
  // 添加更多游戏...
];
```

## 🎯 推荐操作步骤

### 立即可执行的方案：
1. **刷新页面查看效果** - 数据增强系统已经激活
2. **运行GameMonetize脚本** - 获取最新游戏数据
3. **检查分类数量** - 确认是否还有空分类

### 如果您选择扩展数据源：
1. **选择一个平台** (推荐CrazyGames或itch.io)
2. **告诉我您的选择** - 我来创建对应的获取脚本
3. **运行脚本** - 自动获取和整合新游戏

## 📊 当前数据状态
- **总游戏数**: ~65个游戏
- **分类覆盖**: 所有分类现在都应该有内容
- **特殊标记**: 自动分配完成
- **数据质量**: 高质量GameMonetize游戏

## 🎮 下一步建议

如果您想要更多游戏数据，请告诉我：
1. 您希望从哪个平台获取？
2. 您更喜欢哪种类型的游戏？
3. 是否需要我创建自动更新脚本？

我可以为您创建专门的脚本来从任何平台批量获取游戏数据！ 