#!/bin/sh
# NAI Application Startup Script
# Starts both backend (Spring Boot) and frontend (Next.js) services

# Start backend in background
cd /app/backend && java -jar nai.jar &
BACKEND_PID=$!
echo "Backend started with PID: $BACKEND_PID"

# Start frontend in background
cd /app/frontend && npm start &
FRONTEND_PID=$!
echo "Frontend started with PID: $FRONTEND_PID"

# Trap signals to gracefully shutdown both services
trap "echo 'Shutting down...'; kill $BACKEND_PID $FRONTEND_PID; exit" SIGTERM SIGINT

# Wait for both processes
wait
