# Student API contract

Base URL: `/api`. JSON uses `Content-Type: application/json`. IDs are positive
safe integers. The backend owns IDs and returns canonical persisted records.

```ts
interface Student { id: number; name: string; email: string; }
type StudentInput = { name: string; email: string; };
```

| Method | URL | Request | Success |
| --- | --- | --- | --- |
| GET | /api/students | none | 200, Student[] (direct array) |
| POST | /api/students | StudentInput | 201, Student |
| PATCH | /api/students/:id | StudentInput (both fields in this app) | 200, Student |
| DELETE | /api/students/:id | none | 204, no body |

Example request: `{"name":"Amali Perera","email":"amali@example.com"}`.
Example record: `{"id":1,"name":"Amali Perera","email":"amali@example.com"}`.

Validate the trimmed name (2–80 characters) and email (maximum 254 characters,
valid email format). This teaching app lowercases the entire email; agree on this
normalization policy with your backend. Enforce unique email on the server and
database. Return 409 for duplicates, 422 for invalid input and 404 for missing IDs.
Use 401 for missing/expired authentication and 403 for insufficient permissions
when you add authentication. The app shows general status-based error messages;
it does not parse arbitrary Pydantic field-error response structures.

Implement pagination or response wrappers with an explicit service adapter.
The starter expects an unpaginated array. Production authentication, rate limiting,
audit logging and database migrations must be designed for your application.
