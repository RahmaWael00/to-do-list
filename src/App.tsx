import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import useDarkMode  from './hooks/useDarkMode';
import useAuthStore from './store/authStore';
import useTaskStore from './store/store';

import Navbar         from './components/Navbar';
import DarkModeToggle from './components/DarkModeToggle';
import SearchBar      from './components/SearchBar';
import FilterControls from './components/FilterControls';
import TaskList       from './components/TaskList';
import AddTask        from './pages/AddTask';
import EditTask       from './pages/EditTask';
import Login          from './pages/Login';
import Home           from './pages/Home';
import NotFound       from './pages/NotFound';

const App: React.FC = () => {
  /* Hooks */
  const { dark, setDark } = useDarkMode();
  const navigate = useNavigate();
  const isAuth   = useAuthStore((s) => s.isAuth);

  /* Zustand selectors */
  const tasks          = useTaskStore((s) => s.tasks);
  const search         = useTaskStore((s) => s.search);
  const filterStatus   = useTaskStore((s) => s.filterStatus);
  const filterPriority = useTaskStore((s) => s.filterPriority);
  const filterCategory = useTaskStore((s) => s.filterCategory);
  const toggleComplete = useTaskStore((s) => s.toggleComplete);
  const deleteTask     = useTaskStore((s) => s.deleteTask);

  
  const filtered = tasks
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => (filterStatus === 'all' ? true : filterStatus === 'complete' ? t.completed : !t.completed))
    .filter((t) => (filterPriority === 'all' ? true : t.priority === filterPriority))
    .filter((t) => (filterCategory === 'all' ? true : t.category === filterCategory));

  return (
    <>
      {isAuth && <Navbar />}

      <div className="container">
        <h1>📝 To‑Do List</h1>

        {isAuth && (
          <div className="controls">
            <SearchBar />
            <FilterControls />

            <div className="topActions">
              <DarkModeToggle dark={dark} setDark={setDark} />
              <button className="addTaskButton" onClick={() => navigate('/addTask')}>
                Add Task
              </button>
            </div>
          </div>
        )}

        <Routes>
          
          <Route path="/login" element={isAuth ? <Navigate to="/tasks" /> : <Login />} />

          
          <Route path="/" element={<Home />} />

          
          <Route
            path="/tasks"
            element={
              !isAuth ? (
                <Navigate to="/login" />
              ) : filtered.length === 0 ? (
                <p>No tasks found.</p>
              ) : (
                <TaskList
                  tasks={filtered}
                  onEdit={(t) => navigate(`/editTask/${t.id}`)}
                  onToggle={toggleComplete}
                  onDelete={deleteTask}
                />
              )
            }
          />

          
          <Route path="/addTask" element={isAuth ? <AddTask /> : <Navigate to="/login" />} />
          <Route path="/editTask/:id" element={isAuth ? <EditTask /> : <Navigate to="/login" />} />

          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
