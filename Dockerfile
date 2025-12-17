# Multi-stage Dockerfile for NAI application
# Stage 1: Build backend
FROM maven:3.9-eclipse-temurin-17 AS backend-builder
WORKDIR /app/backend
COPY backend/pom.xml .
# Download dependencies first (better caching)
RUN mvn dependency:go-offline -B
COPY backend/src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Build frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 3: Runtime image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Install Node.js for running Next.js
RUN apk add --no-cache nodejs npm

# Copy backend jar
COPY --from=backend-builder /app/backend/target/nai.jar ./backend/nai.jar

# Copy frontend build
COPY --from=frontend-builder /app/frontend/.next ./frontend/.next
COPY --from=frontend-builder /app/frontend/public ./frontend/public
COPY --from=frontend-builder /app/frontend/package*.json ./frontend/
COPY --from=frontend-builder /app/frontend/node_modules ./frontend/node_modules
COPY --from=frontend-builder /app/frontend/next.config.mjs ./frontend/

# Create startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'cd /app/backend && java -jar nai.jar &' >> /app/start.sh && \
    echo 'BACKEND_PID=$!' >> /app/start.sh && \
    echo 'cd /app/frontend && npm start &' >> /app/start.sh && \
    echo 'FRONTEND_PID=$!' >> /app/start.sh && \
    echo 'trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGTERM SIGINT' >> /app/start.sh && \
    echo 'wait' >> /app/start.sh && \
    chmod +x /app/start.sh

# Expose ports
EXPOSE 8080 3000

# Set environment variables
ENV SPRING_PROFILES_ACTIVE=production
ENV NODE_ENV=production

CMD ["/app/start.sh"]
