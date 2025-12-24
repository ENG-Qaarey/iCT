# iCT-Girls

Empowering girls through technology with a modern React + Vite web app.

## Features
- Auth flows: signup, login, profile editing with avatar upload and local storage persistence.
- Responsive layout with top/bottom navigation, animated UI, and shadcn-inspired components.
- Pages: Splash, Home (personalized greeting), Dashboard, Profile, Contact, Settings, Not Found.

## Tech Stack
- React + TypeScript (Vite)
- Tailwind CSS
- framer-motion
- shadcn/ui component patterns
- @tanstack/react-query

## Getting Started
```sh
npm install
npm run dev
```
App runs at http://localhost:5173 by default.

## Scripts
- dev: start Vite dev server
- build: production build
- preview: preview production build locally

## Project Structure (key paths)
- src/App.tsx – routing setup and providers
- src/pages/ – page components
- src/components/ – UI elements and layouts
- src/hooks/use-user.tsx – user state (name/email/avatar) with localStorage persistence
- src/assets/ict-girls-logo.png – app logo

## Deployment
Build and serve the `dist` output from `npm run build` on any static host (e.g., Netlify, Vercel, S3 + CloudFront).

## License
MIT
