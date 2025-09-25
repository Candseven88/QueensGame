import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Game } from '../types/Game';

interface GameModalProps {
  game: Game;
  isOpen: boolean;
  onClose: () => void;
}

export const GameModal: React.FC<GameModalProps> = ({ game, isOpen, onClose }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [iframeHeight, setIframeHeight] = useState<number>(0);
  const [overlayHeight, setOverlayHeight] = useState<number>(0);

  // 动态计算iframe高度 - 使用16:9比例或基于内容宽度
  const calculateIframeHeight = () => {
    const maxContentWidth = 1280; // 最大内容宽度
    const aspectRatio = 9 / 16; // 16:9比例
    const headerHeight = 60; // 控制栏高度
    
    // 使用16:9比例计算高度，或者最小720px
    const calculatedHeight = Math.max(maxContentWidth * aspectRatio, 720);
    
    setIframeHeight(calculatedHeight);
    setOverlayHeight(window.innerHeight);
    
    // 调试日志
    console.log('🎮 GameModal Debug Info:');
    console.log(`📏 Window Height: ${window.innerHeight}px`);
    console.log(`📏 Content Max Width: ${maxContentWidth}px`);
    console.log(`📏 Calculated iframe Height: ${calculatedHeight}px (16:9 ratio)`);
    console.log(`📏 Header Height: ${headerHeight}px`);
    console.log(`📏 Modal allows scrolling: YES`);
    
    return calculatedHeight;
  };

  // 处理窗口大小变化
  const handleResize = () => {
    if (isOpen) {
      const newHeight = calculateIframeHeight();
      console.log(`🔄 Window resized - New iframe height: ${newHeight}px`);
    }
  };

  // 模态窗口打开/关闭效果
  useEffect(() => {
    if (isOpen) {
      // 计算初始高度
      calculateIframeHeight();
      
      // 监听窗口大小变化
      window.addEventListener('resize', handleResize);
      
      console.log('🚀 GameModal opened for game:', game.title);
      console.log('📜 Body scrolling: ALLOWED (modal has internal scrolling)');
    } else {
      // 移除事件监听
      window.removeEventListener('resize', handleResize);
      
      console.log('❌ GameModal closed');
    }

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, game.title]);

  // 处理iframe加载
  const handleIframeLoad = () => {
    console.log(`✅ Game iframe loaded successfully: ${game.title}`);
    if (iframeRef.current) {
      console.log(`📺 iframe dimensions: ${iframeRef.current.offsetWidth}x${iframeRef.current.offsetHeight}`);
    }
  };

  // 处理iframe错误
  const handleIframeError = () => {
    console.error(`❌ Failed to load game iframe: ${game.title}`);
    console.error(`🔗 Attempted URL: ${game.embedUrl}`);
  };

  // 处理ESC键关闭
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="game-modal-overlay"
      style={{ height: `${overlayHeight}px` }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="game-modal-content"
      >
        {/* 游戏控制栏 */}
        <div className="game-modal-header">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm px-3 py-2 rounded hover:bg-gray-700"
              aria-label="Close game"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
            <div className="text-white font-medium text-sm">{game.title}</div>
          </div>
        </div>
        
        {/* 游戏容器 */}
        <div className="game-modal-body">
          <iframe
            ref={iframeRef}
            src={game.embedUrl}
            className="game-iframe"
            style={{ 
              height: `${iframeHeight}px`,
              backgroundColor: '#000000',
              minHeight: '720px'
            }}
            frameBorder="0"
            allowFullScreen
            title={game.title}
            allow="gamepad; microphone; camera; fullscreen; autoplay"
            loading="eager"
            scrolling="no"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        </div>
      </div>
    </div>
  );
}; 