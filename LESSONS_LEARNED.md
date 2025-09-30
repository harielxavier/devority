# Lessons Learned

## Database Connection Issues After Restart (2024)

### Problem
After restarting the development server, the admin panel would throw the following error:
```
Invalid `prisma.blogPost.count()` invocation:
Cannot fetch data from service: fetch failed
```

### Root Cause
1. **Prisma Client needs regeneration** after server restarts
2. **Prisma Postgres database** may not be running
3. **Database schema** may be out of sync

### Solution Implemented

#### 1. Automatic Prisma Setup in package.json
Added pre-hooks to automatically handle Prisma setup:
```json
{
  "scripts": {
    "predev": "prisma generate && prisma db push",
    "dev": "next dev",
    "dev:full": "./scripts/start-dev.sh",
    "prebuild": "prisma generate"
  }
}
```

#### 2. Created Comprehensive Startup Script
Created `scripts/start-dev.sh` that:
- Checks if Prisma Postgres database is running (port 51213)
- Starts the database if needed
- Generates Prisma client
- Pushes database schema
- Starts Next.js dev server

#### 3. Usage
Now you can start the development environment in two ways:

**Quick start (assumes database is running):**
```bash
npm run dev
```

**Full start (ensures everything is properly initialized):**
```bash
npm run dev:full
```

### Key Takeaways
1. **Always regenerate Prisma client** after major changes or restarts
2. **Ensure database is running** before starting the application
3. **Use pre-hooks** in package.json to automate repetitive tasks
4. **Create startup scripts** for complex development environments

### Prevention
- Use `npm run dev:full` when starting work for the day
- Use `npm run dev` for quick restarts during development
- The `predev` hook now automatically handles Prisma setup

This ensures the development environment is always properly initialized and prevents database connection errors.