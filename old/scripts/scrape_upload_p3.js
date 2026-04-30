const { chromium } = require('E:/Program Files/QClaw/resources/openclaw/node_modules/playwright-core');

(async () => {
  try {
    const b = await chromium.connectOverCDP('http://127.0.0.1:28800');
    const ctx = b.contexts();
    const page = ctx[0].pages()[0];

    // Go to page 3 directly
    console.error('Navigating to page 3...');
    const p3 = await page.locator('button:has-text("3")').first();
    await p3.click({ timeout: 5000 });
    await page.waitForTimeout(6000);
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(3000);

    const content = await page.evaluate(() => {
      const body = document.body.innerText;
      const idx = body.indexOf('TA的视频');
      return idx >= 0 ? body.substring(idx, idx + 5000) : body.substring(0, 5000);
    });

    console.log('=== UPLOAD PAGE 3 ===');
    console.log(content);
    await b.close();
  } catch (e) {
    console.error('ERR:', e.message);
  }
})();