
import React, { useState } from 'react';
import './Login.css';
import LoginImage from '../Assets/login-image.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  axios.post('http://localhost:5000/login', { email, password })
    .then((res) => {
      alert(res.data.message);

      // Save the user info or token in localStorage here:
      // localStorage.setItem('userInfo', JSON.stringify(res.data.user));
      localStorage.setItem('user', JSON.stringify(res.data.user));


      // Then navigate to home page
      navigate('/home');
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        alert(err.response.data.message); // Email not registered or wrong password
      } else {
        console.error(err);
        alert("Login failed. Please try again later.");
      }
    });
};


  return (
    <div className="login-page">
      <div className="image-panel2">
        <img src={LoginImage} alt="Login Visual" />
      </div>

      <div className="form-panel2">
        <div className="login-container">
          <h2>Hello You 👋</h2>
          <p className="welcome-text">Welcome back! Please login to your account.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group2">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-btn">Log In</button>
          </form>
          <div className="signup-link">
            New here? Create an account <Link to={'/'}>register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
