# Quiz App

This application allows users to create, manage, and take interactive quizzes. Built with a Java Spring Boot backend and React TypeScript frontend, it offers a complete quiz management ecosystem. Users can register accounts, log in securely, and create custom quizzes with multiple-choice questions, which then can be shared via a URL. Quiz takers can then take the quiz by visiting the URL, and view their results when finished.

## Quickstart

### Option 1: Run Via Docker Compose

Run the following command to set your `AUTH_SECRET_KEY` environment variable (replace the value with your own secret key), and spin up the Spring Boot and Postgres containers:

```bash
AUTH_SECRET_KEY="[MY_SECRET_KEY]" docker compose up -d
```

### Option 2: Build and Run Locally

1. Ceate a Docker volume for Postgres (only once):

```bash
docker volume create quiz-app-postgres
```

2. Spin up a Postgres container

```bash
docker run -d \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD="[MY_PASSWORD]" \
  -v quiz-app-postgres:/var/lib/postgresql/data \
  postgres:17
```

3. Install and build frontend

```bash
cd frontend && npm install && npm run build && cd ..
```

4. Set environment variables and run Spring Boot app via Maven

```bash
AUTH_SECRET_KEY="[MY_SECRET_KEY]" \
POSTGRES_URL="jdbc:postgresql://localhost:5432/postgres" \
POSTGRES_USERNAME="postgres" \
POSTGRES_PASSWORD="[MY_PASSWORD]" \
./mvnw spring-boot:run
```

The application should now be available at http://localhost:8080
