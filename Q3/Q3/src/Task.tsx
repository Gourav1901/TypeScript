// src/Task.ts
export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: Priority;
}
