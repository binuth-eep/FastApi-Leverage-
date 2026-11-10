#!/usr/bin/env python3
"""Assemble complete, deterministic course downloads from reviewed local templates."""
import json
from pathlib import Path
import zipfile

ROOT = Path(__file__).resolve().parents[1]
TEMPLATES = ROOT / "examples/build-lab"
DOWNLOADS = ROOT / "assets/downloads"
PROJECTS = {
    "pos": ("pocket-pos", "Pocket POS", "Complete sale"),
    "shop": ("little-shop", "Little Shop", "Place order"),
    "erp": ("flow-erp", "Flow ERP", "Create purchase request"),
}
EXCLUDE = {"node_modules", "dist", "target", "data", "__pycache__", ".pytest_cache", ".angular", ".venv"}


def template_files(folder, prefix):
    result = {}
    for file in sorted(folder.rglob("*")):
        relative = file.relative_to(folder)
        if not file.is_file() or set(relative.parts) & EXCLUDE or file.name == ".env" or file.suffix in {".db", ".pyc"}:
            continue
        result[f"{prefix}/{relative.as_posix()}"] = file.read_text(encoding="utf-8")
    return result


def environment(kind):
    second = "STAFF" if kind == "erp" else "CASHIER"
    user = "staff" if kind == "erp" else "customer" if kind == "shop" else "cashier"
    return f"""# Local learning credentials. Copy to .env and replace both passwords.
# Use ASCII values with no spaces, quotes, #, $ or : for this local Basic-auth example.
MANAGER_USERNAME=manager
MANAGER_PASSWORD=change-this-manager-password
{second}_USERNAME={user}
{second}_PASSWORD=change-this-{user}-password
PROJECT_KIND={kind}
"""


def compose(kind):
    second = "STAFF" if kind == "erp" else "CASHIER"
    return f"""# Local-only stack. Review the release runbook before exposing a real service.
services:
  frontend:
    build: ./frontend
    ports:
      - "127.0.0.1:8088:80"
    depends_on:
      api:
        condition: service_healthy
    restart: unless-stopped
  api:
    build: ./backend
    environment:
      MANAGER_USERNAME: ${{MANAGER_USERNAME:?Set MANAGER_USERNAME in .env}}
      MANAGER_PASSWORD: ${{MANAGER_PASSWORD:?Set MANAGER_PASSWORD in .env}}
      {second}_USERNAME: ${{{second}_USERNAME:?Set {second}_USERNAME in .env}}
      {second}_PASSWORD: ${{{second}_PASSWORD:?Set {second}_PASSWORD in .env}}
      PROJECT_KIND: {kind}
    volumes:
      - app-data:/data
    healthcheck:
      test: {('["CMD", "curl", "-fsS", "http://127.0.0.1:8000/api/ready"]' if kind == 'erp' else '["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen(\'http://127.0.0.1:8000/api/ready\')"]')}
      interval: 10s
      timeout: 5s
      retries: 12
      start_period: 30s
    restart: unless-stopped
volumes:
  app-data:
"""


def ci(kind):
    backend = """      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '17'
          cache: maven
          cache-dependency-path: backend/pom.xml
      - run: mvn -B -f backend/pom.xml verify
""" if kind == "erp" else """      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: python -m pip install -r backend/requirements.lock.txt
      - run: python -m pytest -q
        working-directory: backend
"""
    return """name: Verify project
on: [push, pull_request]
permissions:
  contents: read
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
          cache: npm
          cache-dependency-path: frontend/package-lock.json
      - run: npm ci
        working-directory: frontend
      - run: npm run build
        working-directory: frontend
""" + backend + """      - run: docker build -t build-lab-api:ci ./backend
      - run: docker build -t build-lab-frontend:ci ./frontend
# This verifies artifacts. Configure registry publication and hosting separately.
"""


