FROM openjdk:17-jdk-slim AS builder

WORKDIR /app

RUN apt-get update

# Install curl
RUN apt-get install -y curl

# Install node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && node --version \
	&& npm --version
    
# Copy project
COPY . .

# Make mvnw executable
RUN chmod +x ./mvnw

# Download Java dependencies (this layer will be cached if pom.xml doesn't change)
RUN ./mvnw dependency:go-offline -B

WORKDIR /app/frontend

# Clean install node.js dependencies
RUN npm ci

# Build the frontend
RUN npm run build

WORKDIR /app

# Build the backend
RUN ./mvnw clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app

# Create a non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copy the JAR file from builder stage
COPY --from=builder /app/backend/target/*.jar backend/app.jar

# Copy the frontend dist folder from builder stage
COPY --from=builder /app/frontend/dist/ ./frontend/dist/

# Change ownership to appuser
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Run in /app/backend instead of /app so relative path to frontend is correct
WORKDIR /app/backend

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
