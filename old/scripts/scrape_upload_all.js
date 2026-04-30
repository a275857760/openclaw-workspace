const { chromium } = require('E:/Program Files/QClaw/resources/openclaw/node_modules/playwright-core');

(async () => {
  try {
    const b = await chromium.connectOverCDP('http://127.0.0.1:28800');
    const ctx = b.contexts();
    const page = ctx[0].pages()[0];

    const allContent = {};

    for (let p = 1; p <= 3; p++) {
      if (p > 1) {
        console.error(`Clicking page ${p}...`);
        const btn = await page.locator(`button:has-text("${p}")`).first();
        await btn.click({ timeout: 5000 });
        await page.waitForTimeout(6000);
        await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
        await page.waitForTimeout(3000);
      }

      const content = await page.evaluate(() => {
        // Find the video list section
        const body = document.body.innerText;
        const idx = body.indexOf('TA的视频');
        return idx >= 0 ? body.substring(idx, idx + 5000) : body.substring(0, 5000);
      });

      allContent[`page${p}`] = content;
      console.error(`Page ${p}: ${content.length} chars`);
    }

    console.log(JSON.stringify(allContent));
    await b.close();
  } catch (e) {
    console.error('ERR:', e.message);
  }
})();