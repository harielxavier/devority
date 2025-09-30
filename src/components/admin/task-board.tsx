"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { 
  Plus, 
  User, 
  Calendar, 
  AlertCircle, 
  Clock,
  Building2,
  Filter,
  X,
  Edit,
  Trash2
} from 'lucide-react';
import { TaskStatus, Priority } from '@prisma/client';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

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

interface CreateTaskData {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  projectId: string;
  assigneeId?: string;
  dueDate?: string;
  estimatedHours?: number;
}

interface TaskBoardProps {
  initialTasks: Task[];
  projects: Project[];
  users: User[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => Promise<void>;
  onTaskCreate: (task: CreateTaskData) => Promise<void>;
  onTaskDelete: (taskId: string) => Promise<void>;
}

const COLUMNS = [
  { id: TaskStatus.TODO, title: 'To Do', color: 'bg-gray-500' },
  { id: TaskStatus.IN_PROGRESS, title: 'In Progress', color: 'bg-blue-500' },
  { id: TaskStatus.REVIEW, title: 'Review', color: 'bg-yellow-500' },
  { id: TaskStatus.COMPLETED, title: 'Completed', color: 'bg-green-500' }
];

const PRIORITY_COLORS = {
  [Priority.LOW]: 'bg-gray-400',
  [Priority.MEDIUM]: 'bg-blue-400',
  [Priority.HIGH]: 'bg-orange-400',
  [Priority.URGENT]: 'bg-red-400'
};

const PRIORITY_LABELS = {
  [Priority.LOW]: 'Low',
  [Priority.MEDIUM]: 'Medium',
  [Priority.HIGH]: 'High',
  [Priority.URGENT]: 'Urgent'
};

export function TaskBoard({ 
  initialTasks, 
  projects, 
  users, 
  onTaskUpdate, 
  onTaskCreate, 
  onTaskDelete 
}: TaskBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filters, setFilters] = useState({
    projectId: '',
    assigneeId: ''
  });
  const [showQuickAdd, setShowQuickAdd] = useState<TaskStatus | null>(null);
  const [quickAddForm, setQuickAddForm] = useState<{
    title: string;
    description: string;
    projectId: string;
    assigneeId: string;
    priority: Priority;
    dueDate: string;
  }>({
    title: '',
    description: '',
    projectId: '',
    assigneeId: '',
    priority: Priority.MEDIUM,
    dueDate: ''
  });

  // Filter tasks based on current filters
  const filteredTasks = tasks.filter(task => {
    if (filters.projectId && task.project.id !== filters.projectId) return false;
    if (filters.assigneeId && task.assignee?.id !== filters.assigneeId) return false;
    return true;
  });

