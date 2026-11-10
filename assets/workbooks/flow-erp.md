# Flow ERP — Sinhala project workbook

Follow these milestones in order. Final source files are a reference implementation; build your own copy separately.

## 01. මෙතැනින් පටන් ගන්න · ඔබේ ගමන

කිසිම coding experience එකක් නැති තැනකින් පළමු project එකේ වැඩ කරන පිළිවෙළ දැනගන්න.

### Project එකක් කියන්නේ මොකක්ද?

Flow ERP කියන්නේ එකට වැඩ කරන screen එකක්, API එකක් සහ database එකක්. Screen එකේ button එක click වීම පමණක් project එක අවසන් වීමක් නෙවෙයි. Staff කෙනෙක් product සහ quantity දී purchase request එකක් සාදයි. Manager approve කළ පසු පමණක් stock වැඩි විය යුතුයි.

### අනුපිළිවෙළ මෙහෙමයි

මුලින් user සහ problem එක ලියන්න. ඊළඟට screen එක අඳින්න. HTML/CSS/JavaScript ඉගෙනගෙන Angular UI එක හදන්න. පසුව language basics, API, database, rules, integration, security, tests සහ deployment කරන්න. Sidebar එකේ 01 → 28 පිළිවෙළ ඒ අනුවයි.

### මෙය භාවිතා කරන හැටි

එක lesson එකක් කියවලා code line එකක් තෝරන්න. Replay එකෙන් ඒ code එක විස්තර කරන අනුපිළිවෙළ බලන්න. Practical steps කරලා expected result එකට ගළපන්න. Quiz එක pass කර practical එකත් කළ පසු milestone එක complete කරන්න. File explorer එකේ සම්පූර්ණ final source තියෙනවා.

### Code: PROJECT-JOURNEY.md

```text
1. Understand the user
2. Draw the screen and data flow
3. Build one small working feature
4. Save data and enforce rules
5. Test, package, release, observe
```

1. User කවුද, විසඳන ප්‍රශ්නය මොකක්ද කියලා ලියන්න.
2. Layout සහ request ගමන මුලින් අඳින්න.
3. මුලින් product list එකක්; එකවර project එකම නොලියන්න.
4. API සහ database වලින් විශ්වාස කළ හැකි state තබන්න.
5. Happy path පමණක් නොව failure, backup සහ rollback බලන්න.

### Practical

1. මේ project එකේ overview සහ features හතර කියවන්න.
2. Blueprint tab එකෙන් UI → API → database ගමන බලන්න.
3. Lesson 02 වෙත ගොස් brief එක ලියන්න. Final ZIP එක Files tab එකේ තියෙනවා.

Expected: ඔබට user, problem සහ build කරන features හතර කියන්න පුළුවන්. ඊළඟට යා යුතු lesson එක sidebar සහ Continue button දෙකෙන්ම පෙනෙනවා.

Fix: මුලින් Docker හෝ authentication පටන් ගන්න එපා. ඒවා අවශ්‍ය තැනට පෙර පදනම සකස් කරන්න.

Checkpoint: පළමුව කළ යුත්තේ කුමක්ද?

1. Database server මිලදී ගන්න
2. User සහ problem එක පැහැදිලි කරන්න
3. Animations සියල්ල හදන්න

Answer: 2. Userගේ අවශ්‍යතාවෙන් scope සහ screen තීරණය වෙනවා.

## 02. Idea එකෙන් requirements සහ plan එකට

ලියන්න ඕන features, නොකරන features සහ acceptance criteria වෙන් කරගන්න.

### User story

Staff සහ purchasing manager සඳහා මේ story එක ලියන්න: “Staff කෙනෙක් product සහ quantity දී purchase request එකක් සාදයි. Manager approve කළ පසු පමණක් stock වැඩි විය යුතුයි.” Actors සහ action වෙන් කරන්න. “App එක ලස්සන වෙන්න ඕන” කියන එක පරීක්ෂා කළ හැකි requirement එකක් නෙවෙයි.

### MVP සහ scope

මුල් release එකේ Inventory dashboard, Purchase requests, Manager approval, Audit history පමණක්. Payroll, accounting සහ multi-company වෙනම extensions. මේ සීමාව නිසා සම්පූර්ණ කුඩා product එකක් අවසන් කරන්න පුළුවන්.

### Acceptance criteria සහ task order

එක request එකක් දෙවරක් approve කළොත් stock දෙවරක් වැඩි නොවිය යුතුයි. Staff කෙනෙකුට approval permission නැහැ. මෙය test කරන්න පුළුවන් Given/When/Then වාක්‍යයකට හරවන්න. Task board එකේ Plan → Ready → In progress → Review → Done columns දාන්න. Product data shape තීරණය කළ පසු API contract එක ලියන්න.

### Code: docs/brief.md

```text
# Flow ERP — project brief
Actor: Staff සහ purchasing manager
Goal: Approve request
Given: a product with stock 3
When: a manager approves 2 units
Then: stock is 5 and one purchase is saved
Failure: second approval returns 409
```

1. Project නම සහ scope එකේ ආරම්භය.
2. කාටද මේ system එක හදන්නේ කියලා සටහන් කරයි.
3. ප්‍රධාන user action එකයි.
4. Test එකේ මුල් තත්ත්වය; known data දෙන්න.
5. එක් action එකක් නිශ්චිතව දෙන්න.
6. Action එකේ පරීක්ෂා කළ හැකි ප්‍රතිඵලය.
7. Happy path එකට අමතර failure rule එක.

### Practical

1. VS Code එකේ docs folder එක සාදා brief.md ලියන්න.
2. Home, catalog, cart/request, history කියලා screens හතර කඩදාසියක අඳින්න.
3. එක් feature එකකට success සහ failure acceptance criteria දෙකක් ලියන්න.
4. Blueprint → Process බලලා ඔබේ drawing එකට ගළපන්න.

Expected: Scope එකේ features හතර, actors, screens සහ test කළ හැකි business rule එකක් ඇති brief.md file එකක්.

Fix: Feature list එක දිගින් දිගට වැඩි කළොත් පළමු release එක නතර වෙනවා. අලුත් අදහස් Later list එකට දාන්න.

Checkpoint: Test කළ හැකි requirement එක කුමක්ද?

1. App එක amazing වීම
2. Stock 3 තිබියදී quantity 4 ඉල්ලුවොත් 409 දීම
3. Modern technology භාවිතා කිරීම

Answer: 2. Known input සහ observable result ඇති rule එක test කළ හැක.

## 03. Terminal, tools සහ folder එක

Editor, runtime, shell සහ project root කියන දේ මුල සිට වෙන්කරගන්න.

### Tools හතරක්

Browser එක UI පෙන්වනවා. VS Code files edit කරනවා. Terminal එක commands ගන්නවා. Runtime එක language code execute කරනවා. Node.js Angular tooling සඳහායි. Python/Java backend සඳහායි. Tool install වීම සහ project dependency install වීම වෙනම දෙකක්.

### Install සහ verify

Node.js 24.15.0+ (24.x), Git සහ JDK 17+ සහ Maven 3.6.3+ install කරන්න. Windows installer එකේ PATH option තෝරලා terminal නැවත විවෘත කරන්න. macOS/Linux හි නිල installer හෝ OS package manager භාවිතා කරන්න. Docker Desktop/Engine පසුව lesson 26 සඳහායි. මේ learning site එකට ඒවා අවශ්‍ය නැහැ.

### Current directory

VS Code → File → Open Folder → Projects folder එක තෝරන්න. Terminal → New Terminal. pwd / Get-Location / cd මඟින් current folder බලන්න. mkdir folder එකක් සාදනවා; cd ඒ folder එකට යනවා. Commands වල $ හෝ > prompt characters copy නොකරන්න.

### Code: terminal · Projects/

```text
node --version
npm --version
git --version
java -version
mkdir flow-erp-practice
cd flow-erp-practice
```

1. Node runtime version බලයි; v24.15.0 හෝ අලුත් 24.x patch එකක් තෝරන්න.
2. Node සමඟ ලැබෙන package manager version එක පෙන්වයි.
3. Git install එක හමු වෙනවාද බලයි.
4. Backend language runtime version බලයි; Windows Python සඳහා py --version.
5. ඔබම පියවරෙන් පියවර හදන project එකට folder එකක් සාදයි.
6. පසුව commands execute කරන current folder එක වෙනස් කරයි.

### Practical

1. මේ lesson එකේ official installers links භාවිතා කර tools install කරන්න.
2. Version commands එකින් එක run කර output බලන්න. Windows Python command එකට py භාවිතා කරන්න.
3. Project folder එක VS Code එකෙන් Open Folder කරන්න. Explorer එකේ folder නම සහ terminal current path එක ගළපන්න.
4. Download කරන final reference ZIP එක වෙනම folder එකකට extract කරන්න. ඒක practice folder එකට මිශ්‍ර නොකරන්න.

Expected: Version අංක පෙනෙනවා. Editor සහ terminal දෙකම ඔබ හදපු practice folder එකට යොමු වෙලා තියෙනවා.

Fix: Command not found → install/PATH/terminal restart බලන්න. npm error ENOENT → package.json ඇති folder එකේද බලන්න.

Checkpoint: cd command එකෙන් කරන්නේ?

1. Folder එක delete කිරීම
2. Current folder එක මාරු කිරීම
3. Dependencies install කිරීම

Answer: 2. cd කියන්නේ change directory. Commands run වන ස්ථානය එයින් තීරණය වෙනවා.

### unix commands / Projects parent folder → project practice root

```text
pwd
node --version
java -version
mvn --version
mkdir flow-erp-practice
cd flow-erp-practice
```

### powershell commands / Projects parent folder → project practice root

