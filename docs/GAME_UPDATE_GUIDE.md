# 游戏数据更新指南

## 🎮 脚本说明

`scripts/realGameMonetizeAPI.js` 是用来从 GameMonetize 平台获取最新游戏数据的脚本。

## ✅ 错误修复

### 原始错误
```bash
ReferenceError: Cannot access '__dirname' before initialization
```

### 修复内容
```javascript
// 修复前（错误）:
const __dirname = path.dirname(__dirname);

// 修复后（正确）:
const __dirname = path.dirname(__filename);
```

**问题原因:** 在ES模块中，`__dirname` 需要通过 `fileURLToPath(import.meta.url)` 获取文件路径，然后用 `path.dirname()` 获取目录路径。

## 🚀 如何使用脚本

### 1. 获取最新游戏数据
```bash
node scripts/realGameMonetizeAPI.js
```

### 2. 脚本功能
- ✅ 从 GameMonetize RSS 获取最新游戏
- ✅ 自动生成游戏描述和说明
- ✅ 添加 SEO 关键词
- ✅ 分配特殊标记（Featured, Trending等）
- ✅ 更新 `src/data/gameMonetizeData.ts` 文件

### 3. 运行结果
脚本成功运行后会：
- 📁 更新 `src/data/gameMonetizeData.ts`
- 📁 创建备份文件（带时间戳）
- 📊 输出获取的游戏数量
- 🎯 自动分类和标记游戏

## 📊 数据文件说明

### 主要文件
- `gameMonetizeData.ts` - 当前使用的游戏数据
- `gameMonetizeData_current.ts` - 最新更新的数据
- `gameMonetizeData_backup.ts` - 备份文件

### 数据结构
每个游戏包含：
```typescript
{
  id: string,
  title: string,
  description: string,
  thumbnail: string,
  category: string,
  tags: string[],
  url: string,
  embedUrl: string,
  width: number,
  height: number,
  provider: "gamemonetize",
  rating: number,
  plays: number,
  featured: boolean,
  trending: boolean,
  editorsPick: boolean,
  // ... 更多字段
}
```

## 🔄 定期更新流程

### 建议频率
- **每日更新:** 获取最新游戏
- **每周审核:** 检查游戏质量和分类
- **每月优化:** 调整特殊标记和推荐算法

### 自动化步骤
1. **运行脚本:** `node scripts/realGameMonetizeAPI.js`
2. **检查结果:** 查看控制台输出
3. **重启服务:** `npm run dev` 应用新数据
4. **验证网站:** 确认新游戏正确显示

## 🛠️ 故障排除

### 常见问题

#### 1. 网络连接问题
```bash
Error: Unable to fetch RSS feed
```
**解决方案:** 检查网络连接，稍后重试

#### 2. 权限问题
```bash
Error: EACCES: permission denied
```
**解决方案:** 确保有写入 `src/data/` 目录的权限

#### 3. 数据格式错误
```bash
Error: Invalid game data format
```
**解决方案:** 脚本会自动处理大部分格式问题，检查日志详情

### 调试模式
添加环境变量启用详细日志：
```bash
DEBUG=true node scripts/realGameMonetizeAPI.js
```

## 📈 数据增强功能

### 自动增强
脚本会自动：
- 🎯 生成独特的游戏描述
- 📝 创建游戏说明步骤
- 🏷️ 添加相关标签
- ⭐ 分配质量评级
- 🔥 标记热门和推荐游戏

### 分类映射
GameMonetize 分类自动映射为网站分类：
- `Action` → `Royal Action`
- `Puzzle` → `Royal Puzzle`
- `Sports` → `Royal Tournament`
- 等等...

## 🎯 使用场景

### 1. 新站点部署
```bash
# 获取初始游戏数据
node scripts/realGameMonetizeAPI.js

# 启动开发服务器
npm run dev
```

### 2. 内容更新
```bash
# 定期更新游戏库
node scripts/realGameMonetizeAPI.js

# 重启服务应用更改
npm run dev
```

### 3. 数据恢复
如果需要恢复之前的数据：
```bash
# 从备份恢复
cp src/data/gameMonetizeData_backup.ts src/data/gameMonetizeData.ts
```

## 🔮 高级用法

### 配置选项
编辑脚本顶部的 CONFIG 对象：
```javascript
const CONFIG = {
  RSS_URL: 'https://gamemonetize.com/rss.xml',
  GAMES_PER_REQUEST: 50,  // 每次获取的游戏数量
  ENABLE_ENHANCEMENT: true,  // 是否启用数据增强
  // 更多配置...
};
```

### 自定义过滤
可以修改脚本来：
- 🎮 只获取特定类别的游戏
- ⭐ 设置最低评分要求
- 📅 过滤发布日期
- 🏷️ 自定义标签生成规则

## 📝 注意事项

1. **备份重要:** 脚本会自动创建备份，建议定期手动备份
2. **测试环境:** 在生产环境使用前，先在开发环境测试
3. **监控日志:** 关注脚本运行日志，及时发现问题
4. **数据质量:** 定期检查获取的游戏数据质量

现在您可以安全地使用 `node scripts/realGameMonetizeAPI.js` 来更新游戏数据了！🎉 