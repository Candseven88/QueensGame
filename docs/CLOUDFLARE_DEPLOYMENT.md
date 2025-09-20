# 🚀 QueensGame 部署到 Cloudflare Pages 完整指南

## 📋 概述

本指南将帮助你将QueensGame平台部署到Cloudflare Pages，享受免费托管、全球CDN和自动部署的优势。

## ✅ 前置条件

### 1. **项目构建**
- ✅ 已完成生产构建 (`npm run build`)
- ✅ 生成了 `dist/` 目录
- ✅ 包含所有必要文件

### 2. **Cloudflare账户**
- 需要Cloudflare账户
- 需要验证的域名（可选，可以使用Cloudflare提供的子域名）

## 🔧 部署方法

### 方法1: 通过Cloudflare Dashboard部署（推荐）

#### 步骤1: 登录Cloudflare
1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 使用你的Cloudflare账户登录

#### 步骤2: 创建Pages项目
1. 在左侧菜单中找到 **"Pages"**
2. 点击 **"Create a project"**
3. 选择 **"Connect to Git"** 或 **"Direct Upload"**

#### 步骤3: 连接GitHub仓库（推荐）
1. 选择 **"Connect to Git"**
2. 授权Cloudflare访问你的GitHub账户
3. 选择仓库: `Candseven88/QueensGame`
4. 选择分支: `main`

#### 步骤4: 配置构建设置
```
项目名称: queensgame
生产分支: main
框架预设: None (或选择 Vite)
构建命令: npm run build
构建输出目录: dist
根目录: / (留空)
```

#### 步骤5: 环境变量配置
```
NODE_VERSION: 18 (或更高)
```

#### 步骤6: 部署
1. 点击 **"Save and Deploy"**
2. 等待构建完成
3. 获得部署URL（例如: `https://queensgame.pages.dev`）

### 方法2: 直接上传文件

#### 步骤1: 准备文件
```bash
# 确保构建完成
npm run build

# 检查dist目录内容
ls -la dist/
```

#### 步骤2: 创建Pages项目
1. 在Cloudflare Dashboard中选择 **"Pages"**
2. 点击 **"Create a project"**
3. 选择 **"Direct Upload"**

#### 步骤3: 上传文件
1. 将 `dist/` 目录中的所有文件拖拽到上传区域
2. 设置项目名称: `queensgame`
3. 点击 **"Deploy site"**

## 🌐 域名配置

### 1. **使用Cloudflare子域名**
- 自动获得: `https://queensgame.pages.dev`
- 免费且无需配置

### 2. **使用自定义域名**
1. 在Pages项目设置中添加自定义域名
2. 配置DNS记录
3. 启用HTTPS（自动配置）

## ⚙️ 部署配置优化

### 1. **构建优化**
```json
// package.json 中的构建脚本
{
  "scripts": {
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

### 2. **Cloudflare Pages配置**
```toml
# _headers 文件（可选，用于安全头配置）
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

### 3. **重定向配置**
```toml
# _redirects 文件（用于SPA路由）
/*    /index.html   200
```

## 🔍 部署验证

### 1. **检查部署状态**
- 在Cloudflare Dashboard中查看部署状态
- 检查构建日志是否有错误

### 2. **功能测试**
- 访问部署的URL
- 测试游戏加载
- 验证分析工具
- 检查SEO功能

### 3. **性能检查**
- 使用PageSpeed Insights测试性能
- 检查Core Web Vitals
- 验证CDN是否正常工作

## 📊 部署后的监控

### 1. **Cloudflare Analytics**
- 监控网站流量
- 查看性能指标
- 分析用户行为

### 2. **错误监控**
- 在Pages设置中启用错误报告
- 监控JavaScript错误
- 检查构建失败

### 3. **性能监控**
- 监控页面加载速度
- 检查资源加载时间
- 优化Core Web Vitals

## 🔄 自动部署设置

### 1. **GitHub集成**
- 每次推送到 `main` 分支时自动部署
- 支持预览部署（Pull Request）
- 自动回滚失败的部署

### 2. **环境变量管理**
- 在Cloudflare Dashboard中设置环境变量
- 支持不同环境的配置
- 保护敏感信息

## 🚨 常见问题解决

### 1. **构建失败**
```bash
# 本地测试构建
npm run build

# 检查依赖
npm install

# 检查TypeScript错误
npx tsc --noEmit
```

### 2. **路由问题**
- 确保配置了正确的重定向规则
- 检查SPA路由配置
- 验证404页面处理

### 3. **分析工具问题**
- 检查Google Analytics ID
- 验证Microsoft Clarity配置
- 确认Cloudflare Analytics token

## 📈 性能优化建议

### 1. **图片优化**
- 使用WebP格式
- 实现懒加载
- 配置适当的图片尺寸

### 2. **代码分割**
- 启用路由级别的代码分割
- 优化第三方库加载
- 使用动态导入

### 3. **缓存策略**
- 配置静态资源缓存
- 启用Service Worker
- 优化API响应缓存

## 🎯 部署检查清单

### ✅ 部署前检查
- [ ] 项目构建成功 (`npm run build`)
- [ ] 所有分析工具配置正确
- [ ] SEO设置完整
- [ ] Google Search Console验证标记已添加
- [ ] 游戏数据正常
- [ ] 站点地图生成

### ✅ 部署后检查
- [ ] 网站正常访问
- [ ] 游戏加载正常
- [ ] 分析工具工作
- [ ] SEO功能正常
- [ ] Google Search Console验证成功
- [ ] 性能指标良好

## 🔗 相关资源

- **Cloudflare Pages文档**: [https://developers.cloudflare.com/pages/](https://developers.cloudflare.com/pages/)
- **Vite部署指南**: [https://vitejs.dev/guide/static-deploy.html](https://vitejs.dev/guide/static-deploy.html)
- **QueensGame项目**: [https://github.com/Candseven88/QueensGame](https://github.com/Candseven88/QueensGame)

## 🎉 部署完成后的效果

部署成功后，你将获得：

1. **全球CDN**: 快速访问，低延迟
2. **免费托管**: 无服务器成本
3. **自动部署**: 代码更新自动部署
4. **HTTPS支持**: 自动SSL证书
5. **性能监控**: 详细的性能分析
6. **错误追踪**: 实时错误监控

---

**🎮 按照这个指南，你的QueensGame平台将成功部署到Cloudflare Pages，享受全球CDN和免费托管的优势！** 