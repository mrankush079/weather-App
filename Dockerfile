# Use a lean runtime image for Java 21
FROM eclipse-temurin:21-jre-slim

# Set working directory inside the container
WORKDIR /app

# Add a non-root user for security
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup

# ARG to specify the built jar file
ARG JAR_FILE=target/*.jar

# Copy the jar into the container and rename it
COPY ${JAR_FILE} app.jar

# Change ownership so the non-root user can run it
RUN chown appuser:appgroup app.jar

# Switch to non-root user
USER appuser

# Expose the default Spring Boot port (or use an env variable)
EXPOSE 8080

# Use an environment variable for port if your platform sets it
ENV SERVER_PORT=8080

# Run the application
ENTRYPOINT ["java", "-Dserver.port=${SERVER_PORT}", "-jar", "app.jar"]
