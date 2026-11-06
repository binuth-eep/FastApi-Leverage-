/* Offline course UI. Lesson snippets are text; no user code is evaluated. */
'use strict';
(() => {
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const KEY = 'angular-academy-si-v1';
  const NAV = [
    ['home','⌂','Learning dashboard'], ['setup','⌘','Start here · Setup'],
    ['explorer','⌥','Code explorer'], ['flow','⇢','Data flow'],
    ['labs','⚗','Frontend labs'], ['practice','✎','Practice'],
    ['project','▧','Student Directory project'], ['glossary','Aa','Glossary'],
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
  let selectedFile = 'README.md', lab = 'signals', flowIndex = 0, toastTimer;
  let students = [{id:1,name:'Amali Perera',email:'amali@example.com'},{id:2,name:'Nimal Silva',email:'nimal@example.com'}];
  let nextId = 3, editing = null;
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
    const next = LESSONS[resume()];
    return `<div class="welcome"><span class="eyebrow">YOUR FRONTEND WORKSPACE</span><h2>ආයුබෝවන්, ඉගෙන ගන්න පටන් ගනිමු.</h2><p>එක සංකල්පයක්. එක උදාහරණයක්. එක පියවරක් බැගින්.</p></div>
      <section class="hero"><div><span class="eyebrow">FROM FIRST CLICK TO FIRST APP</span><h1>ඔබේ අදහසට<br><em>screen එකක් දෙමු.</em></h1><p>HTML, TypeScript, components සහ signals තේරුම් අරගෙන, API එකකට සම්බන්ධ වෙන Angular app එකක් මුල සිට හදමු.</p><div class="row"><a class="btn primary" href="#learn/${resume()}">${state.completed.length?'දිගටම ඉගෙන ගන්න':'පළමු පාඩම අරඹන්න'} <span aria-hidden="true">→</span></a><a class="btn ghost" href="#setup">Setup guide ↗</a></div></div><div class="hero-art" aria-hidden="true"><div class="mini-browser"><div class="window-bar"><span class="window-dots">● ● ●</span>localhost:4200 / students</div><h3>Student Directory <span class="accent">↗</span></h3>${[['AP','Amali Perera','amali@example.com'],['NS','Nimal Silva','nimal@example.com']].map(([initial,name,email])=>`<div class="mini-person"><span>${initial}</span><div>${name}<small>${email}</small></div></div>`).join('')}<span class="badge">✓ Built by you</span></div><div class="code-chip">{{ yourIdeas() }} → something real</div></div></section>
      ${stats()}<section class="card continue section"><span class="badge">NEXT UP</span><div><h3>${esc(next.title)}</h3><p>Module ${next.module+1} · ${esc(MODULES[next.module].name)}</p></div><a class="btn" href="#learn/${next.id}">පාඩම බලන්න →</a></section>
      <section class="section"><div class="section-head"><h2>ඔබේ learning path එක</h2><button class="btn tiny" data-stage="-1" aria-pressed="${stage===-1}">Show all</button></div><div class="stage-grid">${STAGES.map((s,i)=>`<button class="stage-card" data-stage="${i}" aria-pressed="${stage===i}"><span>0${i+1} / ${s.modules.length} MODULES</span><b>${s.name}</b><small>${s.en} · ${s.detail}</small></button>`).join('')}</div></section>
      <section class="section" id="curriculum"><div class="section-head"><h2>පාඩම් මාලාව</h2><span class="muted small" id="module-count">${stage<0?24:STAGES[stage].modules.length} modules</span></div><div class="module-grid" id="module-grid">${moduleCards()}</div></section><div class="note section">මුලින්ම එනවා නම් <a href="#setup">Start here</a> බලන්න. සෑම පාඩමකම සංකල්පය, code පැහැදිලි කිරීම, data flow සහ practice එකක් තියෙනවා. මේ පාඨමාලාව browser එකේ offline වැඩ කරනවා.</div>`;
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
  const SETUP = [
    ['Terminal එක විවෘත කරන්න',{unix:'pwd',powershell:'Get-Location',cmd:'cd'},'ඔබේ current folder path එක පෙන්වයි.','Parent folder · ඔබේ Projects folder','Prompt එක copy නොකර command එක පමණක් දාන්න.'],
    ['Node.js version එක බලන්න','node --version','v24.15.0 හෝ අලුත් 24.x patch එකක්. Node 22.22.3+ (22.x) ද Angular 22 සමඟ ගැළපේ.','Parent folder','Node නැත්නම් nodejs.org installer භාවිතා කර terminal නැවත විවෘත කරන්න.'],
    ['npm තියෙනවාද බලන්න','npm --version','npm version අංකයක් පෙන්වයි.','Parent folder','npm Node installer සමඟ ලැබේ. Command not found නම් PATH සහ terminal restart බලන්න.'],
    ['Learning folder එක සාදන්න','mkdir angular-learning','angular-learning නමින් අලුත් folder එකක්.','Parent folder','Folder එක දැනටමත් තියෙනවා නම් නැවත හදන්න අවශ්‍ය නැහැ.'],
    ['Learning folder එකට යන්න','cd angular-learning','Current folder: …/angular-learning','Parent folder','මේ command එකෙන් පසු current path එක නැවත බලන්න.'],
    ['Angular project එක සාදන්න','npx @angular/cli@22 new student-directory --routing --style=css --standalone --ssr=false --defaults','CLI source files සාදා dependencies install කරයි.','angular-learning/','මුල් install එකට internet අවශ්‍යයි. Existing project folder එක overwrite නොකරන්න.'],
    ['Project root එකට යන්න','cd student-directory','package.json සහ angular.json තියෙන project root එක.','angular-learning/','npm start කිරීමට පෙර මෙහි package.json තියෙනවාද බලන්න.'],
    ['Development server අරඹන්න','npm start','Local: http://localhost:4200/ · server running','angular-learning/student-directory/','Port busy නම් npm start -- --port 4201. Server terminal එක open තබන්න.'],
    ['Browser එකෙන් බලන්න','http://localhost:4200','Angular starter page එක browser එකේ පෙනේ.','Browser address bar · terminal command එකක් නෙවෙයි','මෙම URL එක browser එකට දාන්න. Server stop කළොත් page load නොවේ.'],
    ['Project source එක දාන්න','Project tab → Download ZIP → extract → copy files into project root','src/ සහ config files නියමිත relative paths වලට replace කරයි.','File manager / editor · terminal command එකක් නෙවෙයි','Project tab README කියවන්න. Capstone bundle එක standalone project එකක් ලෙසත් npm install කර run කළ හැකියි.'],
    ['Tests run කරන්න','npx ng test --watch=false','Vitest tests pass විය යුතුයි.','student-directory/ · වෙනම terminal එකක්','මුලින්ම පෙන්වන failure එක කියවා behavior එක නිවැරදි කරන්න.'],
    ['Production build එක සාදන්න','npm run build','dist/student-directory/browser තුළ browser output.','student-directory/ · වෙනම terminal එකක්','Direct /students refresh එකට hosting SPA fallback configure කරන්න.']
  ];
  function setup() {
    const [title,commands,output,cwd,fix] = SETUP[setupStep];
    const command = typeof commands === 'string' ? commands : commands[shell];
    return heading('START HERE · GUIDED SETUP','පළමු app එකට පාර හදාගමු.','Commands එක බැගින් කියවලා, ඔබේ terminal එකේ run කරලා බලන්න. මෙහි Run demo button එකෙන් example output එකක් පමණක් පෙන්වනවා.') +
      `<div class="row between"><label class="field">ඔබේ shell එක<select id="setup-shell">${[['unix','macOS / Linux'],['powershell','Windows PowerShell'],['cmd','Windows CMD']].map(([id,name])=>`<option value="${id}" ${shell===id?'selected':''}>${name}</option>`).join('')}</select></label><span class="badge" id="setup-reviewed">${state.setup.length} / ${SETUP.length} steps reviewed</span></div><div class="terminal-grid"><nav class="terminal-nav" aria-label="Setup steps">${SETUP.map(([name],i)=>`<button data-setup="${i}" class="${setupStep===i?'active':''} ${state.setup.includes(i)?'passed':''}" ${setupStep===i?'aria-current="step"':''}>${String(i+1).padStart(2,'0')} · ${esc(name)}</button>`).join('')}</nav><section class="card"><span class="eyebrow">STEP ${setupStep+1} / ${SETUP.length}</span><h2>${esc(title)}</h2><p class="muted small">Location: ${esc(cwd)}</p><pre class="terminal-command" id="setup-command">${esc(command)}</pre><div class="row"><button class="btn" data-copy-setup>Copy</button><button class="btn primary" data-run-setup>Run demo →</button></div><pre class="output" id="setup-output" role="status" hidden></pre><details class="trouble"><summary>වැඩ කරන්නේ නැත්නම්?</summary><p>${esc(fix)}</p></details><div class="row between"><button class="btn tiny" data-setup="${setupStep-1}" ${setupStep===0?'disabled':''}>← Previous</button><button class="btn tiny" data-setup="${setupStep+1}" ${setupStep===11?'disabled':''}>Next step →</button></div></section></div><div class="note section">Angular 22 compatibility: <a href="https://angular.dev/reference/versions" target="_blank" rel="noopener noreferrer">official version table</a>. Setup review සහ lesson completion වෙන වෙනම සුරැකේ. සැබෑ commands run කළ බව මේ demo එකෙන් තහවුරු කරන්නේ නැහැ.</div>`;
  }
  const lessonSelect = id => `<label class="field">උදාහරණය තෝරන්න<select id="${id}">${MODULES.map(m=>`<optgroup label="${esc(m.name)}">${m.lessons.map(l=>`<option value="${l.id}" ${l.id===currentLesson?'selected':''}>${l.id+1}. ${esc(l.title)}</option>`).join('')}</optgroup>`).join('')}</select></label>`;
  function explorer() {
    return heading('READ · UNDERSTAND · CONNECT','Code එකේ හැම පේළියක්ම.','පේළියක් තෝරලා ඒක කරන වැඩේ සිංහලෙන් කියවන්න. උදාහරණ text ලෙස පෙන්වනවා; browser එකෙන් TypeScript execute කරන්නේ නැහැ.') + lessonSelect('explorer-select') + `<div class="section">${codePanel(LESSONS[currentLesson])}</div><p class="source"><a href="#learn/${currentLesson}">සම්පූර්ණ පාඩම බලන්න →</a></p>`;
  }
  const FLOW = [
    ['User action','Form / click','User input එක FormControl හෝ event handler එකට යයි. Input type සහ whitespace බලන්න.'],
    ['Validation','Form → payload','Invalid form එක නවත්වන්න. Values normalize කර StudentInput payload එක සාදන්න.'],
    ['Service','Component → StudentApi','Component transport details දන්නේ නැහැ. Service එක mock mode හෝ HttpClient තෝරයි.'],
    ['HTTP & backend','Request → FastAPI','Server එක schema, authentication සහ permissions validate කර database වෙනස්කම් commit කරයි.'],
    ['Response & state','JSON → signal','Canonical response record source collection එකට දාන්න. Error නම් form values තබා feedback දෙන්න.'],
    ['Render & cleanup','computed → DOM','Visible list නැවත derive වෙයි. @for track id මඟින් DOM update වේ. finalize loading/saving clear කරයි.']
  ];
  function flow() {
    return heading('THE BIG PICTURE','Click එකකින් screen update එකට.','පියවරක් තෝරලා data එක ගමන් කරන boundary එක තේරුම් ගන්න.') + `<div class="card"><div class="flow">${FLOW.map(([name,,],i)=>`<button data-flow="${i}" class="${i===flowIndex?'active':''}" aria-pressed="${i===flowIndex}"><span>0${i+1} →</span>${name}</button>`).join('')}</div><div class="flow-detail" id="flow-detail" role="status"><b>${FLOW[flowIndex][1]}</b><p>${FLOW[flowIndex][2]}</p></div><div class="row section"><button class="btn" data-flow="${(flowIndex+FLOW.length-1)%FLOW.length}">← Previous</button><button class="btn primary" data-flow="${(flowIndex+1)%FLOW.length}">Next step →</button></div></div><section class="grid2 section"><div class="card"><h2>Success path</h2><pre class="output">POST /api/students\n→ 201 Created\n→ canonical Student\n→ students.update(...)\n→ visible() → screen</pre></div><div class="card"><h2>Failure path</h2><pre class="output">Invalid → form feedback\n401 → login again\n403 → permission message\n409 → duplicate email\n422 → input errors\nNetwork error → retry</pre></div></section><div class="note section">Guard එක UI navigation පාලනය කරනවා. Backend එක හැම protected request එකේම අවසර පරීක්ෂා කළ යුතුයි.</div>`;
  }
  function practice() {
    return heading('SMALL STEPS · STRONGER UNDERSTANDING','කියවපු දේ කරලා බලමු.','හැම පාඩමකටම practice ප්‍රශ්නයක්. නිවැරදි පිළිතුර check කළ විට practice progress save වෙනවා.') + `<div class="row between"><label class="field">Module<select id="practice-filter"><option value="all">All modules · 48 questions</option><option value="unfinished">Unfinished practice</option>${MODULES.map(m=>`<option value="${m.id}">${m.id+1}. ${esc(m.name)}</option>`).join('')}</select></label><span class="badge" id="practice-count">${state.passed.length} / 48 passed</span></div><div id="practice-list" class="practice-list section">${practiceCards(LESSONS)}</div>`;
  }
  function practiceCards(lessons) {
    return lessons.map(l=>`<section class="practice-question"><div class="row between"><h3>${l.id+1}. ${esc(l.title)}</h3><a class="small" href="#learn/${l.id}">Review lesson ↗</a></div>${exercise(l)}</section>`).join('') || '<p class="empty">✓ මෙහි practice සියල්ල අවසන්.</p>';
  }
  function project() {
    const files = window.ANGULAR_PROJECT;
    return heading('BUILD SOMETHING OF YOUR OWN','ඔබේ Student Directory එක.','Standalone Angular app එකේ සම්පූර්ණ source, behavior tests සහ API contract එක. Mock mode එකෙන් backend නැතිව පටන් ගන්න.') + `<div class="row"><button class="btn primary" data-download-project>Download project ZIP ↓</button><button class="btn" data-download-file>Download selected file ↓</button><span class="badge">${Object.keys(files).length} FILES · ANGULAR 22</span></div><div class="note section">ZIP extract කර project root එකේ <code>npm ci</code>, පසුව <code>npm start</code> run කරන්න. Node/npm සහ මුල් install එකට internet අවශ්‍යයි. API mode එකට මාරු කිරීමට README සහ API-CONTRACT.md කියවන්න.</div><div class="file-layout section"><nav class="file-list" aria-label="Project files">${Object.keys(files).map(path=>`<button data-file="${esc(path)}" class="${path===selectedFile?'active':''}" aria-pressed="${path===selectedFile}">${esc(path)}</button>`).join('')}</nav><div class="code-panel"><div class="code-toolbar"><span id="file-name">${esc(selectedFile)}</span><button class="btn tiny" data-copy-file>Copy file</button></div><pre class="code-static" id="file-content">${esc(files[selectedFile])}</pre></div></div>`;
  }
  const TERMS = [
    ['Angular','Components, templates සහ dependency injection මඟින් browser apps සංවිධානය කරන framework එකක්.'],
    ['Component','UI කොටසක class, template සහ styles එකට ගන්න unit එක.'],['Standalone','Component එකේ template dependencies එහි imports තුළම දක්වන ක්‍රමය.'],
    ['Template','State එක HTML සහ bindings මඟින් screen එකට පෙන්වන විස්තරය.'],['Interpolation','{{ value }} මඟින් text value එක template එකේ පෙන්වීම.'],
    ['Property binding','[disabled]="saving()" වැනි syntax එකකින් DOM/component property එක set කිරීම.'],['Event binding','(click)="save()" මඟින් event එකකට handler එක සම්බන්ධ කිරීම.'],
    ['Signal','කියවන තැන් track කරමින් value වෙනස්කම් දන්වන reactive state primitive එක.'],['Computed','වෙනත් signals මත derive කරන read-only value එක.'],
    ['Effect','Signal dependencies වෙනස් වන විට side effect එකක් synchronize කරන callback එක. Derived state සඳහා computed යොදාගන්න.'],
    ['Input','Parent component එක child එකට දෙන value එක.'],['Output','Child component එක parent එකට දන්වන event එක.'],
    ['Service','Data access හෝ shared logic component එකෙන් වෙන් කරන class එක.'],['Dependency injection','අවශ්‍ය dependency instance එක framework එකෙන් resolve කර ලබාගැනීම.'],
    ['TypeScript','JavaScript එකට compile-time type checking එකතු කරන language එක. Types runtime JSON validate කරන්නේ නැහැ.'],['Interface','Object එකේ fields සහ types විස්තර කරන compile-time contract එක.'],
    ['Observable','කාලයත් එක්ක values, error හෝ completion emit කරන stream එක.'],['Subscription','Observable එකට සවන් දෙන execution එක සහ එය නවත්වන handle එක.'],
    ['switchMap','අලුත් outer value එකක් එන විට පරණ inner subscription එක නවතා අලුත් stream එකට මාරු වීම.'],['finalize','Observable complete, error හෝ unsubscribe වන විට cleanup callback එක run කරන operator එක.'],
    ['HttpClient','Typed HTTP requests Observable ලෙස ලබාදෙන Angular service එක.'],['Interceptor','HTTP request/response pipeline එකේ shared behavior සකස් කරන function එක.'],
    ['Router','URL අනුව screen component එක තෝරන navigation system එක.'],['Guard','Frontend navigation allow/redirect කරන decision එක. Server authorization වෙනම අවශ්‍යයි.'],
    ['Reactive form','TypeScript තුළ explicit control model එකෙන් form values සහ validation පාලනය කිරීම.'],['FormControl','එක් field එකක value, validation සහ interaction state එක.'],
    ['Validator','Control value එකට validation error map එකක් හෝ null return කරන function එක.'],['OnPush','අදාළ triggers ඇති විට component subtree checks කරන change detection strategy එක.'],
    ['Immutability','පරණ array/object mutate කිරීම වෙනුවට වෙනස්කම් සහිත අලුත් value එකක් සාදන ක්‍රමය.'],['track','@for loop එකේ stable ID එකෙන් item identity පවත්වා ගැනීම.'],
    ['CRUD','Create, Read, Update සහ Delete යන data operations හතර.'],['CORS','Cross-origin browser request එකකට server headers මඟින් අවසර දෙන policy එක.'],
    ['Dev proxy','Development server එකෙන් API requests backend එකට යවන config එක. Production සඳහා වෙනම routing අවශ්‍යයි.'],['JWT','Claims සහ signature අඩංගු token format එක. Decode කිරීම verification එකක් නොවේ.'],
    ['SPA fallback','App route එක direct load කළ විට server එක index.html ලබාදෙන hosting rule එක.'],['Vitest','මේ Angular CLI baseline එකේ unit test runner එක.'],
    ['npm ci','Matching package-lock.json එකෙන් reproducible dependency install කරන command එක.'],['Build','Source files optimize කර host කළ හැකි browser assets සාදන ක්‍රියාවලිය.']
  ];
  const termCards = query => TERMS.filter(t=>t.join(' ').toLowerCase().includes(query.toLowerCase())).map(([word,meaning])=>`<article class="card term"><h3>${esc(word)}</h3><p>${esc(meaning)}</p></article>`).join('') || '<p class="empty" role="status">ගැළපෙන term එකක් නැහැ.</p>';
  function glossary() {
    return heading('YOUR FRONTEND DICTIONARY','වචනයෙන් අදහසට.','Angular සහ frontend වල නිතර හමුවෙන වචන සිංහලෙන්.') + `<label class="field">Search ${TERMS.length} terms<input type="search" id="glossary-search" placeholder="Signal, Observable, CORS…"></label><div class="glossary-grid section" id="glossary-list">${termCards('')}</div>`;
  }
  function viva() {
    return heading('EXPLAIN IT IN YOUR OWN WORDS','තේරුම් ගත්ත දේ කියලා බලමු.','පළමුව ඔබේ වචනවලින් පිළිතුරු දෙන්න. පසුව explanation එක විවෘත කර සසඳන්න.') + `<div class="row"><button class="btn" data-viva="open">Open all</button><button class="btn" data-viva="close">Close all</button></div>` + MODULES.map(m=>{
      const l=m.lessons[1],q=l.exercise;
      return `<details class="card viva"><summary>${m.id+1}. ${esc(q.question)} · ඇයි?</summary><p><b>${esc(q.options[q.answer])}</b> — ${esc(q.why)}</p><p>${esc(l.goal)}</p><a class="small" href="#learn/${l.id}">Review ${esc(m.name)} →</a></details>`;
    }).join('');
  }
  function progress() {
    return heading('YOUR LEARNING JOURNEY','ඔබේ උත්සාහය මෙතැන තියෙනවා.','Lesson completion සහ practice progress මේ browser එකේ සුරැකෙනවා. Course catalog එකේ Angular progress එකත් මෙයින් update වෙනවා.') + stats() +
      `<section class="card section"><div class="row between"><h2>සමස්ත ප්‍රගතිය</h2><b>${percent()}%</b></div><div class="progressbar" role="progressbar" aria-label="Course completion" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent()}"><span style="width:${percent()}%"></span></div><p class="muted small">${state.completed.length} lessons complete · ${state.passed.length} exercises passed · ${Object.values(state.attempts).reduce((a,b)=>a+b,0)} attempts · ${state.setup.length}/12 setup steps reviewed</p><a class="btn primary" href="#learn/${resume()}">${state.completed.length===48?'පාඩම් නැවත බලන්න':'ඊළඟ පාඩම බලන්න'} →</a></section><div class="progress-list section">${MODULES.map(m=>`<div class="card progress-item"><div><b>${m.id+1}. ${esc(m.name)}</b><div class="muted small">${m.lessons.filter(l=>state.completed.includes(l.id)).length}/2 lessons · ${m.lessons.filter(l=>state.passed.includes(l.id)).length}/2 practice</div></div><a href="#learn/${m.lessons[0].id}">Open →</a></div>`).join('')}</div><div class="note section">Browser/profile එක මාරු කළොත් හෝ browser data clear කළොත් saved progress වෙනස් විය හැකියි. <code>angular.html</code> සහ <code>assets/</code> එකම තැනක තබන්න.</div><div class="section"><button class="btn danger" data-reset>Reset Angular progress</button></div>`;
  }
  const LABS = [['signals','Signals & binding'],['forms','Form validation'],['crud','Student CRUD'],['routing','Routing'],['http','HTTP & auth'],['debug','Debug clinic']];
  function labs() {
    return heading('LEARN BY DOING','Frontend lab එකට එන්න.','කුඩා browser simulations වලින් UI behavior තේරුම් ගන්න. මේවා Angular runtime එකක් හෝ සැබෑ API requests එකක් run කරන්නේ නැහැ.') + `<nav class="lab-tabs" aria-label="Frontend labs">${LABS.map(([id,title])=>`<button class="btn ${lab===id?'active':''}" data-lab="${id}" aria-pressed="${lab===id}">${title}</button>`).join('')}</nav><section class="card" id="lab-content">${labContent()}</section>`;
  }
  function labContent() {
    if (lab==='signals') return `<h2>State → computed → template</h2><label class="field">ඔබේ නම<input id="binding-name" placeholder="Amali" maxlength="80"></label><div class="preview"><h3 id="binding-preview">ආයුබෝවන්, learner!</h3><p>Signal value: <b id="signal-count">0</b> · Computed double: <b id="signal-double">0</b></p><div class="row"><button class="btn" data-count="-1">− 1</button><button class="btn primary" data-count="1">+ 1</button><button class="btn" data-count="0">Reset</button></div></div><pre class="output">const count = signal(0);\nconst doubled = computed(() => count() * 2);\ncount.update(n => n + 1);</pre>`;
    if (lab==='forms') return `<h2>Validate → normalize → payload</h2><form id="validation-form" novalidate><div class="grid2"><label class="field">Student name<input name="name" required minlength="2" maxlength="80" autocomplete="name"></label><label class="field">Email<input name="email" type="email" required maxlength="254" autocomplete="email"></label></div><button class="btn primary section" type="submit">Validate form</button><pre class="output" id="validation-result" role="status" hidden></pre></form><p class="lab-caption">මෙහි validation subset එකක් පෙන්වනවා. Backend එක නැවත validate කළ යුතුයි.</p>`;
    if (lab==='crud') return `<div class="row between"><h2>Student Directory</h2><span class="badge">IN-MEMORY DEMO</span></div><label class="field">Search students<input type="search" id="student-search" placeholder="Name or email"></label><div id="student-records" class="records section">${recordCards('')}</div><form id="student-form" class="section" novalidate><h3 id="student-form-title">Add a student</h3><div class="grid2"><label class="field">Name<input name="name" required maxlength="80" autocomplete="off"></label><label class="field">Email<input name="email" type="email" required maxlength="254" autocomplete="off"></label></div><div class="row section"><button class="btn primary" type="submit">Save student</button><button class="btn" type="button" data-cancel-edit>Cancel / clear</button></div><p class="feedback" id="student-feedback" role="status" hidden></p></form><p class="lab-caption">Records memory එකේ පමණයි. Reload කළොත් sample data ආපසු එයි. Delete කිරීමට confirmation අවශ්‍යයි.</p>`;
    if (lab==='routing') return `<h2>URL → route params</h2><form id="route-form"><label class="field">App route<input id="route-value" value="/students/12?q=amali" required></label><button class="btn primary section" type="submit">Match route</button><pre id="route-result" class="output" role="status" hidden></pre></form><p class="lab-caption">මෙහි route එක course URL එක වෙනස් කරන්නේ නැහැ. Positive safe integer ID පමණක් accept කරන demo එකක්.</p>`;
    if (lab==='http') return `<h2>Request එකේ ප්‍රතිඵලය කියවමු</h2><form id="http-form"><div class="grid2"><label class="field">Method<select name="method"><option>GET</option><option>POST</option><option>PATCH</option><option>DELETE</option></select></label><label class="field">Scenario<select name="scenario"><option value="success">Success · authorized</option><option value="empty">Empty collection</option><option value="401">Missing / expired token</option><option value="403">Missing permission</option><option value="404">Missing record</option><option value="409">Duplicate email</option><option value="422">Invalid payload</option><option value="0">Network / CORS / offline</option><option value="500">Server error</option></select></label></div><button class="btn primary section" type="submit">Send demo request →</button><pre class="output" id="http-result" role="status" hidden></pre></form><p class="lab-caption">Credentials හෝ tokens ඇතුළත් කිරීමට අවශ්‍ය නැහැ. සියලු responses මේ browser එකේ predefined simulations.</p>`;
    return `<h2>Error එකෙන් හේතුවට</h2><label class="field">Case<select id="debug-case"><option value="imports">Cannot bind to formGroup</option><option value="state">List stays stale after save</option><option value="cors">Status 0 / CORS</option><option value="route">Refresh /students gives 404</option></select></label><button class="btn primary section" data-debug>Diagnosis බලන්න →</button><div class="feedback" id="debug-result" role="status" hidden></div>`;
  }
  function recordCards(query) {
    const visible=students.filter(s=>`${s.name} ${s.email}`.toLowerCase().includes(query.trim().toLowerCase()));
    return visible.map(s=>`<article class="record"><div><b>${esc(s.name)}</b><small>${esc(s.email)}</small></div><div class="row"><button class="btn tiny" data-edit="${s.id}">Edit<span class="sr-only"> ${esc(s.name)}</span></button><button class="btn tiny danger" data-delete="${s.id}">Delete<span class="sr-only"> ${esc(s.name)}</span></button></div></article>`).join('') || '<p class="empty" role="status">No students found.</p>';
  }
  function validate(name,email) {
    if(name.trim().length<2 || name.trim().length>80) return 'නම අක්ෂර 2–80 අතර විය යුතුයි. හිස් නමක් භාවිතා කරන්න බැහැ.';
    if(email.trim().length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'වලංගු email ලිපිනයක් දෙන්න. උදා: amali@example.com';
    return '';
  }
  const renderers = {home, setup, learn:lesson, explorer, flow, labs, practice, project, glossary, viva, progress};
  function render(focus=false) {
    const [target,id] = location.hash.slice(1).split('/');
    page = Object.hasOwn(renderers,target) ? target : 'home';
    if(page==='learn') {
      currentLesson = /^\d+$/.test(id||'') && LESSONS[Number(id)] ? Number(id) : state.last;
      state.last = currentLesson;
      save();
    }
    if(lab==='crud') editing=null;
    closeMenu(false);
    $('#main').innerHTML = renderers[page]();
    $('#crumb').textContent = page==='learn'? MODULES[LESSONS[currentLesson].module].name : NAV.find(n=>n[0]===page)?.[2] || 'Angular workspace';
    document.title = (page==='learn'?LESSONS[currentLesson].title:$('#crumb').textContent) + ' · Angular Academy';
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
      const name=encoder.encode('student-directory/'+path),data=encoder.encode(source),checksum=crc(data);
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
      selectedFile=d.file;$('#file-name').textContent=selectedFile;$('#file-content').textContent=window.ANGULAR_PROJECT[selectedFile];
      document.querySelectorAll('[data-file]').forEach(el=>{el.classList.toggle('active',el===b);el.setAttribute('aria-pressed',el===b);});
    }
    if(d.copyFile!==undefined) copy(window.ANGULAR_PROJECT[selectedFile]);
    if(d.downloadFile!==undefined) download(selectedFile.split('/').at(-1),window.ANGULAR_PROJECT[selectedFile]);
    if(d.downloadProject!==undefined) {download('student-directory.zip',zip(window.ANGULAR_PROJECT),'application/zip');toast('Project ZIP download සූදානම් ✓');}
    if(d.viva) document.querySelectorAll('.viva').forEach(el=>el.open=d.viva==='open');
    if(d.reset!==undefined && confirm('Angular lessons, practice attempts සහ setup progress සියල්ල reset කරන්නද?')) {
      const theme=state.theme;state=fresh();state.theme=theme;save();render();toast('Angular progress reset කළා.');
    }
    if(d.lab) {lab=d.lab;editing=null;$('#main').innerHTML=labs();$(`[data-lab="${lab}"]`).focus();}
    if(d.count!==undefined) {const n=d.count==='0'?0:Number($('#signal-count').textContent)+Number(d.count);$('#signal-count').textContent=n;$('#signal-double').textContent=n*2;}
    if(d.edit!==undefined) {
      const s=students.find(s=>s.id===Number(d.edit));editing=s.id;const form=$('#student-form');form.elements.name.value=s.name;form.elements.email.value=s.email;$('#student-form-title').textContent='Edit student';form.elements.name.focus();$('#student-feedback').hidden=true;
    }
    if(d.cancelEdit!==undefined) {editing=null;$('#student-form').reset();$('#student-form-title').textContent='Add a student';$('#student-feedback').hidden=true;}
    if(d.delete!==undefined) {
      const id=Number(d.delete),s=students.find(s=>s.id===id);
      if(confirm(`${s.name} delete කරන්නද?`)) {
        students=students.filter(s=>s.id!==id);$('#student-records').innerHTML=recordCards($('#student-search').value);
        if(editing===id){editing=null;$('#student-form').reset();$('#student-form-title').textContent='Add a student';}
        $('#student-search').focus();toast('Student deleted ✓');
      }
    }
    if(d.debug!==undefined) {
      const answers={imports:'ReactiveFormsModule component imports තුළ එකතු කර formGroup binding නම බලන්න.',state:'Source signal එක immutable update කරන්න. Filtered list එක computed එකකින් derive කරන්න.',cors:'Network URL, server availability සහ preflight headers බලන්න. Status 0 එකට network/offline වැනි හේතුත් තිබිය හැකියි.',route:'Host එකේ /students වැනි app routes index.html fallback වෙත යවන්න. /api සහ asset requests වෙනම route කරන්න.'};
      $('#debug-result').hidden=false;$('#debug-result').textContent=answers[$('#debug-case').value];
    }
  });
  document.addEventListener('input',event=>{
    const el=event.target;
    if(el.id==='glossary-search')$('#glossary-list').innerHTML=termCards(el.value);
    if(el.id==='binding-name')$('#binding-preview').textContent=`ආයුබෝවන්, ${el.value.trim()||'learner'}!`;
    if(el.id==='student-search')$('#student-records').innerHTML=recordCards(el.value);
  });
  document.addEventListener('change',event=>{
    const el=event.target;
    if(el.id==='setup-shell'){shell=el.value;$('#main').innerHTML=setup();$('#setup-shell').focus();}
    if(el.id==='explorer-select'){currentLesson=Number(el.value);$('#main').innerHTML=explorer();$('#explorer-select').focus();}
    if(el.id==='practice-filter')$('#practice-list').innerHTML=practiceCards(LESSONS.filter(l=>el.value==='all'||(el.value==='unfinished'?!state.passed.includes(l.id):l.module===Number(el.value))));
  });
  document.addEventListener('submit',event=>{
    const form=event.target;
    if(!form.matches('.exercise,#validation-form,#student-form,#route-form,#http-form'))return;
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
    if(form.id==='validation-form'||form.id==='student-form') {
      const name=form.elements.name.value.trim(),email=form.elements.email.value.trim().toLowerCase();
      let error=validate(name,email);
      if(form.id==='student-form'&&!error&&students.some(s=>s.email===email&&s.id!==editing))error='මේ email එකට දැනටමත් student කෙනෙක් ඉන්නවා. වෙනත් email එකක් දෙන්න.';
      const output=form.querySelector('[role="status"]');output.hidden=false;
      if(error){output.textContent=error;return;}
      if(form.id==='validation-form'){output.textContent='VALID PAYLOAD\n'+JSON.stringify({name,email},null,2);return;}
      if(editing!==null)students=students.map(s=>s.id===editing?{...s,name,email}:s);else students.push({id:nextId++,name,email});
      output.textContent='✓ Student saved.';editing=null;form.reset();$('#student-form-title').textContent='Add a student';$('#student-records').innerHTML=recordCards($('#student-search').value);
    }
    if(form.id==='route-form') {
      const raw=$('#route-value').value.trim(),output=$('#route-result');output.hidden=false;
      const match=raw.match(/^\/students(?:\/([1-9]\d*))?(?:\?([^#]*))?$/);
      if(!match || (match[1]&&!Number.isSafeInteger(Number(match[1])))){output.textContent='404 · No route match. Use /students or /students/12?q=amali';return;}
      output.textContent=JSON.stringify({component:match[1]?'StudentDetail':'StudentList',id:match[1]?Number(match[1]):null,query:new URLSearchParams(match[2]||'').get('q')||''},null,2);
    }
    if(form.id==='http-form') {
      const method=form.elements.method.value,scenario=form.elements.scenario.value,output=$('#http-result');output.hidden=false;
      const responses={'401':'401 Unauthorized → session clear කර login පෙන්වන්න.','403':'403 Forbidden → අවසර නැහැ. Backend permissions බලන්න.','404':'404 Not Found → URL සහ record ID බලන්න.','409':'409 Conflict → duplicate email field එක නිවැරදි කරන්න.','422':'422 Unprocessable Content → server field errors පෙන්වන්න.','0':'Status 0 → network, CORS හෝ server availability බලන්න.','500':'500 Internal Server Error → retry option දෙන්න; server logs බලන්න.'};
      output.textContent=`DEMO ${method} /api/students${['PATCH','DELETE'].includes(method)?'/1':''}\n\n`+(responses[scenario] || (scenario==='empty'?'200 OK\n[]\n→ Empty state පෙන්වන්න.':method==='DELETE'?'204 No Content\n→ Source collection එකෙන් record ඉවත් කරන්න.':`${method==='POST'?'201 Created':'200 OK'}\n${JSON.stringify(method==='GET'?students:students[0],null,2)}\n→ Source state update කරන්න.`))+'\n\nfinalize → loading / saving = false';
    }
  });
  window.addEventListener('hashchange',()=>render(true));
  applyTheme();save();render();
})();
