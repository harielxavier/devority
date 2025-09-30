# Netlify Deployment Guide for Devority

## Prerequisites

### 1. Database Setup (REQUIRED)
Since Netlify doesn't provide database hosting, you need a cloud database. Options:

#### Option A: Supabase (Recommended - Already using for auth)
1. Go to your Supabase project dashboard
2. Navigate to Settings → Database
3. Copy the connection string (use the "Connection pooling" URL for production)
4. Use the format: `postgresql://[user]:[password]@[host]:[port]/[database]?pgbouncer=true&connection_limit=1`

#### Option B: Neon (Free Postgres)
1. Create account at https://neon.tech
2. Create a new database
3. Copy the connection string

#### Option C: Railway or Render
1. Create a Postgres database
2. Copy the connection string

### 2. Update Database URL
Update your Prisma schema to use the production database URL through environment variables.

## Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

### Step 2: Import to Netlify
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account
4. Select the Devority repository

### Step 3: Configure Build Settings
Netlify should auto-detect Next.js, but verify:
- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Functions directory:** `netlify/functions` (auto-configured)

### Step 4: Set Environment Variables
In Netlify Dashboard → Site Settings → Environment Variables, add:

```env
# Database (REQUIRED - Use your cloud database URL)
DATABASE_URL="postgresql://user:password@host:5432/database?pgbouncer=true"

# Supabase (Already have these)
NEXT_PUBLIC_SUPABASE_URL="https://ergczmkkjfquppwxenrx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Email (Resend)
RESEND_API_KEY="re_cHTJ82Ub_HrbyXziz8cjFG4VKJzTnmzsV"
RESEND_FROM_EMAIL="noreply@send.updates"
BUSINESS_EMAIL="hi@devority.io"

# Optional: Node Version
NODE_VERSION="18"
```

### Step 5: Deploy
1. Click "Deploy site"
2. Wait for the build to complete (3-5 minutes)
3. Your site will be live at `https://[your-site-name].netlify.app`

## Important Configuration Changes

### 1. Update Middleware (Already Fixed)
The middleware has been simplified to work with Netlify's serverless functions.

### 2. API Routes
All API routes in `/app/api` will automatically become Netlify Functions.

### 3. Image Optimization
Next.js Image component works with Netlify's image CDN automatically.

## Post-Deployment Checklist

- [ ] Test homepage loads correctly
- [ ] Test admin login at `/admin/login`
- [ ] Verify database connection (admin dashboard)
- [ ] Test blog CRUD operations
- [ ] Check contact form submissions
- [ ] Verify email sending (Resend)
- [ ] Test all API routes

## Custom Domain Setup

1. In Netlify → Domain settings
2. Add custom domain: `devority.io`
3. Follow DNS configuration instructions
4. Enable HTTPS (automatic with Netlify)

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Ensure all environment variables are set
- Verify database connection string

### 500 Errors
- Check Function logs in Netlify dashboard
- Verify DATABASE_URL is correct
- Check Prisma schema matches database

### Slow Performance
- Enable Netlify's Edge Functions for faster responses
- Use ISR (Incremental Static Regeneration) for blog posts
- Implement caching strategies

## Performance Optimizations

### Add to next.config.js:
```javascript
module.exports = {
  images: {
    domains: ['images.unsplash.com', 'your-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
  swcMinify: true,
  experimental: {
    runtime: 'edge', // For edge functions
  }
}
```

## Monitoring

1. Set up Netlify Analytics (paid feature)
2. Use Netlify's built-in monitoring
3. Set up alerts for failures

## Continuous Deployment

Every push to `main` branch will trigger automatic deployment.

To preview pull requests:
1. Enable Deploy Previews in Netlify
2. Each PR will get a unique preview URL

## Cost Considerations

### Free Tier Limits:
- 100GB bandwidth/month
- 300 build minutes/month
- 125k serverless function requests/month

### For Production:
Consider Netlify Pro ($19/month) for:
- More build minutes
- Password protection
- Advanced analytics
- Priority support

## Migration from Local Development

### Before deploying:
1. ✅ Database migrated to cloud provider
2. ✅ Environment variables configured
3. ✅ Build tested locally: `npm run build`
4. ✅ No hardcoded localhost URLs
5. ✅ Middleware simplified for edge runtime

## Contact

For deployment issues, check:
- Netlify Support Forums
- Next.js on Netlify docs: https://docs.netlify.com/frameworks/next-js/
- Prisma deployment guides: https://www.prisma.io/docs/guides/deployment/deployment