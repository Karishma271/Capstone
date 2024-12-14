import React, { useState } from 'react';
import axios from 'axios'; // Importing axios for backend request

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    // API request to authenticate the admin using the environment variable for backend URL
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/login`, {
        username,
        password,
      })
      .then((response) => {
        if (response.data.success) {
          // If login is successful, set redirect to admin dashboard
          setRedirectToDashboard(true);
        } else {
          // Invalid credentials, handle accordingly
          setErrorMessage('Invalid username or password');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        setErrorMessage('An error occurred. Please try again.');
      });
  };

  if (redirectToDashboard) {
    window.location.href = '/Dashboard'; // Redirecting the user to the Dashboard page
  }

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>} {/* Display error message if any */}
    </div>
  );
};

export default AdminLogin;
