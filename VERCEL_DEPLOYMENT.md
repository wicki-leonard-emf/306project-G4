# Vercel Deployment Guide - SensorHub Project

This document explains how to deploy the SensorHub project (Vite frontend + Express backend) to Vercel.

## Project Structure

```
306project-G4/
├── code/
│   ├── front/          # Vite React frontend (builds to /build)
│   ├── back/           # Express.js Node.js backend
│   └── rpi/            # Raspberry Pi integration (NOT deployed)
├── vercel.json         # Root Vercel configuration
├── package.json        # Root build orchestration
└── .vercelignore       # Files to ignore in deployment
```

## Deployment Architecture

### How it Works

1. **Frontend (Vite)**: Builds to `/code/front/build` (static files)
2. **Backend (Express)**: Runs as Node.js serverless functions
3. **API Routes**: `/api/*` requests are forwarded to the backend
4. **SPA Routing**: All non-API routes serve `index.html` for client-side routing

### URL Mapping

```
vercel-domain.com/             → Static frontend index.html
vercel-domain.com/dashboard    → Frontend SPA routing
vercel-domain.com/api/rooms    → Backend API endpoint
```

## Setup Steps

### 1. Prerequisites

- Vercel account: https://vercel.com
- GitHub repository linked to Vercel
- Environment variables configured (see section below)

### 2. Environment Variables

Configure these in your Vercel project settings:

#### Backend Environment Variables

```
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database
```

**Important**: The `DATABASE_URL` must be the production PostgreSQL connection string from your database provider (e.g., Neon, Railway, Render, etc.)

#### Frontend Environment Variables (if needed)

```
VITE_API_BASE_URL=https://your-vercel-domain.com/api
```

**Note**: If your frontend doesn't need to know the API URL at build time (recommended), skip this.

### 3. Vercel Configuration Files

All configuration is in place:

- **`vercel.json`** (root): Orchestrates frontend and backend builds
- **`package.json`** (root): Handles monorepo build scripts
- **`.vercelignore`**: Excludes unnecessary files from deployment

### 4. Database Migration on Deploy

The backend automatically runs migrations on deployment:

```bash
# In code/back/package.json
"vercel-build": "prisma generate && prisma migrate deploy"
```

Ensure your `code/back/prisma/schema.prisma` is up to date before deploying.

## Deployment Methods

### Option A: Deploy via Vercel Dashboard (Recommended for Team)

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select project root (the repository root, not `code/front` or `code/back`)
5. Configure environment variables
6. Click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
cd /Users/gabriel/Library/CloudStorage/OneDrive-EDUETATFR/EMF/Informatique\ EMF/Troisième\ année/306/306project-G4
vercel

# For production deployment
vercel --prod
```

### Option C: Automatic Deployment

Once linked to GitHub, deployments happen automatically on every push to `main` branch.

## Testing Locally

### Frontend (Development)

```bash
cd code/front
npm install
npm run dev
# Runs on http://localhost:3000
```

### Backend (Development)

```bash
cd code/back
npm install
npm run dev
# Runs on http://localhost:3001 (or configured port)
```

### Test Production Build Locally

```bash
# Build both
npm run build

# Start production server (simulates Vercel)
npm start
```

## Troubleshooting

### Issue: Builds fail with "Cannot find module"

**Solution**: Verify all dependencies are in the correct `package.json`:
- Frontend dependencies in `code/front/package.json`
- Backend dependencies in `code/back/package.json`

### Issue: API endpoints return 404

**Solution**: Check that routes in `vercel.json` are correct:
- Backend routes must start with `/api/`
- Routes pattern: `/api/(.*)` → routes to backend

### Issue: Database migrations fail on deploy

**Solution**:
1. Ensure `DATABASE_URL` environment variable is set
2. Database must be accessible from Vercel (no IP restrictions)
3. Run migrations locally first to test: `cd code/back && npm run prisma:migrate`

### Issue: Frontend returns blank page

**Solution**:
1. Check that Vite build outputted to `build/` directory (confirmed in vite.config.ts)
2. Verify `vercel.json` routes include SPA fallback to `index.html`
3. Check browser console for client-side errors

### Issue: API CORS errors

**Solution**: Add CORS headers in backend (`code/back/src/index.js`):

```javascript
import cors from 'cors';
app.use(cors());
```

## Performance Tips

1. **Minimize bundle size**: Check frontend bundle with `npm run build` and analyze
2. **API optimization**: Cache database queries where possible
3. **Database**: Consider connection pooling for PostgreSQL
4. **Images**: Use Next Image-like optimization or serve from CDN

## Monitoring

After deployment, monitor via Vercel dashboard:
- Function duration (backend execution time)
- Error rates
- Status codes
- Build times

## Rollback

To rollback to a previous deployment:

1. Go to Vercel dashboard
2. Select your project
3. Go to "Deployments" tab
4. Click "Promote to Production" on a previous deployment

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Express on Vercel](https://vercel.com/guides/using-express-with-vercel)
- [Prisma on Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

---

**Last Updated**: 2025-12-16
**Project**: Module 306 - SensorHub
**Team**: EMF CFC Apprentices
