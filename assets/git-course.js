/* Original Sinhala teaching content. Commands are displayed as text, never executed. */
'use strict';
window.GitCourse = (() => {
  const modules = [];
  const q = (question, options, answer, why) => ({question, options, answer, why});
  const l = (title, goal, topics, commands, steps, mistake, exercise) => ({title, goal, topics, commands, steps, mistake, exercise});
  function m(name, si, reference, lessons) {
    const id = modules.length;
    modules.push({id, name, si, reference, lessons:lessons.map((lesson, i) => ({...lesson, id:id*2+i, module:id}))});
  }
  m('Why version control?', 'Git කියන්නේ මොකක්ද?', 'https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control', [
    l('final-final-v3 වෙනුවට history එකක්', 'වෙනස්කම් හඳුනාගෙන කලින් වැඩක් ආපසු සොයාගන්න Git උදව් කරන විදිහ තේරුම් ගන්න.', [
      ['වෙනස්කම්වල කතාව', 'Project එකක කවුරු මොන දේ වෙනස් කළාද, ඇයි කළාද කියන කතාව version control එකේ තබනවා. Folder copies ගොඩක් වෙනුවට තෝරාගත් snapshots සුරකින්න පුළුවන්.'],
      ['Commit එක', 'Commit එක project snapshot එකට, message එකට සහ parent history එකට සම්බන්ධ object එකක්. Save කළ පමණින් commit වෙන්නේ නැහැ. ඔබ staging කර commit කරන දේ history එකට යනවා.'],
      ['Local first', 'Git වැඩ බොහොමයක් ඔබේ පරිගණකයේම කරන්න පුළුවන්. Remote copy එකක් සහ වෙනම backup එකක් වැදගත්; local repository එකක් තිබීමෙන් disk failure එකකට backup ලැබෙන්නේ නැහැ.']
    ], [['git --version','Install වී ඇති Git version එක බලයි.'],['git help tutorial','Terminal එකෙන් Git tutorial help එක විවෘත කරයි.']], ['ගැටලුව හඳුනාගන්න','වෙනස්කම් හදන්න','Snapshot එකක් තෝරන්න','History එකෙන් සසඳන්න'], 'File save කිරීම, Git commit කිරීම සහ remote එකකට push කිරීම වෙන වෙනම වැඩ තුනක්.', q('File එක save කළාම Git commit එකක් ස්වයංක්‍රීයව හැදෙනවාද?', ['ඔව්','නැහැ; stage කර commit කළ යුතුයි','GitHub open නම් ඔව්'], 1, 'Editor එක file සුරකිනවා. Commit එක ඔබ තෝරාගත් staged snapshot එක සුරකිනවා.')),
    l('Git සහ GitHub වෙන් කරගමු', 'Tool එක, repository එක සහ hosting service එකේ වගකීම් වෙන් කරන්න.', [
      ['Git', 'Git version control tool එකයි. Working files සහ .git metadata එක්ක local repository එකක් හදා commit, branch සහ merge කරන්න පුළුවන්.'],
      ['GitHub', 'GitHub Git repositories host කරන platform එකක්. Pull requests, review සහ issues වැනි collaboration tools එහි තියෙනවා. GitLab සහ වෙනත් hosts ද භාවිතා කළ හැකියි.'],
      ['මේ පාඨමාලාව', 'Lessons සහ browser labs offline වැඩ කරනවා. සැබෑ Git commands සඳහා Git install කරන්න. GitHub account එකක් අවශ්‍ය වෙන්නේ hosted collaboration පියවරවලදී පමණයි.']
    ], [['git init -b main demo','නව demo folder එකක local repository එකක් සාදයි; GitHub අවශ්‍ය නැහැ.'],['git -C demo status','demo repository එකේ තත්ත්වය කියවයි.']], ['Git install කරන්න','Local repo එකක් හදන්න','History එක ඉගෙන ගන්න','Remote collaboration එකතු කරන්න'], 'Commit එකක් local තියෙනවා කියලා GitHub එකේත් තියෙනවා යැයි නොසිතන්න.', q('GitHub account එකක් නැතිව local commits කරන්න පුළුවන්ද?', ['බැහැ','Internet තිබුණොත් පමණයි','පුළුවන්'], 2, 'Local Git workflow එකට hosting account එකක් අවශ්‍ය නැහැ.'))
  ]);
  m('Install & configure', 'වැඩට සූදානම් වෙමු', 'https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup', [
    l('Terminal එකේ පළමු පියවර', 'Git install එක සහ command run කරන folder එක පරීක්ෂා කරන්න.', [
      ['Install', 'git-scm.com හි ඔබේ OS එකට අදාළ installation guidance භාවිතා කරන්න. Windows හි Git Bash හෝ PowerShell, macOS/Linux හි terminal එක භාවිතා කළ හැකියි.'],
      ['Folder එක', 'Terminal current directory එක command එකේ බලපෑම තීරණය කරනවා. Prompt එක command එකේ කොටසක් නෙවෙයි. Practice සඳහා අලුත් learning folder එකක් ගන්න.'],
      ['Shell වෙනස්කම්', 'macOS/Linux/Git Bash හි pwd සහ ls; PowerShell හි Get-Location සහ Get-ChildItem; CMD හි cd සහ dir. Git commands නම් මේ shells අතර බොහෝවිට එකමයි.']
    ], [['git --version','Git terminal PATH එකෙන් ලබාගත හැකිද බලයි.'],['mkdir git-learning','Practice සඳහා නව folder එකක් සාදයි.'],['cd git-learning','Learning folder එකට මාරු වෙයි.']], ['Terminal එක අරින්න','Git version බලන්න','Practice folder හදන්න','Current path තහවුරු කරන්න'], 'git: command not found නම් install/PATH බලලා terminal නැවත විවෘත කරන්න.', q('Command එක බලපාන repository එක තීරණය වන්නේ?', ['Terminal current folder එකෙන්','Browser tab එකෙන්','Commit message එකෙන්'], 0, 'Git current directory එකෙන් repository context එක සොයනවා.')),
    l('නම, email සහ config scope', 'Commit identity configure කර config එක ආවේ කොහෙන්ද කියලා බලන්න.', [
      ['Commit identity', 'user.name සහ user.email commit author metadata සඳහායි. GitHub login password එකක් හෝ remote permission එකක් මේ config එකෙන් ලැබෙන්නේ නැහැ.'],
      ['Global සහ local', '--global config එක ඔබේ user account repos සඳහා default වෙනවා. Repo ඇතුළේ --local value එකෙන් ඒ repository එකට වෙනස් identity දෙන්න පුළුවන්.'],
      ['Privacy', 'Publish කරන commits වල email පෙනෙන්න පුළුවන්. GitHub noreply address භාවිතා කරනවා නම් ඔබේ account settings හි දෙන නිවැරදි address එක ගන්න.']
    ], [['git config --global user.name "Your Name"','ඔබේ නම යොදා global author name set කරයි.'],['git config --global user.email "you@example.com"','ඔබ භාවිතා කරන email එක දාන්න; මෙය sample එකක්.'],['git config --global init.defaultBranch main','ඉදිරියේ හදන repositories වල default initial branch නම set කරයි.'],['git config --list --show-origin','Effective settings සහ ඒවා ආ source files බලයි.']], ['Identity තෝරන්න','Config scope තෝරන්න','Values set කරන්න','Origin සමඟ verify කරන්න'], 'Sample identity copy කර ඔබේ actual commits publish කරන්න එපා. Config identity එක remote authentication එකක් නොවේ.', q('--local config value එක බලපාන්නේ?', ['සියලු GitHub accounts වලට','එම repository එකට','හැම පරිගණකයකටම'], 1, 'Repository config එක ඒ repo එකේ global default override කරන්න පුළුවන්.'))
  ]);
  m('Create & clone', 'Repository එකක් හදාගමු', 'https://git-scm.com/docs/git-init', [
    l('අලුත් repository එකක්', 'අලුත් sandbox folder එකක main branch එකෙන් Git අරඹන්න.', [
      ['init', 'git init .git metadata හදනවා. Existing application files delete කරන්නේ නැහැ. මේ course practice එක අලුත් folder එකක කරන්න.'],
      ['Initial branch', '-b main මඟින් initial branch නම පැහැදිලිව දෙන්න. පළමු commit එකට පෙර branch එකට history commit එකක් තවම නැහැ.'],
      ['Repository root', '.git folder එක project history එකයි. ඒක අතින් edit හෝ delete කිරීමෙන් history access නැති විය හැකියි. Source files එක්ක එහි වගකීම වෙන්කරන්න.']
    ], [['mkdir hello-git','අලුත් sandbox folder එකක් සාදයි.'],['cd hello-git','එම folder එකට යයි.'],['git init -b main','main නමින් initial branch එකක් සමඟ initialize කරයි.'],['git status','Repo එක සහ files වල තත්ත්වය බලයි.']], ['අලුත් folder එකක්','Initialize කරන්න','README.md ලියන්න','Status බලන්න'], 'Parent folder එකේ වැරදීමෙන් git init කරන්න එපා. Current path බලන්න.', q('git init එකෙන් files GitHub එකට upload වෙනවාද?', ['ඔව්','README එක පමණක්','නැහැ'], 2, 'init local repository metadata සාදනවා. Remote transfer වෙනමයි.')),
    l('Existing project එක clone කරමු', 'Remote repository එකක local copy එකක් ගන්න.', [
      ['clone', 'Clone එක repository history සහ working checkout එකක් ලබාදෙනවා. Default ලෙස origin remote එක configure කරනවා.'],
      ['Destination', 'Clone command එක parent folder එකේ run කරන්න. Git අලුත් child folder එකක් හදනවා. Existing non-empty folder එකක් destination කරගන්න එපා.'],
      ['Access', 'Private repository එකක් clone කරන්න permission සහ authentication අවශ්‍යයි. Public read access තිබුණත් push access ලැබෙන්නේ නැහැ.']
    ], [['git clone https://github.com/OWNER/REPOSITORY.git','OWNER/REPOSITORY ඔබට access ඇති actual repo path එකෙන් replace කරන්න.'],['cd REPOSITORY','Clone වූ project folder එකට යයි; actual folder නම භාවිතා කරන්න.'],['git remote -v','Configured origin URL එක කියවයි.'],['git status','Checked-out branch සහ local changes බලයි.']], ['Repository URL ගන්න','Parent folder තෝරන්න','Clone කරන්න','Origin පරීක්ෂා කරන්න'], 'Placeholder URL එක actual repository එකක් නෙවෙයි. Clone failure නම් URL, access සහ credentials බලන්න.', q('Clone කළ පසු default remote නම සාමාන්‍යයෙන්?', ['origin','HEAD','staged'], 0, 'origin convention එකක්; Git host එකේ නමක් නෙවෙයි.'))
  ]);
  m('Working tree & staging', 'Commit එකට යන දේ තෝරමු', 'https://git-scm.com/docs/git-add', [
    l('Working tree, index, HEAD', 'Git තුළ සසඳන snapshots තුන වෙන්කර හඳුනාගන්න.', [
      ['Working tree', 'Editor එකෙන් දැනට වෙනස් කරන files ඔබේ working tree එකයි. Untracked files තවම Git index එකේ නැහැ.'],
      ['Index / staging area', 'ඊළඟ commit එකට යන්න තෝරපු snapshot එක index එකේ තියෙනවා. git add කළ වෙලාවේ content එක stage වෙනවා.'],
      ['HEAD', 'සාමාන්‍ය branch workflow එකක HEAD current branch එකටත්, branch එක latest commit එකටත් යොමු වෙනවා. Commit එකක් කරන විට index snapshot එක history එකට එකතු වෙනවා.']
    ], [['git status --short','Index සහ working tree තත්ත්වය කෙටියෙන් පෙන්වයි.'],['git add README.md','README.md හි මේ මොහොතේ content stage කරයි.'],['git diff --staged','Index එක සහ HEAD commit එක අතර වෙනස පෙන්වයි.']], ['File edit කරන්න','git add කරන්න','Staged diff බලන්න','Snapshot commit කරන්න'], 'Stage කළ පසු ආයෙත් edit කළොත් අලුත් edit එක ස්වයංක්‍රීයව staged වෙන්නේ නැහැ.', q('git add කළ පසු නැවත edit කළ content එක ඊළඟ commit එකට යවන්නේ?', ['Save කළ පමණින්','නැවත git add කරලා','git log කරලා'], 1, 'Index එක add කළ මොහොතේ snapshot එක තබනවා.')),
    l('Stage සහ unstage කරමු', 'File selection එක review කර working edits තබාගෙන unstage කරන්න.', [
      ['Explicit files', 'මුලින් git add filename භාවිතා කර මොන files යනවාද දැනගන්න. git add . current folder සහ එයට යටින් ඇති වෙනස්කම් stage කරනවා.'],
      ['Partial changes', 'git add -p මඟින් tracked file එකක hunks තෝරන්න පුළුවන්. එක file එකේ වෙනස් user stories commits දෙකකට වෙන් කිරීමට උදව් වෙනවා.'],
      ['Unstage', 'Existing HEAD commit එකක් ඇති repo එකක git restore --staged path මඟින් index එක HEAD අනුව reset කරනවා; working file edits තබනවා.']
    ], [['git add README.md','README එක stage කරයි.'],['git restore --staged README.md','HEAD snapshot එකෙන් index entry නැවත සකස් කරයි; working changes තබයි.'],['git status --short','Unstaged changes පවතින බව බලයි.']], ['Scope තෝරන්න','Stage කරන්න','Review කරන්න','අවශ්‍ය නම් unstage කරන්න'], 'git restore README.md සහ git restore --staged README.md එකම දෙයක් නෙවෙයි. Target එක බලන්න.', q('Working edits නොමකා unstage කිරීමට?', ['git restore README.md','git push','git restore --staged README.md'], 2, '--staged index එකට බලපානවා. Working tree එකට ඒ command එකෙන් overwrite කරන්නේ නැහැ.'))
  ]);
  m('Your first commits', 'වැඩේට හේතුවක් ලියමු', 'https://git-scm.com/docs/git-commit', [
    l('පළමු snapshot එක සුරකිමු', 'Staged changes අර්ථවත් message එකක් සමඟ commit කරන්න.', [
      ['Review first', 'git diff --staged බලලා intended changes පමණක්ද තහවුරු කරන්න. Temporary files සහ credentials commit නොකරන්න.'],
      ['Message', 'Message එක කෙටි නමුත් පැහැදිලි action එකක් කියන්න: Add project introduction වගේ. අවශ්‍ය නම් body එකේ හේතුව සහ behavior විස්තර කරන්න.'],
      ['After commit', 'Commit ID එක content/history මත හදන identifier එකක්. Commit එක local history එකේ තිබුණත් remote එකට තවම යන්නේ නැහැ.']
    ], [['git add README.md','README snapshot එක stage කරයි.'],['git diff --staged','Commit එකට යන content review කරයි.'],['git commit -m "Add project introduction"','Index snapshot එක සහ message එක history එකට සුරකියි.'],['git status','ඉතිරි changes තියෙනවාද බලයි.']], ['Stage කරන්න','Diff review කරන්න','Message ලියන්න','Commit verify කරන්න'], 'Nothing to commit නම් save/staging සහ current repo බලන්න. Empty commit එකක් හදන එක සාමාන්‍ය fix එක නොවේ.', q('Commit එකේ files ගන්නේ කොහෙන්ද?', ['Index / staging area එකෙන්','හැමවිටම working folder එකේ සියල්ල','GitHub issues වලින්'], 0, 'සාමාන්‍ය git commit index snapshot එක සුරකිනවා.')),
    l('කුඩා commits සහ amend', 'එක් අරමුණක් බැගින් commits හදලා unpublished latest commit එක නිවැරදි කරන්න.', [
      ['One purpose', 'Feature එකක්, bug fix එකක් හෝ docs change එකක් වෙන් කර commit කරන්න. Review සහ revert කරන වැඩ පහසු වෙනවා.'],
      ['Amend', 'git commit --amend latest commit එකට replacement commit එකක් හදනවා. Message හෝ staged content වෙනස් කළ හැකියි; commit ID වෙනස් වෙනවා.'],
      ['Shared history', 'දැනටමත් share කළ commit එක amend කළොත් history rewrite වෙනවා. Team එක භාවිතා කරන history සඳහා සාමාන්‍යයෙන් follow-up commit එකක් වඩා පහසුයි.']
    ], [['git log -1 --oneline','Latest commit එක බලයි.'],['git commit --amend -m "Clarify project introduction"','Unpublished latest commit එකට අලුත් message සහිත replacement එකක් හදයි.'],['git log -1 --oneline','Commit ID/message වෙනස් වී ඇති බව බලයි.']], ['Scope වෙන් කරන්න','Latest commit බලන්න','Unpublished නම් amend කරන්න','අලුත් ID බලන්න'], 'Amend කළ commit එක published නම් අනුමැතිය නැති history rewrite එකක් කර force push කරන්න එපා.', q('Amend කිරීමෙන් commit ID එක?', ['සැමවිටම එකමයි','Replacement commit එකක ID එක ලැබෙයි','Branch නමට මාරු වෙයි'], 1, 'Commit metadata හෝ snapshot වෙනස් කළ විට අලුත් commit object එකක් සාදනවා.'))
  ]);
  m('Read history & diffs', 'වෙනස් වුණේ මොකක්ද?', 'https://git-scm.com/docs/git-diff', [
    l('Status සහ diff කියවමු', 'Unstaged සහ staged changes අතර වෙනස evidence එකෙන් බලන්න.', [
      ['Status codes', 'git status --short හි පළමු column එක index තත්ත්වය; දෙවැනි එක working tree තත්ත්වයයි. ?? untracked file එකක්. MM නම් stage කළාට පසුත් file එක edit කරලා.'],
      ['Two comparisons', 'git diff working tree එක index එක සමඟ සසඳනවා. git diff --staged index එක HEAD සමඟ සසඳනවා. git diff HEAD tracked working state එක HEAD සමඟ බලනවා.'],
      ['Read the patch', '+ අලුත් line එකක්, - ඉවත් කළ line එකක්. Diff context එක අසල lines පෙන්වනවා. සාමාන්‍ය diff එකෙන් untracked file content පෙන්වන්නේ නැහැ.']
    ], [['git status --short','Snapshot boundaries දෙකේ changes පෙන්වයි.'],['git diff','Unstaged tracked changes පෙන්වයි.'],['git diff --staged','ඊළඟ commit එකට යන patch එක පෙන්වයි.'],['git diff HEAD -- README.md','HEAD සිට tracked README working content වෙනස පෙන්වයි.']], ['Status බලන්න','Unstaged diff බලන්න','Staged diff බලන්න','Scope තහවුරු කරන්න'], 'git diff හි output නැති නිසා changes කිසිවක් නැහැ කියන්න එපා; staged හෝ untracked දේ තියෙන්න පුළුවන්.', q('git diff --staged සසඳන්නේ?', ['Index සහ HEAD','GitHub සහ GitLab','Working tree සහ browser'], 0, 'Staged snapshot එක HEAD commit එකට සාපේක්ෂව review කරනවා.')),
    l('Log, graph සහ show', 'Commit history කියවලා එක් commit එකක patch එක බලන්න.', [
      ['Log', '--oneline සංක්ෂිප්ත history එකක් දෙයි. --graph සහ --all branch relationships බලන්න උදව් වෙනවා.'],
      ['Show', 'git show HEAD latest commit metadata සහ patch පෙන්වනවා. Specific commit ID එකක් ද භාවිතා කළ හැකියි.'],
      ['Pager', 'Long output pager එකක විවෘත විය හැකියි. q මඟින් pager එකෙන් පිටවෙන්න. Prompt ආපසු නොපෙනුණොත් process hang වුණා කියලා නොසිතන්න.']
    ], [['git log --oneline --graph --decorate --all','Branches සහ commit relationships කෙටියෙන් පෙන්වයි.'],['git show HEAD','Current commit එකේ විස්තර සහ patch පෙන්වයි.'],['git log --oneline -- README.md','README.md සම්බන්ධ path-filtered history බලයි.']], ['History කියවන්න','Commit තෝරන්න','Patch බලන්න','හේතුව message එකෙන් ගන්න'], 'Commit IDs examples අතර වෙනස් වෙනවා. Course එකේ sample hash අන්ධව copy කරන්න එපා.', q('Latest commit එකේ patch එක බලන්න?', ['git add HEAD','git show HEAD','git init HEAD'], 1, 'show commit metadata සහ change patch බලන්න භාවිතා කරනවා.'))
  ]);
  m('Ignore generated files', 'Repo එක පිරිසිදුව තබමු', 'https://git-scm.com/docs/gitignore', [
    l('.gitignore ලියමු', 'Generated files සහ local config version history එකෙන් වෙන් කරන්න.', [
      ['Patterns', '.gitignore file එකේ node_modules/, .venv/ සහ local generated output වැනි patterns තබන්න. Ignore rules untracked paths සඳහා ප්‍රධානව බලපානවා.'],
      ['Secrets', '.env ignore කර sanitized .env.example එකක් commit කරන්න පුළුවන්. Ignore rules secret protection guarantee එකක් නෙවෙයි; staged diff එකත් review කරන්න.'],
      ['Verify', 'git check-ignore -v path මඟින් matching rule එක හඳුනාගන්න. Lock files වැනි project එකට වැදගත් දේ අහම්බෙන් ignore නොකරන්න.']
    ], [['git status --ignored --short','Ignored paths ද ඇතුළත්ව තත්ත්වය බලයි.'],['git check-ignore -v .env','නොtracked .env path එකට බලපාන ignore rule එක පෙන්වයි.'],['git add .gitignore','Team එකට share කරන ignore rules stage කරයි.']], ['Generated paths හඳුනාගන්න','Rules ලියන්න','Ignore result පරීක්ෂා කරන්න','Rules commit කරන්න'], '.gitignore එකේ නම දැමූ පමණින් දැනටමත් tracked file එක history එකෙන් ඉවත් වෙන්නේ නැහැ.', q('.gitignore දාපු tracked file එක?', ['ස්වයංක්‍රීයව history එකෙන් මැකෙයි','Encrypt වෙයි','තවම tracked වෙයි'], 2, 'Ignore rules දැනට tracked content ඉවත් කරන්නේ නැහැ.')),
    l('Tracked file එක නවත්වමු', 'Working copy තබාගෙන index එකෙන් path එක ඉවත් කිරීම තේරුම් ගන්න.', [
      ['Cached removal', 'git rm --cached path index එකෙන් file එක ඉවත් කරනවා. Working file එක තබනවා; next commit එකෙන් tracked deletion එක share වෙනවා.'],
      ['Team impact', 'Removal commit එක team එකටත් බලපානවා. ඒ file එක නැතිව project එක configure කරන ක්‍රමය template/docs මඟින් දෙන්න.'],
      ['Already exposed', 'Secret එකක් publish වුණා නම් revoke/rotate කිරීම ප්‍රමුඛයි. Latest file එක remove කළ පමණින් පැරණි history හෝ remote copies වලින් එය ඉවත් නොවේ.']
    ], [['git rm --cached .env','දැනට tracked .env එක index එකෙන් ඉවත් කර working copy තබයි.'],['git add .gitignore','ඉදිරියේ file එක නැවත stage වීම වැළැක්වීමට rule එක stage කරයි.'],['git diff --staged','Tracked deletion සහ ignore rule review කරයි.']], ['Tracked state බලන්න','Ignore rule ලියන්න','Cached removal කරන්න','Review කර commit කරන්න'], 'Published secret එකක් ඉවත් කළාට පසුත් ඒ credential එක භාවිතා නොකරන්න; එය rotate කරන්න.', q('git rm --cached file එකෙන් working file එක?', ['සාමාන්‍යයෙන් තබනවා','සැමවිටම delete කරනවා','Remote එකට copy කරනවා'], 0, '--cached index එකෙන් path එක remove කරනවා; working file එකේ copy තබනවා.'))
  ]);
  m('Branches & HEAD', 'අලුත් වැඩකට අලුත් පාරක්', 'https://git-scm.com/docs/git-switch', [
    l('Feature branch එකක් හදමු', 'Main history එකෙන් අලුත් වැඩක් වෙන් කර පටන් ගන්න.', [
      ['Branch pointer', 'Branch එක commit එකකට යොමු වෙන නමක්. මුළු project එකේ duplicate copy එකක් හදන එකක් නොවේ.'],
      ['Switch', 'git switch -c නව branch එක හදා ඒකට මාරු වෙනවා. Commits කරන විට current branch pointer එක ඉදිරියට යනවා.'],
      ['Working changes', 'Branch switch කිරීමට පෙර status බලන්න. Local edits overwrite විය හැකි නම් Git switch එක නවත්වනවා. Commit හෝ stash කර පසුව මාරු වන්න.']
    ], [['git status','Switch කිරීමට පෙර local state බලයි.'],['git switch -c feature/readme','Current commit එකෙන් branch එකක් හදා මාරු වෙයි.'],['git branch --show-current','Current branch නම පෙන්වයි.']], ['Clean state බලන්න','Branch හදන්න','Feature edit කරන්න','Feature commit කරන්න'], 'Branch එකක් හදපු පමණින් commit එකක් හදන්නේ නැහැ.', q('git switch -c feature/readme කරන්නේ?', ['Branch එකක් හදා ඒකට මාරු වීම','Remote එක delete කිරීම','Commit එක upload කිරීම'], 0, '-c create සහ switch කරනවා.')),
    l('Branch names සහ detached HEAD', 'Branch list එක කියවා commit එකක් පමණක් checkout කළ තත්ත්වය තේරුම් ගන්න.', [
      ['Names', 'feature/readme හෝ fix/login වැනි අරමුණ පැහැදිලි නම් තෝරන්න. Branch නම remote URL එකක් නෙවෙයි.'],
      ['Detached HEAD', 'Specific commit එකක් detach කර බලන විට HEAD branch එකකට වෙනුවට commit එකට යොමු වෙනවා. අලුත් වැඩ තබාගැනීමට branch එකක් හදන්න.'],
      ['Cleanup', 'Merge කළ local branch එක -d මඟින් delete කළ හැකියි. Current branch එක delete කළ නොහැකියි. -D force delete කරන්නේ තත්ත්වය තේරුම් ගෙන පමණක්.']
    ], [['git branch --all','Local සහ remote-tracking branch names බලයි.'],['git switch --detach HEAD~1','Parent commit එක inspect කිරීමට detach කරයි; parent එකක් තිබිය යුතුයි.'],['git switch -c investigation','Detached state එකේ වැඩ branch නමක් යටතේ තබයි.']], ['Branch context බලන්න','Commit inspect කරන්න','වැඩ තබාගැනීමට branch හදන්න','Normal workflow එකට එන්න'], 'Detached state එකේ commits කර වෙනත් branch එකකට යෑමට පෙර branch නමක් දී ඒවා retain කරන්න.', q('Detached HEAD හි අලුත් commits තබාගැනීමට?', ['.git මකන්න','අලුත් branch එකක් හදන්න','Browser refresh කරන්න'], 1, 'Branch pointer එකක් මඟින් commit chain එකට නමක් දෙන්න පුළුවන්.'))
  ]);
  m('Merging branches', 'වැඩ නැවත එකතු කරමු', 'https://git-scm.com/docs/git-merge', [
    l('Fast-forward merge', 'Target branch එකේ සිට source branch එක integrate කරන්න.', [
      ['Direction', 'Merge කරන විට current branch target එකයි. Main එකට feature එක ගන්න නම් main වෙත switch කර git merge feature/readme run කරන්න.'],
      ['Fast-forward', 'Main tip එක feature tip එකේ ancestor නම් main pointer එක ඉදිරියට ගෙන යා හැකියි. සාමාන්‍ය default workflow එකේ අලුත් merge commit එකක් අවශ්‍ය නොවේ.'],
      ['After merge', 'Tests run කර graph බලන්න. Feature branch නම ඉතිරි විය හැකියි; merge කිරීම branch name එක ස්වයංක්‍රීයව delete කරන්නේ නැහැ.']
    ], [['git switch main','Changes ලැබිය යුතු target branch එකට මාරු වෙයි.'],['git merge feature/readme','Feature history main එකට integrate කරයි.'],['git log --oneline --graph --all','Pointer සහ history බලයි.']], ['Target තෝරන්න','Source merge කරන්න','Tests run කරන්න','Graph verify කරන්න'], 'වැරදි branch එකේ merge කළොත් integrate වෙන direction එක වෙනස්. මුලින් current branch බලන්න.', q('Main එකට feature එක merge කිරීමට current branch විය යුත්තේ?', ['feature/readme','origin','main'], 2, 'Merge result එක current branch එකේ ඉතිහාසයට එකතු වෙනවා.')),
    l('Three-way merge සහ parents', 'Branches දෙකේම commits තිබියදී merge commit එකේ අර්ථය බලන්න.', [
      ['Divergence', 'Common ancestor එකෙන් පසු branches දෙකේම වෙනස් commits තිබුණොත් pointer එක ඉදිරියට ගෙනයාම පමණක් ප්‍රමාණවත් නැහැ.'],
      ['Merge result', 'Git merge base, ours සහ theirs සසඳනවා. Clean merge එකක් නම් changes එකතු කර parents දෙකක් ඇති commit එකක් හදන්න පුළුවන්.'],
      ['Conflict is normal', 'එකම ප්‍රදේශයේ incompatible edits නම් user decision අවශ්‍යයි. Conflict එක history නැතිවීමක් නෙවෙයි; merge එක තවම අවසන් නැති තත්ත්වයක්.']
    ], [['git log --oneline --graph --all','Diverged branches හඳුනාගනී.'],['git merge feature/readme','Changes reconcile කිරීමට උත්සාහ කරයි.'],['git show --no-patch --format="%h %p %s" HEAD','Latest commit ID, parent IDs සහ subject පෙන්වයි.']], ['Common base හඳුනාගන්න','Branch changes සසඳන්න','Merge result තීරණය කරන්න','Parents verify කරන්න'], 'Merge commit එකක් තිබීම conflict එකක් තිබුණා කියන සාක්ෂියක් නෙවෙයි.', q('සාමාන්‍ය two-branch merge commit එකේ parents කීයක්ද?', ['දෙකක්','ශූන්‍යයි','දහයක්'], 0, 'Merge commit එක histories දෙකේ tips parent ලෙස සම්බන්ධ කරනවා.'))
  ]);
  m('Resolve conflicts', 'Conflict එකක් බය නැතිව හදමු', 'https://git-scm.com/docs/git-merge', [
    l('Markers කියවා result එක තෝරමු', 'Conflict markers ඉවත් කර අවශ්‍ය final content එක ලියන්න.', [
      ['Markers', 'සාමාන්‍ය merge එකක <<<<<<< HEAD පසු current side, ======= පසු incoming side සහ >>>>>>> source label එක පෙනෙනවා. Tool/config අනුව extra base section එකක් ද පෙනෙන්න පුළුවන්.'],
      ['Final result', 'එක් side එකක් හෝ දෙකේ හොඳ කොටස් එකතු කළ result එකක් තෝරන්න. Markers remove කළ පමණින් logic නිවැරදිද කියලා තීරණය වෙන්නේ නැහැ; content සහ tests බලන්න.'],
      ['Stage resolution', 'Resolved file save කර git add path කරන්න. ඒක resolution එක index එකට දානවා. ඉන්පසු merge continue/commit කරන්න.']
    ], [['git status','Unmerged paths හඳුනාගනී.'],['git diff','Conflict context කියවයි.'],['git add README.md','Editor එකෙන් නිවැරදි කර save කළ README resolution එක stage කරයි.'],['git merge --continue','Staged resolutions සමඟ merge එක අවසන් කරයි.']], ['Conflict කියවන්න','Final text ලියන්න','Stage resolution කරන්න','Merge අවසන් කරන්න'], 'Conflict markers තියෙද්දී git add කළත් Git ඒවා literal text ලෙස stage කරන්න පුළුවන්. Review සහ tests කරන්න.', q('Resolution එක editor එකේ save කළ පසු?', ['තවම git add කර merge continue කළ යුතුයි','ස්වයංක්‍රීයව push වෙයි','Branch එක delete වෙයි'], 0, 'Save, stage සහ merge completion වෙන වෙනම boundaries.')),
    l('Abort සහ merge recovery', 'අවශ්‍ය නම් merge එක නවතා නැවත පැහැදිලි තත්ත්වයකින් පටන් ගන්න.', [
      ['Pause and inspect', 'Conflict එකේදී status සහ diff බලන්න. දැනට merge operation එකක්ද, rebase එකක්ද යන්න හඳුනාගන්න. Continue/abort commands operation එකට ගැළපෙන්න ඕන.'],
      ['Abort', 'git merge --abort පවතින merge එක නවතා පෙර තත්ත්වය යළි සකස් කිරීමට උත්සාහ කරනවා. Merge පෙර local edits තිබුණොත් ඒවා නැවත සකස් කිරීම අසීරු විය හැකියි.'],
      ['Start clean', 'Merge පටන් ගන්න කලින් commit හෝ stash කිරීමෙන් original work වෙන්කර තබන්න. අදාළ teammate සමඟ intended behavior පැහැදිලි කරගන්න.']
    ], [['git status','Operation එක සහ unresolved files බලයි.'],['git merge --abort','In-progress merge එක නවතා pre-merge state යළි සකස් කිරීමට උත්සාහ කරයි.'],['git status','Abort පසු actual state නැවත බලයි.']], ['Operation හඳුනාගන්න','වැදගත් edits ආරක්ෂා කරන්න','Abort කරන්න','Status verify කරන්න'], 'Merge --abort සහ rebase --abort interchangeably භාවිතා කරන්න එපා.', q('දැනට merge එකක් පවතින විට ඒක නවත්වන්නේ?', ['git push --abort','git merge --abort','git init --abort'], 1, 'Continue/abort command එක current operation එකට අදාළ විය යුතුයි.'))
  ]);
  m('Remotes & authentication', 'Local සහ remote සම්බන්ධ කරමු', 'https://git-scm.com/docs/git-remote', [
    l('Origin එක configure කරමු', 'Remote නමක් සහ repository URL එකක් සම්බන්ධ කරන්න.', [
      ['Remote alias', 'origin යනු URL එකට දෙන local alias එකක්. එක් repo එකකට origin සහ upstream වැනි remotes කිහිපයක් තිබිය හැකියි.'],
      ['Remote-tracking ref', 'origin/main ඔබේ local repo එකේ remote main ගැන අවසන් දැනගත් තත්ත්වයයි. Server එකේ live branch එකට හැමවිටම සමාන නොවිය හැකියි.'],
      ['No transfer yet', 'Remote add කිරීමෙන් commits download හෝ upload වෙන්නේ නැහැ. Fetch සහ push වෙනම run කළ යුතුයි.']
    ], [['git remote -v','Configured remotes කියවයි.'],['git remote add origin https://github.com/OWNER/REPOSITORY.git','ඔබ සාදා ඇති actual repo URL එක origin ලෙස එකතු කරයි.'],['git remote get-url origin','Origin URL තහවුරු කරයි.']], ['Host එකේ repo හදන්න','Actual URL copy කරන්න','Remote add කරන්න','URL verify කරන්න'], 'remote origin already exists නම් තව add නොකර git remote -v බලලා actual URL නිවැරදිද තහවුරු කරන්න.', q('git remote add එකෙන් commits upload වෙනවාද?', ['ඔව්','Main එක පමණයි','නැහැ'], 2, 'Remote configuration එක සහ data transfer එක වෙනම වැඩ.')),
    l('HTTPS, SSH සහ permissions', 'Remote login issue එකක් identity config එකෙන් වෙන්කර හඳුනාගන්න.', [
      ['HTTPS', 'GitHub HTTPS සඳහා credential manager/browser flow හෝ appropriate token භාවිතා කළ හැකියි. Account password එක Git command-line GitHub authentication සඳහා භාවිතා නොකරන්න.'],
      ['SSH', 'Public key එක account එකට register කරනවා; private key එක ඔබ ළඟ ආරක්ෂා කරනවා. SSH host fingerprint එක official source එකෙන් verify කරන්න.'],
      ['Permissions', 'Authentication identity තහවුරු කරනවා; authorization repo එකේ push වැනි action එකට අවසර තීරණය කරනවා. Correct login තිබුණත් read-only access විය හැකියි.']
    ], [['git remote get-url origin','HTTPS ද SSH ද යන්න URL එකෙන් හඳුනාගනී.'],['git ls-remote origin','Remote read access සහ advertised refs පරීක්ෂා කරයි; local branches update නොකරයි.']], ['Transport බලන්න','Credential flow සකස් කරන්න','Read access test කරන්න','Write permission තහවුරු කරන්න'], 'Tokens හෝ private keys URL, screenshots, commits හෝ course input fields වලට දාන්න එපා.', q('user.email config එක වෙනස් කිරීමෙන් GitHub push permission ලැබෙනවාද?', ['නැහැ','ඔව්','Email එක දිග නම්'], 0, 'Commit author metadata සහ remote account permissions එකිනෙකට වෙනස්.'))
  ]);
  m('Fetch, pull & push', 'Team changes හුවමාරු කරමු', 'https://git-scm.com/docs/git-pull', [
    l('Fetch සහ pull වෙන්කරමු', 'Remote changes මුලින් කියවා ඉන්පසු local branch එකට integrate කරන්න.', [
      ['Fetch', 'git fetch origin objects සහ remote-tracking refs update කරනවා. සාමාන්‍ය workflow එකේ current working files සහ local branch එක merge කරන්නේ නැහැ.'],
      ['Pull', 'Pull මුලින් fetch කර selected integration strategy එකක් භාවිතා කරනවා. Merge, rebase හෝ fast-forward policy explicit කරගන්න.'],
      ['Fast-forward only', 'git pull --ff-only divergence තිබුණොත් stop වෙනවා. ඒක error එක hide කරන එකක් නොවේ; team history integrate කරන strategy එක තෝරාගන්න අවස්ථාවක්.']
    ], [['git fetch origin','Remote updates local tracking refs වෙත ගනී.'],['git log --oneline --left-right main...origin/main','Local සහ tracking branch වල unique commits සසඳයි.'],['git pull --ff-only origin main','Current branch එකට origin main fast-forward කළ හැකි නම් පමණක් integrate කරයි.']], ['Fetch කරන්න','Differences බලන්න','Policy තෝරන්න','Integrate කර test කරන්න'], 'pull --ff-only origin main current branch එකට බලපානවා. Main update කරනවා නම් මුලින් main වෙත switch කරන්න.', q('Fetch එක සාමාන්‍යයෙන් current working files merge කරනවාද?', ['ඔව්','නැහැ','README පමණයි'], 1, 'Fetch මඟින් remote ගැන දැනගන්නවා; integration වෙනමයි.')),
    l('Push සහ non-fast-forward rejection', 'Local branch එක publish කර rejection එකේ හේතුව හඳුනාගන්න.', [
      ['Upstream', 'git push -u origin main මඟින් successful push එකකට upstream tracking relation එක set කරන්න පුළුවන්. ඊළඟ plain push/pull behavior config මතත් රඳා පවතිනවා.'],
      ['Rejected push', 'Remote එකේ ඔබ ළඟ නැති commits තිබුණොත් ordinary push reject විය හැකියි. Fetch කර graph බලලා team strategy අනුව integrate කර නැවත push කරන්න.'],
      ['Rewrite', 'Force push remote history replace කළ හැකියි. Shared branch එකකට default fix එකක් ලෙස භාවිතා නොකරන්න. Agreed private-branch rewrite එකක --force-with-lease ද assumptions සමඟ භාවිතා කළ යුතුයි.']
    ], [['git push -u origin main','main publish කර tracking relation සකස් කරයි; write access අවශ්‍යයි.'],['git fetch origin','Rejected push එකකදී remote state නැවත ගනී.'],['git log --oneline --graph --all','Local/remote divergence බලයි.']], ['Status බලන්න','Push කරන්න','Rejected නම් fetch කරන්න','Integrate කර නැවත push කරන්න'], 'Push rejection එකට reflex එකක් ලෙස --force දාන්න එපා. Remote commits මොනවාද බලන්න.', q('Non-fast-forward push reject වුණාම මුලින්?', ['Force push','Repository delete කරන්න','Fetch කර graph එක බලන්න'], 2, 'අනිත් changes කුමක්ද හඳුනාගෙන integration strategy තෝරාගන්න.'))
  ]);
  m('GitHub & pull requests', 'Review එක්ක වැඩ කරමු', 'https://docs.github.com/en/get-started/using-github/github-flow', [
    l('Branch සිට pull request එකට', 'Feature එකක් review කළ හැකි කුඩා change එකක් ලෙස share කරන්න.', [
      ['Workflow', 'Feature branch එකේ focused commits කර ඒ branch එක remote එකට push කරන්න. ඉන්පසු GitHub UI එකෙන් pull request එකක් විවෘත කරන්න.'],
      ['Base සහ head', 'PR base එක changes ලැබෙන target branch එකයි. Head/compare එක feature branch එකයි. වැරදි base එකක් තෝරලා unrelated changes ගොඩක් පෙනෙන්න පුළුවන්.'],
      ['Review', 'Problem, resulting behavior සහ testing ලියන්න. Checks සහ review feedback address කර merge policy අනුව complete කරන්න. Git commit එකකින් PR එක ස්වයංක්‍රීයව හදන්නේ නැහැ.']
    ], [['git switch -c feature/profile','Feature branch එක හදයි.'],['git push -u origin feature/profile','Committed feature branch එක publish කරයි.'],['# GitHub: open pull request → choose base main','Browser action එකක්; shell command එකක් නෙවෙයි.']], ['Feature branch හදන්න','Commit සහ push කරන්න','PR විවෘත කරන්න','Review සහ checks බලන්න'], 'Review text එකේ implementation විස්තර පමණක් නොලියා user-visible result සහ test evidence දෙන්න.', q('PR එකේ base branch එක?', ['Changes ලැබෙන target එක','ඔබේ editor theme එක','අලුත් token එක'], 0, 'Head changes base branch එකට integrate කිරීමට review කරනවා.')),
    l('Fork සහ upstream sync', 'Direct write access නැති repo එකකට contribution යවන්න.', [
      ['Fork', 'Fork එක hosting platform එකේ ඔබේ namespace එකට repository copy එකක්. Clone එක local copy එකක්; දෙක එකම දෙයක් නෙවෙයි.'],
      ['Two remotes', 'ඔබේ fork එක origin, original project එක upstream ලෙස නම් කරන්න පුළුවන්. ඒ නම් conventions; URL එකේ ඇත්ත target එක බලන්න.'],
      ['Contribution', 'Upstream changes ගෙන local main sync කර අලුත් feature branch එකක් හදන්න. ඔබේ fork branch එකෙන් original project එකට PR යවන්න.']
    ], [['git remote add upstream https://github.com/ORIGINAL/REPOSITORY.git','Original project actual URL එක configure කරයි.'],['git fetch upstream','Original project tracking refs update කරයි.'],['git switch main','Local main වෙත මාරු වෙයි.'],['git merge --ff-only upstream/main','Local main diverge වී නැත්නම් upstream main වෙත fast-forward කරයි.']], ['Fork කරන්න','Fork clone කරන්න','Upstream sync කරන්න','Feature PR යවන්න'], 'Origin සහ upstream URL වෙන්කර verify කරන්න. ඔබට original repo write access අනිවාර්යයෙන් ලැබෙන්නේ නැහැ.', q('Fork සහ clone අතර වෙනස?', ['වෙනසක් නැහැ','Fork host එකේ; clone local copy එක','Clone එක email එකක්'], 1, 'Fork hosting relationship එකක්; clone local Git repository එකක් ලබාදෙනවා.'))
  ]);
  m('Undo with intention', 'වැරැද්ද නිවැරදි කරමු', 'https://git-scm.com/docs/git-restore', [
    l('Restore: මොන snapshot එකටද?', 'Unstage කිරීම සහ working changes discard කිරීම වෙන්කරන්න.', [
      ['Unstage', '--staged පමණක් දුන්නොත් default source HEAD. Working file එක තබා index entry එක යළි සකස් කරනවා.'],
      ['Working restore', 'git restore path default ලෙස index එකෙන් working file එක restore කරනවා. Unstaged edits overwrite වෙන නිසා ඒ changes අවශ්‍යද මුලින් තීරණය කරන්න.'],
      ['Explicit source', '--source=HEAD දුන්නොත් restore source එක explicit කරනවා. Commands run කිරීමට පෙර diff කියවන්න; Git commit නොකළ content reflog එකෙන් අනිවාර්යයෙන් recover කළ නොහැකියි.']
    ], [['git diff -- README.md','Discard විය හැකි unstaged edits මුලින් කියවයි.'],['git restore --staged README.md','Unstage කර working edits තබයි.'],['git restore README.md','Working README එක index snapshot එකෙන් overwrite කරයි; අවශ්‍ය edits තිබේ නම් run නොකරන්න.']], ['Target හඳුනාගන්න','Diff බලන්න','අවශ්‍ය command තෝරන්න','Status verify කරන්න'], 'Unstage කිරීම සහ discard කිරීම පටලවාගත්තොත් committed නොකළ edits නැති විය හැකියි.', q('git restore README.md හි default source එක?', ['GitHub latest file','Index / staging area','හැමවිටම පළමු commit එක'], 1, 'Working tree restore එකේ default source index එකයි.')),
    l('Reset සහ revert තෝරමු', 'Local history move කිරීම සහ shared history undo commit කිරීම වෙන්කරන්න.', [
      ['Revert', 'git revert commit මඟින් අදාළ patch එක ආපසු කරන අලුත් commit එකක් සාදනවා. Existing shared commits remove නොකරන නිසා collaboration සඳහා බොහෝවිට සුදුසුයි.'],
      ['Reset modes', '--soft branch/HEAD move කර index/working tree තබනවා. Default --mixed index එකත් reset කර working edits තබනවා. --hard tracked working content එකත් reset කරනවා; අදාළ untracked paths ද overwrite විය හැකියි.'],
      ['Choose deliberately', 'Shared history එකක revert, unpublished local commits rework කිරීමට reset වැනි තීරණ context එක අනුව ගන්න. HEAD~1 සඳහා parent commit එකක් තිබිය යුතුයි.']
    ], [['git log --oneline -3','Undo කිරීමට අදහස් කරන commit හඳුනාගනී.'],['git revert HEAD','Latest ordinary commit එක undo කරන අලුත් commit එකක් සාදයි; conflict/editor ඇති විය හැකියි.'],['# Alternative for an unpublished commit: git reset --soft HEAD~1','විකල්පයක් පමණයි; ඉහත revert එකට පසු අන්ධව run කරන sequence එකක් නොවේ.']], ['Published ද බලන්න','Commit තෝරන්න','Undo strategy තෝරන්න','Diff සහ tests බලන්න'], '--hard habitual shortcut එකක් ලෙස භාවිතා නොකරන්න. Reflog එක uncommitted edits වල backup එකක් නෙවෙයි.', q('Published ordinary commit එක undo කර history තබාගැනීමට?', ['git reset --hard හැමවිටම','git init','git revert'], 2, 'Revert එක අලුත් inverse commit එකක් සෑදීමෙන් shared history තබනවා.'))
  ]);
  m('Stash unfinished work', 'වැඩ ටිකකට පැත්තකින් තබමු', 'https://git-scm.com/docs/git-stash', [
    l('Stash push සහ list', 'අවසන් නැති local changes තාවකාලිකව තබා context මාරු කරන්න.', [
      ['Temporary shelf', 'Stash unfinished tracked changes තාවකාලිකව තබන්න උදව් වෙනවා. එය review කළ feature commit එකක් හෝ remote backup එකක් වෙනුවට නොගන්න.'],
      ['Untracked', 'සාමාන්‍ය stash untracked files ගන්නේ නැහැ. -u මඟින් untracked ද ඇතුළත් කරනවා; ignored files ඒකට ඇතුළත් නොවේ.'],
      ['Name it', '-m message එකක් දී කුමක් තබාගත්තේද පසුව හඳුනාගන්න. List සහ show බලලා restore කරන stash එක තෝරන්න.']
    ], [['git status','තබාගන්න changes හඳුනාගනී.'],['git stash push -u -m "WIP profile page"','Tracked සහ untracked changes තාවකාලිකව stash කරයි.'],['git stash list','Available stash entries පෙන්වයි.']], ['Changes හඳුනාගන්න','Stash scope තෝරන්න','Message දාන්න','Clean state verify කරන්න'], 'Ignored file එකක් -u නිසා stash වුණා යැයි නොසිතන්න.', q('Untracked files ද stash කිරීමට?', ['git stash push -u','git stash list','git log -u'], 0, '-u untracked files ඇතුළත් කරනවා; ignored files සඳහා වෙනම policy තියෙනවා.')),
    l('Apply, pop සහ conflicts', 'Saved changes ආපසු ගෙන stash entry එක ගැන තීරණය කරන්න.', [
      ['Apply', 'stash apply changes apply කරනවා; stash entry එක තබනවා. මුලින් result එක verify කිරීමට හොඳ ක්‍රමයක්.'],
      ['Pop', 'stash pop apply කර successful නම් entry එක remove කරනවා. Conflict එකක් ඇති වුණොත් entry එක තබනවා.'],
      ['Review', 'Current files වෙනස් වී ඇති නිසා stash apply conflict විය හැකියි. Resolve කර status බලන්න. Entry drop කිරීම result verify කළ පසු කරන්න.']
    ], [['git stash show -p "stash@{0}"','Latest stash patch එක කියවයි; quotes shell parsing පැහැදිලි කරයි.'],['git stash apply "stash@{0}"','Changes apply කර entry එක තබයි.'],['git status','Restore result හෝ conflicts පරීක්ෂා කරයි.']], ['Stash patch බලන්න','Apply කරන්න','Result verify කරන්න','අවශ්‍ය නැත්නම් entry drop කරන්න'], 'Apply successfulද බලන්න කලින් stash clear කරන්න එපා.', q('stash apply successful වුණාම stash entry එක?', ['සැමවිටම මැකෙයි','තබනවා','Remote එකට යයි'], 1, 'apply entry එක retain කරනවා; pop success මත drop කරන්න උත්සාහ කරනවා.'))
  ]);
  m('Rebase & cherry-pick', 'History එක තේරුම්ගෙන සකස් කරමු', 'https://git-scm.com/docs/git-rebase', [
    l('Rebase එකේ replay model එක', 'Private branch commits අලුත් base එකක් මත replay කරන විදිහ තේරුම් ගන්න.', [
      ['Replay', 'Rebase source commits අලුත් base එකක් මත නැවත apply කර replacement commits සාදනවා. එම commits වල IDs සාමාන්‍යයෙන් වෙනස් වෙනවා.'],
      ['Private history', 'තවම share නොකළ branch එකක history සකස් කිරීමට සරලයි. Published branch rewrite කිරීම team එකේ workflow සහ agreement එකට අදාළ තීරණයක්.'],
      ['Conflicts', 'Replay එකේදී conflict නම් file හදලා git add කර rebase --continue කරන්න. මේක merge එකක් නොවන නිසා rebase --abort භාවිතා කර නවත්වන්න.']
    ], [['git fetch origin','Base tracking ref update කරයි.'],['git switch feature/profile','Rebase කළ යුතු private feature branch එක තෝරයි.'],['git rebase origin/main','Feature commits latest known main මත replay කරයි.'],['git log --oneline --graph --all','Result සහ IDs බලයි.']], ['Branch status බලන්න','Base fetch කරන්න','Replay කරන්න','Tests සහ graph බලන්න'], 'Rebase conflict එකේ ours/theirs labels සාමාන්‍ය merge intuition එකට වෙනස් විය හැකියි; actual content කියවන්න.', q('Rebase කිරීමේදී replay කරන commits වල IDs?', ['හැමවිටම වෙනස් නොවේ','Branch නම වෙනවා','සාමාන්‍යයෙන් වෙනස් වෙනවා'], 2, 'New parent/base නිසා replacement commit objects සෑදෙනවා.')),
    l('Cherry-pick සහ interactive cleanup', 'අවශ්‍ය එක commit එකක් ලබාගැනීම සහ local commits squash කිරීම හඳුනාගන්න.', [
      ['Cherry-pick', 'වෙනත් branch එකක commit එකේ change එක current branch එකට apply කර අලුත් commit එකක් සාදනවා. මුළු branch history එක merge කරන්නේ නැහැ.'],
      ['Interactive rebase', 'Unpublished commits කිහිපයක messages/order/squash සකස් කිරීමට rebase -i භාවිතා කළ හැකියි. Editor instructions කියවලා replay order තේරුම් ගන්න.'],
      ['Dependencies', 'Commit එක වෙනත් changes මත රඳා පවතින්න පුළුවන්. Pick එක clean වූවත් actual app tests run කරන්න.']
    ], [['git log --oneline --all','අවශ්‍ය actual commit ID හඳුනාගනී.'],['git cherry-pick COMMIT_ID','Placeholder එක actual ID එකෙන් replace කර current branch එකට change apply කරයි.'],['# Separate exercise: git rebase -i HEAD~3','අවම commits තුනකට පෙර base එකක් ඇති private history එකක වෙනම cleanup exercise එකක්.']], ['Change තෝරන්න','Dependencies බලන්න','Pick කරන්න','Tests run කරන්න'], 'COMMIT_ID කියන්නේ literal valid hash එකක් නොවේ. ඔබේ log එකේ actual ID එක භාවිතා කරන්න.', q('Cherry-pick එක සාමාන්‍යයෙන් ගන්නේ?', ['තෝරාගත් commit එකේ change එක','හැම remote branch එකම','Working folder backup එකක්'], 0, 'Selected change apply කර current branch එකේ අලුත් commit එකක් සාදනවා.'))
  ]);
  m('Tags & releases', 'Version එකකට නමක් දෙමු', 'https://git-scm.com/docs/git-tag', [
    l('Annotated tag එකක්', 'Test කළ commit එකකට release නමක් දෙන්න.', [
      ['Tag', 'Tag නමක් commit එකකට stable label එකක් දෙන්න පුළුවන්. Branch එක වගේ අලුත් commits එක්ක ඉදිරියට යන්නේ නැහැ.'],
      ['Annotated', '-a සහ message එකක් මඟින් tagger metadata සහිත annotated tag object එකක් සාදනවා. මේක cryptographic signed tag එකක් කියන අර්ථය නෙවෙයි.'],
      ['Version names', 'v1.0.0 වැනි නාම project release policy එකට ගැළපෙන්න තෝරන්න. Tag එක සෑදීමට පෙර tests සහ target commit තහවුරු කරන්න.']
    ], [['git status','Tag කිරීමට පෙර local work තත්ත්වය බලයි.'],['git tag -a v1.0.0 -m "First learning release"','HEAD වෙත annotated tag එකක් සාදයි.'],['git show v1.0.0','Tag metadata සහ target commit බලයි.']], ['Tests pass කරන්න','Target verify කරන්න','Annotated tag හදන්න','Tag inspect කරන්න'], 'Tag එකක් සෑදූ පමණින් build artifact එකක් හෝ GitHub release page එකක් හදන්නේ නැහැ.', q('Tag එක branch වගේ අලුත් commits එක්ක move වෙනවාද?', ['ඔව්','නැහැ','Push කළොත් පමණයි'], 1, 'Tag label එක deliberate update එකක් නැතිව target වෙනස් කරන්නේ නැහැ.')),
    l('Tag publish සහ release notes', 'Tag transfer එක සහ hosting release එක වෙන වෙනම හඳුනාගන්න.', [
      ['Explicit publish', 'Specific tag එක git push origin v1.0.0 මඟින් publish කරන්න. සාමාන්‍ය branch push එකෙන් සියලු tags යනවා කියලා නොසිතන්න.'],
      ['Release page', 'GitHub release page එක tag එකක් සමඟ notes සහ assets එකතු කරන hosting feature එකක්. ඒක Git tag object එකට සමාන නැහැ.'],
      ['Stable references', 'Published release tag එක silently move කළොත් users අතර source mismatch ඇති විය හැකියි. Fix එකකට අලුත් release version එකක් තෝරන්න.']
    ], [['git push origin v1.0.0','තෝරාගත් tag එක remote එකට publish කරයි.'],['git ls-remote --tags origin','Remote එකේ tag refs කියවයි.'],['# GitHub: draft release notes for v1.0.0','Browser එකේ release notes සහ assets තෝරන වෙනම action එකක්.']], ['Tag verify කරන්න','Tag push කරන්න','Notes ලියන්න','Published target බලන්න'], 'Local tag එක පමණක් තිබුණොත් teammate කෙනාට ඒ release නම තවම නොපෙනෙන්න පුළුවන්.', q('Git tag සහ GitHub release එක?', ['සම්පූර්ණයෙන් එකම object එක','CSS දෙකක්','Git label එක සහ hosting feature එක ලෙස වෙනස්'], 2, 'Release page එක notes/assets එක්ක tag එකක් සම්බන්ධ කරන platform feature එකක්.'))
  ]);
  m('Recover & investigate', 'Evidence එකෙන් හේතුව සොයමු', 'https://git-scm.com/docs/git-reflog', [
    l('Reflog එකෙන් commit සොයාගමු', 'Local ref movement history එකෙන් අතුරුදහන් commit එකට නමක් දෙන්න.', [
      ['Local log', 'Reflog local refs/HEAD මාරු වූ තැන් තාවකාලිකව record කරනවා. Remote server එකේ සම්පූර්ණ backup එකක් නෙවෙයි; entries expire විය හැකියි.'],
      ['Recover a pointer', 'අදාළ commit ID එක identify කර ඒකට branch නමක් දෙන්න. මුලින් history inspect කිරීමෙන් current work overwrite නොකර recover කළ හැකියි.'],
      ['Limits', 'Git කවදාවත් stage/commit නොකළ content reflog එකේ නොතිබිය හැකියි. Recovery guarantee එකක් වෙනුවට regular commits සහ backups භාවිතා කරන්න.']
    ], [['git reflog','HEAD/ref movements කියවයි.'],['git show FOUND_COMMIT','ඔබ සොයාගත් actual commit ID එක inspect කරයි.'],['git branch recovered-work FOUND_COMMIT','ඒ commit එකට branch නමක් දෙයි; working checkout වෙනස් නොකරයි.']], ['Reflog කියවන්න','Commit verify කරන්න','Recovery branch හදන්න','වැඩ සසඳන්න'], 'Reflog සෑම deleted file එකක්ම සුරකින recycle bin එකක් නෙවෙයි.', q('Reflog එකෙන් හැම uncommitted edit එකක්ම recover කළ හැකිද?', ['නැහැ','ඔව්','GitHub login නම් ඔව්'], 0, 'Reflog commit/ref positions ගැනයි; arbitrary unsaved/unstaged content backup එකක් නොවේ.')),
    l('Bisect සහ blame', 'Bug එක පැමිණි commit එක evidence එකෙන් narrow කරන්න.', [
      ['Bisect', 'Known good සහ bad commits අතර test result මත candidate commits තෝරන binary search workflow එකක්. Deterministic reproduction අවශ්‍යයි.'],
      ['Mark results', 'Bisect එක checkout කරන candidate එක test කර good/bad කියන්න. Build කරන්න බැරි commit එකක් skip කළ හැකියි; final conclusion ambiguity ගැන සැලකිලිමත් වන්න.'],
      ['Blame', 'Line එක අවසන් වරට වෙනස් කළ commit එකේ context හොයන්න blame උදව් වෙනවා. පුද්ගලයෙකුට දොස් පැවරීම වෙනුවට log/show මඟින් හේතුව කියවන්න.']
    ], [['git bisect start','Bisect session එක අරඹයි.'],['git bisect bad','Current commit එක known bad ලෙස ලකුණු කරයි.'],['git bisect good GOOD_COMMIT','Actual known-good ID එක දී search range එක තීරණය කරයි.'],['git bisect reset','Session අවසන් කර original checkout වෙත යයි.']], ['Reproduction හදන්න','Good/bad boundaries දෙන්න','Candidates test කරන්න','Reset කර finding verify කරන්න'], 'එකම bug එකට unrelated test failures bad ලෙස mark කළොත් bisect conclusion වැරදි වෙන්න පුළුවන්.', q('Bisect එකට මුලින් අවශ්‍ය evidence?', ['Theme color එක','Known good සහ bad commits','GitHub followers ගණන'], 1, 'Testable boundaries දෙක අතර search කරන නිසා reproduction එකත් විශ්වාසදායක විය යුතුයි.'))
  ]);
  m('Team habits & security', 'එකට වැඩ කරන හොඳ පුරුදු', 'https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning', [
    l('Review, checks සහ hooks', 'Team workflow එක repeat කළ හැකි acceptance checks සමඟ හදන්න.', [
      ['Reviewable changes', 'Small branches, clear commits සහ meaningful tests reviewer එකට context දෙනවා. Branch policy අනුව required checks/reviews භාවිතා කරන්න.'],
      ['Hooks', 'Local hooks actions ඉදිරියේ scripts run කරනවා. සාමාන්‍ය local hook එකක් clone කළ පමණින් team එකට automatic install වෙන්නේ නැහැ; setup process එකක් අවශ්‍යයි.'],
      ['Server checks', 'Local hooks bypass කළ හැකි නිසා critical checks CI/server policy මඟින්ත් enforce කරන්න. Third-party repo scripts/hooks run කිරීමට පෙර කියවන්න.']
    ], [['git diff --check','Whitespace errors සහ conflict markers වැනි patch issues පරීක්ෂා කරයි.'],['git status --short','Review එකට යන scope නැවත බලයි.'],['git log --oneline origin/main..HEAD','Feature branch එකේ ahead commits කියවයි; tracking ref තිබිය යුතුයි.']], ['Small change හදන්න','Local checks කරන්න','PR review ගන්න','Required CI බලන්න'], 'Local checks pass වුණා කියලා server permissions හෝ all-platform tests pass බව කියන්න බැහැ.', q('Critical team checks enforce කළ යුත්තේ?', ['Local hook එකෙන් පමණක්','README comment එකකින්','CI/server policy එකෙන්ද'], 2, 'Local checks පහසු feedback දෙයි; trusted enforcement වෙනම තිබිය යුතුයි.')),
    l('Secrets සහ safe collaboration', 'Credential leak එකකට හරි response එකත් shared history boundariesත් හඳුනාගන්න.', [
      ['Prevent', 'Tokens, private keys සහ .env credentials commits වලට නොයවන්න. Ignore patterns, staged diff review සහ secret scanning එකට උදව් වෙනවා.'],
      ['Respond', 'Secret එක exposed නම් මුලින් credential revoke/rotate කරන්න. History cleanup අවශ්‍ය නම් host guidance සහ team coordination අනුව කරන්න; copies/forks/caches ගැනත් සැලකිලිමත් වන්න.'],
      ['Everyday habit', 'Push destination, current branch සහ staged diff හැමවිටම හඳුනාගන්න. Shared main history rewrite කිරීම review කළ team operation එකක් විය යුතුයි.']
    ], [['git remote -v','Push යන destination එක verify කරයි.'],['git diff --staged','Staged content එකේ secrets/අදාළ නැති files බලයි.'],['git status','Branch සහ pending work තහවුරු කරයි.']], ['Scope බලන්න','Secrets scan කරන්න','Permissions ගැළපෙන්න බලන්න','Review කර publish කරන්න'], 'Leak වූ secret එක latest commit එකෙන් මැකීම පමණක් ප්‍රමාණවත් නෑ; credential එක rotate කරන්න.', q('Published token එකක් හමු වුණොත් මුලින්?', ['Token revoke/rotate කරන්න','File නම වෙනස් කරන්න','Commit message වෙනස් කරන්න'], 0, 'Leaked credential එක unusable කිරීමෙන් actual access risk එක address කරනවා.'))
  ]);
  m('Your Git capstone', 'ඉගෙන ගත්ත දේ එකට යොදමු', 'https://git-scm.com/docs/gittutorial', [
    l('Local project එකේ complete workflow', 'Repo, branch, merge සහ tag එක්ක reproducible practice journey එකක් කරන්න.', [
      ['New sandbox', 'Project tab workbook download කර අලුත් hello-git folder එකක් භාවිතා කරන්න. Existing work repo එක මේ exercise එක සඳහා reset කරන්න අවශ්‍ය නැහැ.'],
      ['Journey', 'README එක commit කර feature branch එකක profile.md දාන්න. Main වෙත merge කර graph verify කරන්න. පසුව annotated tag එකක් හදන්න.'],
      ['Explain it', 'Working tree, index සහ HEAD කෙරෙහි සෑම command එකකම බලපෑම කියන්න. Final challenge checklist එක actual terminal work කළ පසු ඔබම mark කරන්න.']
    ], [['git init -b main hello-git','අලුත් sandbox directory එකක repo එක සාදයි.'],['cd hello-git','Practice root එකට යයි.'],['# Follow the downloaded workbook','Files editor එකෙන් සාදා workbook steps එක බැගින් run කරන්න.'],['git log --oneline --graph --decorate --all','Complete journey එකේ history verify කරයි.']], ['Repo සහ README','Feature සහ merge','Conflict exercise','Tag සහ explanation'], 'Browser simulator completion එක actual terminal exercise එක කළ බවට සාක්ෂියක් නෙවෙයි.', q('Capstone එක කරන්න හොඳම තැන?', ['Existing production repo එක reset කරලා','අලුත් practice folder එකක','node_modules තුළ'], 1, 'වෙන් කළ practice folder එකක් workflow එක පැහැදිලිව නැවත කර බලන්න උදව් වෙනවා.')),
    l('Team workflow එක ඔබේ වචනවලින්', 'Local edit එකේ සිට reviewed integration එක දක්වා flow එක කියන්න.', [
      ['Prepare', 'Main update කර focused feature branch එකක් තෝරන්න. Existing work තිබේ නම් පළමුව status එකෙන් හඳුනාගන්න.'],
      ['Share', 'Small commits, tests සහ branch push කර PR එකේ purpose සහ validation ලියන්න. Conflict එකක් තිබේ නම් intended behavior එකට ගැළපෙන්න විසඳන්න.'],
      ['Finish', 'Required review/checks පසු merge කරන්න. Local main sync කර අවශ්‍ය නැති branch names clean කරන්න. Project policy අනුව release tag/notes එකතු කරන්න.']
    ], [['git switch main','Target main වෙත මාරු වෙයි.'],['git pull --ff-only origin main','Remote main සමඟ local main fast-forward කරයි; remote අවශ්‍යයි.'],['git branch -d feature/profile','Merged local feature branch name delete කරයි.'],['git status','ඊළඟ වැඩට පෙර current state බලයි.']], ['Sync main','Feature commit සහ tests','Push සහ PR review','Merge සහ cleanup'], 'Git commands මතක තබාගන්නවාට වඩා command එකේ source, target සහ result එක කියන්න පුළුවන් වීම වැදගත්.', q('PR merge පසු local main?', ['හැමවිටම ස්වයංක්‍රීයව update වෙයි','නැවත git init කළ යුතුයි','Fetch/pull මඟින් sync කළ යුතුයි'], 2, 'Host එකේ වෙනස්කම local checkout එකට automatically නොඑන නිසා sync boundary එක explicit.'))
  ]);
  const stages = [
    {name:'මුලින්ම පටන් ගනිමු',en:'Start from zero',detail:'Git, setup & repositories',modules:[0,1,2]},
    {name:'ඔබේ වෙනස්කම් සුරකිමු',en:'Build the habit',detail:'Stage, commit, diff & ignore',modules:[3,4,5,6]},
    {name:'Branches එක්ක වැඩ කරමු',en:'Branch with confidence',detail:'HEAD, merge & conflicts',modules:[7,8,9]},
    {name:'Team එකට සම්බන්ධ වෙමු',en:'Work together',detail:'Remotes, sync & GitHub',modules:[10,11,12]},
    {name:'වැරැද්දෙන් ඉගෙන ගනිමු',en:'Undo & recover',detail:'Restore, stash, rebase & tags',modules:[13,14,15,16,17]},
    {name:'ඔබේ workflow එක හදමු',en:'Put it into practice',detail:'Team habits & final challenge',modules:[18,19]}
  ];
  const terms = [
    ['Repository','Working files සහ Git history/config metadata එකට අදාළ project context එක.'],['Commit','Snapshot, metadata සහ parent relationships අඩංගු history object එක.'],
    ['Working tree','ඔබ editor එකෙන් දැනට භාවිතා කරන project files.'],['Index / staging area','ඊළඟ commit එකට තෝරපු snapshot එක.'],['HEAD','සාමාන්‍යයෙන් current branch එකටත් detached නම් commit එකකටත් යොමු වෙන reference එක.'],
    ['Branch','Commit එකකට යොමු වෙන, අලුත් commits එක්ක ඉදිරියට යන නමක්.'],['Tag','Commit/object එකකට stable release label එකක් දෙන්න භාවිතා කරන reference එක.'],['Diff','Snapshots දෙකක් අතර වෙනස්කම් පෙන්වන comparison එක.'],
    ['Untracked','Index එකෙන් තවම track නොකරන working file එකක්.'],['Staged','Index එකේ next commit සඳහා තෝරාගත් වෙනසක්.'],['Tracked','Index එකේ හෝ current committed snapshot එකේ Git දැනට හඳුනාගන්න path එකක්.'],
    ['Remote','Repository URL එකකට දෙන local alias/configuration එකක්.'],['Origin','Clone workflow එකේ default remote name convention එක.'],['Upstream','Tracking branch relationship එකකට හෝ original remote alias එකකට භාවිතා වෙන context-dependent නමක්.'],
    ['Remote-tracking branch','Remote branch එක ගැන අවසන් fetch එකෙන් දැනගත් local ref එක; උදා: origin/main.'],['Clone','Existing repository history එක සහ working checkout එකක් local ලබාගැනීම.'],['Fork','Hosting platform එකේ වෙනත් namespace එකක repository copy/relationship එකක්.'],
    ['Fetch','Objects සහ remote-tracking refs ලබාගෙන current local branch integrate නොකරන transfer operation එක.'],['Pull','Fetch කර configured/explicit strategy එකකින් current branch එකට changes integrate කිරීම.'],['Push','Local refs සහ අවශ්‍ය objects remote එකට යැවීමට කරන උත්සාහය.'],
    ['Merge','Branch histories එකතු කර current branch එකට result එක දීම.'],['Fast-forward','අලුත් merge commit එකක් නැතිව branch pointer එක descendant commit එකට ගෙනයෑම.'],['Merge base','Histories සසඳන විට භාවිතා කරන common ancestor context එක.'],['Conflict','Changes එකතු කිරීමේදී user decision අවශ්‍ය තත්ත්වයක්.'],
    ['Rebase','Commits අලුත් base එකක් මත replay කර replacement history එකක් සෑදීම.'],['Cherry-pick','තෝරාගත් commit එකක change එක current branch එකට apply කර commit කිරීම.'],['Restore','Chosen source snapshot එකෙන් index හෝ working paths යළි සකස් කිරීම.'],['Reset','Mode අනුව HEAD/branch, index සහ working tree යළි සකස් කිරීම.'],
    ['Revert','Existing commit එකක බලපෑම inverse කරන අලුත් commit එකක් සෑදීම.'],['Stash','අවසන් නැති local changes තාවකාලිකව තබන workflow එක.'],['Reflog','Local refs/HEAD moves ගැන කාලසීමාවක් පවත්වාගන්න log එක.'],['Detached HEAD','HEAD current branch name එකකට වෙනුවට commit එකකට direct යොමු වෙන තත්ත්වය.'],
    ['Pull request','Host එකේ branch change review කර target එකට integrate කිරීමට යවන proposal එක.'],['Bisect','Known good/bad history boundaries අතර test result මත bug source narrow කරන search workflow එක.'],['Hook','Git action එකක අදාළ අවස්ථාවක run කළ හැකි local/server script එකක්.'],['.gitignore','නොtracked paths ignore කරන pattern rules file එක.']
  ];
  const setup = [
    ['ඔබේ terminal එක හඳුනාගන්න',{unix:'pwd',powershell:'Get-Location',cmd:'cd'},'Current folder path එක පෙන්වයි.','Parent / Projects folder','Prompt එක command එකේ කොටසක් නෙවෙයි.'],
    ['Git install එක පරීක්ෂා කරන්න','git --version','git version 2.x හෝ අලුත් installed version එක.','ඕනෑම folder එකක','Git නැත්නම් git-scm.com installation guidance බලලා terminal නැවත අරින්න.'],
    ['Author name සකස් කරන්න','git config --global user.name "Your Name"','Command output නැති විය හැකියි; config read කර verify කරන්න.','ඕනෑම folder එකක','Your Name ඔබේ නමෙන් replace කරන්න. මෙය login එකක් නෙවෙයි.'],
    ['Author email සකස් කරන්න','git config --global user.email "you@example.com"','ඔබේ තෝරාගත් author email config වෙයි.','ඕනෑම folder එකක','ඔබේ actual හෝ account noreply address එක තෝරන්න.'],
    ['Sandbox folder එක සාදන්න','mkdir git-learning','git-learning folder එක ලැබේ.','Parent / Projects folder','දැනටමත් තියෙන folder එකක් වෙනුවට නව practice folder එකක් තෝරන්න.'],
    ['Sandbox එකට යන්න','cd git-learning','Current folder: …/git-learning','Parent / Projects folder','Current path නැවත කියවා බලන්න.'],
    ['Repo එක අරඹන්න','git init -b main','Initialized empty Git repository in …/git-learning/.git/','git-learning/','-b සඳහා Git 2.28+ අවශ්‍යයි. පැරණි Git නම් update කරන්න.'],
    ['README.md එක ලියන්න','Editor → create README.md → write # Hello Git → Save','README.md හි # Hello Git text එක සුරැකේ.','Editor action · shell command එකක් නෙවෙයි','Filename .txt suffix එකක් එක්ක සුරැකිලාද බලන්න.'],
    ['පළමු snapshot එක stage කරන්න','git add README.md','README.md next commit එකට staged.','git-learning/','File එක save කළාද සහ path එක නිවැරදිද බලන්න.'],
    ['පළමු commit එක','git commit -m "Add project introduction"','[main (root-commit) SAMPLE_ID] Add project introduction','git-learning/','Identity unknown නම් user.name සහ user.email සකස් කර නැවත කරන්න.'],
    ['Result එක verify කරන්න','git status','On branch main · nothing to commit, working tree clean','git-learning/','Clean කියන්නේ tracked/untracked pending changes නැති බවයි; remote sync බවක් නොවේ.']
  ];
  return {modules, lessons:modules.flatMap(m=>m.lessons), stages, terms, setup};
})();
