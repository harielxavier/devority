import { db } from '@/lib/db'
import { env } from '@/lib/env'

export async function getBusinessEmail(): Promise<string> {
  try {
    const setting = await db.appSetting.findUnique({ where: { key: 'BUSINESS_EMAIL' } })
    if (setting?.value) return setting.value
  } catch (e) {
    // If the table doesn't exist or DB not ready, fall back to env
  }
  return env.BUSINESS_EMAIL || 'contact@send.updates'
}

export async function setBusinessEmail(value: string): Promise<void> {
  await db.appSetting.upsert({
    where: { key: 'BUSINESS_EMAIL' },
    update: { value },
    create: { key: 'BUSINESS_EMAIL', value },
  })
}