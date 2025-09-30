"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { AdminLayoutWrapper } from '@/components/admin/admin-layout-wrapper';
import { TaskBoard } from '@/components/admin/task-board';
import { CheckSquare, Plus, Filter, Users, FolderOpen, Loader2 } from 'lucide-react';
import { TaskStatus, Priority } from '@prisma/client';
import { useSearchParams } from 'next/navigation';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: string;
  completedAt?: string;
  estimatedHours?: number;
  actualHours?: number;
  project: {
    id: string;
    name: string;
    contact: {
      name: string;
      company?: string;
    };
  };
  assignee?: {
    id: string;
    name?: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Project {
  id: string;
  name: string;
  contact: {
    name: string;
    company?: string;
  };
}

interface User {
  id: string;
  name?: string;
  email: string;
}

function TasksPageContent() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    todo: 0,
    inProgress: 0,
    review: 0,
    completed: 0
  });

  const searchParams = useSearchParams();

  // Fetch initial data
  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, [searchParams]);

  // Update stats when tasks change
  useEffect(() => {
    updateStats(tasks);
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const projectId = searchParams.get('projectId');
      const assigneeId = searchParams.get('assigneeId');
      
      const params = new URLSearchParams();
      if (projectId) params.append('projectId', projectId);
      if (assigneeId) params.append('assigneeId', assigneeId);

      const response = await fetch(`/api/admin/tasks?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setLoading(false);
    }
  };

  const updateStats = (taskList: Task[]) => {
    const stats = {
      total: taskList.length,
      todo: taskList.filter(t => t.status === TaskStatus.TODO).length,
      inProgress: taskList.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
      review: taskList.filter(t => t.status === TaskStatus.REVIEW).length,
      completed: taskList.filter(t => t.status === TaskStatus.COMPLETED).length
    };
    setStats(stats);
  };

  const handleTaskUpdate = async (taskId: string, updates: Partial<Task>) => {
    try {
      const response = await fetch(`/api/admin/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (!response.ok) throw new Error('Failed to update task');
      
      const updatedTask = await response.json();
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const handleTaskCreate = async (taskData: {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: Priority;
    projectId: string;
    assigneeId?: string;
    dueDate?: string;
    estimatedHours?: number;
  }) => {
    try {
      const response = await fetch('/api/admin/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });

      if (!response.ok) throw new Error('Failed to create task');
      
      const newTask = await response.json();
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    try {
      const response = await fetch(`/api/admin/tasks/${taskId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete task');
      
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  if (loading) {
    return (
      <AdminLayoutWrapper>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading tasks...</span>
          </div>
        </div>
      </AdminLayoutWrapper>
    );
  }

  if (error) {
    return (
      <AdminLayoutWrapper>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-600 dark:text-red-400 mb-2">Error loading tasks</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{error}</div>
            <button
              onClick={() => {
                setError(null);
                setLoading(true);
                fetchTasks();
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </AdminLayoutWrapper>
    );
  }

  return (
    <AdminLayoutWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <CheckSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Task Management
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage project tasks with drag-and-drop Kanban board
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <CheckSquare className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {stats.total}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="w-4 h-4 bg-gray-500 rounded-full" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">To Do</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {stats.todo}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <div className="w-4 h-4 bg-blue-500 rounded-full" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {stats.inProgress}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <div className="w-4 h-4 bg-yellow-500 rounded-full" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Review</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {stats.review}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <div className="w-4 h-4 bg-green-500 rounded-full" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {stats.completed}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Board */}
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <TaskBoard
            initialTasks={tasks}
            projects={projects}
            users={users}
            onTaskUpdate={handleTaskUpdate}
            onTaskCreate={handleTaskCreate}
            onTaskDelete={handleTaskDelete}
          />
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}

export default function TasksPage() {
  return (
    <Suspense fallback={
      <AdminLayoutWrapper>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      </AdminLayoutWrapper>
    }>
      <TasksPageContent />
    </Suspense>
  );
}