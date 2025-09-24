import { allGames } from '../data/gameData';
import { topicPages } from '../data/topicPages';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  images?: SitemapImage[];
}

export interface SitemapImage {
  loc: string;
  title?: string;
  caption?: string;
}

export interface SitemapIndex {
  loc: string;
  lastmod: string;
}

class EnhancedSitemapGenerator {
  private baseUrl: string = 'https://queensgame.com';
  private maxUrlsPerSitemap: number = 50000;

  constructor(baseUrl?: string) {
    if (baseUrl) {
      this.baseUrl = baseUrl;
    }
  }

  // Generate main sitemap index
  generateSitemapIndex(): string {
    const sitemaps: SitemapIndex[] = [
      {
        loc: `${this.baseUrl}/sitemap-main.xml`,
        lastmod: new Date().toISOString()
      },
      {
        loc: `${this.baseUrl}/sitemap-games.xml`,
        lastmod: new Date().toISOString()
      },
      {
        loc: `${this.baseUrl}/sitemap-topics.xml`,
        lastmod: new Date().toISOString()
      }
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    sitemaps.forEach(sitemap => {
      xml += `
  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`;
    });

    xml += `
</sitemapindex>`;

    return xml;
  }

  // Generate main pages sitemap
  generateMainSitemap(): string {
    const urls: SitemapUrl[] = [
      {
        loc: `${this.baseUrl}/`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 1.0
      },
      {
        loc: `${this.baseUrl}/games`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.9
      },
      {
        loc: `${this.baseUrl}/yugioh-genesys`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.9,
        images: [{
          loc: `${this.baseUrl}/thumbnail/yugioh-genesys-banner.jpg`,
          caption: 'Yu-Gi-Oh! GENESYS - Revolutionary TCG Format Guide',
          title: 'Yu-Gi-Oh! GENESYS Format Overview'
        }]
      },
      {
        loc: `${this.baseUrl}/hollow-knight-silksong`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: `${this.baseUrl}/drift-boss`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: `${this.baseUrl}/rabbit-road`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: `${this.baseUrl}/about`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.5
      },
      {
        loc: `${this.baseUrl}/privacy`,
        lastmod: new Date().toISOString(),
        changefreq: 'yearly',
        priority: 0.3
      },
      {
        loc: `${this.baseUrl}/terms`,
        lastmod: new Date().toISOString(),
        changefreq: 'yearly',
        priority: 0.3
      }
    ];

    return this.generateSitemapXML(urls);
  }

  // Generate games sitemap
  generateGamesSitemap(): string {
    const urls: SitemapUrl[] = allGames.map(game => {
      const gameUrl = game.url.split('/').pop();
      const lastmod = game.lastModified || game.createdAt;
      
      return {
        loc: `${this.baseUrl}/games/${gameUrl}`,
        lastmod: new Date(lastmod).toISOString(),
        changefreq: 'weekly',
        priority: this.calculateGamePriority(game),
        images: [{
          loc: game.thumbnail,
          title: game.title,
          caption: game.shortDescription || game.description.substring(0, 120) + '...'
        }]
      };
    });

    return this.generateSitemapXML(urls);
  }

  // Generate topics sitemap
  generateTopicsSitemap(): string {
    const urls: SitemapUrl[] = topicPages.map(topic => ({
      loc: `${this.baseUrl}/topic/${topic.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: this.calculateTopicPriority(topic.priority)
    }));

    return this.generateSitemapXML(urls);
  }

  // Calculate game priority based on metrics
  private calculateGamePriority(game: any): number {
    let priority = 0.6; // Base priority for games

    // Boost priority for featured games
    if (game.featured) priority += 0.2;
    if (game.trending) priority += 0.15;
    if (game.editorsPick) priority += 0.1;
    if (game.exclusive) priority += 0.05;

    // Boost based on rating
    if (game.rating && game.rating >= 4.5) priority += 0.1;
    else if (game.rating && game.rating >= 4.0) priority += 0.05;

    // Boost based on play count
    if (game.plays && game.plays >= 100000) priority += 0.1;
    else if (game.plays && game.plays >= 50000) priority += 0.05;

    return Math.min(priority, 1.0); // Cap at 1.0
  }

  // Calculate topic priority based on importance
  private calculateTopicPriority(topicPriority: number): number {
    // Convert topic priority (1-12) to sitemap priority (0.5-0.9)
    const normalized = 1 - (topicPriority - 1) / 11; // Normalize to 0-1
    return 0.5 + (normalized * 0.4); // Scale to 0.5-0.9 range
  }

  // Generate sitemap XML from URLs
  private generateSitemapXML(urls: SitemapUrl[]): string {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

    urls.forEach(url => {
      xml += `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>`;

      // Add image information if available
      if (url.images && url.images.length > 0) {
        url.images.forEach(image => {
          xml += `
    <image:image>
      <image:loc>${image.loc}</image:loc>`;
          if (image.title) {
            xml += `
      <image:title><![CDATA[${image.title}]]></image:title>`;
          }
          if (image.caption) {
            xml += `
      <image:caption><![CDATA[${image.caption}]]></image:caption>`;
          }
          xml += `
    </image:image>`;
        });
      }

      xml += `
  </url>`;
    });

    xml += `
</urlset>`;

    return xml;
  }

  // Generate robots.txt
  generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# Enhanced SEO directives
Allow: /games/
Allow: /topic/
Allow: /*.css
Allow: /*.js
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.gif
Allow: /*.webp
Allow: /*.svg
Allow: /*.ico

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /analytics/
Disallow: /*.json$
Disallow: /*?*utm_*
Disallow: /*?*ref=*
Disallow: /*?*source=*

# Sitemaps
Sitemap: ${this.baseUrl}/sitemap.xml
Sitemap: ${this.baseUrl}/sitemap-games.xml
Sitemap: ${this.baseUrl}/sitemap-topics.xml

# Crawl delay to be respectful
Crawl-delay: 1`;
  }

  // Generate comprehensive meta tags for pages
  generateMetaTags(options: {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'game';
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
  }): string {
    const {
      title,
      description,
      keywords = [],
      image = `${this.baseUrl}/og-banner.png`,
      url = this.baseUrl,
      type = 'website',
      author = 'QueensGame',
      publishedTime,
      modifiedTime
    } = options;

    return `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords.join(', ')}">
<meta name="author" content="${author}">
<meta name="robots" content="index, follow">
<meta name="language" content="English">
<meta name="revisit-after" content="7 days">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${type}">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">
<meta property="og:site_name" content="QueensGame">
<meta property="og:locale" content="en_US">
${publishedTime ? `<meta property="article:published_time" content="${publishedTime}">` : ''}
${modifiedTime ? `<meta property="article:modified_time" content="${modifiedTime}">` : ''}

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${image}">
<meta property="twitter:site" content="@QueensGame">

<!-- Additional SEO -->
<meta name="theme-color" content="#6366f1">
<meta name="msapplication-TileColor" content="#6366f1">
<meta name="apple-mobile-web-app-title" content="QueensGame">
<meta name="application-name" content="QueensGame">

<!-- Canonical URL -->
<link rel="canonical" href="${url}">

<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://img.gamemonetize.com">
<link rel="preconnect" href="https://html5.gamemonetize.com">
<link rel="preconnect" href="https://www.googletagmanager.com">`;
  }

  // Generate JSON-LD structured data for games
  generateGameStructuredData(game: any, gameUrl: string): string {
    const structuredData: any = {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      "name": game.title,
      "description": game.description,
      "image": game.thumbnail,
      "url": `${this.baseUrl}${gameUrl}`,
      "genre": game.category,
      "gamePlatform": ["Web Browser", "HTML5"],
      "applicationCategory": "Game",
      "operatingSystem": "Any",
      "browserRequirements": "HTML5",
      "keywords": game.seoKeywords || game.tags.join(', '),
      "inLanguage": "en",
      "isAccessibleForFree": true,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": game.rating || 4.5,
        "ratingCount": Math.floor((game.plays || 25000) / 100),
        "bestRating": 5,
        "worstRating": 1
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "validFrom": game.createdAt
      },
      "publisher": {
        "@type": "Organization",
        "name": "QueensGame",
        "url": this.baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${this.baseUrl}/logo.png`
        }
      },
      "provider": {
        "@type": "Organization",
        "name": game.provider || "GameMonetize"
      },
      "creator": {
        "@type": "Person",
        "name": game.author || "Game Developer"
      },
      "datePublished": game.createdAt,
      "dateModified": game.lastModified || game.createdAt,
      "playMode": "SinglePlayer",
      "accessMode": "visual",
      "accessibilityFeature": [
        "alternativeText",
        "longDescription"
      ],
      "audience": {
        "@type": "Audience",
        "audienceType": "General Public"
      },
      "interactionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/PlayAction",
        "userInteractionCount": game.plays || 25000
      }
    };

    // Add game instructions if available
    if (game.instructions && game.instructions.length > 0) {
      structuredData["gameItem"] = {
        "@type": "Thing",
        "name": "Game Instructions",
        "description": game.instructions.join(' ')
      };
    }

    return JSON.stringify(structuredData, null, 2);
  }

  // Generate JSON-LD structured data for topic pages
  generateTopicStructuredData(topic: any, gamesCount: number): string {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": topic.title,
      "description": topic.description,
      "url": `${this.baseUrl}/topic/${topic.slug}`,
      "inLanguage": "en",
      "publisher": {
        "@type": "Organization",
        "name": "QueensGame",
        "url": this.baseUrl
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": topic.title,
        "description": topic.description,
        "numberOfItems": gamesCount,
        "itemListOrder": "https://schema.org/ItemListOrderDescending"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": this.baseUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": topic.title,
            "item": `${this.baseUrl}/topic/${topic.slug}`
          }
        ]
      },
      "keywords": topic.seoKeywords,
      "audience": {
        "@type": "Audience",
        "audienceType": "Gamers"
      }
    };

    return JSON.stringify(structuredData, null, 2);
  }

  // Generate organization structured data
  generateOrganizationStructuredData(): string {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "QueensGame",
      "alternateName": "Queens Game",
      "url": this.baseUrl,
      "logo": `${this.baseUrl}/logo.png`,
      "description": "Premium online gaming platform offering free HTML5 games for all ages. Play the best browser games instantly without downloads.",
      "foundingDate": "2024",
      "sameAs": [
        "https://twitter.com/queensgame",
        "https://facebook.com/queensgame"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "support@queensgame.com"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      },
      "areaServed": "Worldwide",
      "knowsAbout": [
        "HTML5 Games",
        "Browser Games",
        "Online Gaming",
        "Free Games",
        "Web Games"
      ]
    };

    return JSON.stringify(structuredData, null, 2);
  }

  // Generate website structured data
  generateWebsiteStructuredData(): string {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "QueensGame",
      "url": this.baseUrl,
      "description": "Play the best HTML5 games online for free. Premium gaming platform with action, puzzle, racing, and adventure games.",
      "inLanguage": "en",
      "copyrightYear": new Date().getFullYear(),
      "publisher": {
        "@type": "Organization",
        "name": "QueensGame"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${this.baseUrl}/?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "General Public"
      }
    };

    return JSON.stringify(structuredData, null, 2);
  }
}

// Export default instance
export const sitemapGenerator = new EnhancedSitemapGenerator();

// Export utility functions
export const generateSitemap = () => sitemapGenerator.generateGamesSitemap();
export const generateTopicsSitemap = () => sitemapGenerator.generateTopicsSitemap();
export const generateRobotsTxt = () => sitemapGenerator.generateRobotsTxt();
export const generateMetaTags = (options: Parameters<typeof sitemapGenerator.generateMetaTags>[0]) => 
  sitemapGenerator.generateMetaTags(options);
export const generateGameStructuredData = (game: any, gameUrl: string) => 
  sitemapGenerator.generateGameStructuredData(game, gameUrl);
export const generateTopicStructuredData = (topic: any, gamesCount: number) => 
  sitemapGenerator.generateTopicStructuredData(topic, gamesCount); 