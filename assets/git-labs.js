/* Deliberately bounded teaching models. No shell, filesystem or remote access. */
'use strict';
window.GitLabs = (() => {
  const clone = value => JSON.parse(JSON.stringify(value));
  const same = (a,b) => JSON.stringify(Object.entries(a).sort()) === JSON.stringify(Object.entries(b).sort());
  class Sandbox {
    constructor() { this.reset(); }
    reset() {
      this.head = {'README.md':'# Hello Git\n'};
      this.index = clone(this.head);
      this.work = {...this.head, 'notes.txt':'Learn one command at a time.\n'};
      this.commits = [{id:'demo001',message:'Add project introduction',tree:clone(this.head)}];
      this.output = 'BROWSER SIMULATION · files and commits exist only in memory.\n$ git status --short\n?? notes.txt';
    }
    edit(path, content) {
      if (!['README.md','notes.txt'].includes(path)) throw new Error('Unsupported virtual file');
      this.work[path] = content;
    }
    status() {
      return [...new Set([...Object.keys(this.head), ...Object.keys(this.index), ...Object.keys(this.work)])].sort().flatMap(path => {
        if (!(path in this.index) && path in this.work && !(path in this.head)) return ['?? ' + path];
        const x = this.head[path] === this.index[path] ? ' ' : !(path in this.head) ? 'A' : !(path in this.index) ? 'D' : 'M';
        const y = this.index[path] === this.work[path] ? ' ' : !(path in this.work) ? 'D' : !(path in this.index) ? '?' : 'M';
        return x === ' ' && y === ' ' ? [] : [x+y+' '+path];
      });
    }
    diff(staged) {
      const from = staged ? this.head : this.index, to = staged ? this.index : this.work;
      const paths = staged ? [...new Set([...Object.keys(from),...Object.keys(to)])] : Object.keys(from);
      return paths.sort().filter(path=>from[path]!==to[path]).map(path=>
        `--- ${path} (${staged?'HEAD':'index'})\n+++ ${path} (${staged?'index':'working tree'})\n`+
        (from[path]||'').split('\n').filter(Boolean).map(line=>'- '+line).join('\n')+'\n'+
        (to[path]||'').split('\n').filter(Boolean).map(line=>'+ '+line).join('\n')
      ).join('\n\n') || 'No changes in this comparison.';
    }
    run(input) {
      const command = input.trim(); let result;
      if (/^git status(?: --short)?$/.test(command)) result = (this.status().join('\n') || 'nothing to commit, working tree clean') + '\n\nX = index vs HEAD · Y = working tree vs index · ?? = untracked';
      else if (command === 'git diff') result = this.diff(false);
      else if (command === 'git diff --staged') result = this.diff(true);
      else if (/^git add (README\.md|notes\.txt|\.)$/.test(command)) {
        const path=command.slice(8);
        if(path === '.') this.index=clone(this.work); else this.index[path]=this.work[path];
        result='Staged '+path+' at its current content. Later edits still need another git add.';
      } else if (/^git restore --staged (README\.md|notes\.txt)$/.test(command)) {
        const path=command.slice(21);
        if(path in this.head) this.index[path]=this.head[path]; else delete this.index[path];
        result='Unstaged '+path+'. Working content was preserved.';
      } else if (/^git restore (README\.md|notes\.txt)$/.test(command)) {
        const path=command.slice(12);
        if(!(path in this.index)) result='Cannot restore an untracked path from the index.';
        else {this.work[path]=this.index[path];result='Working '+path+' replaced with the index snapshot. Unstaged edits discarded in this simulation.';}
      } else if (/^git commit -m ("[^"\n]*"|'[^'\n]*')$/.test(command)) {
        const message=command.slice(15,-1).trim();
        if(!message) result='Please supply a non-empty commit message.';
        else if(same(this.head,this.index)) result='Nothing staged to commit. Edit, save and git add first.';
        else {
          this.head=clone(this.index);
          const id='demo'+String(this.commits.length+1).padStart(3,'0');
          this.commits.push({id,message,tree:clone(this.head)});
          result=`[main ${id}] ${message}\nCommitted the index snapshot; unstaged edits remain outside this commit.`;
        }
      } else if (command==='git log --oneline') result=[...this.commits].reverse().map((c,i)=>`${c.id}${i===0?' (HEAD → main)':''} ${c.message}`).join('\n');
      else result='Unsupported demo command. Use the presets below. This is a small teaching model, not a full Git interpreter.';
      this.output='$ '+command+'\n\n'+result;
      return result;
    }
  }
  const graphScenarios = {
    ff: {
      title:'Fast-forward',
      before:'main A හි තිබෙනවා. feature branch එක A → B → C ලෙස ඉදිරියට ගිහින්. Main එකේ වෙනම commits නැහැ.',
      after:'Main pointer එක C වෙත ගියා. Feature සහ main එකම commit එකට යොමු වෙනවා. අලුත් merge commit එකක් නැහැ.',
      command:'git switch main\ngit merge feature/readme',
      nodes:[['A',70,90,'main'],['B',240,90,'main'],['C',410,90,'main']], edges:[[0,1,'main'],[1,2,'main']],
      labelsBefore:[['main',70,50],['feature/readme',375,140]], labelsAfter:[['main + feature/readme',280,50]]
    },
    merge: {
      title:'Three-way merge',
      before:'A common ancestor එකයි. Main එකේ B සහ feature එකේ C වෙන වෙනම තියෙන නිසා fast-forward කළ නොහැකියි.',
      after:'M merge commit එකේ parents B සහ C. Main දැන් M හි; feature branch එක C හිම තියෙනවා.',
      command:'git switch main\ngit merge feature/readme',
      nodes:[['A',60,85,'main'],['B',235,85,'main'],['C',235,180,'feature'],['M',430,85,'main']], edges:[[0,1,'main'],[0,2,'feature'],[1,3,'main'],[2,3,'feature']],
      labelsBefore:[['main',210,45],['feature/readme',200,220]], labelsAfter:[['main',405,45],['feature/readme',200,220]]
    },
    rebase: {
      title:'Rebase a private branch',
      before:'Main A → B ලෙසයි. Private feature එක A → C ලෙස වෙනම තියෙනවා. C change එක B මත replay කරන්න යනවා.',
      after:'Feature C′ අලුත් commit එකක්. Main B හිම තියෙනවා. C history එක replacement එකක් ලබාගත්තා; merge commit එකක් හදලා නැහැ.',
      command:'git switch feature/readme\ngit rebase main',
      nodes:[['A',60,85,'main'],['B',235,85,'main'],['C',235,180,'feature'],['C′',430,85,'feature']], edges:[[0,1,'main'],[0,2,'feature'],[1,3,'feature']],
      labelsBefore:[['main',210,45],['feature/readme',200,220]], labelsAfter:[['main',210,45],['feature/readme',360,140]]
    }
  };
  const conflict = '<<<<<<< HEAD\n# Our learning project\n=======\n# Learn Git together\n>>>>>>> feature/readme\n';
  function checkResolution(content) {
    if(/^(?:<{7}|={7}|>{7}|\|{7})/m.test(content)) return {ok:false,message:'Conflict markers තවම තියෙනවා. Final text තෝරලා marker lines සියල්ල ඉවත් කරන්න.'};
    if(!content.trim()) return {ok:false,message:'මේ exercise එකට project heading එකක් අවශ්‍යයි. අවශ්‍ය final content ලියන්න.'};
    if(!/^#\s+\S/m.test(content)) return {ok:false,message:'මේ README exercise එකේ # Project title වැනි Markdown heading එකක් තබන්න.'};
    return {ok:true,message:'✓ මේ exercise එකේ markers නැහැ සහ heading එකක් තියෙනවා. සැබෑ වැඩේදී final content review/test කර git add README.md සහ git merge --continue කරන්න. Text checks පමණක් semantic correctness තහවුරු කරන්නේ නැහැ.'};
  }
  return {Sandbox, graphScenarios, conflict, checkResolution};
})();
