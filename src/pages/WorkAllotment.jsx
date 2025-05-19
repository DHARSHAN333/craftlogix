// src/pages/WorkAllotmentPage.jsx
import React from 'react';
import './WorkAllotmentPage.css';

function WorkAllotmentPage() {
  return (
    <div className="work-allotment-page">
      <h2>Work Allotment</h2>
      <table>
        <thead>
          <tr>
            <th>Worker Name</th>
            <th>Boost</th>
            <th>Power</th>
            <th>Efficiency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>✔</td>
            <td>✔</td>
            <td>Boost</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>✔</td>
            <td>✘</td>
            <td>Power</td>
          </tr>
          {/* Add more workers */}
        </tbody>
      </table>
    </div>
  );
}

export default WorkAllotmentPage;
