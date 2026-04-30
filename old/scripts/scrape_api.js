const { chromium } = require('E:/Program Files/QClaw/resources/openclaw/node_modules/playwright-core');

(async () => {
  try {
    const b = await chromium.connectOverCDP('http://127.0.0.1:28800');
    const ctx = b.contexts();
    const page = ctx[0].pages()[0];

    // First navigate to the space to get cookies
    await page.goto('https://space.bilibili.com/299440870/video', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    // Get cookies
    const cookies = await ctx[0].cookies();
    const cookieStr = cookies.map(c => `${c.name}=${c.value}`).join('; ');
    console.error(`Got ${cookies.length} cookies`);

    // Call B站 space video API
    const allVideos = [];
    for (let pn = 1; pn <= 3; pn++) {
      const apiUrl = `https://api.bilibili.com/x/space/wbi/arc/search?mid=299440870&ps=30&pn=${pn}&order=pubdate`;
      const result = await page.evaluate(async (url) => {
        try {
          const resp = await fetch(url, { credentials: 'include' });
          const data = await resp.json();
          return data;
        } catch (e) {
          return { error: e.message };
        }
      }, apiUrl);

      console.error(`Page ${pn}: code=${result.code}, message=${result.message}`);

      if (result.data && result.data.list && result.data.list.vlist) {
        const vlist = result.data.list.vlist;
        for (const v of vlist) {
          allVideos.push({
            title: v.title,
            play: v.play,
            video_review: v.video_review,
            comment: v.comment,
            length: v.length,
            created: new Date(v.created * 1000).toISOString().split('T')[0],
            description: v.description ? v.description.substring(0, 100) : ''
          });
        }
        console.error(`  Got ${vlist.length} videos, total: ${result.data.page.count}`);
      } else {
        console.error(`  API failed: ${JSON.stringify(result).substring(0, 300)}`);
      }
    }

    console.log(JSON.stringify(allVideos, null, 2));
    console.error(`Total videos collected: ${allVideos.length}`);
    await b.close();
  } catch (e) {
    console.error('ERR:', e.message);
  }
})();
