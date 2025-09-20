import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertCircle, RotateCcw } from 'lucide-react';
import { Game } from '../types/Game';

interface SmartGamePlayerProps {
  game: Game;
  isPlaying: boolean;
  onClose: () => void;
}

export const SmartGamePlayer: React.FC<SmartGamePlayerProps> = ({ 
  game, 
  isPlaying, 
  onClose 
}) => {
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);

  // 获取所有可用的URL
  const getAllUrls = () => {
    const urls = [game.embedUrl].filter(Boolean) as string[];
    if (game.fallbackUrls) {
      urls.push(...game.fallbackUrls);
    }
    return urls;
  };

  const allUrls = getAllUrls();
  const currentUrl = allUrls[currentUrlIndex];

  // 如果没有可用的URL，显示错误
  if (allUrls.length === 0) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Game Sources Available</h3>
          <p className="text-gray-400 mb-6">
            No valid game sources were found for {game.title}.
          </p>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // 重置状态
  const resetPlayer = () => {
    setCurrentUrlIndex(0);
    setIsLoading(true);
    setHasError(false);
    setLoadAttempts(0);
  };

  // 尝试下一个URL
  const tryNextUrl = () => {
    if (currentUrlIndex < allUrls.length - 1) {
      setCurrentUrlIndex(prev => prev + 1);
      setIsLoading(true);
      setHasError(false);
      setLoadAttempts(prev => prev + 1);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  // iframe加载完成
  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // iframe加载错误
  const handleIframeError = () => {
    console.log(`Failed to load game from: ${currentUrl}`);
    setTimeout(() => {
      tryNextUrl();
    }, 2000); // 2秒后尝试下一个URL
  };

  // 手动重试
  const handleRetry = () => {
    if (currentUrlIndex < allUrls.length - 1) {
      tryNextUrl();
    } else {
      resetPlayer();
    }
  };

  // 当游戏改变时重置
  useEffect(() => {
    if (isPlaying) {
      resetPlayer();
    }
  }, [game.id, isPlaying]);

  if (!isPlaying) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
      <div className="relative w-full h-full max-w-7xl max-h-full bg-black rounded-lg overflow-hidden">
        {/* Game Controls Bar */}
        <div className="absolute top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm p-3 flex items-center justify-between z-20 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm px-3 py-2 rounded hover:bg-gray-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Close</span>
            </button>
            <div className="text-white font-medium text-sm">{game.title}</div>
            
            {/* 状态指示器 */}
            {loadAttempts > 0 && (
              <div className="text-yellow-400 text-xs">
                Attempt {loadAttempts + 1}/{allUrls.length}
              </div>
            )}
          </div>
          
          {/* 重试按钮 */}
          {hasError && (
            <button
              onClick={handleRetry}
              className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors text-sm px-3 py-2 rounded hover:bg-gray-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          )}
        </div>
        
        {/* Game Container */}
        <div className="relative w-full h-full flex items-center justify-center pt-14">
          {/* 加载指示器 */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <div className="text-white text-lg font-medium">Loading {game.title}...</div>
                <div className="text-gray-400 text-sm mt-2">
                  Source: {currentUrl ? new URL(currentUrl).hostname : 'Unknown'}
                </div>
              </div>
            </div>
          )}
          
          {/* 错误状态 */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
              <div className="text-center max-w-md">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Game Unavailable</h3>
                <p className="text-gray-400 mb-6">
                  We tried loading {game.title} from multiple sources, but none are currently available.
                  This might be due to network issues or platform restrictions.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handleRetry}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
                
                {/* 尝试过的来源 */}
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Attempted Sources:</h4>
                  <div className="space-y-1">
                    {allUrls.slice(0, loadAttempts + 1).map((url, index) => (
                      <div key={index} className="text-xs text-gray-500 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                        {url ? new URL(url).hostname : 'Unknown source'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Game Iframe */}
          <iframe
            src={currentUrl}
            className="w-full h-full border-0"
            frameBorder="0"
            allowFullScreen
            title={game.title}
            allow="gamepad; microphone; camera; fullscreen"
            loading="eager"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
          />
        </div>
      </div>
    </div>
  );
};

export default SmartGamePlayer; 