import { db } from '@/lib/db'

export async function allowRequest(key: string, limit = 5, windowMs = 60_000): Promise<boolean> {
  const now = Date.now()
  const windowStart = new Date(Math.floor(now / windowMs) * windowMs)

  const existing = await db.rateLimit.findUnique({
    where: { key_windowStart: { key, windowStart } },
  })

  if (!existing) {
    await db.rateLimit.create({ data: { key, windowStart, count: 1 } })
    return true
  }

  const updated = await db.rateLimit.update({
    where: { key_windowStart: { key, windowStart } },
    data: { count: { increment: 1 } },
  })

  return updated.count <= limit
}