def readme(kind, folder, title):
    erp = kind == "erp"
    windows = """```powershell
py -m venv .venv
.\\.venv\\Scripts\\python.exe -m pip install -r requirements.lock.txt
.\\.venv\\Scripts\\python.exe -m pytest -q
.\\.venv\\Scripts\\python.exe -m uvicorn app.main:app --reload --port 8000
```"""
    backend = """Install **JDK 17+** and **Maven 3.6.3+**. Check `java -version` and `mvn --version`. In terminal 1, from `backend/`:

```bash
mvn test
mvn spring-boot:run
```

The application reads the project-root `.env` as properties. Default backend URL: http://127.0.0.1:8080. Local database: `backend/data/flow-erp.mv.db`. Keep that directory. The API uses Spring JDBC with explicit SQL and `@Transactional`, rather than JPA. Flyway applies V1/V2 migrations automatically. An optional `postgres` profile reads DATABASE_URL (JDBC URL), DATABASE_USERNAME and DATABASE_PASSWORD; provision the database separately and run the same invariants against it before release.
""" if erp else """Install **Python 3.12+**. In terminal 1, from `backend/`:

macOS/Linux:

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.lock.txt
.venv/bin/python -m pytest -q
.venv/bin/python -m uvicorn app.main:app --reload --port 8000
```

Windows PowerShell or CMD (activation is not required):

""" + windows + """

API: http://127.0.0.1:8000/api/health. Interactive API docs: http://127.0.0.1:8000/docs. The API reads project-root `.env` automatically. Local data is `backend/build-lab.db`; keep the file to preserve records. The reference migration SQL is SQLite-specific. Do not point it at PostgreSQL without reviewing/porting migrations and concurrency tests.
"""
    return f"""# {title} — complete local learning project

Angular 22 + {'Java 17 / Spring Boot 4.1.2 / Spring JDBC / Flyway' if erp else 'Python / FastAPI / SQLAlchemy / SQLite'}.

Start with **projects.html → {kind} → Step 01** in the academy. The Sinhala workbook is `docs/COURSE-WORKBOOK.md`. The final implementation is a reference: use the numbered lessons to build your own copy in a separate practice folder.

## 1. Extract and configure

Extract the ZIP while keeping `frontend/`, `backend/`, `compose.yaml` and `.env.example` together. In VS Code use File → Open Folder on `{folder}/`.

Copy `.env.example` to `.env` in that root and replace **both** passwords with different, long ASCII values (12+ characters). Use simple values without spaces, quotes, `#`, `$` or `:` for this Basic-auth learning example.

- macOS/Linux terminal: `cp .env.example .env`
- Windows PowerShell: `Copy-Item .env.example .env`
- Windows CMD: `copy .env.example .env`

The `.env` is ignored by Git and Docker builds. These are local environment accounts, not a registration or production identity system. Manager operations are enforced by the API. Catalog reads are public. Credentials stay in tab memory and are sent using Basic auth; HTTPS is required for remote traffic.

## 2. Easiest full-stack run: Docker

Install Docker Desktop (Windows/macOS) or Docker Engine + Compose (Linux), and start it. From the project root:

```bash
docker compose config --quiet
docker compose up --build -d
docker compose ps
```

Open **http://localhost:8088**. The frontend reverse-proxies `/api` to the backend, so no separate browser CORS setup is necessary. Enter the account values from your `.env`. First builds need internet and can take several minutes.

{'Create a purchase request as staff. Stock must stay unchanged. Enter manager credentials, Load history, Approve once. Stock increases once; repeated direct approval returns 409.' if erp else 'Add products, complete a transaction using the limited account, then enter manager credentials and Load history. Stock decreases and the saved receipt uses server prices.'}

{'For this shop, customer name and delivery address are required. This app records orders; real payment processing, delivery integrations and customer registration are extensions.' if kind == 'shop' else ''}

```bash
docker compose logs --tail=80 api
docker compose down
docker compose up -d
```

Records survive container recreation in the named `app-data` volume. `docker compose down -v` permanently removes that data; do not use it for routine stopping. Frontend port 8088 is bound to localhost for this local project. Use one course stack at a time or change its host port.

## 3. Native backend run (without Docker)

{backend}

Leave terminal 1 running. Stop with Ctrl+C.

## 4. Native Angular run

Install a compatible Node.js: **24.15.0+ in the 24.x line**, or another version in the Angular 22 official compatibility matrix. Check `node --version` and `npm --version`. In terminal 2, from `frontend/`:

```bash
npm ci
npm start
```

Open **http://localhost:4200**. The included proxy targets port {'8080' if erp else '8000'}. Restart `npm start` if you change the proxy. Edit `src/app/app.html` to see live UI updates. Credentials entered in the app are applied to subsequent requests; entering them alone does not verify the account.

```bash
npm run build
```

Build output: `frontend/dist/build-lab/browser/`. Never use the development server as your production server.

## 5. Follow one request

`app.html` click → `app.ts` state and form logic → `api.ts` HTTP service → {'ApiController.java → PurchaseService.java → JDBC/Flyway schema' if erp else 'app/main.py → app/service.py → SQLAlchemy + versioned SQLite migrations'} → transaction commit → response receipt → inventory refresh.

Model names/JSON contracts are in `frontend/src/app/models.ts` and `API-CONTRACT.md`. The database stores money in integer minor units; Rs.450.00 is 45000. UI totals are estimates. The server calculates authoritative prices and stores immutable unit-price snapshots. Product creation/edit API endpoints are manager-only; their administrative UI is an extension.

## 6. Tests and CI

Run {'`mvn test` in backend/' if erp else '`python -m pytest -q` using the backend virtual environment'}. Tests cover valid transactions, identity/permissions, malformed input, unknown products and rollback. {'Repeated approvals do not add stock twice.' if erp else 'A failing second item rolls back the first stock decrement and the order header.'} Run `npm run build` in frontend/ for template/type checking. Also exercise the real browser UI: empty cart, error, valid save, stock refresh, history and responsive layout.

The GitHub Actions workflow tests the backend and builds Angular and both images. Create your own GitHub repository, review `.gitignore` and staged changes, then push your branch and open a pull request. The workflow does not automatically publish images or deploy a host.

## 7. Extend toward production

Read `docs/release-runbook.md`. Review identity/session design, HTTPS, production database/migrations, durable idempotency, rate/body limits, backup/restore, audit access, logs/metrics, rollback and dependency policies. These local capstones do not claim production readiness. {'ERP approvals are state-guarded; exact concurrent behavior must also be tested against your production database.' if erp else 'A retried successful POST can create another order; implement a durable idempotency key before accepting real checkout traffic.'}

## Troubleshooting

- `node`/`py`/`java` not found: install the runtime, check PATH, and open a new terminal.
- `ENOENT package.json`: change into `frontend/`, not the ZIP root.
- API import error: run Uvicorn from `backend/`, with its virtual environment interpreter.
- 401: use the current `.env` credentials; restart the backend after editing its environment.
- 403: the account has no permission for the action{' or the required X-Build-Lab header is missing' if erp else ''}.
- 409: inventory or request state changed; refresh and review quantities/status.
- 502/network error: verify backend health, proxy port and `docker compose ps`.
- Data disappeared: check current working directory/database path and volume name; do not delete the DB to fix schema changes.

Official references: [Angular versions](https://angular.dev/reference/versions), [FastAPI](https://fastapi.tiangolo.com/tutorial/), [Spring](https://docs.spring.io/spring-boot/system-requirements.html), [Docker Compose](https://docs.docker.com/compose/gettingstarted/).
"""


