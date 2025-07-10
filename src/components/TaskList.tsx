import React from 'react';
import TaskCard from './TaskCard';



interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  category: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

function TaskList({ tasks, onToggle, onEdit, onDelete }: TaskListProps) {
  return (
    <div className="task-list">
      {tasks.map(task => (
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
}

export default TaskList;
