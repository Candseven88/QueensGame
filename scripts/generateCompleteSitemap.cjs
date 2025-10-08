const fs = require('fs');
const path = require('path');

// 基础配置
const baseUrl = 'https://queensgame.games';
const currentDate = new Date().toISOString().split('T')[0];

// 读取游戏数据
function loadGameData() {
  try {
    // 读取游戏数据文件
    const gameDataPath = path.join(__dirname, '..', 'src', 'data', 'gameData.ts');
    const gameDataContent = fs.readFileSync(gameDataPath, 'utf8');
    
    // 提取所有游戏URL
    const urlMatches = gameDataContent.match(/url:\s*["']([^"']+)["']/g);
    const gameUrls = urlMatches ? urlMatches.map(match => {
      const url = match.match(/["']([^"']+)["']/)[1];
      return url.startsWith('/games/') ? url.replace('/games/', '') : url;
    }).filter(url => url.startsWith('/games/') || url.includes('games/')) : [];
    
    // 提取创建时间
    const createdAtMatches = gameDataContent.match(/createdAt:\s*["']([^"']+)["']/g);
    const createdDates = createdAtMatches ? createdAtMatches.map(match => {
      return match.match(/["']([^"']+)["']/)[1];
    }) : [];
    
    // 提取游戏ID和标题用于更好的URL映射
    const idMatches = gameDataContent.match(/id:\s*["']([^"']+)["']/g);
    const titleMatches = gameDataContent.match(/title:\s*["']([^"']+)["']/g);
    
    const gameIds = idMatches ? idMatches.map(match => match.match(/["']([^"']+)["']/)[1]) : [];
    const gameTitles = titleMatches ? titleMatches.map(match => match.match(/["']([^"']+)["']/)[1]) : [];
    
    console.log(`📊 发现 ${gameIds.length} 个游戏`);
    
    return gameIds.map((id, index) => ({
      id,
      title: gameTitles[index] || id,
      url: `/games/${id}`,
      createdAt: createdDates[index] || currentDate
    }));
    
  } catch (error) {
    console.warn('⚠️ 无法读取游戏数据，使用默认游戏列表');
    return [
      { id: 'tap-road', title: 'TAP ROAD', url: '/games/tap-road', createdAt: currentDate },
      { id: 'pixel-exile', title: 'Pixel Exile', url: '/games/pixel-exile', createdAt: currentDate },
      { id: 'queensgame-mirror', title: 'Queens Game 225', url: '/games/queensgame-mirror', createdAt: currentDate }
    ];
  }
}

// 生成游戏站点地图
function generateGamesSitemap() {
  const games = loadGameData();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  games.forEach(game => {
    const lastmod = game.createdAt ? new Date(game.createdAt).toISOString().split('T')[0] : currentDate;
    
    xml += `  <url>
    <loc>${baseUrl}${game.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
`;

    // 为特定游戏添加图片信息
    if (game.id === 'tap-road') {
      xml += `    <image:image>
      <image:loc>${baseUrl}/thumbnail/TAP ROAD 1.jpg</image:loc>
      <image:caption>TAP ROAD - Neon Ball Rolling Adventure Game</image:caption>
      <image:title>TAP ROAD Endless Runner Game</image:title>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/thumbnail/TAP ROAD 2.webp</image:loc>
      <image:caption>TAP ROAD Advanced Level Gameplay</image:caption>
      <image:title>TAP ROAD Challenge Mode</image:title>
    </image:image>
`;
    } else if (game.id === 'pixel-exile') {
      xml += `    <image:image>
      <image:loc>${baseUrl}/thumbnail/Pixel Exile - Incremental ARPG.png</image:loc>
      <image:caption>Pixel Exile - Incremental ARPG Adventure</image:caption>
      <image:title>Pixel Exile Action RPG Game</image:title>
    </image:image>
`;
    } else if (game.id === 'queensgame-mirror') {
      xml += `    <image:image>
      <image:loc>${baseUrl}/thumbnail/queens-game.jpg</image:loc>
      <image:caption>Queens Game 225 - Ultimate Royal Puzzle Challenge</image:caption>
      <image:title>Queens Game Level 152, 53, 81 Challenges</image:title>
    </image:image>
`;
    }

    xml += `  </url>
`;
  });

  xml += `</urlset>`;
  return xml;
}

