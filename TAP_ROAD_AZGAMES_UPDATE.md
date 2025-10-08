# TAP ROAD 套壳地址更新 - AZ Games

## 更新概述

由于 ICC Games 不允许iframe嵌入，我们已经将TAP ROAD游戏的套壳地址更换为更加友好的 **AZ Games** 平台。

## 主要更改

### 1. 游戏源地址更新
```typescript
// 旧地址 (ICC Games - 不允许嵌入)
embedUrl: "https://icc-games.com/wp-content/uploads/2025/09/Tap-Road.html"

// 新地址 (AZ Games - 支持嵌入)
embedUrl: "https://azgames.io/game/tap-road/"
```

### 2. 备用地址配置
```typescript
fallbackUrls: [
  "https://azgames.io/game/tap-road/",                                    // 主要地址
  "https://icc-games.com/wp-content/uploads/2025/09/Tap-Road.html"       // 备用地址
]
```

### 3. 游戏参数调整
```typescript
author: "AZ Games",        // 更新提供者
width: 1024,              // 调整为标准尺寸
height: 768,              // 4:3 比例，更适合游戏显示
```

## AZ Games 平台优势

根据搜索结果，[AZ Games](https://azgames.io/game/tap-road/) 相比 ICC Games 有以下优势：

### 🎯 嵌入友好性
- **更少的安全限制**: AZ Games 通常不设置严格的 X-Frame-Options
- **专业游戏平台**: 专门为游戏嵌入而设计
- **iframe 支持**: 原生支持iframe嵌入，无需特殊配置

### 🚀 技术优势
- **响应式设计**: 游戏界面能够适应不同的iframe尺寸
- **更好的性能**: 优化的加载速度和游戏体验
- **跨域支持**: 允许跨域嵌入，减少连接被拒绝的问题

### 🎮 游戏体验
- **完整功能**: 保持游戏的所有原始功能
- **稳定性**: 更稳定的游戏加载和运行
- **兼容性**: 更好的浏览器兼容性

## 测试验证

### 创建的测试文件
- **tap-road-azgames-test.html**: 专门测试AZ Games嵌入的页面
- 包含多种尺寸和配置的测试
- 对比AZ Games vs ICC Games的加载效果

### 测试场景
1. **全尺寸测试** (1024x768): 标准游戏尺寸
2. **响应式测试** (800x600): 适中的显示尺寸  
3. **对比测试**: AZ Games vs ICC Games 并排比较
4. **移动端测试** (360x640): 移动设备优化尺寸

## 预期结果

### AZ Games (新地址)
- ✅ **应该成功加载**: 显示完整的游戏界面
- ✅ **正常交互**: 支持点击、触摸等游戏操作
- ✅ **稳定运行**: 游戏逻辑正常工作
- ✅ **响应式**: 适应不同的iframe尺寸

### ICC Games (旧地址)
- ❌ **连接被拒绝**: 显示错误信息
- ❌ **空白页面**: iframe无法加载内容
- ❌ **安全限制**: X-Frame-Options阻止嵌入

## 用户体验改进

### 主要优势
1. **无缝游戏体验**: 用户可以直接在我们的页面内玩游戏
2. **更快的加载速度**: AZ Games优化的服务器响应
3. **更好的稳定性**: 减少加载失败和连接问题
4. **保持用户留存**: 用户不需要跳转到外部网站

### 备用机制
- 如果AZ Games也出现问题，系统会自动尝试备用地址
- 提供"在新标签页中打开"的选项
- 友好的错误处理和用户提示

## 测试步骤

### 1. 在线测试
访问开发服务器测试新的游戏地址：
```
http://localhost:5174/games/tap-road
```

### 2. 独立测试
在浏览器中打开测试页面：
```
tap-road-azgames-test.html
```

### 3. 验证要点
- [ ] 游戏是否正常加载
- [ ] 游戏交互是否正常工作
- [ ] 不同尺寸下的显示效果
- [ ] 移动端兼容性

## 技术实现

### GameModal 组件兼容
现有的 GameModal 组件已经支持：
- 动态尺寸计算（使用游戏的 1024x768 尺寸）
- 错误处理和备用方案
- 响应式调整

### 配置更新
```typescript
{
  id: "tap-road",
  embedUrl: "https://azgames.io/game/tap-road/",
  fallbackUrls: ["https://azgames.io/game/tap-road/", "https://icc-games.com/wp-content/uploads/2025/09/Tap-Road.html"],
  width: 1024,
  height: 768,
  author: "AZ Games"
}
```

## 监控建议

### 需要关注的指标
1. **加载成功率**: AZ Games vs ICC Games 的成功率对比
2. **用户互动**: 游戏内的用户行为数据
3. **错误率**: iframe加载失败的频率
4. **用户反馈**: 关于游戏体验的用户评价

### 后续优化
1. 如果AZ Games表现良好，可以考虑迁移其他游戏
2. 建立与AZ Games的合作关系
3. 探索更多iframe友好的游戏平台

---

**更新时间**: 2025年10月8日  
**状态**: ✅ 已完成，等待测试验证  
**新地址**: https://azgames.io/game/tap-road/  
**预期**: 显著改善游戏嵌入成功率和用户体验
