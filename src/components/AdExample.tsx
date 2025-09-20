import React from 'react';
import { AdSense, AdSenseSlots } from './AdSense';

/**
 * AdSense使用示例组件
 * 展示如何在页面的不同位置添加广告
 */
export const AdExample: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* 页面顶部横幅广告 */}
      <section className="w-full">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-white/80">顶部横幅广告</h3>
        </div>
        <AdSense 
          slot={AdSenseSlots.BANNER_TOP.slot}
          style={AdSenseSlots.BANNER_TOP.style}
          className="mx-auto"
        />
      </section>

      {/* 内容区域 */}
      <section className="grid lg:grid-cols-4 gap-6">
        {/* 主要内容 */}
        <div className="lg:col-span-3 space-y-6">
          <div className="premium-card p-6">
            <h2 className="text-2xl font-bold text-white mb-4">游戏内容</h2>
            <p className="text-white/80 mb-4">
              这里是主要的游戏内容区域。您可以在内容之间添加广告来增加收入。
            </p>
            
            {/* 内容中的广告 */}
            <div className="my-8">
              <div className="text-center mb-2">
                <span className="text-sm text-white/60">- 广告 -</span>
              </div>
              <AdSense 
                slot={AdSenseSlots.IN_CONTENT.slot}
                style={AdSenseSlots.IN_CONTENT.style}
                className="mx-auto"
              />
            </div>
            
            <p className="text-white/80">
              继续内容...这里是更多的游戏内容。
            </p>
          </div>
        </div>

        {/* 侧边栏广告 */}
        <div className="lg:col-span-1">
          <div className="premium-card p-4">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">侧边栏广告</h3>
            <AdSense 
              slot={AdSenseSlots.SIDEBAR.slot}
              style={AdSenseSlots.SIDEBAR.style}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* 游戏页面专用广告 */}
      <section className="w-full">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-white/80">游戏页面广告</h3>
        </div>
        <AdSense 
          slot={AdSenseSlots.GAME_PAGE.slot}
          style={AdSenseSlots.GAME_PAGE.style}
          className="mx-auto"
        />
      </section>
    </div>
  );
};

/**
 * 使用指南：
 * 
 * 1. 首先在Google AdSense控制台创建广告单元
 * 2. 获取每个广告单元的slot ID
 * 3. 更新AdSenseSlots中的slot值
 * 4. 在需要的页面导入并使用AdSense组件
 * 
 * 例如：
 * import { AdSense } from './components/AdSense';
 * 
 * <AdSense 
 *   slot="您的广告位ID" 
 *   style={{ display: 'block', width: '100%', height: '250px' }}
 * />
 */ 