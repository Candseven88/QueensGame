# Poki 游戏集成指南

## 🎮 已集成的游戏

### Brainrots
- **来源**: [Poki.com](https://poki.com/zh/g/brainrots)
- **类型**: 合成类益智游戏
- **访问路径**: `/games/brainrots`
- **描述**: 通过拖拽和合并来创造新的物品，挑战逻辑思维和策略规划能力

## 🔧 集成方式

### 1. Iframe 嵌入（当前使用）
```typescript
// 使用 iframe 直接嵌入 Poki 游戏页面
const iframe = document.createElement('iframe');
iframe.src = 'https://poki.com/zh/g/brainrots';
iframe.width = '100%';
iframe.height = '600px';
iframe.frameBorder = '0';
iframe.allowFullScreen = true;
```

### 2. Poki SDK 集成（推荐）
```typescript
// 加载 Poki SDK
const script = document.createElement('script');
script.src = 'https://poki.com/sdk.js';

// 使用 SDK 嵌入游戏
Poki.embed(gameId, container);
```

## 📁 文件结构

```
src/
├── utils/
│   └── pokiIntegration.ts    # Poki 游戏集成工具
├── pages/
│   └── PokiGamePage.tsx      # Poki 游戏页面组件
└── data/
    └── gameData.ts           # 包含 Brainrots 游戏数据
```

## 🚀 如何添加更多 Poki 游戏

1. **获取游戏信息**
   - 访问 Poki 游戏页面
   - 获取游戏 ID 和嵌入 URL

2. **添加到游戏数据**
   ```typescript
   export const newPokiGame: Game = {
     id: 'poki-game-id',
     title: '游戏名称',
     description: '游戏描述',
     embedUrl: 'https://poki.com/zh/g/game-id',
     provider: 'poki',
     // ... 其他属性
   };
   ```

3. **添加路由**
   ```typescript
   <Route path="/games/game-id" element={<PokiGamePage />} />
   ```

## ⚠️ 注意事项

- **跨域限制**: Poki 游戏可能受到跨域限制
- **加载性能**: 使用 iframe 可能影响页面加载速度
- **用户体验**: 确保游戏在移动设备上正常显示
- **法律合规**: 确保遵守 Poki 的使用条款

## 🔗 相关链接

- [Poki 开发者页面](https://poki.com/zh/g/brainrots)
- [Poki SDK 文档](https://poki.com/developers)
- [游戏集成最佳实践](https://poki.com/zh/g/brainrots)
