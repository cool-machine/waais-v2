# 🚀 WAAIS v2 Full-Stack Setup Guide

This guide will help you set up the complete WAAIS (Wharton Alumni AI Studio) application with both frontend and backend components.

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Git

## 🏗️ Architecture Overview

```
waais-v2/
├── 📁 server/           # Backend (Node.js + Express + Prisma)
├── 📁 src/              # Frontend (React + TypeScript)
├── 📁 public/           # Static assets
└── 📄 Setup files
```

## 🗄️ Database Setup

### 1. Install PostgreSQL

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

### 2. Create Database

```bash
# Access PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE waais_db;
CREATE USER waais_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE waais_db TO waais_user;
\q
```

## 🔧 Backend Setup

### 1. Navigate to Server Directory
```bash
cd server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
```

**Required Environment Variables:**
```bash
# Database
DATABASE_URL="postgresql://waais_user:your_secure_password@localhost:5432/waais_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"
JWT_EXPIRES_IN="7d"

# SendGrid (Email Service)
SENDGRID_API_KEY="your-sendgrid-api-key"
SENDGRID_FROM_EMAIL="noreply@yourdomain.com"

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Server Configuration
PORT=5000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:5174"

# Admin User
ADMIN_EMAIL="admin@yourdomain.com"
ADMIN_PASSWORD="secure-admin-password"
```

### 4. Database Migration & Seeding
```bash
# Generate Prisma client
npm run generate

# Run database migrations
npm run migrate

# Seed database with sample data
npm run seed
```

### 5. Start Backend Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm run build && npm start
```

The backend will be available at `http://localhost:5000`

## 🎨 Frontend Setup

### 1. Navigate to Root Directory
```bash
cd ..  # Back to waais-v2 root
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit .env file
```

**Frontend Environment Variables:**
```bash
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME="Wharton Alumni AI Studio"
VITE_APP_VERSION=1.0.0
```

### 4. Start Frontend Development Server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5174`

## 🔑 Default Admin Access

After seeding the database, you can access the admin panel with:

- **Email:** `admin@yourdomain.com` (or your configured ADMIN_EMAIL)
- **Password:** `secure-admin-password` (or your configured ADMIN_PASSWORD)

## 📧 Email Service Setup (SendGrid)

### 1. Create SendGrid Account
1. Go to [SendGrid](https://sendgrid.com)
2. Create a free account
3. Verify your sender identity

### 2. Generate API Key
1. Go to Settings > API Keys
2. Create a new API key with full access
3. Copy the key to your `.env` file

### 3. Domain Authentication (Production)
1. Go to Settings > Sender Authentication
2. Authenticate your domain
3. Update DNS records as instructed

## 🖼️ Image Upload Setup (Optional)

### 1. Create Cloudinary Account
1. Go to [Cloudinary](https://cloudinary.com)
2. Create a free account
3. Get your cloud name, API key, and secret

### 2. Configure Environment
Add Cloudinary credentials to your server `.env` file.

## 🚀 Production Deployment

### Backend (Railway/Heroku/DigitalOcean)

**Environment Variables for Production:**
```bash
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
SENDGRID_API_KEY="your-sendgrid-key"
NODE_ENV="production"
CORS_ORIGIN="https://yourdomain.com"
```

### Frontend (Vercel/Netlify)

**Build Configuration:**
```bash
# Build command
npm run build

# Publish directory
dist

# Environment variables
VITE_API_URL=https://your-backend-url.com/api
```

## 🧪 Testing the Setup

### 1. Backend Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

### 2. Frontend Access
1. Open `http://localhost:5174`
2. Try registering a new account
3. Check email delivery (if configured)
4. Test login functionality

## 🔧 Development Workflow

### 1. Database Changes
```bash
# After modifying schema.prisma
cd server
npm run generate
npm run migrate
```

### 2. Backend Development
```bash
cd server
npm run dev  # Auto-reload on changes
```

### 3. Frontend Development
```bash
npm run dev  # Auto-reload on changes
```

## 📝 Available Scripts

### Backend (`/server`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run migrate` - Run database migrations
- `npm run generate` - Generate Prisma client
- `npm run seed` - Seed database with sample data

### Frontend (`/`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

### Database Connection Issues
1. Ensure PostgreSQL is running
2. Check database credentials in `.env`
3. Verify database exists and user has permissions

### Port Conflicts
- Backend default: `5000`
- Frontend default: `5174`
- Change ports in `.env` files if needed

### CORS Issues
- Ensure `CORS_ORIGIN` in backend `.env` matches frontend URL
- Check that both servers are running

### Email Not Sending
1. Verify SendGrid API key
2. Check sender email is verified
3. Review SendGrid dashboard for delivery issues

## 📚 API Documentation

Once the backend is running, API endpoints are available at:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users (with filters)
- `PUT /api/users/profile` - Update profile

### Events
- `GET /api/events` - Get events
- `POST /api/events` - Create event (admin)
- `POST /api/events/:id/register` - Register for event

### And more... (see `/server/src/routes/` for complete API)

## 🎯 Next Steps

1. **Customize Branding**: Update logos, colors, and content
2. **Email Templates**: Customize email templates in `/server/src/services/emailService.ts`
3. **Add Features**: Implement additional features as needed
4. **Testing**: Add unit and integration tests
5. **Monitoring**: Set up error tracking and analytics
6. **Security**: Implement additional security measures for production

## 🆘 Support

If you encounter issues:
1. Check this setup guide
2. Review console logs for errors
3. Verify environment variables
4. Ensure all services are running

## 🔄 Keeping Updated

To get the latest updates:
```bash
git pull origin main
npm install  # Frontend dependencies
cd server && npm install  # Backend dependencies
npm run migrate  # Apply any new database changes
```

---

**Happy Coding! 🚀**

Built with ❤️ for the Wharton Alumni AI Studio community.