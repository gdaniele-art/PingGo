FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app

COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN chmod +x mvnw && ./mvnw -q -DskipTests dependency:go-offline

COPY src src
RUN ./mvnw -q -DskipTests package

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

RUN addgroup -S pinggo && adduser -S pinggo -G pinggo

COPY --from=build /app/target/*.jar app.jar

USER pinggo

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