def contract(kind):
    erp = kind == "erp"
    return f"""# API contract

- GET /api/health → 200 {{"status":"ok"}} (public liveness).
- GET /api/ready → 200 after a DB query (public readiness).
- GET /api/products → 200 direct array of {{id,name,price_minor,stock}} (public).
- POST /api/products → 201 product. Manager only. Body {{name,price_minor,stock}}.
- PATCH /api/products/{{id}} → 200 product. Manager only. Body {{name,price_minor}}. Stock changes are business operations, not this patch.
- POST /api/{'requests' if erp else 'orders'} → 201 saved transaction. Authenticated {'staff or manager' if erp else 'cashier/customer or manager'}.
- GET /api/{'requests' if erp else 'orders'} → latest 100 saved transactions, {'authenticated staff/manager' if erp else 'manager only'}.
{'- POST /api/requests/{id}/approve → 200 approved transaction. Manager only. Repeats return 409.' if erp else ''}

Use Basic authentication for protected routes. {'All write requests also require `X-Build-Lab: 1`. No cross-origin CORS policy is enabled; this custom header is part of the same-origin local API CSRF boundary.' if erp else ''}

Request: `{{"items":[{{"product_id":1,"quantity":2}}]{',"customer":"Amali","address":"12 Temple Road, Kandy"' if kind == 'shop' else ''}}}`.

Constraints: 1–50 unique product rows; integer IDs > 0; integer quantities 1–1000; product price_minor 0–100000000; stock 0–1000000. Extra request fields are rejected. Money is an integer in minor currency units. Customer/address strings are trimmed and limited to 80/300 characters in the commerce API.

Response: `{{"id":1,"status":"{'PENDING' if erp else 'COMPLETED'}","total_minor":90000,"created_at":"ISO-8601 UTC timestamp","items":[{{"product_id":1,"quantity":2,"unit_price_minor":45000}}]}}`.

Invalid shape → {'400' if erp else '422'}; missing/bad identity → 401; missing permission → 403; missing resource → 404; insufficient stock/already-approved/capacity conflict → 409. Domain errors use {{"detail":"message"}}. Framework validation errors may have a structured detail array in FastAPI. Never display raw server tracebacks.

{'Creating a purchase request does not change stock. Approval conditionally claims PENDING state and writes inventory and audit records in one transaction.' if erp else 'Checkout atomically decrements stock with a conditional UPDATE and saves the order and price snapshots in the same transaction. Any item failure rolls back all changes. Successful POST retries are not deduplicated in this local reference.'}
"""


