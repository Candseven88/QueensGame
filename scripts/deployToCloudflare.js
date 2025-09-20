#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

console.log('🚀 === QueensGame Cloudflare Pages 部署脚本 ===\n');

try {
  // 1. 检查项目状态
  console.log('📋 1. 检查项目状态...');
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  console.log(`   项目名称: ${packageJson.name}`);
  console.log(`   版本: ${packageJson.version}`);

  // 2. 构建项目
  console.log('\n🔨 2. 构建生产版本...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ 构建完成');

  // 3. 检查构建结果
  console.log('\n📁 3. 检查构建结果...');
  const distPath = path.join(__dirname, 'dist');
  const files = fs.readdirSync(distPath);
  
  console.log('   构建文件列表:');
  files.forEach(file => {
    const filePath = path.join(distPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      const size = (stats.size / 1024).toFixed(2);
      console.log(`   • ${file} (${size} KB)`);
    } else {
      console.log(`   • ${file}/ (目录)`);
    }
  });

  // 4. 检查关键文件
  console.log('\n🔍 4. 检查关键文件...');
  const requiredFiles = [
    'index.html',
    'robots.txt',
    'sitemap.xml',
    '_redirects',
    '_headers'
  ];

  requiredFiles.forEach(file => {
    const filePath = path.join(distPath, file);
    if (fs.existsSync(filePath)) {
      console.log(`   ✅ ${file}`);
    } else {
      console.log(`   ❌ ${file} (缺失)`);
    }
  });

  // 5. 部署说明
  console.log('\n🎯 5. 部署到Cloudflare Pages:');
  console.log('   方法1: 通过GitHub集成 (推荐)');
  console.log('   • 访问: https://dash.cloudflare.com/');
  console.log('   • 选择 Pages → Create a project');
  console.log('   • 选择 Connect to Git');
  console.log('   • 选择仓库: Candseven88/QueensGame');
  console.log('   • 分支: main');
  console.log('   • 构建命令: npm run build');
  console.log('   • 输出目录: dist');
  console.log('');
  console.log('   方法2: 直接上传文件');
  console.log('   • 选择 Direct Upload');
  console.log('   • 将 dist/ 目录内容拖拽上传');
  console.log('   • 项目名称: queensgame');

  // 6. 部署后检查
  console.log('\n🔍 6. 部署后检查清单:');
  console.log('   [ ] 网站正常访问');
  console.log('   [ ] 游戏加载正常');
  console.log('   [ ] 分析工具工作');
  console.log('   [ ] SEO功能正常');
  console.log('   [ ] 性能指标良好');

  // 7. 性能优化建议
  console.log('\n📈 7. 性能优化建议:');
  console.log('   • 启用Cloudflare的Auto Minify');
  console.log('   • 配置Brotli压缩');
  console.log('   • 启用Rocket Loader');
  console.log('   • 配置页面规则缓存');

  console.log('\n🎉 部署准备完成！');
  console.log('   现在可以按照上述步骤部署到Cloudflare Pages了。');

} catch (error) {
  console.error('\n❌ 部署准备失败:', error.message);
  console.log('\n🔧 手动检查步骤:');
  console.log('   1. npm run build');
  console.log('   2. 检查 dist/ 目录');
  console.log('   3. 确认所有配置文件存在');
  console.log('   4. 按照部署说明操作');
} 