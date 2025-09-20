// SEO配置文件
export const SEO_CONFIG = {
  // 网站基本信息
  site: {
    name: 'QueensGame',
    title: 'QueensGame - Premium Online Gaming Platform',
    description: 'Play the best HTML5 games online for free at QueensGame. Discover our premium collection of royal gaming experiences.',
    url: 'https://queensgame.com',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    googleSiteVerification: '7nyl1VQyl6O-0zA_KxHUY0QGIGg27u9a3bttPamb5ro'
  },

  // 分析工具配置
  analytics: {
    googleAnalytics: {
      id: 'G-ZNRLP8573S',
      enabled: true
    },
    microsoftClarity: {
      id: 'sqgjrwwaak',
      enabled: true
    },
    cloudflareAnalytics: {
      token: 'cb279830e2fb477caadbb1025d77d9f3',
      enabled: true
    }
  },

  // AdSense配置
  adsense: {
    publisherId: 'ca-pub-9816094922761343',
    enabled: true,
    testMode: false
  },

  // 社交媒体配置
  social: {
    facebook: {
      appId: 'YOUR_FACEBOOK_APP_ID',
      enabled: false
    },
    twitter: {
      username: '@QueensGame',
      enabled: true
    },
    instagram: {
      username: 'queensgame',
      enabled: false
    }
  },

  // 默认页面SEO设置
  defaultPage: {
    title: 'QueensGame - Premium Online Gaming Platform',
    description: 'Play the best HTML5 games online for free. Discover our premium collection of royal gaming experiences.',
    keywords: 'online games, HTML5 games, free games, royal games, action games, adventure games, puzzle games, racing games',
    image: '/og-image.jpg',
    type: 'website'
  },

  // 游戏页面SEO模板
  gamePage: {
    titleTemplate: '{gameTitle} - Play Online at QueensGame',
    descriptionTemplate: 'Play {gameTitle} online for free at QueensGame. {gameDescription}',
    keywordsTemplate: '{gameTitle}, {gameCategory}, online games, free games, HTML5 games',
    imageTemplate: '{gameThumbnail}',
    type: 'game'
  },

  // 分类页面SEO模板
  categoryPage: {
    titleTemplate: '{categoryName} Games - Play Online at QueensGame',
    descriptionTemplate: 'Play the best {categoryName} games online for free at QueensGame. Discover exciting {categoryName} gaming experiences.',
    keywordsTemplate: '{categoryName}, {categoryName} games, online games, free games',
    imageTemplate: '/category-{categorySlug}.jpg',
    type: 'website'
  },

  // 结构化数据配置
  structuredData: {
    organization: {
      name: 'QueensGame',
      url: 'https://queensgame.com',
      logo: 'https://queensgame.com/logo.png',
      description: 'Premium online gaming platform offering free HTML5 games',
      sameAs: [
        'https://twitter.com/QueensGame',
        'https://facebook.com/QueensGame'
      ]
    },
    website: {
      name: 'QueensGame',
      url: 'https://queensgame.com',
      description: 'Premium online gaming platform'
    }
  },

  // 性能优化配置
  performance: {
    preconnect: [
      'https://pagead2.googlesyndication.com',
      'https://www.googletagmanager.com',
      'https://www.clarity.ms',
      'https://static.cloudflareinsights.com'
    ],
    prefetch: [
      '/games',
      '/categories'
    ]
  }
};

// 生成页面标题
export function generatePageTitle(pageTitle: string, template?: string): string {
  if (template) {
    return template.replace('{pageTitle}', pageTitle);
  }
  return `${pageTitle} - ${SEO_CONFIG.site.name}`;
}

// 生成页面描述
export function generatePageDescription(description: string, template?: string): string {
  if (template) {
    return template.replace('{description}', description);
  }
  return description;
}

// 生成页面关键词
export function generatePageKeywords(keywords: string[], template?: string): string {
  const keywordsString = keywords.join(', ');
  if (template) {
    return template.replace('{keywords}', keywordsString);
  }
  return keywordsString;
}

// 生成Open Graph数据
export function generateOpenGraphData(data: {
  title: string;
  description: string;
  image?: string;
  type?: string;
  url?: string;
}) {
  return {
    'og:title': data.title,
    'og:description': data.description,
    'og:image': data.image || SEO_CONFIG.defaultPage.image,
    'og:type': data.type || SEO_CONFIG.defaultPage.type,
    'og:url': data.url || SEO_CONFIG.site.url,
    'og:site_name': SEO_CONFIG.site.name
  };
}

// 生成Twitter Card数据
export function generateTwitterCardData(data: {
  title: string;
  description: string;
  image?: string;
}) {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': data.title,
    'twitter:description': data.description,
    'twitter:image': data.image || SEO_CONFIG.defaultPage.image,
    'twitter:site': SEO_CONFIG.social.twitter.username
  };
} 