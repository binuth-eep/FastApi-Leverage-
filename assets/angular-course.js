/* Original Sinhala lessons. Examples are displayed as text, never evaluated. */
'use strict';
const STAGES=[
{name:'මුලින්ම පටන් ගනිමු',en:'Start from zero',detail:'Web, terminal & setup',modules:[0,1,2,3]},
{name:'Programming පදනම',en:'Build your foundation',detail:'JavaScript & TypeScript',modules:[4,5]},
{name:'Angular තේරුම් ගනිමු',en:'Think in components',detail:'Templates, signals & services',modules:[6,7,8,9,10,11]},
{name:'Screens සහ forms',en:'Build the experience',detail:'Routing, forms & RxJS',modules:[12,13,14,15]},
{name:'Backend එකට සම්බන්ධ වෙමු',en:'Connect your data',detail:'HTTP, FastAPI & authentication',modules:[16,17,18,19]},
{name:'Project එක අවසන් කරමු',en:'Build, test & ship',detail:'State, testing & deployment',modules:[20,21,22,23]}];
const MODULES=[];
const Q=(question,options,answer,why)=>({question,options,answer,why});
function M(name,si,ref,lessons){const id=MODULES.length;MODULES.push({id,name,si,ref,lessons:lessons.map((l,i)=>({...l,id:id*2+i,module:id}))});}
function L(title,goal,topics,file,code,steps,mistake,exercise){const rows=code.trim().split('\n').map(line=>{const n=line.indexOf(' § ');return n<0?[line,'Code කොටස් වෙන් කරන හිස් පේළියකි.']:[line.slice(0,n),line.slice(n+3)]});return{title,goal,topics,file,lines:rows.map(x=>x[0]),notes:rows.map(x=>x[1]),steps,mistake,exercise};}
M('How the web works','Frontend කියන්නේ මොකක්ද?','https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started',[
L('Browser එකේ සිට screen එකට','Frontend, backend සහ browser එකේ වගකීම් වෙන් කර හඳුනා ගන්න.',[
['ඔබ දකින කොටස','Text, buttons, forms සහ layout එක frontend එකයි. Browser එක HTML කියවලා DOM එකක් සාදනවා. CSS පෙනුම තීරණය කරනවා; JavaScript user actions අනුව UI එක වෙනස් කරනවා.'],
['Angular කරන වැඩේ','Angular UI එක components ලෙස සංවිධානය කරන framework එකක්. Component state එක වෙනස් කළාම template එකෙන් අලුත් data screen එකේ පෙන්වන්න පුළුවන්.'],
['Backend වගකීම','FastAPI permissions, validation සහ database access පාලනය කරනවා. Browser එක HTTP request යවා JSON response එක ලබාගන්නවා. Database credentials browser එකට දෙන්න අවශ්‍ය නැහැ.']
],'web-flow.txt',`User clicks a button § User action එකෙන් වැඩ පිළිවෙළ අරඹයි.
Angular component handles the event § Handler එක අවශ්‍ය action එක තීරණය කරයි.
HTTP request → FastAPI § Browser එක backend එකට request යවයි.
Database → JSON response § Backend එක data ලබාදී JSON යවයි.
Angular state → DOM § Response data එකෙන් screen එක update කරයි.`,['HTML, CSS සහ JavaScript load වෙයි','Browser එක UI සාදයි','User action එකෙන් request යවයි','Response එකෙන් screen update වෙයි'],'Frontend එකෙන් PostgreSQL එකට කෙළින් connect කරන්න එපා. Trusted data access backend එකේ තබන්න.',Q('Database permissions තහවුරු කළ යුත්තේ?',['CSS තුළ','Backend එක තුළ','Button එක hide කරලා'],1,'Server එක හැම request එකක්ම validate සහ authorize කළ යුතුයි.')),
L('අපි හදන project එක','Student Directory app එකේ features සහ වැඩ පිළිවෙළ හඳුනා ගන්න.',[
['අවසන් ප්‍රතිඵලය','නම සහ email සහිත records පෙන්වන Student Directory එකක් හදනවා. Search, add, edit සහ delete කරලා UI state එක නිවැරදිව update කරනවා.'],
['පියවරෙන් පියවර','මුලින් mock data සමඟ UI එක හදන්න. පසුව HttpClient service එකෙන් API එකකට connect කර loading, empty සහ error states handle කරන්න.'],
['Course සහ සැබෑ project එක','මේ lessons offline කියවන්න පුළුවන්. සැබෑ Angular project එකට Node.js, npm සහ මුල් package install එකට internet අවශ්‍යයි. Project tab එකෙන් සම්පූර්ණ source ගන්න.']
],'acceptance-checklist.txt',`[ ] List student records § Name සහ email පෙන්වන්න.
[ ] Search by name or email § Matching records පමණක් පෙන්වන්න.
[ ] Validate the form § Invalid fields submit නොකරන්න.
[ ] Add, edit and delete § Success පසු list update කරන්න.
[ ] Show loading and errors § Network failure එක user ට කියන්න.
[ ] Test and build § Production යැවීමට පෙර checks run කරන්න.`,['Features checklist ලියන්න','Mock UI workflow හදන්න','API contract connect කරන්න','Tests සහ build run කරන්න'],'එකවර සියලු features හදන්න යන්න එපා. එක් user journey එකක් බැගින් අවසන් කරන්න.',Q('API එක සූදානම් නැති නම්?',['Mock data සමඟ පටන් ගන්න','Database password browser එකට දෙන්න','UI හදන්න බැහැ'],0,'Data layer එක mock කර UI behavior ඉගෙනගෙන පසුව transport එක මාරු කරන්න.'))]);
M('Terminal & Node.js','පරිගණකය සූදානම් කරමු','https://angular.dev/reference/versions',[
L('Terminal සහ folders','Command එක සහ run කරන folder එක වෙන් කර තේරුම් ගන්න.',[
['Terminal එක','VS Code → Terminal → New Terminal තෝරන්න. Prompt එකේ path එක command එකේ කොටසක් නෙවෙයි. Commands එක බැගින් run කර output බලන්න.'],
['Current directory','mkdir අලුත් folder එකක් හදනවා. cd මඟින් folder එක මාරු කරනවා. npm commands run කළ යුත්තේ package.json තියෙන project root එකේ.'],
['OS අනුව','PowerShell හි Get-Location සහ Get-ChildItem භාවිතා කරන්න. macOS/Linux හි pwd සහ ls. Setup lab එකේ ඔබේ shell එක තෝරන්න.']
],'terminal · macOS/Linux',`pwd § Current folder එක පෙන්වයි; PowerShell හි Get-Location.
mkdir angular-learning § අලුත් learning folder එක සාදයි.
cd angular-learning § එම folder එකට මාරු වෙයි.
node --version § Node install වීද සහ version එක බලයි.
npm --version § Package manager version එක බලයි.`,['Projects folder විවෘත කරන්න','Current path බලන්න','Learning folder හදන්න','Node/npm පරීක්ෂා කරන්න'],'node: command not found නම් Node install කර terminal නැවත විවෘත කරන්න. URL එකක් shell command එකක් නොවේ.',Q('npm command එකේ project location තීරණය වන්නේ?',['Browser URL එකෙන්','Terminal current directory එකෙන්','CSS selector එකෙන්'],1,'npm current directory එකේ project configuration කියවනවා.')),
L('Node, npm සහ dependencies','Runtime එකත් package manager එකත් වෙන වෙනම හඳුනා ගන්න.',[
['Node.js භාවිතය','Angular CLI, build tool සහ tests Node.js මත run වෙනවා. Browser එකට යන්නේ compiled frontend files. Development server එක production hosting වෙනුවට භාවිතා නොකරන්න.'],
['මෙම course baseline','Angular 22 සහ Node 24.15.0 හෝ අලුත් 24.x patch එකක් භාවිතා කරන්න. Major version මාරු කළොත් official compatibility table එක බලන්න.'],
['Reproducible install','package.json direct dependencies දක්වනවා. package-lock.json resolved versions සුරකිනවා. Lock file commit කර clean checkout එකක npm ci කරන්න; node_modules commit කරන්න එපා.']
],'versions.txt',`node --version § Node 24.15.0+ (24.x) baseline පරීක්ෂා කරන්න.
npm --version § npm ලැබී ඇති බව තහවුරු කරන්න.
npx @angular/cli@22 version § CLI major 22 tool එක භාවිතා කරයි.
npm ci § Matching package-lock.json ඇති project එකක dependencies install කරයි.
npm audit § Advisories බලන්න; fixes review කර tests run කරන්න.`,['Node installer ගන්න','Node/npm versions බලන්න','CLI major තහවුරු කරන්න','Lock file version control එකේ තබන්න'],'npm ci සඳහා lock file අවශ්‍යයි. අලුත් project එකේ මුලින් npm install මඟින් lock file සාදනවා.',Q('package-lock.json සුරකින්නේ?',['CSS colors','Resolved dependency versions','API passwords'],1,'Lock file එක එකම dependency tree එක නැවත install කරගැනීමට උදව් වෙනවා.'))]);
M('Create an Angular app','පළමු project එක','https://angular.dev/installation',[
L('CLI එකෙන් project එක සාදමු','Standalone project එකක් සාදා local server එක අරඹන්න.',[
['Command එක කියවමු','npx CLI එක run කරනවා. new project scaffold එකක් හදනවා. --routing router config එක දානවා; --style=css stylesheet format එක තෝරනවා.'],
['Standalone structure','Components තමන් template එකේ භාවිතා කරන dependencies imports තුළ දානවා. මේ course එකේ AppModule එකක් හදන්න අවශ්‍ය නැහැ.'],
['Browser එකෙන් බලමු','Project folder එකට cd කර npm start run කරන්න. Terminal URL එක browser එකේ විවෘත කරන්න. File Save කළ විට dev server එක අලුත් code load කරනවා.']
],'terminal · create project',`npx @angular/cli@22 new student-directory --routing --style=css --standalone --ssr=false --defaults § Angular 22 scaffold එකක් නව child folder එකක සාදයි.
cd student-directory § package.json ඇති project root එකට යයි.
npm start § Development server අරඹයි; terminal open තබන්න.
# Open http://localhost:4200 in a browser § Browser action එකක්; shell command එකක් නෙවෙයි.
# Ctrl+C stops the server § Terminal keyboard shortcut එකයි.`,['Parent folder එකේ new command run කරන්න','Project folder එකට යන්න','npm start run කරන්න','Browser එකෙන් localhost බලන්න'],'4200 port busy නම් npm start -- --port 4201 භාවිතා කරන්න. package.json නැති folder එකේ npm start run කරන්න එපා.',Q('--routing එකෙන් එකතු වන්නේ?',['Database එකක්','Angular Router config','Password encryption'],1,'Router config screen navigation සඳහායි.')),
L('Project files සහ bootstrap','Entry point එකේ සිට root component එකට flow එක බලන්න.',[
['Entry point','main.ts root component bootstrap කරනවා. app.config.ts global providers තබනවා. index.html හි root selector එක mount වෙනවා.'],
['Component files','app.ts logic එකයි, app.html template එකයි, app.css styles එකයි. CLI naming අනුව .component.ts වගේ නාමත් ලැබිය හැක; imports actual paths වලට ගැළපෙන්න ඕන.'],
['Config සහ assets','angular.json build targets/asset paths පාලනය කරනවා. tsconfig.json compiler options. Public frontend config build output එකේ කියවිය හැකි නිසා secrets තබන්න එපා.']
],'src/main.ts',`import { bootstrapApplication } from '@angular/platform-browser'; § Standalone bootstrap API එක ලබාගනී.
import { appConfig } from './app/app.config'; § Global configuration import කරයි.
import { App } from './app/app'; § Root component class එක ගනී.
bootstrapApplication(App, appConfig) § app-root element එකේ Angular app අරඹයි.
  .catch(error => console.error(error)); § Bootstrap failure console එකේ පෙන්වයි.`,['index.html root tag හඳුනාගන්න','main.ts imports බලන්න','Providers config බලන්න','Template heading වෙනස් කරන්න'],'Export කරන class name සහ import නම ගැළපිය යුතුයි. File path එක වැරදි නම් build fail වෙනවා.',Q('Global router provider තබන්නේ?',['app.config.ts','node_modules අතින් edit කරලා','Image file එකක'],0,'App configuration global providers සම්බන්ධ කරනවා.'))]);
