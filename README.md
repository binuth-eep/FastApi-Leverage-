# Code Academy · සිංහලෙන් ඉගෙන ගනිමු

## Build Lab · start here for an ordered project journey

Open **[projects.html](projects.html)** and choose **POS → 01 · මෙතැනින් පටන් ගන්න**. Three new Sinhala project courses each have **28 ordered milestones**: **Pocket POS**, **Little Shop e-commerce**, and **Flow ERP**. Start with requirements, tools, Git, HTML/CSS and JavaScript from zero; continue through TypeScript, Angular, backend language fundamentals, APIs, relational data, migrations, business transactions, integration, permissions, tests, Docker, GitHub CI and a release/recovery runbook.

Every milestone includes prerequisites, explained code, a play/pause/speed-controlled code replay, practical steps, expected output, troubleshooting and a checked question. Completion requires a passed question and a self-reported practical check. Four original SVG blueprints explain architecture, relationships, request flow and deployment; diagrams download as SVGs. The live UI studio lets learners change spacing/radius/colors, compare phone layouts, inspect generated CSS, and try explicit in-memory cart/stock simulations. Code replay explains source text; it does not execute the displayed language or provide recorded video.

**Source & downloads** contains complete ZIPs with Angular frontends, real FastAPI or Spring Boot backends, database migrations, API contracts, dependency locks, transaction/permission tests, Compose configurations, CI workflows and Sinhala workbooks. POS/shop use SQLite and SQLAlchemy; ERP uses Spring JDBC, Flyway and file-backed H2 with an optional PostgreSQL profile. Extract one ZIP and follow its included README, starting with `.env.example`. The local projects implement real persistence and authorization; the browser studio is a separate simulation. These are learning capstones. The release checklist identifies the production identity, HTTPS, idempotency, target-database testing, backups, monitoring and recovery work still required.

All four original courses also include a visible project-path entry and guided replay for their annotated code/commands. Existing course IDs and progress keys are preserved. New project progress uses `build-lab-si-v1`, validates stored data and falls back to session state when browser storage is unavailable. Release checkmarks are self-reported review notes, separately from lesson completion. The catalog now includes all seven courses and a **Project courses** filter.

Maintained source templates and regeneration instructions: [examples/build-lab/README.md](examples/build-lab/README.md). Regenerate after edits:

```bash
node scripts/export-build-workbooks.cjs
python3 scripts/bundle-build-projects.py
```

Browser verification (use your installed Playwright and Chromium paths):

```bash
PLAYWRIGHT_MODULE=/path/to/playwright BROWSER_PATH=/path/to/chromium node checks/build-lab-browser.cjs
```

The browser suite opens local files directly and covers all 84 milestones, prerequisite navigation, explanation replay, quizzes/practical completion, saved progress, source downloads, SVG blueprints, studio conflicts and state changes, mobile navigation, 320–1440px layouts, all four reference-course replay integrations, and malformed/blocked storage. Backend tests and actual Angular builds are separate from this browser simulation verification.

Open **`index.html`** directly in a modern browser. No installation, build step, internet connection, Python server, or database is required.

The course catalog links to **FastAPI & Python**, **Angular**, **Git & GitHub**, and **Java & Spring Boot**, with separate saved progress and Frontend, Backend, and Developer tools filters.

## Java & Spring Boot Academy

Open [`spring-boot.html`](spring-boot.html) directly, keeping `assets/` beside it. The offline Sinhala course includes **24 modules / 48 lessons**, 48 checked questions, annotated code, six learning stages, 40 glossary terms and 24 viva questions. It starts with Java types, methods, OOP, interfaces, collections, exceptions and records, then covers Maven, Spring DI, REST, DTOs, Jakarta Validation, JPA, transactions, CRUD, errors, relationships, security concepts, testing and deployment.

The 12-step setup guide supports PowerShell, CMD and macOS/Linux. The code explorer explains individual lines; the data-flow tool follows a request through trusted boundaries. Six browser labs cover Java integer division/String equality, fake dependency injection, a bounded REST CRUD model, transaction commit/rollback, illustrative authentication/permission/CSRF decisions and debugging. These JavaScript models never execute Java, SQL or real HTTP requests. Their validation and security rules illustrate a subset of the framework behavior; the complete downloadable project runs separately.