```text
Get-Location
node --version
java -version
mvn --version
mkdir flow-erp-practice
cd flow-erp-practice
```

### cmd commands / Projects parent folder → project practice root

```text
cd
node --version
java -version
mvn --version
mkdir flow-erp-practice
cd flow-erp-practice
```

Official reference: https://angular.dev/tools/cli/setup-local

## 04. පළමු file එකේ සිට Git පුරුද්දට

Code වෙනස්කම් අහිමි නොවන විදිහට කුඩා commits තබන්න.

### Working tree → index → commit

Editor එකේ save කරන file එක working tree එකේ. git add ඒ මොහොතේ file content stage කරනවා. git commit staged snapshot එක history එකට දානවා. Commit කළ පසු කරන edit එක අලුතින් stage කළ යුතුයි.

### Identity සහ ignore

git config --global user.name සහ user.email ඔබේ සැබෑ values වලට සකස් කරන්න. .gitignore තුළ node_modules/, .venv/, .env, target/, dist/ දාන්න. .env.example එක placeholder configuration නිසා commit කරන්න. .env secret file එක commit කරන්න එපා.

### එක feature එකකට එක branch

main branch එකේ වැඩ කරන project එක තබන්න. feature/catalog වගේ branch එකක වෙනස්කම් කර tests pass වූ පසු review කර merge කරන්න. GitHub remote එක internet copy එකක්; git init පමණක් GitHub account එකක් සාදන්නේ නැහැ.

### Code: terminal · practice project root

```text
git init -b main
git status
git add docs/brief.md .gitignore
git diff --staged
git commit -m "docs: define project scope"
git switch -c feature/catalog
```

1. Local repository එක main branch එකෙන් අරඹයි.
2. Modified, staged සහ untracked files බලයි.
3. මෙහි files දෙකේ current content stage කරයි.
4. Commit වීමට යන exact වෙනස්කම කියවයි.
5. පළමු review කළ snapshot එක ලියයි.
6. Catalog එකට අලුත් branch එකක් සාදා එයට මාරු වෙයි.

### Practical

1. Lesson 02 සිට folder එකේ docs/brief.md සහ .gitignore files සාදන්න.
2. Identity සකස් කර ඉහත commands run කරන්න.
3. brief.md එකේ line එකක් වෙනස් කර git diff බලන්න. නැවත git add සහ commit කරන්න.

Expected: git log --oneline තුළ කුඩා commits දෙකක් පෙනෙනවා. .env සහ dependencies stage වෙලා නැහැ.

Fix: Git user identity unknown නම් ඔබේ user.name/email සකස් කරන්න. Secret එකක් commit වුණොත් file delete කිරීම පමණක් මදි; credential එක rotate කරන්න.

Checkpoint: git add කළ පසු file එක edit කළොත්?

1. අලුත් edit එකත් නිරායාසයෙන් stage වෙනවා
2. අලුත් edit එක නැවත stage කළ යුතුයි
3. Commit history මැකෙනවා

Answer: 2. Index එකට ගත්තේ add කළ මොහොතේ snapshot එකයි.

Official reference: https://git-scm.com/docs/gittutorial

## 05. Screen එකේ skeleton එක · HTML

Heading, product card, form සහ button නිවැරදි HTML elements වලින් ලියන්න.

### HTML කියන්නේ structure

Tag එකක් content එකේ අර්ථය කියනවා. h1 main heading, main ප්‍රධාන content, article product එකක්, form inputs එකතු කරන boundary එක. Browser එක මේ HTML එක DOM කියන tree එකකට පරිවර්තනය කරනවා.

### Attributes සහ labels

class styling hook එකක්. id page එකේ unique name එකක්. label for එක සහ input id එක ගළපන්න. required browser-level feedback එකක් දෙයි; backend validation වෙනුවට නොවේ.

### Button එකේ behavior

Form එකක් තුළ type="button" නම් click action එකක්. type="submit" නම් form submit එක. Native button එක keyboard එකෙන් භාවිතා කළ හැක. Clickable div එකක් සාදනවට වඩා මෙය පැහැදිලි සහ accessible.

### Code: lab/index.html

```text
<main>
  <h1>Flow ERP</h1>
  <article class="product-card">
    <h2>Notebook</h2>
    <p>Rs. 450.00</p>
    <label for="qty">Quantity</label>
    <input id="qty" type="number" min="1" value="1">
    <button type="button">Add item</button>
  </article>
</main>
```

1. Page එකේ ප්‍රධාන content region එක.
2. එක ප්‍රධාන heading එකක් ලබාදෙයි.
3. එක් product එක අර්ථවත් content කොටසකට ගනී.
4. Product නම subheading එකක් ලෙස පෙන්වයි.
5. මිල text එකක් ලෙස පෙන්වයි.
6. Input එකට visible accessible name එක.
7. Numeric input එකක් සහ මුල් value එකක්.
8. Keyboard එකෙන් click කළ හැකි action එක.
9. Product card එක අවසන් කරයි.
10. Main region එක අවසන් කරයි.

### Practical

1. practice folder එකේ lab folder එකක් සාදා index.html හදන්න.
2. ඉහත code එක <html lang="en"><head><title>Practice</title></head><body> … </body></html> තුළ save කරන්න.
3. File එක browser එකෙන් open කරන්න. Tab key එකෙන් input සහ button focus කරන්න.

Expected: Heading, price, quantity සහ Add item button browser එකේ පෙනෙනවා. තවම button එකට JavaScript behavior නැහැ.

Fix: Placeholder එක label එකක් නොවේ. Button click කළාට action නැත්නම් ඒක HTML error එකක් නෙවෙයි; handler එක තවම ලියා නැහැ.

Checkpoint: Input එකකට accessible name දෙන්නේ?

1. Visible label එකෙන්
2. Color එකෙන් පමණක්
3. div tag ගණනෙන්

Answer: 1. label for සහ input id මඟින් control එක හඳුනාගන්න පුළුවන්.

Official reference: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content

## 06. UI එක දිහා බලලා CSS වලට කඩමු

Spacing, grid, typography, colors සහ responsive rules හඳුනාගන්න.

### Design එකට ruler එකක්

මුලින් page regions වෙන් කරන්න: header, catalog, cart. ඊළඟට spacing scale 4/8/12/16/24/32px එකක් තෝරන්න. Typography sizes සහ primary color එක CSS variables ලෙස ලියන්න. හැම element එකකටම වෙන වෙනම random margins දාන්න එපා.

### Grid සහ box model

border-box තුළ declared width එකට padding/border ඇතුළත් වෙනවා. Grid columns සඳහා minmax(0,1fr) භාවිතා කරන්න. Flex එක aligned header actions සඳහායි. gap children අතර ඉඩ දෙයි; padding card එක ඇතුළේ ඉඩයි.

### Responsive සහ feedback

Desktop එකේ columns දෙකක් phone එකේ එකක් කරන්න. Empty, loading, error, success state හතරම අඳින්න. Live studio එකේ gap සහ radius sliders වෙනස් කර generated CSS එකේ values වෙනස් වන හැටි බලන්න.

### Code: lab/styles.css

```text
:root { --space: 16px; --accent: #246c54; }
* { box-sizing: border-box; }
.catalog { display: grid; gap: var(--space); }
.catalog { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.product-card { padding: 16px; border: 1px solid #dbe5da; border-radius: 12px; }
button { background: var(--accent); color: white; }
@media (max-width: 640px) { .catalog { grid-template-columns: 1fr; } }
```

1. නැවත භාවිතා කරන design tokens දෙකක්.
2. Padding සහ border width එක ඇතුළට ගනී.
3. Product container එක grid එකක් කර consistent gap දෙයි.
4. Equal columns දෙකක්; content overflow අඩු කරයි.
5. Card shape, inner space සහ boundary එක.
6. Action එක design token එකට ගළපයි.
7. Phone එකේ single column එකක්.

### Practical

1. HTML head එකට <link rel="stylesheet" href="styles.css"> එක් කරන්න.
2. Products දෙකක් <section class="catalog"> තුළ දාලා stylesheet save කරන්න.
3. Browser DevTools → responsive mode → 390px සහ 1280px දී බලන්න.
4. Live studio → Anatomy on කර regions සහ spacing හඳුනාගන්න.

Expected: Products desktop එකේ පැත්තෙන් පැත්තටත් phone එකේ එකට පහළින් එකත් පෙනෙනවා.

Fix: CSS apply නොවේ නම් file path, selector spelling සහ browser DevTools computed styles බලන්න. Fixed width:1200px phone එකට දාන්න එපා.

Checkpoint: Card එක ඇතුළේ ඉඩ පාලනය කරන්නේ?

1. padding
2. git add
3. HTTP method

Answer: 1. padding border එක සහ content එක අතර ඉඩයි.

Official reference: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout

## 07. JavaScript 0 සිට · values සහ variables

Number, string, boolean, const සහ let වෙනස project values වලින් තේරුම්ගන්න.

### Value සහ variable

450 කියන්නේ number එකක්. "Notebook" කියන්නේ string එකක්. true/false boolean values. Variable එකකට value එකකට නමක් දෙනවා. const binding එක නැවත assign කරන්න බැහැ; let නැවත assign කළ හැක.

### Money එක integers වලින්

මේ project එකේ price_minor කියන්නේ cents වගේ smallest currency unit එකේ integer value එක. Rs.450.00 → 45000. 0.1 + 0.2 වගේ floating-point rounding surprises මඟහරින්න totals integer arithmetic එකෙන් ගන්නවා. Display වෙද්දී පමණක් /100 කරන්න.

### Operators සහ type conversion

* multiply කරනවා. === value සහ type දෙකම සසඳනවා. Input element value එක string එකක්; Number(value) මඟින් number බවට convert කර Number.isInteger එකෙන් verify කරන්න. Empty string → 0 වන නිසා empty check එකත් අවශ්‍යයි.

