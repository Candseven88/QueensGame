const https = require('https');
const fs = require('fs');
const path = require('path');

// IndexNow配置
const INDEXNOW_CONFIG = {
  key: process.env.INDEXNOW_KEY || '7f8e9d6c5b4a3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7',
  keyLocation: 'https://queensgame.games/7f8e9d6c5b4a3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7.txt',
  host: 'queensgame.games'
};

// 支持的搜索引擎端点
const SEARCH_ENGINES = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow'
];

/**
 * 提交单个URL到IndexNow
 */
async function submitUrl(url, searchEngine = SEARCH_ENGINES[0]) {
  const payload = {
    host: INDEXNOW_CONFIG.host,
    key: INDEXNOW_CONFIG.key,
    keyLocation: INDEXNOW_CONFIG.keyLocation,
    urlList: [url]
  };

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(payload);
    const urlObj = new URL(searchEngine);
    
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log(`✅ IndexNow submission to ${urlObj.hostname}: ${res.statusCode} - ${url}`);
        resolve({ statusCode: res.statusCode, data, url, engine: urlObj.hostname });
      });
    });

    req.on('error', (err) => {
      console.error(`❌ IndexNow submission failed to ${urlObj.hostname}:`, err.message);
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

/**
 * 批量提交URL到所有搜索引擎
 */
async function submitUrls(urls) {
  console.log(`🚀 Starting IndexNow submission for ${urls.length} URLs...`);
  
  const results = [];
  
  for (const url of urls) {
    for (const engine of SEARCH_ENGINES) {
      try {
        const result = await submitUrl(url, engine);
        results.push(result);
        // 添加延迟避免请求过于频繁
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Failed to submit ${url} to ${engine}:`, error.message);
      }
    }
  }
  
  return results;
}

/**
 * 提交新的Queens Game 225页面
 */
async function submitQueensGame225() {
  const urls = [
    'https://queensgame.games/games/queensgame-mirror',
    'https://queensgame.games/', // 首页也需要重新索引，因为添加了新内容
  ];
  
  console.log('🎮 Submitting Queens Game 225 URLs to IndexNow...');
  const results = await submitUrls(urls);
  
  // 记录提交结果
  const logEntry = {
    timestamp: new Date().toISOString(),
    urls: urls,
    results: results.map(r => ({ 
      url: r.url, 
      engine: r.engine, 
      statusCode: r.statusCode 
    }))
  };
  
  // 保存到日志文件
  const logFile = path.join(__dirname, '../logs/indexnow-submissions.log');
  const logDir = path.dirname(logFile);
  
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
  console.log(`📝 IndexNow submission logged to: ${logFile}`);
  
  return results;
}

/**
 * 创建IndexNow密钥文件
 */
function createIndexNowKeyFile() {
  const keyFileName = `${INDEXNOW_CONFIG.key}.txt`;
  const keyFilePath = path.join(__dirname, '../public', keyFileName);
  
  fs.writeFileSync(keyFilePath, INDEXNOW_CONFIG.key);
  console.log(`🔑 IndexNow key file created: ${keyFilePath}`);
  
  return keyFilePath;
}

// 命令行执行
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--create-key')) {
    createIndexNowKeyFile();
  } else if (args.includes('--submit-queens')) {
    submitQueensGame225().catch(console.error);
  } else if (args.includes('--submit-url') && args[1]) {
    submitUrl(args[1]).catch(console.error);
  } else {
    console.log(`
🔍 IndexNow Submission Tool

Usage:
  node indexNowSubmit.js --create-key          Create IndexNow key file
  node indexNowSubmit.js --submit-queens       Submit Queens Game 225 URLs
  node indexNowSubmit.js --submit-url <url>    Submit specific URL

Examples:
  node indexNowSubmit.js --submit-queens
  node indexNowSubmit.js --submit-url https://queensgame.games/games/queensgame-mirror
    `);
  }
}

module.exports = {
  submitUrl,
  submitUrls,
  submitQueensGame225,
  createIndexNowKeyFile,
  INDEXNOW_CONFIG
};
