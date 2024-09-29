// src/TaskManager.tsx
import React, { useState } from 'react';
import { Task, Priority } from './Task';
import TaskList from './TaskList';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>(Priority.Medium);

  const addTask = () => {
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
      priority: newTaskPriority,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <select value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value as Priority)}>
          <option value={Priority.Low}>Low</option>
          <option value={Priority.Medium}>Medium</option>
          <option value={Priority.High}>High</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>
      <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
    </div>
  );
};

export default TaskManager;