### Code: lab/basics.js

```text
const productName = 'Notebook';
const priceMinor = 45000;
let quantity = 2;
const totalMinor = priceMinor * quantity;
const available = quantity > 0;
console.log(productName, totalMinor / 100, available);
```

1. වෙනස් නොකරන product name binding එක.
2. Rs.450.00 integer minor units වලින් තබයි.
3. User වෙනස් කළ හැකි count එක.
4. 45000 × 2 = 90000.
5. Comparison එක boolean result එකක් දෙයි.
6. Notebook 900 true පෙන්වයි.

### Practical

1. lab/index.html body එකේ අවසානයට <script src="basics.js"></script> එක් කරන්න.
2. ඉහත basics.js save කර browser DevTools → Console බලන්න.
3. quantity එක 3 කර reload කරන්න. totalMinor 135000 වෙනවාද බලන්න.

Expected: Console එකේ Notebook 900 true පෙනෙනවා. quantity වෙනස් කර total එක predict කරන්න පුළුවන්.

Fix: "2" + 1 → "21". Numeric input එකක value එක number එකක් කියලා උපකල්පනය කරන්න එපා.

Checkpoint: 45000 * 2 minor units රුපියල්වලින්?

1. Rs. 900.00
2. Rs. 45002.00
3. Rs. 90.00

Answer: 1. Minor total 90000 → /100 = රුපියල් 900.

Official reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types

## 08. Functions, conditions සහ events

Input → decision → return value ගමන සහ click handler එකක් ලියන්න.

### Function කියන්නේ reusable වැඩක්

Parameter කියන්නේ function input එකේ නම. Argument කියන්නේ call කරන විට දෙන actual value එක. return result එක caller වෙත දෙනවා. console.log එක පෙන්වීමක් පමණයි.

### Guard clauses

quantity integer නොවේ නම් හෝ 1ට අඩු නම් early return කරන්න. stock ඉක්මවන්නේ නම් error එකක් දෙන්න. Success path එකේ valid result එක return කරන්න. එකම guard එක frontend සහ backend දෙකේම තිබුණත් server එක අනිවාර්යයෙන් verify කළ යුතුයි.

### Event → state → view

User click එක event එකක්. Handler එක input කියවලා validation කර state වෙනස් කරනවා. පසුව UI render වෙනවා. Plain JavaScript lab එකේ addEventListener; Angular එකේ (click)="add()" binding භාවිතා කරනවා.

### Code: lab/functions.js

```text
function lineTotal(priceMinor, quantity, stock) {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error('Use a positive whole quantity');
  }
  if (quantity > stock) throw new Error('Not enough stock');
  return priceMinor * quantity;
}
console.log(lineTotal(45000, 2, 3));
```

1. Named function එක inputs තුනක් ගනී.
2. Fraction, NaN සහ non-positive quantities නවතයි.
3. Caller වෙත failure එක දන්වයි.
4. පළමු guard එක අවසන්.
5. Stock ඉක්මවන request එක නවතයි.
6. Valid input එකේ total එක return කරයි.
7. Function declaration එක අවසන්.
8. 90000 result එක පෙන්වයි.

### Practical

1. Console එකේ function එක paste කර valid call එක run කරන්න.
2. lineTotal(45000,4,3) සහ lineTotal(45000,0,3) run කර error messages බලන්න.
3. Try/catch block එකකින් error.message එක user-facing paragraph එකකට පෙන්වන හැටි ලියන්න.

Expected: Valid input සඳහා 90000. Invalid count සඳහා පැහැදිලි Error එකක්.

Fix: throw කළ error එක catch නොකළොත් ඒ call stack එක නවතී. Error එක සඟවන්න එපා; userට නිවැරදි කළ හැකි message දෙන්න.

Checkpoint: Function එකෙන් caller වෙත result දෙන්නේ?

1. console.log පමණක්
2. return
3. class attribute

Answer: 2. return actual value එක call කළ තැනට දෙයි.

Official reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions

## 09. Objects, arrays සහ cart එක

Product record එකක්, list එකක් සහ immutable updates හදන්න.

### Object සහ array

එක් product එකක් {id,name,price_minor,stock} object එකකින් දක්වන්න. Products ගොඩක් array එකකින් තබන්න. id identity එකයි; array index එක sorting/deleting පසු වෙනස් විය හැක.

### find, map, filter, reduce

find එක record එකක් සොයයි. map නව list එකකට transform කරයි. filter matching items පමණක් ගනී. reduce list එක එක result එකකට එකතු කරයි. Callback එකට array එකේ item එකින් එක ලැබෙනවා.

### State update එක readable කරමු

Spread syntax මඟින් අලුත් array/object reference එකක් සාදන්න. Cart එකේ තියෙන product එක නැවත add කළොත් quantity එක වැඩි කරන්න. ID අනුව update කිරීම නිසා වැරදි row එක වෙනස් වීම වැළකෙනවා.

### Code: lab/cart.js

```text
const products = [{ id: 1, name: 'Notebook', price_minor: 45000, stock: 3 }];
const cart = [{ product_id: 1, quantity: 2 }];
const item = products.find(p => p.id === cart[0].product_id);
const total = cart.reduce((sum, row) => {
  const product = products.find(p => p.id === row.product_id);
  return sum + (product?.price_minor ?? 0) * row.quantity;
}, 0);
console.log(item.name, total);
```

1. එක් record එකක් ඇති list එක.
2. Order payload එකට අවශ්‍ය IDs සහ quantities පමණක්.
3. Stable ID එක අනුව product සොයයි.
4. Starting value 0 සිට rows එකතු කරයි.
5. Price එකට අදාල local record එක ගනී.
6. Display total එක accumulate කරයි; server එක නැවත ගණනය කරයි.
7. reduce එකේ initial sum එක.
8. Notebook 90000 පෙන්වයි.

### Practical

1. Console එකේ list එකට දෙවන product එකක් සහ cart row එකක් එක් කරන්න.
2. reduce total එක අතින් ගණනය කර output එකට ගළපන්න.
3. filter භාවිතා කර quantity 0 rows ඉවත් කරන්න.

Expected: Products වෙනස් වුණත් ID අනුව cart total එක නිවැරදිව ගණනය වෙනවා.

Fix: UI total එක database එකට එහෙමම save කරන්න එපා. Server එක authoritative prices නැවත ගත යුතුයි.

Checkpoint: Stable record identity එකට සුදුසු?

1. Array index
2. Product id
3. Screen එකේ පිහිටීම

Answer: 2. IDs sorting සහ filtering පසුත් record එකම හඳුනාගන්නවා.

## 10. HTTP, JSON සහ async/await

Frontend එක backend එකෙන් data ගන්නේ කොහොමද කියලා බලන්න.

### Request සහ response

GET /api/products data කියවයි. POST /api/orders අලුත් order එකක් සාදයි. HTTP status එක result category එක. 200 read, 201 created, 400/422 invalid data, 401 missing identity, 403 forbidden, 404 missing record, 409 business conflict.

### JSON සහ promise

JSON data format එකක්. response.json() body එක parse කරන promise එකක් return කරනවා. await ඒ promise එකේ result එක ලැබෙන තුරු ඒ async function එක pause කරනවා. මුළු browser UI එක block කරන්නේ නැහැ.

### Failure states

fetch network failures වල reject වෙයි; HTTP 409 වගේ response එකක් promise එක resolve කළ හැකි නිසා response.ok වෙනම බලන්න. loading true මුලින් දාලා finally block එකෙන් false කරන්න. Double submit button එක disable කරන්න.

### Code: lab/http.js

```text
async function loadProducts() {
  const response = await fetch('/api/products');
  if (!response.ok) throw new Error('Cannot load products');
  const products = await response.json();
  return products;
}
```

1. Promise එකක් return කරන asynchronous function එක.
2. Relative URL එකේ GET request එක යවයි.
3. HTTP failure status එක explicitව පරීක්ෂා කරයි.
4. JSON response body එක JS values බවට parse කරයි.
5. Caller වෙත parsed list එක දෙයි.
6. Function අවසන්; මෙහි call කරන්නේ නැහැ.

### Practical

1. මේ function එක කියවලා request එක යන්නේ කුමන server එකටද කියන්න.
2. Blueprint → Request flow එකෙන් request සහ response arrows බලන්න.
3. API එක lesson 18දී run කළ පසු DevTools Network එකේ GET /api/products බලන්න. මේ standalone HTML lab එකේ backend තවම නැහැ.

Expected: GET method, URL, status සහ JSON body එක වෙන් කර හඳුනාගන්න පුළුවන්.

Fix: file:// page එකේ /api/products fetch කළොත් API එකක් ස්වයංක්‍රීයව ඇතිවෙන්නේ නැහැ. Dev server proxy සහ backend එක පසුව සම්බන්ධ කරන්න.

Checkpoint: fetch එකට HTTP 409 response එකක් ලැබුණොත්?

1. Always promise reject වෙනවා
2. response.ok පරීක්ෂා කළ යුතුයි
3. Request එක success කියලා save කරන්න

Answer: 2. HTTP error සහ network rejection වෙනම handle කරන්න.

Official reference: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

## 11. TypeScript · data එකේ හැඩය

JavaScript values වලට types දාලා contracts පැහැදිලි කරන්න.

### TypeScript → JavaScript

Browser එක run කරන්නේ JavaScript. TypeScript compiler එක types check කර JavaScript output හදනවා. string field එකකට number assign කළොත් build-time error එකක් දෙනවා. Runtime එකේ JSON validate කරන්නේ නැහැ.

### Interface සහ payload

