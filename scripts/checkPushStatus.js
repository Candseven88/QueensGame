#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('🔍 === 检查Git推送状态 ===\n');

try {
  // 检查本地状态
  console.log('📋 本地Git状态:');
  const localStatus = execSync('git status', { encoding: 'utf8' });
  console.log(localStatus);

  // 检查远程分支
  console.log('\n🌿 分支信息:');
  const branchInfo = execSync('git branch -vv', { encoding: 'utf8' });
  console.log(branchInfo);

  // 检查远程仓库
  console.log('\n🔗 远程仓库配置:');
  const remotes = execSync('git remote -v', { encoding: 'utf8' });
  console.log(remotes);

  // 检查最近的提交
  console.log('\n📝 最近提交记录:');
  const recentCommits = execSync('git log --oneline -5', { encoding: 'utf8' });
  console.log(recentCommits);

  // 尝试获取远程信息
  console.log('\n🔄 尝试获取远程信息...');
  try {
    const fetchResult = execSync('git fetch origin', { encoding: 'utf8' });
    console.log('✅ 远程信息获取成功');
  } catch (fetchError) {
    console.log('⚠️  远程信息获取失败:', fetchError.message);
  }

  // 检查本地和远程的差异
  console.log('\n📊 本地与远程差异:');
  try {
    const diffResult = execSync('git log HEAD..origin/main --oneline', { encoding: 'utf8' });
    if (diffResult.trim()) {
      console.log('本地有未推送的提交:');
      console.log(diffResult);
    } else {
      console.log('✅ 本地与远程同步');
    }
  } catch (diffError) {
    console.log('⚠️  无法比较本地与远程差异:', diffError.message);
  }

  console.log('\n🎯 建议操作:');
  console.log('   1. 如果推送失败，请检查网络连接');
  console.log('   2. 确认GitHub仓库权限设置');
  console.log('   3. 尝试重新推送: git push origin main --force');
  console.log('   4. 检查GitHub仓库状态');

} catch (error) {
  console.error('\n❌ 检查失败:', error.message);
} 