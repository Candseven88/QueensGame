# QueensGame 高级游戏爬虫使用指南

## 🕷️ 爬虫功能介绍

高级游戏爬虫是一个自动发现GameMonetize新游戏的工具，具有以下特性：

- ✅ **主动发现**：不依赖RSS，直接爬取网站
- ✅ **多种策略**：分类页面、搜索、特殊页面
- ✅ **智能去重**：自动过滤重复游戏
- ✅ **详细日志**：完整的运行记录
- ✅ **数据提取**：自动分析游戏信息

## 🚀 运行爬虫

### 1. 完整爬虫
```bash
node scripts/advancedGameCrawler.js
```

### 2. 只爬取分类页面
```bash
node scripts/advancedGameCrawler.js --categories
```

### 3. 只爬取特殊页面
```bash
node scripts/advancedGameCrawler.js --special
```

### 4. 查看帮助
```bash
node scripts/advancedGameCrawler.js --help
```

## 📊 查看爬虫结果

### 1. 实时查看运行日志
```bash
# 查看爬虫实时运行状态
tail -f logs/advanced-crawler.log
```

### 2. 查看发现的游戏
```bash
# 查看JSON格式的发现结果
cat logs/discovered-games.json

# 或者格式化查看
node -e "console.log(JSON.stringify(require('./logs/discovered-games.json'), null, 2))"
```

### 3. 查看所有日志文件
```bash
ls -la logs/
```

### 4. 检查新游戏数量
```bash
# 快速查看发现了多少游戏
node -e "
const data = require('./logs/discovered-games.json');
console.log(\`发现 \${data.totalUrls} 个游戏链接\`);
console.log(\`运行时间: \${data.timestamp}\`);
"
```

## 📋 日志文件说明

爬虫运行后会在 `logs/` 目录下生成以下文件：

| 文件名 | 说明 |
|--------|------|
| `advanced-crawler.log` | 详细的运行日志，包含所有步骤 |
| `discovered-games.json` | 发现的游戏链接列表（JSON格式） |

### advanced-crawler.log 示例
```
[2025-09-09T03:57:51.994Z] [INFO] 🚀 开始高级游戏发现...
[2025-09-09T03:57:51.995Z] [INFO] 📂 步骤1: 爬取分类页面
[2025-09-09T03:57:51.995Z] [INFO] 🔍 爬取分类: action
[2025-09-09T03:57:51.995Z] [SUCCESS] ✅ 发现 15 个游戏链接
[2025-09-09T03:57:51.995Z] [SUCCESS] 🎉 发现 3 个新游戏！
```

### discovered-games.json 示例
```json
{
  "timestamp": "2025-09-09T03:57:51.995Z",
  "totalUrls": 150,
  "urls": [
    "https://gamemonetize.com/super-racing-adventure-game",
    "https://gamemonetize.com/mystery-puzzle-quest-game",
    ...
  ]
}
```

## 🔍 验证爬虫是否抓到新游戏

### 方法1：检查日志
```bash
# 查看爬虫运行状态
grep "新游戏" logs/advanced-crawler.log

# 查看总结报告
grep "=== 高级爬虫报告 ===" -A 10 logs/advanced-crawler.log
```

### 方法2：对比游戏数量
```bash
# 运行前记录当前游戏数量
wc -l src/data/gameMonetizeData.ts

# 运行爬虫后再次检查
wc -l src/data/gameMonetizeData.ts
```

### 方法3：查看最新发现
```bash
# 查看最近的发现记录
node -e "
const data = require('./logs/discovered-games.json');
console.log('最新发现:', new Date(data.timestamp).toLocaleString());
console.log('游戏数量:', data.totalUrls);
console.log('前5个游戏:');
data.urls.slice(0, 5).forEach((url, i) => console.log(\`  \${i+1}. \${url}\`));
"
```

## ⚡ 常用命令组合

### 运行爬虫并实时查看结果
```bash
# 在一个终端运行爬虫
node scripts/advancedGameCrawler.js &

# 在另一个终端实时查看日志
tail -f logs/advanced-crawler.log
```

### 快速检查是否有新发现
```bash
# 运行测试爬虫
node scripts/testCrawler.js

# 查看结果
cat logs/discovered-test-games.json | jq '.games[].title'
```

## ⚠️ 注意事项

1. **请求间隔**：爬虫设置了3秒的请求间隔，避免被网站限制
2. **并发限制**：一次只运行一个爬虫实例
3. **网络要求**：需要稳定的网络连接
4. **存储空间**：确保有足够的磁盘空间存储日志
5. **合规使用**：遵守网站的robots.txt和使用条款

## 🛠️ 故障排除

### 爬虫无响应
```bash
# 检查进程
ps aux | grep advancedGameCrawler

# 强制终止
pkill -f advancedGameCrawler
```

### 日志文件缺失
```bash
# 确保logs目录存在
mkdir -p logs

# 重新运行爬虫
node scripts/advancedGameCrawler.js
```

### 网络连接问题
```bash
# 测试网络连接
curl -I https://gamemonetize.com

# 检查DNS解析
nslookup gamemonetize.com
```

## 📈 性能优化建议

1. **分批运行**：如果游戏数量很大，考虑分批运行
2. **定时任务**：设置定时任务定期运行爬虫
3. **监控磁盘**：定期清理旧的日志文件
4. **网络优化**：在网络状况好的时间运行

---

📝 **更新时间**: 2025-09-09  
🔗 **相关文档**: README.md, GAME_UPDATE_GUIDE.md 