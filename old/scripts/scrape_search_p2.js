const { chromium } = require('E:/Program Files/QClaw/resources/openclaw/node_modules/playwright-core');

(async () => {
  try {
    const b = await chromium.connectOverCDP('http://127.0.0.1:28800');
    const ctx = b.contexts();
    const page = ctx[0].pages()[0];

    // Click page 2
    console.error('Clicking page 2...');
    const p2 = await page.locator('button:has-text("2")').first();
    await p2.click({ timeout: 5000 });
    await page.waitForTimeout(6000);
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(3000);

    const content = await page.evaluate(() => {
      return document.body.innerText;
    });

    console.log('=== SEARCH PAGE 2 ===');
    console.log(content.substring(0, 5000));
    await b.close();
  } catch (e) {
    console.error('ERR:', e.message);
  }
})();