  // Group tasks by status
  const tasksByStatus = COLUMNS.reduce((acc, column) => {
    acc[column.id] = filteredTasks.filter(task => task.status === column.id);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStatus = destination.droppableId as TaskStatus;
    const task = tasks.find(t => t.id === draggableId);
    
    if (!task) return;

    // Optimistically update the UI
    setTasks(prev => prev.map(t => 
      t.id === draggableId ? { ...t, status: newStatus } : t
    ));

    try {
      await onTaskUpdate(draggableId, { status: newStatus });
    } catch (error) {
      // Revert on error
      setTasks(prev => prev.map(t => 
        t.id === draggableId ? { ...t, status: task.status } : t
      ));
      console.error('Failed to update task status:', error);
    }
  };

  const handleQuickAdd = async (status: TaskStatus) => {
    if (!quickAddForm.title.trim() || !quickAddForm.projectId) return;

    try {
      // Create task data for API call (not requiring the full project object)
      const taskData = {
        title: quickAddForm.title,
        description: quickAddForm.description || undefined,
        status,
        priority: quickAddForm.priority,
        projectId: quickAddForm.projectId,
        assigneeId: quickAddForm.assigneeId || undefined,
        dueDate: quickAddForm.dueDate || undefined
      };

      await onTaskCreate(taskData);
      
      // Reset form
      setQuickAddForm({
        title: '',
        description: '',
        projectId: '',
        assigneeId: '',
        priority: Priority.MEDIUM,
        dueDate: ''
      });
      setShowQuickAdd(null);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
      case Priority.URGENT:
        return <AlertCircle className="h-4 w-4" />;
      case Priority.HIGH:
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate);
    const now = new Date();
    const isOverdue = date < now;
    
    return {
      formatted: format(date, 'MMM dd'),
      isOverdue
    };
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
        </div>
        
        <select
          value={filters.projectId}
          onChange={(e) => setFilters(prev => ({ ...prev, projectId: e.target.value }))}
          className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Projects</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name} - {project.contact.company || project.contact.name}
            </option>
          ))}
        </select>

        <select
          value={filters.assigneeId}
          onChange={(e) => setFilters(prev => ({ ...prev, assigneeId: e.target.value }))}
          className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Assignees</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name || user.email}
            </option>
          ))}
        </select>

        {(filters.projectId || filters.assigneeId) && (
          <button
            onClick={() => setFilters({ projectId: '', assigneeId: '' })}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLUMNS.map(column => (
            <div key={column.id} className="space-y-4">
              {/* Column Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", column.color)} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {column.title}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                    {tasksByStatus[column.id]?.length || 0}
                  </span>
                </div>
                
                <button
                  onClick={() => setShowQuickAdd(column.id)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Quick Add Form */}
              {showQuickAdd === column.id && (
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Task title..."
                    value={quickAddForm.title}
                    onChange={(e) => setQuickAddForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  
                  <textarea
                    placeholder="Description (optional)..."
                    value={quickAddForm.description}
                    onChange={(e) => setQuickAddForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={quickAddForm.projectId}
                      onChange={(e) => setQuickAddForm(prev => ({ ...prev, projectId: e.target.value }))}
                      className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Project</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={quickAddForm.priority}
                      onChange={(e) => setQuickAddForm(prev => ({ ...prev, priority: e.target.value as Priority }))}
                      className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setShowQuickAdd(null)}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleQuickAdd(column.id)}
                      disabled={!quickAddForm.title.trim() || !quickAddForm.projectId}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              )}

              {/* Task Column */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      "min-h-[200px] space-y-3 p-3 rounded-lg transition-colors",
                      snapshot.isDraggingOver
                        ? "bg-blue-50/50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700"
                        : "bg-gray-50/30 dark:bg-gray-900/30 border border-gray-200/50 dark:border-gray-700/50"
                    )}
                  >
                    {tasksByStatus[column.id]?.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={cn(
                              "bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3 transition-all hover:shadow-lg cursor-pointer",
                              snapshot.isDragging && "rotate-2 shadow-xl"
                            )}
                          >
                            {/* Task Header */}
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <div className={cn("w-2 h-2 rounded-full", PRIORITY_COLORS[task.priority])} />
                                <span className={cn("text-xs px-2 py-1 rounded-full", PRIORITY_COLORS[task.priority], "text-white")}>
                                  {PRIORITY_LABELS[task.priority]}
                                </span>
                              </div>
                              {getPriorityIcon(task.priority)}
                            </div>

                            {/* Task Title */}
                            <h4 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                              {task.title}
                            </h4>

                            {/* Task Description */}
                            {task.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                {task.description}
                              </p>
                            )}

                            {/* Project Info */}
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <Building2 className="h-3 w-3" />
                              <span className="truncate">
                                {task.project.name} - {task.project.contact.company || task.project.contact.name}
                              </span>
                            </div>

                            {/* Due Date */}
                            {task.dueDate && (
                              <div className="flex items-center gap-2 text-xs">
                                <Calendar className="h-3 w-3" />
                                <span className={cn(
                                  formatDueDate(task.dueDate).isOverdue
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-gray-500 dark:text-gray-400"
                                )}>
                                  {formatDueDate(task.dueDate).formatted}
                                </span>
                              </div>
                            )}

                            {/* Assignee */}
                            {task.assignee && (
                              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <User className="h-3 w-3" />
                                <span className="truncate">
                                  {task.assignee.name || task.assignee.email}
                                </span>
                              </div>
                            )}

                            {/* Time Estimates */}
                            {(task.estimatedHours || task.actualHours) && (
                              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {task.estimatedHours && `Est: ${task.estimatedHours}h`}
                                  {task.estimatedHours && task.actualHours && ' | '}
                                  {task.actualHours && `Actual: ${task.actualHours}h`}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}