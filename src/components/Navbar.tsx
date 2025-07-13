import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import '../App.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <span className="app-title">My Tasks</span>
      {isAuth && (
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
