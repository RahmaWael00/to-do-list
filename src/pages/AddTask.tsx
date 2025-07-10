import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import useTaskStore, { Task as StoreTask } from '../store/store';

type NewTask = Omit<StoreTask, 'id' | 'completed'>;

const AddTask: React.FC = () => {
  const navigate = useNavigate();
  const addTask = useTaskStore((state) => state.addTask);
  const categories = useTaskStore((state) => state.categories);

  const handleSave = (data: NewTask): void => {
    addTask(data);
    navigate('/');
  };

  return (
    <div className="container">
      <h2>➕ Add New Task</h2>
      <TaskForm
        onSave={handleSave}
        onCancel={() => navigate('/')}
        categories={categories}
      />
    </div>
  );
};

export default AddTask;
