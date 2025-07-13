import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import '../App.css'; // تأكدي إن السطر ده موجود

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth, logout } = useAuthStore();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">📝 My Tasks</Link>

      {isAuth && (
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="logout-button"
        >
          🚪 Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
