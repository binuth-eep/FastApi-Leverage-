# Student API contract

Local base URL: `http://localhost:8080`. JSON requests use `Content-Type: application/json`.

```ts
interface Student { id: number; name: string; email: string; }
type StudentInput = { name: string; email: string; };
```

IDs are positive JavaScript-safe integers. The server owns generated IDs.

| Method | Path | Request | Success |
| --- | --- | --- | --- |
| GET | /api/students | none | 200, Student[] (direct array, ordered by ID) |
| GET | /api/students/:id | none | 200, Student |
| POST | /api/students | StudentInput | 201, Student, Location header |
| PATCH | /api/students/:id | StudentInput (both editable fields required) | 200, Student |
| DELETE | /api/students/:id | none | 204, no body |

Example create/update payload:

```json
{ "name": "Amali Perera", "email": "amali@example.com" }
```

The server trims both fields and lowercases the entire email as this project's
explicit normalization policy. Name length is 2–80 characters. Email must be
nonblank, valid, at most 254 characters and unique. PATCH does not implement an
arbitrary partial JSON Patch or Merge Patch document; both fields are required.

| Status | Meaning |
| --- | --- |
| 400 | Invalid fields, malformed JSON or invalid ID syntax/range |
| 404 | Valid ID but no matching student |
| 409 | Duplicate email or conflicting database constraint |

Typical validation response:

```json
{
  "status": 400,
  "message": "Check the student fields.",
  "errors": { "name": "size must be between 2 and 80" }
}
```

Constraint message wording can differ; clients should depend on status and field
keys, not exact framework text. Other errors use the same envelope with an empty
errors map where no field-specific feedback is available. Unexpected framework
errors may use Spring Boot's default error representation.

This sample is unpaginated. Add an explicit client adapter if you change the list
to a Page wrapper. Authentication is not implemented; add a complete trusted
security flow before publishing beyond the intended local learning environment.
