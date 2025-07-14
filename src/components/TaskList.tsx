import React from 'react';
import TaskCard from './TaskCard';
import type { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onEdit, onDelete }) => (
  <div className="task-list">
    {tasks.map((task) => (
      <TaskCard
        key={task.id}
        task={task}
        onToggle={() => onToggle(task.id)}
        onEdit={() => onEdit(task)}
        onDelete={() => onDelete(task.id)}
      />
    ))}
  </div>
);

export default TaskList;
