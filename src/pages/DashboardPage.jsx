import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './DashboardPage.css';

function DashboardPage() {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <h2>Craftlogix</h2>
        <ul>
          <li><Link to="worker">👷 Worker Details</Link></li>
          <li><Link to="attendance">🕒 Attendance</Link></li>
          <li><Link to="allotment">📝 Work Allotment</Link></li>
          <li><Link to="salary">💰 Salary Calculation</Link></li>
          <li><Link to="voice">🎤 Voice Translation</Link></li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardPage;
