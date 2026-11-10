/* Ordered, offline Sinhala project lessons. Code is teaching text, never eval'd. */
'use strict';
(() => {
  const projects = {
    pos: {id:'pos',name:'Pocket POS',short:'POS system',icon:'▣',level:'FIRST PROJECT',noun:'sale',plural:'sales',action:'Complete sale',frontend:'Angular + TypeScript',backend:'FastAPI + Python',folder:'pocket-pos',summary:'කුඩා කඩයක products, cart, stock සහ receipt එකක් මුල සිට හදමු.',audience:'Cashier සහ shop owner',story:'Cashier කෙනෙක් product එකක් තෝරලා quantity දී sale එක complete කරන විට stock අඩු වී receipt එකක් ලැබිය යුතුයි.',rule:'Stock නැති product එකක් විකිණිය නොහැක. Sale එක සහ stock change එක එක transaction එකක save විය යුතුයි.',entities:['Product','Sale','SaleItem'],features:['Product catalog','Cart & quantities','Stock-safe checkout','Receipt history'],accent:'#246c54'},
    shop: {id:'shop',name:'Little Shop',short:'E-commerce',icon:'◇',level:'SECOND PROJECT',noun:'order',plural:'orders',action:'Place order',frontend:'Angular + TypeScript',backend:'FastAPI + Python',folder:'little-shop',summary:'Product catalog එකකින් cart, customer checkout සහ order history එකකට යමු.',audience:'Customer සහ store manager',story:'Customer කෙනෙක් catalog එක බලලා cart එකට items දාලා නම සහ delivery address දී order එකක් place කළ යුතුයි.',rule:'මිල server එකෙන් ගත යුතුයි. Customer දෙන total එක විශ්වාස නොකර stock සහ order එක atomically save කරන්න.',entities:['Product','Order','OrderItem'],features:['Responsive storefront','Customer checkout','Server-side totals','Order history'],accent:'#9c6144'},
    erp: {id:'erp',name:'Flow ERP',short:'Mini ERP',icon:'⊞',level:'THIRD PROJECT',noun:'purchase',plural:'purchases',action:'Approve request',frontend:'Angular + TypeScript',backend:'Java + Spring Boot',folder:'flow-erp',summary:'Purchase request → approval → inventory flow එක Java backend එකක් එක්ක හදමු.',audience:'Staff සහ purchasing manager',story:'Staff කෙනෙක් product සහ quantity දී purchase request එකක් සාදයි. Manager approve කළ පසු පමණක් stock වැඩි විය යුතුයි.',rule:'එක request එකක් දෙවරක් approve කළොත් stock දෙවරක් වැඩි නොවිය යුතුයි. Staff කෙනෙකුට approval permission නැහැ.',entities:['Product','PurchaseRequest','RequestItem'],features:['Inventory dashboard','Purchase requests','Manager approval','Audit history'],accent:'#6f62a0'}
  };
  const phases = [
    {name:'පටන් ගන්න තැන',en:'Plan & prepare',icon:'⌘',detail:'Idea → scope → workspace',ids:[0,1,2,3]},
    {name:'Web පදනම',en:'HTML, CSS & JavaScript',icon:'</>',detail:'Screen එකක මුල් building blocks',ids:[4,5,6,7]},
    {name:'JavaScript → Angular',en:'Data, HTTP & TypeScript',icon:'{}',detail:'Data එක UI එකට ගෙන යමු',ids:[8,9,10,11]},
    {name:'UI එක ගොඩනගමු',en:'Components & interactions',icon:'▧',detail:'Design එකක් බලලා code කරමු',ids:[12,13,14,15]},
    {name:'Backend & database',en:'Language → API → SQL',icon:'▤',detail:'Data හරියට save කරන හැටි',ids:[16,17,18,19]},
    {name:'සියල්ල සම්බන්ධ කරමු',en:'Business rules & security',icon:'⇄',detail:'UI + API + trusted boundaries',ids:[20,21,22,23]},
    {name:'Release එකට සූදානම්',en:'Test, ship & operate',icon:'↗',detail:'Docker, CI, deploy & recovery',ids:[24,25,26,27]}
  ];
  const q = (question, options, answer, why) => ({question,options,answer,why});
  const parse = text => {
    const rows = text.trim().split('\n').map(line => line.split(' § '));
    return {code:rows.map(x=>x[0]).join('\n'),notes:rows.map(x=>x[1]||'මේ පේළිය ඉහත block එකේ කොටසකි. Braces/indentation එකත් code structure එකේ අර්ථයක් දරනවා.')};
  };
  const lesson = (id,title,goal,topics,file,annotated,steps,expected,fix,quiz,extra={}) => ({id,title,goal,topics,file,...parse(annotated),steps,expected,fix,quiz,...extra});
  function lessons(p) {
    const erp=p.id==='erp', shop=p.id==='shop';
    const name=p.name, folder=p.folder;
    return [
      lesson(0,'මෙතැනින් පටන් ගන්න · ඔබේ ගමන','කිසිම coding experience එකක් නැති තැනකින් පළමු project එකේ වැඩ කරන පිළිවෙළ දැනගන්න.',[
        ['Project එකක් කියන්නේ මොකක්ද?',`${name} කියන්නේ එකට වැඩ කරන screen එකක්, API එකක් සහ database එකක්. Screen එකේ button එක click වීම පමණක් project එක අවසන් වීමක් නෙවෙයි. ${p.story}`],
        ['අනුපිළිවෙළ මෙහෙමයි','මුලින් user සහ problem එක ලියන්න. ඊළඟට screen එක අඳින්න. HTML/CSS/JavaScript ඉගෙනගෙන Angular UI එක හදන්න. පසුව language basics, API, database, rules, integration, security, tests සහ deployment කරන්න. Sidebar එකේ 01 → 28 පිළිවෙළ ඒ අනුවයි.'],
        ['මෙය භාවිතා කරන හැටි','එක lesson එකක් කියවලා code line එකක් තෝරන්න. Replay එකෙන් ඒ code එක විස්තර කරන අනුපිළිවෙළ බලන්න. Practical steps කරලා expected result එකට ගළපන්න. Quiz එක pass කර practical එකත් කළ පසු milestone එක complete කරන්න. File explorer එකේ සම්පූර්ණ final source තියෙනවා.']
      ],'PROJECT-JOURNEY.md',`1. Understand the user § User කවුද, විසඳන ප්‍රශ්නය මොකක්ද කියලා ලියන්න.
2. Draw the screen and data flow § Layout සහ request ගමන මුලින් අඳින්න.
3. Build one small working feature § මුලින් product list එකක්; එකවර project එකම නොලියන්න.
4. Save data and enforce rules § API සහ database වලින් විශ්වාස කළ හැකි state තබන්න.
5. Test, package, release, observe § Happy path පමණක් නොව failure, backup සහ rollback බලන්න.`,['මේ project එකේ overview සහ features හතර කියවන්න.','Blueprint tab එකෙන් UI → API → database ගමන බලන්න.','Lesson 02 වෙත ගොස් brief එක ලියන්න. Final ZIP එක Files tab එකේ තියෙනවා.'],'ඔබට user, problem සහ build කරන features හතර කියන්න පුළුවන්. ඊළඟට යා යුතු lesson එක sidebar සහ Continue button දෙකෙන්ම පෙනෙනවා.','මුලින් Docker හෝ authentication පටන් ගන්න එපා. ඒවා අවශ්‍ය තැනට පෙර පදනම සකස් කරන්න.',q('පළමුව කළ යුත්තේ කුමක්ද?',['Database server මිලදී ගන්න','User සහ problem එක පැහැදිලි කරන්න','Animations සියල්ල හදන්න'],1,'Userගේ අවශ්‍යතාවෙන් scope සහ screen තීරණය වෙනවා.')),
      lesson(1,'Idea එකෙන් requirements සහ plan එකට','ලියන්න ඕන features, නොකරන features සහ acceptance criteria වෙන් කරගන්න.',[
        ['User story',`${p.audience} සඳහා මේ story එක ලියන්න: “${p.story}” Actors සහ action වෙන් කරන්න. “App එක ලස්සන වෙන්න ඕන” කියන එක පරීක්ෂා කළ හැකි requirement එකක් නෙවෙයි.`],
        ['MVP සහ scope',`මුල් release එකේ ${p.features.join(', ')} පමණක්. ${shop?'Real payments, refunds සහ courier APIs':erp?'Payroll, accounting සහ multi-company':'Barcode hardware, tax filing සහ multi-branch'} වෙනම extensions. මේ සීමාව නිසා සම්පූර්ණ කුඩා product එකක් අවසන් කරන්න පුළුවන්.`],
        ['Acceptance criteria සහ task order',`${p.rule} මෙය test කරන්න පුළුවන් Given/When/Then වාක්‍යයකට හරවන්න. Task board එකේ Plan → Ready → In progress → Review → Done columns දාන්න. Product data shape තීරණය කළ පසු API contract එක ලියන්න.`]
      ],'docs/brief.md',`# ${name} — project brief § Project නම සහ scope එකේ ආරම්භය.
Actor: ${p.audience} § කාටද මේ system එක හදන්නේ කියලා සටහන් කරයි.
Goal: ${p.action} § ප්‍රධාන user action එකයි.
Given: a product with stock 3 § Test එකේ මුල් තත්ත්වය; known data දෙන්න.
When: ${erp?'a manager approves 2 units':'a user requests 2 units'} § එක් action එකක් නිශ්චිතව දෙන්න.
Then: stock is ${erp?'5':'1'} and one ${p.noun} is saved § Action එකේ පරීක්ෂා කළ හැකි ප්‍රතිඵලය.
Failure: ${erp?'second approval returns 409':'quantity 4 returns 409 without changing stock'} § Happy path එකට අමතර failure rule එක.`,['VS Code එකේ docs folder එක සාදා brief.md ලියන්න.','Home, catalog, cart/request, history කියලා screens හතර කඩදාසියක අඳින්න.','එක් feature එකකට success සහ failure acceptance criteria දෙකක් ලියන්න.','Blueprint → Process බලලා ඔබේ drawing එකට ගළපන්න.'],'Scope එකේ features හතර, actors, screens සහ test කළ හැකි business rule එකක් ඇති brief.md file එකක්.','Feature list එක දිගින් දිගට වැඩි කළොත් පළමු release එක නතර වෙනවා. අලුත් අදහස් Later list එකට දාන්න.',q('Test කළ හැකි requirement එක කුමක්ද?',['App එක amazing වීම','Stock 3 තිබියදී quantity 4 ඉල්ලුවොත් 409 දීම','Modern technology භාවිතා කිරීම'],1,'Known input සහ observable result ඇති rule එක test කළ හැක.')),
      lesson(2,'Terminal, tools සහ folder එක','Editor, runtime, shell සහ project root කියන දේ මුල සිට වෙන්කරගන්න.',[
        ['Tools හතරක්','Browser එක UI පෙන්වනවා. VS Code files edit කරනවා. Terminal එක commands ගන්නවා. Runtime එක language code execute කරනවා. Node.js Angular tooling සඳහායි. Python/Java backend සඳහායි. Tool install වීම සහ project dependency install වීම වෙනම දෙකක්.'],
        ['Install සහ verify',`Node.js 24.15.0+ (24.x), Git සහ ${erp?'JDK 17+ සහ Maven 3.6.3+':'Python 3.12+'} install කරන්න. Windows installer එකේ PATH option තෝරලා terminal නැවත විවෘත කරන්න. macOS/Linux හි නිල installer හෝ OS package manager භාවිතා කරන්න. Docker Desktop/Engine පසුව lesson 26 සඳහායි. මේ learning site එකට ඒවා අවශ්‍ය නැහැ.`],
        ['Current directory','VS Code → File → Open Folder → Projects folder එක තෝරන්න. Terminal → New Terminal. pwd / Get-Location / cd මඟින් current folder බලන්න. mkdir folder එකක් සාදනවා; cd ඒ folder එකට යනවා. Commands වල $ හෝ > prompt characters copy නොකරන්න.']
      ],'terminal · Projects/',`node --version § Node runtime version බලයි; v24.15.0 හෝ අලුත් 24.x patch එකක් තෝරන්න.
npm --version § Node සමඟ ලැබෙන package manager version එක පෙන්වයි.
git --version § Git install එක හමු වෙනවාද බලයි.
${erp?'java -version':'python3 --version'} § Backend language runtime version බලයි; Windows Python සඳහා py --version.
mkdir ${folder}-practice § ඔබම පියවරෙන් පියවර හදන project එකට folder එකක් සාදයි.
cd ${folder}-practice § පසුව commands execute කරන current folder එක වෙනස් කරයි.`,['මේ lesson එකේ official installers links භාවිතා කර tools install කරන්න.','Version commands එකින් එක run කර output බලන්න. Windows Python command එකට py භාවිතා කරන්න.','Project folder එක VS Code එකෙන් Open Folder කරන්න. Explorer එකේ folder නම සහ terminal current path එක ගළපන්න.','Download කරන final reference ZIP එක වෙනම folder එකකට extract කරන්න. ඒක practice folder එකට මිශ්‍ර නොකරන්න.'],'Version අංක පෙනෙනවා. Editor සහ terminal දෙකම ඔබ හදපු practice folder එකට යොමු වෙලා තියෙනවා.','Command not found → install/PATH/terminal restart බලන්න. npm error ENOENT → package.json ඇති folder එකේද බලන්න.',q('cd command එකෙන් කරන්නේ?',['Folder එක delete කිරීම','Current folder එක මාරු කිරීම','Dependencies install කිරීම'],1,'cd කියන්නේ change directory. Commands run වන ස්ථානය එයින් තීරණය වෙනවා.'),{ref:'https://angular.dev/tools/cli/setup-local',commands:{unix:`pwd\nnode --version\n${erp?'java -version\nmvn --version':'python3 --version'}\nmkdir ${folder}-practice\ncd ${folder}-practice`,powershell:`Get-Location\nnode --version\n${erp?'java -version\nmvn --version':'py --version'}\nmkdir ${folder}-practice\ncd ${folder}-practice`,cmd:`cd\nnode --version\n${erp?'java -version\nmvn --version':'py --version'}\nmkdir ${folder}-practice\ncd ${folder}-practice`},where:'Projects parent folder → project practice root'}),
      lesson(3,'පළමු file එකේ සිට Git පුරුද්දට','Code වෙනස්කම් අහිමි නොවන විදිහට කුඩා commits තබන්න.',[
        ['Working tree → index → commit','Editor එකේ save කරන file එක working tree එකේ. git add ඒ මොහොතේ file content stage කරනවා. git commit staged snapshot එක history එකට දානවා. Commit කළ පසු කරන edit එක අලුතින් stage කළ යුතුයි.'],
        ['Identity සහ ignore','git config --global user.name සහ user.email ඔබේ සැබෑ values වලට සකස් කරන්න. .gitignore තුළ node_modules/, .venv/, .env, target/, dist/ දාන්න. .env.example එක placeholder configuration නිසා commit කරන්න. .env secret file එක commit කරන්න එපා.'],
        ['එක feature එකකට එක branch','main branch එකේ වැඩ කරන project එක තබන්න. feature/catalog වගේ branch එකක වෙනස්කම් කර tests pass වූ පසු review කර merge කරන්න. GitHub remote එක internet copy එකක්; git init පමණක් GitHub account එකක් සාදන්නේ නැහැ.']
      ],'terminal · practice project root',`git init -b main § Local repository එක main branch එකෙන් අරඹයි.
git status § Modified, staged සහ untracked files බලයි.
git add docs/brief.md .gitignore § මෙහි files දෙකේ current content stage කරයි.
git diff --staged § Commit වීමට යන exact වෙනස්කම කියවයි.
git commit -m "docs: define project scope" § පළමු review කළ snapshot එක ලියයි.
git switch -c feature/catalog § Catalog එකට අලුත් branch එකක් සාදා එයට මාරු වෙයි.`,['Lesson 02 සිට folder එකේ docs/brief.md සහ .gitignore files සාදන්න.','Identity සකස් කර ඉහත commands run කරන්න.','brief.md එකේ line එකක් වෙනස් කර git diff බලන්න. නැවත git add සහ commit කරන්න.'],'git log --oneline තුළ කුඩා commits දෙකක් පෙනෙනවා. .env සහ dependencies stage වෙලා නැහැ.','Git user identity unknown නම් ඔබේ user.name/email සකස් කරන්න. Secret එකක් commit වුණොත් file delete කිරීම පමණක් මදි; credential එක rotate කරන්න.',q('git add කළ පසු file එක edit කළොත්?',['අලුත් edit එකත් නිරායාසයෙන් stage වෙනවා','අලුත් edit එක නැවත stage කළ යුතුයි','Commit history මැකෙනවා'],1,'Index එකට ගත්තේ add කළ මොහොතේ snapshot එකයි.'),{ref:'https://git-scm.com/docs/gittutorial'}),
      lesson(4,'Screen එකේ skeleton එක · HTML','Heading, product card, form සහ button නිවැරදි HTML elements වලින් ලියන්න.',[
        ['HTML කියන්නේ structure','Tag එකක් content එකේ අර්ථය කියනවා. h1 main heading, main ප්‍රධාන content, article product එකක්, form inputs එකතු කරන boundary එක. Browser එක මේ HTML එක DOM කියන tree එකකට පරිවර්තනය කරනවා.'],
        ['Attributes සහ labels','class styling hook එකක්. id page එකේ unique name එකක්. label for එක සහ input id එක ගළපන්න. required browser-level feedback එකක් දෙයි; backend validation වෙනුවට නොවේ.'],
        ['Button එකේ behavior','Form එකක් තුළ type="button" නම් click action එකක්. type="submit" නම් form submit එක. Native button එක keyboard එකෙන් භාවිතා කළ හැක. Clickable div එකක් සාදනවට වඩා මෙය පැහැදිලි සහ accessible.']
      ],'lab/index.html',`<main> § Page එකේ ප්‍රධාන content region එක.
  <h1>${name}</h1> § එක ප්‍රධාන heading එකක් ලබාදෙයි.
  <article class="product-card"> § එක් product එක අර්ථවත් content කොටසකට ගනී.
    <h2>Notebook</h2> § Product නම subheading එකක් ලෙස පෙන්වයි.
    <p>Rs. 450.00</p> § මිල text එකක් ලෙස පෙන්වයි.
    <label for="qty">Quantity</label> § Input එකට visible accessible name එක.
    <input id="qty" type="number" min="1" value="1"> § Numeric input එකක් සහ මුල් value එකක්.
    <button type="button">Add item</button> § Keyboard එකෙන් click කළ හැකි action එක.
  </article> § Product card එක අවසන් කරයි.
</main> § Main region එක අවසන් කරයි.`,['practice folder එකේ lab folder එකක් සාදා index.html හදන්න.','ඉහත code එක <html lang="en"><head><title>Practice</title></head><body> … </body></html> තුළ save කරන්න.','File එක browser එකෙන් open කරන්න. Tab key එකෙන් input සහ button focus කරන්න.'],'Heading, price, quantity සහ Add item button browser එකේ පෙනෙනවා. තවම button එකට JavaScript behavior නැහැ.','Placeholder එක label එකක් නොවේ. Button click කළාට action නැත්නම් ඒක HTML error එකක් නෙවෙයි; handler එක තවම ලියා නැහැ.',q('Input එකකට accessible name දෙන්නේ?',['Visible label එකෙන්','Color එකෙන් පමණක්','div tag ගණනෙන්'],0,'label for සහ input id මඟින් control එක හඳුනාගන්න පුළුවන්.'),{ref:'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content'}),
      lesson(5,'UI එක දිහා බලලා CSS වලට කඩමු','Spacing, grid, typography, colors සහ responsive rules හඳුනාගන්න.',[
        ['Design එකට ruler එකක්','මුලින් page regions වෙන් කරන්න: header, catalog, cart. ඊළඟට spacing scale 4/8/12/16/24/32px එකක් තෝරන්න. Typography sizes සහ primary color එක CSS variables ලෙස ලියන්න. හැම element එකකටම වෙන වෙනම random margins දාන්න එපා.'],
        ['Grid සහ box model','border-box තුළ declared width එකට padding/border ඇතුළත් වෙනවා. Grid columns සඳහා minmax(0,1fr) භාවිතා කරන්න. Flex එක aligned header actions සඳහායි. gap children අතර ඉඩ දෙයි; padding card එක ඇතුළේ ඉඩයි.'],
        ['Responsive සහ feedback','Desktop එකේ columns දෙකක් phone එකේ එකක් කරන්න. Empty, loading, error, success state හතරම අඳින්න. Live studio එකේ gap සහ radius sliders වෙනස් කර generated CSS එකේ values වෙනස් වන හැටි බලන්න.']
      ],'lab/styles.css',`:root { --space: 16px; --accent: #246c54; } § නැවත භාවිතා කරන design tokens දෙකක්.
* { box-sizing: border-box; } § Padding සහ border width එක ඇතුළට ගනී.
.catalog { display: grid; gap: var(--space); } § Product container එක grid එකක් කර consistent gap දෙයි.
.catalog { grid-template-columns: repeat(2, minmax(0, 1fr)); } § Equal columns දෙකක්; content overflow අඩු කරයි.
.product-card { padding: 16px; border: 1px solid #dbe5da; border-radius: 12px; } § Card shape, inner space සහ boundary එක.
button { background: var(--accent); color: white; } § Action එක design token එකට ගළපයි.
@media (max-width: 640px) { .catalog { grid-template-columns: 1fr; } } § Phone එකේ single column එකක්.`,['HTML head එකට <link rel="stylesheet" href="styles.css"> එක් කරන්න.','Products දෙකක් <section class="catalog"> තුළ දාලා stylesheet save කරන්න.','Browser DevTools → responsive mode → 390px සහ 1280px දී බලන්න.','Live studio → Anatomy on කර regions සහ spacing හඳුනාගන්න.'],'Products desktop එකේ පැත්තෙන් පැත්තටත් phone එකේ එකට පහළින් එකත් පෙනෙනවා.','CSS apply නොවේ නම් file path, selector spelling සහ browser DevTools computed styles බලන්න. Fixed width:1200px phone එකට දාන්න එපා.',q('Card එක ඇතුළේ ඉඩ පාලනය කරන්නේ?',['padding','git add','HTTP method'],0,'padding border එක සහ content එක අතර ඉඩයි.'),{ref:'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout'}),
      lesson(6,'JavaScript 0 සිට · values සහ variables','Number, string, boolean, const සහ let වෙනස project values වලින් තේරුම්ගන්න.',[
        ['Value සහ variable','450 කියන්නේ number එකක්. "Notebook" කියන්නේ string එකක්. true/false boolean values. Variable එකකට value එකකට නමක් දෙනවා. const binding එක නැවත assign කරන්න බැහැ; let නැවත assign කළ හැක.'],
        ['Money එක integers වලින්','මේ project එකේ price_minor කියන්නේ cents වගේ smallest currency unit එකේ integer value එක. Rs.450.00 → 45000. 0.1 + 0.2 වගේ floating-point rounding surprises මඟහරින්න totals integer arithmetic එකෙන් ගන්නවා. Display වෙද්දී පමණක් /100 කරන්න.'],
        ['Operators සහ type conversion','* multiply කරනවා. === value සහ type දෙකම සසඳනවා. Input element value එක string එකක්; Number(value) මඟින් number බවට convert කර Number.isInteger එකෙන් verify කරන්න. Empty string → 0 වන නිසා empty check එකත් අවශ්‍යයි.']
      ],'lab/basics.js',`const productName = 'Notebook'; § වෙනස් නොකරන product name binding එක.
const priceMinor = 45000; § Rs.450.00 integer minor units වලින් තබයි.
let quantity = 2; § User වෙනස් කළ හැකි count එක.
const totalMinor = priceMinor * quantity; § 45000 × 2 = 90000.
const available = quantity > 0; § Comparison එක boolean result එකක් දෙයි.
console.log(productName, totalMinor / 100, available); § Notebook 900 true පෙන්වයි.`,['lab/index.html body එකේ අවසානයට <script src="basics.js"></script> එක් කරන්න.','ඉහත basics.js save කර browser DevTools → Console බලන්න.','quantity එක 3 කර reload කරන්න. totalMinor 135000 වෙනවාද බලන්න.'],'Console එකේ Notebook 900 true පෙනෙනවා. quantity වෙනස් කර total එක predict කරන්න පුළුවන්.','"2" + 1 → "21". Numeric input එකක value එක number එකක් කියලා උපකල්පනය කරන්න එපා.',q('45000 * 2 minor units රුපියල්වලින්?',['Rs. 900.00','Rs. 45002.00','Rs. 90.00'],0,'Minor total 90000 → /100 = රුපියල් 900.'),{ref:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types'}),
      lesson(7,'Functions, conditions සහ events','Input → decision → return value ගමන සහ click handler එකක් ලියන්න.',[
        ['Function කියන්නේ reusable වැඩක්','Parameter කියන්නේ function input එකේ නම. Argument කියන්නේ call කරන විට දෙන actual value එක. return result එක caller වෙත දෙනවා. console.log එක පෙන්වීමක් පමණයි.'],
        ['Guard clauses','quantity integer නොවේ නම් හෝ 1ට අඩු නම් early return කරන්න. stock ඉක්මවන්නේ නම් error එකක් දෙන්න. Success path එකේ valid result එක return කරන්න. එකම guard එක frontend සහ backend දෙකේම තිබුණත් server එක අනිවාර්යයෙන් verify කළ යුතුයි.'],
        ['Event → state → view','User click එක event එකක්. Handler එක input කියවලා validation කර state වෙනස් කරනවා. පසුව UI render වෙනවා. Plain JavaScript lab එකේ addEventListener; Angular එකේ (click)="add()" binding භාවිතා කරනවා.']
      ],'lab/functions.js',`function lineTotal(priceMinor, quantity, stock) { § Named function එක inputs තුනක් ගනී.
  if (!Number.isInteger(quantity) || quantity < 1) { § Fraction, NaN සහ non-positive quantities නවතයි.
    throw new Error('Use a positive whole quantity'); § Caller වෙත failure එක දන්වයි.
  } § පළමු guard එක අවසන්.
  if (quantity > stock) throw new Error('Not enough stock'); § Stock ඉක්මවන request එක නවතයි.
  return priceMinor * quantity; § Valid input එකේ total එක return කරයි.
} § Function declaration එක අවසන්.
console.log(lineTotal(45000, 2, 3)); § 90000 result එක පෙන්වයි.`,['Console එකේ function එක paste කර valid call එක run කරන්න.','lineTotal(45000,4,3) සහ lineTotal(45000,0,3) run කර error messages බලන්න.','Try/catch block එකකින් error.message එක user-facing paragraph එකකට පෙන්වන හැටි ලියන්න.'],'Valid input සඳහා 90000. Invalid count සඳහා පැහැදිලි Error එකක්.','throw කළ error එක catch නොකළොත් ඒ call stack එක නවතී. Error එක සඟවන්න එපා; userට නිවැරදි කළ හැකි message දෙන්න.',q('Function එකෙන් caller වෙත result දෙන්නේ?',['console.log පමණක්','return','class attribute'],1,'return actual value එක call කළ තැනට දෙයි.'),{ref:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions'}),
      lesson(8,'Objects, arrays සහ cart එක','Product record එකක්, list එකක් සහ immutable updates හදන්න.',[
        ['Object සහ array','එක් product එකක් {id,name,price_minor,stock} object එකකින් දක්වන්න. Products ගොඩක් array එකකින් තබන්න. id identity එකයි; array index එක sorting/deleting පසු වෙනස් විය හැක.'],
        ['find, map, filter, reduce','find එක record එකක් සොයයි. map නව list එකකට transform කරයි. filter matching items පමණක් ගනී. reduce list එක එක result එකකට එකතු කරයි. Callback එකට array එකේ item එකින් එක ලැබෙනවා.'],
        ['State update එක readable කරමු','Spread syntax මඟින් අලුත් array/object reference එකක් සාදන්න. Cart එකේ තියෙන product එක නැවත add කළොත් quantity එක වැඩි කරන්න. ID අනුව update කිරීම නිසා වැරදි row එක වෙනස් වීම වැළකෙනවා.']
      ],'lab/cart.js',`const products = [{ id: 1, name: 'Notebook', price_minor: 45000, stock: 3 }]; § එක් record එකක් ඇති list එක.
const cart = [{ product_id: 1, quantity: 2 }]; § Order payload එකට අවශ්‍ය IDs සහ quantities පමණක්.
const item = products.find(p => p.id === cart[0].product_id); § Stable ID එක අනුව product සොයයි.
const total = cart.reduce((sum, row) => { § Starting value 0 සිට rows එකතු කරයි.
  const product = products.find(p => p.id === row.product_id); § Price එකට අදාල local record එක ගනී.
  return sum + (product?.price_minor ?? 0) * row.quantity; § Display total එක accumulate කරයි; server එක නැවත ගණනය කරයි.
}, 0); § reduce එකේ initial sum එක.
console.log(item.name, total); § Notebook 90000 පෙන්වයි.`,['Console එකේ list එකට දෙවන product එකක් සහ cart row එකක් එක් කරන්න.','reduce total එක අතින් ගණනය කර output එකට ගළපන්න.','filter භාවිතා කර quantity 0 rows ඉවත් කරන්න.'],'Products වෙනස් වුණත් ID අනුව cart total එක නිවැරදිව ගණනය වෙනවා.','UI total එක database එකට එහෙමම save කරන්න එපා. Server එක authoritative prices නැවත ගත යුතුයි.',q('Stable record identity එකට සුදුසු?',['Array index','Product id','Screen එකේ පිහිටීම'],1,'IDs sorting සහ filtering පසුත් record එකම හඳුනාගන්නවා.')),
      lesson(9,'HTTP, JSON සහ async/await','Frontend එක backend එකෙන් data ගන්නේ කොහොමද කියලා බලන්න.',[
        ['Request සහ response','GET /api/products data කියවයි. POST /api/orders අලුත් order එකක් සාදයි. HTTP status එක result category එක. 200 read, 201 created, 400/422 invalid data, 401 missing identity, 403 forbidden, 404 missing record, 409 business conflict.'],
        ['JSON සහ promise','JSON data format එකක්. response.json() body එක parse කරන promise එකක් return කරනවා. await ඒ promise එකේ result එක ලැබෙන තුරු ඒ async function එක pause කරනවා. මුළු browser UI එක block කරන්නේ නැහැ.'],
        ['Failure states','fetch network failures වල reject වෙයි; HTTP 409 වගේ response එකක් promise එක resolve කළ හැකි නිසා response.ok වෙනම බලන්න. loading true මුලින් දාලා finally block එකෙන් false කරන්න. Double submit button එක disable කරන්න.']
      ],'lab/http.js',`async function loadProducts() { § Promise එකක් return කරන asynchronous function එක.
  const response = await fetch('/api/products'); § Relative URL එකේ GET request එක යවයි.
  if (!response.ok) throw new Error('Cannot load products'); § HTTP failure status එක explicitව පරීක්ෂා කරයි.
  const products = await response.json(); § JSON response body එක JS values බවට parse කරයි.
  return products; § Caller වෙත parsed list එක දෙයි.
} § Function අවසන්; මෙහි call කරන්නේ නැහැ.`,['මේ function එක කියවලා request එක යන්නේ කුමන server එකටද කියන්න.','Blueprint → Request flow එකෙන් request සහ response arrows බලන්න.','API එක lesson 18දී run කළ පසු DevTools Network එකේ GET /api/products බලන්න. මේ standalone HTML lab එකේ backend තවම නැහැ.'],'GET method, URL, status සහ JSON body එක වෙන් කර හඳුනාගන්න පුළුවන්.','file:// page එකේ /api/products fetch කළොත් API එකක් ස්වයංක්‍රීයව ඇතිවෙන්නේ නැහැ. Dev server proxy සහ backend එක පසුව සම්බන්ධ කරන්න.',q('fetch එකට HTTP 409 response එකක් ලැබුණොත්?',['Always promise reject වෙනවා','response.ok පරීක්ෂා කළ යුතුයි','Request එක success කියලා save කරන්න'],1,'HTTP error සහ network rejection වෙනම handle කරන්න.'),{ref:'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch'}),
      lesson(10,'TypeScript · data එකේ හැඩය','JavaScript values වලට types දාලා contracts පැහැදිලි කරන්න.',[
        ['TypeScript → JavaScript','Browser එක run කරන්නේ JavaScript. TypeScript compiler එක types check කර JavaScript output හදනවා. string field එකකට number assign කළොත් build-time error එකක් දෙනවා. Runtime එකේ JSON validate කරන්නේ නැහැ.'],
        ['Interface සහ payload','Product කියන්නේ API එකෙන් ලැබෙන shape එක. CartLine කියන්නේ client එක යවන shape එක. Server එක total ගණනය කරන නිසා payload එකට price හෝ total දාන්නේ නැහැ. optional field සහ null value එක එකම දේ නෙවෙයි.'],
        ['unknown සහ narrowing','Untrusted value එකක් unknown ලෙස ගෙන typeof/Array.isArray හෝ schema validator මඟින් narrow කරන්න. any දාන්නේ checking අතහැරීමයි. HttpClient.get<Product[]>() කියන්නේ developer promise එකක්; server JSON shape check එකක් නෙවෙයි.']
      ],'frontend/src/app/models.ts',`export interface Product { § වෙනත් files වල import කළ හැකි data contract එක.
  id: number; § Server-generated identity එක.
  name: string; § Display label එක.
  price_minor: number; § Integer money value; runtime validation වෙනම කරන්න.
  stock: number; § Available whole quantity එක.
} § Interface එක අවසන්.
export interface CartLine { product_id: number; quantity: number; } § Client request එකේ කුඩා shape එක.
export const emptyCart: CartLine[] = []; § CartLine objects පමණක් ඇති array එකක්.`,['Final project Files එකේ models.ts බලන්න.','Practice project එකේ Angular create කිරීමෙන් පසු මේ file එක එම path එකේ ලියන්න.','quantity: "two" වගේ වැරදි assignment එකක් දාලා compiler message කියවන්න; පසුව හදන්න.'],'Compiler එක number/string mismatch එක පෙන්වනවා. API model සහ request model වෙන්ව තියෙනවා.','Type assertion as Product එකක් JSON validate කරන code එකක් නෙවෙයි.',q('TypeScript interface එක runtime JSON validate කරනවාද?',['ඔව්','නැහැ','Production build එකේ පමණක්'],1,'Types build වෙද්දී මැකෙනවා. Runtime validation API boundary එකේ වෙනම අවශ්‍යයි.'),{ref:'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html'}),
      lesson(11,'පළමු Angular app එක සාදමු','CLI එකෙන් project එක නිර්මාණය කර browser එකේ run කරන්න.',[
        ['Root එක සහ generated files','Angular workspace එකේ package.json dependencies/scripts දක්වනවා. angular.json build settings දක්වනවා. src/main.ts bootstrap කරනවා. App component එක UI root එක. node_modules install output; අතින් edit කරන්නේ නැහැ.'],
        ['Practice සහ reference paths','ඔබ lesson අනුව හදන්නේ practice folder එකේ frontend/ app එක. Files → Download complete project කියන්නේ final reference implementation එක. ඒ ZIP extract කර root එකේ README කියවලා frontend/ තුළ npm ci කරන්න. Final ZIP source එකක මුලින් නැති code එක පසුව එක්කරලා තියෙන නිසා lesson number අනුව ඉගෙනගන්න.'],
        ['Version compatibility','මේ project Angular 22 සහ TypeScript 6 සමඟයි. Node 24.15.0+ 24.x තෝරන්න. npm install මුල් dependency resolution එකට; reference ZIP එකේ package-lock.json ඇති නිසා npm ci reproducible install එකට. npm start terminal එක open තබන්න.']
      ],'terminal · practice project root',`npx @angular/cli@22 new frontend --standalone --routing --style=css --ssr=false --defaults § frontend folder එකේ Angular app එකක් සාදයි.
cd frontend § package.json ඇති Angular root එකට යයි.
npm start § Development server එක run කරයි.
# Open http://localhost:4200 in your browser § මේ URL එක browser address bar එකට; shell command එකක් නෙවෙයි.`,['Practice folder root එකේ CLI command එක run කරන්න. Existing frontend folder එකක් ඇත්නම් overwrite නොකර අලුත් practice folder එකක් භාවිතා කරන්න.','localhost:4200 browser එකෙන් open කර app starter එක බලන්න.','src/app/app.html හෝ generated template එකේ heading වෙනස් කර Save කරන්න.','Server නවත්වන්න terminal එකේ Ctrl+C. නැවත npm start කරන්න.'],'Heading edit එක browser එකට update වෙනවා. Angular app root සහ source folder ඔබට හඳුනාගන්න පුළුවන්.','ENOENT නම් frontend root එකට cd කරන්න. Port busy නම් npm start -- --port 4201. Version mismatch නම් official matrix එක බලන්න.',q('npm start run කරන්නේ?',['package.json ඇති frontend root එකේ','node_modules ඇතුළේ','Browser console එකේ'],0,'npm scripts resolve වෙන්නේ project package.json එකෙන්.'),{ref:'https://angular.dev/reference/versions',where:'practice root → frontend/',commands:{unix:'npx @angular/cli@22 new frontend --standalone --routing --style=css --ssr=false --defaults\ncd frontend\nnpm start',powershell:'npx @angular/cli@22 new frontend --standalone --routing --style=css --ssr=false --defaults\ncd frontend\nnpm start',cmd:'npx @angular/cli@22 new frontend --standalone --routing --style=css --ssr=false --defaults\ncd frontend\nnpm start'}}),
      lesson(12,'Components, template සහ binding','Design එක reusable components සහ events වලට පරිවර්තනය කරන්න.',[
        ['Component anatomy','@Component metadata එක selector, template සහ styles සම්බන්ධ කරනවා. Class එක state සහ methods තබනවා. Template එක class state කියවලා DOM එක හදනවා. Component CSS ඒ component එකේ styling සඳහායි. Global tokens src/styles.css තුළයි.'],
        ['Binding හතරක්','{{ title }} text interpolation. [disabled]="saving()" property binding. (click)="add(product)" event binding. [class.active]="selected()" state-based class binding. Untrusted HTML innerHTML බවට දාන්න එපා.'],
        ['List සහ empty state','@for (p of products(); track p.id) ID අනුව records render කරයි. @empty block එක list එක හිස් විට පෙන්වන්න. Loading සහ error states වෙන්ව හදන්න. Mock image එකේ දක්වන layout එක Home → catalog → cart regions වලට බෙදන්න.']
      ],'frontend/src/app/catalog-example.ts · standalone teaching component',`import { Component } from '@angular/core'; § Component decorator එක import කරයි.
@Component({ § Angular metadata object එක අරඹයි.
  selector: 'app-catalog-example', § Parent template එකට භාවිතා කරන tag එක.
  standalone: true, § Component එක standalone බව පැහැදිලි කරයි.
  template: '<h1>{{ title }}</h1><button (click)="add()">Add · {{ count }}</button>' § Text සහ click event class එකට bind කරයි.
}) § Metadata එක අවසන්.
export class CatalogExample { § Component class එක export කරයි.
  title = '${name}'; count = 0; § Template කියවන state values දෙකක්.
  add() { this.count += 1; } § Click එකේදී state එක වෙනස් කරයි.
} § Component class අවසන්.`,['මේ standalone example එක file එකේ save කරන්න.','Root app component එකේ imports: [CatalogExample] එක්කර root template එකට <app-catalog-example /> දාන්න.','Button click කර count වෙනස් වෙනවාද බලන්න. පසුව final app.ts/app.html දෙක Files tab එකේ බලන්න.'],'Click එක state එක වෙනස් කර template එකෙන් count update වෙනවා.','Unknown element error → import එක සහ selector එක ගැළපේද බලන්න. Error සඟවන්න schemas එකතු කරන්න එපා.',q('Angular click event binding එක?',['[click]="add"','(click)="add()"','{{ click }}'],1,'Parentheses event එක class method එකකට සම්බන්ධ කරනවා.'),{ref:'https://angular.dev/guide/components'}),
      lesson(13,'Signals වලින් cart state එක','Source state, derived total සහ immutable updates සම්බන්ධ කරන්න.',[
        ['Source state','signal() writable reactive value එකක්. Read කරන්න cart(). Update කරන්න cart.set(newValue) හෝ cart.update(fn). UI එකට ඇත්තේ එක source state එකක් නම් එක value එක වෙන වෙනම තැන්වල sync කරන්න ඕන නැහැ.'],
        ['Computed total','computed() source signals කියවා derived value එකක් ගණනය කරනවා. Cart වෙනස් වෙද්දී total නැවත ගණනය වෙනවා. Total state එක වෙනම set කරගෙන යනවට වඩා මේ ගමන පහසුයි.'],
        ['Duplicate items සහ boundaries','එක product එක දෙවරක් add කළොත් quantity වැඩි කරන්න. quantity 0 නම් remove කරන්න. UI validation පසුව server stock validationත් අවශ්‍යයි. UI එකේ stock stale විය හැකි නිසා checkout conflict එක handle කරන්න.']
      ],'frontend/src/app/cart-example.ts · teaching fragment',`import { signal, computed } from '@angular/core'; § Reactive APIs දෙක import කරයි.
const cart = signal([{ product_id: 1, quantity: 1, price_minor: 45000 }]); § Local display model එකක මුල් cart state.
const total = computed(() => cart().reduce((sum, row) => sum + row.price_minor * row.quantity, 0)); § Cart එකෙන් derived total එක.
cart.update(rows => rows.map(row => ({ ...row, quantity: row.quantity + 1 }))); § අලුත් rows reference එකක quantity වැඩි කරයි.
console.log(total()); § Signal read කර 90000 පෙන්වයි.`,['Angular code එකේ temporary function එකක snippet එක run කරන්න. Browser console එකේ output බලන්න.','Final source එකේ cart signal එක සහ total computed එක කියවන්න.','Live studio එකේ එකම product එක දෙවරක් add කර quantity/total compare කරන්න.'],'Quantity වෙනස් කළ පසු total එක අතින් set නොකර update වෙනවා.','cart().push(...) කිරීමෙන් signal reference එක නොවෙනස් විය හැක. update සහ අලුත් array එකක් භාවිතා කරන්න.',q('Derived cart total සඳහා සුදුසු?',['computed','වෙනම DOM query එකක්','setInterval පමණක්'],0,'computed එක cart dependency එකෙන් result එක ගණනය කරනවා.'),{ref:'https://angular.dev/guide/signals'}),
      lesson(14,'Forms සහ හැම UI state එකක්ම','Required inputs, field errors, loading සහ conflict feedback හදන්න.',[
        ['Userට කළ යුතු දේ කියන්න',shop?'Customer name සහ address සඳහා visible labels දෙන්න. Whitespace-only input trim කර reject කරන්න. Address එකේ length limit backend එකට ගළපන්න.':'Quantity එකට positive whole number එකක් අවශ්‍යයි. Product selection හිස් නම් submit කරන්න එපා. Field එක ළඟම වැරැද්ද සහ fix එක කියන්න.'],
        ['State machine එකක් වගේ සිතන්න','Idle → saving → success හෝ error. Saving වෙද්දී submit disable කරන්න. API failure එකකදී user input තබන්න. Success එකේ පමණක් cart reset කරන්න. aria-live="polite" region එකෙන් result දන්වන්න.'],
        ['Client සහ server errors','Browser validation immediate feedback සඳහායි. Server data සහ permissions verify කරනවා. 409 stock conflict එකක් නම් catalog refresh කර userට quantity හදන්න කියන්න. 401 නම් credentials ඉල්ලන්න. Generic network error එකක් field validation error එකක් ලෙස පෙන්වන්න එපා.']
      ],'frontend/src/app/app.html · form pattern',`<form (ngSubmit)="submit()"> § Form submit එක Angular method එකකට ගනී; FormsModule අවශ්‍යයි.
  <label for="customer">Customer name</label> § Visible control label එක.
  <input id="customer" name="customer" [(ngModel)]="customer" required maxlength="80"> § Form state binding සහ local constraints.
  <button type="submit" [disabled]="saving() || cart().length === 0"> § Pending/empty state එකේ duplicate submits අඩු කරයි.
    {{ saving() ? 'Saving…' : '${p.action}' }} § Current action state එක text එකෙන් කියයි.
  </button> § Submit control අවසන්.
  <p role="status" aria-live="polite">{{ message() }}</p> § Result screen readers වෙත දන්වයි.
</form> § Form boundary එක අවසන්.`,['Root component එකට FormsModule import කරන්න. String customer සහ submit() method එකක් එක්කර snippet එකට matching state දෙන්න.','Saving state දී button disable වෙනවාද බලන්න.','Final project app.html එකේ implemented form එකෙන් empty, invalid, success සහ API error cases කරන්න.'],'Empty cart submit නොවේ. Failure එකකදී input නැති නොවේ. Saving feedback පෙනෙනවා.','HTML required තිබුණත් raw HTTP request එකකින් bypass කළ හැක. Server validation අනිවාර්යයි.',q('Cart reset කළ යුත්තේ?',['Submit click වුණු මොහොතේ','Server success response ලැබුණු පසු','Network error එකේදී'],1,'Failure එකේදී userගේ input තබන්න.'),{ref:'https://angular.dev/guide/forms'}),
      lesson(15,'UI reference → code සහ small animations','Screenshot එකක layout එක හඳුනාගෙන precise CSS සහ motion ලියන්න.',[
        ['Screenshot එක layer වලට කඩන්න','පළමුව outer container width, regions සහ alignment ලකුණු කරන්න. ඊළඟට card width, gap, padding, radius, font size ලියන්න. Live studio Anatomy switch එකෙන් කුඩා numbered regions බලන්න. Color picker එක වෙනස් කර CSS token එකට එහි බලපෑම බලන්න.'],
        ['Motion එකේ අරමුණ','Hover එකේ -2px translateY එක clickable බව කියයි. Success message එක fade/slide කරන එක result වෙත අවධානය දෙයි. transform සහ opacity animate කරන්න; layout වෙනස් කරන width/height නිතර animate කිරීම අඩු කරන්න.'],
        ['Motion සහ accessibility','prefers-reduced-motion: reduce වලදී animation ඉවත් කරන්න. Auto replay default එක off. Keyboard focus hover එකට සමානව පැහැදිලිව තබන්න. Animation එක නොපෙනුණත් text එකෙන් outcome එක පැහැදිලි විය යුතුයි.']
      ],'frontend/src/styles.css · motion pattern',`.product { transition: transform 160ms ease, box-shadow 160ms ease; } § State වෙනස කෙටි සහ predictable කරයි.
.product:hover { transform: translateY(-2px); box-shadow: 0 8px 22px #1d422014; } § Hover affordance එකක්.
button:focus-visible { outline: 3px solid #d67c4c; outline-offset: 4px; } § Keyboard focus ඉවත් නොකරයි.
@keyframes appear { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } } § Success panel entry එක.
.success { animation: appear 180ms ease-out; } § එක් වරක් ක්‍රියාකරන කෙටි motion එක.
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } } § Reduced motion preference එකට ගරු කරයි.`,['Live studio එකේ desktop/phone toggle දෙකම බලන්න. Gap 8→24 සහ radius 4→20 වෙනස් කරන්න.','Generated CSS එක copy කර ඔබේ catalog styles එකට ගළපන්න.','DevTools → Rendering → prefers-reduced-motion emulate කර animation off වෙනවාද බලන්න.'],'Reference layout එක regions, tokens සහ rules වලට හරවන්න පුළුවන්. Phone layout සහ focus state වැඩ කරනවා.','Animations එකතු කිරීමට පෙර layout සහ readability හදාගන්න. Infinite movement එක information කියවීමට බාධාවක් වෙනවා.',q('Reduced motion request එකේදී?',['Animations වැඩි කරන්න','Animations ඉවත් කරන්න හෝ අඩු කරන්න','Focus outline මකන්න'],1,'User preference එක අනුව motion අඩු කර content පැහැදිලිව තබන්න.'),{ref:'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion'}),
      lesson(16,erp?'Java 0 සිට · types, classes සහ records':'Python 0 සිට · types, lists සහ functions','Backend language එකේ variables, decisions, loops සහ reusable functions හඳුනාගන්න.',erp?[
        ['Java run වෙන්නේ කොහොමද?','JDK තුළ compiler (javac) සහ runtime තියෙනවා. .java source → .class bytecode → JVM. Java static types භාවිතා කරන නිසා long quantity, String name වගේ type ලියන්න ඕන. Statement සාමාන්‍යයෙන් ; එකකින් අවසන් වෙනවා.'],
        ['Class, record සහ method','Class එක data සහ behavior එකට ගන්නවා. record immutable data carrier එකකට ගැළපෙනවා. Method එක class එකේ function එකක්. Constructor injection එකෙන් service එකට repository dependency දෙන්න. new කර dependency සැමතැනම හදාගන්න එපා.'],
        ['Decision, loop සහ failure','if condition වල business rules බලන්න. for loop එක items එකින් එක කියවන්න. IllegalArgumentException හෝ typed domain exception එකක් throw කර invalid action නවතන්න. long money minor units සඳහායි; overflow එකත් business limits වලින් නවතන්න.']
      ]:[
        ['Python values සහ indentation','str, int, bool සහ list/dict values භාවිතා කරන්න. Block එකක් : පසු spaces හතරක indentation එකෙන් ලියනවා. Python type hints documentation සහ tooling සඳහා; FastAPI/Pydantic request boundaries වල validation කරනවා.'],
        ['Function, loop සහ dictionary','def එකෙන් function එකක් ලියන්න. list එකක් items ගොඩක් තබනවා. dict එක fields තබනවා. for loop එක list එකේ item එකින් එක කියවයි. return caller වෙත value එක දෙයි.'],
        ['Exceptions සහ dependencies','ValueError වගේ exception එකකින් invalid input එක කියන්න. API layer එක domain error එක HTTP status එකකට map කරනවා. venv එක project dependencies වෙන්කරනවා. Python version සහ locked requirements එක එකට තබන්න.']
      ],erp?'lab/Basics.java':'lab/basics.py',erp?`public class Basics { § JVM run කළ හැකි class එක.
  record Product(long id, String name, long stock) {} § Data carrier එකේ fields සහ types.
  static long receive(long stock, long quantity) { § Inputs දෙකකින් අලුත් stock return කරන method එක.
    if (quantity < 1) throw new IllegalArgumentException("quantity"); § Invalid quantity එක guard කරයි.
    return Math.addExact(stock, quantity); § Integer overflow වුණොත් exception එකක් දී නවතයි.
  } § Method එක අවසන්.
  public static void main(String[] args) { § JVM entry point එක.
    System.out.println(receive(3, 2)); § 5 පෙන්වයි.
  } § main method අවසන්.
} § Class අවසන්.`:`def line_total(price_minor: int, quantity: int) -> int: § Type-hinted function එකක්.
    if quantity < 1: § Invalid quantity එක පරීක්ෂා කරයි.
        raise ValueError("quantity must be positive") § Failure එක caller වෙත දන්වයි.
    return price_minor * quantity § Integer total එක return කරයි.
items = [{"price_minor": 45000, "quantity": 2}] § Dict එකක් ඇති list එක.
total = 0 § Accumulator එකේ මුල් value එක.
for item in items: § එක item එක බැගින් process කරයි.
    total += line_total(item["price_minor"], item["quantity"]) § Line totals එකතු කරයි.
print(total) § 90000 පෙන්වයි.`,erp?['lab/Basics.java file එක ලියන්න. lab/ තුළ javac Basics.java run කරන්න.','java Basics run කර 5 output එක බලන්න. quantity 0 කර exception එක බලන්න.','Java reference course එකේ types → methods → classes → interfaces lessons පිළිවෙළින් කරන්න.']:['lab/basics.py save කරන්න. lab/ තුළ python3 basics.py (Windows: py basics.py) run කරන්න.','quantity 0 කර ValueError එක සහ error line එක කියවන්න.','Python reference course එකේ foundations බලලා conditions සහ lists සඳහා තව examples කරන්න.'],erp?'Compile සහ run කළ Java program එකෙන් 5 පෙන්වනවා.':'Python program එකෙන් 90000 පෙන්වනවා.','Language syntax සහ framework syntax එකට එකවර ඉගෙන නොගන්න. මේ කුඩා program එක run වූ පසු API එකට යන්න.',q(erp?'Java main method එකේ කාර්යය?':'Python block එකක් වෙන් කරන්නේ?',erp?['HTTP status එකක්','Program entry point එක','Database table එක']:['Indentation','HTML tag','Git branch'],erp?1:0,erp?'JVM main method එකෙන් program execution පටන් ගන්නවා.':'Python control blocks නිවැරදි indentation එකෙන් වෙන් වෙනවා.'),{ref:erp?'https://dev.java/learn/':'https://docs.python.org/3/tutorial/'}),
      lesson(17,erp?'Spring Boot API එක run කරමු':'FastAPI API එක run කරමු','Health endpoint එකක් හදා server එක browser එකෙන් පරීක්ෂා කරන්න.',[
        ['Framework එකේ වැඩේ',erp?'Spring Boot application එක embedded server එකක් start කරනවා. @RestController JSON endpoints දක්වනවා. @GetMapping URL එකට Java method එකක් map කරනවා. Dependency injection එකෙන් controller → service → repository සම්බන්ධ වෙනවා.':'FastAPI path decorators මඟින් URL එක Python function එකකට map කරනවා. Uvicorn ASGI server එක incoming requests app එකට ලබාදෙනවා. /docs තුළ generated OpenAPI UI එකෙන් endpoints බලන්න පුළුවන්.'],
        ['Health endpoint','GET /api/health සරල liveness check එකක්. Database check කරන readiness එක වෙනම. Production deployment එකේ traffic යැවීමට පෙර app සහ database දෙකම සූදානම් විය යුතුයි.'],
        ['Final reference එක run කිරීම',`Files → Download project ZIP → extract. ${erp?'backend/ තුළ mvn test පසුව mvn spring-boot:run. JDK සහ Maven versions lesson 03දී verify කරන්න.':'backend/ තුළ venv එකක් හදා requirements install කර python -m uvicorn app.main:app --reload --port 8000 run කරන්න. Explicit venv interpreter paths පහත shell selector එකේ තියෙනවා.'} Frontend එකට අමතරව backend terminal එකක් open තබන්න.`]
      ],erp?'backend/src/main/java/com/buildlab/erp/HealthController.java':'backend/app/main.py · first endpoint',erp?`package com.buildlab.erp; § Class එකේ namespace එක source folders වලට ගළපයි.
import org.springframework.web.bind.annotation.GetMapping; § GET mapping annotation එක.
import org.springframework.web.bind.annotation.RestController; § JSON controller annotation එක.
import java.util.Map; § Key/value JSON response එකකට map එක.
@RestController § මේ class එක HTTP controller එකක් බව දක්වයි.
public class HealthController { § Health controller එක.
  @GetMapping("/api/health") § GET request path එක.
  public Map<String, String> health() { return Map.of("status", "ok"); } § JSON response එක ලබාදෙයි.
} § Controller එක අවසන්.`:`from fastapi import FastAPI § API framework class එක import කරයි.
app = FastAPI(title="${name}") § App instance එකක් සාදයි.
@app.get("/api/health") § URL එක function එකට map කරයි.
def health(): § Health request handler එක.
    return {"status": "ok"} § FastAPI dict එක JSON response එකක් කරයි.`,erp?['Files tab එකෙන් complete project download කරන්න. README සහ backend/pom.xml බලන්න.','backend/ තුළ mvn test run කරන්න. ඉන්පසු mvn spring-boot:run.','http://localhost:8080/api/health browser එකෙන් බලන්න.']:['Final ZIP එක backend/ සහ frontend/ structure එක රඳවාගෙන extract කරන්න.','backend/ තුළ shell selector එකේ commands අනුපිළිවෙළින් run කරන්න.','http://localhost:8000/api/health සහ /docs browser එකෙන් බලන්න.'],'Health response {"status":"ok"}. Frontend server නැතිවත් API එක තනිව වැඩ කරනවා.','Import error → backend/ current folder සහ app package බලන්න. Port conflict → පැරණි dev server එක නවත්වන්න.',q('Frontend server නැතිව API එක test කළ හැකිද?',['නැහැ','ඔව්; browser, HTTP client හෝ tests වලින්','Angular install කළ පසු පමණක්'],1,'API එක frontend එකෙන් වෙන් වූ server එකක්.'),{ref:erp?'https://spring.io/guides/gs/rest-service/':'https://fastapi.tiangolo.com/tutorial/first-steps/',where:'Extracted reference project → backend/',commands:erp?{unix:'mvn test\nmvn spring-boot:run',powershell:'mvn test\nmvn spring-boot:run',cmd:'mvn test\nmvn spring-boot:run'}:{unix:'python3 -m venv .venv\n.venv/bin/python -m pip install -r requirements.lock.txt\n.venv/bin/python -m uvicorn app.main:app --reload --port 8000',powershell:'py -m venv .venv\n.\\.venv\\Scripts\\python.exe -m pip install -r requirements.lock.txt\n.\\.venv\\Scripts\\python.exe -m uvicorn app.main:app --reload --port 8000',cmd:'py -m venv .venv\n.venv\\Scripts\\python.exe -m pip install -r requirements.lock.txt\n.venv\\Scripts\\python.exe -m uvicorn app.main:app --reload --port 8000'}}),
      lesson(18,'Database diagram එකෙන් tables වලට','Primary keys, foreign keys සහ relationship cardinality තේරුම්ගන්න.',[
        ['Entities සහ relationships',`${p.entities.join(', ')} කියන්නේ tables තුනක්. එක් ${p.noun} එකකට items ගොඩක් තියෙනවා (1:N). එක් item එකකට එක් product එකක් තියෙනවා (N:1). Blueprint → Data model එකේ FK arrows ඒ connection එක පෙන්වනවා.`],
        ['Data integrity','Product id primary key එක. Item product_id foreign key එකෙන් සැබෑ product එකකට සම්බන්ධ වෙනවා. quantity > 0 සහ price_minor >= 0 database CHECK constraints වලිනුත් enforce කරන්න. Product price පසුව වෙනස් වුණත් old receipt price වෙනස් නොවීමට unit price snapshot එක item එකේ save කරන්න.'],
        ['Database තෝරාගැනීම',erp?'Local ERP reference එක file-backed H2 database එකක් භාවිතා කරනවා. PostgreSQL profile සහ Flyway migrations ද source එකේ තියෙනවා. File database restart පසුත් තියෙනවා. CI එකේ වෙනම in-memory database එකක් භාවිතා කරනවා.':'Local POS/shop reference එක SQLite file database එකක් භාවිතා කරනවා. SQLAlchemy එක PostgreSQL වෙත මාරු වීමට උදව් කරන නමුත් concurrent write semantics එක DB එකට අනුව වෙනස් වෙනවා. PostgreSQL variant එකේ conditional stock update එක සහ transaction tests සැබෑ PostgreSQL එකේත් run කරන්න.']
      ],'docs/schema.sql · relationship sketch',`CREATE TABLE products ( § Catalog entity එක.
  id INTEGER PRIMARY KEY, § Unique product identity එක.
  name VARCHAR(120) NOT NULL, § Empty database value එක වැළැක්වීම.
  price_minor BIGINT NOT NULL CHECK (price_minor >= 0), § Non-negative integer money value එක.
  stock INTEGER NOT NULL CHECK (stock >= 0) § Negative inventory නවතන database rule එක.
); § Products table declaration අවසන්.
-- ${p.entities[2]} includes product_id REFERENCES products(id) § Line item එක සැබෑ product එකකට සම්බන්ධ කරයි.
-- ${p.entities[1]} 1 -> many ${p.entities[2]} § Parent එකකට items කිහිපයක් තිබිය හැක.`,['Blueprint → Data model බලලා tables තුන ඔබම අඳින්න.','Entity එකේ fields, PK සහ FK ලකුණු කරන්න.','Final migration file එකේ SQL constraints සහ diagram එක ගළපන්න.'],'Product, parent transaction සහ line item tables වල identities සහ relationships පැහැදිලියි.','Comma-separated product IDs parent table එකේ field එකකට දාන්න එපා. Items වෙනම rows විය යුතුයි.',q('Old receipt එකේ මිල ආරක්ෂා කරන්නේ?',['හැම විටම current catalog price කියවලා','Item එකේ unit price snapshot එක save කරලා','Frontend localStorage එකෙන්'],1,'Catalog price පසුව වෙනස් වුණත් transaction history මිල වෙනස් නොවිය යුතුයි.'),{ref:'https://www.postgresql.org/docs/current/ddl-constraints.html'}),
      lesson(19,'Schema changes සහ migrations','Database එක පරිස්සමින් version කර seed data එකෙන් වෙනස හඳුනාගන්න.',[
        ['Migration කියන්නේ versioned schema change','V1 initial tables සාදනවා. V2 පසුව column එකක් හෝ index එකක් එකතු කරනවා. Applied migration එක edit කිරීම වෙනුවට අලුත් migration එකක් සාදන්න. app startup එකේ සියලු tables drop කර create කරන්න එපා.'],
        ['Migration සහ seed වෙනම','Migration schema හදනවා. Seed demo products හදනවා. Existing records overwrite නොකර empty catalog එකේ පමණක් seed කරන්න. Production data changes අනුමත කළ වෙනම migration එකකින් කරන්න. Demo users/products production database එකට auto add නොකරන්න.'],
        ['Expand → migrate → contract','Required field එකක් එකවර add කළොත් old rows සහ old app fail විය හැක. මුලින් nullable column, පසුව backfill, පසුව constraints. Deploy කිරීමට පෙර staging backup restore කර migration apply කරන්න. Downgrade නැති destructive migration එකක් app rollback එකකින් undo නොවේ.']
      ],erp?'backend/src/main/resources/db/migration/V1__initial.sql':'backend/app/db.py · migration idea',`-- V1: initial schema § මුල් schema version එක.
-- Apply once, then record version 1 § නැවත නැවත එකම change එක නොකර version එක සටහන් කරයි.
-- V2: ALTER TABLE products ADD COLUMN sku VARCHAR(40); § ඊළඟ වෙනස වෙනම version එකකට.
-- Backfill missing SKU values before adding NOT NULL § Existing rows පළමුව valid කරන්න.
-- Never DROP tables to fix a production migration § Data අහිමි නොකර recovery plan එකක් සකස් කරන්න.`,['Files tab එකේ actual migration implementation එක බලන්න. ERP හි Flyway, Python app එකේ versioned migration runner එක.','Fresh database එකක startup කර tables සහ seed count බලන්න.','Server restart කර seed products දෙගුණ නොවන බව verify කරන්න.'],'Fresh install සහ restart දෙකම වැඩ කරනවා. Existing data reset වෙන්නේ නැහැ.','ORM entity field එකක් add කිරීම migration එකක් වෙන්නේ නැහැ. Entity සහ SQL schema දෙකම එකට review කරන්න.',q('Applied V1 migration එක පසුව වෙනස් කළ යුතුද?',['ඔව්, හැම edit එකක්ම V1ට','අලුත් V2 migration එකක් සාදන්න','Database file එක delete කරන්න'],1,'Versioned changes එකිනෙක immutableව තබා upgrade path එක ආරක්ෂා කරන්න.'),{ref:erp?'https://documentation.red-gate.com/flyway/flyway-concepts/migrations':'https://docs.sqlalchemy.org/en/20/tutorial/metadata.html'}),
      lesson(20,'API contract, validation සහ CRUD','Request/response shapes සහ error status codes UI එකට ගළපන්න.',[
        ['Contract එකෙන් පටන් ගන්න','GET /api/products → direct JSON array. Product {id,name,price_minor,stock}. POST transaction → {items:[{product_id,quantity}], ...}. Success response එකේ id, status, total_minor සහ items. Frontend model names backend JSON keys වලට exact ගළපන්න.'],
        ['Validation layers',erp?'Jakarta Validation @Min/@Max සහ @NotBlank DTO fields validate කරනවා. Service එක product existence සහ state rules බලනවා. Database constraints අවසාන integrity boundary එකයි. @RestControllerAdvice errors consistent JSON බවට හරවයි.':'Pydantic strict integers, length limits සහ extra="forbid" request shape පරීක්ෂා කරනවා. Service එක stock/existence බලනවා. Database constraints integrity තබනවා. Unexpected exception stack traces clientට නොදෙන්න.'],
        ['Error messages සහ REST','Invalid shape 422 (FastAPI) / 400 (Spring), missing product 404, stock/state conflict 409. Error status එක test කරන්න. API docs එක generated වුණත් business rules සහ role requirements API-CONTRACT.md එකේ ලියන්න. Read සහ write operations responsibilities වෙන් කරන්න.']
      ],'API-CONTRACT.md',`GET /api/products -> 200 Product[] § Public catalog response එක direct array එකක්.
POST /api/${erp?'requests':'orders'} -> 201 § නව transaction එකක් සාදන endpoint එක.
{ "items": [{ "product_id": 1, "quantity": 2 }] } § Serverට යවන්නේ IDs සහ counts පමණක්.
{ "id": 1, "status": "${erp?'PENDING':'COMPLETED'}", "total_minor": 90000 } § අවශ්‍ය response fields වල කෙටි sketch එක; actual response එකේ items ද තියෙනවා.
404 -> product not found § නැති resource එකකට error එක.
409 -> ${erp?'already approved':'insufficient stock'} § Valid shape එකක් වුණත් business state එකෙන් action එක නවතයි.`,['API-CONTRACT.md එක Files tab එකේ කියවන්න.','Final backend run කර catalog GET එක browser එකෙන් test කරන්න.','API docs හෝ requests.http එකෙන් valid සහ invalid bodies යවන්න.','Response code සහ JSON keys frontend models.ts එක්ක ගළපන්න.'],'Valid request එක 201. Invalid quantity, unknown product සහ stock conflict එකිනෙක නිවැරදි status ලබාදෙනවා.','Client එක price/role/is_admin යැව්වත් server එය trust නොකරන්න. Request DTO එකේ allowed fields පමණක් ගන්න.',q('Product ID එක database එකේ නැත්නම්?',['200 සහ empty receipt','404','Frontend total එක save කරන්න'],1,'Resource එකක් නැතිවීම 404 contract එකෙන් කියන්න.')),
      lesson(21,erp?'Approval එක දෙවරක් නොවෙන transaction එක':'Stock-safe checkout සහ transactions','Failure එකක් අතරමැද වුණත් partial updates save නොවන flow එක හදන්න.',[
        ['All or nothing',erp?'Request state PENDING → APPROVED. Manager permission verify කර PENDING state එක conditional update එකකින් claim කරන්න. පසුව products stock වැඩි කර audit event save කරන්න. ඕනෑම failure එකක මුළු transaction එක rollback විය යුතුයි.':'Order header, item prices සහ stock decrements එක transaction එකක කරන්න. දෙවන item එක fail වුණොත් පළමු stock decrement එකත් rollback විය යුතුයි. Product stock conditional UPDATE ... WHERE stock >= quantity එකෙන් reserve කරන්න.'],
        ['Concurrency',erp?'දෙදෙනෙක් එකම request එක approve කළත් UPDATE ... WHERE status = PENDING එකේ row count එක එක් winner කෙනෙකුට පමණක් 1 විය යුතුයි. වෙනත් request එකට 409. State update සහ stock update එක එකම transaction boundary එකේ තබන්න.':'මුලින් stock කියවලා පසුව set කිරීමෙන් race condition එකක් ඇති විය හැක. Atomic conditional decrement එකෙන් negative stock වැළැක්වෙයි. Multi-product updates stable product_id order එකේ කරන්න; deadlocks සඳහා retry policy production එකේ සැලසුම් කරන්න.'],
        ['Retry සහ idempotency',erp?'Approve retry එක 409 වෙලා inventory දෙවරක් නොවිය යුතුයි. UI එක latest status refresh කර “already approved” කියන්න.':'මේ reference එකේ successful POST retry එක අලුත් order එකක් සාදනවා. Production release එකට durable idempotency key + request hash + saved response strategy එක එකතු කර parallel duplicate tests කරන්න. UI button disable එක server idempotency වෙනුවට නොවේ.']
      ],erp?'backend/.../PurchaseService.java · transaction pattern':'backend/app/service.py · transaction pattern',erp?`@Transactional § පහත method එකේ writes එක transaction එකකට ගනී.
public void approve(long id) { § Manager-checked controller එකෙන් call කරන service action එක.
  int changed = repository.claimPending(id); § PENDING -> APPROVED conditional update එක.
  if (changed != 1) throw new ConflictException("Already approved"); § දෙවන approval එක නවතයි.
  increaseStockForItems(id); § Request items සඳහා stock වැඩි කරයි.
  auditRepository.record(id, "APPROVED"); § Audit event එක same transaction එකේ තබයි.
} § Uncaught runtime failure එකක් transaction rollback කරයි.`:`with session.begin(): § Success නම් commit; exception නම් rollback.
    for item in sorted(items, key=lambda row: row.product_id): § Stable update order එකක් තබයි.
        changed = reserve_stock(session, item.product_id, item.quantity) § Conditional atomic stock decrement එක.
        if changed != 1: § Stock නොමැති හෝ product නැති බව හඳුනාගනී.
            raise StockConflict("Not enough stock") § මුළු transaction එක rollback වීමට failure දෙයි.
        save_order_item(session, order, item) § Price snapshot එකත් same transaction එකේ save කරයි.`,erp?['Pending purchase request එකක් create කරන්න. Staff account එකෙන් approve කර 403 බලන්න.','Manager account එකෙන් approve කර stock එක quantity එකෙන් වැඩි වීම බලන්න.','එම ID එක නැවත approve කර 409 සහ unchanged stock බලන්න.']:['Stock 3 product එකට quantity 2 checkout කරන්න. Stock 1 බලන්න.','Quantity 2 නැවත ඉල්ලා 409 බලන්න. Stock 1ම තියෙනවාද බලන්න.','Items දෙකක් ඇති order එකක දෙවැනි item failure එකක් දී මුලින්ම කළ stock change එක rollback වෙන test එක run කරන්න.'],'Business failure එකකදී partial changes නැහැ. History එක සහ stock එක එකිනෙක ගැළපෙනවා.','UI simulation එක concurrency proof එකක් නොවේ. Real backend/database tests වලින් invariants verify කරන්න.',q('Items තුනක transaction එකේ දෙවන item fail වුණොත්?',['පළමු change එක commit කරන්න','මුළු transaction එක rollback කරන්න','Error එක සඟවලා success දෙන්න'],1,'All-or-nothing boundary එකෙන් inventory සහ history consistency තබනවා.'),{ref:erp?'https://docs.spring.io/spring-data/jpa/reference/jpa/transactions.html':'https://docs.sqlalchemy.org/en/20/orm/session_basics.html'}),
      lesson(22,'Angular එක backend එකට connect කරමු','Dev proxy, HTTP client, errors සහ refresh flow එක end to end බලන්න.',[
        ['Relative API URLs','Frontend service එකේ /api/products වගේ relative URL භාවිතා කරන්න. npm start proxy එක /api requests backend port එකට යවයි. Docker තුළ Nginx /api proxy එක api service එකට යවයි. Docker browser URL එකේ api කියන service hostname එක වැඩ කරන්නේ නැහැ; ඒක container network එකටයි.'],
        ['Trust boundary එක','Front-end display total එක සහ server total එක success පසු compare කරන්න. Save response එකේ data එකෙන් receipt දක්වන්න. Success පසු catalog refresh කර stock update පෙන්වන්න. Error එකේ cart state තබන්න.'],
        ['Network debugging','DevTools → Network → request URL/method/body/status/response බලන්න. Proxy port එක backend port එකට ගැළපෙන්න ඕන. CORS policy එක authentication එකක් නොවේ. Same-origin proxy එකෙන් browser origin differences අඩු කරන්න.']
      ],'frontend/proxy.conf.json',`{ § Angular CLI dev proxy configuration එක.
  "/api": { § මේ prefix එකෙන් පටන්ගන්න requests proxy කරයි.
    "target": "http://127.0.0.1:${erp?'8080':'8000'}", § Host එකේ run වන backend URL එක.
    "secure": false § Local HTTP target එක සඳහා; HTTPS certificate bypass production එකේ භාවිතා නොකරන්න.
  } § Proxy rule එක අවසන්.
} § Configuration අවසන්.`,['Final backend run කර health response verify කරන්න.','frontend/ තුළ npm ci සහ npm start run කරන්න.','Browser localhost:4200 තුළ product list සහ transaction submit කරන්න.','Network tab එකේ /api URL, backend terminal log සහ response receipt එක එකට බලන්න.'],'Angular form එකෙන් යැවූ request එක backend database එකට save වෙනවා. Reload පසු stock/history පවතිනවා.','Status 0/502 → backend runningද, proxy target port එකද, service health එකද බලන්න. Raw database port එක browser එකට connect කරන්න එපා.',q('Docker තුළ browser එක GET කළ යුතු URL එක?',['http://api:8000','Same origin එකේ /api/products','postgres://db'],1,'Browser එක Nginx frontend origin එකට request දී server proxy එක container hostname එක resolve කරනවා.'),{ref:'https://angular.dev/tools/cli/serve#proxying-to-a-backend-server'}),
      lesson(23,'Authentication, roles සහ secrets','Login identity සහ action permissions backend එකේ enforce කරන්න.',[
        ['Identity සහ permission','Authentication “ඔබ කවුද?” කියන ප්‍රශ්නය. Authorization “මේ action එකට අවසර තියෙනවාද?” කියන ප්‍රශ්නය. Role dropdown එකක් UI එකේ තෝරාගැනීමෙන් permission එකක් ලැබෙන්නේ නැහැ. Credentials verify කළ identity එකෙන් server role එක තීරණය කළ යුතුයි.'],
        ['Reference app එකේ authentication',`මේ local reference එකේ HTTP Basic authentication ${erp?'staff සහ manager accounts':'cashier සහ manager accounts'} environment variables වලින් configure කරනවා. Passwords local .env file එකේ; browser memory එකේ පමණක් credentials තබනවා. Public catalog කියවීමට login අවශ්‍ය නැහැ. ${erp?'Request create staff/manager; approval manager පමණයි.':'Sale/order create authenticated account; history manager පමණයි.'} Real internet deployment එකට HTTPS අනිවාර්යයි.`],
        ['Production hardening path','Identity provider/session-based login, password hashing සහ rotation, rate limiting, audit identity, account lockout සහ trusted origins සලකා බලන්න. Cookie session එකක් භාවිතා කරනවා නම් Secure/HttpOnly/SameSite flags සහ CSRF protection සකස් කරන්න. Tokens logs/localStorage වලට නොයවන්න. Release tab එකේ මේ වැඩ වෙනම verify කරන්න.']
      ],'.env.example · configuration names',`MANAGER_USERNAME=manager § Manager identity එකේ local sample username එක.
MANAGER_PASSWORD=replace-with-a-long-local-password § ඔබ තෝරන password එක .env තුළ පමණක් දාන්න.
${erp?'STAFF':'CASHIER'}_USERNAME=${erp?'staff':'cashier'} § සීමිත privileges ඇති local account එක.
${erp?'STAFF':'CASHIER'}_PASSWORD=replace-with-another-password § වෙනම password එකක් තෝරන්න.
# Never commit .env; commit .env.example only § Placeholder template එක සහ actual credentials වෙන් කරයි.`,['ZIP root එකේ .env.example copy කර .env සාදා sample passwords වෙනස් කරන්න.','Docker flow එක .env read කරනවා. Local backend run කිරීමේදී README shell-specific environment instructions අනුගමනය කරන්න.','UI login inputs වල credentials දී valid request කරන්න. වැරදි password එකකට 401 බලන්න.','සීමිත role එකෙන් manager operation එකකට 403 බලන්න.'],'Credentials නැති/වැරදි requests 401. Identity තිබුණත් permission නැති action 403.','Authorization header එක Base64 encoding පමණයි; encryption එකක් නොවේ. Remote traffic සඳහා TLS අවශ්‍යයි.',q('Authenticated staff කෙනෙක් manager-only action එකක් කළොත්?',['200','403','Password එක response එකේ දෙන්න'],1,'Valid identity එකක් තිබුණත් required permission එක නැති නිසා 403.'),{ref:erp?'https://docs.spring.io/spring-security/reference/servlet/authorization/index.html':'https://fastapi.tiangolo.com/advanced/security/http-basic-auth/'}),
      lesson(24,'Tests සහ debugging · happy path එකෙන් එහා','Business invariants, real HTTP boundaries සහ failure recovery test කරන්න.',[
        ['Test levels','Unit test එක total/guards වගේ කුඩා function බලනවා. Integration test එක API + database transaction බලනවා. Browser journey එක user form → actual HTTP → persisted result බලනවා. එකම implementation එක copy කර expected value හදන test එකක් business bug එක අල්ලන්නේ නැහැ.'],
        ['අත්‍යවශ්‍ය scenarios',erp?'Staff forbidden approval, manager approval stock වැඩි වීම, repeat approval 409, invalid DTO, missing product, rollback සහ persistent history test කරන්න.':'Valid sale/order, insufficient stock, invalid count, unknown product, unauthenticated request, forbidden history සහ multi-item rollback test කරන්න. Price frontend එකෙන් වෙනස් කර body එකක් යැවූවත් server price save වෙනවාද බලන්න.'],
        ['Debug කිරීමේ පිළිවෙළ','Expected සහ actual result ලියන්න. එක minimum reproduction එකක් සාදන්න. Browser Network → API log → database state කියන අනුපිළිවෙළට බලන්න. Fix එකට පළමුව fail වෙන business test එකක් ලියන්න. Error message කියවීම නවත්වලා random dependencies reinstall කරන්න එපා.']
      ],'terminal · reference project',erp?`cd backend § Maven project root එකට යයි.
mvn test § HTTP/controller/service/database integration tests run කරයි.
mvn package § Tests pass වූ JAR එක package කරයි.
cd ../frontend § Angular project root එකට යයි.
npm ci § Lock file අනුව dependencies install කරයි.
npm run build § Type-check කර production frontend bundle එක build කරයි.`:`cd backend § Python project root එකට යයි.
.venv/bin/python -m pytest -q § Temporary database එකක් භාවිතා කර API/transaction tests run කරයි; Windows path shell selector එකේ බලන්න.
cd ../frontend § Angular project root එකට යයි.
npm ci § Lock file අනුව dependencies install කරයි.
npm run build § Type-check සහ frontend production build එක.`,['Backend tests run කරන්න. Windows Python සඳහා .venv\\Scripts\\python.exe -m pytest -q භාවිතා කරන්න.','Frontend production build run කරන්න.','UI එකෙන් empty, invalid, success, stock conflict සහ network-down cases කරන්න.','Bug එකක් හමු වුණොත් input, expected, actual සහ exact reproduction steps docs/bugs.md ලියන්න.'],'Backend tests pass. Frontend build pass. Failure එකකදී data consistency සහ user input තබාගන්නවා.','Build pass කියන්නේ user journey pass කියන එක නෙවෙයි. API tests + browser scenario දෙකම කරන්න.',q('Transaction integrity verify කරන හොඳ test එක?',['Button text එකම නැවත compare කිරීම','දෙවන item fail වූ විට පළමු stock update rollback වෙනවාද බැලීම','File නම තිබේද බැලීම පමණක්'],1,'Failure path එක database invariant එක verify කරනවා.'),{ref:erp?'https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html':'https://fastapi.tiangolo.com/tutorial/testing/'}),
      lesson(25,'Docker සහ Compose · එක command එකකින් stack එක','Image, container, network, volume සහ reverse proxy flow එක තේරුම්ගන්න.',[
        ['Image සහ container','Dockerfile recipe එකක්. Image built filesystem සහ process configuration එක. Container image එක run වන instance එක. Frontend build stage Node භාවිතා කරයි; runtime Nginx static files serve කරයි. API image එක backend runtime පමණක් තබනවා.'],
        ['Compose සහ data','compose.yaml frontend, api services සහ data volume එක එකට දක්වනවා. Browser localhost:8088 → frontend Nginx → /api proxy → API → database volume. Host port එක සහ container port එක වෙනස් විය හැක. Named volume එක container recreate කළත් data තබනවා.'],
        ['Environment සහ secrets','Root .env values Compose environment injection එකට භාවිතා කරනවා. Dockerfile එකට secrets COPY කරන්න එපා. .dockerignore සහ .gitignore දෙකම තබන්න. compose down containers නවතනවා; down -v named data volume එකත් මකන නිසා routine stop එකට -v දාන්න එපා.']
      ],'terminal · extracted project root',`docker --version § Docker CLI තිබේද බලයි.
docker compose version § Compose plugin version බලයි.
docker compose config --quiet § Resolved configuration syntax validate කරයි; values print නොකරයි.
docker compose up --build -d § Images build කර services background එකේ start කරයි.
docker compose ps § Services health සහ port mappings බලයි.
docker compose logs --tail=80 api § API startup/errors කියවයි; credentials print නොකරන්න.
docker compose down § Containers නවතා remove කරයි; named data volume තබයි.`,['Docker Engine/Desktop start කර root .env file එක සකස් කරන්න.','Project root එකේ commands run කරන්න. මුල් build එකට internet අවශ්‍යයි.','http://localhost:8088 බලලා sale/request එකක් save කරන්න.','compose down පසුව up -d කර ඒ history එක පවතිනවාද බලන්න.'],'Frontend සහ backend එකම public port එකෙන් වැඩ කරනවා. Restart පසු database history තියෙනවා.','Connection refused → Docker daemon සහ compose ps බලන්න. api hostname එක browser URL එකට දාන්න එපා.',q('Data volume තබාගෙන stack එක නවත්වන්නේ?',['docker compose down','docker compose down -v','Database file delete කරලා'],0,'down named volumes තබනවා; -v ඒවා ඉවත් කරනවා.'),{ref:'https://docs.docker.com/compose/gettingstarted/',where:'Extracted project root · compose.yaml සහ .env ඇති folder එක'}),
      lesson(26,'GitHub, review සහ CI pipeline එක','Pull request එකකින් tests සහ image builds automatically run කරන්න.',[
        ['Local Git → GitHub','GitHub account එකෙන් empty private repository එකක් සාදන්න. remote add origin <ඔබේ repository URL> දී push කරන්න. SSH key හෝ approved credential manager භාවිතා කරන්න. Password/token command history එකේ URL එකකට දාන්න එපා.'],
        ['CI එකේ gates','Included .github/workflows/ci.yml backend tests, frontend npm ci/build සහ container builds run කරනවා. Pull request එකකට workflow status green වීම merge prerequisite එකක් කරන්න. Tests fail නම් deploy නොකරන්න. මේ workflow hosting account එකකට auto-deploy කරන්නේ නැහැ.'],
        ['Release artifact එක','Review කළ commit SHA එක image tag එකකට ගළපන්න. Release note එකේ migration, config change සහ rollback path ලියන්න. Registry publish සහ host deploy steps environment secrets සහ approval policy අනුව configure කරන්න. latest tag එකට පමණක් rollback rely කරන්න එපා.']
      ],'terminal · project root',`git status § Accidental files සහ secrets stage වෙලාද බලයි.
git diff § වෙනස්කම review කරයි.
git add .github/workflows/ci.yml § CI configuration එක stage කරයි.
git commit -m "ci: verify app and container builds" § Review කළ වෙනස history එකට දායි.
# Add your own GitHub remote in the repository settings instructions § Placeholder URL එක copy කර run නොකර ඔබේ remote එක භාවිතා කරන්න.
git push -u origin feature/catalog § ඔබේ existing remote එකට feature branch එක publish කරයි.`,['GitHub empty private repository එකක් ඔබම සාදා remote URL එක copy කරන්න.','git remote add origin සමඟ ඔබේ URL එක සකස් කර branch push කරන්න.','Pull request එකක් open කර Actions result බලන්න.','Tests fail කළ වෙනසක් තාවකාලිකව දාලා CI red වන බව බලලා fix කරන්න.'],'PR එකේ backend tests, frontend build සහ container build status පෙනෙනවා.','මෙහි learning UI එක GitHub වෙත push කරන්නේ නැහැ. ඒ commands ඔබේ project සහ account එකේ run කරන්න.',q('CI red නම්?',['එහෙමම release කරන්න','Fail වූ check එක කියවලා fix කර නැවත run කරන්න','Test file delete කරන්න'],1,'Checks release කිරීමට පෙර අවශ්‍ය evidence ලබාදෙනවා.'),{ref:'https://docs.docker.com/build/ci/github-actions/'}),
      lesson(27,'Production release, backup සහ rollback','Local working demo එකෙන් operated release එකකට අවශ්‍ය වැඩ පිළිවෙළට සම්පූර්ණ කරන්න.',[
        ['Release කියන්නේ server run කිරීම පමණක් නොවේ','Domain සහ HTTPS, identity policy, production database, migration job, secrets, rate limits, durable idempotency, logs/metrics සහ backup restore සම්පූර්ණ කරන්න. මේ reference ZIP එක local learning capstone එකක්. Release checklist එක self-reported evidence එකක්; production certification එකක් නෙවෙයි.'],
        ['Staging → deploy → smoke','Production වගේ staging environment එකක fresh install සහ upgrade දෙකම test කරන්න. Backup ගෙන restore rehearse කරන්න. Exact image tag/SHA deploy කර health, catalog, unauthorized request සහ එක් sandbox transaction smoke test කරන්න. Logs වල passwords/Authorization header/customer address නොයවන්න.'],
        ['Incident සහ recovery','Error rate, latency, disk usage සහ failed business actions monitor කරන්න. Alert owner සහ incident runbook ලියන්න. App rollback කළත් incompatible DB migration එක undo නොවේ. Backup restore අවශ්‍ය නම් recover කරන data window (RPO) සහ downtime target (RTO) දැනගන්න.']
      ],'docs/release-runbook.md',`1. Confirm tests and review for the exact commit § Release කරන code එකටම evidence තබන්න.
2. Back up data and prove restore in staging § Backup file තිබීම පමණක් මදි; restore කර data verify කරන්න.
3. Apply reviewed migrations once § DB version එක track කර controlled migration job එකක් run කරන්න.
4. Deploy versioned images behind HTTPS § Immutable artifact සහ TLS boundary එක.
5. Smoke test, observe, then open traffic § Health සහ business flow verify කර traffic දෙන්න.
6. Roll back compatible images if checks fail § Prior image tag එක සහ DB compatibility plan එක භාවිතා කරන්න.`,['Release tab එකේ සෑම item එකක්ම එහි evidence අනුව review කරන්න.','docs/release-runbook.md තුළ ඔබේ domain, image tags, backup path සහ rollback commands ලියන්න.','Staging එකේ failure එකක් simulate කර rollback/recovery rehearse කරන්න.','ඔබේ demo එකේ limitations සහ ඉදිරියේ කළ යුතු වැඩ README එකේ ලියන්න.'],'Testing, deployment සහ incident response සඳහා නැවත කළ හැකි runbook එකක් සහ evidence තියෙනවා.','මේ checklist tick කළා කියලා real host එකක් deploy වෙන්නේ නැහැ. සැබෑ environment එකේ results verify කරන්න.',q('Backup එකක් විශ්වාස කළ හැක්කේ?',['File එක තිබුණාම','Restore කර data සහ app verify කළ පසු','Filename එකේ backup තිබුණාම'],1,'Restore rehearsal එකෙන් backup එක භාවිතා කළ හැකි බව ඔප්පු කරනවා.'),{ref:'https://fastapi.tiangolo.com/deployment/concepts/'})
    ];
  }
  const releases = [
    ['Scope සහ acceptance tests','Success, invalid input, permission failure සහ business conflict cases සම්පූර්ණ කරන්න.'],
    ['Production identity සහ HTTPS','Demo environment accounts වෙනුවට reviewed identity/session policy, rotation සහ TLS configure කරන්න.'],
    ['Server authorization','සීමිත role එකකට raw API request එකකින් privileged action කළ නොහැකි බව test කරන්න.'],
    ['Durable idempotency සහ concurrency','Retry/duplicate POST, parallel stock updates සහ repeated approvals actual production DB එකේ test කරන්න.'],
    ['Migrations සහ database','DB-specific upgrade path, indexes, connection limits සහ staging migration results සටහන් කරන්න.'],
    ['Backups සහ tested restore','Encrypted backup එක වෙනම storage එකකට තබා restore rehearsal සහ RPO/RTO ලියන්න.'],
    ['CI සහ versioned artifacts','Exact commit එකේ tests/builds pass වී reviewed image tags සහ previous version තබාගන්න.'],
    ['Secrets සහ request limits','Tracked files/images තුළ credentials නැහැ. Rate/body limits, CORS/CSRF policy සහ dependency review සකස් කරන්න.'],
    ['Observability සහ audit','Health/readiness, redacted logs, error/latency alerts සහ action audit identity verify කරන්න.'],
    ['UI සහ accessibility','320px–1440px, keyboard, loading/empty/error states සහ reduced motion පරීක්ෂා කරන්න.'],
    ['Smoke test සහ rollback','Staging business flow සහ compatible DB/image rollback rehearsal කරන්න.'],
    ['Operations handover','Runbook එකේ owner, alert contact, rotation schedule සහ incident steps ලියන්න.']
  ];
  window.BUILD_CURRICULUM={projects,phases,lessons,releases};
})();
