# Cloudflare Deployment Guide

This guide provides detailed instructions for deploying your game aggregation website to Cloudflare Pages.

## 🚀 Deployment Steps

### 1. Prepare Your Repository

Ensure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

```bash
git add .
git commit -m "Initial game aggregation site"
git push origin main
```

### 2. Cloudflare Pages Setup

1. **Log in to Cloudflare Dashboard**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to "Pages" in the sidebar

2. **Create New Project**
   - Click "Create a project"
   - Choose "Connect to Git"
   - Authorize Cloudflare to access your repository

3. **Configure Build Settings**
   ```
   Framework preset: Vite
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   ```

4. **Environment Variables**
   ```
   VITE_GAMEMONETIZE_API_KEY=your_api_key
   VITE_CRAZYGAMES_API_KEY=your_api_key
   NODE_VERSION=18
   ```

### 3. Custom Domain Setup

1. **Add Custom Domain**
   - In Pages project settings, go to "Custom domains"
   - Add your domain (e.g., gamehub.com)
   - Update DNS records as instructed

2. **DNS Configuration**
   ```
   Type: CNAME
   Name: www
   Target: your-project.pages.dev
   ```

### 4. Performance Optimization

#### Caching Rules
```javascript
// _headers file
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Cache-Control: public, max-age=31536000, immutable

/games/*
  Cache-Control: public, max-age=604800

/api/*
  Cache-Control: public, max-age=300
```

#### Redirect Rules
```javascript
// _redirects file
/games/:slug 301 /game/:slug
/category/:old-name 301 /games/category/:old-name
```

### 5. Analytics Setup

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🛡️ Security Configuration

### Content Security Policy
```javascript
// Add to _headers
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://api.gamemonetize.com https://api.crazygames.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; frame-src https://games.gamemonetize.com https://www.crazygames.com; connect-src 'self' https://api.gamemonetize.com https://api.crazygames.com;
```

## 📊 Monitoring & Analytics

### 1. Cloudflare Analytics
- Enable Web Analytics in Cloudflare
- Monitor Core Web Vitals
- Track visitor behavior

### 2. Real User Monitoring
```javascript
// Add to main.tsx
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('SW registered'))
    .catch(() => console.log('SW registration failed'));
}
```

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check Node version
   node --version
   
   # Clear cache
   npm ci
   rm -rf dist
   npm run build
   ```

2. **Game Loading Issues**
   - Verify iframe permissions
   - Check Content Security Policy
   - Ensure HTTPS for all game sources

3. **API Rate Limiting**
   ```javascript
   // Implement rate limiting
   const rateLimit = {
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   };
   ```

### Performance Monitoring
```javascript
// Web Vitals monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics endpoint
  gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_category: 'Web Vitals',
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## 🌍 Global Distribution

### Edge Locations
Cloudflare automatically distributes your site across their global network for optimal performance:

- **Americas**: 50+ locations
- **Europe**: 40+ locations  
- **Asia-Pacific**: 35+ locations
- **Africa & Middle East**: 15+ locations

### Cache Strategy
```javascript
// Implement intelligent caching
const cacheConfig = {
  static: 31536000,    // 1 year
  games: 604800,       // 1 week
  api: 300,           // 5 minutes
  html: 86400         // 1 day
};
```

## 📈 SEO Optimization

### 1. Sitemap Generation
```xml
<!-- sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/games/action</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 2. Robots.txt
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://yourdomain.com/sitemap.xml
```

## 🚀 Advanced Features

### 1. Cloudflare Workers
```javascript
// worker.js - API caching and rate limiting
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const cache = caches.default
  const cacheKey = new Request(request.url, request)
  let response = await cache.match(cacheKey)
  
  if (!response) {
    response = await fetch(request)
    const responseToCache = response.clone()
    event.waitUntil(cache.put(cacheKey, responseToCache))
  }
  
  return response
}
```

### 2. A/B Testing Setup
```javascript
// A/B test configuration
const variants = {
  control: { color: 'blue', layout: 'grid' },
  variant: { color: 'purple', layout: 'list' }
};

const experiment = Math.random() < 0.5 ? 'control' : 'variant';
```

---

This deployment guide ensures your game aggregation site is optimized for performance, security, and scalability on Cloudflare's global network.</parameter>