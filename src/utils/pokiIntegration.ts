// Poki 游戏集成工具
export interface PokiGame {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  tags: string[];
  url: string;
  embedUrl?: string;
  width?: number;
  height?: number;
  provider: 'poki';
  rating?: number;
  plays?: number;
  featured?: boolean;
  createdAt: string;
}
// Poki SDK 初始化
export const initializePokiSDK = () => {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://poki.com/sdk.js';
      script.onload = () => {
        console.log('Poki SDK loaded successfully');
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Poki SDK');
        reject(false);
      };
      document.head.appendChild(script);
    }
  });
};
// 游戏嵌入函数
export const embedPokiGame = (gameId: string, containerId: string) => {
  if (typeof window !== 'undefined' && (window as any).Poki) {
    const container = document.getElementById(containerId);
    if (container) {
      (window as any).Poki.embed(gameId, container);
    }
  }
};