import React from 'react';
import { Game } from '../types/Game';

interface SEOHeadProps {
  game?: Game;
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ game, title, description, keywords, ogTitle, ogDescription, ogImage, canonical }) => {
  React.useEffect(() => {
    // 如果没有提供游戏，但提供了自定义标题和描述
    if (!game && (title || description)) {
      // 设置页面标题
      document.title = title || 'QueensGame - Premium Online Gaming Platform';
      
      // 设置meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description || '');
      
      // 设置keywords
      if (keywords) {
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.setAttribute('name', 'keywords');
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', keywords);
      }
      
      // 设置Open Graph标签
      const setMetaTag = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      setMetaTag('og:title', ogTitle || title || 'QueensGame');
      setMetaTag('og:description', ogDescription || description || '');
      setMetaTag('og:type', 'website');
      setMetaTag('og:url', window.location.href);
      if (ogImage) {
        setMetaTag('og:image', ogImage);
      }
      
      // 设置Twitter Card标签
      const setTwitterTag = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      setTwitterTag('twitter:card', 'summary');
      setTwitterTag('twitter:title', ogTitle || title || 'QueensGame');
      setTwitterTag('twitter:description', ogDescription || description || '');
      if (ogImage) {
        setTwitterTag('twitter:image', ogImage);
      }
      
      // 设置canonical URL
      if (canonical) {
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
          canonicalLink = document.createElement('link');
          canonicalLink.setAttribute('rel', 'canonical');
          document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', canonical);
      }
      
      return;
    }
    
    // 如果提供了游戏，使用游戏数据
    if (game) {
      // 设置页面标题
      document.title = title || `${game.title} - Play Online | QueensGame`;
      
      // 设置meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description || game.description);
      
      // 设置keywords
      if (keywords || game.tags) {
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.setAttribute('name', 'keywords');
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', keywords || game.tags.join(', '));
      }
      
      // 设置Open Graph标签
      const setMetaTag = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      setMetaTag('og:title', ogTitle || title || game.title);
      setMetaTag('og:description', ogDescription || description || game.description);
      setMetaTag('og:image', ogImage || game.thumbnail);
      setMetaTag('og:type', 'game');
      setMetaTag('og:url', window.location.href);
      
      // 设置Twitter Card标签
      const setTwitterTag = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      setTwitterTag('twitter:card', 'summary_large_image');
      setTwitterTag('twitter:title', ogTitle || title || game.title);
      setTwitterTag('twitter:description', ogDescription || description || game.description);
      setTwitterTag('twitter:image', ogImage || game.thumbnail);
      
      // 设置canonical URL
      if (canonical) {
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
          canonicalLink = document.createElement('link');
          canonicalLink.setAttribute('rel', 'canonical');
          document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', canonical);
      }
      
      // 添加结构化数据 (JSON-LD)
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "name": game.title,
        "description": game.description,
        "image": game.thumbnail,
        "url": window.location.href,
        "genre": game.category,
        "gamePlatform": "Web Browser",
        "applicationCategory": "Game",
        "operatingSystem": "Any",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": game.rating || 4.5,
          "ratingCount": game.plays || 0,
          "bestRating": 5,
          "worstRating": 1
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "publisher": {
          "@type": "Organization",
          "name": "QueensGame"
        },
        "provider": {
          "@type": "Organization",
          "name": game.provider
        },
        "datePublished": game.createdAt,
        "keywords": keywords || game.tags.join(', ')
      };
      
      // 移除旧的结构化数据
      const oldScript = document.querySelector('script[type="application/ld+json"]');
      if (oldScript) {
        oldScript.remove();
      }
      
      // 添加新的结构化数据
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
      
      // 清理函数
      return () => {
        if (metaDescription) {
          metaDescription.remove();
        }
        if (script) {
          script.remove();
        }
      };
    }
  }, [game, title, description, keywords]);

  return null; // 这个组件不渲染任何UI
}; 