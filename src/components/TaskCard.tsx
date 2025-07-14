import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Task } from '../types/Task';

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onEdit, onDelete }) => {
  const { t } = useTranslation();

  return (
    <div className="task-card">
      <div className="task-header">
        <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</h3>
        <span className={`badge ${task.priority}`}>{t(`taskform.${task.priority.toLowerCase()}`)}</span>
      </div>

      {task.description && <p>{task.description}</p>}

      <div>
        {task.category && <span style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>#{task.category}</span>}
        {task.dueDate && (
          <span style={{ marginLeft: '1rem', fontSize: '0.8rem' }}>
            {t('taskcard.due')}: {task.dueDate}
          </span>
        )}
      </div>

      <div className="controls">
        <button className="secondary" onClick={onToggle}>
          {task.completed ? t('taskcard.mark_incomplete') : t('taskcard.mark_complete')}
        </button>
        <button className="secondary" onClick={onEdit}>{t('taskcard.edit')}</button>
        <button className="secondary" onClick={onDelete}>{t('taskcard.delete')}</button>
      </div>
    </div>
  );
};

export default TaskCard;