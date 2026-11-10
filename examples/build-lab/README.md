# Build Lab source templates

Open `../../projects.html` for the Sinhala learning workspace. Start with **POS → Step 01**.

The course provides three complete local project ZIPs in `../../assets/downloads/`:

- `pocket-pos.zip`: Angular + FastAPI, stock-safe sales and receipts.
- `little-shop.zip`: Angular + FastAPI, customer/address checkout and order history. Real payment processing is an extension.
- `flow-erp.zip`: Angular + Spring Boot, purchase requests, manager-only approval and an audit trail. This is a small purchasing/inventory ERP slice.

Each ZIP has its own README, exact native setup commands, a frontend dependency lock, backend tests, migrations, Compose configuration and a CI workflow. Extract one ZIP to a new directory and follow its README. Do not run the template folders as if they were an assembled project: the bundler configures project names, ports, environment templates and documentation for each track.

`frontend/`, `python-api/` and `erp-api/` are the maintained source templates. Generate the offline source explorer and all three downloadable projects after editing them:

```bash
node ../../scripts/export-build-workbooks.cjs
python3 ../../scripts/bundle-build-projects.py
```

The bundler requires the checked-in frontend `package-lock.json` and Python `requirements.lock.txt`. It excludes dependencies, build outputs, databases, credentials and caches. It writes deterministic ZIPs and `assets/build-sources.js`; it also includes the ordered Sinhala course workbook in each ZIP.

These are local learning reference apps, with real HTTP/database behavior. Browser code replay and the UI studio are separately labelled simulations. Production deployment requires completing the course release review, including a production identity policy, HTTPS, tested backup/restore, durable idempotency, target-database concurrency checks, monitoring and a rollback plan.
