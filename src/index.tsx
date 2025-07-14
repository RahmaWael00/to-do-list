// src/index.tsx  (أو main.tsx لو اسمه كده)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import './i18n';          // 👈 ❶ استدعاء إعداد الترجمة (سطر مهم جداً)

// تأكدي إن العنصر موجود فعلاً
const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Optional: measure app performance
reportWebVitals();
