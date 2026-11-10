'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/build-curriculum.js'),'utf8'),context);
const {projects,lessons}=context.window.BUILD_CURRICULUM;
fs.mkdirSync(path.join(root,'assets/workbooks'),{recursive:true});
for(const p of Object.values(projects)){
  const body=[`# ${p.name} — Sinhala project workbook\n\nFollow these milestones in order. Final source files are a reference implementation; build your own copy separately.\n`];
  for(const l of lessons(p)){
    body.push(`## ${String(l.id+1).padStart(2,'0')}. ${l.title}\n\n${l.goal}\n`);
    for(const [title,text] of l.topics)body.push(`### ${title}\n\n${text}\n`);
    body.push(`### Code: ${l.file}\n\n\`\`\`text\n${l.code}\n\`\`\`\n`);
    l.notes.forEach((note,i)=>body.push(`${i+1}. ${note}`));
    body.push('\n### Practical\n');l.steps.forEach((step,i)=>body.push(`${i+1}. ${step}`));
    body.push(`\nExpected: ${l.expected}\n\nFix: ${l.fix}\n\nCheckpoint: ${l.quiz.question}\n`);
    l.quiz.options.forEach((option,i)=>body.push(`${i+1}. ${option}`));
    body.push(`\nAnswer: ${l.quiz.answer+1}. ${l.quiz.why}\n`);
    if(l.commands)for(const [shell,commands]of Object.entries(l.commands))body.push(`### ${shell} commands / ${l.where||'project root'}\n\n\`\`\`text\n${commands}\n\`\`\`\n`);
    if(l.ref)body.push(`Official reference: ${l.ref}\n`);
  }
  fs.writeFileSync(path.join(root,'assets/workbooks',p.folder+'.md'),body.join('\n'));
}
console.log('Exported all three Sinhala workbooks.');
