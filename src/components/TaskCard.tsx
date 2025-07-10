import React from 'react';

// تعريف الأنواع للـ props
interface Task {
  title: string;
  description?: string;
  priority: string;
  category?: string;
  dueDate?: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="task-card">
      <div className="task-header">
        <h3 style={{ textDecoration: task.completed ? "line-through" : "none" }}>
          {task.title}
        </h3>
        <span className={"badge " + task.priority}>{task.priority}</span>
      </div>
      {task.description && <p>{task.description}</p>}
      <div>
        {task.category && (
          <span style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
            #{task.category}
          </span>
        )}
        {task.dueDate && (
          <span style={{ marginLeft: "1rem", fontSize: "0.8rem" }}>
            Due: {task.dueDate}
          </span>
        )}
      </div>
      <div className="controls">
        <button className="secondary" onClick={onToggle}>
          {task.completed ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button className="secondary" onClick={onEdit}>Edit</button>
        <button className="secondary" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;
