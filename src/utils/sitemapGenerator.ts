import { allGames } from '../data/gameData';

export const generateSitemap = (): string => {
  const baseUrl = 'https://queensgame.com'; // 替换为你的实际域名
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 首页 -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  // 添加所有游戏页面
  allGames.forEach(game => {
    const gameUrl = game.url.split('/').pop();
    const lastmod = new Date(game.createdAt).toISOString();
    
    sitemap += `
  <url>
    <loc>${baseUrl}/games/${gameUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

export const generateRobotsTxt = (): string => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://queensgame.com/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /api/

# Allow game pages
Allow: /games/
Allow: /category/
Allow: /search/

# Crawl delay (optional)
Crawl-delay: 1`;
}; 