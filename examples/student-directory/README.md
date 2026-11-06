# Student Directory · Angular Academy

A complete standalone Angular 22 learning project: search, add, edit, cancel,
confirmed delete, validation, pending states, error feedback and behavior tests.

## Run

Install Node **24.15.0 or a newer 24.x patch** (or supported Node 22.22.3+ / 22.x).
The first package installation needs internet access. In this folder run:

```bash
npm ci
npm start
```

Open http://localhost:4200. Stop the server with Ctrl+C. Use a separate terminal
in the same folder to run `npm test` and `npm run build`. The included
package-lock.json records the tested dependency versions. Use `npm ci` for clean
installs; review and test intentional updates made with `npm install`.

The ZIP is a complete project. Alternatively, create a clean scaffold with:

```bash
npx @angular/cli@22 new student-directory --routing --style=css --standalone --ssr=false --defaults
cd student-directory
```

Copy every bundle file into this root, preserving relative paths, then `npm install`.
Remove scaffold-only tests such as `src/app/app.spec.ts` if they assert the starter
page title. This bundle supplies its own page and service behavior tests.

## Mock data and API mode

`src/environments/environment.ts` defaults to `useMock: true`. Delayed RxJS
observables simulate CRUD in memory. Reloading resets sample data. Duplicate email
and input validation errors are simulated; this mode does not call a backend.

For a backend, implement **API-CONTRACT.md**, set `useMock: false`, check the
backend target in `proxy.conf.json`, and restart `npm start`. Existing FastAPI
User endpoints do not automatically satisfy this Student contract. Add endpoints
or adapt the service to the actual backend schema and pagination shape.

This capstone does not implement authentication. For a protected backend, add its
login/session flow and a same-API authorization interceptor before enabling API
mode. The server must enforce permissions and validate every request. The course
authentication lessons explain the boundaries. Never expose secrets in frontend
configuration or treat a route guard as server authorization.

## Build and host

`npm run build` writes browser assets to `dist/student-directory/browser`.
Host that output with HTTPS and an index.html fallback for app routes such as
`/students`. Route `/api` to your backend, or use an appropriate public API base URL
and backend CORS policy. The development proxy is not part of production output.

## Verify

`npm test` covers search, invalid submission, normalized creation, editing,
cancellation, confirmed deletion, API errors/retry, HTTP contracts, mock duplicate
emails and request cancellation. Also manually check mobile layout, keyboard
navigation and the complete CRUD journey against your real API.

References: [Angular compatibility](https://angular.dev/reference/versions),
[Reactive forms](https://angular.dev/guide/forms/reactive-forms),
[Testing](https://angular.dev/guide/testing).
