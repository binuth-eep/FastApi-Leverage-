// Uses a temporary folder for Java compilation; never modifies the user's project.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),vm=require('node:vm');
const {execFileSync}=require('node:child_process');
const context={window:{}};vm.createContext(context);
for(const name of ['spring-course.js','spring-labs.js'])vm.runInContext(fs.readFileSync(path.resolve(__dirname,'../assets',name),'utf8'),context);
const course=context.window.SpringCourse,{StudentApi,transfer,security}=context.window.SpringLabs;
assert.equal(course.modules.length,24);assert.equal(course.lessons.length,48);assert.equal(course.terms.length,40);assert.equal(course.setup.length,12);
const stageIds=course.stages.flatMap(s=>s.modules);assert.equal(stageIds.length,24);assert.equal(new Set(stageIds).size,24);
course.lessons.forEach((l,i)=>{assert.equal(l.id,i);assert.equal(l.module,Math.floor(i/2));assert.equal(l.topics.length,3);assert.equal(l.steps.length,4);assert.equal(l.lines.length,l.notes.length);assert.ok(l.lines.length>=3);assert.ok(l.exercise.answer>=0&&l.exercise.answer<l.exercise.options.length);});
const api=new StudentApi();assert.equal(api.request('GET','/api/students').body.length,2);
const invalid=api.request('POST','/api/students','{"name":" ","email":"bad"}');assert.equal(invalid.status,400);assert.ok(invalid.body.errors.name);assert.equal(api.records.length,2);
for(const payload of ['{broken','null','[]','{"name":1,"email":true}'])assert.equal(api.request('POST','/api/students',payload).status,400);
const created=api.request('POST','/api/students','{"name":"  Kasun  ","email":" KASUN@EXAMPLE.COM "}');assert.equal(created.status,201);assert.equal(created.body.name,'Kasun');assert.equal(created.body.email,'kasun@example.com');assert.equal(created.headers.Location,'/api/students/3');
assert.equal(api.request('POST','/api/students','{"name":"Other","email":"KASUN@example.com"}').status,409);assert.equal(api.records.length,3);
assert.equal(api.request('PATCH','/api/students/3','{"name":"Kasun Silva","email":"kasun@example.com"}').status,200);
assert.equal(api.request('PATCH','/api/students/3','{"name":"Changed","email":"amali@example.com"}').status,409);assert.equal(api.records[2].name,'Kasun Silva');
assert.equal(api.request('DELETE','/api/students/3').status,204);assert.equal(api.request('GET','/api/students/3').status,404);
for(const id of ['0','-1','abc','9007199254740992'])assert.equal(api.request('GET','/api/students/'+id).status,400);
assert.equal(api.request('PUT','/api/students/1','{}').status,405);assert.equal(api.request('GET','/unknown').status,404);
for(const s of [...api.records])api.request('DELETE','/api/students/'+s.id);assert.equal(api.request('GET','/api/students').body.length,0);
const committed=transfer(20,false),rolled=transfer(20,true);assert.equal(committed.after.a,80);assert.equal(committed.after.b,40);assert.equal(rolled.after.a,100);assert.equal(rolled.after.b,20);assert.equal(transfer(101,false).ok,false);
for(const identity of ['valid','missing','invalid'])for(const permission of ['allowed','denied'])for(const csrf of ['valid','missing'])assert.equal(security(identity,permission,csrf).status,identity!=='valid'?401:permission!=='allowed'||csrf!=='valid'?403:200);
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'spring-java-check-'));
try{
  const examples=['Hello.java','StudentName.java','Counter.java','MessageSender.java','Notifier.java','StudentView.java'];
  const paths=[];
  for(const name of examples){const l=course.lessons.find(l=>l.file.split(' ·')[0]===name);assert.ok(l,name);const file=path.join(tmp,name);fs.writeFileSync(file,l.lines.join('\n'));paths.push(file);}
  const bodies=course.lessons.filter(l=>l.file.includes('method body fragment')).map(l=>`static void lesson${l.id}() {\n${l.lines.join('\n')}\n}`);
  const methods=course.lessons.filter(l=>l.file.startsWith('methods ·')||l.file.startsWith('exception ·')).map(l=>l.lines.join('\n'));
  const fragments=path.join(tmp,'Fragments.java');fs.writeFileSync(fragments,'public class Fragments {\n'+[...bodies,...methods].join('\n')+'\n}');paths.push(fragments);
  execFileSync('javac',['--release','17','-d',tmp,...paths],{encoding:'utf8'});
  assert.equal(execFileSync('java',['-cp',tmp,'Hello'],{encoding:'utf8'}).trim(),'Hello, Java!');
  console.log('PASS: 48 lessons and resources validated; CRUD/status/rollback/security models; six complete Java examples and seven fragment groups compile on Java 17; Hello runs.');
}finally{fs.rmSync(tmp,{recursive:true,force:true});}
