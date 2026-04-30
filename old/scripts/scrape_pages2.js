const { chromium } = require('E:/Program Files/QClaw/resources/openclaw/node_modules/playwright-core');

(async () => {
  try {
    const b = await chromium.connectOverCDP('http://127.0.0.1:28800');
    const ctx = b.contexts();
    const page = ctx[0].pages()[0];

    // Try the older API endpoint that doesn't need WBI
    await page.goto('https://space.bilibili.com/299440870/video', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    // Intercept network requests to find the actual API
    const allVideos = [];

    // Method: Use the page's internal API call pattern
    const result = await page.evaluate(async () => {
      // Try fetching the space video list through various endpoints
      const endpoints = [
        'https://api.bilibili.com/x/space/arc/search?mid=299440870&ps=30&pn=1&order=pubdate',
        'https://api.bilibili.com/x/polymer/web-dynamic/v1/opus/feed?host_mid=299440870',
      ];
      
      const results = {};
      for (const url of endpoints) {
        try {
          const resp = await fetch(url, { credentials: 'include' });
          results[url.split('/').pop().split('?')[0]] = await resp.json();
        } catch (e) {
          results[url.split('/').pop()] = { error: e.message };
        }
      }
      return results;
    });

    console.error('API results:', JSON.stringify(result).substring(0, 500));

    // Alternative: just click through pages using mouse
    console.error('Trying click-based pagination...');

    // Reload page 1
    await page.goto('https://space.bilibili.com/299440870/video', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(5000);

    // Get page 1 content
    const page1Text = await page.evaluate(() => {
      const body = document.body.innerText;
      const idx = body.indexOf('TA的视频');
      return idx >= 0 ? body.substring(idx, idx + 5000) : body.substring(0, 5000);
    });

    // Click page 2
    console.error('Looking for page 2 button...');
    const pageButtons = await page.evaluate(() => {
      const btns = document.querySelectorAll('.vui_pagination button, .vui_pagenation button, .pagination button, [class*=pagination] button, [class*=pagenation] button');
      return Array.from(btns).map(b => ({ text: b.textContent.trim(), className: b.className, disabled: b.disabled }));
    });
    console.error('Page buttons:', JSON.stringify(pageButtons));

    // Try clicking page 2 via text content
    try {
      const p2 = await page.locator('button:has-text("2")').first();
      await p2.click({ timeout: 5000 });
      console.error('Clicked page 2');
      await page.waitForTimeout(6000);
      await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
      await page.waitForTimeout(3000);

      const page2Text = await page.evaluate(() => {
        const body = document.body.innerText;
        const idx = body.indexOf('TA的视频');
        return idx >= 0 ? body.substring(idx, idx + 5000) : body.substring(0, 5000);
      });

      console.log('=== PAGE 2 ===');
      console.log(page2Text);
    } catch (e) {
      console.error('Page 2 click failed:', e.message);
    }

    await b.close();
  } catch (e) {
    console.error('ERR:', e.message);
  }
})();
