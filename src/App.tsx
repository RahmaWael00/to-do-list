import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import FilterControls from './components/FilterControls';
import DarkModeToggle from './components/DarkModeToggle';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';

import useTaskStore from './store/store';
import './App.css';

const App: React.FC = () => {
  const navigate = useNavigate();

  // Dark Mode state
  const [dark, setDark] = useState<boolean>(false);

  // Zustand store values
  const tasks = useTaskStore(state => state.tasks);
  const search = useTaskStore(state => state.search);
  const filterStatus = useTaskStore(state => state.filterStatus);
  const filterPriority = useTaskStore(state => state.filterPriority);
  const filterCategory = useTaskStore(state => state.filterCategory);

  const toggleComplete = useTaskStore(state => state.toggleComplete);
  const deleteTask = useTaskStore(state => state.deleteTask);

  // Toggle dark mode class
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Filtering logic
  const filtered = tasks
    .filter(task => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter(task =>
      filterStatus === 'all'
        ? true
        : filterStatus === 'complete'
        ? task.completed
        : !task.completed
    )
    .filter(task =>
      filterPriority === 'all' ? true : task.priority === filterPriority
    )
    .filter(task =>
      filterCategory === 'all' ? true : task.category === filterCategory
    );

  return (
    <div className="container">
      <h1>📝 To‑Do List</h1>

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

      <Routes>
        <Route
          path="/"
          element={
            filtered.length === 0 ? (
              <p>No tasks found.</p>
            ) : (
             <TaskList
              tasks={filtered}
              onEdit={(task) => navigate(`/editTask/${task.id}`)}
              onToggle={(id) => toggleComplete(id)}
              onDelete={(id) => deleteTask(id)}
                    />

            )
          }
        />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/editTask/:id" element={<EditTask />} />
      </Routes>
    </div>
  );
};

export default App;
