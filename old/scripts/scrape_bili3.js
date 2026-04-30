const { chromium } = require('E:/Program Files/QClaw/resources/openclaw/node_modules/playwright-core');

(async () => {
  try {
    const b = await chromium.connectOverCDP('http://127.0.0.1:28800');
    const ctx = b.contexts();
    const page = ctx[0].pages()[0];
    
    const allText = [];
    
    for (let pageNum = 1; pageNum <= 3; pageNum++) {
      const url = `https://space.bilibili.com/299440870/video?pn=${pageNum}`;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(4000);
      
      const text = await page.evaluate(() => document.body.innerText);
      allText.push(text);
      console.error(`Page ${pageNum}: ${text.length} chars`);
    }
    
    console.log(allText.join('\n--- PAGE BREAK ---\n'));
    await b.close();
  } catch (e) {
    console.error('ERR:', e.message);
  }
})();
