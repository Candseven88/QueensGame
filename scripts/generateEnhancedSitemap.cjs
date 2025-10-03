const fs = require('fs');
const path = require('path');

// 基础配置
const baseUrl = 'https://queensgame.games';
const currentDate = new Date().toISOString().split('T')[0];

// 生成主页面站点地图
function generateMainSitemap() {
  const urls = [
    {
      loc: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/games`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/yugioh-genesys`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/hollow-knight-silksong`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/drift-boss`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/rabbit-road`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/games/queensgame-mirror`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    }
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  urls.forEach(url => {
    xml += `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
`;
    
    // 为Yu-Gi-Oh! GENESYS页面添加图片信息
    if (url.loc.includes('yugioh-genesys')) {
      xml += `    <image:image>
      <image:loc>${baseUrl}/thumbnail/yugioh-genesys-banner.jpg</image:loc>
      <image:caption>Yu-Gi-Oh! GENESYS - Revolutionary TCG Format Guide</image:caption>
      <image:title>Yu-Gi-Oh! GENESYS Format Overview</image:title>
    </image:image>
`;
    }
    
    xml += `  </url>
`;
  });

  xml += `</urlset>`;
  return xml;
}

// 生成主题页面站点地图
function generateTopicsSitemap() {
  const topics = [
    { slug: 'yugioh-genesys', title: 'Yu-Gi-Oh! GENESYS', priority: 0.9 },
    { slug: 'trending', title: 'Trending Games', priority: 0.8 },
    { slug: 'editors-picks', title: "Editor's Picks", priority: 0.8 },
    { slug: 'best-games', title: 'Best Games', priority: 0.8 },
    { slug: 'most-played', title: 'Most Played', priority: 0.7 },
    { slug: 'hot-games', title: 'Hot Games', priority: 0.7 },
    { slug: 'weekly-picks', title: 'Weekly Picks', priority: 0.6 },
    { slug: 'exclusive', title: 'Exclusive Games', priority: 0.6 },
    { slug: 'puzzle-games', title: 'Puzzle Games', priority: 0.6 },
    { slug: 'action-games', title: 'Action Games', priority: 0.6 }
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  topics.forEach(topic => {
    xml += `  <url>
    <loc>${baseUrl}/topic/${topic.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${topic.priority}</priority>
  </url>
`;
  });

  xml += `</urlset>`;
  return xml;
}

// 生成站点地图索引
function generateSitemapIndex() {
  const sitemaps = [
    { loc: `${baseUrl}/sitemap-main.xml`, lastmod: currentDate },
    { loc: `${baseUrl}/sitemap-games.xml`, lastmod: currentDate },
    { loc: `${baseUrl}/sitemap-topics.xml`, lastmod: currentDate },
    { loc: `${baseUrl}/sitemap.xml`, lastmod: currentDate }
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  sitemaps.forEach(sitemap => {
    xml += `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>
`;
  });

  xml += `</sitemapindex>`;
  return xml;
}

// 生成robots.txt
function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap-index.xml
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-games.xml
Sitemap: ${baseUrl}/sitemap-topics.xml
Sitemap: ${baseUrl}/sitemap-main.xml

# Important pages
Allow: /yugioh-genesys
Allow: /games
Allow: /topic/

# Crawl delay
Crawl-delay: 1

# Clean URLs
Allow: /*.css
Allow: /*.js
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.gif
Allow: /*.webp
`;
}

// 主函数
function main() {
  try {
    console.log('🚀 生成增强版站点地图...');
    
    // 确保public目录存在
    const publicDir = path.join(__dirname, '..', 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // 生成所有站点地图文件
    const mainSitemap = generateMainSitemap();
    const topicsSitemap = generateTopicsSitemap();
    const sitemapIndex = generateSitemapIndex();
    const robotsTxt = generateRobotsTxt();

    // 写入文件
    fs.writeFileSync(path.join(publicDir, 'sitemap-main.xml'), mainSitemap);
    fs.writeFileSync(path.join(publicDir, 'sitemap-topics.xml'), topicsSitemap);
    fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex);
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);

    console.log('✅ 增强版站点地图生成成功！');
    console.log('📁 生成的文件:');
    console.log('   • sitemap-main.xml (主页面站点地图)');
    console.log('   • sitemap-topics.xml (主题页面站点地图)');
    console.log('   • sitemap-index.xml (站点地图索引)');
    console.log('   • robots.txt (更新的机器人文件)');
    console.log('');
    console.log('🎯 Yu-Gi-Oh! GENESYS页面已添加到:');
    console.log('   • 主页面站点地图 (高优先级 0.9)');
    console.log('   • 主题页面站点地图 (最高优先级 0.9)');
    console.log('   • 包含SEO图片标签');
    console.log('');
    console.log('📈 SEO优化:');
    console.log('   • 每周更新频率');
    console.log('   • 高优先级权重');
    console.log('   • 结构化数据支持');
    console.log('   • 图片站点地图集成');

  } catch (error) {
    console.error('❌ 生成站点地图时出错:', error.message);
    process.exit(1);
  }
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = {
  generateMainSitemap,
  generateTopicsSitemap,
  generateSitemapIndex,
  generateRobotsTxt
}; 