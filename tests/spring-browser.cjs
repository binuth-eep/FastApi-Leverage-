// PLAYWRIGHT_MODULE=/path/to/playwright BROWSER_PATH=/path/to/chrome node tests/spring-browser.cjs
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
  const url=pathToFileURL(path.resolve(__dirname,'../spring-boot.html')).href;
  const nav=async hash=>{await page.evaluate(hash=>{location.hash=hash;},hash);await page.waitForFunction(hash=>location.hash==='#'+hash && document.querySelector('main')?.children.length>0,hash);await page.waitForTimeout(30);};
  const check=async(name,run)=>{await run();checks.push(name);console.log('PASS '+name);};
  const screenshot=async name=>{if(process.env.SCREENSHOT_DIR){fs.mkdirSync(process.env.SCREENSHOT_DIR,{recursive:true});await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR,name+'.png'),fullPage:true});}};
  try {
    await context.setOffline(true);
    await page.goto(url);
    await check('Offline dashboard, stages and curriculum',async()=>{
      assert.equal(await page.locator('.module-card').count(),24);
      assert.equal(await page.locator('.stage-card').count(),6);
      await page.locator('[data-stage="2"]').click();assert.equal(await page.locator('.module-card').count(),4);
      assert.equal(await page.locator('[data-stage="2"]').getAttribute('aria-pressed'),'true');
      await page.locator('[data-stage="-1"]').click();assert.equal(await page.locator('.module-card').count(),24);
      await screenshot('spring-desktop');
    });
    await check('All 48 lessons, annotated code, flows and exercise solutions',async()=>{
      const content=await page.evaluate(()=>window.SpringCourse.lessons.map(l=>({id:l.id,lines:l.lines.length,notes:l.notes.length,answer:l.exercise.answer,steps:l.steps.length})));
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
      assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('spring-academy-si-v1')).passed.length),48);
      await screenshot('spring-lesson');
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
      await page.locator('#lesson-search').fill('transaction');assert.ok(await page.locator('.lesson-link').count()>0);assert.ok(await page.locator('.lesson-link').count()<48);
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
      assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('spring-academy-si-v1')).setup.length),12);
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
    await check('Java integer division, negative operands, zero and String.equals',async()=>{
      await nav('labs');const form=page.locator('#java-lab-form');await form.locator('button').click();assert.ok((await page.locator('#java-result').textContent()).includes('Java int result: 2'));
      await form.locator('[name=a]').fill('-5');await form.locator('button').click();assert.ok((await page.locator('#java-result').textContent()).includes('Java int result: -2'));
      await form.locator('[name=b]').fill('0');await form.locator('button').click();assert.ok((await page.locator('#java-result').textContent()).includes('ArithmeticException'));
      await form.locator('[name=operation]').selectOption('equals');await form.locator('[name=a]').fill('<img src=x onerror=alert(1)>');await form.locator('[name=b]').fill('<img src=x onerror=alert(1)>');await form.locator('button').click();assert.ok((await page.locator('#java-result').textContent()).includes('true'));assert.equal(await page.locator('#java-result img').count(),0);
    });
    await check('Dependency injection selects either fake implementation without sending messages',async()=>{
      await page.locator('[data-lab=di]').click();for(const implementation of ['console','email']){await page.locator('[name=implementation]').selectOption(implementation);await page.locator('#di-lab-form button').click();assert.ok((await page.locator('#di-result').textContent()).includes(implementation==='console'?'ConsoleSender':'FakeEmailSender'));}
    });
    await check('REST model exercises create, read, update, duplicates, invalid requests and delete',async()=>{
      await page.locator('[data-lab=crud]').click();const form=page.locator('#api-lab-form');const send=async(method,path,body='')=>{await form.locator('[name=method]').selectOption(method);await form.locator('[name=path]').fill(path);await form.locator('[name=body]').fill(body);await form.locator('[type=submit]').click();return await page.locator('#api-result').textContent();};
      assert.ok((await send('GET','/api/students')).includes('SIMULATED HTTP 200'));
      assert.ok((await send('POST','/api/students','{"name":"  Kasun  ","email":" KASUN@EXAMPLE.COM "}')).includes('SIMULATED HTTP 201'));assert.equal(await page.locator('#api-records .record').count(),3);
      assert.ok((await send('POST','/api/students','{"name":"Other","email":"kasun@example.com"}')).includes('409'));
      assert.ok((await send('PATCH','/api/students/3','{"name":"Kasun Silva","email":"kasun@example.com"}')).includes('200'));
      assert.ok((await send('PATCH','/api/students/3','{"name":"Changed","email":"amali@example.com"}')).includes('409'));assert.ok((await page.locator('#api-records').textContent()).includes('Kasun Silva'));
      for(const body of ['{broken','{}','{"name":" ","email":"bad"}'])assert.ok((await send('POST','/api/students',body)).includes('400'));
      assert.ok((await send('GET','/api/students/0')).includes('400'));assert.ok((await send('GET','/api/students/9007199254740992')).includes('400'));
      assert.ok((await send('PUT','/api/students/3','{}')).includes('405'));assert.ok((await send('DELETE','/api/students/3')).includes('204'));assert.ok((await send('GET','/api/students/3')).includes('404'));
      await page.locator('[data-api-preset=invalid]').click();assert.equal(await form.locator('[name=method]').inputValue(),'POST');await page.locator('[data-reset-api]').click();assert.equal(await page.locator('#api-records .record').count(),2);
    });
    await check('Transaction demo commits both writes or rolls both back',async()=>{
      await page.locator('[data-lab=transactions]').click();await page.locator('#transaction-lab-form button').click();assert.ok((await page.locator('#transaction-result').textContent()).includes('A=80, B=40'));await page.locator('[name=failure]').check();await page.locator('#transaction-lab-form button').click();assert.ok((await page.locator('#transaction-result').textContent()).includes('ROLLBACK'));assert.ok((await page.locator('#transaction-result').textContent()).includes('A=100, B=20'));
    });
    await check('Security model distinguishes identity, permissions and CSRF',async()=>{
      await page.locator('[data-lab=security]').click();const form=page.locator('#security-lab-form');await form.locator('button').click();assert.ok((await page.locator('#security-result').textContent()).startsWith('200'));await form.locator('[name=identity]').selectOption('missing');await form.locator('button').click();assert.ok((await page.locator('#security-result').textContent()).startsWith('401'));await form.locator('[name=identity]').selectOption('valid');await form.locator('[name=permission]').selectOption('denied');await form.locator('button').click();assert.ok((await page.locator('#security-result').textContent()).startsWith('403'));await form.locator('[name=permission]').selectOption('allowed');await form.locator('[name=csrf]').selectOption('missing');await form.locator('button').click();assert.ok((await page.locator('#security-result').textContent()).includes('CSRF'));
    });
    await check('Debug clinic explains all six failure cases',async()=>{
      await page.locator('[data-lab=debug]').click();for(const scenario of ['port','bean','validation','database','lazy','duplicate']){await page.locator('#debug-lab-form [name=scenario]').selectOption(scenario);await page.locator('#debug-lab-form button').click();assert.ok((await page.locator('#debug-result').textContent()).length>40);}
    });
    await check('Project file browser, download contents and ZIP checksums',async()=>{
      await nav('project');assert.equal(await page.locator('[data-file]').count(),20);
      await page.locator('[data-file="src/main/java/com/academy/studentapi/student/StudentService.java"]').click();assert.ok((await page.locator('#file-content').textContent()).includes('public class StudentService'));
      const downloadPromise=page.waitForEvent('download');await page.locator('[data-download-project]').click();const downloaded=await downloadPromise;
      const destination=path.join(os.tmpdir(),'spring-student-api-test.zip');await downloaded.saveAs(destination);
      const bytes=fs.readFileSync(destination);assert.equal(bytes.readUInt32LE(0),0x04034b50);
      const project=await page.evaluate(()=>window.SPRING_PROJECT);let pos=0,count=0;
      while(bytes.readUInt32LE(pos)===0x04034b50){
        const size=bytes.readUInt32LE(pos+18),nameLength=bytes.readUInt16LE(pos+26),extra=bytes.readUInt16LE(pos+28),name=bytes.subarray(pos+30,pos+30+nameLength).toString();
        const data=bytes.subarray(pos+30+nameLength+extra,pos+30+nameLength+extra+size);
        assert.equal(data.toString(),project[name.replace('student-api/','')]);
        let crc=0xffffffff;for(const byte of data){crc^=byte;for(let k=0;k<8;k++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}assert.equal((crc^0xffffffff)>>>0,bytes.readUInt32LE(pos+14));
        pos+=30+nameLength+extra+size;count++;
      }
      assert.equal(count,20);
      for(const [name,source] of Object.entries(project))assert.equal(source,fs.readFileSync(path.resolve(__dirname,'../examples/spring-student-api',name),'utf8'));
    });
    await check('Glossary search, viva expansion and progress overview',async()=>{
      await nav('glossary');assert.equal(await page.locator('.term').count(),40);await page.locator('#glossary-search').fill('zzzzz');assert.equal(await page.locator('.term').count(),0);await page.locator('#glossary-search').fill('transaction');assert.ok(await page.locator('.term').count()>0);
      await nav('viva');assert.equal(await page.locator('.viva').count(),24);await page.locator('[data-viva=open]').click();assert.equal(await page.locator('.viva[open]').count(),24);await page.locator('[data-viva=close]').click();assert.equal(await page.locator('.viva[open]').count(),0);
      await nav('progress');assert.equal(await page.locator('.progress-item').count(),24);
    });
    await check('Theme persists across reload',async()=>{
      await page.locator('#theme-toggle').click();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');await screenshot('spring-dark');await page.locator('#theme-toggle').click();
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
      await page.setViewportSize({width:390,height:844});await nav('home');await screenshot('spring-mobile');
      assert.equal(await page.locator('#sidebar').evaluate(el=>el.inert),true);await page.locator('#menu-toggle').click();
      assert.equal(await page.locator('#sidebar').evaluate(el=>el.inert),false);assert.equal(await page.locator('.workspace').evaluate(el=>el.inert),true);
      await page.keyboard.press('Shift+Tab');assert.equal(await page.evaluate(()=>document.activeElement.closest('#sidebar')!==null),true);
      await page.keyboard.press('Escape');assert.equal(await page.locator('#sidebar').evaluate(el=>el.inert),true);assert.equal(await page.locator('#menu-toggle').evaluate(el=>el===document.activeElement),true);
      await page.locator('#menu-toggle').click();await page.locator('#lesson-search').fill('transaction');await page.locator('.lesson-link').first().click();assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'false');await screenshot('spring-lesson-mobile');
    });
    await check('Catalog reads Spring progress independently from backend progress',async()=>{
      await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href+'#courses');
      assert.ok((await page.locator('.catalog-course.spring .catalog-progress').textContent()).includes('1 / 48'));
      await page.goto(url+'#progress');
    });
    await check('Reset cancel preserves progress; confirmed reset preserves theme',async()=>{
      await page.setViewportSize({width:1440,height:1000});await page.locator('#theme-toggle').click();
      page.once('dialog',d=>d.dismiss());await page.locator('[data-reset]').click();assert.equal(await page.locator('#completed-count').textContent(),'1 / 48 lessons');
      page.once('dialog',d=>d.accept());await page.locator('[data-reset]').click();assert.equal(await page.locator('#completed-count').textContent(),'0 / 48 lessons');assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
    });
    await check('Invalid hashes, malformed saved state and storage failures recover',async()=>{
      await page.evaluate(()=>localStorage.setItem('spring-academy-si-v1',JSON.stringify({completed:[1,1,-1,48,'2'],passed:[0,0,99],last:999,theme:'invalid',attempts:{0:-3,1:'bad'},setup:[0,30]})));
      await page.reload();assert.equal(await page.locator('#completed-count').textContent(),'1 / 48 lessons');await nav('learn/constructor');assert.equal(await page.locator('h1').textContent(),'Browser එකට පිටුපසින්');await nav('toString');assert.equal(await page.locator('.module-card').count(),24);
      await page.evaluate(()=>localStorage.setItem('spring-academy-si-v1','{broken'));await page.reload();assert.equal(await page.locator('#completed-count').textContent(),'0 / 48 lessons');
      const isolated=await browser.newContext();await isolated.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked');}});});const p=await isolated.newPage();await p.goto(url+'#learn/0');assert.equal(await p.locator('#storage-status').isVisible(),true);await p.locator('[data-complete]').click();assert.equal(await p.locator('#completed-count').textContent(),'1 / 48 lessons');await isolated.close();
    });
    assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);
    console.log(JSON.stringify({passed:checks.length,errors,externalRequests:requests.length},null,2));
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
