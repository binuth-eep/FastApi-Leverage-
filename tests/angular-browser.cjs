// PLAYWRIGHT_MODULE=/path/to/playwright BROWSER_PATH=/path/to/chrome node tests/angular-browser.cjs
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const {pathToFileURL} = require('node:url');

(async () => {
  const browser = await chromium.launch({headless:true, ...(process.env.BROWSER_PATH?{executablePath:process.env.BROWSER_PATH}:{}), args:['--no-sandbox']});
  const context = await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',acceptDownloads:true});
  const page = await context.newPage();
  const errors=[],requests=[],checks=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('requestfailed',r=>errors.push(r.url()+': '+r.failure()?.errorText));
  page.on('request',r=>{if(/^https?:/.test(r.url())) requests.push(r.url());});
  const url=pathToFileURL(path.resolve(__dirname,'../angular.html')).href;
  const nav=async hash=>{await page.evaluate(hash=>{location.hash=hash;},hash);await page.waitForFunction(hash=>location.hash==='#'+hash && document.querySelector('main')?.children.length>0,hash);await page.waitForTimeout(30);};
  const check=async(name,run)=>{await run();checks.push(name);console.log('PASS '+name);};
  const screenshot=async name=>{if(process.env.SCREENSHOT_DIR){fs.mkdirSync(process.env.SCREENSHOT_DIR,{recursive:true});await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR,name+'.png'),fullPage:true});}};
  try {
    await context.setOffline(true);
    await page.goto(url);
    await check('Offline dashboard, stages and curriculum',async()=>{
      assert.equal(await page.locator('.module-card').count(),24);
      assert.equal(await page.locator('.stage-card').count(),6);
      await page.locator('[data-stage="2"]').click();assert.equal(await page.locator('.module-card').count(),6);
      assert.equal(await page.locator('[data-stage="2"]').getAttribute('aria-pressed'),'true');
      await page.locator('[data-stage="-1"]').click();assert.equal(await page.locator('.module-card').count(),24);
      await screenshot('angular-desktop');
    });
    await check('All 48 lessons, annotated code, flows and exercise solutions',async()=>{
      const content=await page.evaluate(()=>LESSONS.map(l=>({id:l.id,lines:l.lines.length,notes:l.notes.length,answer:l.exercise.answer,steps:l.steps.length})));
      assert.equal(content.length,48);
      for(const l of content){
        assert.equal(l.lines,l.notes);
        await nav('learn/'+l.id);
        assert.equal(await page.locator('.code-line').count(),l.lines);
        await page.locator('.code-line').last().click();
        assert.ok((await page.locator('.line-explain').textContent()).includes('LINE '+l.lines));
        await page.locator('[data-lesson-flow]').last().click();
        assert.ok((await page.locator('.flow-detail').textContent()).includes(String(l.steps)));
        await page.locator('input[value="'+l.answer+'"]').check();
        await page.locator('.exercise button[type=submit]').click();
        assert.equal(await page.locator('.feedback.correct').count(),1);
      }
      assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('angular-academy-si-v1')).passed.length),48);
      await screenshot('angular-lesson');
    });
    await check('Lesson section focus, explicit completion and persistence',async()=>{
      await nav('learn/0');await page.locator('[data-section="code"]').click();
      assert.equal(await page.evaluate(()=>document.activeElement.closest('section')?.id),'code');
      await page.locator('[data-complete]').click();
      assert.equal(await page.locator('#completed-count').textContent(),'1 / 48 lessons');
      assert.equal(await page.locator('#completion-next a').getAttribute('href'),'#learn/1');
      await page.reload();assert.equal(await page.locator('[data-complete]').getAttribute('aria-pressed'),'true');
      await page.locator('[data-complete]').click();assert.equal(await page.locator('#completed-count').textContent(),'0 / 48 lessons');
      await page.locator('[data-complete]').click();
    });
    await check('Lesson search and empty result',async()=>{
      await page.locator('#lesson-search').fill('signals');assert.ok(await page.locator('.lesson-link').count()>0);assert.ok(await page.locator('.lesson-link').count()<48);
      await page.locator('#lesson-search').fill('no-such-lesson');assert.equal(await page.locator('.lesson-link').count(),0);
      await page.locator('#lesson-search').fill('');assert.equal(await page.locator('.lesson-link').count(),48);
    });
    await check('12 guided setup steps in all three shell variants',async()=>{
      await nav('setup');
      for(const shell of ['unix','powershell','cmd']){
        await page.locator('#setup-shell').selectOption(shell);
        for(let i=0;i<12;i++){
          await page.locator('.terminal-nav [data-setup="'+i+'"]').click();
          await page.locator('[data-run-setup]').click();assert.ok(await page.locator('#setup-output').isVisible());
        }
      }
      assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('angular-academy-si-v1')).setup.length),12);
    });
    await check('Code explorer and the complete data flow',async()=>{
      await nav('explorer');await page.locator('#explorer-select').selectOption('30');
      assert.equal(await page.locator('[data-code-lesson]').getAttribute('data-code-lesson'),'30');
      await nav('flow');
      for(let i=0;i<6;i++){await page.locator('.flow [data-flow="'+i+'"]').click();assert.equal(await page.locator('.flow .active').getAttribute('aria-pressed'),'true');}
    });
    await check('Practice filtering, feedback and explanation do not alter completion',async()=>{
      await nav('practice');await page.locator('#practice-filter').selectOption('0');assert.equal(await page.locator('.exercise').count(),2);
      const first=page.locator('.exercise').first();await first.locator('input[value="0"]').check();await first.locator('button[type=submit]').click();
      assert.equal(await first.locator('.feedback.correct').count(),0);await first.locator('[data-reveal]').click();assert.ok((await first.locator('.feedback').textContent()).length>10);
      await page.locator('#practice-filter').selectOption('unfinished');assert.equal(await page.locator('.exercise').count(),0);
      assert.equal(await page.locator('#completed-count').textContent(),'1 / 48 lessons');
    });
    await check('Signals and safe text binding',async()=>{
      await nav('labs');await page.locator('#binding-name').fill('<img src=x onerror=alert(1)>');assert.ok((await page.locator('#binding-preview').textContent()).includes('<img'));
      assert.equal(await page.locator('#binding-preview img').count(),0);
      await page.locator('[data-count="1"]').click();assert.equal(await page.locator('#signal-double').textContent(),'2');await page.locator('[data-count="0"]').click();
    });
    await check('Form validation and normalized payload',async()=>{
      await page.locator('[data-lab="forms"]').click();await page.locator('#validation-form [name=name]').fill('   ');await page.locator('#validation-form [name=email]').fill('invalid');await page.locator('#validation-form button').click();
      assert.ok(!(await page.locator('#validation-result').textContent()).includes('VALID PAYLOAD'));
      await page.locator('#validation-form [name=name]').fill('  Amali  ');await page.locator('#validation-form [name=email]').fill('AMALI@EXAMPLE.COM');await page.locator('#validation-form button').click();
      assert.ok((await page.locator('#validation-result').textContent()).includes('amali@example.com'));
    });
    await check('CRUD create, search, edit, cancel, duplicate and confirmed delete',async()=>{
      await page.locator('[data-lab="crud"]').click();assert.equal(await page.locator('.record').count(),2);
      const form=page.locator('#student-form');
      await form.locator('[name=name]').fill('Kasun');await form.locator('[name=email]').fill('kasun@example.com');await form.locator('[type=submit]').click();assert.equal(await page.locator('.record').count(),3);
      await page.locator('#student-search').fill('KASUN');assert.equal(await page.locator('.record').count(),1);
      await page.locator('[data-edit="3"]').click();await form.locator('[name=name]').fill('Kasun Silva');await form.locator('[type=submit]').click();assert.ok((await page.locator('.record').textContent()).includes('Kasun Silva'));
      await page.locator('[data-edit="3"]').click();await form.locator('[name=name]').fill('Cancelled');await page.locator('[data-cancel-edit]').click();assert.ok(!(await page.locator('.record').textContent()).includes('Cancelled'));
      await form.locator('[name=name]').fill('Other');await form.locator('[name=email]').fill('KASUN@example.com');await form.locator('[type=submit]').click();assert.ok((await page.locator('#student-feedback').textContent()).includes('දැනටමත්'));
      page.once('dialog',d=>d.dismiss());await page.locator('[data-delete="3"]').click();assert.equal(await page.locator('.record').count(),1);
      page.once('dialog',d=>d.accept());await page.locator('[data-delete="3"]').click();assert.equal(await page.locator('.record').count(),0);
      await page.locator('#student-search').fill('');assert.equal(await page.locator('.record').count(),2);
    });
    await check('Routing parsing and invalid IDs',async()=>{
      await page.locator('[data-lab="routing"]').click();
      await page.locator('#route-form button').click();assert.ok((await page.locator('#route-result').textContent()).includes('"id": 12'));
      for(const route of ['/students/0','/students/1.5','/students/9007199254740992','//evil.example']){await page.locator('#route-value').fill(route);await page.locator('#route-form button').click();assert.ok((await page.locator('#route-result').textContent()).includes('404'));}
    });
    await check('HTTP scenarios and debugging guidance',async()=>{
      await page.locator('[data-lab="http"]').click();
      for(const scenario of ['success','empty','401','403','404','409','422','0','500']){await page.locator('[name=scenario]').selectOption(scenario);await page.locator('#http-form button').click();assert.ok((await page.locator('#http-result').textContent()).includes('finalize'));}
      await page.locator('[data-lab="debug"]').click();for(const key of ['imports','state','cors','route']){await page.locator('#debug-case').selectOption(key);await page.locator('[data-debug]').click();assert.ok((await page.locator('#debug-result').textContent()).length>20);}
    });
    await check('Project file browser, download contents and ZIP checksums',async()=>{
      await nav('project');assert.equal(await page.locator('[data-file]').count(),23);
      await page.locator('[data-file="src/app/student-api.ts"]').click();assert.ok((await page.locator('#file-content').textContent()).includes('export class StudentApi'));
      const downloadPromise=page.waitForEvent('download');await page.locator('[data-download-project]').click();const downloaded=await downloadPromise;
      const destination=path.join(os.tmpdir(),'angular-student-directory-test.zip');await downloaded.saveAs(destination);
      const bytes=fs.readFileSync(destination);assert.equal(bytes.readUInt32LE(0),0x04034b50);
      const project=await page.evaluate(()=>window.ANGULAR_PROJECT);let pos=0,count=0;
      while(bytes.readUInt32LE(pos)===0x04034b50){
        const size=bytes.readUInt32LE(pos+18),nameLength=bytes.readUInt16LE(pos+26),extra=bytes.readUInt16LE(pos+28),name=bytes.subarray(pos+30,pos+30+nameLength).toString();
        const data=bytes.subarray(pos+30+nameLength+extra,pos+30+nameLength+extra+size);
        assert.equal(data.toString(),project[name.replace('student-directory/','')]);
        let crc=0xffffffff;for(const byte of data){crc^=byte;for(let k=0;k<8;k++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}assert.equal((crc^0xffffffff)>>>0,bytes.readUInt32LE(pos+14));
        pos+=30+nameLength+extra+size;count++;
      }
      assert.equal(count,23);
      for(const [name,source] of Object.entries(project))assert.equal(source,fs.readFileSync(path.resolve(__dirname,'../examples/student-directory',name),'utf8'));
    });
    await check('Glossary search, viva expansion and progress overview',async()=>{
      await nav('glossary');assert.equal(await page.locator('.term').count(),38);await page.locator('#glossary-search').fill('zzzzz');assert.equal(await page.locator('.term').count(),0);await page.locator('#glossary-search').fill('signal');assert.ok(await page.locator('.term').count()>0);
      await nav('viva');assert.equal(await page.locator('.viva').count(),24);await page.locator('[data-viva=open]').click();assert.equal(await page.locator('.viva[open]').count(),24);await page.locator('[data-viva=close]').click();assert.equal(await page.locator('.viva[open]').count(),0);
      await nav('progress');assert.equal(await page.locator('.progress-item').count(),24);
    });
    await check('Theme persists across reload',async()=>{
      await page.locator('#theme-toggle').click();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');await screenshot('angular-dark');await page.locator('#theme-toggle').click();
    });
    await check('All pages fit phone, tablet and desktop viewports',async()=>{
      for(const width of [320,390,560,768,800,1024,1440]){
        await page.setViewportSize({width,height:900});
        for(const hash of ['home','setup','learn/0','learn/44','explorer','flow','labs','practice','project','glossary','viva','progress']){
          await nav(hash);const actual=await page.evaluate(()=>document.documentElement.scrollWidth);assert.ok(actual<=width+1,hash+' overflows at '+width+': '+actual);
        }
      }
    });
    await check('Mobile drawer traps focus, closes with Escape and opens lessons',async()=>{
      await page.setViewportSize({width:390,height:844});await nav('home');await screenshot('angular-mobile');
      assert.equal(await page.locator('#sidebar').evaluate(el=>el.inert),true);await page.locator('#menu-toggle').click();
      assert.equal(await page.locator('#sidebar').evaluate(el=>el.inert),false);assert.equal(await page.locator('.workspace').evaluate(el=>el.inert),true);
      await page.keyboard.press('Shift+Tab');assert.equal(await page.evaluate(()=>document.activeElement.closest('#sidebar')!==null),true);
      await page.keyboard.press('Escape');assert.equal(await page.locator('#sidebar').evaluate(el=>el.inert),true);assert.equal(await page.locator('#menu-toggle').evaluate(el=>el===document.activeElement),true);
      await page.locator('#menu-toggle').click();await page.locator('#lesson-search').fill('signals');await page.locator('.lesson-link').first().click();assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'false');await screenshot('angular-lesson-mobile');
    });
    await check('Catalog reads Angular progress independently from backend progress',async()=>{
      await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href+'#courses');
      assert.ok((await page.locator('.catalog-course.frontend .catalog-progress').textContent()).includes('1 / 48'));
      await page.goto(url+'#progress');
    });
    await check('Reset cancel preserves progress; confirmed reset preserves theme',async()=>{
      await page.setViewportSize({width:1440,height:1000});await page.locator('#theme-toggle').click();
      page.once('dialog',d=>d.dismiss());await page.locator('[data-reset]').click();assert.equal(await page.locator('#completed-count').textContent(),'1 / 48 lessons');
      page.once('dialog',d=>d.accept());await page.locator('[data-reset]').click();assert.equal(await page.locator('#completed-count').textContent(),'0 / 48 lessons');assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
    });
    await check('Invalid hashes, malformed saved state and storage failures recover',async()=>{
      await page.evaluate(()=>localStorage.setItem('angular-academy-si-v1',JSON.stringify({completed:[1,1,-1,48,'2'],passed:[0,0,99],last:999,theme:'invalid',attempts:{0:-3,1:'bad'},setup:[0,30]})));
      await page.reload();assert.equal(await page.locator('#completed-count').textContent(),'1 / 48 lessons');await nav('learn/constructor');assert.equal(await page.locator('h1').textContent(),'Browser එකේ සිට screen එකට');await nav('toString');assert.equal(await page.locator('.module-card').count(),24);
      await page.evaluate(()=>localStorage.setItem('angular-academy-si-v1','{broken'));await page.reload();assert.equal(await page.locator('#completed-count').textContent(),'0 / 48 lessons');
      const isolated=await browser.newContext();await isolated.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked');}});});const p=await isolated.newPage();await p.goto(url+'#learn/0');assert.equal(await p.locator('#storage-status').isVisible(),true);await p.locator('[data-complete]').click();assert.equal(await p.locator('#completed-count').textContent(),'1 / 48 lessons');await isolated.close();
    });
    assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);
    console.log(JSON.stringify({passed:checks.length,errors,externalRequests:requests.length},null,2));
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
