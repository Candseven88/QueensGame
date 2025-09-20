#!/usr/bin/env node

/**
 * QueensGame 定时更新启动脚本
 * 用于演示和测试定时更新功能
 */

import { scheduleUpdate } from './autoUpdate.js';

console.log('🚀 启动 QueensGame 定时更新服务...');
console.log('📅 更新频率: 每7天');
console.log('⏰ 首次更新将在3秒后开始...');
console.log('💡 按 Ctrl+C 停止服务');

// 3秒后开始第一次更新
setTimeout(() => {
  scheduleUpdate();
}, 3000);

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n🛑 收到停止信号，正在关闭服务...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 收到终止信号，正在关闭服务...');
  process.exit(0);
}); 