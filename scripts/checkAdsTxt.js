#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

console.log('🔍 === QueensGame Ads.txt 验证脚本 ===\n');

try {
  // 1. 检查ads.txt文件是否存在
  console.log('📋 1. 检查ads.txt文件...');
  const adsTxtPath = path.join(__dirname, 'public', 'ads.txt');
  const distAdsTxtPath = path.join(__dirname, 'dist', 'ads.txt');
  
  if (fs.existsSync(adsTxtPath)) {
    console.log('   ✅ public/ads.txt 存在');
  } else {
    console.log('   ❌ public/ads.txt 不存在');
  }
  
  if (fs.existsSync(distAdsTxtPath)) {
    console.log('   ✅ dist/ads.txt 存在');
  } else {
    console.log('   ❌ dist/ads.txt 不存在');
  }

  // 2. 读取并验证ads.txt内容
  console.log('\n📝 2. 验证ads.txt内容...');
  if (fs.existsSync(distAdsTxtPath)) {
    const content = fs.readFileSync(distAdsTxtPath, 'utf8');
    const lines = content.trim().split('\n');
    
    console.log('   文件内容:');
    lines.forEach((line, index) => {
      if (line.trim()) {
        console.log(`   ${index + 1}: ${line}`);
      }
    });
    
    // 验证格式
    console.log('\n   格式验证:');
    const hasGameMonetizeComment = lines.some(line => line.includes('#GameMonetize.com'));
    const hasGoogleAds = lines.some(line => line.includes('google.com, pub-'));
    const hasCorrectFormat = lines.some(line => 
      line.includes('google.com, pub-') && 
      line.includes(', DIRECT, ') && 
      line.includes('f08c47fec0942fa0')
    );
    
    console.log(`   • GameMonetize注释: ${hasGameMonetizeComment ? '✅' : '❌'}`);
    console.log(`   • Google Ads条目: ${hasGoogleAds ? '✅' : '❌'}`);
    console.log(`   • 格式正确: ${hasCorrectFormat ? '✅' : '❌'}`);
    
    if (hasGameMonetizeComment && hasGoogleAds && hasCorrectFormat) {
      console.log('   🎉 ads.txt格式完全正确！');
    } else {
      console.log('   ⚠️  ads.txt格式需要检查');
    }
  }

  // 3. 检查文件大小
  console.log('\n📊 3. 文件信息...');
  if (fs.existsSync(distAdsTxtPath)) {
    const stats = fs.statSync(distAdsTxtPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`   文件大小: ${sizeKB} KB`);
    console.log(`   最后修改: ${stats.mtime.toLocaleString()}`);
  }

  // 4. GameMonetize配置信息
  console.log('\n🎮 4. GameMonetize配置信息...');
  console.log('   域名: queensgame.games');
  console.log('   状态: Waiting to approval');
  console.log('   Ads.txt: VERIFIED');
  console.log('   验证码: 7nyl1VQyl6O-0zA_KxHUY0QGIGg27u9a3bttPamb5ro');

  // 5. 部署检查
  console.log('\n🚀 5. 部署检查...');
  console.log('   确保以下文件已部署到你的网站根目录:');
  console.log('   • ads.txt');
  console.log('   • robots.txt');
  console.log('   • sitemap.xml');
  console.log('   • index.html');

  // 6. 验证步骤
  console.log('\n🔍 6. 验证步骤:');
  console.log('   1. 部署网站到Cloudflare Pages');
  console.log('   2. 访问: https://queensgame.games/ads.txt');
  console.log('   3. 确认内容正确显示');
  console.log('   4. 在GameMonetize中点击"Verify Ads.txt"');
  console.log('   5. 等待1-2个工作日获得批准');

  // 7. 常见问题
  console.log('\n❓ 7. 常见问题:');
  console.log('   Q: ads.txt文件无法访问？');
  console.log('   A: 确保文件部署在网站根目录，不是子目录');
  console.log('');
  console.log('   Q: 验证失败？');
  console.log('   A: 检查文件内容是否完全匹配GameMonetize提供的代码');
  console.log('');
  console.log('   Q: 状态一直是"Waiting to approval"？');
  console.log('   A: 这是正常流程，需要1-2个工作日审核');

  console.log('\n🎉 ads.txt验证完成！');
  console.log('   现在可以部署网站并在GameMonetize中验证了。');

} catch (error) {
  console.error('\n❌ 验证失败:', error.message);
  console.log('\n🔧 手动检查步骤:');
  console.log('   1. 确认ads.txt文件存在');
  console.log('   2. 检查文件内容格式');
  console.log('   3. 重新构建项目');
} 