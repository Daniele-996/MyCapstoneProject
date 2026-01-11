# ---- build stage ----
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY backend/capstone/pom.xml ./pom.xml
RUN mvn -q -DskipTests dependency:go-offline

COPY backend/capstone/src ./src
RUN mvn -DskipTests clean package

# ---- run stage ----
FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENV PORT=8080
CMD ["sh", "-c", "java -jar app.jar"]
