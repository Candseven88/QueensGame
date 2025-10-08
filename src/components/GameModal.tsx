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
  const [loadError, setLoadError] = useState<boolean>(false);

  // 动态计算iframe高度 - 根据游戏指定的尺寸或使用16:9比例
  const calculateIframeHeight = () => {
    // 如果游戏指定了具体尺寸，使用游戏的尺寸
    if (game.width && game.height) {
      const gameAspectRatio = game.height / game.width;
      const maxContentWidth = Math.min(1280, window.innerWidth - 40); // 减去边距
      const calculatedHeight = Math.max(maxContentWidth * gameAspectRatio, 500);
      
      setIframeHeight(calculatedHeight);
      console.log(`🎮 Using game-specific dimensions: ${game.width}x${game.height}`);
      console.log(`📏 Calculated iframe Height: ${calculatedHeight}px`);
    } else {
      // 使用默认16:9比例
      const maxContentWidth = 1280;
      const aspectRatio = 9 / 16;
      const calculatedHeight = Math.max(maxContentWidth * aspectRatio, 720);
      
      setIframeHeight(calculatedHeight);
      console.log(`📏 Using default 16:9 ratio - Height: ${calculatedHeight}px`);
    }
    
    setOverlayHeight(window.innerHeight);
    return iframeHeight;
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
      // 重置错误状态
      setLoadError(false);
      
      // 计算初始高度
      calculateIframeHeight();
      
      // 监听窗口大小变化
      window.addEventListener('resize', handleResize);
      
      console.log('🚀 GameModal opened for game:', game.title);
      console.log('🔗 Game embed URL:', game.embedUrl);
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
    setLoadError(false);
    if (iframeRef.current) {
      console.log(`📺 iframe dimensions: ${iframeRef.current.offsetWidth}x${iframeRef.current.offsetHeight}`);
    }
  };

  // 处理iframe错误
  const handleIframeError = () => {
    console.error(`❌ Failed to load game iframe: ${game.title}`);
    console.error(`🔗 Attempted URL: ${game.embedUrl}`);
    console.error('💡 This might be due to X-Frame-Options or Content Security Policy restrictions');
    setLoadError(true);
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

  // 处理外部链接打开
  const handleOpenExternal = () => {
    window.open(game.embedUrl, '_blank');
    onClose();
  };

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
      <div className="game-modal-content">
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
            {loadError && (
              <button
                onClick={handleOpenExternal}
                className="flex items-center space-x-2 text-blue-300 hover:text-blue-200 transition-colors text-sm px-3 py-2 rounded hover:bg-blue-700/20"
              >
                <span>Open in New Tab</span>
              </button>
            )}
          </div>
        </div>
        
        {/* 游戏容器 */}
        <div className="game-modal-body">
          {loadError ? (
            <div className="flex flex-col items-center justify-center h-96 bg-gray-800 rounded-lg">
              <div className="text-red-400 text-4xl mb-4">⚠️</div>
              <h3 className="text-white text-xl font-bold mb-2">Unable to Load Game</h3>
              <p className="text-gray-300 text-center mb-4 max-w-md">
                The game cannot be embedded due to security restrictions. 
                You can still play it by opening it in a new tab.
              </p>
              <button
                onClick={handleOpenExternal}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Play in New Tab
              </button>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              src={game.embedUrl}
              className="game-iframe"
              style={{ 
                height: `${iframeHeight}px`,
                backgroundColor: '#000000',
                minHeight: game.height ? `${game.height}px` : '500px'
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
          )}
        </div>
      </div>
    </div>
  );
};