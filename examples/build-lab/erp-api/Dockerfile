FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn -B verify
FROM eclipse-temurin:17-jre
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/* && useradd --uid 10001 --create-home learner && mkdir /data && chown 10001:10001 /data
COPY --from=build /app/target/flow-erp-1.0.0.jar app.jar
USER 10001
ENV SERVER_ADDRESS=0.0.0.0 SERVER_PORT=8000 DATABASE_URL=jdbc:h2:file:/data/flow-erp;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE
EXPOSE 8000
CMD ["java", "-jar", "app.jar"]
