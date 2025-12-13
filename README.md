# NAI - Baby Feeding Tracker

A comprehensive baby feeding tracking application with user authentication and management.

## Features

- **User Authentication & Authorization**
  - User registration with automatic admin assignment for first user
  - Secure login with BCrypt password encryption
  - Role-based access control (Admin and Normal users)
  - Admin-only user management interface

- **Feeding Records Management**
  - Track multiple feeding types: breast milk, bottle feeding, milk powder
  - Record feeding times and amounts
  - View feeding history by date
  - Summary statistics for daily feeding

- **Progressive Web App (PWA)**
  - Installable on mobile devices
  - Offline-capable with service workers

## Quick Start

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Node.js 20+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure database connection in `src/main/resources/application.yaml`:
   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/nai
       username: your_username
       password: your_password
   ```

3. Create the database and initialize tables:
   ```bash
   mysql -u root -p < src/main/sql/init.sql
   ```

4. Build and run:
   ```bash
   mvn clean package
   java -jar target/nai.jar
   ```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development mode:
   ```bash
   npm run dev
   ```

4. Or build for production:
   ```bash
   npm run build
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## First Time Setup

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. You'll be redirected to the registration page
4. Create your first user account - **this user will automatically become an admin**
5. Login with your credentials
6. You can now access all features including user management

## User Roles

### Admin User
- First registered user automatically becomes admin
- Can access user management at `/users`
- Can view and delete normal users
- Cannot delete other admin users

### Normal User
- All users registered after the first user
- Can access feeding records
- Cannot access user management

## API Endpoints

### Public Endpoints
- `POST /api/register` - User registration
- `POST /api/login` - User login (form-based)
- `POST /api/logout` - User logout

### Authenticated Endpoints
- `GET /api/current-user` - Get current logged-in user
- `GET /api/feeding-records` - Get feeding records (paginated)
- `POST /api/feeding-record` - Create feeding record
- `PUT /api/feeding-record` - Update feeding record
- `DELETE /api/feeding-record/{id}` - Delete feeding record
- `GET /api/days-feeding-records` - Get records by days
- `GET /api/feeding-summary` - Get feeding summary

### Admin-Only Endpoints
- `GET /api/users` - List all users
- `DELETE /api/users/{id}` - Delete user (cannot delete admins)

## Security

This application implements several security features:

- Password encryption using BCrypt
- Form-based authentication with Spring Security
- Role-based access control (RBAC)
- Protected API endpoints
- Session management

For detailed security information and best practices, see [SECURITY.md](SECURITY.md).

## Technology Stack

### Backend
- Spring Boot 3.2.2
- Spring Security (form-based authentication)
- Spring Data JPA
- MySQL
- Java 17

### Frontend
- Next.js 14
- React 18
- Material-UI (MUI) 5
- TypeScript
- PWA support

## Development

### Backend Development
```bash
cd backend
mvn spring-boot:run
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Building for Production

Backend:
```bash
cd backend
mvn clean package
```

Frontend:
```bash
cd frontend
npm run build
```

## Project Structure

```
nai/
├── backend/          # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   ├── resources/
│   │   │   └── sql/
│   │   └── test/
│   └── pom.xml
├── frontend/         # Next.js application
│   ├── app/          # Next.js app directory
│   │   ├── login/    # Login page
│   │   ├── register/ # Registration page
│   │   └── users/    # User management (admin)
│   ├── components/   # React components
│   └── package.json
└── SECURITY.md       # Security documentation
```

## Contributing

Please read [COMMIT_GUIDELINES.md](COMMIT_GUIDELINES.md) before contributing.

## License

This project is for personal/family use.