**Project → Download project ZIP** exports a 20-file Student API using **Java 17 / Spring Boot 4.1.2**, Spring MVC, Jakarta Validation, JPA, H2, a PostgreSQL profile, explicit error contracts and integration tests. Source is in [`examples/spring-student-api`](examples/spring-student-api/README.md). Install a supported JDK and Maven 3.6.3+, then run `mvn test`, `mvn package` and `mvn spring-boot:run` in its root. First dependency resolution needs internet. The sample binds to 127.0.0.1:8080 and uses an initially empty memory database that resets when the app stops.

Its student schema and direct-array list response match the Angular course project. The README explains changing the Angular proxy target to port 8080 and disabling mock mode. Spring validation returns **400**, so clients should adapt field feedback rather than assuming the FastAPI course's 422 response. The example is for local CRUD learning; authentication is explained separately and is not implemented in the sample. The optional PostgreSQL profile requires an existing database and reviewed migrations and is not covered by the H2 tests.

Progress, quiz attempts, setup reviews and theme use `spring-academy-si-v1`, independently from the other courses. The catalog displays Spring completion. Mobile navigation supports keyboard focus and Escape; reset asks for confirmation. Unavailable storage falls back to the current session.

After changing API source, regenerate the offline download with:

```bash
node scripts/bundle-spring-project.cjs
```

Verification commands:

```bash
node tests/spring-models.cjs
PLAYWRIGHT_MODULE=/path/to/node_modules/playwright node tests/spring-browser.cjs
cd examples/spring-student-api
mvn test
mvn package
```

After packaging, run `node tests/spring-http.cjs` from the repository root; set `SPRING_JAR` to use another built JAR. It starts and stops a temporary local server. Set `BROWSER_PATH` for custom Chromium and `SCREENSHOT_DIR` for browser screenshots.

Verified: all **21 Spring browser regression groups** and the existing **18 Git regression groups** passed after catalog integration, with no page errors or external requests. All 48 lesson answers, 36 shell/setup combinations, labs, ZIP contents/CRC checksums, saved-state recovery and layouts at 320–1440px were exercised. Six complete Java examples and seven foundation fragment groups compiled on Java 17; Hello ran. All **12 real Spring MockMvc/JPA integration tests** passed, the executable JAR built, and real HTTP health/list/create/update/duplicate/validation/delete/missing-record checks passed. PostgreSQL migrations and production authentication were not exercised.