Product කියන්නේ API එකෙන් ලැබෙන shape එක. CartLine කියන්නේ client එක යවන shape එක. Server එක total ගණනය කරන නිසා payload එකට price හෝ total දාන්නේ නැහැ. optional field සහ null value එක එකම දේ නෙවෙයි.

### unknown සහ narrowing

Untrusted value එකක් unknown ලෙස ගෙන typeof/Array.isArray හෝ schema validator මඟින් narrow කරන්න. any දාන්නේ checking අතහැරීමයි. HttpClient.get<Product[]>() කියන්නේ developer promise එකක්; server JSON shape check එකක් නෙවෙයි.

### Code: frontend/src/app/models.ts

```text
export interface Product {
  id: number;
  name: string;
  price_minor: number;
  stock: number;
}
export interface CartLine { product_id: number; quantity: number; }
export const emptyCart: CartLine[] = [];
```

1. වෙනත් files වල import කළ හැකි data contract එක.
2. Server-generated identity එක.
3. Display label එක.
4. Integer money value; runtime validation වෙනම කරන්න.
5. Available whole quantity එක.
6. Interface එක අවසන්.
7. Client request එකේ කුඩා shape එක.
8. CartLine objects පමණක් ඇති array එකක්.

### Practical

1. Final project Files එකේ models.ts බලන්න.
2. Practice project එකේ Angular create කිරීමෙන් පසු මේ file එක එම path එකේ ලියන්න.
3. quantity: "two" වගේ වැරදි assignment එකක් දාලා compiler message කියවන්න; පසුව හදන්න.

Expected: Compiler එක number/string mismatch එක පෙන්වනවා. API model සහ request model වෙන්ව තියෙනවා.

Fix: Type assertion as Product එකක් JSON validate කරන code එකක් නෙවෙයි.

Checkpoint: TypeScript interface එක runtime JSON validate කරනවාද?

1. ඔව්
2. නැහැ
3. Production build එකේ පමණක්

Answer: 2. Types build වෙද්දී මැකෙනවා. Runtime validation API boundary එකේ වෙනම අවශ්‍යයි.

Official reference: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

## 12. පළමු Angular app එක සාදමු

CLI එකෙන් project එක නිර්මාණය කර browser එකේ run කරන්න.

### Root එක සහ generated files

Angular workspace එකේ package.json dependencies/scripts දක්වනවා. angular.json build settings දක්වනවා. src/main.ts bootstrap කරනවා. App component එක UI root එක. node_modules install output; අතින් edit කරන්නේ නැහැ.

### Practice සහ reference paths

ඔබ lesson අනුව හදන්නේ practice folder එකේ frontend/ app එක. Files → Download complete project කියන්නේ final reference implementation එක. ඒ ZIP extract කර root එකේ README කියවලා frontend/ තුළ npm ci කරන්න. Final ZIP source එකක මුලින් නැති code එක පසුව එක්කරලා තියෙන නිසා lesson number අනුව ඉගෙනගන්න.

### Version compatibility

මේ project Angular 22 සහ TypeScript 6 සමඟයි. Node 24.15.0+ 24.x තෝරන්න. npm install මුල් dependency resolution එකට; reference ZIP එකේ package-lock.json ඇති නිසා npm ci reproducible install එකට. npm start terminal එක open තබන්න.

### Code: terminal · practice project root

```text
npx @angular/cli@22 new frontend --standalone --routing --style=css --ssr=false --defaults
cd frontend
npm start
# Open http://localhost:4200 in your browser
```

1. frontend folder එකේ Angular app එකක් සාදයි.
2. package.json ඇති Angular root එකට යයි.
3. Development server එක run කරයි.
4. මේ URL එක browser address bar එකට; shell command එකක් නෙවෙයි.

### Practical

1. Practice folder root එකේ CLI command එක run කරන්න. Existing frontend folder එකක් ඇත්නම් overwrite නොකර අලුත් practice folder එකක් භාවිතා කරන්න.
2. localhost:4200 browser එකෙන් open කර app starter එක බලන්න.
3. src/app/app.html හෝ generated template එකේ heading වෙනස් කර Save කරන්න.
4. Server නවත්වන්න terminal එකේ Ctrl+C. නැවත npm start කරන්න.

Expected: Heading edit එක browser එකට update වෙනවා. Angular app root සහ source folder ඔබට හඳුනාගන්න පුළුවන්.

Fix: ENOENT නම් frontend root එකට cd කරන්න. Port busy නම් npm start -- --port 4201. Version mismatch නම් official matrix එක බලන්න.

Checkpoint: npm start run කරන්නේ?

1. package.json ඇති frontend root එකේ
2. node_modules ඇතුළේ
3. Browser console එකේ

Answer: 1. npm scripts resolve වෙන්නේ project package.json එකෙන්.

### unix commands / practice root → frontend/

```text
npx @angular/cli@22 new frontend --standalone --routing --style=css --ssr=false --defaults
cd frontend
npm start
```

### powershell commands / practice root → frontend/

```text
npx @angular/cli@22 new frontend --standalone --routing --style=css --ssr=false --defaults
cd frontend
npm start
```

### cmd commands / practice root → frontend/

```text
npx @angular/cli@22 new frontend --standalone --routing --style=css --ssr=false --defaults
cd frontend
npm start
```

Official reference: https://angular.dev/reference/versions

## 13. Components, template සහ binding

Design එක reusable components සහ events වලට පරිවර්තනය කරන්න.

### Component anatomy

@Component metadata එක selector, template සහ styles සම්බන්ධ කරනවා. Class එක state සහ methods තබනවා. Template එක class state කියවලා DOM එක හදනවා. Component CSS ඒ component එකේ styling සඳහායි. Global tokens src/styles.css තුළයි.

### Binding හතරක්

{{ title }} text interpolation. [disabled]="saving()" property binding. (click)="add(product)" event binding. [class.active]="selected()" state-based class binding. Untrusted HTML innerHTML බවට දාන්න එපා.

### List සහ empty state

@for (p of products(); track p.id) ID අනුව records render කරයි. @empty block එක list එක හිස් විට පෙන්වන්න. Loading සහ error states වෙන්ව හදන්න. Mock image එකේ දක්වන layout එක Home → catalog → cart regions වලට බෙදන්න.

### Code: frontend/src/app/catalog-example.ts · standalone teaching component

```text
import { Component } from '@angular/core';
@Component({
  selector: 'app-catalog-example',
  standalone: true,
  template: '<h1>{{ title }}</h1><button (click)="add()">Add · {{ count }}</button>'
})
export class CatalogExample {
  title = 'Flow ERP'; count = 0;
  add() { this.count += 1; }
}
```

1. Component decorator එක import කරයි.
2. Angular metadata object එක අරඹයි.
3. Parent template එකට භාවිතා කරන tag එක.
4. Component එක standalone බව පැහැදිලි කරයි.
5. Text සහ click event class එකට bind කරයි.
6. Metadata එක අවසන්.
7. Component class එක export කරයි.
8. Template කියවන state values දෙකක්.
9. Click එකේදී state එක වෙනස් කරයි.
10. Component class අවසන්.

### Practical

1. මේ standalone example එක file එකේ save කරන්න.
2. Root app component එකේ imports: [CatalogExample] එක්කර root template එකට <app-catalog-example /> දාන්න.
3. Button click කර count වෙනස් වෙනවාද බලන්න. පසුව final app.ts/app.html දෙක Files tab එකේ බලන්න.

Expected: Click එක state එක වෙනස් කර template එකෙන් count update වෙනවා.

Fix: Unknown element error → import එක සහ selector එක ගැළපේද බලන්න. Error සඟවන්න schemas එකතු කරන්න එපා.

Checkpoint: Angular click event binding එක?

1. [click]="add"
2. (click)="add()"
3. {{ click }}

Answer: 2. Parentheses event එක class method එකකට සම්බන්ධ කරනවා.

Official reference: https://angular.dev/guide/components

## 14. Signals වලින් cart state එක

Source state, derived total සහ immutable updates සම්බන්ධ කරන්න.

### Source state

signal() writable reactive value එකක්. Read කරන්න cart(). Update කරන්න cart.set(newValue) හෝ cart.update(fn). UI එකට ඇත්තේ එක source state එකක් නම් එක value එක වෙන වෙනම තැන්වල sync කරන්න ඕන නැහැ.

### Computed total

computed() source signals කියවා derived value එකක් ගණනය කරනවා. Cart වෙනස් වෙද්දී total නැවත ගණනය වෙනවා. Total state එක වෙනම set කරගෙන යනවට වඩා මේ ගමන පහසුයි.

### Duplicate items සහ boundaries

එක product එක දෙවරක් add කළොත් quantity වැඩි කරන්න. quantity 0 නම් remove කරන්න. UI validation පසුව server stock validationත් අවශ්‍යයි. UI එකේ stock stale විය හැකි නිසා checkout conflict එක handle කරන්න.

### Code: frontend/src/app/cart-example.ts · teaching fragment

```text
import { signal, computed } from '@angular/core';
const cart = signal([{ product_id: 1, quantity: 1, price_minor: 45000 }]);
const total = computed(() => cart().reduce((sum, row) => sum + row.price_minor * row.quantity, 0));
cart.update(rows => rows.map(row => ({ ...row, quantity: row.quantity + 1 })));
console.log(total());
```

1. Reactive APIs දෙක import කරයි.
2. Local display model එකක මුල් cart state.
3. Cart එකෙන් derived total එක.
4. අලුත් rows reference එකක quantity වැඩි කරයි.
5. Signal read කර 90000 පෙන්වයි.

### Practical

1. Angular code එකේ temporary function එකක snippet එක run කරන්න. Browser console එකේ output බලන්න.
2. Final source එකේ cart signal එක සහ total computed එක කියවන්න.
3. Live studio එකේ එකම product එක දෙවරක් add කර quantity/total compare කරන්න.

