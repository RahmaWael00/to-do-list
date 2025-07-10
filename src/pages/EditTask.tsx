import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import useTaskStore from '../store/store';

type TaskData = {
  title: string;
  description: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  category: string;
};


export default function EditTask() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  

  const task = useTaskStore(state => state.tasks.find(t => t.id === id));
  const updateTask = useTaskStore(state => state.updateTask);
  const categories = useTaskStore(state => state.categories);

if (!id) return <p>Invalid task ID</p>;
  const handleSave = (data: TaskData) => {
    updateTask(id, data); 
    navigate('/');
  };

  if (!task) return <p>Task not found</p>;

  return (
    <div className="container">
      <h2>✏️ Edit Task</h2>
      <TaskForm
        onSave={handleSave}
        onCancel={() => navigate('/')}
        categories={categories}
        initial={{
          title: task.title,
          description: (task as any).description || '',
          dueDate: (task as any).dueDate || '',
          priority: task.priority,
          category: task.category
        }}
      />
    </div>
  );
}
