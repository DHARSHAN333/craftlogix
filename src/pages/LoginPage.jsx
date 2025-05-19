// src/pages/LoginPage.jsx
import React from 'react';
import './LoginPage.css'; // Import the CSS file for LoginPage

function LoginPage() {
  return (
    <div className="login-page">
      <h2>Login to CraftLogix</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default LoginPage;