Expected: Quantity වෙනස් කළ පසු total එක අතින් set නොකර update වෙනවා.

Fix: cart().push(...) කිරීමෙන් signal reference එක නොවෙනස් විය හැක. update සහ අලුත් array එකක් භාවිතා කරන්න.

Checkpoint: Derived cart total සඳහා සුදුසු?

1. computed
2. වෙනම DOM query එකක්
3. setInterval පමණක්

Answer: 1. computed එක cart dependency එකෙන් result එක ගණනය කරනවා.

Official reference: https://angular.dev/guide/signals

## 15. Forms සහ හැම UI state එකක්ම

Required inputs, field errors, loading සහ conflict feedback හදන්න.

### Userට කළ යුතු දේ කියන්න

Quantity එකට positive whole number එකක් අවශ්‍යයි. Product selection හිස් නම් submit කරන්න එපා. Field එක ළඟම වැරැද්ද සහ fix එක කියන්න.

### State machine එකක් වගේ සිතන්න

Idle → saving → success හෝ error. Saving වෙද්දී submit disable කරන්න. API failure එකකදී user input තබන්න. Success එකේ පමණක් cart reset කරන්න. aria-live="polite" region එකෙන් result දන්වන්න.

### Client සහ server errors

Browser validation immediate feedback සඳහායි. Server data සහ permissions verify කරනවා. 409 stock conflict එකක් නම් catalog refresh කර userට quantity හදන්න කියන්න. 401 නම් credentials ඉල්ලන්න. Generic network error එකක් field validation error එකක් ලෙස පෙන්වන්න එපා.

### Code: frontend/src/app/app.html · form pattern

```text
<form (ngSubmit)="submit()">
  <label for="customer">Customer name</label>
  <input id="customer" name="customer" [(ngModel)]="customer" required maxlength="80">
  <button type="submit" [disabled]="saving() || cart().length === 0">
    {{ saving() ? 'Saving…' : 'Approve request' }}
  </button>
  <p role="status" aria-live="polite">{{ message() }}</p>
</form>
```

1. Form submit එක Angular method එකකට ගනී; FormsModule අවශ්‍යයි.
2. Visible control label එක.
3. Form state binding සහ local constraints.
4. Pending/empty state එකේ duplicate submits අඩු කරයි.
5. Current action state එක text එකෙන් කියයි.
6. Submit control අවසන්.
7. Result screen readers වෙත දන්වයි.
8. Form boundary එක අවසන්.

### Practical

1. Root component එකට FormsModule import කරන්න. String customer සහ submit() method එකක් එක්කර snippet එකට matching state දෙන්න.
2. Saving state දී button disable වෙනවාද බලන්න.
3. Final project app.html එකේ implemented form එකෙන් empty, invalid, success සහ API error cases කරන්න.

Expected: Empty cart submit නොවේ. Failure එකකදී input නැති නොවේ. Saving feedback පෙනෙනවා.

Fix: HTML required තිබුණත් raw HTTP request එකකින් bypass කළ හැක. Server validation අනිවාර්යයි.

Checkpoint: Cart reset කළ යුත්තේ?

1. Submit click වුණු මොහොතේ
2. Server success response ලැබුණු පසු
3. Network error එකේදී

Answer: 2. Failure එකේදී userගේ input තබන්න.

Official reference: https://angular.dev/guide/forms

## 16. UI reference → code සහ small animations

Screenshot එකක layout එක හඳුනාගෙන precise CSS සහ motion ලියන්න.

### Screenshot එක layer වලට කඩන්න

පළමුව outer container width, regions සහ alignment ලකුණු කරන්න. ඊළඟට card width, gap, padding, radius, font size ලියන්න. Live studio Anatomy switch එකෙන් කුඩා numbered regions බලන්න. Color picker එක වෙනස් කර CSS token එකට එහි බලපෑම බලන්න.

### Motion එකේ අරමුණ

Hover එකේ -2px translateY එක clickable බව කියයි. Success message එක fade/slide කරන එක result වෙත අවධානය දෙයි. transform සහ opacity animate කරන්න; layout වෙනස් කරන width/height නිතර animate කිරීම අඩු කරන්න.

### Motion සහ accessibility

prefers-reduced-motion: reduce වලදී animation ඉවත් කරන්න. Auto replay default එක off. Keyboard focus hover එකට සමානව පැහැදිලිව තබන්න. Animation එක නොපෙනුණත් text එකෙන් outcome එක පැහැදිලි විය යුතුයි.

### Code: frontend/src/styles.css · motion pattern

```text
.product { transition: transform 160ms ease, box-shadow 160ms ease; }
.product:hover { transform: translateY(-2px); box-shadow: 0 8px 22px #1d422014; }
button:focus-visible { outline: 3px solid #d67c4c; outline-offset: 4px; }
@keyframes appear { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
.success { animation: appear 180ms ease-out; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } }
```

1. State වෙනස කෙටි සහ predictable කරයි.
2. Hover affordance එකක්.
3. Keyboard focus ඉවත් නොකරයි.
4. Success panel entry එක.
5. එක් වරක් ක්‍රියාකරන කෙටි motion එක.
6. Reduced motion preference එකට ගරු කරයි.

### Practical

1. Live studio එකේ desktop/phone toggle දෙකම බලන්න. Gap 8→24 සහ radius 4→20 වෙනස් කරන්න.
2. Generated CSS එක copy කර ඔබේ catalog styles එකට ගළපන්න.
3. DevTools → Rendering → prefers-reduced-motion emulate කර animation off වෙනවාද බලන්න.

Expected: Reference layout එක regions, tokens සහ rules වලට හරවන්න පුළුවන්. Phone layout සහ focus state වැඩ කරනවා.

Fix: Animations එකතු කිරීමට පෙර layout සහ readability හදාගන්න. Infinite movement එක information කියවීමට බාධාවක් වෙනවා.

Checkpoint: Reduced motion request එකේදී?

1. Animations වැඩි කරන්න
2. Animations ඉවත් කරන්න හෝ අඩු කරන්න
3. Focus outline මකන්න

Answer: 2. User preference එක අනුව motion අඩු කර content පැහැදිලිව තබන්න.

Official reference: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

## 17. Java 0 සිට · types, classes සහ records

Backend language එකේ variables, decisions, loops සහ reusable functions හඳුනාගන්න.

### Java run වෙන්නේ කොහොමද?

JDK තුළ compiler (javac) සහ runtime තියෙනවා. .java source → .class bytecode → JVM. Java static types භාවිතා කරන නිසා long quantity, String name වගේ type ලියන්න ඕන. Statement සාමාන්‍යයෙන් ; එකකින් අවසන් වෙනවා.

### Class, record සහ method

Class එක data සහ behavior එකට ගන්නවා. record immutable data carrier එකකට ගැළපෙනවා. Method එක class එකේ function එකක්. Constructor injection එකෙන් service එකට repository dependency දෙන්න. new කර dependency සැමතැනම හදාගන්න එපා.

### Decision, loop සහ failure

if condition වල business rules බලන්න. for loop එක items එකින් එක කියවන්න. IllegalArgumentException හෝ typed domain exception එකක් throw කර invalid action නවතන්න. long money minor units සඳහායි; overflow එකත් business limits වලින් නවතන්න.

### Code: lab/Basics.java

```text
public class Basics {
  record Product(long id, String name, long stock) {}
  static long receive(long stock, long quantity) {
    if (quantity < 1) throw new IllegalArgumentException("quantity");
    return Math.addExact(stock, quantity);
  }
  public static void main(String[] args) {
    System.out.println(receive(3, 2));
  }
}
```

1. JVM run කළ හැකි class එක.
2. Data carrier එකේ fields සහ types.
3. Inputs දෙකකින් අලුත් stock return කරන method එක.
4. Invalid quantity එක guard කරයි.
5. Integer overflow වුණොත් exception එකක් දී නවතයි.
6. Method එක අවසන්.
7. JVM entry point එක.
8. 5 පෙන්වයි.
9. main method අවසන්.
10. Class අවසන්.

### Practical

1. lab/Basics.java file එක ලියන්න. lab/ තුළ javac Basics.java run කරන්න.
2. java Basics run කර 5 output එක බලන්න. quantity 0 කර exception එක බලන්න.
3. Java reference course එකේ types → methods → classes → interfaces lessons පිළිවෙළින් කරන්න.

Expected: Compile සහ run කළ Java program එකෙන් 5 පෙන්වනවා.

Fix: Language syntax සහ framework syntax එකට එකවර ඉගෙන නොගන්න. මේ කුඩා program එක run වූ පසු API එකට යන්න.

Checkpoint: Java main method එකේ කාර්යය?

1. HTTP status එකක්
2. Program entry point එක
3. Database table එක

Answer: 2. JVM main method එකෙන් program execution පටන් ගන්නවා.

Official reference: https://dev.java/learn/

## 18. Spring Boot API එක run කරමු

Health endpoint එකක් හදා server එක browser එකෙන් පරීක්ෂා කරන්න.

### Framework එකේ වැඩේ

Spring Boot application එක embedded server එකක් start කරනවා. @RestController JSON endpoints දක්වනවා. @GetMapping URL එකට Java method එකක් map කරනවා. Dependency injection එකෙන් controller → service → repository සම්බන්ධ වෙනවා.

### Health endpoint

GET /api/health සරල liveness check එකක්. Database check කරන readiness එක වෙනම. Production deployment එකේ traffic යැවීමට පෙර app සහ database දෙකම සූදානම් විය යුතුයි.

### Final reference එක run කිරීම

Files → Download project ZIP → extract. backend/ තුළ mvn test පසුව mvn spring-boot:run. JDK සහ Maven versions lesson 03දී verify කරන්න. Frontend එකට අමතරව backend terminal එකක් open තබන්න.

