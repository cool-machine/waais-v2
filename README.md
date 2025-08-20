# Wharton Alumni AI Studio and Research Center

[![Deploy Status](https://github.com/cool-machine/waais-v2/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/cool-machine/waais-v2/actions)
[![Live Site](https://img.shields.io/badge/Live%20Site-GitHub%20Pages-blue)](https://cool-machine.github.io/waais-v2/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.3-blue)](https://tailwindcss.com/)

## 🎯 About

The **Wharton Alumni AI Studio and Research Center** is a dynamic community platform that connects Wharton School alumni to foster innovation, knowledge sharing, and collaboration in the artificial intelligence space. Our mission is to create a vibrant ecosystem where experienced professionals can mentor startups, share insights, and drive AI innovation forward.

**Live Website**: [https://cool-machine.github.io/waais-v2/](https://cool-machine.github.io/waais-v2/)

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

- **Frontend Framework**: React 18.2.0 with TypeScript
- **Routing**: React Router DOM with HashRouter for GitHub Pages compatibility
- **Styling**: Tailwind CSS for responsive design
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React for consistent iconography
- **Deployment**: GitHub Pages with automated CI/CD
- **Build Tool**: Vite for fast development and optimized builds

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cool-machine/waais-v2.git
   cd waais-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev -- --port 5174
   ```
   
   The site will be available at `http://localhost:5174/waais-v2/`

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
waais_v2/
├── public/                 # Static assets
│   ├── index.html         # Main HTML template
│   ├── wharton.svg        # Logo (SVG)
│   ├── wharton.png        # Logo (PNG)
│   └── 404.html          # GitHub Pages 404 handler
├── src/
│   ├── components/        # Reusable React components
│   │   ├── AnimatedCounter.tsx
│   │   ├── EventCard.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   └── ...
│   ├── pages/            # Page components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── ...
│   ├── data/             # Static data files
│   │   ├── events.ts
│   │   ├── partners.ts
│   │   ├── startups.ts
│   │   └── team.ts
│   ├── admin/            # Admin panel components
│   └── types.ts          # TypeScript type definitions
├── .github/workflows/    # GitHub Actions
└── dist/                # Built files (generated)
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

## 💻 Development Notes

- This is a test/staging version of the main WAAIS website
- Uses HashRouter for GitHub Pages compatibility  
- All changes are automatically deployed via GitHub Actions
- TypeScript strict mode enabled for better code quality
- Tailwind CSS configured with custom color scheme

## 📞 Support

For technical issues or questions about the platform, please contact us at info@whartonai.studio or open an issue on GitHub.

---

*Built with ❤️ by the Wharton Alumni AI Studio and Research Center team*