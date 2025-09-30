# Netlify Deployment Checklist

## ✅ Completed Setup

- [x] Created `netlify.toml` configuration file
- [x] Added Netlify plugin for Next.js
- [x] Configured build settings
- [x] Set up proper build scripts in package.json
- [x] Created `.env.production` template
- [x] Updated `next.config.js` for production
- [x] Fixed middleware for serverless environment
- [x] Removed hardcoded localhost URLs

## 🔄 Required Actions Before Deployment

### 1. Database Setup
- [ ] Create cloud database (Supabase/Neon/Railway)
- [ ] Get production DATABASE_URL
- [ ] Run database migrations: `npx prisma migrate deploy`

### 2. Environment Variables in Netlify
Go to Netlify Dashboard → Site Settings → Environment Variables and add:

#### Required Variables:
```
DATABASE_URL = [Your cloud database URL]
NEXT_PUBLIC_SUPABASE_URL = https://ergczmkkjfquppwxenrx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = [Your anon key]
SUPABASE_SERVICE_ROLE_KEY = [Your service role key]
RESEND_API_KEY = re_cHTJ82Ub_HrbyXziz8cjFG4VKJzTnmzsV
RESEND_FROM_EMAIL = noreply@send.updates
BUSINESS_EMAIL = hi@devority.io
NEXT_PUBLIC_SITE_URL = https://[your-site].netlify.app
NODE_VERSION = 18
```

### 3. Git Repository
- [ ] Commit all changes: `git add . && git commit -m "Prepare for Netlify deployment"`
- [ ] Push to GitHub: `git push origin main`

### 4. Domain Setup (Optional)
- [ ] Add custom domain in Netlify settings
- [ ] Configure DNS records
- [ ] Enable HTTPS (automatic)

## 🚀 Deployment Steps

1. **Login to Netlify**
   - Go to https://app.netlify.com
   - Sign in with GitHub

2. **Create New Site**
   - Click "Add new site"
   - Select "Import an existing project"
   - Choose GitHub
   - Select your Devority repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: (leave empty, auto-detected)

4. **Add Environment Variables**
   - Click "Show advanced"
   - Add all variables from section 2 above

5. **Deploy Site**
   - Click "Deploy site"
   - Wait 3-5 minutes for build

## 🧪 Post-Deployment Testing

Test these features after deployment:

- [ ] Homepage loads: https://[your-site].netlify.app
- [ ] Admin login works: /admin/login
- [ ] Database connection: Check admin dashboard
- [ ] Blog CRUD operations
- [ ] Contact form submissions
- [ ] Email sending (Resend)
- [ ] Image loading
- [ ] Mobile responsiveness

## 🔧 Troubleshooting

### Build Fails
```bash
# Check locally first
npm run build
```

### Database Connection Issues
- Verify DATABASE_URL format
- Check if database accepts connections from Netlify IPs
- Use connection pooling URL if available

### 500 Errors
- Check Netlify Function logs
- Verify all environment variables are set
- Check Prisma client generation in build

### Performance Issues
- Enable caching headers
- Use Next.js ISR for blog posts
- Optimize images with Next/Image

## 📊 Monitoring Setup

1. **Netlify Analytics** (Paid)
   - Real user metrics
   - Web vitals tracking

2. **Error Tracking**
   - Set up Sentry (optional)
   - Check Netlify function logs

3. **Uptime Monitoring**
   - Use Netlify's built-in monitoring
   - Set up alerts for downtime

## 🔐 Security Checklist

- [x] Environment variables secured
- [x] CSP headers configured
- [x] XSS protection enabled
- [x] SQL injection prevented (Prisma)
- [ ] Admin area protected
- [ ] Rate limiting on APIs
- [ ] HTTPS enforced

## 📝 Notes

- Free tier: 100GB bandwidth, 300 build mins/month
- Pro tier ($19/month): More features, priority support
- Database costs separate (varies by provider)
- Custom domain requires DNS configuration

## Ready to Deploy?

If all items above are checked, you're ready to deploy to Netlify!