References: [Spring requirements](https://docs.spring.io/spring-boot/system-requirements.html), [Java tutorials](https://dev.java/learn/), [JPA transactions](https://docs.spring.io/spring-data/jpa/reference/jpa/transactions.html), [Spring testing](https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html), and [CSRF protection](https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html).

## Git Academy

Open [`git.html`](git.html) directly, keeping `assets/` beside it. The offline Sinhala course includes **20 modules / 40 lessons**, 40 checked questions, annotated commands, six learning stages, 36 glossary terms and 20 viva questions. It covers setup, repositories, staging, commits, diffs, ignore rules, branches, merging, conflicts, remotes, authentication, GitHub pull requests/forks, undo, stash, rebase, cherry-pick, tags, recovery and team habits.

The 11-step setup guide supports macOS/Linux/Git Bash, PowerShell and CMD. Lessons explain each command's purpose, prerequisites, workflow and common mistakes. The command explorer and searchable 22-command cheatsheet provide revision, copying and an offline Markdown download.

**Git practice labs** include a virtual working tree/index/HEAD editor and command simulator; before/after branch graphs for fast-forward, merge and rebase; an editable conflict-resolution exercise; nine fetch/pull/push scenarios; and four undo decisions. Labs use memory only and reset on reload. The command model accepts a small documented subset and displays simplified diffs; it never runs a shell, accesses your repository, sends requests or authenticates to GitHub. Conflict checks verify markers and this exercise's heading requirement, not semantic correctness.

**Final challenge → Download practice workbook** supplies a complete local repository exercise: initial commit, feature branch, fast-forward merge, an intentional conflict, resolution and an annotated release tag. Hosted publication steps are optional and use placeholder URLs for the learner to replace. Its eight saved checklist milestones are self-reported. Actual terminal exercises need Git 2.28+; reading the course and using labs need only a browser.

Lesson completion, passed questions, attempts, setup reviews, challenge milestones and theme use the separate `git-academy-si-v1` browser storage key. Git progress also appears in the catalog. Reset requires confirmation and leaves the other courses' storage intact. Unavailable storage falls back to the current session.

Run the Git checks with:

```bash
node tests/git-sandbox.cjs
PLAYWRIGHT_MODULE=/path/to/node_modules/playwright node tests/git-browser.cjs
```

The first check uses a fresh temporary repository and compares staging, committing after further edits, unstaging and restoring with real Git. It also executes the branch/conflict/merge/tag workbook journey. All **18 browser regression groups** passed, including all 40 lesson answers, setup under all three shells, interactive labs, downloads, independent course progress, keyboard navigation, malformed/blocked storage and every page at widths 320–1440. No browser errors or external requests occurred. Set `BROWSER_PATH` for custom Chromium and `SCREENSHOT_DIR` to save screenshots.

References are linked from each module and include the official [Git tutorial](https://git-scm.com/docs/gittutorial), [restore](https://git-scm.com/docs/git-restore), [merge](https://git-scm.com/docs/git-merge), [rebase](https://git-scm.com/docs/git-rebase), and [GitHub authentication](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github) documentation.

## Angular Academy

Open [`angular.html`](angular.html) directly, keeping the `assets/` folder beside it. The offline Sinhala course includes **24 modules / 48 lessons**, 48 checked practice questions, line-by-line code explanations, interactive data flows, 38 glossary terms and 24 viva questions. A 12-step setup guide supports Windows PowerShell, Windows CMD and macOS/Linux. Frontend labs cover signals/binding, form validation, mock CRUD, routing, HTTP/auth outcomes and debugging. Setup commands and lab responses are educational simulations; snippets do not execute TypeScript or call a backend.

The responsive dashboard includes stage filters, lesson search, a keyboard-accessible mobile drawer, light/dark themes and browser-saved lesson, quiz and setup progress. Reset requires confirmation. If storage is unavailable, the course keeps working for the current session. Angular progress appears in the catalog independently from the backend course.

**Project → Download project ZIP** exports a complete Student Directory Angular app with reactive forms, signals, lazy routing, delayed mock CRUD, API mode, behavior tests, a dependency lock file and an explicit FastAPI API contract. Source is also in [`examples/student-directory`](examples/student-directory/README.md). Run `npm ci`, `npm start`, `npm test` and `npm run build` there; this real app needs supported Node/npm and internet for dependency installation. See its README before switching to API mode. Authentication is covered in the lessons and is not implemented in the capstone.

After changing example files, regenerate the offline download with:

```bash
node scripts/bundle-angular-project.cjs
```

The browser regression suite checks all 48 lesson examples and solutions, setup steps in all three shells, CRUD, project ZIP contents/CRC checksums, saved-state recovery, mobile keyboard navigation, catalog integration and every page at widths from 320 to 1440 pixels:

```bash
PLAYWRIGHT_MODULE=/path/to/node_modules/playwright node tests/angular-browser.cjs
```

Set `BROWSER_PATH` for a custom Chromium executable and `SCREENSHOT_DIR` for screenshots. Angular dependencies and examples follow the official [version compatibility table](https://angular.dev/reference/versions) and [testing documentation](https://angular.dev/guide/testing).

Verified: all 20 browser regression groups passed without page errors or external requests; the downloaded project matches the example source, including its dependency lock file. A clean `npm ci`, all 11 Angular tests and the production build passed. The built app was also checked in Chromium for direct `/students` navigation, create/edit/confirmed delete and responsive layouts. Real-backend integration still requires your implementation of the documented API contract.

## Backend Academy

The self-contained backend course includes 25 modules / 50 Sinhala lessons, 58 checked exercises, 66 glossary terms, 27 viva questions, annotated Python examples, and interactive architecture diagrams. Its colorful lavender, mint, coral, and amber dashboard includes original generated 3D illustrations, responsive layouts, and a dark theme. Both illustrations are embedded in the HTML, so copying just `index.html` still works offline. Reusable WebP assets and the exact image-generation prompts are in [`assets/generation-notes.md`](assets/generation-notes.md).

The home dashboard groups the existing curriculum into five stages: **Start from zero → Python foundations → APIs & data → Connect & secure → Build & revise**. Select a stage to filter its modules, or use **Show all** to return to the full curriculum, including optional Docker. Every lesson has four navigation steps: **Understand → Read the code → Follow the flow → Try it yourself**. Completing a lesson shows the next step; the dashboard recommends the next unfinished core lesson while preserving existing saved progress.

Begin with **Start here** for six new lessons covering terminal basics, project creation, virtual environments, requirements maintenance, and optional Docker. The guided terminal lab explains 40 steps with separate Windows PowerShell, Windows CMD, and macOS/Linux commands; it shows the working folder, command tokens, expected output, and common fixes.

Use **Learn** for lessons, **Code explorer** for line-by-line explanations, **Data flow** for architecture and data transformations, and **Backend labs** for simulated HTTP, CRUD, transactions, validation, login, debugging, and code building. **Practice**, **Glossary**, **Viva**, and **My progress** provide revision tools.

## Progress

Mark a lesson complete using its completion button. Overall completion is based on 48 core lessons; the two optional Docker lessons do not block 100% core completion. Existing lesson IDs and saved progress are preserved. Passed exercises, attempts, theme, and the last opened lesson are saved in this browser's `localStorage`. If browser storage is unavailable, the course still works for the current session. Resetting progress asks for confirmation. Moving the file or switching browsers can change the available saved progress.

## Educational simulations

All Python files exist as educational text inside the HTML. JavaScript implements predefined demonstrations; it does not execute Python, SQL, pytest, real password hashing, or JWT cryptography. Database changes and demo tokens exist only in memory and reset on reload. Input passwords and tokens are not stored in learning progress.

The validation demo covers a small strict subset of `UserCreate`; it is not a replacement for Pydantic's complete parser. The HTTP lab assumes authentication and authorization have succeeded. Use the login lab to explore missing, invalid, expired, and unauthorized requests.

The examples follow synchronous FastAPI, SQLAlchemy 2.x, and Pydantic v2 patterns. Services own write commits/rollbacks; repositories flush; dependencies close Sessions. The full user directory example requires a trusted admin role. Production concerns omitted from the teaching snippets are identified in the course.

Technical references: [FastAPI](https://fastapi.tiangolo.com/tutorial/), [password hashing and JWT](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/), [SQLAlchemy Sessions](https://docs.sqlalchemy.org/en/20/orm/session_basics.html), [Pydantic Models](https://docs.pydantic.dev/latest/concepts/models/).

## Verification

Verified by opening the file directly in Chromium: all 50 lessons and 58 exercise solutions, code navigation, animation controls, CRUD, transactions, validation, authentication scenarios, glossary/viva controls, progress persistence/reset, and unavailable or malformed browser storage. The 20 regression groups and 11 new setup groups passed. All 40 guided setup steps were exercised under all three shell variants (120 simulated steps), including copy, prerequisites, reset, preserved legacy progress, and optional Docker completion. Responsive layouts were checked at 320, 390, 768, 1024, and 1440 pixels. All 26 displayed Python examples pass syntax parsing. Commands, Docker configurations, and Python examples were not executed as a real project or backend.

The colorful UI also has a browser regression check in [`tests/ui-browser.cjs`](tests/ui-browser.cjs) covering stage filters, keyboard navigation, lesson section focus, completion recommendations, theme persistence, embedded image loading, and opening a copied HTML file without the assets folder. Run it with an installed Playwright package:

```bash
PLAYWRIGHT_MODULE=/path/to/node_modules/playwright node tests/ui-browser.cjs
```

Set `BROWSER_PATH` if using a custom Chromium executable, and `SCREENSHOT_DIR` to save desktop, mobile, dark-theme, and lesson screenshots.
