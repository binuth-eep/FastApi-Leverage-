# Student API · Java & Spring Boot Academy

A complete local learning API using **Java 17**, **Spring Boot 4.1.2**, Spring MVC,
Jakarta Validation, Spring Data JPA and an H2 memory database. It implements the
Student Directory schema used by this repository's Angular course.

## Run

Install a JDK compatible with this Spring Boot release and Maven **3.6.3+**.
This example targets Java 17 and uses installed Maven; it does not include a
Maven wrapper. The first dependency resolution needs internet access.

In the folder containing `pom.xml` run:

```bash
java --version
javac --version
mvn --version
mvn test
mvn spring-boot:run
```

Open http://localhost:8080/actuator/health. The server binds to **127.0.0.1**.
Use `requests.http` with an HTTP client, or send the requests in API-CONTRACT.md.
Stop with Ctrl+C. If port 8080 is busy:

```bash
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

Run the build in a separate terminal:

```bash
mvn package
```

Stop the development server before starting the same port from the packaged jar:

```bash
java -jar target/student-api-1.0.0.jar
```

## Behavior

The list starts empty. The H2 memory database is recreated when the application
starts; data is discarded when it stops. `create-drop` is a learning setting.
Names are trimmed and must contain 2–80 characters. Email is trimmed, lowercased
as an agreed teaching policy, validated and unique. Both fields are required for
POST and PATCH. Responses contain only `id`, `name` and `email`.

Controllers handle HTTP; services own transaction boundaries; repositories access
entities; response records define the public API. DTO constraints and the database
unique constraint enforce different boundaries. A friendly duplicate precheck
does not replace the database constraint when requests race.

## Connect the Angular course project

1. Start this API on port 8080.
2. In the Angular example, set `environment.useMock` to `false`.
3. Change `proxy.conf.json` target from port 8000 to `http://localhost:8080`.
4. Restart `npm start` and check the Network tab.

The list is a direct array; POST/PATCH return a canonical Student; DELETE has no
body. This Spring API uses **400** for invalid input, unlike the FastAPI course's
422 examples. The Angular starter displays its generic request-error feedback for
an unmapped status; add a 400 case or map the `errors` object for field feedback.
The service's public CORS policy allows only `http://localhost:4200`; dev-proxy
requests do not require a cross-origin browser call.

## Database and deployment boundaries

This learning project has **no authentication or authorization** and is intended
for local use. It does not store passwords or issue tokens. The course explains
security separately. Before a public deployment, implement trusted access control,
HTTPS, secret management, request limits and the required operational policies.

The optional `postgres` profile reads `DB_URL`, `DB_USER` and `DB_PASSWORD` from the
environment and uses `ddl-auto=validate`. It does not create a database or run
migrations. Prepare your database and apply reviewed schema migrations before
activating the profile. PostgreSQL migration behavior is not covered by the H2
tests. Update network binding, CORS and hosting API routing for your actual host;
the Angular development proxy is not a production reverse proxy.

## Tests

`mvn test` runs 12 full-context MockMvc/JPA integration tests covering empty list,
canonical create/normalization, validation, malformed JSON, duplicates, update,
failed-update preservation, delete, missing records, ID constraints, CORS and
restricted health details. MockMvc uses a mock servlet environment, not a TCP
server. Tests use an isolated in-memory database and clear records between cases.

References: [Spring requirements](https://docs.spring.io/spring-boot/system-requirements.html),
[Spring MVC](https://docs.spring.io/spring-boot/reference/web/servlet.html),
[JPA transactions](https://docs.spring.io/spring-data/jpa/reference/jpa/transactions.html),
[Spring testing](https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html).
