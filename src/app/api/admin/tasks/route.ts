import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { db } from '@/lib/db';
import { TaskStatus, Priority } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const projectId = url.searchParams.get('projectId');
    const assigneeId = url.searchParams.get('assigneeId');

    const whereClause: any = {};
    if (projectId) {
      whereClause.projectId = projectId;
    }
    if (assigneeId) {
      whereClause.assigneeId = assigneeId;
    }

    const tasks = await db.projectTask.findMany({
      where: whereClause,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            contact: {
              select: {
                name: true,
                company: true
              }
            }
          }
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      projectId,
      assigneeId,
      priority = Priority.MEDIUM,
      status = TaskStatus.TODO,
      dueDate,
      estimatedHours
    } = body;

    if (!title || !projectId) {
      return NextResponse.json(
        { error: 'Title and project ID are required' },
        { status: 400 }
      );
    }

    const task = await db.projectTask.create({
      data: {
        title,
        description,
        projectId,
        assigneeId,
        priority,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
        estimatedHours
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            contact: {
              select: {
                name: true,
                company: true
              }
            }
          }
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}