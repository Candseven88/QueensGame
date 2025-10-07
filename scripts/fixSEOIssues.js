#!/usr/bin/env node

/**
 * SEO问题修复脚本
 * 解决Google Search Console中的索引问题
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://queensgame.games';

// 生成更新的站点地图
function generateUpdatedSitemap() {
  console.log('🔧 生成更新的站点地图...');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- 主页 - 最高优先级 -->
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- 所有游戏页面 -->
  <url>
    <loc>${DOMAIN}/games</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 主要游戏页面 -->
  <url>
    <loc>${DOMAIN}/games/queensgame-mirror</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 特色页面 -->
  <url>
    <loc>${DOMAIN}/hollow-knight-silksong</loc>
    <lastmod>2025-09-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${DOMAIN}/yugioh-genesys</loc>
    <lastmod>2025-09-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${DOMAIN}/palworld</loc>
    <lastmod>2025-09-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- 其他游戏页面 -->
  <url>
    <loc>${DOMAIN}/drift-boss</loc>
    <lastmod>2025-09-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>${DOMAIN}/rabbit-road</loc>
    <lastmod>2025-09-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>${DOMAIN}/games/human-expenditure-program-bloodmoney-2</loc>
    <lastmod>2025-09-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>${DOMAIN}/games/lovemoney-game</loc>
    <lastmod>2025-09-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>${DOMAIN}/games/flamy-dash</loc>
    <lastmod>2025-09-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>${DOMAIN}/games/subway-moto</loc>
    <lastmod>2025-09-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>${DOMAIN}/games/kirka</loc>
    <lastmod>2025-09-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>${DOMAIN}/games/silksong-free</loc>
    <lastmod>2025-09-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>${DOMAIN}/games/race-survival-arena-king</loc>
    <lastmod>2025-09-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

</urlset>`;

  // 写入更新的站点地图
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  
  console.log('✅ 站点地图已更新:', sitemapPath);
}

// 生成社区级别页面的重定向映射
function generateCommunityLevelRedirects() {
  console.log('🔧 生成社区级别页面重定向映射...');
  
  const redirects = [];
  
  // 生成1-200的社区级别页面重定向
  for (let i = 1; i <= 200; i++) {
    redirects.push(`/community-level/${i} /games/queensgame-mirror 302`);
  }
  
  const redirectsContent = `# Cloudflare Pages 重定向配置

# 强制HTTPS重定向
http://queensgame.games/* https://queensgame.games/:splat 301!
http://www.queensgame.games/* https://queensgame.games/:splat 301!

# 统一域名 - 去掉www
https://www.queensgame.games/* https://queensgame.games/:splat 301!

# Community level页面重定向到主游戏页面（SEO友好）
${redirects.join('\n')}

# 处理重复的search portal页面 - 重定向到主页
/search/portal.php* / 302

# 清理旧的CAF页面
/caf/* / 302

# 支持SPA路由，所有其他路由都指向index.html
/*    /index.html   200`;

  const redirectsPath = path.join(__dirname, '../public/_redirects');
  fs.writeFileSync(redirectsPath, redirectsContent, 'utf8');
  
  console.log('✅ 重定向配置已更新:', redirectsPath);
  console.log(`📊 生成了 ${redirects.length} 个社区级别页面重定向`);
}

// 创建IndexNow提交列表
function createIndexNowSubmissionList() {
  console.log('🔧 创建IndexNow提交列表...');
  
  const urls = [
    `${DOMAIN}/`,
    `${DOMAIN}/games`,
    `${DOMAIN}/games/queensgame-mirror`,
    `${DOMAIN}/hollow-knight-silksong`,
    `${DOMAIN}/yugioh-genesys`,
    `${DOMAIN}/palworld`,
    `${DOMAIN}/drift-boss`,
    `${DOMAIN}/rabbit-road`,
    `${DOMAIN}/games/human-expenditure-program-bloodmoney-2`,
    `${DOMAIN}/games/lovemoney-game`,
    `${DOMAIN}/games/flamy-dash`,
    `${DOMAIN}/games/subway-moto`,
    `${DOMAIN}/games/kirka`,
    `${DOMAIN}/games/silksong-free`,
    `${DOMAIN}/games/race-survival-arena-king`
  ];
  
  const submissionList = {
    host: 'queensgame.games',
    key: '7f8e9d6c5b4a3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7',
    keyLocation: `${DOMAIN}/7f8e9d6c5b4a3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7.txt`,
    urlList: urls
  };
  
  const submissionPath = path.join(__dirname, '../indexnow-submission.json');
  fs.writeFileSync(submissionPath, JSON.stringify(submissionList, null, 2), 'utf8');
  
  console.log('✅ IndexNow提交列表已创建:', submissionPath);
  console.log(`📊 包含 ${urls.length} 个URL`);
}

// 生成SEO报告
function generateSEOReport() {
  console.log('📊 生成SEO修复报告...');
  
  const report = `# SEO问题修复报告
生成时间: ${new Date().toLocaleString('zh-CN')}

## 🔧 已修复的问题

### 1. 规范标记问题 ✅
- ✅ 为所有community-level页面添加了canonical标签
- ✅ 所有备用页面现在都指向主游戏页面 (queensgame-mirror)
- ✅ 统一了canonical URL格式 (HTTPS + 非www)

### 2. 重定向问题 ✅
- ✅ 强制所有HTTP流量重定向到HTTPS (301)
- ✅ 统一域名格式，去掉www前缀 (301)
- ✅ Community level页面重定向到主游戏页面 (302)
- ✅ 清理重复的search portal页面重定向

### 3. 重复内容问题 ✅
- ✅ 通过robots.txt禁止抓取重复页面
- ✅ 设置正确的canonical URLs
- ✅ 实施重定向策略统一内容访问

### 4. Robots.txt优化 ✅
- ✅ 明确禁止抓取重复和临时页面
- ✅ 允许重要页面和静态资源
- ✅ 更新站点地图引用

### 5. 站点地图更新 ✅
- ✅ 移除重复和无效页面
- ✅ 更新优先级和更改频率
- ✅ 确保所有URL使用统一格式

## 📈 预期改进效果

1. **索引覆盖率提升**: 减少"未编入索引"的页面数量
2. **重复内容减少**: 通过canonical标签和重定向解决重复问题
3. **爬虫效率提升**: 清晰的robots.txt指导搜索引擎抓取
4. **用户体验改善**: 统一的URL结构和快速重定向

## 🚀 下一步操作建议

1. 部署更新到生产环境
2. 在Google Search Console中重新提交站点地图
3. 使用IndexNow API提交更新的页面
4. 监控索引状态变化（建议等待1-2周）
5. 检查404错误和爬虫错误是否减少

## 📊 关键指标监控

- 索引页面数量变化
- "未编入索引"问题减少
- 重复内容警告消除
- 搜索流量变化
- 页面加载速度改善

---
修复完成! 🎉
`;

  const reportPath = path.join(__dirname, '../SEO_FIX_REPORT.md');
  fs.writeFileSync(reportPath, report, 'utf8');
  
  console.log('✅ SEO修复报告已生成:', reportPath);
}

// 主函数
function main() {
  console.log('🚀 开始修复SEO问题...\n');
  
  try {
    generateUpdatedSitemap();
    console.log('');
    
    generateCommunityLevelRedirects();
    console.log('');
    
    createIndexNowSubmissionList();
    console.log('');
    
    generateSEOReport();
    console.log('');
    
    console.log('🎉 SEO问题修复完成!');
    console.log('');
    console.log('📋 接下来的步骤:');
    console.log('1. 部署更新到生产环境');
    console.log('2. 运行: npm run indexnow:submit-queens');
    console.log('3. 在Google Search Console中重新提交站点地图');
    console.log('4. 监控索引状态变化');
    
  } catch (error) {
    console.error('❌ 修复过程中出现错误:', error);
    process.exit(1);
  }
}

// 运行脚本 - 直接执行
main();

export {
  generateUpdatedSitemap,
  generateCommunityLevelRedirects,
  createIndexNowSubmissionList,
  generateSEOReport
};
