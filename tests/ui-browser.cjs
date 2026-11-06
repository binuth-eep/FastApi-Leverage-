// Run with PLAYWRIGHT_MODULE pointing to an installed Playwright package.
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const {pathToFileURL} = require('node:url');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.BROWSER_PATH ? {executablePath: process.env.BROWSER_PATH} : {}),
    args: ['--no-sandbox'],
  });
  const context = await browser.newContext({viewport: {width: 1440, height: 1000}, reducedMotion: 'reduce'});
  const page = await context.newPage();
  const errors = [], requests = [], checks = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => {if (/^https?:/.test(request.url())) requests.push(request.url());});
  const url = pathToFileURL(path.resolve(__dirname, '../index.html')).href;
  const output = process.env.SCREENSHOT_DIR;
  if (output) fs.mkdirSync(output, {recursive: true});
  const nav = async hash => {
    await page.evaluate(hash => {location.hash = '#' + hash;}, hash);
    await page.waitForFunction(hash => location.hash === '#' + hash && document.querySelector('main').children.length > 0, hash);
    await page.waitForTimeout(80);
  };
  const check = async (name, run) => {await run(); checks.push(name);};
  try {
    await page.goto(url);
    await check('Generated illustrations load offline from the single HTML file', async () => {
      await page.locator('.hero-art').waitFor();
      await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
      assert.equal(await page.locator('.journey-step').count(), 5);
      assert.equal(await page.locator('.module-card').count(), 25);
      assert.equal(await page.locator('.hero-art').evaluate(image => image.src.startsWith('data:image/webp;base64,')), true);
      assert.equal(await page.locator('.reward-image').evaluate(image => image.src.startsWith('data:image/webp;base64,')), true);
      assert.deepEqual(requests, []);
    });
    if (output) await page.screenshot({path: path.join(output, 'desktop.png'), fullPage: true});
    await check('Five stage filters preserve curriculum order and include all core modules', async () => {
      const stages = [ ['setup', [22, 23]], ['foundations', [0, 1, 2, 3]], ['api', [4, 5, 6, 7, 8, 9, 10, 11, 12, 13]], ['connect', [14, 15, 16, 17]], ['build', [18, 19, 20, 21]] ];
      for (const [id, modules] of stages) {
        await page.locator(`[data-stage="${id}"]`).click();
        assert.equal(await page.locator(`[data-stage="${id}"]`).getAttribute('aria-pressed'), 'true');
        assert.equal(await page.locator('.journey-step[aria-pressed=true]').count(), 1);
        const actual = await page.locator('.module-card').evaluateAll(cards => cards.map(card => Academy.LESSONS[Number(card.dataset.lesson)].module));
        assert.deepEqual(actual, modules);
      }
      await page.locator('#show-all-modules').click();
      assert.equal(await page.locator('.module-card').count(), 25);
      assert.equal(await page.locator('#show-all-modules').isVisible(), false);
      assert.match(await page.locator('.module-card').last().innerText(), /OPTIONAL/);
      await page.locator('[data-stage=foundations]').focus();
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('.module-card').count(), 4);
    });
    await check('Module cards open lessons and four section buttons move focus to their content', async () => {
      await page.locator('.module-card[data-lesson="2"]').click();
      await page.waitForFunction(() => location.hash === '#learn/2' && document.querySelector('.lesson-route'));
      assert.equal(await page.locator('.lesson-route button').count(), 4);
      for (const id of ['code', 'visualize', 'practice', 'understand']) {
        await page.locator(`[data-lesson-section="${id}"]`).click();
        assert.equal(await page.evaluate(() => document.activeElement.id), `lesson-${id}`);
        const top = await page.locator(`#lesson-${id}`).evaluate(element => element.getBoundingClientRect().top);
        // Near the end of the page, the browser can reach its scroll limit.
        // The heading must remain visible beneath the sticky toolbar.
        assert.ok(top >= 74 && top < 500, `${id} heading is outside the reading area: ${top}px`);
      }
    });
    await check('Practice and completion save progress and recommend the next unfinished lesson', async () => {
      await nav('learn/44');
      const exercise = await page.evaluate(() => Academy.LESSONS[44].exercise);
      const root = page.locator('[data-exercise="lesson-44"]');
      if (exercise.kind === 'choice') await root.locator(`input[value="${exercise.answer}"]`).check();
      else if (exercise.kind === 'fill') await root.locator('[data-answer]').fill(exercise.answer);
      else await root.locator('.seq-list').evaluate(list => [...list.children].sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order)).forEach(item => list.append(item)));
      await root.locator('[data-ex-action=check]').click();
      assert.match(await root.locator('.ex-feedback').innerText(), /නිවැරදියි/);
      await page.locator('[data-complete="44"]').click();
      await page.locator('.lesson-success').waitFor();
      assert.equal(await page.locator('.lesson-success [data-lesson]').getAttribute('data-lesson'), '45');
      assert.equal(await page.evaluate(() => document.activeElement.className), 'lesson-success');
      await nav('home');
      assert.equal(await page.locator('.continue-card [data-lesson]').getAttribute('data-lesson'), '45');
      assert.match(await page.locator('[data-stage=setup]').innerText(), /1 \/ 4 lessons/);
      await page.reload();
      assert.equal(await page.locator('.continue-card [data-lesson]').getAttribute('data-lesson'), '45');
      assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('backend-academy-si-v1')).exercises['lesson-44'].passed), true);
    });
    await check('Light and dark themes keep navigation and the generated images available', async () => {
      await page.locator('#theme-toggle').click();
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
      if (output) await page.screenshot({path: path.join(output, 'dark.png'), fullPage: true});
      await nav('practice');
      assert.equal(await page.locator('.practice-banner img').evaluate(image => image.complete && image.naturalWidth > 0), true);
      await page.reload();
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
      await page.locator('#theme-toggle').click();
    });
    await check('Phone, tablet and desktop pages fit their viewport', async () => {
      for (const width of [320, 390, 560, 768, 1024, 1250, 1440]) {
        await page.setViewportSize({width, height: 900});
        for (const hash of ['home', 'setup', 'learn/0', 'learn/44', 'practice', 'progress']) {
          await nav(hash);
          const actual = await page.evaluate(() => document.documentElement.scrollWidth);
          assert.ok(actual <= width + 1, `${hash} overflows at ${width}px: ${actual}`);
        }
      }
      await page.setViewportSize({width: 390, height: 844});
      await nav('home');
      assert.equal(await page.locator('#sidebar').evaluate(element => element.inert), true);
      await page.locator('#menu-toggle').click();
      assert.equal(await page.locator('#sidebar').evaluate(element => element.inert), false);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#sidebar').evaluate(element => element.inert), true);
      if (output) {
        await page.screenshot({path: path.join(output, 'mobile.png'), fullPage: true});
        await nav('learn/44');
        await page.screenshot({path: path.join(output, 'lesson-mobile.png'), fullPage: true});
        await page.setViewportSize({width: 1440, height: 1000});
        await page.screenshot({path: path.join(output, 'lesson-desktop.png'), fullPage: true});
      }
    });
    await check('A copied standalone HTML file keeps its illustrations without the assets folder', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'academy-standalone-'));
      const copy = path.join(dir, 'index.html');
      fs.copyFileSync(path.resolve(__dirname, '../index.html'), copy);
      const isolated = await context.newPage();
      try {
        await context.setOffline(true);
        await isolated.goto(pathToFileURL(copy).href);
        await isolated.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
        assert.equal(await isolated.locator('.journey-step').count(), 5);
        assert.equal(await isolated.locator('.module-card').count(), 25);
      } finally {
        await isolated.close();
        fs.unlinkSync(copy);
        fs.rmdirSync(dir);
      }
    });
    assert.deepEqual(errors, []);
    assert.deepEqual(requests, []);
    console.log(JSON.stringify({passed: checks.length, checks, errors, externalRequests: requests.length}, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => {console.error(error); process.exitCode = 1;});
