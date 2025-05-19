import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="login-page">
      <h2>Login to CraftLogix</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>

      <p className="signup-link">
        Don't have an account? <Link to="/signup">Sign up to CraftLogix</Link>
      </p>
    </div>
  );
}

export default LoginPage;
