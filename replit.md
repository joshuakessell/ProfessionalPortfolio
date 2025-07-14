# Portfolio Website

## Overview

This is a modern full-stack portfolio website built to showcase a developer's skills, experience, and projects. The application features a React-based frontend with a Node.js/Express backend, PostgreSQL database integration via Drizzle ORM, and AWS Cognito for authentication. The site includes sections for resume information, featured projects, blog posts, and a contact form.

## System Architecture

The application follows a client-server architecture with clear separation of concerns:

```
Frontend (React/Vite) ↔ Backend (Express.js) ↔ Database (PostgreSQL)
                                ↕
                     External APIs (GitHub, OpenAI, AWS Cognito)
```

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with Shadcn/UI component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state and caching
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: CSS-based animations with intersection observer hooks

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Authentication**: AWS Cognito Identity Provider
- **API Structure**: RESTful endpoints with middleware for auth and logging
- **External Integrations**: GitHub API, OpenAI API

## Key Components

### Database Schema
The application uses PostgreSQL with the following main entities:
- **Users**: Authentication and profile information with Cognito integration
- **User Roles**: Role-based access control system
- **Blog Posts**: Content management with categories and featured posts
- **Projects**: Portfolio projects with technology tags and links
- **Contact Messages**: Form submissions with read status tracking
- **Comments**: Threaded commenting system for blogs and projects

### Authentication System
- AWS Cognito handles user authentication and management
- JWT token-based authorization with middleware protection
- Role-based access control for different user types
- Social provider integration support

### Content Management
- Dynamic blog post system with markdown support
- Project showcase with GitHub integration
- Contact form with server-side validation
- File upload capabilities for images and assets

## Data Flow

1. **Client Request**: Frontend makes API calls using TanStack Query
2. **Authentication**: JWT tokens validated via middleware
3. **Database Operations**: Drizzle ORM handles PostgreSQL interactions
4. **External APIs**: GitHub repos fetched, OpenAI for content enhancement
5. **Response**: JSON data returned to client with error handling

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection via Neon
- **drizzle-orm**: Type-safe database operations
- **@aws-sdk/client-cognito-identity-provider**: AWS authentication
- **@tanstack/react-query**: Client-side state management

### UI/UX Dependencies
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **@replit/vite-plugin-shadcn-theme-json**: Theme configuration

### Development Tools
- **vite**: Fast build tool and dev server
- **typescript**: Type safety across the stack
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
- Frontend builds to `dist/public` via Vite
- Backend compiles with esbuild to `dist/index.js`
- Static assets served from build directory

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- AWS credentials for Cognito integration
- Optional GitHub token for enhanced API limits
- OpenAI API key for content generation features

### Production Setup
- Node.js server serves both API and static files
- PostgreSQL database (Neon serverless recommended)
- SSL/TLS termination at reverse proxy level
- Environment variables for sensitive configuration

## User Preferences

Preferred communication style: Simple, everyday language.
Development workflow: All future work should be done on a development branch, not directly on main.

## Changelog

Changelog:
- June 28, 2025. Initial setup
- July 14, 2025. Restructured navigation layout (logo left, links center, controls right)
- July 14, 2025. Completely removed blog section from entire site
- July 14, 2025. Fixed smooth scrolling functionality with multiple fallback methods
- July 14, 2025. Requested development branch workflow for all future changes
- July 14, 2025. Switched to development branch for all ongoing work
- July 14, 2025. Converted to static read-only portfolio by removing database storage, authentication, and dynamic content management
- July 14, 2025. Fixed navigation scrolling by resolving CSS overflow issue that prevented page scrolling
- July 14, 2025. Enhanced security: Added rate limiting (10 requests per 15 minutes) to AI endpoint to prevent abuse and cost overruns
- July 14, 2025. Enhanced security: Removed GET /api/contact endpoint that exposed sensitive personal data without authentication