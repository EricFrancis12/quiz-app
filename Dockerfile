FROM openjdk:17-jdk-slim

# Set working directory
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

EXPOSE 8080

# Run the application
ENTRYPOINT ["./mvnw", "spring-boot:run"]