### Code: backend/src/main/java/com/buildlab/erp/HealthController.java

```text
package com.buildlab.erp;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
@RestController
public class HealthController {
  @GetMapping("/api/health")
  public Map<String, String> health() { return Map.of("status", "ok"); }
}
```

1. Class එකේ namespace එක source folders වලට ගළපයි.
2. GET mapping annotation එක.
3. JSON controller annotation එක.
4. Key/value JSON response එකකට map එක.
5. මේ class එක HTTP controller එකක් බව දක්වයි.
6. Health controller එක.
7. GET request path එක.
8. JSON response එක ලබාදෙයි.
9. Controller එක අවසන්.

### Practical

1. Files tab එකෙන් complete project download කරන්න. README සහ backend/pom.xml බලන්න.
2. backend/ තුළ mvn test run කරන්න. ඉන්පසු mvn spring-boot:run.
3. http://localhost:8080/api/health browser එකෙන් බලන්න.

Expected: Health response {"status":"ok"}. Frontend server නැතිවත් API එක තනිව වැඩ කරනවා.

Fix: Import error → backend/ current folder සහ app package බලන්න. Port conflict → පැරණි dev server එක නවත්වන්න.

Checkpoint: Frontend server නැතිව API එක test කළ හැකිද?

1. නැහැ
2. ඔව්; browser, HTTP client හෝ tests වලින්
3. Angular install කළ පසු පමණක්

Answer: 2. API එක frontend එකෙන් වෙන් වූ server එකක්.

### unix commands / Extracted reference project → backend/

```text
mvn test
mvn spring-boot:run
```

### powershell commands / Extracted reference project → backend/

```text
mvn test
mvn spring-boot:run
```

### cmd commands / Extracted reference project → backend/

```text
mvn test
mvn spring-boot:run
```

Official reference: https://spring.io/guides/gs/rest-service/

## 19. Database diagram එකෙන් tables වලට

Primary keys, foreign keys සහ relationship cardinality තේරුම්ගන්න.

### Entities සහ relationships

Product, PurchaseRequest, RequestItem කියන්නේ tables තුනක්. එක් purchase එකකට items ගොඩක් තියෙනවා (1:N). එක් item එකකට එක් product එකක් තියෙනවා (N:1). Blueprint → Data model එකේ FK arrows ඒ connection එක පෙන්වනවා.

### Data integrity

Product id primary key එක. Item product_id foreign key එකෙන් සැබෑ product එකකට සම්බන්ධ වෙනවා. quantity > 0 සහ price_minor >= 0 database CHECK constraints වලිනුත් enforce කරන්න. Product price පසුව වෙනස් වුණත් old receipt price වෙනස් නොවීමට unit price snapshot එක item එකේ save කරන්න.

### Database තෝරාගැනීම

Local ERP reference එක file-backed H2 database එකක් භාවිතා කරනවා. PostgreSQL profile සහ Flyway migrations ද source එකේ තියෙනවා. File database restart පසුත් තියෙනවා. CI එකේ වෙනම in-memory database එකක් භාවිතා කරනවා.

### Code: docs/schema.sql · relationship sketch

```text
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  price_minor BIGINT NOT NULL CHECK (price_minor >= 0),
  stock INTEGER NOT NULL CHECK (stock >= 0)
);
-- RequestItem includes product_id REFERENCES products(id)
-- PurchaseRequest 1 -> many RequestItem
```

1. Catalog entity එක.
2. Unique product identity එක.
3. Empty database value එක වැළැක්වීම.
4. Non-negative integer money value එක.
5. Negative inventory නවතන database rule එක.
6. Products table declaration අවසන්.
7. Line item එක සැබෑ product එකකට සම්බන්ධ කරයි.
8. Parent එකකට items කිහිපයක් තිබිය හැක.

### Practical

1. Blueprint → Data model බලලා tables තුන ඔබම අඳින්න.
2. Entity එකේ fields, PK සහ FK ලකුණු කරන්න.
3. Final migration file එකේ SQL constraints සහ diagram එක ගළපන්න.

Expected: Product, parent transaction සහ line item tables වල identities සහ relationships පැහැදිලියි.

Fix: Comma-separated product IDs parent table එකේ field එකකට දාන්න එපා. Items වෙනම rows විය යුතුයි.

Checkpoint: Old receipt එකේ මිල ආරක්ෂා කරන්නේ?

1. හැම විටම current catalog price කියවලා
2. Item එකේ unit price snapshot එක save කරලා
3. Frontend localStorage එකෙන්

Answer: 2. Catalog price පසුව වෙනස් වුණත් transaction history මිල වෙනස් නොවිය යුතුයි.

Official reference: https://www.postgresql.org/docs/current/ddl-constraints.html

## 20. Schema changes සහ migrations

Database එක පරිස්සමින් version කර seed data එකෙන් වෙනස හඳුනාගන්න.

### Migration කියන්නේ versioned schema change

V1 initial tables සාදනවා. V2 පසුව column එකක් හෝ index එකක් එකතු කරනවා. Applied migration එක edit කිරීම වෙනුවට අලුත් migration එකක් සාදන්න. app startup එකේ සියලු tables drop කර create කරන්න එපා.

### Migration සහ seed වෙනම

Migration schema හදනවා. Seed demo products හදනවා. Existing records overwrite නොකර empty catalog එකේ පමණක් seed කරන්න. Production data changes අනුමත කළ වෙනම migration එකකින් කරන්න. Demo users/products production database එකට auto add නොකරන්න.

### Expand → migrate → contract

Required field එකක් එකවර add කළොත් old rows සහ old app fail විය හැක. මුලින් nullable column, පසුව backfill, පසුව constraints. Deploy කිරීමට පෙර staging backup restore කර migration apply කරන්න. Downgrade නැති destructive migration එකක් app rollback එකකින් undo නොවේ.

### Code: backend/src/main/resources/db/migration/V1__initial.sql

```text
-- V1: initial schema
-- Apply once, then record version 1
-- V2: ALTER TABLE products ADD COLUMN sku VARCHAR(40);
-- Backfill missing SKU values before adding NOT NULL
-- Never DROP tables to fix a production migration
```

1. මුල් schema version එක.
2. නැවත නැවත එකම change එක නොකර version එක සටහන් කරයි.
3. ඊළඟ වෙනස වෙනම version එකකට.
4. Existing rows පළමුව valid කරන්න.
5. Data අහිමි නොකර recovery plan එකක් සකස් කරන්න.

### Practical

1. Files tab එකේ actual migration implementation එක බලන්න. ERP හි Flyway, Python app එකේ versioned migration runner එක.
2. Fresh database එකක startup කර tables සහ seed count බලන්න.
3. Server restart කර seed products දෙගුණ නොවන බව verify කරන්න.

Expected: Fresh install සහ restart දෙකම වැඩ කරනවා. Existing data reset වෙන්නේ නැහැ.

Fix: ORM entity field එකක් add කිරීම migration එකක් වෙන්නේ නැහැ. Entity සහ SQL schema දෙකම එකට review කරන්න.

Checkpoint: Applied V1 migration එක පසුව වෙනස් කළ යුතුද?

1. ඔව්, හැම edit එකක්ම V1ට
2. අලුත් V2 migration එකක් සාදන්න
3. Database file එක delete කරන්න

Answer: 2. Versioned changes එකිනෙක immutableව තබා upgrade path එක ආරක්ෂා කරන්න.

Official reference: https://documentation.red-gate.com/flyway/flyway-concepts/migrations

## 21. API contract, validation සහ CRUD

Request/response shapes සහ error status codes UI එකට ගළපන්න.

### Contract එකෙන් පටන් ගන්න

GET /api/products → direct JSON array. Product {id,name,price_minor,stock}. POST transaction → {items:[{product_id,quantity}], ...}. Success response එකේ id, status, total_minor සහ items. Frontend model names backend JSON keys වලට exact ගළපන්න.

### Validation layers

Jakarta Validation @Min/@Max සහ @NotBlank DTO fields validate කරනවා. Service එක product existence සහ state rules බලනවා. Database constraints අවසාන integrity boundary එකයි. @RestControllerAdvice errors consistent JSON බවට හරවයි.

### Error messages සහ REST

Invalid shape 422 (FastAPI) / 400 (Spring), missing product 404, stock/state conflict 409. Error status එක test කරන්න. API docs එක generated වුණත් business rules සහ role requirements API-CONTRACT.md එකේ ලියන්න. Read සහ write operations responsibilities වෙන් කරන්න.

### Code: API-CONTRACT.md

```text
GET /api/products -> 200 Product[]
POST /api/requests -> 201
{ "items": [{ "product_id": 1, "quantity": 2 }] }
{ "id": 1, "status": "PENDING", "total_minor": 90000 }
404 -> product not found
409 -> already approved
```

1. Public catalog response එක direct array එකක්.
2. නව transaction එකක් සාදන endpoint එක.
3. Serverට යවන්නේ IDs සහ counts පමණක්.
4. අවශ්‍ය response fields වල කෙටි sketch එක; actual response එකේ items ද තියෙනවා.
5. නැති resource එකකට error එක.
6. Valid shape එකක් වුණත් business state එකෙන් action එක නවතයි.

### Practical

1. API-CONTRACT.md එක Files tab එකේ කියවන්න.
2. Final backend run කර catalog GET එක browser එකෙන් test කරන්න.
3. API docs හෝ requests.http එකෙන් valid සහ invalid bodies යවන්න.
4. Response code සහ JSON keys frontend models.ts එක්ක ගළපන්න.

Expected: Valid request එක 201. Invalid quantity, unknown product සහ stock conflict එකිනෙක නිවැරදි status ලබාදෙනවා.