M('HTML, CSS & accessibility','පිරිසිදු UI පදනම','https://developer.mozilla.org/en-US/docs/Learn_web_development/Core',[
L('Semantic HTML සහ forms','Keyboard එකෙන් භාවිතා කළ හැකි පැහැදිලි controls හදන්න.',[
['අර්ථවත් tags','Content සඳහා main, section සහ headings භාවිතා කරන්න. Action එකකට button, navigation එකකට link. Clickable div එකට native keyboard behavior ලැබෙන්නේ නැහැ.'],
['Labels','Visible label එකේ for සහ input id එක සම්බන්ධ කරන්න. Placeholder එක label වෙනුවට භාවිතා කරන්න එපා. Submit action form element එකේ සකස් කරන්න.'],
['Feedback','Tab සහ Enter භාවිතා කර controls බලන්න. Focus outline තබන්න. Error එක color එකෙන් පමණක් නොපෙන්වා text සහ aria-describedby එකෙන් කියන්න.']
],'accessible-form.html',`<form> § Related controls එක submit boundary එකකට ගනී.
  <label for="name">Student name</label> § Input එකට visible label ලබාදෙයි.
  <input id="name" name="name" required> § for/id සම්බන්ධතාව ලැබෙයි.
  <button type="submit">Save</button> § Keyboard submit support ලබාදෙයි.
  <p role="status" aria-live="polite"></p> § Results assistive technology වෙත දන්වයි.
</form> § Form එක අවසන් කරයි.`,['Heading hierarchy හදන්න','Input labels දෙන්න','Keyboard navigation බලන්න','Feedback text පෙන්වන්න'],'Focus outline ඉවත් නොකරන්න. Validation message එක වැරැද්ද සහ නිවැරදි කරන ක්‍රමය කියාදිය යුතුයි.',Q('Save action එකට සුදුසු native element එක?',['div','button','span'],1,'Native button එකට keyboard සහ accessibility support ලැබෙනවා.')),
L('Responsive CSS සහ grids','Phone සිට desktop දක්වා fit වෙන card layout හදන්න.',[
['Box model','border-box මඟින් padding සහ border declared width එකට ඇතුළත් වෙනවා. Fluid width සහ max-width භාවිතා කර screen එකට ගැළපෙන්න දෙන්න.'],
['Grid සහ flex','Cards සඳහා Grid, header actions සඳහා flex යොදාගන්න. minmax(0,1fr) දිග content එකක් නිසා column එක viewport එකෙන් පිට යෑම අඩු කරනවා.'],
['Small screen','Mobile එකේ single column කරන්න. Long email, code block සහ controls නිසා whole page horizontal scroll වෙනවාද පරීක්ෂා කරන්න.']
],'src/styles.css',`* { box-sizing: border-box; } § Padding/border width එක තුළ ගනී.
.grid { § Cards container එක තෝරයි.
  display: grid; § Grid layout අරඹයි.
  grid-template-columns: repeat(2, minmax(0, 1fr)); § Equal columns දෙකක් සාදයි.
  gap: 1rem; § Cards අතර spacing දෙයි.
} § Rule එක අවසන් කරයි.
@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } } § Mobile එකේ single column කරයි.`,['Desktop grid හදන්න','Mobile breakpoint දාන්න','Long text දමා බලන්න','320px සහ desktop බලන්න'],'Fixed desktop width එකක් phone layout එකට දාන්න එපා. Code block ඇතුළේ scroll වුණත් whole page overflow නොවිය යුතුයි.',Q('Grid items අතර spacing සඳහා?',['gap','subscribe','password'],0,'gap මඟින් items අතර spacing දෙන්න පුළුවන්.'))]);
M('JavaScript foundations','JavaScript වලින් සිතමු','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',[
L('Variables, functions සහ events','Input එකකින් output එකක් ලබාගන්න reusable functions ලියන්න.',[
['const සහ let','නැවත assign නොකරන binding එකකට const. නැවත assign කරන එකකට let. const object එකක properties වෙනස් කළ හැක; binding එක නැවත assign කළ නොහැක.'],
['Function එක','Function එක input ගෙන output return කරන reusable වැඩ කොටසක්. Parameter input එකේ නමයි; argument call එකේ actual value එකයි.'],
['Event handler','Click හෝ input එක user action එකක්. Angular handler එකෙන් state update කරන්න. DOM query කර text අතින් වෙනස් කිරීමට වඩා template bindings භාවිතා කරන්න.']
],'functions.js',`const unitPrice = 1200; § Unit price එක තබයි.
let quantity = 2; § වෙනස් විය හැකි quantity එකයි.
const total = (price, count) => price * count; § Arguments දෙක multiply කර return කරයි.
quantity = 3; § අලුත් quantity එක assign කරයි.
console.log(total(unitPrice, quantity)); § 3600 පෙන්වයි.`,['Inputs තෝරන්න','Function ලියන්න','Arguments සමඟ call කරන්න','Return value පෙන්වන්න'],'console.log කරන එක return කරන එකට සමාන නැහැ. Return නැති function result undefined විය හැක.',Q('total(1200, 3) output එක?',['1203','3600','undefined'],1,'1200 × 3 = 3600.')),
L('Arrays, objects සහ immutable updates','Records filter, map සහ copy කරන්න.',[
['Data structure','එක් student කෙනෙක් object එකකින්ද students කිහිප දෙනෙක් array එකකින්ද දක්වන්න. Stable id එකක් identity සඳහා තබන්න.'],
['filter සහ map','filter matching records පමණක් අලුත් array එකකට ගනී. map එක් එක් record transform කර අලුත් array එකක් දෙයි. දෙකම මුල් array එක mutate කරන්නේ නැහැ.'],
['Immutable update','Spread syntax මඟින් අලුත් object/array references සාදන්න. Signals සහ component inputs එක්ක updates හඳුනාගැනීමට මෙය පහසු වෙනවා.']
],'students.js',`const students = [{ id: 1, name: 'Nimal' }, { id: 2, name: 'Amali' }]; § Records දෙකක් තබයි.
const visible = students.filter(s => s.name.toLowerCase().includes('ama')); § Amali පමණක් තෝරයි.
const names = visible.map(s => s.name); § Objects සිට names array එකක් ලබාගනී.
const updated = students.map(s => s.id === 1 ? { ...s, name: 'Nimal Silva' } : s); § ID 1 සඳහා අලුත් object සාදයි.
console.log(names); § ['Amali'] පෙන්වයි.`,['Objects array හදන්න','Query normalize කරන්න','Filter කරන්න','ID අනුව copy කර update කරන්න'],'Array index එක identity කළොත් sorting/delete පසු වැරදි record update විය හැක.',Q('Matching records පමණක් ගන්නේ?',['filter','map පමණක්','push'],0,'filter predicate true වන records පමණක් ලබාදෙනවා.'))]);
M('TypeScript essentials','Types එක්ක පැහැදිලි code','https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',[
L('Types, interfaces සහ models','Data record එකේ හැඩය compile time එකේ පැහැදිලි කරන්න.',[
['Types ඇයි?','string, number සහ boolean types වැරදි assignments compile time එකේ අල්ලනවා. TypeScript build වන විට JavaScript බවට පරිවර්තනය වෙනවා.'],
['Interface','Student interface fields සහ types විස්තර කරනවා. Create payload එකේ server-generated id අවශ්‍ය නැති නිසා වෙනම StudentInput type එකක් දෙන්න.'],
['Runtime checks','HttpClient.get<Student[]>() JSON validate කරන්නේ නැහැ. Untrusted response shape එක runtime schema හෝ type guard එකකින් පරීක්ෂා කිරීම production boundary එකක අවශ්‍ය විය හැක.']
],'src/app/student.ts',`export interface Student { § Export කළ හැකි data contract එකයි.
  id: number; § Stable identity එකයි.
  name: string; § නම string විය යුතුයි.
  email: string; § Format validation වෙනම කළ යුතුයි.
} § Interface අවසන් කරයි.
export type StudentInput = Omit<Student, 'id'>; § Payload එකෙන් id ඉවත් කරයි.
const draft: StudentInput = { name: 'Amali', email: 'amali@example.com' }; § Required fields දෙයි.`,['Fields ලියන්න','Interface export කරන්න','Payload type වෙන් කරන්න','Compiler errors හදන්න'],'any දාලා errors සඟවන්න එපා. unknown value එක checks පසු narrow කරන්න.',Q('Interface එක runtime JSON validate කරනවාද?',['ඔව්','නැහැ; වෙනම checks අවශ්‍යයි','Database තිබුණොත්'],1,'TypeScript compile-time types runtime validation එකක් නොවේ.')),
L('Imports, classes සහ null safety','Missing values handle කර readable class code ලියන්න.',[
['Class members','Properties state තබනවා; methods behavior දක්වනවා. Angular component/service exported classes ලෙස ලියන්න පුළුවන්. private implementation details සඳහායි.'],
['Modules','Export කරන symbol එක වෙනත් file එකක import කළ හැක. Relative path actual file එකට ගැළපෙන්න ඕන. Package imports module name එකෙන් කරයි.'],
['Missing values','null හෝ undefined විය හැකි නම් type එකේ දක්වන්න. ?. safe access දෙයි; ?? missing value එකට fallback දෙයි. ! value එකක් runtime එකේ සාදන්නේ නැහැ.']
],'null-safety.ts',`interface Profile { name: string; } § Data shape එකයි.
let selected: Profile | null = null; § මුලින් selection නැති බව දක්වයි.
function label(profile: Profile | null): string { § Possibly-null input එක ගනී.
  return profile?.name ?? 'No student selected'; § Missing value එකට fallback දෙයි.
} § Function එක අවසන් කරයි.
console.log(label(selected)); § Crash නැතිව fallback පෙන්වයි.`,['Missing state type කරන්න','Safe access කරන්න','Fallback තෝරන්න','Null සහ populated cases බලන්න'],'Non-null assertion ! දාලා missing data bug එකක් නිවැරදි වෙන්නේ නැහැ.',Q('profile null නම් profile?.name ?? "Guest" output?',['Crash','Guest','null.name'],1,'Optional chaining සහ nullish fallback නිසා Guest ලැබෙනවා.'))]);
M('Standalone components','Component එකක් ගොඩනගමු','https://angular.dev/guide/components',[
L('Decorator, selector සහ template','UI building block එකක කොටස් තුන සම්බන්ධ කරන්න.',[
['Component එක','Component එක self-contained UI කොටසක්. Decorator එක selector/template/imports දක්වනවා. Class එක data සහ actions තබනවා.'],
['Selector','app-welcome selector එක parent template එකේ <app-welcome /> ලෙස භාවිතා කරන්න. Parent imports තුළ child class එක එක් කරන්න.'],
['Standalone dependencies','තමන් template එකේ භාවිතා කරන dependencies imports තුළ දාන්න. Built-in @if/@for සඳහා CommonModule අවශ්‍ය නැහැ; pipes සහ directives සඳහා අදාළ imports අවශ්‍යයි.']
],'welcome.ts',`import { Component } from '@angular/core'; § Decorator import කරයි.
@Component({ § Metadata අරඹයි.
  selector: 'app-welcome', § Parent එකේ භාවිතා කරන tag එකයි.
  standalone: true, § NgModule declaration නැතිව භාවිතා කළ හැක.
  template: '<h2>Hello, {{ name }}</h2>', § Inline template එකයි.
}) § Metadata අවසන් කරයි.
export class Welcome { name = 'Amali'; } § Template එක කියවන data එකයි.`,['Class සාදන්න','Metadata ලියන්න','Parent imports දාන්න','Selector render කරන්න'],'Unknown element නම් selector සහ imports බලන්න. Schema එකකින් ordinary import error සඟවන්න එපා.',Q('Child component parent template එකේ භාවිතා කිරීමට?',['Parent imports තුළ child class','Database table','Global variable'],0,'Standalone template dependencies parent imports තුළ ලියනවා.')),
L('Template files සහ component styles','Logic, HTML සහ CSS සරලව සංවිධානය කරන්න.',[
['Files වෙන් කිරීම','Template දිග නම් templateUrl භාවිතා කරන්න. styleUrl stylesheet එක සම්බන්ධ කරනවා. Paths component file එකට relative.'],
['Style scope','Default emulated encapsulation component styles template elements වෙත සීමා කරනවා. Body background, typography සහ tokens global styles.css තුළ තබන්න.'],
['Boundaries','Student card, form සහ list වැනි responsibilities වෙන් කරන්න. හැම text line එකකටම component අවශ්‍ය නැහැ; reuse සහ behavior බලන්න.']
],'student-card.ts',`import { Component } from '@angular/core'; § Angular API ගනී.
@Component({ § Card metadata එකයි.
  selector: 'app-student-card', standalone: true, § Selector එක සහ standalone mode එකයි.
  templateUrl: './student-card.html', § HTML file path එකයි.
  styleUrl: './student-card.css', § Local stylesheet එකයි.
}) § Metadata අවසන් කරයි.
export class StudentCard {} § Logic පසුව එක් කරන්න.`,['Responsibility තෝරන්න','HTML/CSS files සාදන්න','Paths metadata තුළ දාන්න','Styles බලන්න'],'Global body styles component CSS එකට දමා apply වෙයි කියලා හිතන්න එපා.',Q('templateUrl සාමාන්‍යයෙන් relative වන්නේ?',['Component file එකට','Database directory එකට','Downloads folder එකට'],0,'Template URL component source location එකට relative.'))]);
M('Data binding & events','State එක screen එකට','https://angular.dev/guide/templates/binding',[
L('Interpolation සහ property binding','Class values text සහ DOM properties වෙත bind කරන්න.',[
['Interpolation','{{ title }} text පෙන්වනවා. Signal එකක් නම් {{ title() }} ලෙස කියවන්න. සාමාන්‍ය interpolation text escape කරනවා.'],
['Properties','[disabled]="saving" actual boolean DOM property එකට දෙයි. disabled="false" HTML attribute එක button enable කරන්නේ නැහැ.'],
['Attributes','ARIA වැනි attributes සඳහා [attr.aria-label] දෙන්න. Classes සඳහා [class.active] භාවිතා කරන්න. Business state TypeScript එකේ තබන්න.']
],'binding.html',`<h1>{{ title }}</h1> § Class property එක text පෙන්වයි.
<button [disabled]="saving">Save</button> § saving boolean එක DOM property එකට දෙයි.
<img [src]="avatarUrl" alt="Student portrait"> § Image URL bind කරයි.
<p [class.active]="isSelected">Student</p> § Conditional class යොදයි.
<button [attr.aria-label]="'Edit ' + studentName">Edit</button> § Action එකට accessible නම දෙයි.`,['Class values define කරන්න','Text interpolate කරන්න','Properties bind කරන්න','True/false states බලන්න'],'Boolean attributes string interpolation කර වැරදි disabled behavior හදන්න එපා.',Q('Boolean state එකකට නිවැරදි binding?',['disabled="false"','[disabled]="saving"','disabled="saving()"'],1,'Property binding actual boolean value එක ලබාදෙනවා.')),
L('Click, input සහ two-way binding','User action එකෙන් reactive state update කරන්න.',[
['Event syntax','(click)="save()" method එකට event bind කරනවා. $event browser event details හෝ output payload එකයි. Logic method එකකට පවරන්න.'],
['Input handling','#search template reference එකෙන් input value කියවන්න. (input)="query.set(search.value)" explicit data flow එකක් දෙයි.'],
['ngModel','[(ngModel)] සරල forms සඳහා FormsModule import කර භාවිතා කළ හැක. එකම input එකේ reactive formControl සමඟ ngModel මිශ්‍ර කරන්න එපා.']
],'events.html',`<input #search [value]="query()" § Template reference එක සහ current value දෙයි.
  (input)="query.set(search.value)" § Type කරන විට signal update කරයි.
  aria-label="Search students"> § Accessible input නමයි.
<button type="button" (click)="query.set('')">Clear</button> § Click එකෙන් query හිස් කරයි.
<p>Searching for: {{ query() }}</p> § State එක නැවත පෙන්වයි.`,['Input label දෙන්න','Event bind කරන්න','State update කරන්න','Template result බලන්න'],'Render expression තුළ side effects දාන්න එපා. User events වලින් state වෙනස් කරන්න.',Q('Click method bind කරන්නේ?',['[click]="save"','(click)="save()"','{{ click.save }}'],1,'Parentheses event binding දක්වනවා.'))]);
M('Control flow & pipes','Lists සහ conditional UI','https://angular.dev/guide/templates/control-flow',[
L('@if, @for සහ empty states','Conditions සහ collections අනුව content පෙන්වන්න.',[
['@if','Loading/error/success වෙන වෙනම branches වල පෙන්වන්න. Pending request එක blank list එකකට සමාන නොකරන්න.'],
['@for','Records iterate කරන විට track student.id යොදන්න. Edit/delete පසුත් item identity එක පවත්වාගන්න stable ID එක හොඳයි.'],
['@empty','Items නැති විට useful message සහ next action දෙන්න. Search result හිස් වුණොත් query වෙනස් කරන්න කියන්න.']
],'student-list.html',`@if (loading()) { § Pending branch එකයි.
  <p role="status">Loading…</p> § Loading feedback දෙයි.
} @else { § Data branch එකයි.
  @for (student of students(); track student.id) { § Stable ID එකෙන් iterate කරයි.
    <p>{{ student.name }}</p> § Escaped name text පෙන්වයි.
  } @empty { <p>No students yet.</p> } § Empty array feedback දෙයි.
} § Conditional අවසන් කරයි.`,['Pending state බලන්න','Array iterate කරන්න','Stable key තෝරන්න','Empty state බලන්න'],'Changing list සඳහා $index identity කිරීම නිසා DOM state වැරදි record එකට යා හැක.',Q('Record track කිරීමට හොඳ key?',['Math.random()','student.id','$index හැම විටම'],1,'Stable record ID එක operations අතර identity පවත්වාගනී.')),
L('Pipes සහ display formatting','Original data වෙනස් නොකර display format කරන්න.',[
['Pipes','Date, currency සහ letter case formatting සඳහා pipes භාවිතා කරන්න. Business state mutate කිරීමට pipe භාවිතා නොකරන්න.'],
['Imports','Standalone component imports තුළ DatePipe, CurrencyPipe හෝ AsyncPipe වැනි used pipes දාන්න. @for එකට import නැති නමුත් pipes වලට අවශ්‍යයි.'],
['Format සහ conversion','Currency pipe number format කරනවා; exchange-rate conversion කරන්නේ නැහැ. Date timezone සහ locale user requirements අනුව තෝරන්න.']
],'pipe-demo.ts',`import { Component } from '@angular/core'; § Component API එකයි.
import { DatePipe, CurrencyPipe } from '@angular/common'; § Used pipes import කරයි.
@Component({ § Metadata අරඹයි.
  selector: 'app-price', standalone: true, imports: [DatePipe, CurrencyPipe], § Template scope එකට pipes දායි.
  template: '<p>{{ date | date:"yyyy-MM-dd" }}</p><p>{{ amount | currency:"LKR" }}</p>', § Display values format කරයි.
}) § Metadata අවසන් කරයි.
export class Price { date = '2026-10-27T00:00:00Z'; amount = 1500; } § Raw values තබයි.`,['Raw value තබන්න','Pipe import කරන්න','Format තෝරන්න','Original value බලන්න'],'Currency symbol දාපු පමණින් USD amount එක LKR value එකකට convert වෙන්නේ නැහැ.',Q('Unknown pipe error නම් බලන්නේ?',['Component imports','Database indexes','Git branch නම'],0,'Pipe class එක template scope එකට අවශ්‍යයි.'))]);
M('Component communication','Parent සහ child අතර data','https://angular.dev/guide/components/inputs',[
L('input() මඟින් data ලබාදීම','Parent එකෙන් child එකට typed contract එකක් දෙන්න.',[
['Parent owns data','List parent collection එක පාලනය කරනවා. Child card එක් record එක display කරනවා. Child එක parent state කෙළින් mutate නොකරන්න.'],
['Required input','input.required<Student>() parent value එකක් අවශ්‍ය බව කියයි. Child template එක student().name ලෙස signal input කියවනවා.'],
['Parent binding','Parent imports තුළ child class දාලා [student]="student" bind කරන්න. Property නම සහ binding නම එකම විය යුතුයි.']
],'student-card.ts',`import { Component, input } from '@angular/core'; § Signal input API එකයි.
import { Student } from './student'; § Model contract ගනී.
@Component({ selector: 'app-student-card', standalone: true, § Card selector එකයි.
  template: '<h3>{{ student().name }}</h3>' }) § Input signal එක කියවයි.
export class StudentCard { § Child class එකයි.
  student = input.required<Student>(); § Parent value එක required කරයි.
} § Parent එක [student] binding දිය යුතුයි.`,['Parent record තබන්න','Input declare කරන්න','Parent binding දෙන්න','Child value කියවන්න'],'Required input constructor එකේ ඉක්මනින් කියවන්න එපා. Values සූදානම් වූ lifecycle/template එකෙන් කියවන්න.',Q('Input signal value කියවන්නේ?',['student.name','student().name','student.emit()'],1,'Signal input function call එකකින් කියවනවා.')),
L('output() මඟින් actions දැනුම්දීම','Child action එක parent state update එකක් බවට පත් කරන්න.',[
['Event payload','Delete click එකේ record ID emit කරන්න. Parent එය අල්ලා service call එක කරයි. Child එකට full API service එක දැනගන්න අවශ්‍ය නැහැ.'],
['Typed output','output<number>() event payload number බව දක්වනවා. emit(id) parent binding එකට ඒ value එක ලබාදෙනවා.'],
['Data flow','Data parent සිට child වෙත; action intent child සිට parent වෙත. මේ boundary එක testing සහ debugging පහසු කරනවා.']
],'card-actions.ts',`import { Component, input, output } from '@angular/core'; § Communication APIs ගනී.
@Component({ selector: 'app-card-actions', standalone: true, § Child metadata එකයි.
  template: '<button (click)="removed.emit(id())">Delete</button>' }) § ID emit කරයි.
export class CardActions { § Actions class එකයි.
  id = input.required<number>(); § Parent record ID එකයි.
  removed = output<number>(); § Parent subscribe කරන event එකයි.
} § Parent: (removed)="deleteStudent($event)" යොදන්න.`,['Output declare කරන්න','Click දී ID emit කරන්න','Parent event අල්ලන්න','Service සහ state update කරන්න'],'Output events DOM bubbling මත රඳා නොසිටින්න. Parent binding explicit ලෙස සම්බන්ධ කරන්න.',Q('Parent එක output payload ගන්නේ?',['$event','localStorage.password','document.cookie'],0,'$event යනු output emit කළ value එකයි.'))]);
M('Signals & lifecycle','Reactive state සහ cleanup','https://angular.dev/guide/signals',[
L('signal, computed සහ updates','Source සහ derived values වෙන් කරන්න.',[
['Writable signals','signal(0) value එක count() ලෙස කියවන්න. set direct value එකක් දෙනවා; update previous value එකෙන් calculate කරනවා.'],
['Computed','computed dependency signals මත read-only result derive කරනවා. Search results සහ count වෙනම writable state වල sync කරන්න අවශ්‍ය නැහැ.'],
['Immutable updates','Array එක push කර reference එකම තැබීම වෙනුවට update(rows => [...rows, newRow]) කරන්න. Explicit updates state flow එක පැහැදිලි කරනවා.']
],'counter.ts',`import { signal, computed } from '@angular/core'; § Reactive APIs ගනී.
const count = signal(0); § Source value එකයි.
const doubled = computed(() => count() * 2); § Derived value එකයි.
count.set(2); § Direct update එකකි.
count.update(value => value + 1); § Value එක 3 කරයි.
console.log(doubled()); § Output එක 6 යි.`,['Source signal සාදන්න','Computed result සාදන්න','Source update කරන්න','Template signals කියවන්න'],'Computed එකට set කළ නොහැක. Derived state සඳහා effect දාලා duplicate values sync කිරීම වළක්වන්න.',Q('ඉහත doubled() output?',['3','6','4'],1,'Count 3 නිසා doubled 6.')),
L('Lifecycle සහ cleanup','Component එක නැතිවෙන විට resources නිදහස් කරන්න.',[
['Initialization','Constructor DI සඳහායි. ngOnInit initial inputs ලැබුණු පසු logic සඳහා යොදාගන්න පුළුවන්. Template එකේ repeated side effects කරන්න එපා.'],
['Cleanup','Timers, listeners සහ long-lived streams component destroy පසුත් run විය හැක. DestroyRef හෝ takeUntilDestroyed භාවිතා කරන්න.'],
['Effects','effect reactive dependency වෙනස්වීමක external side effect එකක් සඳහායි. Derived numbers සඳහා computed දෙන්න. SSR එකේ browser-only APIs නොලැබිය හැක.']
],'clock.ts',`import { Component, DestroyRef, inject, signal } from '@angular/core'; § Lifecycle සහ state APIs ගනී.
@Component({ selector: 'app-clock', standalone: true, template: '{{ ticks() }}' }) § Clock view එකයි.
export class Clock { § Component owner එකයි.
  ticks = signal(0); § State එකයි.
  constructor() { § Timer setup කරයි.
    const timer = setInterval(() => this.ticks.update(n => n + 1), 1000); § Ticks update කරයි.
    inject(DestroyRef).onDestroy(() => clearInterval(timer)); § Destroy පසු නවත්වයි.
  } § Constructor අවසන් කරයි.
} § Class අවසන් කරයි.`,['Resource සාදන්න','State update කරන්න','Cleanup register කරන්න','Navigation පසු cleanup බලන්න'],'සෑම render එකකම timer සාදන්න එපා. Resource එකේ owner සහ cleanup boundary එක තබන්න.',Q('Destroy පසු timer එකට කළ යුත්තේ?',['දිගටම run වෙන්න දෙන්න','clearInterval කරන්න','තවත් timer එකක් හදන්න'],1,'Cleanup stale updates සහ background work නවත්වයි.'))]);
M('Services & DI','Data logic වෙන් කරමු','https://angular.dev/guide/di',[
L('Injectable service සහ inject()','UI rendering එකෙන් data access වෙන් කරන්න.',[
['Service boundary','API calls සහ reusable logic service එකක තබන්න. Component එක interactions, form සහ visual states handle කරනවා.'],
['DI','Angular injector instance එක resolve කරනවා. new Service(...) අතින් සාදනවා වෙනුවට inject(Service) භාවිතා කරන්න.'],
['Scope','providedIn root service එක root injector එකෙන් share වෙනවා. Component providers තුළ නැවත දුන්නොත් වෙනම instance එකක් ලැබිය හැක.']
],'student-store.ts',`import { Injectable, signal } from '@angular/core'; § Service සහ state APIs ගනී.
import { Student } from './student'; § Record type එකයි.
@Injectable({ providedIn: 'root' }) § Root service register කරයි.
export class StudentStore { § Data store class එකයි.
  private data = signal<Student[]>([]); § Mutable state private තබයි.
  readonly students = this.data.asReadonly(); § Read-only view දෙයි.
  replace(rows: Student[]) { this.data.set(rows); } § Controlled update method එකයි.
} § Component එකෙන් inject(StudentStore) කරන්න.`,['Responsibility තෝරන්න','Service declare කරන්න','Component inject කරන්න','Methods හරහා update කරන්න'],'new service instance අතින් සාදා DI configuration මඟහැරීම වළක්වන්න.',Q('inject(StudentStore) දෙන්නේ?',['Injector resolve කළ instance','HTML string','SQL connection'],0,'Angular DI dependency instance එක ලබාදෙනවා.')),
L('Feature folders සහ architecture','Files සොයාගන්න සහ වෙනස් කරන්න පහසු structure දෙන්න.',[
['Feature organization','Students page, form, card සහ service ආසන්නව තබන්න. Screens කිහිපයක අවශ්‍ය UI පමණක් shared folder එකට ගන්න.'],
['Responsibilities','Model data shape එකයි. Service transport එකයි. Page user actions සහ state එකයි. Template presentation එකයි.'],
['Field adapters','Backend full_name UI name බවට වෙනස් කරනවා නම් එක් adapter එකක map කරන්න. Component හැම එකේම rename code copy නොකරන්න.']
],'folders.txt',`src/app/ § Application root එකයි.
  app.ts § Root shell component එකයි.
  app.routes.ts § URL mappings එකයි.
  students/student.ts § Model සහ payload types තබයි.
  students/student-api.ts § HTTP සහ mapping logic තබයි.
  students/student-page.ts § Page actions සහ state තබයි.
  students/student-page.html § View එකයි.
  shared/ § සැබෑ reusable UI සඳහායි.`,['Feature boundary තෝරන්න','Types වෙන් කරන්න','Transport වෙන් කරන්න','Shared mapping එක් තැනකට ගන්න'],'Folder names පමණින් clean architecture ලැබෙන්නේ නැහැ. Repeated logic සහ dependency boundaries බලන්න.',Q('Backend field map කිරීමට සුදුසු ස්ථානය?',['හැම handler එකකම','Service/adapter boundary','CSS එකේ'],1,'එක් adapter boundary එකක mapping තැබීම backend changes සීමා කරනවා.'))]);
