import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../store/authStore';
import '../App.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth, logout } = useAuthStore();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <nav className="navbar">
      <span className="app-title">{t('navbar.title')}</span>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button className="lang-btn" onClick={toggleLanguage}>
          🌐 {i18n.language === 'en' ? 'AR' : 'EN'}
        </button>

        {isAuth && (
          <button className="logout-btn" onClick={handleLogout}>
            🚪 {t('navbar.logout')}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
