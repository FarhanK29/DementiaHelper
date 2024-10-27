import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError("Invalid email/password");
        return;
      }

      const data = await response.json();
      
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      localStorage.setItem('username', username);
      
      // Redirect to the protected route (e.g., the game)
      navigate('/game');  // Change to the route you want to redirect to
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className = "login-page">
        <div className = "login-box"> 
            <h1>Cognify</h1>
            <h2>Login</h2>
            <form className = "login-form" onSubmit={handleLogin}>
                <label>Username</label>
                <input 
                    className = "username-input"
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <label>Password</label>
                <input 
                    className = "password-input"
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <div className = "login-button-container">
                    <button className = "login-button">Login</button>
                </div>
                {error && <div className="error">{error}</div>}
                

                <div className = "registration-redirect">Don't have an account? <Link className = "registration-link" to = "/signup" >Register Here</Link></div>
            </form>
        </div>
    </div>
  );
};

export default Login;