M('Routing & navigation','Screens අතර ගමන් කරමු','https://angular.dev/guide/routing',[
L('Routes, links සහ outlet','URL අනුව page component render කරන්න.',[
['Route table','Routes array path එකකට component සම්බන්ධ කරනවා. provideRouter(routes) app config එකේ දාන්න. Empty redirect සඳහා pathMatch full යොදන්න.'],
['Outlet සහ links','RouterOutlet route component පෙන්වන තැනයි. RouterLink navigation සඳහායි. දෙකම standalone shell imports තුළ දාන්න.'],
['Ordering','Specific routes මුලින්, wildcard ** අවසානයට. loadComponent lazy screen bundles දෙයි. Host එකේ direct URL refresh සඳහා SPA fallback අවශ්‍යයි.']
],'app.routes.ts',`import { Routes } from '@angular/router'; § Route type ගනී.
export const routes: Routes = [ § Ordered mappings එකයි.
  { path: '', pathMatch: 'full', redirectTo: 'students' }, § Root redirect එකයි.
  { path: 'students', loadComponent: () => import('./student-page').then(m => m.StudentPage) }, § Lazy page එකයි.
  { path: '**', redirectTo: 'students' }, § Demo unknown path fallback එකයි.
]; § provideRouter(routes) වෙත දෙන්න.`,['Routes ලියන්න','Provider register කරන්න','Outlet සහ links දාන්න','Direct URL බලන්න'],'Outlet නැතිව route configure කළාට screen පෙනෙන්නේ නැහැ.',Q('Wildcard route එක තබන්නේ?',['මුලින්','අවසානයේ','හැම route එකටම කලින්'],1,'First match wins නිසා catch-all එක අවසානයට.')),
L('Route params සහ query params','Record ID සහ share කළ හැකි search state URL එකෙන් ගන්න.',[
['Path params','students/:id හි id string ලෙස ලැබේ. Positive safe integer එකක්ද validate කර පසුව request කරන්න.'],
['Query params','?q=amali search state share කරන්න useful. Backend query එකක් නොවේ; server එකට යවනවා නම් validation/encoding කරන්න.'],
['Changes','Snapshot initial value පමණක් දෙයි. එකම component එකේ param වෙනස් විය හැකි නම් paramMap stream සමඟ switchMap භාවිතා කරන්න.']
],'route-params.ts',`const route = inject(ActivatedRoute); § Component injection context එකේ current route ගනී.
const raw = route.snapshot.paramMap.get('id'); § String හෝ null ලැබේ.
const id = Number(raw); § Numeric conversion කරයි.
const valid = raw !== null && Number.isSafeInteger(id) && id > 0; § ID validity පරීක්ෂා කරයි.
const q = route.snapshot.queryParamMap.get('q') ?? ''; § Missing query එකට fallback දෙයි.`,['Path declare කරන්න','Raw string ගන්න','Parse සහ validate කරන්න','Valid නම් request කරන්න'],'Number(null) = 0. Convert වූ පමණින් valid ID එකක් ලැබුණා කියලා හිතන්න එපා.',Q('paramMap.get return type?',['string හෝ null','සැමවිටම number','Student object'],0,'URL values strings; parsing සහ validation අවශ්‍යයි.'))]);
M('Reactive forms','Form state එක හදමු','https://angular.dev/guide/forms/reactive-forms',[
L('FormGroup සහ FormControl','Values සහ validators TypeScript model එකක තබන්න.',[
['Models','FormControl එක් field එකේ value/status තබනවා. FormGroup related controls එකතු කරනවා. Component එක ReactiveFormsModule import කළ යුතුයි.'],
['Non-nullable','nonNullable true controls reset වූ විට null නොවී initial value එකට යනවා. Typed forms payload shape පැහැදිලි කරනවා.'],
['View connection','Form එක [formGroup] bind කර inputs වල formControlName දාන්න. (ngSubmit) handler එක validation සහ service call එක පාලනය කරයි.']
],'student-form.ts',`import { FormControl, FormGroup, Validators } from '@angular/forms'; § Form APIs ගනී.
const form = new FormGroup({ § Controls group කරයි.
  name: new FormControl('', { nonNullable: true, validators: [Validators.required] }), § Required name එකයි.
  email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }), § Email format සහ required checks යොදයි.
}); § Model එක අවසන් කරයි.
const payload = form.getRawValue(); § Disabled controls ඇතුළුව values ගනී.
form.reset(); § Initial strings වෙත reset කරයි.`,['Controls හදන්න','Forms module import කරන්න','Template bind කරන්න','Submit validity බලන්න'],'form.value වල disabled controls ඉවත් විය හැක. අවශ්‍ය payload shape එකට ගැළපෙන method තෝරන්න.',Q('Control එක template input එකට සම්බන්ධ කරන්නේ?',['formControlName','routerLink','track'],0,'Control key එක සහ formControlName එකම විය යුතුයි.')),
L('Submit flow සහ pending state','Invalid request නවතා saving feedback දෙන්න.',[
['Submit','ngSubmit හරහා button සහ Enter එකම path එකට ගන්න. Invalid නම් markAllAsTouched කර return කරන්න.'],
['Saving','Pending request එකේ saving true කරන්න. Button disable කිරීම සමඟ handler එකේ duplicate submit guard එකක් දෙන්න.'],
['Result','Success දී list update කර form reset කරන්න. Failure දී values තබා useful message සහ retry දෙන්න. Sensitive inputs සඳහා retention policy වෙනම බලන්න.']
],'student-form.html',`<form [formGroup]="form" (ngSubmit)="save()"> § Model සහ submit සම්බන්ධ කරයි.
  <label for="name">Name</label> § Visible label එකයි.
  <input id="name" formControlName="name"> § Name control bind කරයි.
  <label for="email">Email</label> § Email label එකයි.
  <input id="email" type="email" formControlName="email"> § Email control එකයි.
  <button type="submit" [disabled]="saving()">Save</button> § Pending submit නවත්වයි.
</form> § Form එක අවසන් කරයි.`,['Submit අල්ලන්න','Invalid නම් return කරන්න','Saving සමඟ request කරන්න','Result පෙන්වන්න'],'Click handler එකට පමණක් save දැම්මොත් Enter behavior අතපසු විය හැක.',Q('Invalid submit එකකදී?',['Request යවන්න','Errors පෙන්වා return කරන්න','Values සියල්ල මකන්න'],1,'User ට නිවැරදි කරගන්න ඉඩදී invalid request නවත්වන්න.'))]);
M('Validation & edit mode','Errors පැහැදිලි කරමු','https://angular.dev/guide/forms/form-validation',[
L('Touched, dirty සහ messages','User ට field එක නිවැරදි කිරීමට උදව් කරන්න.',[
['Statuses','invalid validator fail බවයි. touched focus ඉවත් වූ බවයි. dirty user value වෙනස් කළ බවයි. Initial render එකේ සියලු errors පෙන්වන්න අවශ්‍ය නැහැ.'],
['Useful validation','Email එකට valid example දෙන්න. required එක whitespace reject නොකරන නිසා name.trim() හෝ custom validator යොදන්න.'],
['Server errors','Duplicate email, permission සහ backend rules frontend format validation එකෙන් දැනගන්න බැහැ. Server error form-level හෝ field-level message එකකට map කරන්න.']
],'validation.html',`<input id="email" formControlName="email" aria-describedby="email-error" § Error element එක සම්බන්ධ කරයි.
  [attr.aria-invalid]="form.controls.email.touched && form.controls.email.invalid"> § Invalid state එක දන්වයි.
@if (form.controls.email.touched && form.controls.email.invalid) { § Interaction පසු error පෙන්වයි.
  <p id="email-error" role="alert">Use an email such as amali@example.com.</p> § Correct format උදාහරණ දෙයි.
} § Conditional අවසන් කරයි.`,['Validity බලන්න','Touched/submit state බලන්න','Message දාන්න','Correct input පරීක්ෂා කරන්න'],'Frontend validation security boundary එකක් නොවේ; server නැවත validate කළ යුතුයි.',Q('required එක whitespace name reject කරනවාද?',['ඔව්','නැහැ; trimmed check අවශ්‍යයි','Email තිබුණොත්'],1,'Whitespace empty string එකක් නොවේ.')),
L('Create සහ edit එකම form එකෙන්','Selected record populate කර request mode තෝරන්න.',[
['Identity','editingId null නම් create; ID තිබේ නම් edit. Identity එක editable text values වලින් වෙන් කරන්න.'],
['Populate සහ cancel','patchValue existing values දමයි. Cancel දී editingId null කර form reset කරන්න. ID user text field එකක edit කිරීමට දෙන්න එපා.'],
['Requests','Create POST collection එකට; update PATCH record URL එකට. Canonical success response එක list එකට ගන්න. Actual backend contract එක තහවුරු කරන්න.']
],'edit-flow.ts',`const editingId = signal<number | null>(null); § Create mode එකයි.
function edit(student: Student) { § Selected record ගනී.
  editingId.set(student.id); § Identity වෙනම තබයි.
  form.patchValue({ name: student.name, email: student.email }); § Values populate කරයි.
} § Edit setup අවසන් කරයි.
function cancel() { editingId.set(null); form.reset(); } § Create mode යළි ලබාදෙයි.`,['Record තෝරන්න','ID තබන්න','Values populate කරන්න','Mode අනුව save කරන්න'],'Truthy check එකකට වඩා null comparison explicit කරන්න. ID validity data boundary එකේ බලන්න.',Q('Partial update සඳහා method?',['GET','PATCH','OPTIONS පමණක්'],1,'PATCH resource fields update කිරීමට යොදාගනී.'))]);
M('RxJS & async thinking','කාලයත් එක්ක එන data','https://angular.dev/guide/http/making-requests',[
L('Observable, subscribe සහ async pipe','Async results stream එකකින් consume කරන්න.',[
['Observable','Values කාලයත් එක්ක emit කරන stream එකක්. HttpClient cold observable subscribe කරන තුරු request නොයවයි. Double subscription requests දෙකක් යැවිය හැක.'],
['Handlers','next success values, error failures handle කරයි. HTTP response පසු සාමාන්‍යයෙන් complete වේ. Long-lived streams lifecycle cleanup අවශ්‍යයි.'],
['AsyncPipe','Template subscription සහ destroy වෙද්දී cleanup කරයි. එකම observable එකට repeated bindings නිසා අනවශ්‍ය requests නොයවන බව බලන්න.']
],'observable-demo.ts',`import { of, map } from 'rxjs'; § Stream creation සහ transform APIs ගනී.
const names$ = of(['Amali', 'Nimal']); § එක් array එක emit කර complete වේ.
const count$ = names$.pipe(map(names => names.length)); § Value එක count එකකට map කරයි.
count$.subscribe({ § Stream consume කරයි.
  next: count => console.log(count), § 2 පෙන්වයි.
  error: error => console.error(error), § Failure handler එකයි.
}); § Subscription අවසන් කරයි.`,['Source stream සාදන්න','Operators දාන්න','Consume කරන්න','Cleanup තීරණය කරන්න'],'Observable<Student[]> එක array එකක් ලෙස iterate කරන්න බැහැ. Emitted value consume කරන්න.',Q('HttpClient request dispatch වෙන්නේ?',['Declare කළ විට','Subscribe කළ විට','CSS load වූ විට'],1,'Cold observable subscribe කළ විට request යවයි.')),
L('Debounce, switchMap සහ cancellation','Latest search results පමණක් පෙන්වන්න.',[
['Debounce','debounceTime typing pause එකක් පසු value emit කරයි. distinctUntilChanged consecutive duplicate queries අඩු කරනවා.'],
['switchMap','අලුත් query එකකට කලින් inner subscription ඉවත් කර නව request එකට මාරු වෙනවා. HttpClient unsubscribe in-flight request abort කිරීමට උපකාරී වේ.'],
['Error boundary','Inner catchError එකෙන් search stream එක තවදුරටත් වැඩ කරන්න දෙන්න. Error එක UI එකට කියන්න. takeUntilDestroyed මඟින් lifecycle cleanup කරන්න.']
],'search-stream.ts',`search.valueChanges.pipe( § Query stream එකයි.
  debounceTime(300), § Typing pause බලයි.
  distinctUntilChanged(), § Duplicate queries ඉවත් කරයි.
  switchMap(q => api.search(q).pipe(catchError(() => of([] as Student[])))), § Latest request එකට මාරුවී inner failure recover කරයි.
  takeUntilDestroyed(destroyRef) § Component cleanup එක් කරයි.
).subscribe(rows => students.set(rows)); § Latest rows state එකට දෙයි.`,['Input stream ගන්න','Debounce කරන්න','Latest request තෝරන්න','Error සහ cleanup handle කරන්න'],'හැම failure එකම silently [] බවට මාරු කළොත් error සහ empty result වෙනස user ට නොතේරේ.',Q('Latest request සඳහා operator?',['switchMap','setInterval','push'],0,'switchMap කලින් inner subscription ඉවත් කර නව එක subscribe කරයි.'))]);
M('HTTP & CRUD','API request යවමු','https://angular.dev/guide/http/making-requests',[
L('HttpClient service සහ GET','Transport logic service එකක තබා response ගන්න.',[
['Setup','මේ project එකේ provideHttpClient() app configuration එකේ explicit ලෙස දානවා. Inject කළ HttpClient එකේ get/post/patch/delete methods භාවිතා කරන්න.'],
['Service','Component එක URLs concatenate කරනවා වෙනුවට list/create/update methods call කරන්න. Base URL configuration එකක තබන්න.'],
['JSON shape','get<Student[]>() compile-time expectation එකක්. Server {items:[]} wrapper එකක් දෙනවා නම් adapter එකක map කරන්න. Runtime JSON verification වෙනම අවශ්‍යයි.']
],'student-api.ts',`import { Injectable, inject } from '@angular/core'; § Service/DI APIs ගනී.
import { HttpClient } from '@angular/common/http'; § HTTP client ගනී.
import { Student } from './student'; § Response type ගනී.
@Injectable({ providedIn: 'root' }) § Root service register කරයි.
export class StudentApi { § Data service class එකයි.
  private http = inject(HttpClient); § Configured client resolve කරයි.
  list() { return this.http.get<Student[]>('/api/students'); } § Subscribe විට GET යවයි.
} § Relative path එක proxy/routing සමඟ configure කරන්න.`,['Contract එකඟ කරන්න','HTTP provider දාන්න','List method හදන්න','Response state එකට ගන්න'],'Generic type දාපු පමණින් actual JSON shape වෙනස් වෙන්නේ නැහැ.',Q('get<Student[]>() generic එක?',['Runtime validation','Compile-time type expectation','SQL create'],1,'Runtime JSON checking වෙනම කාර්යයක්.')),
L('POST, PATCH සහ DELETE','CRUD action එකට නිවැරදි request සහ UI update දෙන්න.',[
['Create/update','POST collection URL එකට payload යවයි. PATCH record URL එකට changes යවයි. Canonical success record එක list state එකට ගන්න.'],
['Delete','204 success body එකක් නැහැ. delete<void>() භාවිතා කර success පසු record ID එක local list එකෙන් ඉවත් කරන්න.'],
['Server confirmation','Request success වන තුරු complete කියන්න එපා. Optimistic update කරනවා නම් failure rollback අවශ්‍යයි. Capstone එක server-confirmed updates භාවිතා කරනවා.']
],'crud-methods.ts',`create(input: StudentInput) { § Create payload එක ගනී.
  return this.http.post<Student>('/api/students', input); § නව record සාදයි.
} § Create අවසන් කරයි.
update(id: number, input: StudentInput) { § Record ID සහ changes ගනී.
  return this.http.patch<Student>('/api/students/' + id, input); § Existing record update කරයි.
} § Update අවසන් කරයි.
remove(id: number) { return this.http.delete<void>('/api/students/' + id); } § Empty delete response එක handle කරයි.`,['Payload සාදන්න','Method/URL තෝරන්න','Success පසු update කරන්න','Failure feedback දෙන්න'],'GET request එකකින් data delete වැනි mutations නොකරන්න.',Q('204 response body?',['අනිවාර්ය JSON','Body නැහැ','HTML form'],1,'204 No Content success එකේ body එකක් නැහැ.'))]);
M('Errors & interceptors','Network failures handle කරමු','https://angular.dev/guide/http/interceptors',[
L('Loading, empty සහ error','UI state transitions පැහැදිලිව පෙන්වන්න.',[
['States','Request මුල loading true කර පරණ error clear කරන්න. Success rows set කරන්න; failure එක useful text පෙන්වන්න. Empty results failure එකකට සමාන නෙවෙයි.'],
['finalize','Success, error හෝ unsubscribe පසු callback run වෙනවා. Loading/saving flags reset කිරීමට useful. Error path එකේ පමණක් reset කළොත් success spinner දිගටම යයි.'],
['Status codes','422 validation, 401 authentication, 403 permission, 404 missing resource, 409 conflict ලෙස වෙන්කර බලන්න. Status 0 network/CORS වැනි හේතු කිහිපයකින් වෙන්න පුළුවන්.']
],'request-state.ts',`loading.set(true); § Pending state අරඹයි.
error.set(''); § පරණ error clear කරයි.
api.list().pipe(finalize(() => loading.set(false))).subscribe({ § Termination පසු pending reset කරයි.
  next: rows => students.set(rows), § Success data ලබාදෙයි.
  error: () => error.set('Could not load students. Please retry.'), § Action කළ හැකි feedback දෙයි.
}); § Request එක consume කරයි.`,['Loading අරඹන්න','Success/error handle කරන්න','Finalize cleanup කරන්න','Retry බලන්න'],'Raw server traceback හෝ tokens UI error message එකට දාන්න එපා.',Q('Success/error දෙකේම loading reset කිරීමට?',['finalize','filter පමණක්','interval'],0,'finalize termination/cleanup callback එකයි.')),
L('Functional interceptors','Common request behavior එක් boundary එකක තබන්න.',[
['Role','Auth headers, timing හෝ common transport behavior interceptor එකක ලියන්න. හැම service method එකේම code copy නොකරන්න.'],
['Immutable request','HttpRequest immutable. req.clone කර headers වෙනස් කරන්න. next(updated) chain එක ඉදිරියට යවනවා.'],
['Scope','Token තම API origin/path එකට පමණක් යවන්න. Third-party requests වලට credentials නොයවන්න. withInterceptors([...]) සමඟ register කරන්න.']
],'api-header.ts',`import { HttpInterceptorFn } from '@angular/common/http'; § Functional interceptor type එකයි.
export const apiHeader: HttpInterceptorFn = (req, next) => { § Request සහ next handler ගනී.
  if (!req.url.startsWith('/api/')) return next(req); § Scope එක සීමා කරයි.
  const updated = req.clone({ setHeaders: { 'X-App-Client': 'student-directory' } }); § Header සහිත copy එකක් සාදයි.
  return next(updated); § Chain එක ඉදිරියට යවයි.
}; § provideHttpClient(withInterceptors([apiHeader])) තුළ register කරන්න.`,['Concern තෝරන්න','URL scope බලන්න','Request clone කරන්න','next call කරන්න'],'POST blind retry කිරීම duplicate records හදන්න පුළුවන්. Safe retry/idempotency policy එකක් අවශ්‍යයි.',Q('Request වෙනස් කරන්නේ?',['req.headers = {}','req.clone(...)','CSS එකකින්'],1,'Clone මඟින් වෙනස්කම් සහිත අලුත් immutable request එකක් ලැබේ.'))]);
M('Connect to FastAPI','Frontend සහ backend එකට','https://fastapi.tiangolo.com/tutorial/cors/',[
L('Contract සහ field mapping','Existing backend එකට frontend model ගැළපෙන්න කරන්න.',[
['Contract','URL, method, auth, body, response සහ errors එකඟ විය යුතුයි. Backend /docs සහ DevTools Network actual requests සසඳන්න.'],
['Existing backend course','එහි User.full_name සහ email තිබෙනවා. Capstone එක name/email සහ /api/students භාවිතා කරන independent contract එකක්. මේ endpoints existing backend එකේ ස්වයංක්‍රීයව නැහැ.'],
['Adapter','Existing /users endpoints භාවිතා කරනවා නම් full_name → name mapping, admin authorization සහ create payload requirements බලන්න. Register password අවශ්‍ය නම් ඒ flow එකත් වෙනම ගැළපෙන්න ඕන.']
],'user-adapter.ts',`interface ApiUser { id: number; full_name: string; email: string; is_active: boolean; } § Backend public shape එකයි.
interface Student { id: number; name: string; email: string; } § Frontend shape එකයි.
const toStudent = (user: ApiUser): Student => ({ § Adapter function එකයි.
  id: user.id, § Identity සුරකියි.
  name: user.full_name, § Field rename කරයි.
  email: user.email, § Email copy කරයි.
}); § Password/hash public response එකේ නොතිබිය යුතුයි.`,['API docs බලන්න','Model differences ලියන්න','Adapter සාදන්න','Authorized request බලන්න'],'/api/students නම /users ලෙස මාරු කළ පමණින් integration සම්පූර්ණ නැහැ.',Q('full_name → name mapping තබන්නේ?',['Data adapter එකක','Browser database password එකේ','CSS එකේ'],0,'Adapter එකෙන් contract වෙනස්කම් එක් boundary එකක handle වෙනවා.')),
L('CORS, proxy සහ environments','Different origins නිවැරදිව connect කරන්න.',[
['Origins','Scheme, host සහ port එකතුව origin එකයි. localhost:4200 සහ localhost:8000 වෙනස් origins. Browser server CORS headers බලනවා.'],
['Dev proxy','Relative /api path එක dev server එකෙන් backend එකට proxy කරන්න පුළුවන්. මෙය development-only. Production routing වෙනම සකස් කළ යුතුයි.'],
['FastAPI CORS','Direct cross-origin සඳහා CORSMiddleware තුළ explicit allowed origin එක දෙන්න. Cookie credentials නම් allow_credentials සහ CSRF strategy අවශ්‍යයි. Frontend environment files secrets සඳහා නොවේ.']
],'FastAPI · main.py addition',`from fastapi.middleware.cors import CORSMiddleware § CORS middleware ගනී.
app.add_middleware( § Existing app එකට එක් කරයි.
    CORSMiddleware, § Middleware class එකයි.
    allow_origins=["http://localhost:4200"], § Frontend origin එක allow කරයි.
    allow_methods=["GET", "POST", "PATCH", "DELETE"], § Contract methods allow කරයි.
    allow_headers=["Authorization", "Content-Type"], § Required headers allow කරයි.
) § Cookie-based auth සඳහා වෙනම configuration අවශ්‍යයි.`,['Origins බලන්න','Proxy/CORS තෝරන්න','Preflight බලන්න','Production origin configure කරන්න'],'no-cors දාලා CORS හදන්න බැහැ. Server headers සහ preflight evidence බලන්න.',Q('CORS headers configure කරන්නේ?',['Server/proxy','CSS','TypeScript interface'],0,'Browser එක server response headers මත අවසර තීරණය කරනවා.'))]);
M('Authentication & guards','Login සහ permissions','https://angular.dev/guide/routing/route-guards',[
L('Login flow සහ tokens','Credentials සිට protected request දක්වා flow පැහැදිලි කරන්න.',[
['Login format','Backend JSON login නම් JSON email/password යවන්න. OAuth2 form endpoint නම් form encoding අවශ්‍යයි. Actual schema /docs එකෙන් බලන්න.'],
['Bearer token','Authorization header එකේ token යවයි. Decode කිරීම signature verification එකක් නොවේ. Backend signature, expiry සහ permissions validate කළ යුතුයි.'],
['Storage choices','Short-lived memory token flow එක සහ persistent storage වෙනස්. localStorage token XSS මඟින් කියවිය හැක. HttpOnly cookie architecture එකකට credential/CSRF design අවශ්‍යයි.']
],'login-flow.txt',`POST /auth/login § Actual route/schema backend docs තුළ බලන්න.
Body: { "email": "admin@example.com", "password": "…" } § Credentials HTTPS හරහා backend එකට පමණක් යවන්න.
Response: { "access_token": "…", "token_type": "bearer" } § Backend token proof එක ලබාදෙයි.
Authorization: Bearer <access_token> § තම API එකට පමණක් යවන්න.
401 -> clear expired session and show login § Authentication failure එක handle කරන්න.
403 -> show permission message § Login ඇති නමුත් අවසර නැති case එකයි.`,['Contract බලන්න','Login යවන්න','Protected header දාන්න','Logout/expiry clear කරන්න'],'Password/token progress, logs හෝ repo එකට save කරන්න එපා.',Q('Decode කළ token එක signature verified ද?',['ඔව්','නැහැ','දිග නම් ඔව්'],1,'Cryptographic verification trusted backend එකෙන් කළ යුතුයි.')),
L('Functional route guard','UX redirect එක සහ server authorization වෙන්කරන්න.',[
['Guard limit','Guard frontend navigation decision එකක්. Browser code bypass කළ හැකි නිසා backend හැම protected request එකම authorize කළ යුතුයි.'],
['Return result','CanActivateFn true හෝ redirect UrlTree return කළ හැක. Imperative navigate කර false return කරනවාට වඩා UrlTree return කරන්න.'],
['Return URL','Login පසු internal requested screen එකට ආපසු යන්න පුළුවන්. Untrusted external redirect URLs allow නොකරන්න.']
],'auth.guard.ts',`import { inject } from '@angular/core'; § DI function එකයි.
import { CanActivateFn, Router } from '@angular/router'; § Guard සහ router APIs ගනී.
import { AuthService } from './auth-service'; § ඔබ සාදන session service එකයි.
export const authGuard: CanActivateFn = () => { § Navigation decision එකයි.
  const auth = inject(AuthService); § Session state resolve කරයි.
  const router = inject(Router); § Router instance ගනී.
  return auth.isLoggedIn() ? true : router.createUrlTree(['/login']); § Redirect result return කරයි.
}; § Route එකේ canActivate: [authGuard] යොදන්න.`,['Session service තබන්න','Guard state බලන්න','UrlTree return කරන්න','Backend permissions බලන්න'],'Guard එක නිසා admin API එක public කරන්න එපා. Auth guard lesson snippet එක capstone login implementation එකක් නොවේ.',Q('Guard backend authorization වෙනුවට ප්‍රමාණවත්ද?',['ඔව්','නැහැ','Button hide කළොත්'],1,'Server-side authorization අවශ්‍යයි.'))]);
M('State & performance','UI state ස්ථාවරව තබමු','https://angular.dev/best-practices/skipping-subtrees',[
L('Single source of truth','Records සහ query වලින් visible list derive කරන්න.',[
['Source','Full records එක array signal එකක තබන්න. Query වෙනම signal එකක. Save/delete එකකදී full collection update කළොත් visible list computed එක නැවත derive කරයි.'],
['Local/shared','Form edit state page එකේ තබන්න. Screens කිහිපයක අවශ්‍ය session/profile state service එකක තබන්න. හැම value එකම global store එකට දාන්න අවශ්‍ය නැහැ.'],
['Transitions','Loading → success/empty/error transitions පැහැදිලිව ලියන්න. Concurrent responses පරණ selection එකට update නොවන බව බලන්න.']
],'derived-state.ts',`const students = signal<Student[]>([]); § Single source collection එකයි.
const query = signal(''); § Search text එකයි.
const visible = computed(() => { § Derived list එකයි.
  const q = query().trim().toLowerCase(); § Query normalize කරයි.
  return students().filter(s => (s.name + ' ' + s.email).toLowerCase().includes(q)); § Matching rows ගනී.
}); § Computed අවසන් කරයි.
const count = computed(() => visible().length); § Count derive කරයි.`,['Source records තබන්න','Query වෙන් කරන්න','Visible list compute කරන්න','Source පමණක් update කරන්න'],'Writable filtered list වෙනම sync කිරීමෙන් stale state bugs ඇති විය හැක.',Q('Derived visible count සඳහා?',['computed','setInterval','Browser SQL trigger'],0,'Computed dependencies මත calculate වෙනවා.')),
L('OnPush සහ lazy loading','අවශ්‍ය UI work සහ bundle size මැන බලන්න.',[
['OnPush','OnPush component checks සීමා කරයි. Signals, events සහ input reference changes නිවැරදිව භාවිතා කරන්න. Nested mutation පමණක් මත රඳා නොසිටින්න.'],
['Lazy routes','loadComponent මඟින් මුල් screen එකට අවශ්‍ය නැති page code පසුව load කරන්න. Network tab එකෙන් bundle requests බලන්න.'],
['Measurement','Repeated API calls, large images සහ expensive template methods බලන්න. Optimization පසු කලින්/පසු load/performance evidence සසඳන්න.']
],'onpush.ts',`import { Component, ChangeDetectionStrategy, signal } from '@angular/core'; § Rendering APIs ගනී.
@Component({ selector: 'app-counter', standalone: true, § Counter metadata එකයි.
  changeDetection: ChangeDetectionStrategy.OnPush, § Checking strategy එකයි.
  template: '<button (click)="count.update(addOne)">{{ count() }}</button>' }) § Reactive UI එකයි.
export class Counter { count = signal(0); addOne = (n: number) => n + 1; } § Event update function එකයි.`,['Behavior verify කරන්න','Features lazy load කරන්න','Immutable state භාවිතා කරන්න','Performance measure කරන්න'],'OnPush දැම්ම පමණින් හැම bottleneck එකම හරියන්නේ නැහැ.',Q('Improvement තහවුරු කරන්නේ?',['අනුමානයෙන්','කලින්/පසු මිනුම්','Variable නම් කෙටි කරලා'],1,'Measurements actual bottleneck සහ improvement පෙන්වනවා.'))]);
M('Testing & debugging','හරිද කියලා බලමු','https://angular.dev/guide/testing',[
L('Component behavior tests','Meaningful user behavior verify කරන්න.',[
['Test target','Invalid form create නොකිරීම, success record list එකේ පෙනීම සහ delete පසු ඉවත් වීම meaningful cases. Private implementation copy කරන tests අඩු ප්‍රයෝජනවත්.'],
['TestBed','Standalone component TestBed තුළ import කර data service fake කරන්න. Fixture create කර detectChanges මඟින් initial rendering අරඹන්න.'],
['Runner','Angular 22 baseline CLI Vitest භාවිතා කරනවා. npx ng test --watch=false run කරන්න. HTTP service tests සඳහා HttpTestingController සමඟ network fake කරන්න.']
],'page.spec.ts',`import { TestBed } from '@angular/core/testing'; § Test environment එකයි.
import { describe, it, expect } from 'vitest'; § Runner APIs ගනී.
import { App } from './app'; § Test subject එකයි.
describe('App', () => { § Test group එකයි.
  it('creates', async () => { § Smoke case එකයි.
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents(); § Component compile කරයි.
    expect(TestBed.createComponent(App).componentInstance).toBeTruthy(); § Instance බලයි.
  }); § Case අවසන් කරයි.
}); § Project tab එකේ meaningful page tests බලන්න.`,['Behavior තෝරන්න','Service fake කරන්න','User event කරන්න','DOM result assert කරන්න'],'Smoke test එකක් pass වූ පමණින් CRUD tested කියන්න බැහැ. Invalid/error pathsද test කරන්න.',Q('Meaningful test case එක?',['Private method නම','Invalid form API call නොකිරීම','CSS lines ගණන'],1,'Invalid submit boundary එක user behavior එකක්.')),
L('Console සහ Network debugging','Evidence මඟින් හේතුව හඳුනාගන්න.',[
['Compile','Unknown component/pipe/form binding නම් imports සහ names බලන්න. පළමු compile error එක පසුව errors ගණනාවක හේතුව විය හැක.'],
['Network','URL, method, body, status සහ response බලන්න. CORS නම් preflight/Console බලන්න. 404 wrong endpoint ද missing record ද වෙන්කරන්න.'],
['Reproduce','අඩුම steps වලින් error සාදන්න. එක් correction එකක් කර same scenario නැවත බලන්න. Debug lab එකේ guided cases තියෙනවා.']
],'debug-checklist.txt',`Unknown element -> selector / imports § Standalone dependencies බලන්න.
Cannot bind formGroup -> ReactiveFormsModule § Form directive scope එක බලන්න.
404 -> URL / method / record ID § Contract සහ identity සසඳන්න.
401 / 403 -> authentication / permissions § Identity සහ authorization වෙන් කරන්න.
Status 0 -> network / CORS / availability § Evidence නැතිව එකම හේතුවක් තීරණය නොකරන්න.
Spinner stuck -> finalize / lifecycle § Request cleanup බලන්න.`,['Exact error කියවන්න','Evidence ගන්න','Layer එකේ fix කරන්න','Scenario නැවත බලන්න'],'Console error hide කිරීම bug fix කිරීමක් නොවේ.',Q('404 එකකදී මුලින්?',['Request URL/method/response','Border radius','Font size'],0,'Network evidence route සහ resource failures වෙන්කරයි.'))]);
M('Capstone project','Student Directory එක සම්පූර්ණ කරමු','https://angular.dev/guide/components',[
L('Project files එකට සම්බන්ධ කරමු','Download source එකෙන් runnable mock CRUD app හදන්න.',[
['Scaffold','Project tab exact CLI command එකෙන් clean Angular 22 project හදන්න. Download කළ files relative paths අනුව copy/replace කරන්න.'],
['Mock mode','useMock true විට delayed RxJS observables සමඟ in-memory CRUD කරයි. Real HTTP/database නැහැ. Reload කළොත් sample data නැවත එයි.'],
['Journey','List, search, create, edit, cancel සහ confirmed delete පරීක්ෂා කරන්න. Invalid email, whitespace name සහ duplicate email failures බලන්න.']
],'capstone-run.txt',`npx @angular/cli@22 new student-directory --routing --style=css --standalone --ssr=false --defaults § Clean Angular 22 scaffold සාදයි.
cd student-directory § Root එකට යයි.
# Copy project source files to the listed paths § Project tab instructions අනුව files replace කරන්න.
npm start § Mock app run කරන්න.
npx ng test --watch=false § Included behavior tests run කරන්න.
npm run build § Production compile කරන්න.`,['Source ගන්න','Paths අනුව copy කරන්න','CRUD journey කරන්න','Tests/build run කරන්න'],'Nested src/app/src/app folder අත්වැරදීමෙන් හදන්න එපා.',Q('Default project data source?',['Live PostgreSQL','In-memory mock','Public admin API'],1,'Mock mode backend නැතිව UI workflow run කිරීමටයි.')),
L('Mock සිට API mode එකට','Agreed backend contract implement කර connect කරන්න.',[
['Contract first','API-CONTRACT.md තුළ /api/students list/create/update/delete schema තියෙනවා. Server එකේ ඒ endpoints implement කරන්න හෝ existing User API සඳහා adapter එකක් ලියන්න.'],
['Switch','environment.useMock false කර proxy target backend port එකට දෙන්න. npm start restart කර actual Network requests බලන්න. Endpoints නැත්නම් 404 එයි.'],
['Production','Dev proxy build output එකට යන්නේ නැහැ. Reverse proxy හෝ public base URL + CORS අවශ්‍යයි. Capstone mock CRUD එකට production authentication ඇතුළත් නැහැ; auth lessons වල flow වෙනම පෙන්වනවා.']
],'environment.ts',`export const environment = { § Public application config එකයි.
  useMock: false, § Real HttpClient mode enable කරයි.
  apiBase: '/api', § Dev/prod proxy resolve කළ යුතු prefix එකයි.
}; § Secrets මෙහි නොතබන්න.
// GET /api/students -> Student[] § Collection direct array එකයි.
// POST/PATCH -> Student § Canonical record response එකයි.
// DELETE /api/students/:id -> 204 § Body එකක් නැහැ.`,['Contract implement කරන්න','Flag false කරන්න','Proxy restart කරන්න','CRUD/error cases බලන්න'],'Existing FastAPI course එකේ මේ student endpoints දැනටමත් තියෙනවා කියලා හිතන්න එපා.',Q('Dev proxy production එකේ ස්වයංක්‍රීයව වැඩ කරනවාද?',['ඔව්','නැහැ','Mock true නම්'],1,'Production hosting routing වෙනම configure කළ යුතුයි.'))]);
M('Build, deploy & revise','Publish කිරීමට පෙර','https://angular.dev/tools/cli/deployment',[
L('Production build සහ hosting','Compiled browser files නිවැරදිව host කරන්න.',[
['Build','npm run build optimized output සාදනවා. Actual output path angular.json සහ build log එකෙන් බලන්න. මේ scaffold එකේ සාමාන්‍යයෙන් dist/student-directory/browser.'],
['Routing','Direct app route refresh එක index.html fallback වෙත යවන්න. /api backend වෙත route කරන්න. Missing JS asset requests වැරදිව HTML fallback වෙත නොයවන බව බලන්න.'],
['Release','HTTPS, mobile/keyboard, API errors, empty states සහ no exposed secrets පරීක්ෂා කරන්න. මේ course deployment පියවර විස්තර කරනවා; ඔබ වෙනුවෙන් publish කරන්නේ නැහැ.']
],'release-checklist.txt',`npx ng test --watch=false § Behavior checks run කරන්න.
npm run build § Production bundle සාදන්න.
# Inspect dist/student-directory/browser § Actual browser output path තහවුරු කරන්න.
# App routes -> index.html fallback § SPA deep links වැඩ කළ යුතුයි.
# /api -> backend proxy § Production API routing දාන්න.
# Check /students refresh, CRUD and mobile § Hosted journey verify කරන්න.`,['Tests/build කරන්න','Output path ගන්න','Host routing දාන්න','Hosted smoke checks කරන්න'],'src source folder එක static host එකට දැමීමෙන් Angular compile වෙන්නේ නැහැ.',Q('Direct route refresh 404 නම්?',['SPA fallback configure කරන්න','Database password මාරු කරන්න','තවත් CSS එකක් දාන්න'],0,'Unknown app paths Angular entry point වෙත යා යුතුයි.')),
L('සම්පූර්ණ flow එක කියමු','User action එකෙන් screen update දක්වා ඔබේ වචනවලින් පැහැදිලි කරන්න.',[
['Input සිට service','Typing FormControl values update කරනවා. Submit validation/normalization පසු typed payload එක service එකට දෙයි. Service mock හෝ HTTP path එක තෝරයි.'],
['Response සිට screen','Success record source signal එකට යයි. Computed visible list නැවත derive වෙයි. @for stable IDs මඟින් render කරයි. Failure දී values සහ retry feedback තබන්න.'],
['ඊළඟ feature','Pagination, detail route සහ auth වැනි features එක බැගින් එක් කරන්න. Acceptance cases ලියා tests දෙන්න. Viva tab එකෙන් explanation practice කරන්න.']
],'full-flow.txt',`Input -> FormControl § Values/status update වේ.
ngSubmit -> validate and normalize § Invalid request නවත්වයි.
StudentApi -> mock or HTTP § Transport boundary එකයි.
Backend -> validate, authorize, persist § Trusted rules enforce කරයි.
Response -> source signal § Canonical record update වේ.
computed -> @for -> DOM § Derived list screen එකට එයි.
finalize -> clear saving -> feedback § Pending state අවසන් වෙයි.`,['Flow එක අඳින්න','Input/output කියන්න','Failure branch විස්තර කරන්න','අලුත් feature plan කරන්න'],'Definition මතක තබාගැනීම වෙනුවට boundary එක මෙතැන ඇයි කියලා උදාහරණයකින් කියන්න.',Q('Success පසු UI update වන්නේ?',['CSS reload එකෙන්','Source state → computed → template මඟින්','Browser restart කරලා'],1,'Reactive state update එකෙන් derived data සහ UI නැවත කියවනවා.'))]);
const LESSONS=MODULES.flatMap(m=>m.lessons);
