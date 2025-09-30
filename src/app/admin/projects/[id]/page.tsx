import { Suspense } from 'react'
import { redirect, notFound } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { ProjectDetails } from '@/components/admin/project-details'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function ProjectDetailPage({
  params
}: {
  params: { id: string }
}) {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect('/admin/login')

  try {
    const [project, users, contacts] = await Promise.all([
      db.project.findUnique({
        where: { id: params.id },
        include: {
          contact: true,
          manager: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          tasks: {
            include: {
              assignee: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            },
            orderBy: { createdAt: 'desc' }
          },
          revenues: {
            orderBy: { createdAt: 'desc' }
          },
          metrics: {
            orderBy: { recordedAt: 'desc' },
            take: 10
          },
          reports: {
            orderBy: { generatedAt: 'desc' }
          }
        }
      }),
      // Get users for assignments
      db.user.findMany({
        where: {
          role: { in: ['ADMIN', 'EDITOR'] }
        },
        select: {
          id: true,
          name: true,
          email: true
        },
        orderBy: { name: 'asc' }
      }),
      // Get contacts for reference
      db.contact.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          company: true,
          industry: true
        },
        orderBy: { name: 'asc' }
      })
    ])

    if (!project) {
      notFound()
    }

    // Convert Decimal values to numbers for TypeScript compatibility
    const projectData = {
      ...project,
      budget: project.budget ? Number(project.budget) : null,
      actualCost: project.actualCost ? Number(project.actualCost) : null,
      revenues: project.revenues.map(revenue => ({
        ...revenue,
        amount: Number(revenue.amount)
      }))
    }

    return (
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <ProjectDetails 
            project={projectData as any}
            users={users}
            contacts={contacts}
          />
        </Suspense>
      </main>
    )
  } catch (error) {
    console.error('Project detail page error:', error)
    notFound()
  }
}