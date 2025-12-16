# Vercel Deployment Checklist

Use this checklist before deploying to Vercel.

## Pre-Deployment

### Frontend (Vite) ✓

- [ ] All dependencies installed: `cd code/front && npm install`
- [ ] Frontend builds successfully: `npm run build`
- [ ] Build output directory is correct (check `vite.config.ts` → `outDir: 'build'`)
- [ ] No TypeScript errors: `npm run build` completes without errors
- [ ] Environment variables configured (if needed)
- [ ] API calls use correct base URL (default should work: `/api`)
- [ ] Test locally: `npm run dev` works on http://localhost:3000

### Backend (Express) ✓

- [ ] All dependencies installed: `cd code/back && npm install`
- [ ] Prisma client generated: `npm run prisma:generate`
- [ ] Database schema is up to date (`code/back/prisma/schema.prisma`)
- [ ] All migrations are created: `npm run prisma:migrate`
- [ ] No TypeScript/linting errors
- [ ] Backend starts locally: `npm run dev`
- [ ] Test API endpoints work locally

### Vercel Configuration ✓

- [ ] `vercel.json` exists in repository root
- [ ] `package.json` exists in repository root with build scripts
- [ ] `.vercelignore` exists and excludes unnecessary files
- [ ] GitHub repository is set up and pushed to remote
- [ ] Repository is linked to Vercel project

### Environment Variables ✓

**Backend needs:**
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `NODE_ENV` - Set to "production"
- [ ] Any other secrets (API keys, JWT secrets, etc.)

**Frontend needs (if applicable):**
- [ ] `VITE_API_BASE_URL` - Only if frontend needs explicit API URL

**Configured in:**
- [ ] Vercel Dashboard → Project Settings → Environment Variables
- [ ] Variables set for Production environment

### Database ✓

- [ ] Database is accessible from Vercel (no firewall blocking)
- [ ] PostgreSQL version is compatible
- [ ] All tables and migrations are applied
- [ ] Connection pooling configured (recommended for serverless)
- [ ] Database backups are enabled

## Deployment

### Via Vercel Dashboard

- [ ] Go to https://vercel.com/dashboard
- [ ] Create new project or open existing
- [ ] Select repository and root directory (project root, not subdirectories)
- [ ] Add environment variables
- [ ] Click "Deploy"
- [ ] Wait for build to complete (watch logs)
- [ ] Test deployed URL

### Via Vercel CLI

```bash
cd /path/to/project/root
vercel --prod
```

- [ ] CLI installation successful: `vercel login`
- [ ] Correct project selected
- [ ] Environment variables loaded
- [ ] Production deployment confirmed

## Post-Deployment

### Testing ✓

- [ ] Frontend loads without errors
- [ ] Check browser console for errors (F12)
- [ ] Navigate between pages (test SPA routing)
- [ ] Test API calls to backend
- [ ] Check network tab - verify `/api/*` calls work
- [ ] Mobile responsive design works

### Backend Verification ✓

- [ ] API endpoints respond correctly
- [ ] Database queries work
- [ ] CORS headers are correct (if frontend is on different domain)
- [ ] Authentication/authorization works
- [ ] Error handling returns proper status codes

### Performance ✓

- [ ] Frontend loads in reasonable time (< 3s)
- [ ] API responses are fast (< 1s typically)
- [ ] No 5xx server errors in logs
- [ ] Memory usage is reasonable
- [ ] Cold start time is acceptable

### Monitoring ✓

- [ ] Check Vercel Dashboard → Deployments
- [ ] Review function execution times
- [ ] Monitor error rates
- [ ] Set up alerts if available

## Common Issues

### Build Fails

**Check:**
- [ ] All files are committed to Git
- [ ] Node modules are not in `.vercelignore`
- [ ] Build scripts in `package.json` are correct
- [ ] All dependencies are installed locally first
- [ ] No hardcoded paths (use relative paths)

### API Returns 404

**Check:**
- [ ] API routes in backend start with `/api/`
- [ ] `vercel.json` routes are configured correctly
- [ ] Backend is actually running (check logs)
- [ ] CORS is configured if frontend is on same domain

### Database Connection Fails

**Check:**
- [ ] `DATABASE_URL` environment variable is set
- [ ] Database is accessible from Vercel's IP range
- [ ] Connection string format is correct for your DB provider
- [ ] Database user has correct permissions
- [ ] SSL mode is configured correctly (if needed)

### Frontend Shows Blank Page

**Check:**
- [ ] Vite build completed successfully
- [ ] `index.html` is in the output directory
- [ ] Browser console for JavaScript errors
- [ ] Vercel logs for build errors
- [ ] SPA routing fallback in `vercel.json`

## Rollback Plan

If deployment has issues:

1. Go to Vercel Dashboard → Project → Deployments
2. Find last known good deployment
3. Click "..." → "Promote to Production"
4. Test thoroughly
5. Fix issues locally and redeploy

## After First Deployment

- [ ] Update documentation with deployed URL
- [ ] Share URL with team members
- [ ] Set up monitoring/alerting
- [ ] Configure custom domain (optional)
- [ ] Enable auto-deployments from main branch
- [ ] Test all major features end-to-end

---

**Deployment Date**: _________________
**Deployed By**: _________________
**Notes**: _________________________________________________________________________

