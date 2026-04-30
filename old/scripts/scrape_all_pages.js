const { chromium } = require('E:/Program Files/QClaw/resources/openclaw/node_modules/playwright-core');

(async () => {
  try {
    const b = await chromium.connectOverCDP('http://127.0.0.1:28800');
    const ctx = b.contexts();
    const page = ctx[0].pages()[0];

    // Go to page 1 first
    await page.goto('https://space.bilibili.com/299440870/video', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(5000);

    const allVideos = [];

    for (let pg = 1; pg <= 3; pg++) {
      if (pg > 1) {
        // Click page number button
        const btn = await page.$(`.vui_pagination button >> text="${pg}"`);
        if (btn) {
          await btn.click();
          await page.waitForTimeout(4000);
          // Wait for content to load
          await page.waitForFunction(() => {
            const items = document.querySelectorAll('[class*=small-card], [class*=video-item-container]');
            return items.length > 0;
          }).catch(() => {});
          await page.waitForTimeout(3000);
        } else {
          console.error(`Page ${pg} button not found, trying alternative`);
          // Try clicking the "next" arrow
          const next = await page.$('.vui_pagination .next');
          if (next) {
            await next.click();
            await page.waitForTimeout(6000);
          }
        }
      }

      // Extract video titles using a more robust method
      const videos = await page.evaluate(() => {
        // Try multiple selectors
        const cards = document.querySelectorAll('.small-card, .video-item-container, [class*="card"], li');
        const titles = [];
        cards.forEach(card => {
          // Try to find title link
          const titleLink = card.querySelector('a.title, .title a, h3 a, a[href*="/video/"]');
          const titleText = card.querySelector('.title');
          if (titleLink && titleLink.textContent.trim().length > 10) {
            titles.push(titleLink.textContent.trim());
          } else if (titleText && titleText.textContent.trim().length > 10) {
            titles.push(titleText.textContent.trim());
          }
        });
        // Deduplicate
        return [...new Set(titles)];
      });

      console.error(`Page ${pg}: found ${videos.length} titles`);
      allVideos.push({ page: pg, videos });

      // Print raw text for debugging
      const rawText = await page.evaluate(() => {
        const body = document.body.innerText;
        // Find the video section
        const idx = body.indexOf('TA的视频');
        if (idx >= 0) return body.substring(idx, idx + 3000);
        return body.substring(0, 3000);
      });
      console.log(`=== PAGE ${pg} ===`);
      console.log(rawText);
    }

    console.error(`\nTotal unique pages scraped: ${allVideos.length}`);
    await b.close();
  } catch (e) {
    console.error('ERR:', e.message);
    console.error(e.stack);
  }
})();
