/* Bounded browser simulations. No Java, SQL, HTTP, credentials or shell is executed. */
'use strict';
window.SpringLabs = (() => {
  const clone=value=>JSON.parse(JSON.stringify(value));
  class StudentApi {
    constructor(){this.reset();}
    reset(){this.records=[{id:1,name:'Amali Perera',email:'amali@example.com'},{id:2,name:'Nimal Silva',email:'nimal@example.com'}];this.nextId=3;}
    result(status,body,trace,headers={}){return {status,body,headers,trace};}
    request(method,rawPath,rawBody=''){
      const path=rawPath.trim().split('?')[0],match=path.match(/^\/api\/students(?:\/([^/]+))?$/),trace=['HTTP request → Spring MVC'];
      const fail=(status,message,errors={})=>this.result(status,{status,message,errors},[...trace,'Request stopped · no write committed']);
      if(!match)return fail(404,'No route matches this path.');
      const rawId=match[1];let id=null;
      if(rawId!==undefined){id=Number(rawId);if(!/^\d+$/.test(rawId)||!Number.isSafeInteger(id)||id<1)return fail(400,'Invalid student ID.');}
      const supported=id===null?['GET','POST']:['GET','PATCH','DELETE'];
      if(!supported.includes(method))return fail(405,'Method not allowed for this path.');
      if(method==='GET'){
        trace.push('Controller → service → repository → read-only transaction');
        if(id===null)return this.result(200,clone(this.records),[...trace,'DTO list → JSON array']);
        const found=this.records.find(s=>s.id===id);return found?this.result(200,clone(found),[...trace,'Response DTO → JSON']):fail(404,'Student not found.');
      }
      let input;
      if(method==='POST'||method==='PATCH'){
        trace.push('JSON binding → normalize → DTO validation');
        try{input=JSON.parse(rawBody);}catch{return fail(400,'Malformed JSON.');}
        if(!input||typeof input!=='object'||Array.isArray(input))return fail(400,'Expected a student object.');
        const name=typeof input.name==='string'?input.name.trim():'',email=typeof input.email==='string'?input.email.trim().toLowerCase():'';
        const errors={};if(name.length<2||name.length>80)errors.name='Name must have 2–80 characters.';
        if(email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))errors.email='Enter a valid email address.';
        if(Object.keys(errors).length)return fail(400,'Check the student fields.',errors);
        input={name,email};
      }
      trace.push('Controller → service → write transaction');
      if(id!==null&&!this.records.some(s=>s.id===id))return fail(404,'Student not found.');
      if(input&&this.records.some(s=>s.email===input.email&&s.id!==id))return fail(409,'This email is already in use.');
      if(method==='POST'){
        const student={id:this.nextId++,...input};this.records.push(student);
        return this.result(201,clone(student),[...trace,'Repository → insert/flush → database constraint','Commit → response DTO'],{Location:'/api/students/'+student.id});
      }
      if(method==='PATCH'){
        const student={id,...input};this.records=this.records.map(s=>s.id===id?student:s);
        return this.result(200,clone(student),[...trace,'Repository → update/flush → commit','Response DTO → JSON']);
      }
      this.records=this.records.filter(s=>s.id!==id);
      return this.result(204,null,[...trace,'Repository → delete/flush → commit','No response body']);
    }
  }
  function transfer(amount,failAfterDebit){
    const before={a:100,b:20},staged={...before};
    if(!Number.isSafeInteger(amount)||amount<=0||amount>before.a)return {ok:false,before,after:{...before},steps:['Invalid credit amount. Use an integer from 1 to 100.','No transaction work committed.']};
    staged.a-=amount;const steps=[`Begin transaction: A=${before.a}, B=${before.b}`,`Stage debit: A=${staged.a}`];
    if(failAfterDebit)return {ok:false,before,after:{...before},steps:[...steps,'Simulated unchecked exception before credit','ROLLBACK → restore original balances']};
    staged.b+=amount;return {ok:true,before,after:staged,steps:[...steps,`Stage credit: B=${staged.b}`,'COMMIT → both changes become the result']};
  }
  function security(identity,permission,csrf){
    if(identity!=='valid')return {status:401,message:'Authenticate first. Missing/invalid identity cannot reach this protected handler.'};
    if(permission!=='allowed')return {status:403,message:'Identity is valid, but the required permission is missing.'};
    if(csrf!=='valid')return {status:403,message:'Cookie/session-authenticated write requires a valid CSRF token in this scenario.'};
    return {status:200,message:'Request allowed by these assumed security rules. Business validation still applies.'};
  }
  const api=new StudentApi();
  const tabs=[['java','Java values'],['di','Dependency injection'],['crud','REST & CRUD'],['transactions','Transactions'],['security','Security decisions'],['debug','Debug clinic']];
  const records=esc=>api.records.map(s=>`<article class="record"><div><b>${esc(s.name)}</b><small>${esc(s.email)}</small></div><span class="badge">ID ${s.id}</span></article>`).join('')||'<p class="empty">No students yet.</p>';
  function render(tab,esc){
    if(tab==='java')return `<h2>Types තීරණය කරන result එක.</h2><form id="java-lab-form"><label class="field">Operation<select name="operation"><option value="division">Java int division</option><option value="equals">String.equals content comparison</option></select></label><div class="grid2 section"><label class="field">Value A<input name="a" value="5" required maxlength="100"></label><label class="field">Value B<input name="b" value="2" required maxlength="100"></label></div><button class="btn primary section" type="submit">Show result →</button><pre class="output" id="java-result" role="status" hidden></pre></form><p class="lab-caption">Fixed-operation teaching model එකක්. Java code compile හෝ execute කරන්නේ නැහැ.</p>`;
    if(tab==='di')return `<h2>එක contract එකක්. Implementations දෙකක්.</h2><form id="di-lab-form"><label class="field">Injected implementation<select name="implementation"><option value="console">ConsoleSender</option><option value="email">FakeEmailSender</option></select></label><label class="field section">Message<input name="message" value="Welcome to Spring Academy" maxlength="160"></label><button class="btn primary section" type="submit">Follow the dependency →</button><pre class="output" id="di-result" role="status" hidden></pre></form><p class="lab-caption">Notifier → MessageSender interface → selected fake implementation. Email එකක් යවන්නේ නැහැ.</p>`;
    if(tab==='crud')return `<div class="row between"><h2>Student API request lab</h2><button class="btn tiny" data-reset-api>Reset demo data</button></div><div class="grid2"><form id="api-lab-form"><div class="row"><label class="field">Method<select name="method"><option>GET</option><option>POST</option><option>PATCH</option><option>DELETE</option><option>PUT</option></select></label><label class="field grow">Path<input name="path" value="/api/students" required maxlength="150"></label></div><label class="field section">JSON body<textarea name="body" class="spring-editor" spellcheck="false">{"name":"Kasun","email":"kasun@example.com"}</textarea></label><button class="btn primary section" type="submit">Send demo request →</button><div class="quick-actions section">${[['list','List'],['create','Create'],['invalid','Invalid input'],['edit','Edit ID 1'],['delete','Delete ID 1']].map(([id,label])=>`<button class="btn tiny" type="button" data-api-preset="${id}">${label}</button>`).join('')}</div></form><div><h3>Response</h3><pre class="output" id="api-result" role="status">Choose a request. No network request is sent.</pre><h3 class="section">Data flow</h3><pre class="output" id="api-trace">HTTP → controller → service → repository → database</pre></div></div><div class="section"><h3>In-memory records</h3><div class="records" id="api-records">${records(esc)}</div></div><p class="lab-caption">මේ validation model එක Jakarta Validation/JSON binding වල කුඩා subset එකක් පමණයි. Complete API එක Project tab එකෙන් ගන්න. Reload කළොත් demo data reset වෙනවා.</p>`;
    if(tab==='transactions')return `<h2>එක් write එකකට පසු error වුණොත්?</h2><p class="muted">Accounts A=100 සහ B=20 credits වලින් අරඹනවා. Debit සහ credit එකම unit එකක complete විය යුතුයි.</p><form id="transaction-lab-form"><label class="field">Transfer credits (1–100)<input name="amount" type="number" min="1" max="100" step="1" value="20" required></label><label class="option section"><input name="failure" type="checkbox"><span>Debit එකට පසු unchecked exception එකක් simulate කරන්න.</span></label><button class="btn primary section" type="submit">Run transaction demo →</button><pre class="output" id="transaction-result" role="status" hidden></pre></form><p class="lab-caption">මේ model එක memory copies මඟින් commit/rollback අදහස පෙන්වනවා. JPA, SQL isolation හෝ actual database rollback execute කරන්නේ නැහැ.</p>`;
    if(tab==='security')return `<h2>Identity, permission සහ CSRF.</h2><p class="muted">Cookie/session authentication සහ CSRF protection ඇති state-changing request එකක් යැයි මෙහි assume කරනවා.</p><form id="security-lab-form"><div class="grid2"><label class="field">Identity<select name="identity"><option value="valid">Valid session</option><option value="missing">Missing identity</option><option value="invalid">Invalid identity</option></select></label><label class="field">Permission<select name="permission"><option value="allowed">Allowed role</option><option value="denied">Missing permission</option></select></label><label class="field">CSRF token<select name="csrf"><option value="valid">Valid token</option><option value="missing">Missing/invalid token</option></select></label></div><button class="btn primary section" type="submit">Check decision →</button><pre class="output" id="security-result" role="status" hidden></pre></form><p class="lab-caption">Illustrative decision order එකක්; actual Spring Security exception/status behavior configured entry points සහ filters මතත් රඳා පවතී. Credentials හෝ tokens ඇතුළත් කරන්න අවශ්‍ය නැහැ.</p>`;
    return `<h2>Evidence එකෙන් root cause එකට.</h2><form id="debug-lab-form"><label class="field">Case<select name="scenario"><option value="port">Port 8080 already in use</option><option value="bean">No qualifying bean of type</option><option value="validation">400 Bad Request</option><option value="database">Database connection refused</option><option value="lazy">LazyInitializationException</option><option value="duplicate">Duplicate key constraint</option></select></label><button class="btn primary section" type="submit">Diagnosis බලන්න →</button><div class="feedback" id="debug-result" role="status" hidden></div></form>`;
  }
  function attach(esc){
    document.addEventListener('click',event=>{
      const b=event.target.closest('button');if(!b)return;
      if(b.dataset.resetApi!==undefined){api.reset();document.querySelector('#api-records').innerHTML=records(esc);document.querySelector('#api-result').textContent='Demo records reset. Reload also resets this model.';document.querySelector('#api-trace').textContent='HTTP → controller → service → repository → database';}
      if(b.dataset.apiPreset){
        const form=document.querySelector('#api-lab-form'),presets={list:['GET','/api/students',''],create:['POST','/api/students','{"name":"Kasun","email":"kasun@example.com"}'],invalid:['POST','/api/students','{"name":" ","email":"bad"}'],edit:['PATCH','/api/students/1','{"name":"Amali Silva","email":"amali@example.com"}'],delete:['DELETE','/api/students/1','']};
        const [method,path,body]=presets[b.dataset.apiPreset];form.elements.method.value=method;form.elements.path.value=path;form.elements.body.value=body;
      }
    });
    document.addEventListener('submit',event=>{
      const form=event.target;if(!form.matches('#java-lab-form,#di-lab-form,#api-lab-form,#transaction-lab-form,#security-lab-form,#debug-lab-form'))return;event.preventDefault();
      const show=(id,text)=>{const output=document.getElementById(id);output.hidden=false;output.textContent=text;};
      if(form.id==='java-lab-form'){
        const a=form.elements.a.value,b=form.elements.b.value;
        if(form.elements.operation.value==='equals'){show('java-result',`String a = ${JSON.stringify(a)};\nString b = ${JSON.stringify(b)};\na.equals(b) → ${a===b}\n\nText content is compared. == would compare Java reference identity.`);return;}
        const x=Number(a),y=Number(b);if(!/^-?\d+$/.test(a)||!/^-?\d+$/.test(b)||![x,y].every(n=>Number.isInteger(n)&&n>=-2147483648&&n<=2147483647)){show('java-result','Use two valid Java int values.');return;}
        show('java-result',y===0?'ArithmeticException: integer division by zero.':`Java int result: ${Math.trunc(x/y)|0}\nFloating-point illustration: ${x/y}\nInteger division truncates toward zero; int overflow wraps.`);
      }
      if(form.id==='di-lab-form')show('di-result',`Notifier → MessageSender → ${form.elements.implementation.value==='email'?'FakeEmailSender':'ConsoleSender'}\n\nPayload: ${form.elements.message.value}\nNo actual message was sent.`);
      if(form.id==='api-lab-form'){
        const result=api.request(form.elements.method.value,form.elements.path.value,form.elements.body.value);
        show('api-result',`SIMULATED HTTP ${result.status}\n${Object.entries(result.headers).map(([key,value])=>key+': '+value).join('\n')}\n${result.status===204?'(no response body)':JSON.stringify(result.body,null,2)}`);
        show('api-trace',result.trace.join('\n→ '));document.querySelector('#api-records').innerHTML=records(esc);
      }
      if(form.id==='transaction-lab-form'){const result=transfer(Number(form.elements.amount.value),form.elements.failure.checked);show('transaction-result',result.steps.join('\n')+`\n\nFinal state: A=${result.after.a}, B=${result.after.b}`);}
      if(form.id==='security-lab-form'){const result=security(form.elements.identity.value,form.elements.permission.value,form.elements.csrf.value);show('security-result',`${result.status}\n${result.message}`);}
      if(form.id==='debug-lab-form'){
        const answers={port:'Existing process/port බලන්න. ඔබේ server එක stop කරන්න හෝ --server.port වෙනස් කර client target එකත් update කරන්න.',bean:'Component registration, package scan, constructor type සහ qualifiers බලන්න. Missing dependency එක random new කරලා සඟවන්න එපා.',validation:'Actual request JSON, Content-Type සහ errors map බලන්න. Invalid field හෝ ID constraint එක නිවැරදි කරන්න.',database:'DB service availability, JDBC URL/port, profile සහ credentials environment බලන්න. Secret values logs/screenshots වලට දාන්න එපා.',lazy:'Transaction ඉවර වූ පසු lazy relation access වෙනවාද බලන්න. Service ඇතුළේ deliberate query/fetch plan එකකින් DTO map කරන්න.',duplicate:'Business duplicate check සහ DB unique constraint බලන්න. Race condition එක safe 409 response එකකට map කරන්න.'};show('debug-result',answers[form.elements.scenario.value]);
      }
    });
  }
  return {StudentApi,transfer,security,tabs,render,attach};
})();
