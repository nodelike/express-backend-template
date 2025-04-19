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

3. Generate Prisma client:
   ```
   npx prisma generate
   ```

4. Start the server:
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
│   ├── User/
│   └── Product/
├── lib/                   # Shared utilities
│   ├── prisma.js          # Prisma client instance
│   ├── logger.js          # Winston logger configuration
│   ├── middleware/
│   └── helpers.js
├── app.js                 # Express app configuration
└── server.js              # Server entry point
prisma/
└── schema.prisma          # Prisma schema
logs/                      # Application logs
```

## Logging

The application uses Winston for logging with the following features:
- Multiple log levels (error, warn, info, http, verbose, debug, silly)
- Console output with colorization
- File-based logging with separate files for errors and combined logs
- Automatic exception and rejection handling

Log level can be configured in the `.env` file.

## API Endpoints

Will be documented as they are implemented. 