Fix: Client එක price/role/is_admin යැව්වත් server එය trust නොකරන්න. Request DTO එකේ allowed fields පමණක් ගන්න.

Checkpoint: Product ID එක database එකේ නැත්නම්?

1. 200 සහ empty receipt
2. 404
3. Frontend total එක save කරන්න

Answer: 2. Resource එකක් නැතිවීම 404 contract එකෙන් කියන්න.

## 22. Approval එක දෙවරක් නොවෙන transaction එක

Failure එකක් අතරමැද වුණත් partial updates save නොවන flow එක හදන්න.

### All or nothing

Request state PENDING → APPROVED. Manager permission verify කර PENDING state එක conditional update එකකින් claim කරන්න. පසුව products stock වැඩි කර audit event save කරන්න. ඕනෑම failure එකක මුළු transaction එක rollback විය යුතුයි.

### Concurrency

දෙදෙනෙක් එකම request එක approve කළත් UPDATE ... WHERE status = PENDING එකේ row count එක එක් winner කෙනෙකුට පමණක් 1 විය යුතුයි. වෙනත් request එකට 409. State update සහ stock update එක එකම transaction boundary එකේ තබන්න.

### Retry සහ idempotency

Approve retry එක 409 වෙලා inventory දෙවරක් නොවිය යුතුයි. UI එක latest status refresh කර “already approved” කියන්න.

### Code: backend/.../PurchaseService.java · transaction pattern

```text
@Transactional
public void approve(long id) {
  int changed = repository.claimPending(id);
  if (changed != 1) throw new ConflictException("Already approved");
  increaseStockForItems(id);
  auditRepository.record(id, "APPROVED");
}
```

1. පහත method එකේ writes එක transaction එකකට ගනී.
2. Manager-checked controller එකෙන් call කරන service action එක.
3. PENDING -> APPROVED conditional update එක.
4. දෙවන approval එක නවතයි.
5. Request items සඳහා stock වැඩි කරයි.
6. Audit event එක same transaction එකේ තබයි.
7. Uncaught runtime failure එකක් transaction rollback කරයි.

### Practical

1. Pending purchase request එකක් create කරන්න. Staff account එකෙන් approve කර 403 බලන්න.
2. Manager account එකෙන් approve කර stock එක quantity එකෙන් වැඩි වීම බලන්න.
3. එම ID එක නැවත approve කර 409 සහ unchanged stock බලන්න.

Expected: Business failure එකකදී partial changes නැහැ. History එක සහ stock එක එකිනෙක ගැළපෙනවා.

Fix: UI simulation එක concurrency proof එකක් නොවේ. Real backend/database tests වලින් invariants verify කරන්න.

Checkpoint: Items තුනක transaction එකේ දෙවන item fail වුණොත්?

1. පළමු change එක commit කරන්න
2. මුළු transaction එක rollback කරන්න
3. Error එක සඟවලා success දෙන්න

Answer: 2. All-or-nothing boundary එකෙන් inventory සහ history consistency තබනවා.

Official reference: https://docs.spring.io/spring-data/jpa/reference/jpa/transactions.html

## 23. Angular එක backend එකට connect කරමු

Dev proxy, HTTP client, errors සහ refresh flow එක end to end බලන්න.

### Relative API URLs

Frontend service එකේ /api/products වගේ relative URL භාවිතා කරන්න. npm start proxy එක /api requests backend port එකට යවයි. Docker තුළ Nginx /api proxy එක api service එකට යවයි. Docker browser URL එකේ api කියන service hostname එක වැඩ කරන්නේ නැහැ; ඒක container network එකටයි.

### Trust boundary එක

Front-end display total එක සහ server total එක success පසු compare කරන්න. Save response එකේ data එකෙන් receipt දක්වන්න. Success පසු catalog refresh කර stock update පෙන්වන්න. Error එකේ cart state තබන්න.

### Network debugging

DevTools → Network → request URL/method/body/status/response බලන්න. Proxy port එක backend port එකට ගැළපෙන්න ඕන. CORS policy එක authentication එකක් නොවේ. Same-origin proxy එකෙන් browser origin differences අඩු කරන්න.

### Code: frontend/proxy.conf.json

```text
{
  "/api": {
    "target": "http://127.0.0.1:8080",
    "secure": false
  }
}
```

1. Angular CLI dev proxy configuration එක.
2. මේ prefix එකෙන් පටන්ගන්න requests proxy කරයි.
3. Host එකේ run වන backend URL එක.
4. Local HTTP target එක සඳහා; HTTPS certificate bypass production එකේ භාවිතා නොකරන්න.
5. Proxy rule එක අවසන්.
6. Configuration අවසන්.

### Practical

1. Final backend run කර health response verify කරන්න.
2. frontend/ තුළ npm ci සහ npm start run කරන්න.
3. Browser localhost:4200 තුළ product list සහ transaction submit කරන්න.
4. Network tab එකේ /api URL, backend terminal log සහ response receipt එක එකට බලන්න.

Expected: Angular form එකෙන් යැවූ request එක backend database එකට save වෙනවා. Reload පසු stock/history පවතිනවා.

Fix: Status 0/502 → backend runningද, proxy target port එකද, service health එකද බලන්න. Raw database port එක browser එකට connect කරන්න එපා.

Checkpoint: Docker තුළ browser එක GET කළ යුතු URL එක?

1. http://api:8000
2. Same origin එකේ /api/products
3. postgres://db

Answer: 2. Browser එක Nginx frontend origin එකට request දී server proxy එක container hostname එක resolve කරනවා.

Official reference: https://angular.dev/tools/cli/serve#proxying-to-a-backend-server

## 24. Authentication, roles සහ secrets

Login identity සහ action permissions backend එකේ enforce කරන්න.

### Identity සහ permission

Authentication “ඔබ කවුද?” කියන ප්‍රශ්නය. Authorization “මේ action එකට අවසර තියෙනවාද?” කියන ප්‍රශ්නය. Role dropdown එකක් UI එකේ තෝරාගැනීමෙන් permission එකක් ලැබෙන්නේ නැහැ. Credentials verify කළ identity එකෙන් server role එක තීරණය කළ යුතුයි.

### Reference app එකේ authentication

මේ local reference එකේ HTTP Basic authentication staff සහ manager accounts environment variables වලින් configure කරනවා. Passwords local .env file එකේ; browser memory එකේ පමණක් credentials තබනවා. Public catalog කියවීමට login අවශ්‍ය නැහැ. Request create staff/manager; approval manager පමණයි. Real internet deployment එකට HTTPS අනිවාර්යයි.

### Production hardening path

Identity provider/session-based login, password hashing සහ rotation, rate limiting, audit identity, account lockout සහ trusted origins සලකා බලන්න. Cookie session එකක් භාවිතා කරනවා නම් Secure/HttpOnly/SameSite flags සහ CSRF protection සකස් කරන්න. Tokens logs/localStorage වලට නොයවන්න. Release tab එකේ මේ වැඩ වෙනම verify කරන්න.

### Code: .env.example · configuration names

```text
MANAGER_USERNAME=manager
MANAGER_PASSWORD=replace-with-a-long-local-password
STAFF_USERNAME=staff
STAFF_PASSWORD=replace-with-another-password
# Never commit .env; commit .env.example only
```

1. Manager identity එකේ local sample username එක.
2. ඔබ තෝරන password එක .env තුළ පමණක් දාන්න.
3. සීමිත privileges ඇති local account එක.
4. වෙනම password එකක් තෝරන්න.
5. Placeholder template එක සහ actual credentials වෙන් කරයි.

### Practical

1. ZIP root එකේ .env.example copy කර .env සාදා sample passwords වෙනස් කරන්න.
2. Docker flow එක .env read කරනවා. Local backend run කිරීමේදී README shell-specific environment instructions අනුගමනය කරන්න.
3. UI login inputs වල credentials දී valid request කරන්න. වැරදි password එකකට 401 බලන්න.
4. සීමිත role එකෙන් manager operation එකකට 403 බලන්න.

Expected: Credentials නැති/වැරදි requests 401. Identity තිබුණත් permission නැති action 403.

Fix: Authorization header එක Base64 encoding පමණයි; encryption එකක් නොවේ. Remote traffic සඳහා TLS අවශ්‍යයි.

Checkpoint: Authenticated staff කෙනෙක් manager-only action එකක් කළොත්?

1. 200
2. 403
3. Password එක response එකේ දෙන්න

Answer: 2. Valid identity එකක් තිබුණත් required permission එක නැති නිසා 403.

Official reference: https://docs.spring.io/spring-security/reference/servlet/authorization/index.html

## 25. Tests සහ debugging · happy path එකෙන් එහා

Business invariants, real HTTP boundaries සහ failure recovery test කරන්න.

### Test levels

Unit test එක total/guards වගේ කුඩා function බලනවා. Integration test එක API + database transaction බලනවා. Browser journey එක user form → actual HTTP → persisted result බලනවා. එකම implementation එක copy කර expected value හදන test එකක් business bug එක අල්ලන්නේ නැහැ.

### අත්‍යවශ්‍ය scenarios

Staff forbidden approval, manager approval stock වැඩි වීම, repeat approval 409, invalid DTO, missing product, rollback සහ persistent history test කරන්න.

### Debug කිරීමේ පිළිවෙළ

Expected සහ actual result ලියන්න. එක minimum reproduction එකක් සාදන්න. Browser Network → API log → database state කියන අනුපිළිවෙළට බලන්න. Fix එකට පළමුව fail වෙන business test එකක් ලියන්න. Error message කියවීම නවත්වලා random dependencies reinstall කරන්න එපා.

### Code: terminal · reference project

```text
cd backend
mvn test
mvn package
cd ../frontend
npm ci
npm run build
```

