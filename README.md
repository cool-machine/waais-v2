# Wharton Alumni AI Studio and Research Center

[![Deploy Status](https://github.com/cool-machine/waais-v2/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/cool-machine/waais-v2/actions)
[![Live Site](https://img.shields.io/badge/Live%20Site-GitHub%20Pages-blue)](https://cool-machine.github.io/waais-v2/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.3-blue)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue)](https://postgresql.org/)
[![Express](https://img.shields.io/badge/Express-4.18-black)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7-2D3748)](https://prisma.io/)

## 🎯 About

The **Wharton Alumni AI Studio and Research Center** is a production-ready, full-stack community platform that connects Wharton School alumni to foster innovation, knowledge sharing, and collaboration in the artificial intelligence space. Our mission is to create a vibrant ecosystem where experienced professionals can mentor startups, share insights, and drive AI innovation forward.

**Live Website**: [https://cool-machine.github.io/waais-v2/](https://cool-machine.github.io/waais-v2/)

## ✨ New Full-Stack Features

### 🔐 **Complete Authentication System**
- User registration and login with JWT tokens
- Secure password hashing with bcrypt
- Password reset functionality via email
- Role-based access control (Admin/Alumni/Guest)

### 👥 **Alumni Database & Profiles**
- Comprehensive user profiles with Wharton graduation details
- Alumni directory with advanced search and filtering
- Profile management with AI expertise tracking
- Professional networking capabilities

### 📅 **Event Management System**
- Full CRUD operations for events
- Real event registration with capacity limits
- Email confirmations for registrations
- Event status tracking (Draft/Published/Cancelled)

### 🚀 **Startup Ecosystem**
- Startup directory with detailed profiles
- Application system for startup opportunities
- Status tracking for applications
- Integration with alumni mentorship

### 🎯 **Mentorship Platform**
- Mentor profile creation and management
- Mentorship request system
- Expertise-based matching
- Request status management

### 📧 **Email Integration**
- SendGrid integration for transactional emails
- Welcome emails for new users
- Event confirmation emails
- Newsletter subscription management

### 🗄️ **Robust Database Architecture**
- PostgreSQL with Prisma ORM
- Comprehensive relational data model
- Database migrations and seeding
- Performance optimized queries

## 🌟 What We Do

### 🎓 Knowledge Sharing
- Organize educational events and workshops for AI knowledge exchange
- Host webinars featuring industry experts and thought leaders
- Create learning opportunities for both beginners and advanced practitioners

### 🚀 Startup Matching
- Connect early-stage tech startups with experienced alumni mentors
- Provide guidance on AI product development and strategy
- Facilitate networking opportunities between founders and investors

### 💡 Pain Point Discussions
- Identify and address key challenges in AI implementation
- Host roundtable discussions on industry trends and obstacles
- Create solution-oriented forums for collaborative problem-solving

### 🤝 Strategic Partnerships
- Partner with established organizations and institutions
- Collaborate on research initiatives and publication projects
- Create valuable resources and opportunities for our community

## 📊 Our Impact

- **500+** Alumni Members
- **48** Events Hosted
- **75** Startups Supported
- **25** Global Partners

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18.2.0 with TypeScript
- **Routing**: React Router DOM 
- **Styling**: Tailwind CSS for responsive design
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: React Context for authentication

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **Database**: PostgreSQL 14+ with Prisma ORM
- **Authentication**: JWT with bcrypt password hashing
- **Email Service**: SendGrid for transactional emails
- **File Upload**: Cloudinary integration
- **Validation**: Zod for runtime type checking
- **Security**: Helmet, CORS, Rate limiting

### DevOps & Deployment
- **Frontend**: GitHub Pages with automated CI/CD
- **Backend**: Railway/Heroku/DigitalOcean ready
- **Database**: PostgreSQL (local development + production)
- **Environment**: Docker ready configuration

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)
```bash
git clone https://github.com/cool-machine/waais-v2.git
cd waais-v2
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Option 2: Manual Setup

#### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- SendGrid account (for email functionality)

#### Frontend Only (Static Demo)
```bash
npm install
npm run dev
```

#### Full-Stack Setup
```bash
# 1. Install dependencies
npm install
cd server && npm install && cd ..

# 2. Configure environment
cp .env.example .env
cp server/.env.example server/.env
# Edit both .env files with your configuration

# 3. Setup database
cd server
npm run generate
npm run migrate
npm run seed

# 4. Start both servers
npm run dev  # Frontend (port 5174)
cd server && npm run dev  # Backend (port 5000)
```

📖 **Detailed Setup Guide**: See [SETUP.md](SETUP.md) for complete instructions.

## 📁 Project Structure

```
waais-v2/
├── 📁 server/                    # Backend Application
│   ├── src/
│   │   ├── controllers/          # Route handlers
│   │   ├── middleware/           # Auth, error handling
│   │   ├── routes/              # API endpoints
│   │   ├── services/            # Business logic
│   │   ├── utils/               # Database, helpers
│   │   └── index.ts             # Server entry point
│   ├── prisma/
│   │   └── schema.prisma        # Database schema
│   ├── package.json
│   └── .env.example
├── 📁 src/                      # Frontend Application
│   ├── components/              # Reusable React components
│   ├── pages/                   # Page components
│   ├── contexts/                # React contexts (Auth)
│   ├── services/                # API service layer
│   ├── hooks/                   # Custom React hooks
│   ├── utils/                   # Frontend utilities
│   └── types.ts                 # TypeScript definitions
├── 📁 public/                   # Static assets
├── 📁 scripts/                  # Setup and deployment scripts
├── 📄 SETUP.md                  # Detailed setup guide
├── 📄 .env.example              # Frontend environment template
└── 📄 package.json              # Frontend dependencies
```

## 🎨 Features

### 🎬 Interactive Design
- **Video Background**: YouTube embedded video on homepage hero section
- **Smooth Animations**: Framer Motion powered animations throughout
- **Particle Effects**: Dynamic particle backgrounds for visual appeal
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### 📱 Pages & Functionality
- **Homepage**: Hero section, events, startups showcase, testimonials
- **About**: Organization information and mission statement
- **Events**: Upcoming and past events with detailed information
- **Startups**: Portfolio of supported AI startups
- **Get Involved**: Multiple ways to join the community
- **Contact**: Full contact information and location details
- **Admin Panel**: Content management system for authorized users

### 🔧 Technical Features
- **HashRouter**: GitHub Pages compatible routing
- **TypeScript**: Full type safety and better development experience
- **Automated Deployment**: GitHub Actions for continuous deployment
- **SEO Optimized**: Meta tags and structured data
- **Performance Optimized**: Code splitting and lazy loading

## 🌍 Contact Information

**Wharton Alumni AI Studio and Research Center**
- **Address**: 2bis Place de Touraine, 78000 Versailles, France
- **Email**: info@whartonai.studio
- **Phone**: 01 30 21 61 43

## 🚀 Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment
```bash
# Build the project
npm run build

# Commit changes
git add -A
git commit -m "Update: your changes"

# Push to trigger deployment
git push origin main
```

### Deployment Configuration
- **Platform**: GitHub Pages
- **Source**: GitHub Actions workflow
- **Base Path**: `/waais-v2/` (configured in vite.config.ts)
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`

## 🔗 Links

- **Live Website**: [https://cool-machine.github.io/waais-v2/](https://cool-machine.github.io/waais-v2/)
- **GitHub Repository**: [https://github.com/cool-machine/waais-v2](https://github.com/cool-machine/waais-v2)
- **GitHub Actions**: [Deployment Status](https://github.com/cool-machine/waais-v2/actions)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions from the community! Please feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

For major changes, please open an issue first to discuss what you would like to change.

## 🔗 API Endpoints

Once the backend is running, these endpoints are available:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `GET /api/auth/me` - Get current user

### Users & Alumni
- `GET /api/users` - Alumni directory with search/filters
- `PUT /api/users/profile` - Update user profile

### Events
- `GET /api/events` - List events
- `POST /api/events/:id/register` - Register for event

### Startups & Mentorship
- `GET /api/startups` - List startups
- `POST /api/startups/:id/apply` - Apply to startup
- `GET /api/mentorships` - List mentors

## 🚀 Production Deployment

### Backend (Railway/Heroku)
```bash
# Environment variables needed:
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
SENDGRID_API_KEY=your-key
NODE_ENV=production
```

### Frontend (Vercel/Netlify)
```bash
# Build command: npm run build
# Environment variables:
VITE_API_URL=https://your-backend.com/api
```

## 📊 Database Schema

The application uses a comprehensive PostgreSQL schema with:
- **Users** - Authentication and profiles
- **Events** - Event management and registrations
- **Startups** - Startup directory and applications
- **Mentorships** - Mentor/mentee matching
- **Partners** - Strategic partnerships
- **Newsletter** - Subscription management

## 🔧 Development Features

- **Hot Reload** - Both frontend and backend
- **Type Safety** - Full TypeScript coverage
- **Database Migrations** - Prisma automated migrations
- **Email Testing** - SendGrid integration
- **Error Handling** - Comprehensive error boundaries
- **Authentication** - JWT-based secure auth
- **Rate Limiting** - API protection
- **Input Validation** - Zod schema validation

## 💻 Development Notes

- Full-stack TypeScript application
- Production-ready with proper error handling
- Scalable architecture with clean separation of concerns
- Email functionality via SendGrid
- Database migrations and seeding included
- Admin dashboard for content management

## 🎯 From Prototype to Production

This application has evolved from a static demo to a **production-ready full-stack platform** featuring:

✅ **Real Database** - PostgreSQL with proper relationships  
✅ **User Authentication** - Secure JWT-based auth system  
✅ **Email Integration** - Transactional emails via SendGrid  
✅ **Admin Dashboard** - Full content management capabilities  
✅ **API Layer** - RESTful APIs with proper validation  
✅ **Error Handling** - Comprehensive error boundaries  
✅ **Type Safety** - Full TypeScript coverage  

Perfect for demonstrating full-stack development capabilities to employers!

## 📞 Support

For technical issues or questions:
- 📧 Email: info@whartonai.studio
- 📝 GitHub Issues: [Report a bug](https://github.com/cool-machine/waais-v2/issues)
- 📖 Documentation: [SETUP.md](SETUP.md)

---

*Built with ❤️ by the Wharton Alumni AI Studio and Research Center team*  
*Transformed from prototype to production-ready platform* 🚀