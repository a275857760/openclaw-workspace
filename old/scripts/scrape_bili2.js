const { chromium } = require('E:/Program Files/QClaw/resources/openclaw/node_modules/playwright-core');

(async () => {
  try {
    const b = await chromium.connectOverCDP('http://127.0.0.1:28800');
    const ctx = b.contexts();
    const page = ctx[0].pages()[0];
    
    const allVideos = [];
    
    for (let pageNum = 1; pageNum <= 3; pageNum++) {
      const url = `https://space.bilibili.com/299440870/video?pn=${pageNum}`;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(4000);
      
      const videos = await page.evaluate(() => {
        const items = document.querySelectorAll('[class*=small-card], [class*=video-item]');
        const results = [];
        items.forEach(item => {
          const titleEl = item.querySelector('a.title, h3.title, [class*=title] a, .title');
          const statEl = item.querySelector('[class*=play], [class*=stat], .play-icon + span, .video-stat');
          if (titleEl) {
            results.push(titleEl.textContent.trim());
          }
        });
        // Fallback: get all text blocks that look like video titles
        if (results.length === 0) {
          const text = document.body.innerText;
          const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 10);
          // Find lines between "TA的视频" and "下一页"/pagination
          let capturing = false;
          for (const line of lines) {
            if (line.includes('TA的视频') || line.includes('最新发布')) { capturing = true; continue; }
            if (line.includes('下一页') || line.includes('共') && line.includes('页')) break;
            if (capturing && line.length > 15 && line.length < 200) {
              // Skip non-video lines
              if (/^\d{4}-\d{2}/.test(line)) continue; // date
              if (/^\d+$/.test(line)) continue; // pure numbers
              if (/^(播放|收藏|更多|充电)/.test(line)) continue;
              if (/^\d+(\.\d+)?[万亿]$/.test(line)) continue; // view counts
              if (/^\d{2}:\d{2}/.test(line)) continue; // duration
              if (line === '登录') continue;
              results.push(line);
            }
          }
        }
        return results;
      });
      
      allVideos.push(...videos);
      console.error(`Page ${pageNum}: got ${videos.length} videos`);
    }
    
    console.log(JSON.stringify(allVideos, null, 2));
    console.error(`Total: ${allVideos.length} videos`);
    await b.close();
  } catch (e) {
    console.error('ERR:', e.message);
  }
})();
