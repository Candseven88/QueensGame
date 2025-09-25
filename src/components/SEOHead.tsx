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

// Auto-generate SEO content based on game data
const generateGameSEOContent = (game: Game) => {
  // Generate enhanced title with keywords
  const seoTitle = game.title.includes('New Game') 
    ? game.title 
    : `${game.title} - New Game Recommendation | Play Free Online`;

  // Generate enhanced description with gameplay highlights
  const playerTypes = getPlayerTypeRecommendations(game);
  const gameplayHighlights = getGameplayHighlights(game);
  
  const seoDescription = `${game.shortDescription || game.description.slice(0, 120)}... Perfect for ${playerTypes.join(', ')}. ${gameplayHighlights} Play now free online!`;

  // Generate comprehensive keywords
  const seoKeywords = [
    ...game.tags.map(tag => tag.toLowerCase()),
    game.category.toLowerCase(),
    'free online game',
    'browser game',
    'html5 game',
    'new game recommendation',
    ...playerTypes.map(type => type.toLowerCase()),
    game.title.toLowerCase().split(' ')
  ].flat().filter((keyword, index, arr) => arr.indexOf(keyword) === index).join(', ');

  return { seoTitle, seoDescription, seoKeywords };
};

// Generate player type recommendations based on game attributes
const getPlayerTypeRecommendations = (game: Game): string[] => {
  const types: string[] = [];
  
  // Based on category
  if (game.category.includes('Action')) types.push('action game enthusiasts');
  if (game.category.includes('Adventure')) types.push('adventure seekers');
  if (game.category.includes('Puzzle')) types.push('puzzle lovers');
  if (game.category.includes('Racing')) types.push('racing fans');
  if (game.category.includes('Clicker')) types.push('idle game players');

  // Based on tags
  if (game.tags.some(tag => tag.toLowerCase().includes('reflex'))) types.push('reflex-testing players');
  if (game.tags.some(tag => tag.toLowerCase().includes('challenging'))) types.push('challenge seekers');
  if (game.tags.some(tag => tag.toLowerCase().includes('fast'))) types.push('fast-paced game lovers');
  if (game.tags.some(tag => tag.toLowerCase().includes('strategy'))) types.push('strategic thinkers');
  if (game.tags.some(tag => tag.toLowerCase().includes('casual'))) types.push('casual gamers');

  // Default if no specific types found
  if (types.length === 0) types.push('all types of players');

  return types.slice(0, 3); // Limit to 3 types for readability
};

// Generate gameplay highlights based on game data
const getGameplayHighlights = (game: Game): string => {
  const highlights: string[] = [];
  
  if (game.rating && game.rating >= 4.5) highlights.push('Highly rated gameplay');
  if (game.trending) highlights.push('Currently trending');
  if (game.featured) highlights.push('Featured game experience');
  if (game.editorsPick) highlights.push("Editor's choice");
  if (game.hotGame) highlights.push('Hot new release');
  
  // Based on tags
  if (game.tags.includes('New Game')) highlights.push('Latest release');
  if (game.tags.includes('Challenging')) highlights.push('Skill-testing challenges');
  if (game.tags.includes('Fast-paced')) highlights.push('Adrenaline-pumping action');
  
  return highlights.length > 0 ? highlights.slice(0, 2).join('. ') + '.' : 'Engaging gameplay experience.';
};

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
    
    // 如果提供了游戏，使用游戏数据并生成增强的SEO内容
    if (game) {
      const { seoTitle, seoDescription, seoKeywords } = generateGameSEOContent(game);
      
      // 设置页面标题
      document.title = title || seoTitle;
      
      // 设置meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description || seoDescription);
      
      // 设置keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords || seoKeywords);
      
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
      
      setMetaTag('og:title', ogTitle || title || seoTitle);
      setMetaTag('og:description', ogDescription || description || seoDescription);
      setMetaTag('og:image', ogImage || game.thumbnail);
      setMetaTag('og:type', 'game');
      setMetaTag('og:url', window.location.href);
      setMetaTag('og:site_name', 'QueensGame');
      
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
      setTwitterTag('twitter:title', ogTitle || title || seoTitle);
      setTwitterTag('twitter:description', ogDescription || description || seoDescription);
      setTwitterTag('twitter:image', ogImage || game.thumbnail);
      setTwitterTag('twitter:site', '@QueensGame');
      
      // 设置canonical URL
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical || window.location.href);
      
      // 添加结构化数据 (JSON-LD) - Enhanced for better SEO
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "name": game.title,
        "description": seoDescription,
        "image": game.thumbnail,
        "url": window.location.href,
        "genre": game.category,
        "gamePlatform": ["Web Browser", "HTML5", "Online"],
        "applicationCategory": "Game",
        "operatingSystem": "Any",
        "browserRequirements": "Modern web browser with HTML5 support",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": game.rating || 4.5,
          "ratingCount": Math.max(game.plays || 1000, 100),
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
          "name": "QueensGame",
          "url": "https://queensgame.io"
        },
        "provider": {
          "@type": "Organization", 
          "name": game.author || game.provider || "QueensGame"
        },
        "datePublished": game.createdAt,
        "dateModified": game.lastModified || game.createdAt,
        "keywords": seoKeywords,
        "inLanguage": game.language || "en",
        "isAccessibleForFree": true,
        "isFamilyFriendly": true
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
      
      // 添加额外的meta标签用于更好的SEO
      const setExtraMetaTag = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      setExtraMetaTag('robots', 'index, follow');
      setExtraMetaTag('author', game.author || 'QueensGame');
      setExtraMetaTag('theme-color', '#8B5CF6');
      setExtraMetaTag('application-name', 'QueensGame');
      
      // 清理函数
      return () => {
        // 清理会在组件卸载时执行
      };
    }
  }, [game, title, description, keywords]);

  return null; // 这个组件不渲染任何UI
}; 