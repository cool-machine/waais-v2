# Contributing to WAAIS v2

## Development Workflow

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Git

### Setup
```bash
git clone https://github.com/cool-machine/waais-v2.git
cd waais-v2
./scripts/setup.sh
```

### Code Standards

#### TypeScript
- Use strict TypeScript configuration
- Prefer explicit types over `any`
- Use interfaces over type aliases for object types

#### Code Style
- Use Prettier for formatting: `npm run format`
- Use ESLint for linting: `npm run lint`
- Follow conventional commits

#### Git Workflow
1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m "feat: add new feature"`
3. Push branch: `git push origin feature/your-feature`
4. Create pull request

### Development Commands

#### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run type-check   # TypeScript type checking
```

#### Backend
```bash
cd server
npm run dev          # Start development server
npm run build        # Build for production
npm run migrate      # Run database migrations
npm run seed         # Seed database
npm run db:studio    # Open Prisma Studio
```

### Testing
- Write unit tests for new features
- Run tests: `npm test`
- Maintain high test coverage

### Database Changes
1. Modify `server/prisma/schema.prisma`
2. Run `npm run migrate`
3. Update seed data if needed

### API Development
- Follow RESTful conventions
- Use Zod for input validation
- Include proper error handling
- Document new endpoints

### Component Development
- Use TypeScript interfaces for props
- Follow existing component patterns
- Use React hooks appropriately
- Include proper accessibility

### Pull Request Guidelines
- Write clear commit messages
- Include tests for new features
- Update documentation as needed
- Ensure all checks pass

### Code Review
- Review for code quality
- Check for security issues
- Verify functionality
- Ensure proper documentation