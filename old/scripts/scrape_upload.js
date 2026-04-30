const { chromium } = require('E:/Program Files/QClaw/resources/openclaw/node_modules/playwright-core');

(async () => {
  try {
    const b = await chromium.connectOverCDP('http://127.0.0.1:28800');
    const ctx = b.contexts();
    const page = ctx[0].pages()[0] || await ctx[0].newPage();

    // Navigate to upload video management page
    console.error('Opening upload/video page...');
    await page.goto('https://space.bilibili.com/299440870/upload/video', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(5000);

    const content = await page.evaluate(() => {
      return document.body.innerText;
    });

    console.log('=== UPLOAD VIDEO PAGE ===');
    console.log(content.substring(0, 8000));

    // Check pagination
    const pagination = await page.evaluate(() => {
      const btns = document.querySelectorAll('button[class*=pagenation], [class*=pagination] button, .vui_pagenation button, .vui_pagination button');
      return Array.from(btns).map(b => ({ text: b.textContent.trim(), disabled: b.disabled }));
    });
    console.error('Pagination:', JSON.stringify(pagination));

    await b.close();
  } catch (e) {
    console.error('ERR:', e.message);
  }
})();