// Read-only to the workspace: real Git comparisons run inside a fresh /tmp repository.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const os=require('node:os');
const vm=require('node:vm');
const {execFileSync}=require('node:child_process');
const context={window:{}};vm.createContext(context);
for(const file of ['git-course.js','git-labs.js'])vm.runInContext(fs.readFileSync(path.resolve(__dirname,'../assets',file),'utf8'),context);
const course=context.window.GitCourse,{Sandbox,checkResolution}=context.window.GitLabs;
assert.equal(course.modules.length,20);assert.equal(course.lessons.length,40);
assert.equal(new Set(course.stages.flatMap(s=>s.modules)).size,20);
course.lessons.forEach((l,id)=>{
  assert.equal(l.id,id);assert.equal(l.module,Math.floor(id/2));assert.equal(l.topics.length,3);assert.ok(l.commands.length>=2);
  l.commands.forEach(([command,explanation])=>{assert.ok(command.length>0);assert.ok(explanation.length>8);});
  assert.ok(l.exercise.answer>=0&&l.exercise.answer<l.exercise.options.length);assert.ok(l.exercise.why.length>10);
});
const root=fs.mkdtempSync(path.join(os.tmpdir(),'git-academy-check-'));
const run=(...args)=>execFileSync('git',['-c','user.name=Git Academy Test','-c','user.email=test@example.invalid','-c','commit.gpgsign=false','-c','core.hooksPath=/dev/null',...args],{cwd:root,encoding:'utf8',env:{...process.env,GIT_CONFIG_GLOBAL:'/dev/null',GIT_CONFIG_NOSYSTEM:'1'}}).replace(/\n$/,'');
const write=(name,content)=>fs.writeFileSync(path.join(root,name),content);
try{
  run('init','-b','main');write('README.md','# Hello Git\n');run('add','README.md');run('commit','-m','Add project introduction');write('notes.txt','Learn one command at a time.\n');
  const model=new Sandbox();
  const compare=()=>assert.equal(model.status().join('\n'),run('status','--short'));
  compare();
  model.edit('README.md','# Version 2\n');write('README.md','# Version 2\n');compare();
  model.run('git add README.md');run('add','README.md');compare();
  model.edit('README.md','# Version 3\n');write('README.md','# Version 3\n');compare();assert.ok(model.status().includes('MM README.md'));
  model.run('git commit -m "Update README"');run('commit','-m','Update README');compare();
  assert.equal(model.head['README.md'],run('show','HEAD:README.md')+'\n');assert.equal(model.commits.at(-1).message,'Update README');
  model.run('git add .');run('add','.');compare();
  model.run('git restore --staged notes.txt');run('restore','--staged','notes.txt');compare();
  model.run('git restore --staged README.md');run('restore','--staged','README.md');compare();
  model.run('git restore README.md');run('restore','README.md');compare();
  const previous=JSON.stringify(model.head);model.run('git commit -m "Nothing staged"');assert.equal(JSON.stringify(model.head),previous);
  model.run('git push origin main');assert.ok(model.output.includes('Unsupported demo command'));
  assert.ok(model.diff(false).includes('No changes'));assert.ok(model.run('git log --oneline').includes('Update README'));
  for(const bad of ['', 'plain text', '<<<<<<< HEAD\n# Heading\n=======\n# Other\n>>>>>>> feature'])assert.equal(checkResolution(bad).ok,false);
  assert.equal(checkResolution('# Our team learns Git\n').ok,true);
  // Execute the workbook's branch, conflict and release journey in the same isolated repo.
  run('add','notes.txt');run('commit','-m','Add learning notes');
  run('switch','-c','feature/profile');write('profile.md','# Learner\n');run('add','profile.md');run('commit','-m','Add learner profile');run('switch','main');run('merge','feature/profile');
  run('switch','-c','conflict-demo');write('README.md','# Learn Git together\n');run('add','README.md');run('commit','-m','Use a team heading');run('switch','main');
  write('README.md','# Our learning project\n');run('add','README.md');run('commit','-m','Use a project heading');
  assert.throws(()=>run('merge','conflict-demo'));assert.ok(run('status','--short').includes('UU README.md'));
  write('README.md','# Our team learns Git\n');run('add','README.md');run('-c','core.editor=true','merge','--continue');run('tag','-a','v1.0.0','-m','First learning release');
  assert.equal(run('status','--short'),'');assert.equal(run('rev-list','--parents','-n','1','HEAD').split(' ').length,3);assert.equal(run('rev-parse','v1.0.0^{}'),run('rev-parse','HEAD'));
  console.log('PASS: 40 lessons validated; virtual staging/commit/unstage/restore match real Git; conflict validator; real branch, conflict-resolution, merge and tag workbook journey.');
}finally{fs.rmSync(root,{recursive:true,force:true});}
