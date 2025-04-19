# Chronos REST API

A RESTful API built with Express.js, Prisma, and MongoDB.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env` (if provided)
   - Update the MongoDB connection string in `.env`
   - Set the desired `LOG_LEVEL` in `.env` (error, warn, info, http, verbose, debug, silly)
   - Configure Resend API key in `.env` for email sending

3. Generate Prisma client:
   ```
   npx prisma generate
   ```

4. Push the schema to your database:
   ```
   npx prisma db push
   ```

5. Seed the database with initial settings:
   ```
   npm run seed
   ```

6. Start the server:
   ```
   npm start
   ```
   
   For development with hot reload:
   ```
   npm run dev
   ```

## Project Structure

```
src/
├── models/                # Core domain models
│   ├── User/              # User model
│   │   ├── user.controller.js
│   │   ├── user.service.js
│   │   ├── user.routes.js
│   │   └── user.validators.js
│   └── Product/           # Product model (example)
├── lib/                   # Shared utilities
│   ├── prisma.js          # Prisma client instance
│   ├── logger.js          # Winston logger configuration
│   ├── auth.js            # Authentication utilities
│   ├── emailService.js    # Email service using Resend
│   ├── utilsService.js    # Utility service for app settings
│   ├── middleware/
│   │   └── authenticate.js
│   └── helpers.js
├── app.js                 # Express app configuration
└── server.js              # Server entry point
prisma/
├── schema.prisma          # Prisma schema
└── seed.js                # Database seed script
logs/                      # Application logs
```

## Logging

The application uses Winston for logging with the following features:
- Multiple log levels (error, warn, info, http, verbose, debug, silly)
- Console output with colorization
- File-based logging with separate files for errors and combined logs
- Automatic exception and rejection handling

Log level can be configured in the `.env` file.

## Authentication

The API includes a complete authentication system with the following features:

- Login with email/password
- Email verification via OTP (One-Time Password)
- JWT token-based authentication
- Protected routes using authentication middleware
- Global signup enable/disable feature through database settings

### API Endpoints

#### Authentication Endpoints

- **POST /auth/login**
  - Login with email and password
  - If user exists, returns JWT token
  - If user doesn't exist, creates a new user and sends verification email

- **POST /auth/verify**
  - Verify user's email with verification code
  - Returns JWT token upon successful verification

- **GET /auth/profile** (Protected)
  - Returns the user's profile information
  - Requires authentication

## Settings

The application includes a database-driven settings system:

- `is-signup-enabled`: Controls whether new user signups are allowed
  - Default: `{ enabled: true }`
  - Update with database query or admin API 