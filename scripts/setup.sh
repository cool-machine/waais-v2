#!/bin/bash

# WAAIS v2 Setup Script
# This script automates the setup process for the WAAIS application

set -e  # Exit on any error

echo "🚀 Starting WAAIS v2 Setup..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ and try again."
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm and try again."
        exit 1
    fi
    
    # Check PostgreSQL
    if ! command -v psql &> /dev/null; then
        print_warning "PostgreSQL client not found. Please ensure PostgreSQL is installed and running."
    fi
    
    print_success "Prerequisites check completed!"
}

# Setup backend
setup_backend() {
    print_status "Setting up backend..."
    
    cd server
    
    # Install dependencies
    print_status "Installing backend dependencies..."
    npm install
    
    # Copy environment file if it doesn't exist
    if [ ! -f .env ]; then
        print_status "Creating environment file..."
        cp .env.example .env
        print_warning "Please edit server/.env with your configuration before proceeding!"
        print_warning "Required: DATABASE_URL, JWT_SECRET, SENDGRID_API_KEY"
    fi
    
    # Generate Prisma client
    print_status "Generating Prisma client..."
    npm run generate
    
    print_success "Backend setup completed!"
    cd ..
}

# Setup frontend
setup_frontend() {
    print_status "Setting up frontend..."
    
    # Install dependencies
    print_status "Installing frontend dependencies..."
    npm install
    
    # Copy environment file if it doesn't exist
    if [ ! -f .env ]; then
        print_status "Creating frontend environment file..."
        cp .env.example .env
    fi
    
    print_success "Frontend setup completed!"
}

# Database setup
setup_database() {
    print_status "Setting up database..."
    
    cd server
    
    # Run migrations
    print_status "Running database migrations..."
    if npm run migrate; then
        print_success "Database migrations completed!"
    else
        print_error "Database migration failed. Please check your DATABASE_URL in server/.env"
        cd ..
        return 1
    fi
    
    # Seed database
    print_status "Seeding database with sample data..."
    if npm run seed; then
        print_success "Database seeding completed!"
    else
        print_warning "Database seeding failed. You can run 'npm run seed' manually later."
    fi
    
    cd ..
}

# Start development servers
start_dev_servers() {
    print_status "Starting development servers..."
    
    # Check if user wants to start servers
    read -p "Do you want to start the development servers now? (y/n): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Starting backend server..."
        cd server
        npm run dev &
        BACKEND_PID=$!
        cd ..
        
        sleep 3  # Wait for backend to start
        
        print_status "Starting frontend server..."
        npm run dev &
        FRONTEND_PID=$!
        
        print_success "Development servers started!"
        print_status "Backend: http://localhost:5000"
        print_status "Frontend: http://localhost:5174"
        print_status "Press Ctrl+C to stop both servers"
        
        # Wait for user to stop servers
        trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
        wait
    fi
}

# Main setup function
main() {
    echo "==============================================="
    echo "🎯 WAAIS v2 - Full-Stack Setup Script"
    echo "==============================================="
    echo
    
    check_prerequisites
    echo
    
    setup_backend
    echo
    
    setup_frontend
    echo
    
    # Ask if user wants to setup database
    read -p "Do you want to setup the database now? (requires configured .env) (y/n): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        setup_database
        echo
    else
        print_warning "Skipping database setup. Run the following commands manually:"
        print_warning "cd server && npm run migrate && npm run seed"
        echo
    fi
    
    echo "==============================================="
    print_success "🎉 Setup completed successfully!"
    echo "==============================================="
    echo
    print_status "Next steps:"
    echo "1. Configure your environment files (.env)"
    echo "2. Setup your database (if not done already)"
    echo "3. Configure SendGrid for email functionality"
    echo "4. Start development: npm run dev (in both frontend and server directories)"
    echo
    print_status "Documentation:"
    echo "📖 Full setup guide: SETUP.md"
    echo "🌐 Frontend: http://localhost:5174"
    echo "🔧 Backend API: http://localhost:5000/api"
    echo "📊 Admin Panel: http://localhost:5174/admin/login"
    echo
    
    start_dev_servers
}

# Run main function
main "$@"