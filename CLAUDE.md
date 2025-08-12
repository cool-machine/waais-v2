# CLAUDE.md - Wharton Alumni AI Studio and Research Center (V2)

## Project Overview
This is the V2 version of the Wharton Alumni AI Studio and Research Center website, deployed to GitHub Pages at https://cool-machine.github.io/waais-v2/

## Contact Information (DO NOT CHANGE)
- **Address**: 2bis Place de Touraine, 78000 Versailles, France
- **Email**: info@whartonai.studio  
- **Phone**: 01 30 21 61 43
- **Organization**: Wharton Alumni AI Studio and Research Center (NOT "The Wharton Club of the United Kingdom")

## GitHub Repository
- **Repo**: https://github.com/cool-machine/waais-v2
- **Live Site**: https://cool-machine.github.io/waais-v2/
- **Deployment**: GitHub Pages with GitHub Actions

## Development Setup
- **Local Dev Server**: `npm run dev -- --port 5174` (runs on http://localhost:5174/waais-v2/)
- **Build**: `npm run build`
- **Test Build**: Check `dist/` folder after build

## Key Configuration Files

### 1. vite.config.ts
```typescript
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: '/waais-v2/',  // CRITICAL for GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
```

### 2. src/main.tsx (Router Configuration)
```typescript
// Uses HashRouter for GitHub Pages compatibility
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>  {/* NOT BrowserRouter */}
      <App />
    </HashRouter>
  </React.StrictMode>
);
```

### 3. GitHub Actions (.github/workflows/deploy.yml)
- Automatically deploys on push to main branch
- Uses Node.js 18 and npm ci
- Builds and uploads to GitHub Pages

## Differences from Original waais
1. **Base Path**: Uses '/waais-v2/' instead of '/waais/'
2. **Repository**: Separate repo (waais-v2) for testing deployments
3. **Organization Name**: Already updated throughout to remove UK references
4. **Favicon**: Updated to use wharton.svg with proper paths

## TypeScript Configuration
- **tsconfig.json**: Main TypeScript config with strict settings
- **tsconfig.node.json**: Node-specific config
- Both files are REQUIRED for successful builds

## Component Fixes Applied

### AnimatedCounter Component
```typescript
interface AnimatedCounterProps {
  end: number;        // NOT value
  title: string;      // NOT label  
  icon: React.ReactElement;
}
```

### AuthContext
```typescript
interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;  // ADDED this property
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
```

### AdminLayout Icons
```typescript
// CHANGED: Handshake icon not available in lucide-react
import { Building2 } from 'lucide-react';  // Use Building2 instead
```

## Router Evolution
1. **First attempt**: BrowserRouter with basename="/waais-v2"
2. **Final solution**: HashRouter (no basename needed)
3. **Reason**: GitHub Pages serves static files; HashRouter works better for SPAs

## Asset Management
- **Favicon**: `public/wharton.svg` and `public/wharton.png` (both exist)
- **404 Page**: `public/404.html` with proper redirect logic for '/waais-v2/' base path
- **Images**: All using Unsplash URLs in components

## Build Process Issues & Solutions

### Common Problems:
1. **TypeScript Errors**: Missing tsconfig.json was the main issue
2. **Icon Import Errors**: Use Building2 instead of Handshake from lucide-react
3. **Router Issues**: Tried BrowserRouter first, then switched to HashRouter
4. **Asset Paths**: Base path must be '/waais-v2/' in vite.config.ts

### TypeScript Configuration Issues Fixed:
```json
{
  "compilerOptions": {
    "noUnusedLocals": false,     // Set to false to avoid warnings
    "noUnusedParameters": false,  // Set to false to avoid warnings
    // ... other settings
  }
}
```

## Deployment History
1. **Initial Deployment**: Failed due to missing TypeScript configs
2. **Second Deployment**: Failed due to component interface mismatches
3. **Third Deployment**: Failed due to router configuration
4. **Final Deployment**: ✅ Success with HashRouter and all fixes

## Contact Page Location
- **File**: `src/pages/ContactPage.tsx`
- Contains all contact information in structured format
- Uses Hero component and SectionHeading

## Homepage Branding
- **File**: `src/pages/HomePage.tsx`
- Title updated to remove redundant "Affinity Group AI Studio" text
- Clean branding: "Wharton Alumni AI Studio and Research Center"

## Deployment Checklist
1. ✅ tsconfig.json and tsconfig.node.json exist
2. ✅ vite.config.ts has base: '/waais-v2/'
3. ✅ HashRouter used in main.tsx (NOT BrowserRouter)
4. ✅ GitHub Actions workflow configured
5. ✅ GitHub Pages enabled with workflow source
6. ✅ All TypeScript errors resolved
7. ✅ AnimatedCounter props interface fixed
8. ✅ AuthContext user property added
9. ✅ Handshake icon replaced with Building2

## Important Commands
```bash
# Development
npm install
npm run dev -- --port 5174

# Build and Deploy
npm run build
git add -A
git commit -m "Your message"
git push origin main  # Triggers automatic deployment

# Check deployment status
gh run list --repo cool-machine/waais-v2 --limit 3
```

## URL Structure (HashRouter)
- Homepage: https://cool-machine.github.io/waais-v2/
- Contact: https://cool-machine.github.io/waais-v2/#/contact
- About: https://cool-machine.github.io/waais-v2/#/about
- Events: https://cool-machine.github.io/waais-v2/#/events

## Development Notes
- This directory was created as a copy of the original waais
- Used for testing GitHub Pages deployment configurations
- Contains the same functionality but with proper TypeScript setup from the start
- Successfully deployed after fixing all configuration issues

## Critical Notes for Future Modifications
1. **NEVER** change the contact information without explicit approval
2. **ALWAYS** use HashRouter for GitHub Pages compatibility  
3. **ALWAYS** maintain base: '/waais-v2/' in vite.config.ts
4. **ALWAYS** test locally with `npm run build` before pushing
5. **NEVER** commit node_modules or dist folder to git (use .gitignore)
6. This is the "test" version - main production should use the original waais directory
7. If making breaking changes, test here first before applying to main waais

## Deployment Success Timeline
- **Started**: August 12, 2025 at 11:28 AM
- **Multiple Failures**: TypeScript, Router, and Component issues
- **Final Success**: August 12, 2025 at 1:28 PM  
- **Total Time**: ~2 hours to resolve all GitHub Pages compatibility issues

## Last Updated
August 12, 2025 - Fully deployed and functional on GitHub Pages as test environment