// 生成主页面站点地图 (更新版)
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
    },
    {
      loc: `${baseUrl}/games/tap-road`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/games/pixel-exile`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
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
    
    // 为特定页面添加图片信息
    if (url.loc.includes('yugioh-genesys')) {
      xml += `    <image:image>
      <image:loc>${baseUrl}/thumbnail/yugioh-genesys-banner.jpg</image:loc>
      <image:caption>Yu-Gi-Oh! GENESYS - Revolutionary TCG Format Guide</image:caption>
      <image:title>Yu-Gi-Oh! GENESYS Format Overview</image:title>
    </image:image>
`;
    } else if (url.loc.includes('tap-road')) {
      xml += `    <image:image>
      <image:loc>${baseUrl}/thumbnail/TAP ROAD 1.jpg</image:loc>
      <image:caption>TAP ROAD - Neon Ball Rolling Adventure Game</image:caption>
      <image:title>TAP ROAD Endless Runner Game</image:title>
    </image:image>
`;
    } else if (url.loc.includes('pixel-exile')) {
      xml += `    <image:image>
      <image:loc>${baseUrl}/thumbnail/Pixel Exile - Incremental ARPG.png</image:loc>
      <image:caption>Pixel Exile - Incremental ARPG Adventure</image:caption>
      <image:title>Pixel Exile Action RPG Game</image:title>
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
    { slug: 'tap-road-games', title: 'TAP ROAD Games', priority: 0.8 },
    { slug: 'trending', title: 'Trending Games', priority: 0.8 },
    { slug: 'editors-picks', title: "Editor's Picks", priority: 0.8 },
    { slug: 'best-games', title: 'Best Games', priority: 0.8 },
    { slug: 'most-played', title: 'Most Played', priority: 0.7 },
    { slug: 'hot-games', title: 'Hot Games', priority: 0.7 },
    { slug: 'weekly-picks', title: 'Weekly Picks', priority: 0.6 },
    { slug: 'exclusive', title: 'Exclusive Games', priority: 0.6 },
    { slug: 'puzzle-games', title: 'Puzzle Games', priority: 0.6 },
    { slug: 'action-games', title: 'Action Games', priority: 0.6 },
    { slug: 'endless-runner', title: 'Endless Runner Games', priority: 0.6 }
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
Allow: /games/tap-road
Allow: /games/pixel-exile
Allow: /games/queensgame-mirror
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
    console.log('🚀 生成完整站点地图 (包含TAP ROAD)...');
    
    // 确保public目录存在
    const publicDir = path.join(__dirname, '..', 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // 生成所有站点地图文件
    const mainSitemap = generateMainSitemap();
    const gamesSitemap = generateGamesSitemap();
    const topicsSitemap = generateTopicsSitemap();
    const sitemapIndex = generateSitemapIndex();
    const robotsTxt = generateRobotsTxt();

    // 写入文件
    fs.writeFileSync(path.join(publicDir, 'sitemap-main.xml'), mainSitemap);
    fs.writeFileSync(path.join(publicDir, 'sitemap-games.xml'), gamesSitemap);
    fs.writeFileSync(path.join(publicDir, 'sitemap-topics.xml'), topicsSitemap);
    fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex);
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);

    // 生成统一的sitemap.xml (包含所有页面)
    const allGamesSitemap = generateMainSitemap().replace('</urlset>', '') + 
                           gamesSitemap.replace('<?xml version="1.0" encoding="UTF-8"?>', '')
                                      .replace('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">', '');
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), allGamesSitemap);

    console.log('✅ 完整站点地图生成成功！');
    console.log('📁 生成的文件:');
    console.log('   • sitemap-main.xml (主页面站点地图)');
    console.log('   • sitemap-games.xml (游戏页面站点地图)');
    console.log('   • sitemap-topics.xml (主题页面站点地图)');
    console.log('   • sitemap-index.xml (站点地图索引)');
    console.log('   • sitemap.xml (统一站点地图)');
    console.log('   • robots.txt (更新的机器人文件)');
    console.log('');
    console.log('🎮 TAP ROAD游戏已添加到:');
    console.log('   • 主页面站点地图 (高优先级 0.9)');
    console.log('   • 游戏页面站点地图 (优先级 0.8)');
    console.log('   • 包含双图片SEO标签');
    console.log('   • robots.txt 允许访问');
    console.log('');
    console.log('📈 SEO优化:');
    console.log('   • 每周更新频率');
    console.log('   • 高优先级权重');
    console.log('   • 结构化图片数据');
    console.log('   • 多站点地图架构');

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
  generateGamesSitemap,
  generateTopicsSitemap,
  generateSitemapIndex,
  generateRobotsTxt
};
