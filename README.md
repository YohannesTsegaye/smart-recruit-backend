# Smart Recruit Backend API

A NestJS-based backend API for the Smart Recruit job application system.

## Features

- User authentication and authorization (JWT)
- Candidate management
- Job posting management
- Email notifications
- File upload handling
- Role-based access control

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport
- **Email**: Nodemailer
- **File Upload**: Multer
- **Validation**: Class-validator

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/backend.git
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=smart_recruit

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server
PORT=3001
NODE_ENV=development
```

5. Run database migrations:
```bash
npm run migration:run
```

6. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3001`

## API Documentation

### Authentication Endpoints

#### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "admin"
  }
}
```

#### POST /auth/forgot-password
Request password reset.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

#### POST /auth/reset-password
Reset password with token.

**Request Body:**
```json
{
  "token": "reset_token_here",
  "password": "new_password123"
}
```

### User Management

#### GET /users
Get all users (Admin only)

#### POST /users
Create new user (Admin only)

#### PUT /users/:id
Update user

#### DELETE /users/:id
Delete user (Admin only)

### Candidate Management

#### GET /candidates
Get all candidates with filters

**Query Parameters:**
- `status`: Filter by status
- `department`: Filter by department
- `page`: Page number
- `limit`: Items per page

#### POST /candidates
Create new candidate

#### GET /candidates/:id
Get candidate by ID

#### PUT /candidates/:id
Update candidate

#### PUT /candidates/:id/status
Update candidate status

**Request Body:**
```json
{
  "status": "interview_scheduled",
  "scheduledDateTime": "2024-01-15T10:00:00Z"
}
```

### Job Posting Management

#### GET /jobpost
Get all job postings

#### POST /jobpost
Create new job posting (Admin only)

#### GET /jobpost/:id
Get job posting by ID

#### PUT /jobpost/:id
Update job posting (Admin only)

#### DELETE /jobpost/:id
Delete job posting (Admin only)

### File Upload

#### POST /upload
Upload candidate resume

**Headers:**
- `Authorization: Bearer <token>`

**Body:** FormData with file

## Development

### Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the application
- `npm run start:prod` - Start production server
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Database Migrations

```bash
# Generate migration
npm run migration:generate -- src/database/migrations/MigrationName

# Run migrations
npm run migration:run

# Revert migration
npm run migration:revert
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 5432 |
| `DB_USERNAME` | Database username | - |
| `DB_PASSWORD` | Database password | - |
| `DB_DATABASE` | Database name | smart_recruit |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRES_IN` | JWT expiration time | 24h |
| `EMAIL_HOST` | SMTP host | - |
| `EMAIL_PORT` | SMTP port | 587 |
| `EMAIL_USER` | Email username | - |
| `EMAIL_PASS` | Email password | - |
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment | development |

## CORS Configuration

The API is configured to accept requests from the frontend domain. Update the CORS settings in `src/main.ts` for production deployment.

## Deployment

### Heroku

1. Create a new Heroku app
2. Add PostgreSQL addon
3. Set environment variables
4. Deploy using Git

```bash
heroku create your-app-name
heroku addons:create heroku-postgresql
heroku config:set NODE_ENV=production
git push heroku main
```

### Docker

```bash
# Build image
docker build -t smart-recruit-backend .

# Run container
docker run -p 3001:3001 smart-recruit-backend
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
