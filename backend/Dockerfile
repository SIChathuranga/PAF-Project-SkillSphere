# Build stage
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy pom.xml first for dependency caching
COPY pom.xml .

# Download dependencies (cached layer)
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build with limited memory to avoid OOM on free tier
ENV MAVEN_OPTS="-Xmx512m -Xms256m"
RUN mvn clean package -DskipTests -B -q

# Run stage - minimal image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the built jar
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run with memory limits suitable for Render free tier (512MB)
ENTRYPOINT ["java", "-Xmx400m", "-Xms200m", "-XX:+UseSerialGC", "-jar", "app.jar"]
