'use strict';
// Run with an installed Playwright: PLAYWRIGHT_MODULE=/absolute/path/to/playwright node checks/build-lab-browser.cjs
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(__dirname,'..');
const base=process.env.BASE_URL||pathToFileURL(root+'/').href;
const artifacts=process.env.SCREENSHOT_DIR||'/tmp/build-lab-browser';
fs.mkdirSync(artifacts,{recursive:true});
const url=(file,hash='')=>new URL(file,base).href+hash;

(async()=>{
  const browser=await chromium.launch({headless:true,...(process.env.BROWSER_PATH?{executablePath:process.env.BROWSER_PATH}:{})});
  const context=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true});
  const page=await context.newPage();const errors=[],external=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith(base))external.push(r.url());});
  async function go(hash){await page.goto(url('projects.html',hash));await page.locator('#main h1').waitFor();}
  async function noOverflow(label){assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,label+' overflows');}
  await go('#pos/overview');assert.equal(await page.locator('.path-card').count(),8);
  await page.screenshot({path:path.join(artifacts,'desktop.png'),fullPage:true});
  const curriculum=await page.evaluate(()=>Object.fromEntries(Object.entries(BUILD_CURRICULUM.projects).map(([id,p])=>[id,BUILD_CURRICULUM.lessons(p).map(l=>({title:l.title,notes:l.notes,answer:l.quiz.answer}))])));
  for(const [id,lessons]of Object.entries(curriculum)){
    assert.equal(lessons.length,28);
    for(let i=0;i<28;i++){
      await go(`#${id}/lesson/${i}`);
      assert.equal(await page.locator('.code-line').count(),lessons[i].notes.length);
      await page.locator('.code-line').last().click();
      assert.equal(await page.locator('#line-explanation span').textContent(),lessons[i].notes.at(-1));
      await page.locator(`input[name="answer"][value="${lessons[i].answer}"]`).check();
      await page.locator('#quiz button[type="submit"]').click();
      assert.equal(await page.locator('#complete').isDisabled(),true);
      await page.locator('#practical').check();await page.locator('#complete').click();
      assert.match(await page.locator('#completion-status').textContent(),/✓/);
      await noOverflow(`${id} lesson ${i}`);
    }
    assert.equal(await page.locator('#progress-text').textContent(),'100%');
    await go(`#${id}/files`);assert.ok(await page.locator('[data-file]').count()>=39);
    await page.locator('[data-file="frontend/src/app/project.ts"]').click();
    assert.match(await page.locator('#file-code').textContent(),new RegExp(id));
    const downloadEvent=page.waitForEvent('download');await page.locator('a[download$=".zip"]').click();
    const downloaded=await downloadEvent;await downloaded.saveAs(path.join(artifacts,downloaded.suggestedFilename()));
    await go(`#${id}/blueprint`);
    for(const name of ['architecture','data','process','deployment']){await page.locator(`[data-diagram="${name}"]`).click();assert.equal(await page.locator('.diagram-wrap svg').count(),1);}
    const svgEvent=page.waitForEvent('download');await page.locator('[data-download-svg]').click();const svg=await svgEvent;await svg.saveAs(path.join(artifacts,svg.suggestedFilename()));
    await go(`#${id}/release`);await page.locator('[data-release="0"]').check();await page.reload();assert.equal(await page.locator('[data-release="0"]').isChecked(),true);
  }
  console.log('✓ All 84 lessons: line explanations, quizzes, practical gates, progress; three source ZIPs and four diagram views.');
  await go('#pos/studio');
  for(let i=0;i<4;i++)await page.locator('[data-add="0"]').click();
  await page.locator('#checkout').click();assert.match(await page.locator('#studio-message').textContent(),/409/);assert.equal(await page.locator('#stock-0').textContent(),'3');
  await page.locator('[data-remove="0"]').click();await page.locator('#checkout').click();assert.match(await page.locator('#studio-message').textContent(),/SIMULATED/);assert.equal(await page.locator('#stock-0').textContent(),'0');
  await page.locator('#gap').fill('24');await page.locator('#radius').fill('20');
  assert.match(await page.locator('#studio-code').textContent(),/--gap: 24px/);
  await page.locator('#viewport').click();assert.equal(await page.locator('#shop-preview').evaluate(el=>el.classList.contains('phone')),true);
  await page.locator('#anatomy').click();assert.equal(await page.locator('.anatomy:visible').count(),2);
  await page.screenshot({path:path.join(artifacts,'studio.png'),fullPage:true});
  console.log('✓ UI controls, calculated totals, conflict rollback and explicit simulated receipts.');
  await go('#pos/lesson/6');await page.locator('#speed').selectOption('2000');await page.locator('#restart').click();await page.locator('#play').click();await page.waitForTimeout(2200);assert.equal(await page.locator('.code-line.selected').getAttribute('data-line'),'1');await page.locator('#play').click();await page.waitForTimeout(2200);assert.equal(await page.locator('.code-line.selected').getAttribute('data-line'),'1');
  await page.locator('[data-jump="check"]').click();assert.match(page.url(),/#pos\/lesson\/6$/);
  await page.locator('#theme').click();await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');await page.screenshot({path:path.join(artifacts,'lesson-dark.png'),fullPage:true});
  for(const width of [320,390,768,1024,1440]){
    await page.setViewportSize({width,height:900});
    for(const view of ['overview','lessons','blueprint','studio','files','release']){await go('#pos/'+view);await noOverflow(width+' '+view);}
  }
  await page.setViewportSize({width:390,height:844});await go('#pos/overview');
  await page.locator('#open-nav').click();assert.equal(await page.locator('#workspace').evaluate(el=>el.inert),true);await page.keyboard.press('Escape');assert.equal(await page.locator('#open-nav').getAttribute('aria-expanded'),'false');assert.equal(await page.locator('#open-nav').evaluate(el=>el===document.activeElement),true);
  await page.screenshot({path:path.join(artifacts,'mobile.png'),fullPage:true});
  console.log('✓ Replay play/pause, section navigation, saved theme, 320–1440px and keyboard drawer.');
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(url('index.html','#courses'));await page.locator('[data-course-filter="projects"]').click();assert.equal(await page.locator('.catalog-course').count(),3);assert.match(await page.locator('.catalog-course').first().textContent(),/100%/);
  for(const [file,hash]of [['angular.html','#learn/0'],['spring-boot.html','#learn/0'],['git.html','#learn/0'],['index.html','#learn/0']]){
    await page.goto(url(file,hash));await page.locator('.bridge-replay').first().waitFor();assert.equal(await page.locator('.build-course-entry').count(),1);const controls=page.locator('.bridge-replay').first();await controls.locator('select').selectOption('2000');await controls.locator('[data-bridge-action="restart"]').click();await controls.locator('[data-bridge-action="play"]').click();await page.waitForTimeout(2200);assert.equal(await page.locator('.code-panel').first().locator('.code-line').nth(1).getAttribute('aria-pressed'),'true');await controls.locator('[data-bridge-action="play"]').click();
  }
  console.log('✓ Catalog integration and working guided replay in all four original courses.');
  for(const malformed of ['{broken',JSON.stringify({project:'__proto__',theme:'unexpected',tracks:{pos:{completed:[-1,28,0,0,'1'],passed:[0],practical:[0],last:999}}})]){
    await page.goto(url('projects.html'));await page.evaluate(value=>localStorage.setItem('build-lab-si-v1',value),malformed);await page.reload();assert.ok(await page.locator('#main h1').count());
  }
  const blocked=await browser.newContext();await blocked.addInitScript(()=>{Object.defineProperty(Storage.prototype,'getItem',{value(){throw new Error('blocked');}});Object.defineProperty(Storage.prototype,'setItem',{value(){throw new Error('blocked');}});});const blockedPage=await blocked.newPage();await blockedPage.goto(url('projects.html','#pos/lesson/0'));assert.equal(await blockedPage.locator('#storage-notice').isVisible(),true);assert.equal(await blockedPage.locator('.code-line').count(),5);await blocked.close();
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  console.log('✓ Malformed/blocked storage recovery, no page errors and no external network requests.');
  await browser.close();
})().catch(error=>{console.error(error);process.exit(1);});
