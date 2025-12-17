# Docker Deployment Guide

This guide explains how to build and deploy the NAI application using Docker.

## Quick Start with Docker Compose

The easiest way to run NAI is using Docker Compose:

```bash
# Pull and start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

## Building the Docker Image

To build the Docker image locally:

```bash
docker build -t nai:local .
```

## Running the Docker Container

### With Docker Compose (Recommended)

1. Create a `.env` file with your configuration:
   ```bash
   DB_PASSWORD=your_secure_password
   ```

2. Start the services:
   ```bash
   docker-compose up -d
   ```

### Without Docker Compose

1. Start a MySQL container:
   ```bash
   docker run -d \
     --name nai-mysql \
     -e MYSQL_ROOT_PASSWORD=nai_password \
     -e MYSQL_DATABASE=nai \
     -p 3306:3306 \
     mysql:8.0
   ```

2. Initialize the database:
   ```bash
   docker exec -i nai-mysql mysql -uroot -pnai_password nai < backend/src/main/sql/init.sql
   ```

3. Run the NAI application:
   ```bash
   docker run -d \
     --name nai-app \
     --link nai-mysql:mysql \
     -e DB_HOST=mysql \
     -e DB_PORT=3306 \
     -e DB_USERNAME=root \
     -e DB_PASSWORD=nai_password \
     -p 8080:8080 \
     -p 3000:3000 \
     nai:local
   ```

## Using Pre-built Images from GHCR

Pre-built images are available from GitHub Container Registry:

```bash
# Pull the latest image
docker pull ghcr.io/jonasgao/nai:latest

# Or pull a specific version
docker pull ghcr.io/jonasgao/nai:v1.0.0
```

Update `docker-compose.yml` to use the desired version.

## Environment Variables

The following environment variables can be configured:

### Backend (Spring Boot)
- `DB_HOST`: MySQL host (default: localhost)
- `DB_PORT`: MySQL port (default: 3306)
- `DB_USERNAME`: Database username (default: root)
- `DB_PASSWORD`: Database password
- `SPRING_PROFILES_ACTIVE`: Spring profile (default: production)

### Frontend (Next.js)
- `NODE_ENV`: Node environment (default: production)

## Volumes

The docker-compose setup creates a persistent volume for MySQL data:
- `mysql-data`: Stores MySQL database files

## Ports

- `3000`: Frontend (Next.js)
- `8080`: Backend API (Spring Boot)
- `3306`: MySQL (only exposed in docker-compose)

## Health Checks

The MySQL service includes health checks to ensure the database is ready before starting the application.

## Troubleshooting

### Check container logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f mysql
```

### Restart services
```bash
docker-compose restart
```

### Reset everything
```bash
# Stop and remove containers and volumes
docker-compose down -v

# Start fresh
docker-compose up -d
```

### Database connection issues
- Ensure MySQL is healthy: `docker-compose ps`
- Check database credentials in environment variables
- Verify the database is initialized with the correct schema

## Production Deployment

For production deployment:

1. Use strong passwords and store them securely
2. Use environment-specific configuration files
3. Set up proper backup strategy for the MySQL volume
4. Consider using a managed database service instead of the containerized MySQL
5. Set up reverse proxy (e.g., Nginx) for SSL/TLS termination
6. Configure appropriate resource limits in docker-compose.yml

Example with resource limits:
```yaml
services:
  app:
    # ... other configuration
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

## CI/CD Integration

The project includes a GitHub Actions workflow (`.github/workflows/release.yml`) that:
- Builds both frontend and backend
- Creates GitHub releases with artifacts
- Builds and pushes Docker images to GHCR
- Supports multi-architecture builds (amd64, arm64)

To trigger a release:
```bash
git tag v1.0.0
git push origin v1.0.0
```

## Multi-Architecture Support

The Docker images are built for multiple architectures:
- `linux/amd64`: Standard x86_64 systems
- `linux/arm64`: ARM-based systems (e.g., Apple Silicon, ARM servers)

Docker will automatically pull the correct image for your platform.
