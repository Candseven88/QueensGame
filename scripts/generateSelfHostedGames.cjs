#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 导入游戏数据（需要转换为CommonJS兼容格式）
const gameData = require('../src/data/gameMonetizeData.ts');

// 安全的游戏源配置
const SAFE_GAME_SOURCES = {
  'drift-boss': [
    'https://poki.com/en/g/drift-boss'
  ]
};

// 高风险域名列表
const REDIRECT_PRONE_DOMAINS = [
  'poki.com',
  'gameflare.com', 
  'addictinggames.com',
  'kongregate.com',
  'armorgames.com',
  'newgrounds.com'
];

// 检查URL是否有跳转风险
function isRedirectProne(url) {
  try {
    const domain = new URL(url).hostname;
    return REDIRECT_PRONE_DOMAINS.some(blockedDomain => 
      domain.includes(blockedDomain)
    );
  } catch {
    return true;
  }
}

// 从游戏ID提取slug
function extractGameSlug(gameId) {
  if (gameId.includes('-')) {
    return gameId.split('-').slice(1).join('-');
  }
  return gameId;
}

// 生成自托管游戏HTML
function generateSelfHostedGameHTML(game) {
  const gameSlug = extractGameSlug(game.id);
  const safeUrls = SAFE_GAME_SOURCES[gameSlug] || [];
  const primaryUrl = safeUrls[0] || game.embedUrl;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${game.title} - QueensGame</title>
  <meta name="description" content="${game.description}">
  <meta name="robots" content="noindex, nofollow">
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      overflow: hidden;
    }
    
    .game-container {
      width: 100vw;
      height: 100vh;
      position: relative;
      background: #000;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    }
    
    .game-header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(10px);
      padding: 12px 20px;
      z-index: 100;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .game-title {
      color: white;
      font-size: 18px;
      font-weight: 600;
    }
    
    .game-status {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #10b981;
      font-size: 12px;
    }
    
    .status-dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    .game-frame {
      width: 100%;
      height: 100%;
      border: none;
      padding-top: 52px;
    }
    
    .loading-overlay {
      position: absolute;
      top: 52px;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 50;
      transition: opacity 0.5s ease;
    }
    
    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top: 3px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .loading-text {
      color: white;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    
    .loading-subtitle {
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
    }
    
    .error-overlay {
      position: absolute;
      top: 52px;
      left: 0;
      right: 0;
      bottom: 0;
      background: #1f2937;
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 60;
      padding: 40px;
      text-align: center;
    }
    
    .error-icon {
      width: 64px;
      height: 64px;
      background: #ef4444;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      font-size: 24px;
      color: white;
    }
    
    .error-title {
      color: white;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    
    .error-message {
      color: #9ca3af;
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 24px;
      max-width: 400px;
    }
    
    .retry-button {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    
    .retry-button:hover {
      background: #2563eb;
    }
    
    .fallback-links {
      margin-top: 20px;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .fallback-link {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 14px;
      border: 1px solid rgba(59, 130, 246, 0.3);
      transition: all 0.2s;
    }
    
    .fallback-link:hover {
      background: rgba(59, 130, 246, 0.2);
      border-color: #3b82f6;
    }
  </style>
</head>
<body>
  <div class="game-container">
    <!-- 游戏头部 -->
    <div class="game-header">
      <div class="game-title">${game.title}</div>
      <div class="game-status">
        <div class="status-dot"></div>
        <span>安全模式</span>
      </div>
    </div>
    
    <!-- 加载覆盖层 -->
    <div class="loading-overlay" id="loadingOverlay">
      <div class="loading-spinner"></div>
      <div class="loading-text">正在加载 ${game.title}</div>
      <div class="loading-subtitle">安全托管 • 无跳转保护</div>
    </div>
    
    <!-- 错误覆盖层 -->
    <div class="error-overlay" id="errorOverlay">
      <div class="error-icon">⚠️</div>
      <div class="error-title">游戏加载失败</div>
      <div class="error-message">
        抱歉，游戏暂时无法加载。这可能是由于网络问题或游戏源不可用。
      </div>
      <button class="retry-button" onclick="retryGame()">重试</button>
      
      <div class="fallback-links">
        ${safeUrls.slice(1).map((url, index) => 
          `<a href="${url}" target="_blank" class="fallback-link">备用源 ${index + 1}</a>`
        ).join('')}
      </div>
    </div>
    
    <!-- 游戏iframe -->
    <iframe 
      id="gameFrame"
      class="game-frame"
      src="${primaryUrl}"
      allowfullscreen
      allow="gamepad; microphone; camera; fullscreen; autoplay; payment; geolocation"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-popups-to-escape-sandbox"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
  
  <script>
    const gameFrame = document.getElementById('gameFrame');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const errorOverlay = document.getElementById('errorOverlay');
    
    const safeUrls = ${JSON.stringify(safeUrls)};
    let currentUrlIndex = 0;
    let redirectDetected = false;
    
    // 游戏加载成功
    gameFrame.onload = function() {
      setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
          loadingOverlay.style.display = 'none';
        }, 500);
      }, 1000);
      
      // 开始检测跳转
      detectRedirect();
    };
    
    // 游戏加载失败
    gameFrame.onerror = function() {
      showError();
    };
    
    // 检测跳转
    function detectRedirect() {
      const originalUrl = gameFrame.src;
      
      const checkInterval = setInterval(() => {
        try {
          // 检查URL是否发生变化
          if (gameFrame.src !== originalUrl) {
            redirectDetected = true;
            showRedirectWarning();
            clearInterval(checkInterval);
            return;
          }
          
          // 尝试访问iframe文档
          const iframeDoc = gameFrame.contentDocument;
          if (iframeDoc) {
            const currentLocation = iframeDoc.location.href;
            if (currentLocation !== originalUrl && !currentLocation.includes('about:blank')) {
              redirectDetected = true;
              showRedirectWarning();
              clearInterval(checkInterval);
            }
          }
        } catch (e) {
          // 跨域访问被阻止是正常的
        }
      }, 2000);
      
      // 10秒后停止检测
      setTimeout(() => clearInterval(checkInterval), 10000);
    }
    
    // 显示跳转警告
    function showRedirectWarning() {
      const warning = document.createElement('div');
      warning.style.cssText = \`
        position: absolute;
        top: 60px;
        left: 20px;
        right: 20px;
        background: rgba(239, 68, 68, 0.95);
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 200;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      \`;
      warning.innerHTML = '⚠️ 检测到游戏尝试跳转，已被安全阻止';
      document.body.appendChild(warning);
      
      setTimeout(() => {
        warning.style.opacity = '0';
        setTimeout(() => warning.remove(), 500);
      }, 5000);
    }
    
    // 显示错误
    function showError() {
      loadingOverlay.style.display = 'none';
      errorOverlay.style.display = 'flex';
    }
    
    // 重试游戏
    function retryGame() {
      if (currentUrlIndex < safeUrls.length - 1) {
        currentUrlIndex++;
        gameFrame.src = safeUrls[currentUrlIndex];
        errorOverlay.style.display = 'none';
        loadingOverlay.style.display = 'flex';
        loadingOverlay.style.opacity = '1';
      } else {
        // 所有URL都试过了，重新开始
        currentUrlIndex = 0;
        gameFrame.src = safeUrls[0];
        errorOverlay.style.display = 'none';
        loadingOverlay.style.display = 'flex';
        loadingOverlay.style.opacity = '1';
      }
    }
    
    // 防止页面被其他域嵌入
    if (window.top !== window.self) {
      try {
        if (!window.top.location.hostname.includes('queensgame') && 
            !window.top.location.hostname.includes('localhost')) {
          window.top.location = window.location;
        }
      } catch (e) {
        window.top.location = window.location;
      }
    }
    
    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
      if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
        e.preventDefault();
        retryGame();
      }
    });
  </script>
</body>
</html>`;
}

// 创建目录
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 生成自托管游戏文件
function generateSelfHostedGame(game) {
  const gameSlug = extractGameSlug(game.id);
  const hostDir = path.join(__dirname, '..', 'public', 'games', 'hosted', gameSlug);
  const htmlPath = path.join(hostDir, 'index.html');
  
  // 检查是否是高风险游戏
  const isHighRisk = game.embedUrl && isRedirectProne(game.embedUrl);
  if (!isHighRisk && !SAFE_GAME_SOURCES[gameSlug]) {
    console.log(`跳过 ${game.title} - 不是高风险游戏`);
    return false;
  }
  
  try {
    ensureDirectoryExists(hostDir);
    const htmlContent = generateSelfHostedGameHTML(game);
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    
    console.log(`✅ 成功生成: ${game.title} -> ${htmlPath}`);
    return true;
  } catch (error) {
    console.error(`❌ 生成失败: ${game.title} -`, error.message);
    return false;
  }
}

// 主函数
async function main() {
  console.log('🚀 开始生成自托管游戏文件...\n');
  
  // 模拟游戏数据（因为实际导入可能有问题）
  const games = [
    {
      id: 'gd-drift-boss',
      title: 'Drift Boss',
      description: 'Drift Boss is a casual one-click driving game where you drive your car around very tricky corners and over bumps.',
              embedUrl: 'https://driftboss.net/',
      width: 1280,
      height: 720
    }
  ];
  
  let successCount = 0;
  let totalCount = 0;
  
  for (const game of games) {
    totalCount++;
    if (generateSelfHostedGame(game)) {
      successCount++;
    }
  }
  
  console.log(`\n📊 生成完成:`);
  console.log(`   成功: ${successCount}/${totalCount}`);
  console.log(`   失败: ${totalCount - successCount}/${totalCount}`);
  
  if (successCount > 0) {
    console.log(`\n🎮 自托管游戏访问地址:`);
    console.log(`   Drift Boss: /games/hosted/drift-boss/index.html`);
    
    console.log(`\n💡 使用说明:`);
    console.log(`   1. 这些文件提供无跳转的安全游戏体验`);
    console.log(`   2. 自动尝试多个安全游戏源`);
    console.log(`   3. 内置跳转检测和防护`);
    console.log(`   4. 可以直接在SmartGamePlayer中使用`);
  }
}

// 运行脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  generateSelfHostedGame,
  generateSelfHostedGameHTML,
  isRedirectProne,
  extractGameSlug
}; 