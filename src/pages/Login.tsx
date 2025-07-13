import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/inputs/TextInput';
import useAuthStore from '../store/authStore';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && pass) {
      login();
      navigate('/');
    }
  };

  return (
    <div className="container">
      <h2>🔐 Login</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextInput
          label="Password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
