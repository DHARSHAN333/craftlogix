// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link> {/* Link to HomePage */}
        </li>
        <li>
          <Link to="/login">Login</Link> {/* Link to LoginPage */}
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link> {/* Link to DashboardPage */}
        </li>
        <li>
          <Link to="/payment">Payment</Link> {/* Link to PaymentPage */}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
