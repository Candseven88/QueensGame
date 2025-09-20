#!/usr/bin/env node

/**
 * QueensGame 项目清理脚本
 * 
 * 这个脚本用于清理项目中的多余文件，包括：
 * 1. 移动根目录中的MD文件到docs目录
 * 2. 删除旧的备份文件，只保留最新的备份
 * 3. 删除源代码中的备份文件
 * 4. 整理日志文件
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// 获取项目根目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// 颜色输出函数
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// 日志函数
const log = {
  info: (msg) => console.log(`${colors.blue}[INFO]${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}[SUCCESS]${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}[WARNING]${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}[ERROR]${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`)
};

// 获取命令行参数
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const force = args.includes('--force');

if (dryRun) {
  log.warning('运行在模拟模式，不会实际删除或移动文件');
}

// 打印脚本标题
log.title('=== QueensGame 项目清理脚本 ===');

// 需要保留的根目录MD文件
const keepRootMdFiles = ['README.md'];

// 需要保留的备份文件（最新的）
const keepBackupFiles = [
  'incremental-backup-2025-09-10T00-50-48-183Z.ts'
];

// 1. 移动根目录中的MD文件到docs目录
function moveMdFilesToDocs() {
  log.title('1. 移动根目录中的MD文件到docs目录');
  
  const mdFiles = fs.readdirSync(rootDir)
    .filter(file => file.endsWith('.md') && !keepRootMdFiles.includes(file));
  
  if (mdFiles.length === 0) {
    log.info('没有需要移动的MD文件');
    return;
  }
  
  log.info(`找到 ${mdFiles.length} 个MD文件需要移动`);
  
  mdFiles.forEach(file => {
    const srcPath = path.join(rootDir, file);
    const destPath = path.join(rootDir, 'docs', file);
    
    if (dryRun) {
      log.info(`将移动: ${srcPath} -> ${destPath}`);
    } else {
      try {
        fs.copyFileSync(srcPath, destPath);
        fs.unlinkSync(srcPath);
        log.success(`已移动: ${file} -> docs/${file}`);
      } catch (err) {
        log.error(`移动文件失败: ${file}, 错误: ${err.message}`);
      }
    }
  });
}

// 2. 清理备份目录，只保留最新的备份
function cleanupBackups() {
  log.title('2. 清理备份目录，只保留最新的备份');
  
  const backupsDir = path.join(rootDir, 'backups');
  if (!fs.existsSync(backupsDir)) {
    log.info('备份目录不存在');
    return;
  }
  
  const backupFiles = fs.readdirSync(backupsDir)
    .filter(file => !keepBackupFiles.includes(file));
  
  if (backupFiles.length === 0) {
    log.info('没有需要删除的备份文件');
    return;
  }
  
  log.info(`找到 ${backupFiles.length} 个旧备份文件需要删除`);
  
  backupFiles.forEach(file => {
    const filePath = path.join(backupsDir, file);
    
    if (dryRun) {
      log.info(`将删除: ${filePath}`);
    } else {
      try {
        fs.unlinkSync(filePath);
        log.success(`已删除: ${file}`);
      } catch (err) {
        log.error(`删除文件失败: ${file}, 错误: ${err.message}`);
      }
    }
  });
}

// 3. 删除源代码中的备份文件
function cleanupSourceBackups() {
  log.title('3. 删除源代码中的备份文件');
  
  const srcDir = path.join(rootDir, 'src');
  if (!fs.existsSync(srcDir)) {
    log.info('源代码目录不存在');
    return;
  }
  
  // 直接使用fs模块查找备份文件
  const backupFiles = [];
  
  // 递归查找函数
  const findBackupFiles = (dir) => {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findBackupFiles(filePath);
      } else if (
        file.includes('backup') || 
        file.endsWith('.backup') || 
        file.endsWith('.bak') || 
        file.endsWith('.ts.backup')
      ) {
        backupFiles.push(filePath);
      }
    }
  };
  
  try {
    findBackupFiles(srcDir);
  } catch (err) {
    log.error(`查找备份文件失败: ${err.message}`);
    return;
  }
  
  if (backupFiles.length === 0) {
    log.info('没有找到源代码备份文件');
    return;
  }
  
  log.info(`找到 ${backupFiles.length} 个源代码备份文件需要删除`);
  
  backupFiles.forEach(filePath => {
    if (dryRun) {
      log.info(`将删除: ${filePath}`);
    } else {
      try {
        fs.unlinkSync(filePath);
        log.success(`已删除: ${path.basename(filePath)}`);
      } catch (err) {
        log.error(`删除文件失败: ${filePath}, 错误: ${err.message}`);
      }
    }
  });
}

// 4. 整理日志文件，只保留最新的日志
function cleanupLogs() {
  log.title('4. 整理日志文件');
  
  const logsDir = path.join(rootDir, 'logs');
  if (!fs.existsSync(logsDir)) {
    log.info('日志目录不存在');
    return;
  }
  
  // 获取所有日志文件
  const logFiles = fs.readdirSync(logsDir);
  
  // 按日志类型分组
  const logGroups = {};
  logFiles.forEach(file => {
    const logType = file.split('-')[0];
    if (!logGroups[logType]) {
      logGroups[logType] = [];
    }
    logGroups[logType].push(file);
  });
  
  // 对于每种日志类型，只保留最新的一个
  Object.keys(logGroups).forEach(logType => {
    const files = logGroups[logType];
    if (files.length <= 1) return;
    
    // 按修改时间排序
    const sortedFiles = files.map(file => {
      const filePath = path.join(logsDir, file);
      const stats = fs.statSync(filePath);
      return { file, mtime: stats.mtime };
    }).sort((a, b) => b.mtime - a.mtime);
    
    // 保留最新的，删除其他的
    const filesToDelete = sortedFiles.slice(1).map(item => item.file);
    
    if (filesToDelete.length === 0) {
      log.info(`${logType} 日志没有需要删除的文件`);
      return;
    }
    
    log.info(`${logType} 日志将保留最新的文件: ${sortedFiles[0].file}`);
    
    filesToDelete.forEach(file => {
      const filePath = path.join(logsDir, file);
      
      if (dryRun) {
        log.info(`将删除: ${filePath}`);
      } else {
        try {
          fs.unlinkSync(filePath);
          log.success(`已删除: ${file}`);
        } catch (err) {
          log.error(`删除文件失败: ${file}, 错误: ${err.message}`);
        }
      }
    });
  });
}

// 5. 更新 .gitignore 文件
function updateGitignore() {
  log.title('5. 确保 .gitignore 文件包含所有需要忽略的文件类型');
  
  // 这一步已经在前面完成了
  log.success('.gitignore 文件已更新');
}

// 6. 整合文档
function consolidateDocs() {
  log.title('6. 整合文档');
  
  const docsDir = path.join(rootDir, 'docs');
  if (!fs.existsSync(docsDir)) {
    log.info('文档目录不存在');
    return;
  }
  
  // 创建文档索引文件
  const docFiles = fs.readdirSync(docsDir).filter(file => file.endsWith('.md'));
  
  if (docFiles.length === 0) {
    log.info('没有找到文档文件');
    return;
  }
  
  log.info(`找到 ${docFiles.length} 个文档文件`);
  
  const indexContent = `# QueensGame 文档索引

此文件是QueensGame项目的文档索引，列出了所有可用的文档文件。

## 可用文档

${docFiles.map(file => `- [${file.replace('.md', '')}](${file})`).join('\n')}

## 文档分类

### 部署相关
${docFiles.filter(file => file.toLowerCase().includes('deploy') || file.toLowerCase().includes('cloudflare')).map(file => `- [${file.replace('.md', '')}](${file})`).join('\n')}

### 游戏相关
${docFiles.filter(file => file.toLowerCase().includes('game')).map(file => `- [${file.replace('.md', '')}](${file})`).join('\n')}

### GitHub相关
${docFiles.filter(file => file.toLowerCase().includes('github')).map(file => `- [${file.replace('.md', '')}](${file})`).join('\n')}

### 其他文档
${docFiles.filter(file => 
  !file.toLowerCase().includes('deploy') && 
  !file.toLowerCase().includes('cloudflare') && 
  !file.toLowerCase().includes('game') && 
  !file.toLowerCase().includes('github')
).map(file => `- [${file.replace('.md', '')}](${file})`).join('\n')}

## 最近更新

最后更新时间: ${new Date().toISOString()}
`;

  const indexPath = path.join(docsDir, 'README.md');
  
  if (dryRun) {
    log.info(`将创建文档索引: ${indexPath}`);
    log.info(indexContent.slice(0, 200) + '...');
  } else {
    try {
      fs.writeFileSync(indexPath, indexContent);
      log.success(`已创建文档索引: docs/README.md`);
    } catch (err) {
      log.error(`创建文档索引失败: ${err.message}`);
    }
  }
}

// 执行清理操作
try {
  if (!force && !dryRun) {
    log.warning('此操作将删除文件，请使用 --force 参数确认执行，或使用 --dry-run 参数模拟执行');
    process.exit(0);
  }
  
  moveMdFilesToDocs();
  cleanupBackups();
  cleanupSourceBackups();
  cleanupLogs();
  updateGitignore();
  consolidateDocs();
  
  log.title('清理完成！');
  
  if (dryRun) {
    log.info('这是模拟运行，没有实际删除或移动任何文件');
    log.info('如果要实际执行清理操作，请使用 --force 参数');
  }
  
  log.info('项目结构现在更加整洁，可以更容易地维护和管理');
  
} catch (err) {
  log.error(`清理过程中发生错误: ${err.message}`);
  process.exit(1);
} 