1. Maven project root එකට යයි.
2. HTTP/controller/service/database integration tests run කරයි.
3. Tests pass වූ JAR එක package කරයි.
4. Angular project root එකට යයි.
5. Lock file අනුව dependencies install කරයි.
6. Type-check කර production frontend bundle එක build කරයි.

### Practical

1. Backend tests run කරන්න. Windows Python සඳහා .venv\Scripts\python.exe -m pytest -q භාවිතා කරන්න.
2. Frontend production build run කරන්න.
3. UI එකෙන් empty, invalid, success, stock conflict සහ network-down cases කරන්න.
4. Bug එකක් හමු වුණොත් input, expected, actual සහ exact reproduction steps docs/bugs.md ලියන්න.

Expected: Backend tests pass. Frontend build pass. Failure එකකදී data consistency සහ user input තබාගන්නවා.

Fix: Build pass කියන්නේ user journey pass කියන එක නෙවෙයි. API tests + browser scenario දෙකම කරන්න.

Checkpoint: Transaction integrity verify කරන හොඳ test එක?

1. Button text එකම නැවත compare කිරීම
2. දෙවන item fail වූ විට පළමු stock update rollback වෙනවාද බැලීම
3. File නම තිබේද බැලීම පමණක්

Answer: 2. Failure path එක database invariant එක verify කරනවා.

Official reference: https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html

## 26. Docker සහ Compose · එක command එකකින් stack එක

Image, container, network, volume සහ reverse proxy flow එක තේරුම්ගන්න.

### Image සහ container

Dockerfile recipe එකක්. Image built filesystem සහ process configuration එක. Container image එක run වන instance එක. Frontend build stage Node භාවිතා කරයි; runtime Nginx static files serve කරයි. API image එක backend runtime පමණක් තබනවා.

### Compose සහ data

compose.yaml frontend, api services සහ data volume එක එකට දක්වනවා. Browser localhost:8088 → frontend Nginx → /api proxy → API → database volume. Host port එක සහ container port එක වෙනස් විය හැක. Named volume එක container recreate කළත් data තබනවා.

### Environment සහ secrets

Root .env values Compose environment injection එකට භාවිතා කරනවා. Dockerfile එකට secrets COPY කරන්න එපා. .dockerignore සහ .gitignore දෙකම තබන්න. compose down containers නවතනවා; down -v named data volume එකත් මකන නිසා routine stop එකට -v දාන්න එපා.

### Code: terminal · extracted project root

```text
docker --version
docker compose version
docker compose config --quiet
docker compose up --build -d
docker compose ps
docker compose logs --tail=80 api
docker compose down
```

1. Docker CLI තිබේද බලයි.
2. Compose plugin version බලයි.
3. Resolved configuration syntax validate කරයි; values print නොකරයි.
4. Images build කර services background එකේ start කරයි.
5. Services health සහ port mappings බලයි.
6. API startup/errors කියවයි; credentials print නොකරන්න.
7. Containers නවතා remove කරයි; named data volume තබයි.

### Practical

1. Docker Engine/Desktop start කර root .env file එක සකස් කරන්න.
2. Project root එකේ commands run කරන්න. මුල් build එකට internet අවශ්‍යයි.
3. http://localhost:8088 බලලා sale/request එකක් save කරන්න.
4. compose down පසුව up -d කර ඒ history එක පවතිනවාද බලන්න.

Expected: Frontend සහ backend එකම public port එකෙන් වැඩ කරනවා. Restart පසු database history තියෙනවා.

Fix: Connection refused → Docker daemon සහ compose ps බලන්න. api hostname එක browser URL එකට දාන්න එපා.

Checkpoint: Data volume තබාගෙන stack එක නවත්වන්නේ?

1. docker compose down
2. docker compose down -v
3. Database file delete කරලා

Answer: 1. down named volumes තබනවා; -v ඒවා ඉවත් කරනවා.

Official reference: https://docs.docker.com/compose/gettingstarted/

## 27. GitHub, review සහ CI pipeline එක

Pull request එකකින් tests සහ image builds automatically run කරන්න.

### Local Git → GitHub

GitHub account එකෙන් empty private repository එකක් සාදන්න. remote add origin <ඔබේ repository URL> දී push කරන්න. SSH key හෝ approved credential manager භාවිතා කරන්න. Password/token command history එකේ URL එකකට දාන්න එපා.

### CI එකේ gates

Included .github/workflows/ci.yml backend tests, frontend npm ci/build සහ container builds run කරනවා. Pull request එකකට workflow status green වීම merge prerequisite එකක් කරන්න. Tests fail නම් deploy නොකරන්න. මේ workflow hosting account එකකට auto-deploy කරන්නේ නැහැ.

### Release artifact එක

Review කළ commit SHA එක image tag එකකට ගළපන්න. Release note එකේ migration, config change සහ rollback path ලියන්න. Registry publish සහ host deploy steps environment secrets සහ approval policy අනුව configure කරන්න. latest tag එකට පමණක් rollback rely කරන්න එපා.

### Code: terminal · project root

```text
git status
git diff
git add .github/workflows/ci.yml
git commit -m "ci: verify app and container builds"
# Add your own GitHub remote in the repository settings instructions
git push -u origin feature/catalog
```

1. Accidental files සහ secrets stage වෙලාද බලයි.
2. වෙනස්කම review කරයි.
3. CI configuration එක stage කරයි.
4. Review කළ වෙනස history එකට දායි.
5. Placeholder URL එක copy කර run නොකර ඔබේ remote එක භාවිතා කරන්න.
6. ඔබේ existing remote එකට feature branch එක publish කරයි.

### Practical

1. GitHub empty private repository එකක් ඔබම සාදා remote URL එක copy කරන්න.
2. git remote add origin සමඟ ඔබේ URL එක සකස් කර branch push කරන්න.
3. Pull request එකක් open කර Actions result බලන්න.
4. Tests fail කළ වෙනසක් තාවකාලිකව දාලා CI red වන බව බලලා fix කරන්න.

Expected: PR එකේ backend tests, frontend build සහ container build status පෙනෙනවා.

Fix: මෙහි learning UI එක GitHub වෙත push කරන්නේ නැහැ. ඒ commands ඔබේ project සහ account එකේ run කරන්න.

Checkpoint: CI red නම්?

1. එහෙමම release කරන්න
2. Fail වූ check එක කියවලා fix කර නැවත run කරන්න
3. Test file delete කරන්න

Answer: 2. Checks release කිරීමට පෙර අවශ්‍ය evidence ලබාදෙනවා.

Official reference: https://docs.docker.com/build/ci/github-actions/

## 28. Production release, backup සහ rollback

Local working demo එකෙන් operated release එකකට අවශ්‍ය වැඩ පිළිවෙළට සම්පූර්ණ කරන්න.

### Release කියන්නේ server run කිරීම පමණක් නොවේ

Domain සහ HTTPS, identity policy, production database, migration job, secrets, rate limits, durable idempotency, logs/metrics සහ backup restore සම්පූර්ණ කරන්න. මේ reference ZIP එක local learning capstone එකක්. Release checklist එක self-reported evidence එකක්; production certification එකක් නෙවෙයි.

### Staging → deploy → smoke

Production වගේ staging environment එකක fresh install සහ upgrade දෙකම test කරන්න. Backup ගෙන restore rehearse කරන්න. Exact image tag/SHA deploy කර health, catalog, unauthorized request සහ එක් sandbox transaction smoke test කරන්න. Logs වල passwords/Authorization header/customer address නොයවන්න.

### Incident සහ recovery

Error rate, latency, disk usage සහ failed business actions monitor කරන්න. Alert owner සහ incident runbook ලියන්න. App rollback කළත් incompatible DB migration එක undo නොවේ. Backup restore අවශ්‍ය නම් recover කරන data window (RPO) සහ downtime target (RTO) දැනගන්න.

### Code: docs/release-runbook.md

```text
1. Confirm tests and review for the exact commit
2. Back up data and prove restore in staging
3. Apply reviewed migrations once
4. Deploy versioned images behind HTTPS
5. Smoke test, observe, then open traffic
6. Roll back compatible images if checks fail
```

1. Release කරන code එකටම evidence තබන්න.
2. Backup file තිබීම පමණක් මදි; restore කර data verify කරන්න.
3. DB version එක track කර controlled migration job එකක් run කරන්න.
4. Immutable artifact සහ TLS boundary එක.
5. Health සහ business flow verify කර traffic දෙන්න.
6. Prior image tag එක සහ DB compatibility plan එක භාවිතා කරන්න.

### Practical

1. Release tab එකේ සෑම item එකක්ම එහි evidence අනුව review කරන්න.
2. docs/release-runbook.md තුළ ඔබේ domain, image tags, backup path සහ rollback commands ලියන්න.
3. Staging එකේ failure එකක් simulate කර rollback/recovery rehearse කරන්න.
4. ඔබේ demo එකේ limitations සහ ඉදිරියේ කළ යුතු වැඩ README එකේ ලියන්න.

Expected: Testing, deployment සහ incident response සඳහා නැවත කළ හැකි runbook එකක් සහ evidence තියෙනවා.

Fix: මේ checklist tick කළා කියලා real host එකක් deploy වෙන්නේ නැහැ. සැබෑ environment එකේ results verify කරන්න.

Checkpoint: Backup එකක් විශ්වාස කළ හැක්කේ?

1. File එක තිබුණාම
2. Restore කර data සහ app verify කළ පසු
3. Filename එකේ backup තිබුණාම

Answer: 2. Restore rehearsal එකෙන් backup එක භාවිතා කළ හැකි බව ඔප්පු කරනවා.

Official reference: https://fastapi.tiangolo.com/deployment/concepts/
