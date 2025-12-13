# Security Considerations

## Authentication & Authorization

This application uses Spring Security for authentication and authorization with the following features:

### User Roles
- **ADMIN**: First registered user automatically becomes admin. Can manage all users.
- **NORMAL**: Regular users created after the first user. Can access feeding records but not user management.

### Security Features Implemented

1. **Password Encryption**: All passwords are encrypted using BCrypt before storage
2. **Form-based Authentication**: Users authenticate using username/password via POST to `/api/login`
3. **Role-based Access Control**: Admin-only endpoints are protected with `@PreAuthorize("hasRole('ADMIN')")`
4. **Protected API Endpoints**: All `/api/**` endpoints require authentication except:
   - `/api/register` - User registration
   - `/api/login` - User login
   - `/api/logout` - User logout
5. **Admin User Protection**: Admin users cannot be deleted through the user management interface

### Known Security Considerations

#### CSRF Protection
CSRF protection is currently **disabled** for API endpoints. This is acceptable for this implementation because:
- The application uses a modern frontend (Next.js) that calls APIs directly
- Authentication is stateful using Spring Security's session management
- The application is intended for private/family use

**For production deployment**, consider one of these options:
1. Enable CSRF protection and configure the frontend to include CSRF tokens
2. Migrate to JWT-based stateless authentication
3. Use SameSite cookie attributes for additional protection

To enable CSRF protection, modify `SecurityConfig.java`:
```java
.csrf(csrf -> csrf
    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
)
```

#### Client-side Route Protection
The middleware currently allows all requests to pass through and relies on:
- Server-side Spring Security for API protection
- Client-side authentication checks for UI rendering

This is acceptable because:
- All sensitive data access is protected by Spring Security on the backend
- The frontend only controls what UI is shown, not what data is accessible
- Direct API calls will still be blocked by Spring Security if unauthenticated

### Best Practices for Deployment

1. **Database Security**
   - Use strong database passwords
   - Never commit passwords to version control
   - Use environment variables for sensitive configuration

2. **HTTPS**
   - Always deploy with HTTPS in production
   - Configure Spring Security to require secure connections

3. **Password Policy**
   - Consider implementing password strength requirements
   - Consider implementing password expiration policies

4. **Session Management**
   - Configure appropriate session timeout values
   - Consider implementing remember-me functionality securely

5. **Admin Account**
   - The first user becomes admin automatically
   - Ensure the first registration is done by a trusted administrator
   - Consider implementing a way to promote users to admin after initial setup

## API Security

All API endpoints follow these patterns:

- **Public Endpoints**: `/api/register`, `/api/login`, `/api/logout`
- **Authenticated Endpoints**: `/api/feeding-record/**`, `/api/current-user`
- **Admin-only Endpoints**: `/api/users/**`

Unauthorized access attempts will receive HTTP 401 (Unauthorized) or 403 (Forbidden) responses.
