import React, { useState } from 'react';
import './Register.css';
import registerImage from '../Assets/register1-img.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    axios.post("http://localhost:5000/add-customer", {
      name,
      email,
      password,
      confirmpassword,
    })
    // .then((res) => {
    //   navigate('/login');
    // })
    .then((res) => {
  console.log('Registration success, navigating to login...');
  navigate('/login');
})

    // .catch((err) => {
    //   console.log(err);
    // });
    .catch((err) => {
  if (err.response && err.response.status === 400) {
    alert(err.response.data.message); // Shows "Customer already exists"
  } else {
    console.error(err);
    alert("An error occurred. Please try again later.");
  }
});

  };

  return (
    <div className="register-page">
      <div className="image-panel1">
        <img src={registerImage} alt="Register visual" />
      </div>

      <div className="form-panel1">
        <div className="register-container">
          <h2>Create Your Account</h2>
          <form onSubmit={handlesubmit}>
            <div className="form-group1">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="form-group1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="form-group1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="form-group1">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                type="password"
                id="confirm"
                placeholder="••••••••"
                required
                value={confirmpassword}
                onChange={(e) => setconfirmpassword(e.target.value)}
              />
            </div>
            <button type="submit" className="register-btn">Sign Up</button>
            <div className="login-link">
              Already registered? <Link to="/login">Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
