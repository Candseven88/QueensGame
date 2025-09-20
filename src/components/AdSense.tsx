import React, { useEffect } from 'react';
import { SEO_CONFIG } from '../config/seo';

interface AdSenseProps {
  slot: string;
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
  format?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdSense: React.FC<AdSenseProps> = ({
  slot,
  style = { display: 'block' },
  className = '',
  responsive = true,
  format = 'auto'
}) => {
  useEffect(() => {
    if (!SEO_CONFIG.adsense.enabled) {
      return;
    }

    try {
      // 确保AdSense脚本已加载
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.warn('AdSense initialization error:', error);
    }
  }, []);

  // 如果AdSense被禁用，不渲染广告
  if (!SEO_CONFIG.adsense.enabled) {
    return null;
  }

  // 测试模式下显示占位符
  if (SEO_CONFIG.adsense.testMode) {
    return (
      <div 
        className={`bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 ${className}`}
        style={{ minHeight: '250px', ...style }}
      >
        <div className="text-center">
          <div className="text-lg font-semibold">AdSense Placeholder</div>
          <div className="text-sm">Slot: {slot}</div>
        </div>
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={SEO_CONFIG.adsense.publisherId}
      data-ad-slot={slot}
      data-ad-format={responsive ? 'auto' : format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
};

// 预定义的广告尺寸配置
export const AdSenseSlots = {
  // 横幅广告
  BANNER_TOP: {
    slot: '1234567890', // 替换为实际的广告位ID
    style: { display: 'block', width: '100%', height: '90px' }
  },
  
  // 侧边栏广告
  SIDEBAR: {
    slot: '1234567891', // 替换为实际的广告位ID
    style: { display: 'block', width: '300px', height: '250px' }
  },
  
  // 内容中的广告
  IN_CONTENT: {
    slot: '1234567892', // 替换为实际的广告位ID
    style: { display: 'block', width: '100%', height: '280px' }
  },
  
  // 游戏页面广告
  GAME_PAGE: {
    slot: '1234567893', // 替换为实际的广告位ID
    style: { display: 'block', width: '100%', height: '250px' }
  }
};

// 使用示例:
// <AdSense slot={AdSenseSlots.BANNER_TOP.slot} style={AdSenseSlots.BANNER_TOP.style} /> 