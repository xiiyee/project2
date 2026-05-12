const { execSync } = require('child_process');
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
// 配置项（可根据需要修改）
const config = {
  url: 'http://localhost:60528',        // 要访问的网址（由 Python 脚本注入）
  screenshotPath: path.join(__dirname, 'screenshot.png'), // 截图保存路径
  urlreportPath: path.join(__dirname, 'url_check_report.json'), // URL 检查报告保存路径
  viewport: { width: 1440, height: 1080 }, // 浏览器视口大小
  fullPage: true, // 开启整页截图（关键）
  headless: true  // 是否无头模式（false会显示浏览器窗口）
};
/**
 * 增强版网页截图函数（包含懒加载处理）
 */
async function enhancedScreenshot() {
  let browser;
  try {
    // 启动浏览器
    browser = await chromium.launch({
      headless: config.headless,
      timeout: 60000
    });
    // 创建新页面并设置视口
    const page = await browser.newPage();
    await page.setViewportSize(config.viewport);
    // 访问目标网址
    console.log(`正在访问: ${config.url}`);
    await page.goto(config.url, {
      timeout: 60000,
      waitUntil: 'networkidle' // 等待网络空闲（比domcontentloaded更彻底）
    });
    // 初始等待，确保页面基础内容渲染完成
    console.log('等待页面初始渲染...');
    await page.waitForTimeout(3000);

    const clickResult = await page.evaluate(() => {
      if (window.__swalmStartButtonClicked) return { clicked: false, already: true };
      const patterns = [
        /start game/i,
        /begin game/i,
        /开始游戏/i,
        /begin/i,
        /start/i,
        /开始/i,
      ];
      const selectors = [
        'button',
        '[role="button"]',
        'a',
        'input[type="button"]',
        'input[type="submit"]',
      ];
      function textOf(el) {
        return (el.innerText || el.value || el.getAttribute('aria-label') || '').trim();
      }
      function isVisible(el) {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return (
          style &&
          style.visibility !== 'hidden' &&
          style.display !== 'none' &&
          rect.width > 0 &&
          rect.height > 0
        );
      }
      for (const sel of selectors) {
        const nodes = Array.from(document.querySelectorAll(sel));
        for (const el of nodes) {
          if (!isVisible(el)) continue;
          const t = textOf(el);
          if (!t) continue;
          if (patterns.some((p) => p.test(t))) {
            el.click();
            window.__swalmStartButtonClicked = true;
            return { clicked: true, text: t };
          }
        }
      }
      return { clicked: false };
    });

    if (clickResult && clickResult.clicked) {
      console.log(`已尝试点击开始按钮: "${clickResult.text}"`);
      await page.waitForTimeout(2000);
    } else if (clickResult && clickResult.already) {
      console.log('开始按钮已点击过，跳过');
    } else {
      console.log('未找到可点击的开始按钮，继续截图');
    }

    console.log('开始处理懒加载内容...');
    const bodyHandle = await page.$('body');
    const scrollHeight = await bodyHandle.evaluate(body => body.scrollHeight);
    // 分段滚动触发懒加载
    const scrollStep = config.viewport.height * 0.75;
    for (let position = 0; position < scrollHeight; position += scrollStep) {
      await page.evaluate(pos => window.scrollTo(0, pos), position);
      await page.waitForTimeout(500); // 等待懒加载内容加载
    }
    // 回到顶部
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    // 最终等待确保所有内容加载完毕
    console.log('等待懒加载内容完全加载...');
    await page.waitForTimeout(2000);

    // 截图
    console.log(`正在保存全页截图到: ${config.screenshotPath}`);
    await page.screenshot({
      path: config.screenshotPath,
      fullPage: config.fullPage,
      timeout: 60000
    });
    console.log('✅ 全页截图保存成功!');

    // 检查是否成功生成截图
    if (fs.existsSync(config.screenshotPath)) {
      const stats = fs.statSync(config.screenshotPath);
      console.log(`截图文件大小: ${stats.size} bytes`);
    }

    // 记录控制台是否报错

    try {
      console.log("正在检测控制台是否报错...");
      // 这行会阻塞，直到命令执行完毕
      execSync(`aidp_url_check ${config.url} -o ${config.urlreportPath}`); 
      console.log(`检测完成，报告已生成：${config.urlreportPath}`);
    } catch (error) {
      console.error("控制台输出执行出错了：", error.message);
    }
    
  } catch (error) {
    console.error('截图过程出错:', error);
  } finally {
    // 确保浏览器关闭
    if (browser) {
      await browser.close();
    }
  }
}
enhancedScreenshot();