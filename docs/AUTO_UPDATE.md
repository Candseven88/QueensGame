# QueensGame 自动更新系统

## 概述

QueensGame 自动更新系统是一个智能的游戏数据管理系统，能够自动从 GameMonetize RSS 源获取最新游戏数据，并定期更新游戏库。

## 功能特性

- 🚀 **自动抓取**: 每周自动从 GameMonetize RSS 获取最新游戏
- 🔄 **智能更新**: 自动解析、分类和更新游戏数据
- 💾 **数据备份**: 每次更新前自动备份现有数据
- 📊 **分类管理**: 自动更新游戏分类和统计信息
- 📝 **详细日志**: 完整的更新日志记录
- ⚡ **手动触发**: 支持手动立即更新

## 系统架构

```
GameMonetize RSS → 数据解析 → 分类映射 → 数据更新 → 文件生成
       ↓              ↓          ↓          ↓          ↓
    RSS源数据    游戏信息解析   皇家分类    数据文件    最终输出
```

## 使用方法

### 1. 立即更新

```bash
# 立即执行一次游戏数据更新
npm run update-games
```

### 2. 启动定时更新

```bash
# 启动定时更新服务（每7天自动更新）
npm run schedule-update
```

### 3. 查看帮助

```bash
# 查看所有可用命令
npm run update-help
```

### 4. 直接使用脚本

```bash
# 立即更新
node scripts/autoUpdate.js --now

# 启动定时更新
node scripts/autoUpdate.js --schedule

# 查看帮助
node scripts/autoUpdate.js --help
```

## 配置说明

### 更新频率

默认每7天自动更新一次，可在 `scripts/autoUpdate.js` 中修改：

```javascript
const CONFIG = {
  UPDATE_INTERVAL: 7 * 24 * 60 * 60 * 1000, // 7天
  // ... 其他配置
};
```

### 数据文件路径

```javascript
const CONFIG = {
  DATA_FILE: path.join(__dirname, '../src/data/gameMonetizeData.ts'),
  BACKUP_DIR: path.join(__dirname, '../backups'),
  LOG_FILE: path.join(__dirname, '../logs/auto-update.log')
};
```

### 分类映射

系统会自动将 GameMonetize 的分类映射到 QueensGame 的皇家分类：

```javascript
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

## 更新流程

### 1. 数据备份
- 自动备份现有的 `gameMonetizeData.ts` 文件
- 备份文件保存在 `backups/` 目录

### 2. RSS数据获取
- 从 GameMonetize RSS 源获取最新游戏数据
- 支持错误重试和超时处理

### 3. 数据解析
- 解析游戏标题、描述、分类、标签等信息
- 生成随机但合理的评分和播放量数据
- 自动生成游戏URL和创建时间

### 4. 分类映射
- 将原始分类映射到皇家分类系统
- 自动统计各分类的游戏数量

### 5. 文件更新
- 更新 `gameMonetizeData.ts` 文件
- 更新 `gameData.ts` 中的分类统计
- 生成更新日志

## 日志系统

### 日志位置
- 日志文件：`logs/auto-update.log`
- 控制台输出：实时显示更新进度

### 日志格式
```
[2024-01-15T10:30:00.000Z] [INFO] 开始自动更新流程
[2024-01-15T10:30:01.000Z] [INFO] 成功获取RSS数据，共25个游戏
[2024-01-15T10:30:02.000Z] [INFO] 成功解析25个游戏数据
[2024-01-15T10:30:03.000Z] [INFO] 游戏数据文件已更新，共25个游戏
[2024-01-15T10:30:04.000Z] [INFO] 自动更新完成
```

## 错误处理

### 常见错误
1. **网络错误**: RSS源无法访问
2. **解析错误**: 数据格式不正确
3. **文件错误**: 文件权限或路径问题
4. **分类错误**: 分类映射失败

### 错误恢复
- 自动重试机制
- 详细的错误日志
- 数据备份保护

## 部署建议

### 生产环境
```bash
# 使用 PM2 管理定时任务
pm2 start scripts/autoUpdate.js --name "queensgame-updater" -- --schedule

# 或使用 crontab
0 0 */7 * * cd /path/to/queensgame && npm run update-games
```

### 开发环境
```bash
# 手动触发更新
npm run update-games

# 或直接运行脚本
node scripts/autoUpdate.js --now
```

## 监控和维护

### 监控指标
- 更新成功率
- 新增游戏数量
- 更新耗时
- 错误频率

### 维护任务
- 定期检查日志文件
- 清理旧的备份文件
- 更新分类映射规则
- 优化更新频率

## 故障排除

### 更新失败
1. 检查网络连接
2. 验证RSS源可用性
3. 查看错误日志
4. 检查文件权限

### 数据不一致
1. 恢复最新备份
2. 手动触发更新
3. 检查分类映射
4. 验证数据格式

## 技术支持

如有问题，请查看：
1. 更新日志文件
2. 控制台错误信息
3. 数据文件完整性
4. 网络连接状态

---

**注意**: 自动更新系统会修改游戏数据文件，建议在测试环境充分验证后再部署到生产环境。 