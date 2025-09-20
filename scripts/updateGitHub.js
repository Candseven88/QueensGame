#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

console.log('🚀 === QueensGame GitHub仓库更新脚本 ===\n');

try {
  // 检查Git状态
  console.log('📋 检查Git状态...');
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  
  if (gitStatus.trim()) {
    console.log('⚠️  发现未提交的更改，正在添加和提交...');
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "feat: 更新QueensGame平台 - 游戏数据、分析工具、SEO优化"', { stdio: 'inherit' });
  } else {
    console.log('✅ 工作目录干净，无需提交');
  }

  // 检查远程仓库
  console.log('\n🔗 检查远程仓库配置...');
  const remotes = execSync('git remote -v', { encoding: 'utf8' });
  console.log(remotes);

  // 获取当前分支
  const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  console.log(`\n🌿 当前分支: ${currentBranch}`);

  // 强制推送到GitHub
  console.log('\n🚀 强制推送到GitHub仓库...');
  console.log('⚠️  这将覆盖远程仓库的所有内容！');
  
  execSync(`git push origin ${currentBranch} --force`, { stdio: 'inherit' });
  
  console.log('\n🎉 GitHub仓库更新成功！');
  console.log('\n📝 下一步操作:');
  console.log('   1. 访问 https://github.com/Candseven88/QueensGame');
  console.log('   2. 确认代码已更新');
  console.log('   3. 检查所有文件是否正确上传');
  console.log('   4. 配置GitHub Pages或部署到其他平台');

} catch (error) {
  console.error('\n❌ 更新失败:', error.message);
  console.log('\n🔧 手动操作步骤:');
  console.log('   1. git add .');
  console.log('   2. git commit -m "更新消息"');
  console.log('   3. git push origin main --force');
} 