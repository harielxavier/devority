import { z } from 'zod'

const envSchema = z.object({
  // App Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // URLs
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  
  // Email Configuration
  RESEND_API_KEY: z.string().min(1, 'Resend API key is required'),
  RESEND_FROM_EMAIL: z.string().email('Invalid from email address'),
  BUSINESS_EMAIL: z.string().email('Invalid business email address').optional(),
  
  // Database (when added)
  DATABASE_URL: z.string().url().optional(),
  
  // Authentication (Supabase)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL').optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  
  // Analytics
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  
  // Monitoring
  SENTRY_DSN: z.string().url().optional(),
  
  // Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.string().transform(val => val === 'true').default('false'),
})

type Env = z.infer<typeof envSchema>

// Validate environment variables
function validateEnv(): Env {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join('\n')
      throw new Error(`Environment validation failed:\n${missingVars}`)
    }
    throw error
  }
}

// Export validated environment variables
export const env = validateEnv()

// Type-safe environment access
export function getEnvVar(key: keyof Env): string | undefined {
  return env[key] as string | undefined
}

// Check if we're in production
export const isProduction = env.NODE_ENV === 'production'
export const isDevelopment = env.NODE_ENV === 'development'
export const isTest = env.NODE_ENV === 'test'
