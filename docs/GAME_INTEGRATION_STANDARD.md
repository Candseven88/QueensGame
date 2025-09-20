# 🎮 QueensGame 游戏接入标准

## ⚠️ 重要警告

**🚨 严禁使用模拟或假数据！**
- 所有游戏必须是真实存在的游戏
- 缩略图URL必须是真实可访问的图片
- 嵌入URL必须是真实可用的游戏地址
- 禁止使用占位符、模拟数据或虚构内容

**✅ 数据质量要求**
- 游戏必须来自真实的游戏平台（如GameMonetize、CrazyGames等）
- 图片必须真实存在且可正常显示
- 游戏必须可以正常加载和游玩
- 所有信息必须准确无误

---

## 📋 概述

本文档定义了QueensGame平台新游戏接入的标准格式和规范，确保所有新游戏都能正确显示并符合平台的设计要求。

## 🎯 接入标准要求

### 1. 数据格式标准

#### 必需字段
```typescript
interface Game {
  id: string;              // 唯一标识符，格式：gm-xxxxx 或 custom-xxxxx
  title: string;           // 游戏标题，建议包含"Royal"关键词
  description: string;     // 游戏描述，至少50个字符
  category: string;        // 游戏分类，必须是Royal主题分类之一
  tags: string[];          // 游戏标签数组，至少3个标签
  thumbnail: string;       // 缩略图URL，必须是真实可访问的图片
  url: string;             // 游戏页面路径，格式：/games/game-name
  embedUrl: string;        // 游戏嵌入URL，必须是可用的iframe地址
  width: number;           // 游戏宽度（像素）
  height: number;          // 游戏高度（像素）
  provider: string;        // 游戏提供商
  rating: number;          // 游戏评分（1.0-5.0）
  plays: number;           // 游戏游玩次数
  featured: boolean;       // 是否为特色游戏
  createdAt: string;       // 创建时间（ISO格式）
}
```

### 2. 分类标准

#### Royal主题分类
- **Royal Action**: 动作、射击、格斗类游戏
- **Royal Adventure**: 冒险、RPG、探索类游戏
- **Royal Puzzle**: 解谜、益智、策略类游戏
- **Royal Racing**: 竞速、驾驶、体育类游戏
- **Royal Tournament**: 多人、竞技、对战类游戏

#### 分类映射规则
```typescript
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
```

### 3. 图片标准

#### 缩略图要求
- **尺寸**: 512x384 像素（推荐）
- **格式**: JPG、PNG、WebP
- **质量**: 清晰、无压缩失真
- **内容**: 游戏核心玩法展示
- **URL**: 必须是真实可访问的图片地址

#### 图片URL示例
```typescript
// ✅ 正确的图片URL
thumbnail: 'https://img.gamemonetize.com/v2537t64ojk8ia8pa1r0d7xdrhlqq9xt/512x384.jpg'

// ❌ 错误的图片URL（模拟地址）
thumbnail: 'https://img.gamemonetize.com/royal-castle/512x384.jpg'
```

### 4. 标签标准

#### 标签要求
- **数量**: 至少3个，最多8个
- **内容**: 游戏类型、玩法、特色
- **格式**: 英文，首字母大写
- **关键词**: 包含"Royal"相关词汇

#### 推荐标签组合
```typescript
// 动作游戏
tags: ['Action', 'Strategy', 'Royal', 'Defense', 'Medieval']

// 冒险游戏
tags: ['RPG', 'Adventure', 'Dragon', 'Royal', 'Fantasy']

// 解谜游戏
tags: ['Puzzle', 'Brain', 'Royal', 'Logic', 'Mind Games']
```

### 5. 游戏嵌入标准

#### iframe要求
- **URL**: 必须是可用的HTML5游戏地址
- **兼容性**: 支持现代浏览器
- **响应式**: 支持不同屏幕尺寸
- **性能**: 加载速度快，无卡顿

#### 嵌入URL示例
```typescript
// ✅ 正确的嵌入URL
embedUrl: 'https://html5.gamemonetize.com/v2537t64ojk8ia8pa1r0d7xdrhlqq9xt/'

// ❌ 错误的嵌入URL（模拟地址）
embedUrl: 'https://html5.gamemonetize.com/royal-castle/'
```

## 🔧 接入流程

### 1. 数据准备
```typescript
// 准备新游戏数据
const newGame = {
  id: 'gm-new-003',
  title: 'Royal Knight Quest',
  description: 'Embark on a noble quest as a royal knight...',
  category: 'Royal Adventure',
  tags: ['RPG', 'Adventure', 'Knight', 'Royal', 'Quest'],
  thumbnail: 'https://real-image-url.com/game-thumbnail.jpg',
  url: '/games/royal-knight-quest',
  embedUrl: 'https://real-game-url.com/game-embed',
  width: 1280,
  height: 768,
  provider: 'gamemonetize',
  rating: 4.6,
  plays: 85000,
  featured: true,
  createdAt: new Date().toISOString()
};
```

### 2. 重复检测
- 检查游戏ID是否重复
- 检查游戏标题是否重复
- 检查嵌入URL是否重复
- 检查游戏路径是否重复

### 3. 数据验证
- 验证所有必需字段
- 检查图片URL可访问性
- 验证游戏嵌入URL可用性
- 确认分类和标签符合标准

### 4. 数据合并
- 新游戏追加到现有数据末尾
- 保持现有游戏数据不变
- 更新游戏总数统计
- 生成更新报告

## 📊 质量检查清单

### ✅ 必检项目
- [ ] 游戏ID唯一性
- [ ] 缩略图URL可访问
- [ ] 嵌入URL可用
- [ ] 分类符合Royal主题
- [ ] 标签数量和质量
- [ ] 描述内容完整性
- [ ] 评分和游玩次数合理性

### 🔍 推荐检查
- [ ] 游戏标题SEO友好
- [ ] 图片质量和尺寸
- [ ] 游戏性能表现
- [ ] 用户体验流畅性
- [ ] 跨平台兼容性

## 🚨 常见问题

### 1. 图片不显示
**原因**: 缩略图URL无效或图片不存在
**解决**: 使用真实的图片URL，确保图片可访问

### 2. 游戏无法加载
**原因**: 嵌入URL无效或游戏不可用
**解决**: 验证游戏URL，确保游戏正常运行

### 3. 分类不匹配
**原因**: 分类名称不在Royal主题范围内
**解决**: 使用标准的Royal分类名称

### 4. 标签不规范
**原因**: 标签格式或内容不符合要求
**解决**: 使用英文标签，包含相关关键词

## 📈 最佳实践

### 1. 数据质量
- 使用真实的游戏数据
- 避免模拟或占位符内容
- 定期验证数据有效性

### 2. 用户体验
- 选择高质量的游戏缩略图
- 确保游戏加载速度快
- 提供清晰的游戏描述

### 3. SEO优化
- 使用描述性的游戏标题
- 包含相关关键词的标签
- 提供详细的游戏描述

### 4. 平台一致性
- 遵循Royal主题设计
- 保持数据格式统一
- 维护平台品牌形象

## 🔗 相关文档

- **增量更新机制**: `docs/INCREMENTAL_UPDATE.md`
- **自动更新系统**: `docs/AUTO_UPDATE.md`
- **游戏详情页**: `docs/GAME_DETAIL_PAGES.md`
- **部署指南**: `docs/deployment-guide.md`

---

**🎮 遵循这些接入标准，确保你的游戏在QueensGame平台上完美展示！** 