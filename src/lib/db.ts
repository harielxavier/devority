import { PrismaClient } from '@prisma/client'
import { env } from './env'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Helper functions for common operations
export const dbHelpers = {
  // Contact operations
  async createContact(data: {
    name: string
    email: string
    phone?: string
    company?: string
    message: string
    source?: string
  }) {
    return db.contact.create({ data })
  },

  async getContacts(status?: string) {
    return db.contact.findMany({
      where: status ? { status: status as any } : undefined,
      orderBy: { createdAt: 'desc' },
    })
  },

  // Blog operations
  async getPublishedPosts() {
    return db.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
    })
  },

  async getPostBySlug(slug: string) {
    return db.blogPost.findUnique({
      where: { slug },
    })
  },

  // Analytics operations
  async trackEvent(data: {
    event: string
    page?: string
    data?: any
    userAgent?: string
    ip?: string
  }) {
    return db.analytics.create({ data })
  },

  // User operations
  async getUserByEmail(email: string) {
    return db.user.findUnique({
      where: { email },
    })
  },
}
