const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const DEMOS = path.resolve(__dirname, '../../demos');
const OUT = path.resolve(__dirname, 'screenshots');
fs.mkdirSync(OUT, { recursive: true });

const PAGES = [
  { file: 'index.html', name: 'index' },
  { file: 'ghost-text.html', name: 'ghost-text' },
  { file: 'parameter-palette.html', name: 'parameter-palette' },
  { file: 'resource-lookup.html', name: 'resource-lookup' },
  { file: 'hint-line.html', name: 'hint-line' },
  { file: 'passthrough.html', name: 'passthrough' },
  { file: 'degraded-plain.html', name: 'degraded-plain' },
];
const THEMES = ['dark', 'light', 'high-contrast'];

(async () => {
  const browser = await chromium.launch();
  const results = [];
  let failures = 0;

  for (const p of PAGES) {
    const page = await browser.newPage({ viewport: { width: 1000, height: 640 } });
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));

    const url = 'file://' + path.join(DEMOS, p.file);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200); // let async replay (resource loading) settle

    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const hasContent = await page.evaluate(() => !!document.querySelector('.host, .cards'));

    for (const theme of THEMES) {
      await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
      await page.waitForTimeout(150);
      await page.screenshot({ path: path.join(OUT, `${p.name}.${theme}.png`) });
    }

    const ok = errors.length === 0 && hasContent && bg && bg !== 'rgba(0, 0, 0, 0)';
    if (!ok) failures++;
    results.push({ page: p.name, bg, hasContent, errors });
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
  console.log(failures === 0 ? '\nALL DEMOS OK' : `\n${failures} DEMO(S) FAILED`);
  process.exit(failures === 0 ? 0 : 1);
})();
