/* Offline course UI. Lesson snippets are text; no user code is evaluated. */
'use strict';
(() => {
  const {modules:MODULES,lessons:LESSONS,stages:STAGES}=window.SpringCourse;
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const KEY = 'spring-academy-si-v1';
  const NAV = [
    ['home','⌂','Learning dashboard'], ['setup','⌘','Start here · Setup'],
    ['explorer','⌥','Code explorer'], ['flow','⇢','Data flow'],
    ['labs','⚗','Java & Spring labs'], ['practice','✎','Practice'],
    ['project','▧','Student API project'], ['glossary','Aa','Glossary'],
    ['viva','◌','Viva · කියලා බලමු'], ['progress','◴','My progress']
  ];
  let storageOK = true;
  const fresh = () => ({completed:[], passed:[], attempts:{}, setup:[], last:0, theme:'light'});
  const ids = (value, max) => Array.isArray(value) ? [...new Set(value.filter(n => Number.isInteger(n) && n >= 0 && n < max))] : [];
  let state = fresh();
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (raw && typeof raw === 'object') {
      state.completed = ids(raw.completed, LESSONS.length);
      state.passed = ids(raw.passed, LESSONS.length);
      state.setup = ids(raw.setup, 12);
      if (Number.isInteger(raw.last) && LESSONS[raw.last]) state.last = raw.last;
      if (raw.theme === 'dark') state.theme = 'dark';
      if (raw.attempts && typeof raw.attempts === 'object') {
        LESSONS.forEach(l => {
          const n = raw.attempts[l.id];
          if (Number.isSafeInteger(n) && n >= 0) state.attempts[l.id] = n;
        });
      }
    }
  } catch { storageOK = false; }
  let page = 'home', currentLesson = state.last, stage = -1, setupStep = 0, shell = 'unix';
  let selectedFile = 'README.md', lab = 'java', flowIndex = 0, toastTimer;
  const percent = () => Math.round(state.completed.length / LESSONS.length * 100);
  const resume = () => !state.completed.includes(state.last) ? state.last :
    (LESSONS.slice(state.last + 1).find(l => !state.completed.includes(l.id)) || LESSONS.find(l => !state.completed.includes(l.id)))?.id ?? state.last;
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); storageOK = true; }
    catch { storageOK = false; }
    $('#storage-status').hidden = storageOK;
    $('#storage-status').textContent = 'Browser storage ලබාගත නොහැක. මේ session එකේ වැඩ කළ හැකියි; reload කළ විට අලුත් ප්‍රගතිය නැති විය හැක.';
  }
  function toast(message) {
    $('#toast').textContent = message;
    $('#toast').classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 3000);
  }
  function applyTheme() {
    document.documentElement.dataset.theme = state.theme;
    $('#theme-toggle').setAttribute('aria-label', state.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  function sidebar() {
    $('#side-nav').innerHTML = NAV.map(([id,icon,title]) => `<a href="#${id}" ${page===id?'class="active" aria-current="page"':''}><span aria-hidden="true">${icon}</span>${title}</a>`).join('');
    syllabus();
    $('#progress-percent').textContent = percent() + '%';
    $('#completed-count').textContent = `${state.completed.length} / ${LESSONS.length} lessons`;
    $('#side-progress').setAttribute('aria-valuenow', percent());
    $('#side-progress > span').style.width = percent() + '%';
  }
  function syllabus() {
    const query = $('#lesson-search').value.trim().toLowerCase();
    const opened = [...document.querySelectorAll('.module[open]')].map(el => Number(el.dataset.module));
    $('#syllabus').innerHTML = MODULES.map(m => {
      const lessons = m.lessons.filter(l => `${m.name} ${m.si} ${l.title} ${l.goal}`.toLowerCase().includes(query));
      if (!lessons.length) return '';
      return `<details class="module" data-module="${m.id}" ${query || opened.includes(m.id) || (page==='learn' && m.id===LESSONS[currentLesson].module)?'open':''}><summary><span>${String(m.id+1).padStart(2,'0')}</span>${esc(m.name)}</summary>${lessons.map(l => `<a href="#learn/${l.id}" class="lesson-link ${state.completed.includes(l.id)?'done':''} ${page==='learn'&&l.id===currentLesson?'active':''}" ${page==='learn'&&l.id===currentLesson?'aria-current="page"':''}>${esc(l.title)}</a>`).join('')}</details>`;
    }).join('') || '<p class="empty" role="status">ගැළපෙන පාඩමක් නැහැ.</p>';
  }
  const heading = (tag,title,description) => `<header class="page-head"><span class="eyebrow">${tag}</span><h1>${title}</h1><p>${description}</p></header>`;
  const stats = () => `<div class="stats">${[['▧',24,'Modules'],['≡',48,'Sinhala lessons'],['✓',state.completed.length,'Lessons complete'],['✎',state.passed.length + '/48','Practice passed']].map(([icon,value,label]) => `<div class="card stat"><span aria-hidden="true">${icon}</span><div><b>${value}</b><small>${label}</small></div></div>`).join('')}</div>`;
  function moduleCards() {
    return MODULES.filter(m => stage < 0 || STAGES[stage].modules.includes(m.id)).map(m => {
      const done = m.lessons.filter(l => state.completed.includes(l.id)).length;
      const next = m.lessons.find(l => !state.completed.includes(l.id)) || m.lessons[0];
      return `<a class="card module-card" href="#learn/${next.id}"><span>${String(m.id+1).padStart(2,'0')}</span><div><b>${esc(m.name)}</b><small>${esc(m.si)}</small><div class="module-status">${done}/2 complete · ${done===2?'✓ Completed':'Open module →'}</div></div></a>`;
    }).join('');
  }
  function home() {
    const next=LESSONS[resume()];
    return `<div class="welcome"><span class="eyebrow">YOUR JAVA & SPRING WORKSPACE</span><h2>කුඩා සංකල්පයකින්, වැඩ කරන backend එකකට.</h2><p>Java තේරුම් ගන්න. Spring එකෙන් හදන්න. ඔබම කරලා බලන්න.</p></div><section class="hero spring-hero"><div><span class="eyebrow">FROM YOUR FIRST CLASS TO YOUR FIRST API</span><h1>පදනම Java.<br><em>ඊළඟ පියවර Spring.</em></h1><p>Variables සහ objects සිට REST APIs, JPA සහ transactions දක්වා. Code එක කියවලා, flow එක තේරුම් අරගෙන, Angular එකට සම්බන්ධ වන Student API එකක් හදමු.</p><div class="row"><a class="btn primary" href="#learn/${resume()}">${state.completed.length?'දිගටම ඉගෙන ගන්න':'පළමු පාඩම අරඹන්න'} →</a><a class="btn ghost" href="#setup">Setup guide ↗</a></div></div><div class="spring-diagram" aria-hidden="true"><div class="window-bar"><span class="window-dots">● ● ●</span>localhost:8080 / api / students</div><div class="spring-layers"><div class="spring-layer">Controller <span>HTTP → DTO</span></div><div class="spring-layer">Service <span>RULES → TRANSACTION</span></div><div class="spring-layer">Repository <span>JPA → ENTITY</span></div><div class="spring-layer">Database <span>COMMIT ✓</span></div></div><span class="badge">CLEAR LAYERS. A WORKING API.</span></div></section>${stats()}<section class="card continue section"><span class="badge">NEXT UP</span><div><h3>${esc(next.title)}</h3><p>Module ${next.module+1} · ${esc(MODULES[next.module].name)}</p></div><a class="btn" href="#learn/${next.id}">පාඩම බලන්න →</a></section><section class="section"><div class="section-head"><h2>ඔබේ learning path එක</h2><button class="btn tiny" data-stage="-1" aria-pressed="${stage<0}">Show all</button></div><div class="stage-grid">${STAGES.map((s,i)=>`<button class="stage-card" data-stage="${i}" aria-pressed="${stage===i}"><span>0${i+1} / ${s.modules.length} MODULES</span><b>${s.name}</b><small>${s.en} · ${s.detail}</small></button>`).join('')}</div></section><section class="section"><div class="section-head"><h2>පාඩම් මාලාව</h2><span class="muted small" id="module-count">${stage<0?MODULES.length:STAGES[stage].modules.length} modules</span></div><div class="module-grid" id="module-grid">${moduleCards()}</div></section><div class="note section">පාඩම් සහ browser labs offline වැඩ කරනවා. <a href="#project">Project tab</a> එකෙන් complete Spring Boot Student API එක download කරන්න. සැබෑ Java server එක run කිරීමට JDK, Maven සහ මුල් dependency install එකට internet අවශ්‍යයි.</div>`;
  }
  function codePanel(l, key='lesson') {
    return `<div class="code-panel" data-code-lesson="${l.id}"><div class="code-toolbar"><span>${esc(l.file)} · click a line</span><button class="btn tiny" data-copy-lesson="${l.id}">Copy code</button></div><div class="code-lines" aria-label="${esc(l.file)}">${l.lines.map((line,i)=>`<button class="code-line ${i===0?'selected':''}" data-code-line="${i}" aria-pressed="${i===0}"><span class="line-num">${i+1}</span><code>${esc(line)||' '}</code></button>`).join('')}</div><div class="line-explain" role="status"><b>LINE 1</b>${esc(l.notes[0])}</div></div>`;
  }
  function exercise(l) {
    const q = l.exercise;
    return `<form class="exercise card" data-exercise="${l.id}"><fieldset><legend>${esc(q.question)}</legend>${q.options.map((option,i)=>`<label class="option"><input type="radio" name="answer-${l.id}" value="${i}" required><span>${esc(option)}</span></label>`).join('')}</fieldset><div class="row exercise-actions"><button class="btn primary" type="submit">පිළිතුර බලන්න</button><button class="btn" type="button" data-reveal="${l.id}">Explanation</button><small class="muted exercise-status">${state.passed.includes(l.id)?'✓ Passed':`${state.attempts[l.id]||0} attempts`}</small></div><div class="feedback" role="status" hidden></div></form>`;
  }
  function lesson() {
    const l = LESSONS[currentLesson], m = MODULES[l.module];
    return `<header class="lesson-head"><div class="row between lesson-meta"><span>MODULE ${String(m.id+1).padStart(2,'0')} / ${esc(m.name)}</span><span>LESSON ${l.id+1} OF 48</span></div><h1>${esc(l.title)}</h1><p>${esc(l.goal)}</p></header>
      <nav class="lesson-route" aria-label="Lesson sections">${[['understand','Understand'],['code','Read the code'],['flow','Follow the flow'],['try','Try it yourself']].map(([id,label],i)=>`<button data-section="${id}"><span>${i+1}</span>${label}</button>`).join('')}</nav>
      <section class="lesson-section" id="understand"><h2 tabindex="-1">01 · තේරුම් ගනිමු</h2><div class="card">${l.topics.map(([title,body])=>`<article class="topic"><h3>${esc(title)}</h3><p>${esc(body)}</p></article>`).join('')}</div></section>
      <section class="lesson-section" id="code"><h2 tabindex="-1">02 · Code එක කියවමු</h2>${codePanel(l)}</section>
      <section class="lesson-section" id="flow"><h2 tabindex="-1">03 · පියවරෙන් පියවර</h2><div class="card"><div class="flow">${l.steps.map((step,i)=>`<button data-lesson-flow="${i}" class="${i===0?'active':''}" aria-pressed="${i===0}"><span>0${i+1} ${i<l.steps.length-1?'→':'✓'}</span>${esc(step)}</button>`).join('')}</div><p class="flow-detail" role="status">පියවර 1: ${esc(l.steps[0])}</p></div><aside class="note section"><b>නිතර වෙන වැරැද්ද</b><p>${esc(l.mistake)}</p></aside></section>
      <section class="lesson-section" id="try"><h2 tabindex="-1">04 · ඔබම කරලා බලන්න</h2>${exercise(l)}</section>
      <div class="lesson-bottom"><div class="row">${l.id>0?`<a class="btn" href="#learn/${l.id-1}">← කලින් පාඩම</a>`:'<span></span>'}<button class="btn primary" data-complete="${l.id}" aria-pressed="${state.completed.includes(l.id)}">${state.completed.includes(l.id)?'✓ Completed · Undo':'පාඩම සම්පූර්ණයි ✓'}</button>${l.id<47?`<a class="btn" href="#learn/${l.id+1}">ඊළඟ පාඩම →</a>`:'<a class="btn" href="#progress">My progress →</a>'}</div><div id="completion-next" role="status">${state.completed.includes(l.id)?completionMessage(l):''}</div></div><p class="source">තව කියවන්න: <a href="${esc(m.ref)}" target="_blank" rel="noopener noreferrer">Official documentation ↗</a></p>`;
  }
  function completionMessage(l) {
    return `<div class="success">✓ මේ පාඩම සම්පූර්ණයි. ${state.completed.length===48?'පාඩම් 48ම අවසන්! <a href="#project">Project එක හදමු →</a>':`<a href="#learn/${resume()}">ඊළඟ පියවර: ${esc(LESSONS[resume()].title)} →</a>`}</div>`;
  }
  const SETUP=window.SpringCourse.setup;
  function setup() {
    const [title,commands,output,cwd,fix] = SETUP[setupStep];
    const command = typeof commands === 'string' ? commands : commands[shell];
    return heading('START HERE · GUIDED SETUP','පළමු app එකට පාර හදාගමු.','Commands එක බැගින් කියවලා, ඔබේ terminal එකේ run කරලා බලන්න. මෙහි Run demo button එකෙන් example output එකක් පමණක් පෙන්වනවා.') +
      `<div class="row between"><label class="field">ඔබේ shell එක<select id="setup-shell">${[['unix','macOS / Linux'],['powershell','Windows PowerShell'],['cmd','Windows CMD']].map(([id,name])=>`<option value="${id}" ${shell===id?'selected':''}>${name}</option>`).join('')}</select></label><span class="badge" id="setup-reviewed">${state.setup.length} / ${SETUP.length} steps reviewed</span></div><div class="terminal-grid"><nav class="terminal-nav" aria-label="Setup steps">${SETUP.map(([name],i)=>`<button data-setup="${i}" class="${setupStep===i?'active':''} ${state.setup.includes(i)?'passed':''}" ${setupStep===i?'aria-current="step"':''}>${String(i+1).padStart(2,'0')} · ${esc(name)}</button>`).join('')}</nav><section class="card"><span class="eyebrow">STEP ${setupStep+1} / ${SETUP.length}</span><h2>${esc(title)}</h2><p class="muted small">Location: ${esc(cwd)}</p><pre class="terminal-command" id="setup-command">${esc(command)}</pre><div class="row"><button class="btn" data-copy-setup>Copy</button><button class="btn primary" data-run-setup>Run demo →</button></div><pre class="output" id="setup-output" role="status" hidden></pre><details class="trouble"><summary>වැඩ කරන්නේ නැත්නම්?</summary><p>${esc(fix)}</p></details><div class="row between"><button class="btn tiny" data-setup="${setupStep-1}" ${setupStep===0?'disabled':''}>← Previous</button><button class="btn tiny" data-setup="${setupStep+1}" ${setupStep===11?'disabled':''}>Next step →</button></div></section></div><div class="note section">Java 17 · Spring Boot 4.1.2: <a href="https://docs.spring.io/spring-boot/system-requirements.html" target="_blank" rel="noopener noreferrer">official version table</a>. Setup review සහ lesson completion වෙන වෙනම සුරැකේ. සැබෑ commands run කළ බව මේ demo එකෙන් තහවුරු කරන්නේ නැහැ.</div>`;
  }
  const lessonSelect = id => `<label class="field">උදාහරණය තෝරන්න<select id="${id}">${MODULES.map(m=>`<optgroup label="${esc(m.name)}">${m.lessons.map(l=>`<option value="${l.id}" ${l.id===currentLesson?'selected':''}>${l.id+1}. ${esc(l.title)}</option>`).join('')}</optgroup>`).join('')}</select></label>`;
  function explorer() {
    return heading('READ · UNDERSTAND · CONNECT','Code එකේ හැම පේළියක්ම.','පේළියක් තෝරලා ඒක කරන වැඩේ සිංහලෙන් කියවන්න. උදාහරණ text ලෙස පෙන්වනවා; browser එකෙන් Java compile හෝ execute කරන්නේ නැහැ. සමහර snippets method/class fragments; complete source එක Project tab එකේ තියෙනවා.') + lessonSelect('explorer-select') + `<div class="section">${codePanel(LESSONS[currentLesson])}</div><p class="source"><a href="#learn/${currentLesson}">සම්පූර්ණ පාඩම බලන්න →</a></p>`;
  }
  const FLOW=[
    ['Security & routing','HTTP → trusted entry point','Configured security filters identity/permission බලනවා. Spring MVC URL/method අනුව controller තෝරනවා.'],
    ['Bind & validate','JSON → StudentInput','JSON parse, normalize සහ Jakarta constraints apply කරනවා. Invalid නම් 400 දී write එක නවත්වනවා.'],
    ['Business use case','Controller → service','Service missing/duplicate rules බලලා write transaction boundary එක පාලනය කරනවා.'],
    ['Persist & flush','Repository → database','JPA entity changes SQL ලෙස synchronize කරනවා. Unique constraints concurrent duplicates වලටත් බලපානවා.'],
    ['Complete transaction','Commit / rollback','Successful transaction completion එකේ commit attempt වෙනවා. Applicable failure එකකදී rollback වෙනවා. Flush සහ commit එකම දෙයක් නෙවෙයි.'],
    ['Public response','DTO → JSON → Angular','Canonical id/name/email DTO එක public response වෙනවා. Angular source state update කර visible screen නැවත render කරනවා.']
  ];
  function flow(){return heading('THE COMPLETE REQUEST JOURNEY','Request එකේ සිට committed row එකට.','පියවරක් තෝරලා data එකත් වගකීමත් මාරු වන boundary එක තේරුම් ගන්න.')+`<section class="card"><div class="flow">${FLOW.map(([title],i)=>`<button data-flow="${i}" class="${i===flowIndex?'active':''}" aria-pressed="${i===flowIndex}"><span>0${i+1} →</span>${title}</button>`).join('')}</div><div class="flow-detail" role="status"><b>${FLOW[flowIndex][1]}</b><p>${FLOW[flowIndex][2]}</p></div><div class="row section"><button class="btn" data-flow="${(flowIndex+5)%6}">← Previous</button><button class="btn primary" data-flow="${(flowIndex+1)%6}">Next step →</button></div></section><section class="grid2 section"><div class="card"><h2>Success path</h2><pre class="output">POST /api/students\n→ validate → service\n→ JPA → flush → commit\n→ 201 + Location + Student</pre></div><div class="card"><h2>Failure path</h2><pre class="output">400 → invalid input / JSON / ID\n404 → valid ID, missing record\n409 → duplicate / integrity conflict\n500 → unexpected internal failure</pre></div></section><div class="note section">Security flow එක අවශ්‍ය trusted boundary එකක් ලෙස මෙහි පෙන්වනවා. Download learning project එක localhost CRUD සඳහායි; එහි authentication implementation එකක් නැහැ.</div>`;}
  function practice() {
    return heading('SMALL STEPS · STRONGER UNDERSTANDING','කියවපු දේ කරලා බලමු.','හැම පාඩමකටම practice ප්‍රශ්නයක්. නිවැරදි පිළිතුර check කළ විට practice progress save වෙනවා.') + `<div class="row between"><label class="field">Module<select id="practice-filter"><option value="all">All modules · 48 questions</option><option value="unfinished">Unfinished practice</option>${MODULES.map(m=>`<option value="${m.id}">${m.id+1}. ${esc(m.name)}</option>`).join('')}</select></label><span class="badge" id="practice-count">${state.passed.length} / 48 passed</span></div><div id="practice-list" class="practice-list section">${practiceCards(LESSONS)}</div>`;
  }
  function practiceCards(lessons) {
    return lessons.map(l=>`<section class="practice-question"><div class="row between"><h3>${l.id+1}. ${esc(l.title)}</h3><a class="small" href="#learn/${l.id}">Review lesson ↗</a></div>${exercise(l)}</section>`).join('') || '<p class="empty">✓ මෙහි practice සියල්ල අවසන්.</p>';
  }
  function project(){
    const files=window.SPRING_PROJECT;
    return heading('YOUR FIRST COMPLETE JAVA BACKEND','ඔබේ Student API එක.','Spring MVC, Jakarta Validation, JPA, H2 සහ tested CRUD එකට සම්බන්ධ කළ complete local learning project එක.')+`<div class="row"><button class="btn primary" data-download-project>Download project ZIP ↓</button><button class="btn" data-download-file>Download selected file ↓</button><span class="badge">${Object.keys(files).length} FILES · JAVA 17 · BOOT 4.1.2</span></div><div class="note section">ZIP extract කර pom.xml ඇති root එකේ <code>mvn test</code>, පසුව <code>mvn spring-boot:run</code> run කරන්න. Local API: <code>http://localhost:8080</code>. Default H2 memory data app stop කළොත් නැති වෙනවා. README එකේ Angular connection සහ deployment boundaries කියවන්න.</div><div class="file-layout section"><nav class="file-list" aria-label="Project files">${Object.keys(files).map(path=>`<button data-file="${esc(path)}" class="${path===selectedFile?'active':''}" aria-pressed="${path===selectedFile}">${esc(path)}</button>`).join('')}</nav><div class="code-panel"><div class="code-toolbar"><span id="file-name">${esc(selectedFile)}</span><button class="btn tiny" data-copy-file>Copy file</button></div><pre class="code-static" id="file-content">${esc(files[selectedFile])}</pre></div></div>`;
  }
  const TERMS=window.SpringCourse.terms;
  const termCards = query => TERMS.filter(t=>t.join(' ').toLowerCase().includes(query.toLowerCase())).map(([word,meaning])=>`<article class="card term"><h3>${esc(word)}</h3><p>${esc(meaning)}</p></article>`).join('') || '<p class="empty" role="status">ගැළපෙන term එකක් නැහැ.</p>';
  function glossary() {
    return heading('YOUR JAVA & SPRING DICTIONARY','වචනයෙන් අදහසට.','Java, Spring සහ backend වල නිතර හමුවෙන වචන සිංහලෙන්.') + `<label class="field">Search ${TERMS.length} terms<input type="search" id="glossary-search" placeholder="Bean, transaction, JPA…"></label><div class="glossary-grid section" id="glossary-list">${termCards('')}</div>`;
  }
  function viva() {
    return heading('EXPLAIN IT IN YOUR OWN WORDS','තේරුම් ගත්ත දේ කියලා බලමු.','පළමුව ඔබේ වචනවලින් පිළිතුරු දෙන්න. පසුව explanation එක විවෘත කර සසඳන්න.') + `<div class="row"><button class="btn" data-viva="open">Open all</button><button class="btn" data-viva="close">Close all</button></div>` + MODULES.map(m=>{
      const l=m.lessons[1],q=l.exercise;
      return `<details class="card viva"><summary>${m.id+1}. ${esc(q.question)} · ඇයි?</summary><p><b>${esc(q.options[q.answer])}</b> — ${esc(q.why)}</p><p>${esc(l.goal)}</p><a class="small" href="#learn/${l.id}">Review ${esc(m.name)} →</a></details>`;
    }).join('');
  }
  function progress() {
    return heading('YOUR LEARNING JOURNEY','ඔබේ උත්සාහය මෙතැන තියෙනවා.','Lesson completion සහ practice progress මේ browser එකේ සුරැකෙනවා. Course catalog එකේ Spring progress එකත් මෙයින් update වෙනවා.') + stats() +
      `<section class="card section"><div class="row between"><h2>සමස්ත ප්‍රගතිය</h2><b>${percent()}%</b></div><div class="progressbar" role="progressbar" aria-label="Course completion" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent()}"><span style="width:${percent()}%"></span></div><p class="muted small">${state.completed.length} lessons complete · ${state.passed.length} exercises passed · ${Object.values(state.attempts).reduce((a,b)=>a+b,0)} attempts · ${state.setup.length}/12 setup steps reviewed</p><a class="btn primary" href="#learn/${resume()}">${state.completed.length===48?'පාඩම් නැවත බලන්න':'ඊළඟ පාඩම බලන්න'} →</a></section><div class="progress-list section">${MODULES.map(m=>`<div class="card progress-item"><div><b>${m.id+1}. ${esc(m.name)}</b><div class="muted small">${m.lessons.filter(l=>state.completed.includes(l.id)).length}/2 lessons · ${m.lessons.filter(l=>state.passed.includes(l.id)).length}/2 practice</div></div><a href="#learn/${m.lessons[0].id}">Open →</a></div>`).join('')}</div><div class="note section">Browser/profile එක මාරු කළොත් හෝ browser data clear කළොත් saved progress වෙනස් විය හැකියි. <code>spring-boot.html</code> සහ <code>assets/</code> එකම තැනක තබන්න.</div><div class="section"><button class="btn danger" data-reset>Reset Spring progress</button></div>`;
  }
  const LABS=window.SpringLabs.tabs;
  function labs(){return heading('SMALL EXPERIMENTS. CLEARER UNDERSTANDING.','Java & Spring lab එකට එන්න.','Fixed browser simulations වලින් concepts තේරුම් ගන්න. Java/SQL execute කිරීමක් හෝ සැබෑ HTTP requests යැවීමක් මෙහි සිදු වෙන්නේ නැහැ.')+`<nav class="lab-tabs" aria-label="Java and Spring labs">${LABS.map(([id,title])=>`<button class="btn ${lab===id?'active':''}" data-lab="${id}" aria-pressed="${lab===id}">${title}</button>`).join('')}</nav><section class="card" id="lab-content">${window.SpringLabs.render(lab,esc)}</section>`;}
  const renderers = {home, setup, learn:lesson, explorer, flow, labs, practice, project, glossary, viva, progress};
  function render(focus=false) {
    const [target,id] = location.hash.slice(1).split('/');
    page = Object.hasOwn(renderers,target) ? target : 'home';
    if(page==='learn') {
      currentLesson = /^\d+$/.test(id||'') && LESSONS[Number(id)] ? Number(id) : state.last;
      state.last = currentLesson;
      save();
    }
    closeMenu(false);
    $('#main').innerHTML = renderers[page]();
    $('#crumb').textContent = page==='learn'? MODULES[LESSONS[currentLesson].module].name : NAV.find(n=>n[0]===page)?.[2] || 'Spring workspace';
    document.title = (page==='learn'?LESSONS[currentLesson].title:$('#crumb').textContent) + ' · Spring Academy';
    sidebar();
    if(focus) { $('#main').focus({preventScroll:true}); window.scrollTo(0,0); }
  }
  async function copy(text) {
    try {
      if(!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      toast('Copied ✓');
    } catch {
      const textarea=document.createElement('textarea');
      textarea.value=text;
      textarea.className='clipboard-fallback';
      document.body.append(textarea);
      const previous=document.activeElement;
      textarea.select();
      let copied=false;
      try {copied=document.execCommand('copy');} catch {}
      textarea.remove(); previous?.focus({preventScroll:true});
      toast(copied?'Copied ✓':'Copy ලබාගත නොහැක. Code එක select කර copy කරන්න.');
    }
  }
  function download(name, data, type='text/plain;charset=utf-8') {
    const url=URL.createObjectURL(new Blob([data],{type}));
    const link=document.createElement('a'); link.href=url; link.download=name;
    document.body.append(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 10000);
  }
  // Standard uncompressed ZIP, UTF-8 filenames, CRC32. No third-party library or network needed.
  function zip(files) {
    const encoder=new TextEncoder(), chunks=[], central=[]; let offset=0;
    const crc=bytes=>{let c=0xffffffff;for(const byte of bytes){c^=byte;for(let k=0;k<8;k++)c=(c>>>1)^((c&1)?0xedb88320:0);}return(c^0xffffffff)>>>0;};
    const header=(size,write)=>{const bytes=new Uint8Array(size);write(new DataView(bytes.buffer));return bytes;};
    for(const [path,source] of Object.entries(files)) {
      const name=encoder.encode('student-api/'+path),data=encoder.encode(source),checksum=crc(data);
      const local=header(30,v=>{v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x800,true);v.setUint16(12,33,true);v.setUint32(14,checksum,true);v.setUint32(18,data.length,true);v.setUint32(22,data.length,true);v.setUint16(26,name.length,true);});
      const entry=header(46,v=>{v.setUint32(0,0x02014b50,true);v.setUint16(4,20,true);v.setUint16(6,20,true);v.setUint16(8,0x800,true);v.setUint16(14,33,true);v.setUint32(16,checksum,true);v.setUint32(20,data.length,true);v.setUint32(24,data.length,true);v.setUint16(28,name.length,true);v.setUint32(42,offset,true);});
      chunks.push(local,name,data);central.push(entry,name);offset+=local.length+name.length+data.length;
    }
    const centralSize=central.reduce((n,b)=>n+b.length,0),count=Object.keys(files).length;
    const end=header(22,v=>{v.setUint32(0,0x06054b50,true);v.setUint16(8,count,true);v.setUint16(10,count,true);v.setUint32(12,centralSize,true);v.setUint32(16,offset,true);});
    return new Blob([...chunks,...central,end],{type:'application/zip'});
  }
  const mobile=matchMedia('(max-width: 800px)');
  function closeMenu(restore=true) {
    const wasOpen=document.body.classList.contains('menu-open');
    document.body.classList.remove('menu-open');$('#sidebar').classList.remove('visible');$('#scrim').hidden=true;
    $('#menu-toggle').setAttribute('aria-expanded','false');$('.workspace').inert=false;$('#sidebar').inert=mobile.matches;
    if(wasOpen&&restore) $('#menu-toggle').focus();
  }
  function openMenu() {
    $('#sidebar').inert=false;$('#sidebar').classList.add('visible');$('#scrim').hidden=false;
    document.body.classList.add('menu-open');$('#menu-toggle').setAttribute('aria-expanded','true');$('.workspace').inert=true;
    $('#menu-close').focus();
  }
  $('#menu-toggle').addEventListener('click',openMenu);
  $('#menu-close').addEventListener('click',()=>closeMenu());
  $('#scrim').addEventListener('click',()=>closeMenu());
  mobile.addEventListener('change',()=>closeMenu(false));
  $('#theme-toggle').addEventListener('click',()=>{state.theme=state.theme==='dark'?'light':'dark';applyTheme();save();});
  $('#lesson-search').addEventListener('input',syllabus);
  $('#sidebar').addEventListener('click',event=>{
    const link=event.target.closest('a[href^="#"]');
    if(link && mobile.matches) {
      closeMenu(false);
      if(link.hash===location.hash) $('#main').focus({preventScroll:true});
    }
  });
  document.addEventListener('keydown',event=>{
    if(!document.body.classList.contains('menu-open')) return;
    if(event.key==='Escape') {event.preventDefault();closeMenu();}
    if(event.key==='Tab') {
      const controls=[...$('#sidebar').querySelectorAll('a,button,input,summary')].filter(el=>el.getClientRects().length&&!el.disabled);
      const first=controls[0],last=controls.at(-1);
      if(event.shiftKey&&document.activeElement===first) {event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last) {event.preventDefault();first.focus();}
    }
  });
  document.addEventListener('click',event=>{
    const b=event.target.closest('button');
    if(!b || b.disabled) return;
    const d=b.dataset;
    if(d.stage!==undefined) {
      stage=Number(d.stage);$('#module-grid').innerHTML=moduleCards();$('#module-count').textContent=(stage<0?24:STAGES[stage].modules.length)+' modules';
      document.querySelectorAll('[data-stage]').forEach(el=>el.setAttribute('aria-pressed',Number(el.dataset.stage)===stage));
    }
    if(d.section) {
      const section=document.getElementById(d.section);section.scrollIntoView({behavior:'smooth',block:'start'});section.querySelector('h2').focus({preventScroll:true});
      document.querySelectorAll('[data-section]').forEach(el=>{if(el===b)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');});
    }
    if(d.codeLine!==undefined) {
      const panel=b.closest('[data-code-lesson]'),l=LESSONS[Number(panel.dataset.codeLesson)],i=Number(d.codeLine);
      panel.querySelectorAll('[data-code-line]').forEach(el=>{el.classList.toggle('selected',el===b);el.setAttribute('aria-pressed',el===b);});
      panel.querySelector('.line-explain').innerHTML=`<b>LINE ${i+1}</b>${esc(l.notes[i])}`;
    }
    if(d.copyLesson!==undefined) copy(LESSONS[Number(d.copyLesson)].lines.join('\n'));
    if(d.lessonFlow!==undefined) {
      const i=Number(d.lessonFlow);document.querySelectorAll('[data-lesson-flow]').forEach(el=>{el.classList.toggle('active',el===b);el.setAttribute('aria-pressed',el===b);});
      $('.flow-detail').textContent=`පියවර ${i+1}: ${LESSONS[currentLesson].steps[i]}`;
    }
    if(d.reveal!==undefined) {
      const q=LESSONS[Number(d.reveal)].exercise,feedback=b.closest('form').querySelector('.feedback');
      feedback.hidden=false;feedback.classList.remove('correct');feedback.textContent=q.options[q.answer]+' — '+q.why;
    }
    if(d.complete!==undefined) {
      const id=Number(d.complete),done=state.completed.includes(id);
      state.completed=done?state.completed.filter(n=>n!==id):[...state.completed,id];save();sidebar();
      b.textContent=done?'පාඩම සම්පූර්ණයි ✓':'✓ Completed · Undo';b.setAttribute('aria-pressed',!done);
      $('#completion-next').innerHTML=done?'':completionMessage(LESSONS[id]);toast(done?'Completion ඉවත් කළා.':'පාඩම සම්පූර්ණයි ✓');
    }
    if(d.setup!==undefined) {setupStep=Number(d.setup);$('#main').innerHTML=setup();$(`[data-setup="${setupStep}"]`).focus();}
    if(d.copySetup!==undefined) copy($('#setup-command').textContent);
    if(d.runSetup!==undefined) {
      $('#setup-output').hidden=false;$('#setup-output').textContent='DEMO OUTPUT · සැබෑ command එක execute කළේ නැහැ\n\n'+SETUP[setupStep][2];
      if(!state.setup.includes(setupStep))state.setup.push(setupStep);save();
      $('#setup-reviewed').textContent=`${state.setup.length} / ${SETUP.length} steps reviewed`;
      document.querySelectorAll('.terminal-nav [data-setup]').forEach(el=>el.classList.toggle('passed',state.setup.includes(Number(el.dataset.setup))));
    }
    if(d.flow!==undefined) {flowIndex=Number(d.flow);$('#main').innerHTML=flow();$(`[data-flow="${flowIndex}"].active`).focus();}
    if(d.file) {
      selectedFile=d.file;$('#file-name').textContent=selectedFile;$('#file-content').textContent=window.SPRING_PROJECT[selectedFile];
      document.querySelectorAll('[data-file]').forEach(el=>{el.classList.toggle('active',el===b);el.setAttribute('aria-pressed',el===b);});
    }
    if(d.copyFile!==undefined) copy(window.SPRING_PROJECT[selectedFile]);
    if(d.downloadFile!==undefined) download(selectedFile.split('/').at(-1),window.SPRING_PROJECT[selectedFile]);
    if(d.downloadProject!==undefined) {download('student-api.zip',zip(window.SPRING_PROJECT),'application/zip');toast('Project ZIP download සූදානම් ✓');}
    if(d.viva) document.querySelectorAll('.viva').forEach(el=>el.open=d.viva==='open');
    if(d.reset!==undefined && confirm('Spring lessons, practice attempts සහ setup progress සියල්ල reset කරන්නද?')) {
      const theme=state.theme;state=fresh();state.theme=theme;save();render();toast('Spring progress reset කළා.');
    }
    if(d.lab){lab=d.lab;$('#main').innerHTML=labs();$(`[data-lab="${lab}"]`).focus();}
  });
  document.addEventListener('input',event=>{
    const el=event.target;
    if(el.id==='glossary-search')$('#glossary-list').innerHTML=termCards(el.value);
  });
  document.addEventListener('change',event=>{
    const el=event.target;
    if(el.id==='setup-shell'){shell=el.value;$('#main').innerHTML=setup();$('#setup-shell').focus();}
    if(el.id==='explorer-select'){currentLesson=Number(el.value);$('#main').innerHTML=explorer();$('#explorer-select').focus();}
    if(el.id==='practice-filter')$('#practice-list').innerHTML=practiceCards(LESSONS.filter(l=>el.value==='all'||(el.value==='unfinished'?!state.passed.includes(l.id):l.module===Number(el.value))));
  });
  document.addEventListener('submit',event=>{
    const form=event.target;
    if(!form.matches('.exercise'))return;
    event.preventDefault();
    if(form.dataset.exercise!==undefined) {
      const id=Number(form.dataset.exercise),q=LESSONS[id].exercise,selected=form.querySelector('input:checked');
      if(!selected)return;
      const correct=Number(selected.value)===q.answer;
      state.attempts[id]=(state.attempts[id]||0)+1;
      if(correct&&!state.passed.includes(id))state.passed.push(id);save();
      const feedback=form.querySelector('.feedback');feedback.hidden=false;feedback.classList.toggle('correct',correct);feedback.textContent=(correct?'✓ නිවැරදියි. ':'තව වරක් සිතන්න. ')+q.why;
      form.querySelector('.exercise-status').textContent=state.passed.includes(id)?'✓ Passed':`${state.attempts[id]} attempts`;
      if($('#practice-count'))$('#practice-count').textContent=`${state.passed.length} / 48 passed`;
    }
  });
  window.addEventListener('hashchange',()=>render(true));
  window.SpringLabs.attach(esc);
  applyTheme();save();render();
})();
