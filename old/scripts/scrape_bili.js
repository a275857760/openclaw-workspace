const { chromium } = require('E:/Program Files/QClaw/resources/openclaw/node_modules/playwright-core');

(async () => {
  try {
    const b = await chromium.connectOverCDP('http://127.0.0.1:28800');
    const ctx = b.contexts();
    if (!ctx.length) { console.log('no context'); return; }
    const page = ctx[0].pages()[0];
    
    // Go to the UP's video list instead of search
    await page.goto('https://space.bilibili.com/299440870/video', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    await page.waitForTimeout(5000);
    
    // Scroll down to load more
    for (let i = 0; i < 8; i++) {
      await page.evaluate(() => window.scrollBy(0, 2000));
      await page.waitForTimeout(2000);
    }
    
    // Get page text content
    const text = await page.evaluate(() => document.body.innerText);
    console.log(text);
    
    await b.close();
  } catch (e) {
    console.error('ERR:', e.message);
  }
})();