def runbook():
    return """# Release and recovery runbook template

This local project needs a reviewed production configuration before exposure.

## Evidence

- Scope / acceptance tests:
- Reviewed commit SHA / current image tags / previous image tags:
- CI test/build evidence:
- Production identity provider/session policy / HTTPS termination:
- Durable idempotency and concurrent transaction test results:
- Database engine/version / migration versions / upgrade evidence:
- Secret store / rotation / request limits / CORS or CSRF policy:
- Backup destination / encryption / retention / successful restore evidence:
- RPO (acceptable data loss) / RTO (recovery time target):
- Monitoring / redacted logs / readiness / alert owner:
- 320px–1440px, keyboard and reduced-motion UI checks:

## Release sequence

1. Test the exact reviewed commit, build and tag immutable images.
2. Restore a backup in staging and apply the migration once. Test upgrade, not only fresh install.
3. Configure production secrets and HTTPS on the host. Keep the database private.
4. Back up production, deploy compatible images, check readiness, and run a sandbox business transaction.
5. Check unauthorized access, stock/approval consistency and monitoring before opening traffic.

## Rollback

1. Stop new writes if integrity is uncertain. Record the incident timestamp and current versions.
2. Deploy the previously verified image tag only if the current schema is backward compatible.
3. If data recovery is necessary, rehearse and execute the database-specific restore plan; an image rollback does not undo a destructive migration.
4. Verify counts, business invariants, health and one sandbox transaction before resuming traffic.
5. Document cause, affected records and the regression test added.

## Owner and incident commands

Fill in real hostnames, backup/restore commands, deployment commands, owner and alert contacts here. Do not copy placeholder commands to production.
"""


def assemble(kind, folder, title, action):
    files = {"README.md": readme(kind,folder,title), "API-CONTRACT.md": contract(kind), ".env.example": environment(kind),
             ".gitignore": "node_modules/\n.venv/\n.env\ndist/\n.angular/\ntarget/\ndata/\n*.db\n__pycache__/\n.pytest_cache/\n",
             "compose.yaml": compose(kind), ".github/workflows/ci.yml": ci(kind), "docs/release-runbook.md": runbook()}
    files.update(template_files(TEMPLATES/"frontend","frontend"))
    files.update(template_files(TEMPLATES/("erp-api" if kind=="erp" else "python-api"),"backend"))
    files["frontend/src/app/project.ts"] = "export const PROJECT: {kind: string; title: string; action: string} = "+json.dumps({"kind":kind,"title":title,"action":action})+";\n"
    files["frontend/proxy.conf.json"] = json.dumps({"/api":{"target":f"http://127.0.0.1:{8080 if kind=='erp' else 8000}","secure":False}},indent=2)+"\n"
    # The workbook is generated from the same curriculum as the UI by the companion Node exporter.
    workbook = ROOT / "assets/workbooks" / f"{folder}.md"
    if workbook.exists():
        files["docs/COURSE-WORKBOOK.md"] = workbook.read_text(encoding="utf-8")
    else:
        raise SystemExit("First run: node scripts/export-build-workbooks.cjs")
    for path in ("frontend/package-lock.json", "backend/"+("pom.xml" if kind=="erp" else "requirements.lock.txt")):
        if path not in files:
            raise SystemExit(f"Missing required lock/build file: {path}")
    return files


def main():
    DOWNLOADS.mkdir(parents=True,exist_ok=True)
    sources={}
    for kind,(folder,title,action) in PROJECTS.items():
        files=assemble(kind,folder,title,action)
        sources[kind]=files
        with zipfile.ZipFile(DOWNLOADS/f"{folder}.zip","w",compression=zipfile.ZIP_DEFLATED,compresslevel=9) as archive:
            for name,source in sorted(files.items()):
                info=zipfile.ZipInfo(f"{folder}/{name}",date_time=(2026,1,1,0,0,0))
                info.compress_type=zipfile.ZIP_DEFLATED
                info.external_attr=0o100644<<16
                archive.writestr(info,source.encode("utf-8"))
        print(f"{folder}: {len(files)} files")
    payload=json.dumps(sources,ensure_ascii=False,separators=(",",":" )).replace("</","<\\/")
    (ROOT/"assets/build-sources.js").write_text("/* Generated by scripts/bundle-build-projects.py; do not edit. */\nwindow.BUILD_SOURCES="+payload+";\n",encoding="utf-8")


if __name__=="__main__":
    main()
