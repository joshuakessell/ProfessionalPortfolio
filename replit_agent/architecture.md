# Portfolio Website Architecture

## Overview

This is a full-stack web application structured as a personal portfolio website. It follows a modern architecture with a React-based frontend and a Node.js/Express backend. The application uses a PostgreSQL database (via Neon Serverless Postgres) for data storage with Drizzle ORM for database interactions. Authentication is handled via AWS Cognito.

The project is designed to showcase a developer's portfolio with sections for résumé information, projects, blog posts, and a contact form. The site incorporates UI components from Shadcn/UI, which is built on Radix UI primitives, and uses Tailwind CSS for styling.

## System Architecture

The system follows a client-server architecture:

```
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│                │      │                │      │                │
│   Client-Side  │<─────│  Server-Side   │<─────│   Database &   │
│    (React)     │      │  (Express.js)  │      │ External APIs  │
│                │      │                │      │                │
└────────────────┘      └────────────────┘      └────────────────┘
```

### Frontend Architecture

The frontend is built with React and uses Vite as the build tool. It employs a component-based architecture with a structured directory organization:

- `client/src/components/` - Reusable UI components (many based on Shadcn/UI)
- `client/src/hooks/` - Custom React hooks for shared logic
- `client/src/lib/` - Utility functions and shared types
- `client/src/pages/` - Page components representing different routes
- `client/src/providers/` - React context providers

The frontend implements a responsive design approach using Tailwind CSS and includes animations for enhanced user experience.

### Backend Architecture

The backend is built with Express.js and follows a RESTful API approach. It's structured as follows:

- `server/index.ts` - Entry point that sets up the Express server
- `server/routes.ts` - API route definitions
- `server/db.ts` - Database connection and setup
- `server/cognito.ts` - AWS Cognito integration for authentication
- `server/storage.ts` - Data access layer interface
- `server/storage-db.ts` - Database implementation of the storage interface
- `server/github.ts` - GitHub API integration
- `server/openai.ts` - OpenAI API integration

### Shared Code

- `shared/schema.ts` - Database schema definitions shared between frontend and backend

## Key Components

### Database Layer

The application uses Drizzle ORM with PostgreSQL (via Neon's serverless Postgres). The schema includes:

- Users (with AWS Cognito integration)
- User Roles
- Blog Posts
- Projects
- Contact Messages

Drizzle provides type-safe database operations and schema management.

### Authentication System

Authentication is implemented using AWS Cognito, providing:

- User registration and login
- JWT token-based authentication
- Password management
- User profile storage
- Social provider integration

The frontend uses these JWT tokens for authenticated API requests.

### Frontend UI Framework

The UI is built with a component library that leverages:

- Shadcn/UI components (based on Radix UI primitives)
- Tailwind CSS for styling
- Custom hooks for animations and interactions
- Responsive design patterns

### API Integration

The application integrates with external services:

1. AWS Cognito - For authentication
2. GitHub API - For displaying public repositories
3. OpenAI API - For content generation and enhancement

### State Management

Frontend state management is handled through:

- React Query for API data fetching and caching
- React context for theme state
- Local component state for UI interactions

## Data Flow

### Authentication Flow

1. User signs up/logs in via frontend form
2. Request is sent to `/api/auth` endpoint
3. Server uses AWS Cognito to authenticate
4. JWT token is returned to client
5. Client stores token and includes it in authenticated requests
6. Server validates token on protected routes

### Content Display Flow

1. User visits a page that requires data (e.g., projects)
2. Frontend makes API request to appropriate endpoint
3. Server processes request, queries database
4. Data is returned to frontend
5. Frontend renders data using appropriate components

### Contact Form Flow

1. User submits contact form
2. Form data is validated on the client
3. Data is sent to server endpoint
4. Server validates data and stores in database
5. Confirmation is sent back to user

## External Dependencies

### Frontend Dependencies

- React and React DOM
- React Router (via Wouter)
- Tailwind CSS for styling
- Radix UI components
- React Query for data fetching
- Various UI components (dialogs, tooltips, etc.)

### Backend Dependencies

- Express.js for the server
- AWS SDK for Cognito integration
- Drizzle ORM for database operations
- Neon Serverless Postgres client
- OpenAI SDK
- JSON Web Token (JWT) for token validation

## Deployment Strategy

The application is configured for deployment on Replit's platform:

- Uses Replit's Node.js 20 runtime
- PostgreSQL 16 module is enabled
- Environment variables for storing secrets
- Build process:
  - Vite bundles frontend into static assets
  - esbuild compiles server-side TypeScript
  - Compiled server serves static assets

The deployment process:
1. Frontend assets are built via `npm run build`
2. Server code is bundled and compiled
3. Application is deployed to Replit's Cloud Run service
4. Server listens on port 5000, exposed as port 80

Environment variables required for deployment:

- `DATABASE_URL` - PostgreSQL connection string
- `AWS_REGION`, `AWS_USER_POOL_ID`, `AWS_CLIENT_ID` - AWS Cognito configuration
- `OPENAI_API_KEY` - OpenAI API access
- `GITHUB_TOKEN` (optional) - GitHub API access

## Development Practices

The project uses TypeScript throughout, providing type safety and improved developer experience. The codebase is organized to maximize code reuse between frontend and backend where possible, with shared types and schemas.

The application supports both development and production modes:

- Development mode: `npm run dev` - Uses Vite's hot module replacement
- Production mode: `npm run start` - Serves pre-built assets